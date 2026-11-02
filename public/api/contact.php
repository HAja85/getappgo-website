<?php
/**
 * ZillionxAI contact endpoint for GoDaddy cPanel.
 *
 * Deployed path: public_html/api/contact.php
 * In this repo:  public/api/contact.php (Vite copies it to dist/api/contact.php)
 *
 * SMTP settings are read from /.env on the hosting account root, which is the
 * parent of public_html: dirname(__DIR__, 2) . '/.env'
 * Logs and rate-limit files live in that same parent, under .zillion-mail/.
 * Nothing in this script prints credentials.
 */

declare(strict_types=1);

ini_set('display_errors', '0');
ini_set('html_errors', '0');

const ZILLION_ALLOWED_ORIGINS = [
    'https://zillionxai.com',
    'https://www.zillionxai.com',
];

const ZILLION_ALLOWED_FIELDS = [
    'name' => true,
    'company' => true,
    'email' => true,
    'phone' => true,
    'productSlug' => true,
    'message' => true,
    'intent' => true,
    'fax' => true,
    'formStartedAt' => true,
];

const ZILLION_MAX_BODY = 16384;
const ZILLION_MIN_SUBMIT_MS = 1500;
const ZILLION_MAX_AGE_MS = 86400000;
const ZILLION_RATE_LIMIT = 5;
const ZILLION_RATE_WINDOW = 900;
const ZILLION_GLOBAL_LIMIT = 30;
const ZILLION_GLOBAL_WINDOW = 3600;

/**
 * @return array{public_html:string,account_root:string,env:string,private:string,log:string,rate:string}
 */
function zillion_paths(): array
{
    // public_html/api/contact.php -> account root is two levels up.
    $publicHtml = dirname(__DIR__);
    $accountRoot = dirname(__DIR__, 2);

    return [
        'public_html' => $publicHtml,
        'account_root' => $accountRoot,
        'env' => $accountRoot . DIRECTORY_SEPARATOR . '.env',
        'private' => $accountRoot . DIRECTORY_SEPARATOR . '.zillion-mail',
        'log' => $accountRoot . DIRECTORY_SEPARATOR . '.zillion-mail' . DIRECTORY_SEPARATOR . 'contact.log',
        'rate' => $accountRoot . DIRECTORY_SEPARATOR . '.zillion-mail' . DIRECTORY_SEPARATOR . 'rate',
    ];
}

function zillion_normalize(string $path): string
{
    $path = str_replace('\\', '/', $path);
    $absolute = strlen($path) > 0 && $path[0] === '/';
    $parts = [];
    foreach (explode('/', $path) as $part) {
        if ($part === '' || $part === '.') {
            continue;
        }
        if ($part === '..') {
            array_pop($parts);
            continue;
        }
        $parts[] = $part;
    }

    return ($absolute ? '/' : '') . implode('/', $parts);
}

function zillion_is_inside(string $path, string $parent): bool
{
    $path = rtrim(zillion_normalize($path), '/');
    $parent = rtrim(zillion_normalize($parent), '/');
    if ($parent === '') {
        return false;
    }

    return $path === $parent || strpos($path, $parent . '/') === 0;
}

function zillion_origin(): string
{
    if (!isset($_SERVER['HTTP_ORIGIN'])) {
        return '';
    }
    $origin = trim((string) $_SERVER['HTTP_ORIGIN']);
    if ($origin === '' || strlen($origin) > 200) {
        return $origin === '' ? '' : 'invalid';
    }

    return $origin;
}

