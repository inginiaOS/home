/* =========================================
   script.js — FINAL (stable & idempotent)
   ========================================= */

/* ---------- Helpers ---------- */
const $  = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

/* ---------- Global state ---------- */
let selectedAddons = [];
let liffReady = false;
let inLiff = false;

/* ---------- LIFF (safe init) ---------- */
function initLIFF(){
  const LIFF_ID = "2007908663-NawZjDxL";
  try{
    if (window.liff && typeof liff.init === "function"){
      liff.init({ liffId: LIFF_ID }).then(() => {
        liffReady = true;
        inLiff = !!liff.isInClient();
      }).catch(() => {
        liffReady = false;
        inLiff = false;
      });
    }else{
      liffReady = false;
      inLiff = false;
    }
  }catch(e){
    liffReady = false; inLiff = false;
    console.warn("LIFF init skipped:", e);
  }
}

/* ---------- Add-ons selection ---------- */
function initAddonSelection(){
  $$(".select-addon").forEach(btn => {
    if (btn.__bind) return; btn.__bind = true;
    btn.addEventListener("click", () => {
      const addon = btn.getAttribute("data-addon");
      if (!addon) return;
      if (!selectedAddons.includes(addon)){
        selectedAddons.push(addon);
        btn.textContent = "เลือกแล้ว ✓";
        btn.classList.add("selected");
        btn.disabled = true;
      }
    });
  });
}

/* ---------- Tabs (Pricing) ---------- */
function initTabs(){
  $$(".tab").forEach(tab => {
    if (tab.__bind) return; tab.__bind = true;
    tab.addEventListener("click", () => {
      $$(".tab").forEach(t => t.classList.remove("active"));
      $$(".tab-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      const pane = $("#" + tab.dataset.tab);
      if (pane) pane.classList.add("active");
    });
  });
}

/* ---------- FAQ toggle ---------- */
function initFAQ(){
  $$(".faq-question").forEach(btn => {
    if (btn.__bind) return; btn.__bind = true;
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      if (item) item.classList.toggle("active");
    });
  });
}

/* ---------- Exclusive toggle (ดูสิทธิ์พิเศษ) ---------- */
function initExclusive(){
  const toggle = $("#toggleExclusive");
  const box = $("#exclusiveBox");
  if (!toggle || !box) return;
  if (toggle.__bind) return; toggle.__bind = true;

  toggle.addEventListener("click", () => {
    box.classList.toggle("show");
    toggle.textContent = box.classList.contains("show") ? "ซ่อนสิทธิ์พิเศษ" : "ดูสิทธิ์พิเศษ";
  });
}

/* ---------- Reveal (Intro → Content) ---------- */
function initReveal(){
  const btn = $("#revealContent");
  if (!btn || btn.__bind) return; btn.__bind = true;

  btn.addEventListener("click", () => {
    document.body.classList.remove("intro-hide");

    const ids = ["system-gap","memory-gap","engine-gap","stage-progress","solution","agency-killer","proof-cases","pricing","closing","note","faq"];
    ids.forEach((id,i) => {
      const el = document.getElementById(id);
      if (el) setTimeout(() => el.classList.add("visible"), i*120);
    });

    if (window.AOS && typeof AOS.refreshHard === "function"){
      setTimeout(() => AOS.refreshHard(), 60);
    }

    const target = document.getElementById("system-gap") || document.getElementById("solution");
    if (target) target.scrollIntoView({ behavior:"smooth", block:"start" });

    btn.style.display = "none";
  });
}

/* =======================================================
   CTA (Delegated) — ครอบคลุมทุกปุ่มแบบไม่พังแม้แก้ข้อความ
   ครอบคลุม:
   - ปุ่ม Hero:         #top .cta-buy
   - ปุ่มสมัครทั้งหมด:  .subscribeBase, .plan-cta.subscribeBase, .cta-line
   - ขอใบเสนอราคา:     #requestQuote
   - รับสิทธิ์ F10:     #exclusiveBtn
   ======================================================= */
