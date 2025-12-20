import express from "express";
import crypto from "crypto";
import dotenv from "dotenv";
import { nanoid } from "nanoid";

dotenv.config();
const app = express();

app.use(express.json());

// ✅ Telegram initData validation
function validateInitData(initData) {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  params.delete("hash");

  const dataCheckString = [...params.entries()]
    .sort()
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(process.env.BOT_TOKEN)
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  return calculatedHash === hash;
}

// 🔐 Validate WebApp session
app.post("/validate", (req, res) => {
  const { initData } = req.body;

  if (!validateInitData(initData)) {
    return res.status(403).json({ ok: false });
  }

  res.json({ ok: true });
});

// 🎯 Affiliate redirect
app.get("/go", (req, res) => {
  const clickId = nanoid(8);
  const campaign = req.query.campaign || "default";

  const url =
    `https://1xbet.com/register` +
    `?aff=${process.env.AFFILIATE_ID}` +
    `&sub=${clickId}` +
    `&utm_source=telegram` +
    `&utm_campaign=${campaign}`;

  res.redirect(302, url);
});

app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});