function zillion_send_headers(int $status): void
{
    if (headers_sent()) {
        return;
    }
    header_remove('X-Powered-By');
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: no-store');
    header('Referrer-Policy: no-referrer');
    header('X-Robots-Tag: noindex, nofollow');

    $origin = zillion_origin();
    if ($origin !== '' && $origin !== 'invalid' && in_array($origin, ZILLION_ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Accept');
        header('Access-Control-Max-Age: 600');
    }

    http_response_code($status);
}

function zillion_log(string $code): void
{
    if (!preg_match('/^[a-z0-9_]{1,40}$/', $code)) {
        $code = 'unknown';
    }
    $paths = zillion_paths();
    $logFile = $paths['log'];
    if (!zillion_prepare_private($paths)) {
        error_log('zillion-contact ' . $code);
        return;
    }
    if (is_file($logFile) && filesize($logFile) > 1048576) {
        return;
    }
    $line = gmdate('Y-m-d\TH:i:s\Z') . "\t" . $code . "\n";
    @file_put_contents($logFile, $line, FILE_APPEND | LOCK_EX);
    @chmod($logFile, 0600);
}

/**
 * @param array{public_html:string,account_root:string,env:string,private:string,log:string,rate:string} $paths
 */
function zillion_prepare_private(array $paths): bool
{
    static $ready = null;
    if ($ready !== null) {
        return $ready;
    }

    $publicReal = realpath($paths['public_html']);
    $accountReal = realpath($paths['account_root']);
    if ($publicReal === false || $accountReal === false) {
        $ready = false;
        return false;
    }
    if (!zillion_is_inside($paths['private'], $accountReal) || zillion_is_inside($paths['private'], $publicReal)) {
        $ready = false;
        return false;
    }

    umask(0077);
    foreach ([$paths['private'], $paths['rate']] as $dir) {
        if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
            $ready = false;
            return false;
        }
        @chmod($dir, 0700);
    }

    $privateReal = realpath($paths['private']);
    if ($privateReal === false || zillion_is_inside($privateReal, $publicReal) || !zillion_is_inside($privateReal, $accountReal)) {
        $ready = false;
        return false;
    }

    $ready = true;
    return true;
}

/**
 * @param array<string, mixed> $payload
 */
function zillion_respond(int $status, array $payload, ?string $logCode = null): void
{
    if ($logCode !== null) {
        zillion_log($logCode);
    }
    zillion_send_headers($status);
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo $json === false ? '{"ok":false,"error":"Unable to send your request right now."}' : $json;
    exit;
}

function zillion_client_ip(): string
{
    $ip = isset($_SERVER['REMOTE_ADDR']) ? (string) $_SERVER['REMOTE_ADDR'] : '';
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        return 'unknown';
    }

    return $ip;
}

function zillion_text_length(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    return strlen($value);
}

function zillion_valid_utf8(string $value): bool
{
    return preg_match('//u', $value) === 1;
}

/**
 * @return 'ok'|'limited'|'error'
 */
function zillion_hit_limit(string $file, int $limit, int $windowSeconds): string
{
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return 'error';
    }
    if (!flock($handle, LOCK_EX)) {
        fclose($handle);
        return 'error';
    }

    $raw = stream_get_contents($handle);
    $hits = [];
    if (is_string($raw) && $raw !== '') {
        $decoded = json_decode($raw, true);
        if (is_array($decoded) && isset($decoded['hits']) && is_array($decoded['hits'])) {
            $hits = $decoded['hits'];
        }
    }

    $now = time();
    $fresh = [];
    foreach ($hits as $hit) {
        if (!is_int($hit) && !(is_string($hit) && ctype_digit($hit))) {
            continue;
        }
        $ts = (int) $hit;
        if ($ts > $now - $windowSeconds && $ts <= $now + 120) {
            $fresh[] = $ts;
        }
    }

    $blocked = count($fresh) >= $limit;
    if (!$blocked) {
        $fresh[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode(['hits' => $fresh]));
        fflush($handle);
    }
    flock($handle, LOCK_UN);
    fclose($handle);
    @chmod($file, 0600);

    return $blocked ? 'limited' : 'ok';
}

function zillion_rate_limit(): string
{
    $paths = zillion_paths();
    if (!zillion_prepare_private($paths)) {
        return 'error';
    }
    $ipFile = $paths['rate'] . DIRECTORY_SEPARATOR . 'ip-' . hash('sha256', zillion_client_ip()) . '.json';
    $ipResult = zillion_hit_limit($ipFile, ZILLION_RATE_LIMIT, ZILLION_RATE_WINDOW);
    if ($ipResult !== 'ok') {
        return $ipResult;
    }

    return zillion_hit_limit(
        $paths['rate'] . DIRECTORY_SEPARATOR . 'global.json',
        ZILLION_GLOBAL_LIMIT,
        ZILLION_GLOBAL_WINDOW
    );
}

/**
 * @return array<string, string>
 */
function zillion_load_env(string $path): array
{
    $lines = @file($path, FILE_IGNORE_NEW_LINES);
    if ($lines === false) {
        zillion_respond(500, ['ok' => false, 'error' => 'Unable to send your request right now.'], 'config_unreadable');
    }

    $config = [];
    foreach ($lines as $line) {
        if (strncmp($line, "\xEF\xBB\xBF", 3) === 0) {
            $line = substr($line, 3);
        }
        $trimmed = trim($line);
        if ($trimmed === '' || $trimmed[0] === '#') {
            continue;
        }
        if (strncmp($trimmed, 'export ', 7) === 0) {
            $trimmed = trim(substr($trimmed, 7));
        }
        $eq = strpos($trimmed, '=');
        if ($eq === false) {
            continue;
        }
        $key = trim(substr($trimmed, 0, $eq));
        $value = substr($trimmed, $eq + 1);
        $value = trim($value);
        $len = strlen($value);
        if ($len >= 2) {
            $first = $value[0];
            $last = $value[$len - 1];
            if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                $value = substr($value, 1, -1);
                $value = str_replace(['\\n', '\\r'], '', $value);
            }
        }
        if (!preg_match('/^[A-Z0-9_]+$/', $key)) {
            continue;
        }
        $config[$key] = $value;
    }

    return $config;
}