function initCTADelegated(){
  const OA = "@717xokfa";
  const ADD_FRIEND = "https://line.me/R/ti/p/" + encodeURIComponent(OA);

  document.addEventListener("click", function(ev){
    const heroBtn   = ev.target.closest("#top .cta-buy");
    const subBtn    = ev.target.closest(".subscribeBase, .plan-cta.subscribeBase, .cta-line");
    const quoteBtn  = ev.target.closest("#requestQuote");
    const f10Btn    = ev.target.closest("#exclusiveBtn");

    // ไม่แมตช์อะไรเลย → ข้าม
    if (!heroBtn && !subBtn && !quoteBtn && !f10Btn) return;

    ev.preventDefault();

    // เตรียม payload ตามประเภทปุ่ม
    if (quoteBtn){
      const basePlan = "InginiaOS Starter (8,800฿ / เดือน)";
      const text = "ฉันสนใจ:\n" + basePlan + "\n\nAdd-ons:\n" + (selectedAddons.length ? selectedAddons.join("\n") : "ไม่มี");
      if (liffReady && inLiff && window.liff){
        liff.sendMessages([{ type:"text", text }])
          .then(() => alert("ส่งข้อความสำเร็จ ✅ ทีมงานจะติดต่อกลับ"))
          .catch(err => { console.error(err); window.location.href = ADD_FRIEND; });
      }else{
        window.location.href = ADD_FRIEND;
      }
      return;
    }

    if (f10Btn){
      const text = "รับสิทธิ์ Founding 10";
      if (liffReady && inLiff && window.liff){
        liff.sendMessages([{ type:"text", text }])
          .then(() => alert("ส่งข้อความสำเร็จ ✅ ทีมงานจะติดต่อกลับ"))
          .catch(err => { console.error(err); window.location.href = ADD_FRIEND; });
      }else{
        window.location.href = ADD_FRIEND;
      }
      return;
    }

    // heroBtn / subBtn → สมัครแพ็กเกจหลัก
    const basePlan = "InginiaOS Starter (8,800฿ / เดือน)";
    const text = "ฉันสนใจแพ็กเกจหลัก:\n" + basePlan;

    if (liffReady && inLiff && window.liff){
      liff.sendMessages([{ type:"text", text }])
        .then(() => alert("ส่งข้อความสำเร็จ ✅ ทีมงานจะติดต่อกลับ"))
        .catch(err => { console.error(err); window.location.href = ADD_FRIEND; });
    }else{
      window.location.href = ADD_FRIEND;
    }
  }, false);
}

