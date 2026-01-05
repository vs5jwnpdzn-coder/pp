const nodemailer = require("nodemailer");
const fs = require("fs");

const html = fs.readFileSync("./mail.html", "utf8");

// OUTLOOK DATEN
const OUTLOOK_USER = "paypaI.benz.login@outlook.com"; // z.B. name@outlook.de
const OUTLOOK_APP_PASS = "ullocxwtzyewbqqd";
const TO = "jonasbenz25@gmail.com"; // zum Test auch deine eigene Adresse ok

async function main() {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: OUTLOOK_USER,
      pass: OUTLOOK_APP_PASS,
    },
  });
// Testet Login + Verbindung (sehr hilfreich)
  await transporter.verify();
  console.log("SMTP Login OK");

  const info = await transporter.sendMail({
    from: `"Thomas" <${OUTLOOK_USER}>`,
    to: TO,
    subject: "HTML Testmail (Outlook SMTP)",
    html,
    text: "Das ist die Text-Version der Mail.",
  });

  console.log("Gesendet:", info.messageId);
}

main().catch((err) => {
  console.error("Fehler:", err);
  process.exit(1);
});