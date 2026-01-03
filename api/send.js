export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Only POST");

  const { message } = req.body || {};
  if (!message || typeof message !== "string") {
    return res.status(400).send("Missing message");
  }

  const text = message.trim();
  if (!text || text.length > 200) {
    return res.status(400).send("Invalid message");
  }

  const token = process.env.BOT_TOKEN;
  const chatId = process.env.CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).send("Missing BOT_TOKEN or CHAT_ID");
  }

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });

  if (!tgRes.ok) return res.status(500).send("Telegram error");
  return res.status(200).send("OK");
}