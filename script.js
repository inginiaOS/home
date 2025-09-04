// เก็บ Add-ons ที่เลือก
let selectedAddons = [];

// เลือก Add-on
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

// สลับ Tabs
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// LIFF init + ส่งข้อความ
liff.init({ liffId: "2007908663-NawZjDxL" }).then(() => {
  console.log("LIFF พร้อมใช้งานแล้ว");

  document.getElementById("requestQuote").addEventListener("click", () => {
    const basePlan = "InginiaOS Starter (8,800฿ / เดือน)";
    const text = "ฉันสนใจ:\n" + basePlan + "\n\nAdd-ons:\n" +
      (selectedAddons.length ? selectedAddons.join("\n") : "ไม่มี");

    liff.sendMessages([
      { type: "text", text: text }
    ]).then(() => {
      alert("ส่งข้อความสำเร็จ ✅ ทีมงานจะติดต่อกลับ");
    }).catch(err => {
      console.error("ส่งข้อความไม่สำเร็จ:", err);
    });
  });

}).catch(err => {
  console.error("LIFF init error:", err);
});
