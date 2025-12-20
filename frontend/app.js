const tg = window.Telegram.WebApp;
tg.expand();

// Validate session
fetch("https://YOUR-BACKEND-DOMAIN/validate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ initData: tg.initData })
})
.then(res => res.json())
.then(data => {
  if (!data.ok) {
    alert("Session error");
  }
});

// CTA
document.getElementById("betBtn").onclick = () => {
  window.location.href =
    "https://YOUR-BACKEND-DOMAIN/go?campaign=odds_hub";
};
