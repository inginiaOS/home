{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab560
\pard\pardeftab560\slleading20\partightenfactor0

\f0\fs26 \cf0 document.querySelectorAll(".tab").forEach(tab => \{\
  tab.addEventListener("click", () => \{\
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));\
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));\
\
    tab.classList.add("active");\
    document.getElementById(tab.dataset.tab).classList.add("active");\
  \});\
\});\
\
// Add-on selection + LINE quote builder\
let selectedAddons = [];\
\
document.querySelectorAll(".select-addon").forEach(btn => \{\
  btn.addEventListener("click", () => \{\
    const addon = btn.getAttribute("data-addon");\
    if (!selectedAddons.includes(addon)) \{\
      selectedAddons.push(addon);\
      btn.textContent = "\uc0\u3648 \u3621 \u3639 \u3629 \u3585 \u3649 \u3621 \u3657 \u3623  \u10003 ";\
      btn.classList.add("selected");\
      btn.disabled = true;\
    \}\
  \});\
\});\
\
document.getElementById("requestQuote").addEventListener("click", () => \{\
  const basePlan = "InginiaOS Starter (8,800\uc0\u3647  / \u3648 \u3604 \u3639 \u3629 \u3609 )";\
  const text = "\uc0\u3593 \u3633 \u3609 \u3626 \u3609 \u3651 \u3592 :\\n" + basePlan + "\\n\\nAdd-ons:\\n" + (selectedAddons.length ? selectedAddons.join("\\n") : "\u3652 \u3617 \u3656 \u3617 \u3637 ");\
\
  const encodedText = encodeURIComponent(text);\
  // \uc0\u3649 \u3607 \u3609  LINE_ID \u3604 \u3657 \u3623 \u3618  Line ID \u3586 \u3629 \u3591 \u3588 \u3640 \u3603  \u3648 \u3594 \u3656 \u3609  @yourid \u3627 \u3619 \u3639 \u3629  id \u3592 \u3619 \u3636 \u3591 \u3592 \u3634 \u3585  OA\
  window.open(`https://line.me/R/ti/p/~@717xokfa?text=$\{encodedText\}`, "_blank");\
\});}