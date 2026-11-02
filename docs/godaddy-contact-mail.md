# GoDaddy cPanel contact form

The ZillionxAI site stays a static Vite build. The contact form and the demo dialog send a same-origin `POST /api/contact.php`. PHPMailer on the cPanel account sends the message. SMTP settings live in a private `.env` next to `public_html`, not in the site files and not in frontend JavaScript.

No Composer install is required. No Vercel function is involved. No captcha account is required.

## Vercel preview

The Vite build writes the static site to `dist`, not `build`. `vercel.json` sets `outputDirectory` to `dist` and runs `npm run build` (typecheck, Vite, and prerender). A preview that says there is no output directory named `build` is this mismatch.

Vercel only hosts the static pages. It does not run PHP, so a Vercel preview will not deliver the contact email. Mail is sent only after `public/api` and the private `.env` are uploaded to GoDaddy cPanel, as described below.

## Layout on the server

`contact.php` is deployed as `public_html/api/contact.php`. From that file the hosting account root is two levels up (`dirname(__DIR__, 2)`), which is the folder that contains `public_html`.

```text
/home/USERNAME/
  .env                         mode 600, not inside public_html
  .zillion-mail/               created by the script, mode 700
    contact.log
    rate/
  public_html/
    .htaccess                  SPA fallback; does not rewrite /api/contact.php
    index.html
    api/
      .htaccess
      contact.php
      lib/PHPMailer/           PHPMailer 6.12.0 already included
        src/Exception.php
        src/PHPMailer.php
        src/SMTP.php
        LICENSE
```

Replace `USERNAME` with the cPanel account name. In File Manager, open `public_html`, then go up one level until `public_html` is a folder in the list. That parent directory is the account root. Turn on **Show Hidden Files** so `.env` and `.zillion-mail` are visible.

## 1. Upload the API

PHPMailer 6.12.0 (LGPL-2.1) is already vendored under `public/api/lib/PHPMailer`. Upload that tree as-is. Do not run Composer on the server.

Use either source:

- `public/api` from the repository
- `dist/api` after `npm run build` (Vite copies `public/` into `dist/`, including `.htaccess`)

In cPanel File Manager, the result must be exactly `public_html/api/contact.php`. If uploading a folder is awkward, zip the `api` directory, upload the zip into `public_html`, and extract it there. Do not put `.env` inside the zip.

Files can stay at the default File Manager modes: directories `755`, PHP files `644`.

## 2. Upload the SPA `.htaccess`

Upload `public/.htaccess` to `public_html/.htaccess`.

It still sends unknown routes to `index.html` for the React app. These rules run first so Apache executes the PHP file instead of returning the homepage:

```apache
RewriteRule ^api/contact\.php$ - [END]
RewriteRule ^api/ - [F,L]
```

`/api/contact.php` is served by PHP. Every other URL under `/api/` is forbidden, so the PHPMailer sources are not downloaded. Dotfiles under the site are also forbidden, except `/.well-known/` for certificate checks.

Check this before testing the form. This request must return JSON `405`, not the HTML homepage:

```bash
curl -i https://zillionxai.com/api/contact.php
```

A homepage response means a rewrite is still sending `/api/contact.php` to `index.html`. Put the two rules above any catch-all rewrite.

GoDaddy cPanel uses Apache 2.4, which supports the `[END]` flag. If the whole site suddenly returns 500, the account error log will name the `.htaccess` line. `Options -Indexes` is included so folders are not listed.

## 3. Create the private `.env`

Create `/home/USERNAME/.env` in the account root (the parent of `public_html`). Do not create it inside `public_html`, `public_html/api`, or the git repository.

In File Manager: **Permissions → 600** (owner read/write only). From a terminal:

```bash
chmod 600 /home/USERNAME/.env
```

The script refuses to run if that file is readable by the group or by anyone else, if it is a symlink, or if it sits inside `public_html`. The public JSON will say it could not send; the private log code is `config_perms` or `config_missing`.

Paste this template and replace only the password with the mailbox password. Do not commit the filled file, and do not prefix any name with `VITE_`.

```text
SMTP_HOST=zillionxai.com
SMTP_PORT=465
SMTP_USER=info@zillionxai.com
SMTP_PASS=replace-with-mailbox-password
SMTP_TO=services@zillionxai.com
SMTP_FROM=info@zillionxai.com
```

| Key | Role |
| --- | --- |
| `SMTP_HOST` | Outgoing server. `zillionxai.com` matches the mailbox host. If cPanel **Email Accounts → Connect Devices** shows a different outgoing server, use that hostname. |
| `SMTP_PORT` | `465` for implicit SSL. The script uses SSL on 465 and STARTTLS on any other port (such as 587). |
| `SMTP_USER` | Full mailbox address used to authenticate. |
| `SMTP_PASS` | Mailbox password. This is the only secret. It never goes in the site, the log, or the JSON response. |
| `SMTP_TO` | Inbox that receives the lead. Suggested destination: `services@zillionxai.com`. |
| `SMTP_FROM` | Envelope and From address. On GoDaddy this should be the same mailbox as `SMTP_USER`, otherwise the server often rejects the message. The visitor's address is set as Reply-To. |

The React app does not read this file. Vite only exposes variables whose names start with `VITE_`, and these names do not.