/**
 * @param array<string, string> $config
 */
function zillion_valid_config(array $config): bool
{
    $required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'SMTP_TO', 'SMTP_FROM'];
    foreach ($required as $key) {
        if (!isset($config[$key]) || $config[$key] === '') {
            return false;
        }
    }
    $port = $config['SMTP_PORT'];
    if (!preg_match('/^\d{1,5}$/', $port)) {
        return false;
    }
    $portNum = (int) $port;
    if ($portNum < 1 || $portNum > 65535) {
        return false;
    }
    $host = $config['SMTP_HOST'];
    $hostOk = filter_var($host, FILTER_VALIDATE_IP) !== false
        || (function_exists('filter_var') && filter_var($host, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME));
    if (!$hostOk || strlen($host) > 253) {
        return false;
    }
    foreach (['SMTP_USER', 'SMTP_FROM', 'SMTP_TO'] as $mailKey) {
        if (strlen($config[$mailKey]) > 254 || filter_var($config[$mailKey], FILTER_VALIDATE_EMAIL) === false) {
            return false;
        }
        if (preg_match('/[\r\n]/', $config[$mailKey])) {
            return false;
        }
    }
    if (preg_match('/[\r\n\x00]/', $config['SMTP_PASS'])) {
        return false;
    }

    return true;
}

function zillion_env_is_safe(string $envFile, string $publicHtml, string $accountRoot): bool
{
    if (is_link($envFile)) {
        return false;
    }
    $envReal = realpath($envFile);
    $publicReal = realpath($publicHtml);
    $accountReal = realpath($accountRoot);
    if ($envReal === false || $publicReal === false || $accountReal === false) {
        return false;
    }
    if (!is_file($envReal) || !is_readable($envReal)) {
        return false;
    }
    if (!zillion_is_inside($envReal, $accountReal) || zillion_is_inside($envReal, $publicReal)) {
        return false;
    }
    $mode = fileperms($envReal);
    if ($mode === false) {
        return false;
    }
    // Owner read/write only. Reject group or world access.
    if (($mode & 0077) !== 0) {
        return false;
    }

    return true;
}

function zillion_smtp_code(string $message): string
{
    $lower = strtolower($message);
    if (strpos($lower, 'authenticat') !== false || strpos($lower, 'password') !== false || strpos($lower, 'username') !== false) {
        return 'smtp_auth';
    }
    if (strpos($lower, 'connect') !== false || strpos($lower, 'timed') !== false || strpos($lower, 'tls') !== false || strpos($lower, 'ssl') !== false) {
        return 'smtp_connect';
    }

    return 'smtp_send';
}

/**
 * @param array<string, mixed> $data
 * @param array<string, string> $config
 */
function zillion_send(array $data, array $config): void
{
    require_once __DIR__ . '/lib/PHPMailer/src/Exception.php';
    require_once __DIR__ . '/lib/PHPMailer/src/PHPMailer.php';
    require_once __DIR__ . '/lib/PHPMailer/src/SMTP.php';

    $intent = $data['intent'] === 'expert' ? 'expert' : 'demo';
    $intentLabel = $intent === 'expert' ? 'Talk to an expert' : 'Request a demo';
    $subject = $intentLabel . ': ' . $data['productSlug'];

    $body = $intentLabel . "\n\n"
        . 'Name: ' . $data['name'] . "\n"
        . 'Company: ' . $data['company'] . "\n"
        . 'Email: ' . $data['email'] . "\n"
        . 'Phone / WhatsApp: ' . $data['phone'] . "\n"
        . 'Product: ' . $data['productSlug'] . "\n"
        . 'Intent: ' . $intent . "\n\n"
        . $data['message'] . "\n";

    $password = $config['SMTP_PASS'];
    unset($config['SMTP_PASS']);

    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = $config['SMTP_HOST'];
        $mail->SMTPAuth = true;
        $mail->Username = $config['SMTP_USER'];
        $mail->Password = $password;
        $password = '';
        $mail->Port = (int) $config['SMTP_PORT'];
        if ($mail->Port === 465) {
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
            $mail->SMTPAutoTLS = false;
        } else {
            $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
            $mail->SMTPAutoTLS = true;
        }
        $mail->Timeout = 15;
        $mail->SMTPDebug = 0;
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        $mail->XMailer = 'ZillionxAI';
        $mail->setFrom($config['SMTP_FROM'], 'ZillionxAI');
        $mail->Sender = $config['SMTP_FROM'];
        $mail->addAddress($config['SMTP_TO']);
        $mail->addReplyTo($data['email'], $data['name']);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->isHTML(false);
        $mail->send();
    } catch (Exception $exception) {
        $password = '';
        $code = zillion_smtp_code($exception->getMessage());
        zillion_respond(500, ['ok' => false, 'error' => 'Unable to send your request right now.'], $code);
    }

    $password = '';
    zillion_respond(200, ['ok' => true]);
}

