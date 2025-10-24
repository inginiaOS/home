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

document.querySelectorAll(".subscribeBase").forEach(btn => {
  btn.addEventListener("click", () => {
    const basePlan = "InginiaOS Starter (8,800฿ / เดือน)";
    const text = "ฉันสนใจแพ็กเกจหลัก:\n" + basePlan;

    liff.sendMessages([{ type: "text", text: text }])
      .then(() => {
        alert("ส่งข้อความสำเร็จ ✅ ทีมงานจะติดต่อกลับ");
      })
      .catch(err => {
        console.error("ส่งข้อความไม่สำเร็จ:", err);
        //alert("เกิดข้อผิดพลาด: " + err.message);
      });
  });
});
// Exclusive Toggle
document.getElementById("toggleExclusive").addEventListener("click", function() {
  const box = document.getElementById("exclusiveBox");
  box.classList.toggle("show");

  if (box.classList.contains("show")) {
    this.textContent = "ซ่อนสิทธิ์พิเศษ";
  } else {
    this.textContent = "ดูสิทธิ์พิเศษ";
  }
});

// ปุ่ม Founding10
document.getElementById("exclusiveBtn").addEventListener("click", () => {
  const text = "รับสิทธิ์ Founding 10";

  liff.sendMessages([{ type: "text", text: text }])
    .then(() => {
      alert("ส่งข้อความสำเร็จ ✅ ทีมงานจะติดต่อกลับ");
    })
    .catch(err => {
      console.error("ส่งข้อความไม่สำเร็จ:", err);
      //alert("เกิดข้อผิดพลาด: " + err.message);
    });
});

// FAQ Toggle (แก้ใหม่)
document.querySelectorAll(".faq-question").forEach(btn => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement; // parent = .faq-item
    item.classList.toggle("active");
  });
});

// Toggle Lite vs Starter Table (แก้ไขแล้ว)
document.getElementById("toggleLiteStarter").addEventListener("click", function() {
  const table = document.getElementById("liteStarterTable");
  const isHidden = window.getComputedStyle(table).display === "none";

  if (isHidden) {
    table.style.display = "block";
    this.textContent = "ซ่อนตารางเปรียบเทียบ";
  } else {
    table.style.display = "none";
    this.textContent = "ดูตารางเปรียบเทียบ";
  }
});
// Toggle Comparison Table
document.getElementById("toggleComparison").addEventListener("click", function() {
  const table = document.getElementById("comparisonTable");
  if (table.style.display === "none") {
    table.style.display = "block";
    this.textContent = "ซ่อนตารางเปรียบเทียบ";
  } else {
    table.style.display = "none";
    this.textContent = "ดูตารางเปรียบเทียบ";
  }
});

const stageBlocks = document.querySelectorAll('.stage-block');
const stagePanels = document.querySelectorAll('.stage-panel');

stageBlocks.forEach(block => {
  block.addEventListener('click', () => {
    // Reset highlight
    stageBlocks.forEach(b => b.classList.remove('active'));
    stagePanels.forEach(p => p.style.display = 'none');

    block.classList.add('active');
    const target = block.getAttribute('data-stage');
    document.getElementById(target).style.display = 'block';
  });
});

// ค่าเริ่มต้น: Stage 3 (ใหญ่สุด)
document.querySelector('[data-stage="stage3"]').classList.add('active');
document.getElementById('stage3').style.display = 'block';

/* === LIFF BRIDGE (BULLETPROOF) – START ===
   - เบราว์เซอร์ปกติ: 4 ปุ่มจะพาไปหน้า Add Friend ของ LINE OA
   - เปิดในแอป LINE (LIFF): ไม่แตะต้อง → ให้โค้ดเดิมของคุณทำงานต่อ (sendMessages ฯลฯ)
   - ไม่มี alert/confirm ฝั่งเว็บ
=== */
(function () {
  var OA_BASIC_ID = "@717xokfa"; // <-- ใช้ OA ของคุณ
  var LINE_ADD_FRIEND_URL = "https://line.me/R/ti/p/" + encodeURIComponent(OA_BASIC_ID);

  // ปุ่มเป้าหมาย 4 ปุ่ม (อย่าลืมว่ามีทั้ง .subscribeBase และ 2 id)
  var SELECTORS = ".subscribeBase, #requestQuote, #exclusiveBtn";

  // อยู่ใน LINE app (LIFF) หรือไม่ — ไม่ต้อง init, พอแค่นี้
  function isInsideLiff() {
    try {
      return !!(window.liff && typeof window.liff.isInClient === "function" && window.liff.isInClient());
    } catch (e) {
      return false;
    }
  }

  // ดักคลิก “แบบ capture” เพื่อขวาง handler อื่นเมื่ออยู่นอก LIFF
  function onClickCapture(e) {
    var btn = e.target.closest(SELECTORS);
    if (!btn) return;

    if (!isInsideLiff()) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      window.location.href = LINE_ADD_FRIEND_URL;
    }
    // ถ้าอยู่ใน LIFF → ไม่ทำอะไร ปล่อยให้ handler เดิมของคุณทำงาน
  }

  document.addEventListener("click", onClickCapture, true);

  // เผื่อผู้ใช้กด Enter/Space บนปุ่มด้วยคีย์บอร์ด
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var el = document.activeElement;
    if (!el || !el.matches || !el.matches(SELECTORS)) return;

    if (!isInsideLiff()) {
      e.preventDefault();
      window.location.href = LINE_ADD_FRIEND_URL;
    }
  }, true);
})();
/* === LIFF BRIDGE (BULLETPROOF) – END === */
