// Copy promo code
document.getElementById('copyCode')?.addEventListener('click', () => {
  navigator.clipboard.writeText('LLUNA1X');
  alert('Promo code copied!');
});

// Bonus calculator
const depRange = document.getElementById('depRange');
const pctRange = document.getElementById('pctRange');
const depText = document.getElementById('depText');
const pctText = document.getElementById('pctText');
const bonusText = document.getElementById('bonusText');

function updateBonus() {
  const dep = Number(depRange.value);
  const pct = Number(pctRange.value);
  depText.textContent = dep;
  pctText.textContent = pct;
  bonusText.textContent = Math.round(dep * pct / 100) + '$';
}

depRange?.addEventListener('input', updateBonus);
pctRange?.addEventListener('input', updateBonus);
updateBonus();

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