/**
 * @param array<string, mixed> $data
 * @return array<string, string>
 */
function zillion_validated(array $data): array
{
    foreach ($data as $key => $_value) {
        if (!is_string($key) || !isset(ZILLION_ALLOWED_FIELDS[$key])) {
            zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'validation');
        }
    }

    if (array_key_exists('fax', $data)) {
        $fax = $data['fax'];
        if (!is_string($fax) || trim($fax) !== '' || strlen($fax) > 200) {
            zillion_respond(200, ['ok' => true], 'spam_honeypot');
        }
    }

    if (!isset($data['formStartedAt'])) {
        zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'spam_timing');
    }
    $started = zillion_timestamp_ms($data['formStartedAt']);
    $now = (int) round(microtime(true) * 1000);
    if ($started <= 0) {
        zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'spam_timing');
    }
    $elapsed = $now - $started;
    if ($elapsed < ZILLION_MIN_SUBMIT_MS || $elapsed > ZILLION_MAX_AGE_MS) {
        zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'spam_timing');
    }

    $name = zillion_plain_text($data['name'] ?? null, 2, 100);
    $company = zillion_plain_text($data['company'] ?? null, 2, 160);
    $message = zillion_message($data['message'] ?? null);
    $email = zillion_email($data['email'] ?? null);
    $phone = zillion_phone($data['phone'] ?? null);
    $product = zillion_slug($data['productSlug'] ?? null);
    $intent = zillion_intent($data['intent'] ?? null);

    if ($name === null || $company === null || $message === null || $email === null || $phone === null || $product === null || $intent === null) {
        zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'validation');
    }

    $links = preg_match_all('/(?:https?:\/\/|www\.)/i', $message);
    if ($links !== false && $links > 2) {
        zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'spam_links');
    }

    return [
        'name' => $name,
        'company' => $company,
        'email' => $email,
        'phone' => $phone,
        'productSlug' => $product,
        'message' => $message,
        'intent' => $intent,
    ];
}

/**
 * @param mixed $value
 */
function zillion_timestamp_ms($value): int
{
    if (is_int($value)) {
        $stamp = $value;
    } elseif (is_float($value)) {
        $stamp = (int) round($value);
    } elseif (is_string($value) && preg_match('/^\d{10,13}$/', $value)) {
        $stamp = (int) $value;
    } else {
        return 0;
    }
    if ($stamp > 0 && $stamp < 100000000000) {
        $stamp *= 1000;
    }

    return $stamp;
}

/**
 * @param mixed $value
 */
function zillion_plain_text($value, int $min, int $max): ?string
{
    if (!is_string($value) || !zillion_valid_utf8($value)) {
        return null;
    }
    $value = str_replace(["\0", "\r", "\n"], '', strip_tags($value));
    $value = trim(preg_replace('/[ \t]+/u', ' ', $value) ?? '');
    if (preg_match('/[\x00-\x1F\x7F]/', $value)) {
        return null;
    }
    $length = zillion_text_length($value);
    if ($length < $min || $length > $max) {
        return null;
    }
    if (!preg_match('/^[\p{L}\p{M}\p{N} .\'’,&()\/+-]+$/u', $value)) {
        return null;
    }

    return $value;
}

/**
 * @param mixed $value
 */
function zillion_message($value): ?string
{
    if (!is_string($value) || !zillion_valid_utf8($value)) {
        return null;
    }
    if (strlen($value) > 8000) {
        return null;
    }
    $value = str_replace(["\0", "\r\n", "\r"], ["", "\n", "\n"], strip_tags($value));
    $value = trim($value);
    if (preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $value)) {
        return null;
    }
    $length = zillion_text_length($value);
    if ($length < 8 || $length > 4000) {
        return null;
    }

    return $value;
}

