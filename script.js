document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Add-on selection + LINE quote builder
let selectedAddons = [];

document.querySelectorAll(".select-addon").forEach(btn => {
  btn.addEventListener("click", () => {
    const addon = btn.getAttribute("data-addon");
    if (!selectedAddons.includes(addon)) {
      selectedAddons.push(addon);
      btn.textContent = "เลือกแล้ว ✓";
      btn.classList.add("selected");
      btn.disabled = true;
    }
  });
});

document.getElementById("requestQuote").addEventListener("click", () => {
  const basePlan = "InginiaOS Starter (8,800฿ / เดือน)";
  const text = "ฉันสนใจ:\n" + basePlan + "\n\nAdd-ons:\n" + (selectedAddons.length ? selectedAddons.join("\n") : "ไม่มี");

  const encodedText = encodeURIComponent(text);
  // แทน LINE_ID ด้วย Line ID ของคุณ เช่น @yourid หรือ id จริงจาก OA
  window.open(`https://line.me/R/ti/p/~@717xokfa?text=${encodedText}`, "_blank");
});