## 4. PHP version and filesystem access

In cPanel **MultiPHP Manager**, select PHP 8.1 or newer for the domain. The script also runs on PHP 7.4.

PHP must be allowed to read `/home/USERNAME/.env` and to create `/home/USERNAME/.zillion-mail`. GoDaddy's default `open_basedir` usually includes the home directory. If the form returns 500 and no `.zillion-mail` directory appears, check `open_basedir` in MultiPHP INI Editor and include the home directory. Do not move `.env` into `public_html` to work around that.

The first request creates `.zillion-mail` (mode 700) and `contact.log` (mode 600). You do not create those by hand.

## 5. What the form sends

The browser posts JSON. The fields match the existing demo request, plus a honeypot and a timestamp:

- `name`, `company`, `email`, `phone`
- `productSlug` (the selected service, package, agent, or product)
- `message`
- `intent`: `demo` or `expert`
- `fax`: honeypot, must be empty. The pages include a visually hidden fax field.
- `formStartedAt`: Unix time in milliseconds when the form was shown. Submits faster than 1.5 seconds, or older than 24 hours, are rejected.

Anything else in the JSON is rejected. Oversized values are rejected. The server strips tags and control characters, allows Arabic and Latin text in names, and rejects a message with more than two links. There is no third-party captcha.

Rate limit: 5 POSTs per 15 minutes for one IP address, and 30 POSTs per hour for the whole site. Counters are files in `.zillion-mail/rate/`, outside `public_html`. The limit uses the connection address only.

CORS allows only `https://zillionxai.com` and `https://www.zillionxai.com`. There is no `Access-Control-Allow-Origin: *`. A normal visit on either production host is same-origin and does not need a cross-origin header. Any other `Origin` gets HTTP 403.

| Status | Meaning |
| --- | --- |
| 200 | `{"ok":true}` Accepted, or a filled honeypot was ignored. |
| 204 | CORS preflight (`OPTIONS`). |
| 400 | Invalid, unexpected, oversized, too fast, or too many links. |
| 403 | Origin is not one of the two production hosts. |
| 405 | Not POST. |
| 429 | Rate limit. |
| 500 | Mail or server configuration failed. The JSON does not include the reason. |

## 6. Test

After upload, confirm the rewrite with the GET request in section 2. Then send one real lead. Set `formStartedAt` a few seconds in the past or the timing check will reject it:

```bash
NOW_MS=$(( $(date +%s) * 1000 - 5000 ))
curl -i https://zillionxai.com/api/contact.php \
  -H 'Content-Type: application/json' \
  -H 'Origin: https://zillionxai.com' \
  -d "{\"name\":\"Test User\",\"company\":\"Example Co\",\"email\":\"you@example.com\",\"phone\":\"+966500000000\",\"productSlug\":\"siteagent\",\"message\":\"Please contact me about a demo.\",\"intent\":\"demo\",\"fax\":\"\",\"formStartedAt\":${NOW_MS}}"
```

Success is HTTP 200 and `{"ok":true}`, and the message arrives at `SMTP_TO`. Reply from your mail client goes to the address in the form because Reply-To is the visitor.

Then submit the contact page and the demo dialog in a browser on `https://zillionxai.com` or `https://www.zillionxai.com`.

If the response is 500, open `/home/USERNAME/.zillion-mail/contact.log` in File Manager. Do not open that file through the website; it is not under `public_html`. Each line is a UTC timestamp and a short code. The log does not store the password, the SMTP conversation, or the message body. It stops growing after about 1 MB. Delete the file to rotate it.

| Code | What to fix |
| --- | --- |
| `config_missing` | `.env` is not in the account root. |
| `config_perms` | Mode is not 600, the file is a symlink, or it is inside `public_html`. |
| `config_invalid` | A key is missing or empty, or the host, port, or addresses are not usable. |
| `config_unreadable` | PHP cannot read the file (`open_basedir` or ownership). |
| `smtp_connect` | Host, port, or TLS. Confirm the outgoing server in cPanel. Leave certificate checks enabled. |
| `smtp_auth` | Mailbox username or password was rejected. |
| `smtp_send` | The server accepted login but refused the message. `SMTP_FROM` usually must equal `SMTP_USER`. |
| `storage` | PHP could not create `.zillion-mail`. |
| `rate_limited` | Wait 15 minutes, or delete `.zillion-mail/rate` if you are testing. |
| `spam_honeypot` | The fax field was filled. No mail was sent. |
| `spam_timing` | `formStartedAt` was missing, too new, or too old. |
| `spam_links` | More than two links in the message. |
| `validation` | A field failed the server checks. |
| `origin_denied` | Request came from a host other than the two production origins. |
| `fatal` | PHP crashed. See the account error log; it still should not contain the password from this script. |

## 7. What not to upload

- Do not upload a real `.env` into `public_html` or into git.
- Do not add `VITE_` copies of these keys. The form endpoint is the fixed path `/api/contact.php`.
- Do not point the form at a third-party URL.
- The repository ignores `.env` and `.zillion-mail/`. The placeholder file `.env.example` has no password.

If the browser cannot open a connection to the endpoint at all, the page falls back to the visitor's own mail client. An HTTP error from PHP stays on the form and does not open that fallback.