/**
 * @param mixed $value
 */
function zillion_email($value): ?string
{
    if (!is_string($value)) {
        return null;
    }
    $value = trim($value);
    if (strlen($value) < 6 || strlen($value) > 254) {
        return null;
    }
    if (preg_match('/[\r\n\x00]/', $value)) {
        return null;
    }
    if (filter_var($value, FILTER_VALIDATE_EMAIL) === false) {
        return null;
    }

    return $value;
}

/**
 * @param mixed $value
 */
function zillion_phone($value): ?string
{
    if (!is_string($value) || !zillion_valid_utf8($value)) {
        return null;
    }
    $value = trim($value);
    if (!preg_match('/^[0-9+\-().\s\x{0660}-\x{0669}\x{06F0}-\x{06F9}]{6,40}$/u', $value)) {
        return null;
    }

    return $value;
}

/**
 * @param mixed $value
 */
function zillion_slug($value): ?string
{
    if (!is_string($value)) {
        return null;
    }
    $value = trim($value);
    if (strlen($value) < 1 || strlen($value) > 80) {
        return null;
    }
    if (!preg_match('/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $value)) {
        return null;
    }

    return $value;
}

/**
 * @param mixed $value
 */
function zillion_intent($value): ?string
{
    if ($value === 'demo' || $value === 'expert') {
        return $value;
    }

    return null;
}

register_shutdown_function(static function (): void {
    $error = error_get_last();
    if (!$error) {
        return;
    }
    $fatal = [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR];
    if (!in_array($error['type'], $fatal, true)) {
        return;
    }
    zillion_log('fatal');
    if (!headers_sent()) {
        zillion_send_headers(500);
        echo '{"ok":false,"error":"Unable to send your request right now."}';
    }
});

$method = isset($_SERVER['REQUEST_METHOD']) ? strtoupper((string) $_SERVER['REQUEST_METHOD']) : 'GET';
$origin = zillion_origin();
if ($origin === 'invalid' || ($origin !== '' && !in_array($origin, ZILLION_ALLOWED_ORIGINS, true))) {
    zillion_respond(403, ['ok' => false, 'error' => 'Origin not allowed.'], 'origin_denied');
}

if ($method === 'OPTIONS') {
    zillion_send_headers(204);
    exit;
}

if ($method !== 'POST') {
    if (!headers_sent()) {
        header('Allow: POST');
    }
    zillion_respond(405, ['ok' => false, 'error' => 'Method not allowed.'], 'method');
}

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > ZILLION_MAX_BODY) {
    zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'validation');
}

$rate = zillion_rate_limit();
if ($rate === 'error') {
    zillion_respond(500, ['ok' => false, 'error' => 'Unable to send your request right now.'], 'storage');
}
if ($rate === 'limited') {
    zillion_respond(429, ['ok' => false, 'error' => 'Too many requests. Please wait and try again.'], 'rate_limited');
}

$contentType = isset($_SERVER['CONTENT_TYPE']) ? strtolower(trim((string) $_SERVER['CONTENT_TYPE'])) : '';
if (strpos($contentType, 'application/json') !== 0) {
    zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'validation');
}

$input = fopen('php://input', 'rb');
$raw = $input === false ? false : stream_get_contents($input, ZILLION_MAX_BODY + 1);
if ($input !== false) {
    fclose($input);
}
if (!is_string($raw) || $raw === '' || strlen($raw) > ZILLION_MAX_BODY) {
    zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'validation');
}

$decoded = json_decode($raw, true, 6);
if (!is_array($decoded)) {
    zillion_respond(400, ['ok' => false, 'error' => 'Please check the form and try again.'], 'validation');
}

$clean = zillion_validated($decoded);

$paths = zillion_paths();
if (!is_file($paths['env'])) {
    zillion_respond(500, ['ok' => false, 'error' => 'Unable to send your request right now.'], 'config_missing');
}
if (!zillion_env_is_safe($paths['env'], $paths['public_html'], $paths['account_root'])) {
    zillion_respond(500, ['ok' => false, 'error' => 'Unable to send your request right now.'], 'config_perms');
}

$config = zillion_load_env($paths['env']);
if (!zillion_valid_config($config)) {
    zillion_respond(500, ['ok' => false, 'error' => 'Unable to send your request right now.'], 'config_invalid');
}

zillion_send($clean, $config);
