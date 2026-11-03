const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url) return res.status(400).send("Missing url parameter");

  let parsed;
  try {
    parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    return res.status(400).send("Invalid URL");
  }

  try {
    const response = await axios.get(url, {
      responseType: "text",
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    let html = response.data;

    // Inject <base> so relative CSS/JS/images still load from the
    // original site instead of 404ing against your own domain.
    const baseTag = `<base href="${parsed.origin}${parsed.pathname}">`;
    html = html.includes("<head>")
      ? html.replace("<head>", `<head>${baseTag}`)
      : baseTag + html;

    res.set("Content-Type", "text/html; charset=utf-8");
    // Note: we do NOT forward the source's X-Frame-Options/CSP headers,
    // so the browser only evaluates our own (permissive) response.
    res.send(html);
  } catch (err) {
    console.error("Proxy fetch failed:", err.message);
    res.status(502).send("Failed to load the source page");
  }
});

module.exports = router;