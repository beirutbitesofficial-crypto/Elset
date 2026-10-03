// ===== Settings: edit these =====
const WHATSAPP_NUMBER = "96181896924"; // Lebanon +961 81 896 924, digits only
const CURRENCY = "$";

// Set price to 0 to hide it ("السعر عند التأكيد").
const PRODUCTS = [
  {
    id: "samneh",
    name: "سمنة الست",
    desc: "سمنة طبيعية 100% من حليب أبقار بلدي طازج",
    img: "assets/samneh.jpg",
    price: 0,
  },
  {
    id: "tahini",
    name: "طحينة الست",
    desc: "طحينة سمسم 100% من حبوب السمسم الطبيعية المختارة",
    img: "assets/tahini.jpg",
    price: 0,
  },
  {
    id: "peanut",
    name: "زبدة الفول السوداني",
    desc: "زبدة فول سوداني 100% من حبوب طبيعية مختارة",
    img: "assets/peanut.jpg",
    price: 0,
  },
];
// =================================

const cart = Object.fromEntries(PRODUCTS.map((p) => [p.id, 0]));

const $ = (sel) => document.querySelector(sel);
const priceLabel = (p) => (p.price > 0 ? `${p.price} ${CURRENCY}` : "السعر عند التأكيد");

function renderProducts() {
  $("#productGrid").innerHTML = PRODUCTS.map(
    (p) => `
    <article class="card product">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <h3>${p.name}</h3>
      <p class="muted">${p.desc}</p>
      <p class="price">${priceLabel(p)}</p>
      <div class="qty" data-id="${p.id}">
        <button type="button" data-act="dec" aria-label="إنقاص">−</button>
        <span id="q-${p.id}">0</span>
        <button type="button" data-act="inc" aria-label="زيادة">+</button>
      </div>
    </article>`
  ).join("");
}

function update() {
  let count = 0;
  let total = 0;
  const lines = [];
  for (const p of PRODUCTS) {
    const q = cart[p.id];
    $(`#q-${p.id}`).textContent = q;
    if (q > 0) {
      count += q;
      total += q * p.price;
      lines.push(`<li><span>${p.name} × ${q}</span><span>${p.price > 0 ? q * p.price + " " + CURRENCY : ""}</span></li>`);
    }
  }
  $("#cartCount").textContent = count;
  const hasPrices = PRODUCTS.some((p) => p.price > 0);
  $("#summary").innerHTML = count
    ? `<h3>طلبك</h3><ul>${lines.join("")}</ul>${
        hasPrices ? `<p class="total">المجموع: ${total} ${CURRENCY} <small>(+ التوصيل)</small></p>` : ""
      }`
    : `<p class="muted center">السلة فاضية — اختار منتجاتك من فوق 👆</p>`;
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".qty button");
  if (!btn) return;
  const id = btn.parentElement.dataset.id;
  cart[id] = Math.max(0, Math.min(50, cart[id] + (btn.dataset.act === "inc" ? 1 : -1)));
  update();
});

$("#orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.target;
  const err = $("#formError");
  const data = Object.fromEntries(new FormData(f));
  const extras = [...f.querySelectorAll('input[name="extra"]:checked')].map((c) => c.value);
  const items = PRODUCTS.filter((p) => cart[p.id] > 0);

  if (!items.length && !extras.length) {
    err.textContent = "اختار منتج واحد على الأقل.";
    $("#products").scrollIntoView({ behavior: "smooth" });
    return;
  }
  for (const k of ["name", "phone", "area", "address"]) {
    if (!String(data[k] || "").trim()) {
      err.textContent = "عبّي كل الخانات المطلوبة (*).";
      f.elements[k].focus();
      return;
    }
  }
  if (String(data.phone).replace(/\D/g, "").length < 7) {
    err.textContent = "رقم الهاتف غير صحيح.";
    f.elements.phone.focus();
    return;
  }
  err.textContent = "";

  const total = items.reduce((s, p) => s + cart[p.id] * p.price, 0);
  const msg = [
    "🛒 *طلب جديد - منتجات الست*",
    "",
    ...items.map((p) => `• ${p.name} × ${cart[p.id]}${p.price > 0 ? ` = ${cart[p.id] * p.price}${CURRENCY}` : ""}`),
    ...(extras.length ? ["", "*تحت الطلب:*", ...extras.map((x) => `• ${x}`)] : []),
    ...(total > 0 ? ["", `*المجموع:* ${total}${CURRENCY} (+ التوصيل)`] : []),
    "",
    `👤 *الاسم:* ${data.name.trim()}`,
    `📞 *الهاتف:* ${data.phone.trim()}`,
    `📍 *المنطقة:* ${data.area.trim()}`,
    `🏠 *العنوان:* ${data.address.trim()}`,
    ...(String(data.notes || "").trim() ? [`📝 *ملاحظات:* ${data.notes.trim()}`] : []),
    "",
    "💵 الدفع عند الاستلام",
  ].join("\n");

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
});

renderProducts();
update();
