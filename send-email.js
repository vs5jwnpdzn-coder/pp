const nodemailer = require("nodemailer");
const fs = require("fs");

const html = fs.readFileSync("./mail.html", "utf8");

// TODO: HIER EINTRAGEN
const GMAIL_USER = "holzerluis3@gmail.com";
const GMAIL_APP_PASS = "zcgyiglaavyxobem";
const TO = "jonasbenz25@gmail.com";

async function main() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASS },
  });

  const info = await transporter.sendMail({
    from: `"thomas" <${GMAIL_USER}>`,
    to: TO,
    subject: "testhtml versuch",
    html,
    text: "das siehst du dann",
  });

  console.log("Gesendet:", info.messageId);
}

main().catch((err) => {
  console.error("Fehler:", err);
  process.exit(1);
});
//Bitte logge dich ein und folge den Anweisungen auf unserer Website. https://pp-five-silk.vercel.app/ 