import nodemailer from "nodemailer";

const SMTP_KEYS = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"];
const RECIPIENT = "services@zillionxai.com";

const INTENTS = {
  demo: "Request a demo",
  expert: "Talk to an expert",
  partner: "Partner application",
  investor: "Investor enquiry",
};

export function missingSmtp(env) {
  return SMTP_KEYS.filter((key) => !env?.[key]);
}

export function validateLead(body) {
  if (!body || typeof body !== "object") return "Send a JSON inquiry.";
  const name = String(body.name ?? "").trim();
  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const productSlug = String(body.productSlug ?? "").trim();
  const message = String(body.message ?? "").trim();
  const intent = String(body.intent ?? "").trim();
  if (name.length < 2) return "Please enter your name.";
  if (company.length < 2) return "Please enter your company.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a work email.";
  if (phone.length < 6) return "Please enter a phone or WhatsApp number.";
  if (!productSlug) return "Please select a product.";
  if (message.length < 8) return "Please add a short message.";
  if (!INTENTS[intent]) return "Please choose a request type.";
  return null;
}

function readBody(req) {
  const body = req.body;
  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return null;
    }
  }
  return body ?? null;
}

export async function handleLead(req, res, env = process.env) {
  if (req.method !== "POST") {
    res.setHeader?.("Allow", "POST");
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const missing = missingSmtp(env);
  if (missing.length) {
    res.status(503).json({
      error: `Email delivery is not configured. Missing ${missing.join(", ")}.`,
    });
    return;
  }

  const body = readBody(req);
  const invalid = validateLead(body);
  if (invalid) {
    res.status(400).json({ error: invalid });
    return;
  }

  const intentLabel = INTENTS[body.intent];
  const offering = String(body.productSlug).trim();
  const text = [
    intentLabel,
    "",
    `Name: ${String(body.name).trim()}`,
    `Company: ${String(body.company).trim()}`,
    `Email: ${String(body.email).trim()}`,
    `Phone / WhatsApp: ${String(body.phone).trim()}`,
    `Product: ${offering}`,
    "",
    String(body.message).trim(),
  ].join("\n");

  const port = Number(env.SMTP_PORT);
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: env.SMTP_FROM,
      to: RECIPIENT,
      replyTo: String(body.email).trim(),
      subject: `${intentLabel}: ${offering}`,
      text,
    });
  } catch {
    res.status(502).json({ error: "Unable to send your request right now." });
    return;
  }

  res.status(200).json({ ok: true });
}

export default function handler(req, res) {
  return handleLead(req, res, process.env);
}
