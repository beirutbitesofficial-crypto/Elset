import { useEffect, useState } from "react";
import { CURRENCY, WHATSAPP_NUMBER } from "../config.js";
import { useCart } from "../cart.jsx";
import { Icon, WhatsAppIcon } from "./Icons.jsx";

const EMPTY_FORM = { name: "", phone: "", area: "", address: "", notes: "" };
const REQUIRED = { name: "الاسم", phone: "رقم الهاتف", area: "المنطقة", address: "العنوان" };

function buildMessage({ lines, extras, total, form }) {
  const out = ["🛒 *طلب جديد - منتجات الست*", ""];
  lines.forEach((l) => out.push(`• ${l.name}${l.size ? ` (${l.size})` : ""} × ${l.qty}${l.price > 0 ? ` = ${l.lineTotal}${CURRENCY}` : ""}`));
  if (extras.length) {
    out.push("", "*تحت الطلب:*");
    extras.forEach((x) => out.push(`• ${x}`));
  }
  if (total > 0) out.push("", `*المجموع:* ${total}${CURRENCY} (+ التوصيل)`);
  out.push(
    "",
    `👤 *الاسم:* ${form.name.trim()}`,
    `📞 *الهاتف:* ${form.phone.trim()}`,
    `📍 *المنطقة:* ${form.area.trim()}`,
    `🏠 *العنوان:* ${form.address.trim()}`
  );
  if (form.notes.trim()) out.push(`📝 *ملاحظات:* ${form.notes.trim()}`);
  out.push("", "💵 الدفع عند الاستلام");
  return out.join("\n");
}

export default function CartDrawer() {
  const { open, setOpen, lines, cart, total, hasPrices, setQty, toggleExtra, clear, count } = useCart();
  const [step, setStep] = useState("cart"); // cart | checkout | done
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open && step === "done") setStep("cart");
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (count === 0 && step === "checkout") setStep("cart");
  }, [count, step]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    for (const [k, label] of Object.entries(REQUIRED)) {
      if (!form[k].trim()) er[k] = `${label} مطلوب`;
    }
    if (!er.phone && form.phone.replace(/\D/g, "").length < 7) er.phone = "رقم الهاتف غير صحيح";
    setErrors(er);
    if (Object.keys(er).length) return;

    const msg = buildMessage({ lines, extras: cart.extras, total, form });
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    clear();
    setForm(EMPTY_FORM);
    setStep("done");
  };

  const field = (k, label, props = {}) => {
    const Tag = props.rows ? "textarea" : "input";
    return (
      <label className={`field ${errors[k] ? "has-error" : ""}`}>
        <span>
          {label}
          {REQUIRED[k] && <em> *</em>}
        </span>
        <Tag value={form[k]} onChange={set(k)} {...props} />
        {errors[k] && <small>{errors[k]}</small>}
      </label>
    );
  };

  return (
    <div className={`drawer-root ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-label="سلة الطلب">
        <div className="drawer-head">
          <h2 className="gold-text">
            {step === "checkout" ? "معلومات التوصيل" : step === "done" ? "شكراً لك" : "سلة الطلب"}
          </h2>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="إغلاق">
            <Icon name="close" size={22} />
          </button>
        </div>

        {step !== "done" && (
          <ol className="steps">
            <li className="is-active">السلة</li>
            <li className={step === "checkout" ? "is-active" : ""}>التوصيل</li>
            <li>واتساب</li>
          </ol>
        )}

        {step === "done" && (
          <div className="drawer-body done">
            <span className="done-icon">
              <Icon name="check" size={40} />
            </span>
            <h3>تم تجهيز طلبك!</h3>
            <p>
              فتحنا لك واتساب مع تفاصيل الطلب — اضغط <b>«إرسال»</b> هناك ليصلنا الطلب، وسنتواصل معك للتأكيد.
            </p>
            <button className="btn btn-gold" onClick={() => setOpen(false)}>
              متابعة التسوّق
            </button>
          </div>
        )}

        {step === "cart" && (
          <>
            <div className="drawer-body">
              {count === 0 ? (
                <div className="empty">
                  <Icon name="bag" size={48} />
                  <p>سلتك فاضية</p>
                  <a href="#products" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
                    تصفّح المنتجات
                  </a>
                </div>
              ) : (
                <ul className="lines">
                  {lines.map((l) => (
                    <li key={l.id} className="line">
                      <img src={l.img} alt="" />
                      <div className="line-info">
                        <p className="line-name">
                          {l.name} {l.size && <small className="size-inline">{l.size}</small>}
                        </p>
                        <p className="line-price">
                          {l.price > 0 ? `${l.lineTotal} ${CURRENCY}` : "السعر عند التأكيد"}
                        </p>
                        <div className="stepper stepper-sm">
                          <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="إنقاص">
                            <Icon name="minus" size={14} />
                          </button>
                          <span>{l.qty}</span>
                          <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="زيادة">
                            <Icon name="plus" size={14} />
                          </button>
                        </div>
                      </div>
                      <button className="icon-btn" onClick={() => setQty(l.id, 0)} aria-label="حذف">
                        <Icon name="trash" size={18} />
                      </button>
                    </li>
                  ))}
                  {cart.extras.map((x) => (
                    <li key={x} className="line line-extra">
                      <span className="extra-badge">طازة</span>
                      <div className="line-info">
                        <p className="line-name">{x}</p>
                        <p className="line-price">تحت الطلب</p>
                      </div>
                      <button className="icon-btn" onClick={() => toggleExtra(x)} aria-label="حذف">
                        <Icon name="trash" size={18} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {count > 0 && (
              <div className="drawer-foot">
                {hasPrices && (
                  <p className="total">
                    <span>المجموع</span>
                    <b>
                      {total} {CURRENCY}
                    </b>
                  </p>
                )}
                <p className="pay-note">
                  <Icon name="cash" size={18} /> الدفع نقداً عند الاستلام
                </p>
                <button className="btn btn-gold btn-block" onClick={() => setStep("checkout")}>
                  متابعة الطلب
                </button>
              </div>
            )}
          </>
        )}

        {step === "checkout" && (
          <form className="drawer-form" onSubmit={submit} noValidate>
            <div className="drawer-body">
              {field("name", "الاسم الكامل", { autoComplete: "name", placeholder: "مثال: فاطمة حسن" })}
              {field("phone", "رقم الهاتف", {
                type: "tel",
                inputMode: "tel",
                autoComplete: "tel",
                placeholder: "مثال: 03 123 456",
              })}
              {field("area", "المنطقة", { placeholder: "مثال: بيروت - الحمرا" })}
              {field("address", "العنوان بالتفصيل", { rows: 2, placeholder: "الشارع، البناية، الطابق، علامة مميزة" })}
              {field("notes", "ملاحظات", { rows: 2, placeholder: "وقت مناسب للتوصيل أو أي ملاحظة" })}
            </div>
            <div className="drawer-foot">
              <button type="submit" className="btn btn-wa btn-block">
                <WhatsAppIcon /> تأكيد الطلب عبر واتساب
              </button>
              <button type="button" className="link-btn center" onClick={() => setStep("cart")}>
                → رجوع إلى السلة
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