/* ---------- Comparison toggle (ทำงานได้แม้ถูกซ่อน) ---------- */
function initComparisonGuard(){
  const btn = $("#toggleComparison");
  const table = $("#comparisonTable");
  if (!btn || !table) return;
  if (btn.__bind) return; btn.__bind = true;

  btn.addEventListener("click", () => {
    const show = table.style.display === "none" || getComputedStyle(table).display === "none";
    table.style.display = show ? "block" : "none";
    btn.textContent = show ? "ซ่อนตารางเปรียบเทียบ" : "ดูตารางเปรียบเทียบ";
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // UX เริ่มต้น: ซ่อนช่วงยาวไว้ก่อน
  document.body.classList.add("intro-hide");

  initLIFF();
  initAddonSelection();
  initTabs();
  initFAQ();
  initExclusive();
  initReveal();

  // สำคัญ: ใช้ delegated handler ให้ปุ่มคลิกได้เสมอแม้แก้ข้อความ
  initCTADelegated();

  initComparisonGuard();
});
/* =========================================================
   HERO CTA — GUARANTEED CLICK PATCH (non-breaking)
   ========================================================= */

(function(){
  const OA = "@717xokfa";
  const ADD_FRIEND = "https://line.me/R/ti/p/" + encodeURIComponent(OA);

  function sendOrRedirect(text){
    try{
      if (window.liff && typeof liff.sendMessages === "function" && window.liffReady && window.inLiff){
        liff.sendMessages([{ type:"text", text }])
          .then(()=>alert("ส่งข้อความสำเร็จ ✅ ทีมงานจะติดต่อกลับ"))
          .catch(()=>{ window.location.href = ADD_FRIEND; });
      }else{
        window.location.href = ADD_FRIEND;
      }
    }catch(e){
      window.location.href = ADD_FRIEND;
    }
  }

  function bindHeroCTA(){
    const heroBtn = document.querySelector("#top .cta-buy");
    if (!heroBtn || heroBtn.__heroBound) return;
    heroBtn.__heroBound = true;

    // จับก่อนทุกตัว + กัน propagation เพื่อไม่ให้ listener อื่นแทรก
    const handler = (ev)=>{
      ev.preventDefault();
      ev.stopPropagation();
      const text = "ฉันสนใจแพ็กเกจหลัก:\nInginiaOS Starter (8,800฿ / เดือน)";
      sendOrRedirect(text);
      return false;
    };

    heroBtn.addEventListener("click", handler, {capture:true});
    heroBtn.addEventListener("pointerup", handler, {capture:true});
    heroBtn.addEventListener("touchend", handler, {capture:true});
  }

  // ตัดการทับจาก overlay ที่พบบ่อย (เฉพาะตอนที่ทับปุ่มจริง ๆ)
  function guardOverlays(){
    const heroBtn = document.querySelector("#top .cta-buy");
    if (!heroBtn) return;

    const btnRect = heroBtn.getBoundingClientRect();
    const samplePoints = [
      [btnRect.left + btnRect.width*0.5, btnRect.top + btnRect.height*0.5],
      [btnRect.left + btnRect.width*0.2, btnRect.top + btnRect.height*0.5],
      [btnRect.right - btnRect.width*0.2, btnRect.top + btnRect.height*0.5]
    ];

    // รายชื่อ overlay ที่มักทับ
    const suspects = [
      document.getElementById("revealContent"),
      document.querySelector(".sticky-attention"), // ถ้ามีคลาสนี้
    ].filter(Boolean);

    // ถ้าจุดตัวอย่างเจอ element อื่นที่ไม่ใช่ปุ่ม ให้ปิด pointer-events ของตัวนั้น
    samplePoints.forEach(([x,y])=>{
      const el = document.elementFromPoint(x, y);
      if (el && el !== heroBtn && !heroBtn.contains(el)) {
        // ถ้า overlay อยู่ใน suspects ให้ kill แบบปลอดภัย
        const blocker = suspects.find(s => s && (s === el || s.contains(el)));
        if (blocker) blocker.classList.add("pe-none");
      }
    });
  }

  // ถ้าถูกจับคลิกที่ตำแหน่งทับปุ่มแต่ event ไปไม่ถึงปุ่ม ให้ยิงให้เอง
  function globalRescue(ev){
    const heroBtn = document.querySelector("#top .cta-buy");
    if (!heroBtn) return;
    const r = heroBtn.getBoundingClientRect();
    const x = ev.clientX, y = ev.clientY;
    const inside = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    if (!inside) return;

    // ถ้า target ไม่ใช่ปุ่ม แสดงว่ามีอะไรทับ → ทำงานแทน
    if (ev.target !== heroBtn && !heroBtn.contains(ev.target)) {
      ev.preventDefault();
      ev.stopPropagation();
      const text = "ฉันสนใจแพ็กเกจหลัก:\nInginiaOS Starter (8,800฿ / เดือน)";
      sendOrRedirect(text);
    }
  }

  // Boot
  document.addEventListener("DOMContentLoaded", ()=>{
    bindHeroCTA();
    guardOverlays();
  });

  // เฝ้าระหว่างเลื่อน/ย่อขยาย เพราะ overlay อาจขยับมาทับใหม่
  window.addEventListener("scroll", guardOverlays, {passive:true});
  window.addEventListener("resize", guardOverlays);
  document.addEventListener("click", globalRescue, true);      // capture phase
  document.addEventListener("pointerup", globalRescue, true);  // capture phase

  // เผื่อคุณมีสคริปต์แก้ textContent ปุ่มหลังโหลด เสร็จแล้ว re-bind อีกรอบ
  setTimeout(()=>{ bindHeroCTA(); guardOverlays(); }, 0);
})();
