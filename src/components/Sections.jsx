import { useEffect, useState } from "react";
import { CURRENCY, FEATURES, ON_REQUEST, PHONE_DISPLAY, PRODUCTS, WHATSAPP_NUMBER } from "../config.js";
import { useCart } from "../cart.jsx";
import { Icon, Ornament, WhatsAppIcon } from "./Icons.jsx";

export function Header() {
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#top" className="brand">
        <span className="brand-mark">
          <img src="assets/logo.jpg" alt="" />
        </span>
        <span className="brand-name">منتجات الست</span>
      </a>
      <nav className="nav">
        <a href="#products">المنتجات</a>
        <a href="#request">تحت الطلب</a>
        <a href="#story">قصتنا</a>
      </nav>
      <button className="bag-btn" onClick={() => setOpen(true)} aria-label="سلة الطلب">
        <Icon name="bag" size={22} />
        {count > 0 && <span className="bag-count">{count}</span>}
      </button>
    </header>
  );
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="sparkles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <i key={i} style={{ "--i": i }} />
        ))}
      </div>

      <div className="hero-text">
        <p className="eyebrow">من الخير .. للطبيعة</p>
        <h1 className="hero-title">
          <span className="gold-text">منتجات الست</span>
        </h1>
        <p className="hero-tagline">نقية · طبيعية · صحية</p>
        <Ornament />
        <p className="hero-lead">من الطبيعة إلى مائدتك .. جودة وطعم أصيل، محضّرة بعناية منذ 2020.</p>
        <div className="hero-cta">
          <a href="#products" className="btn btn-gold">
            تسوّق الآن
          </a>
          <a href="#story" className="btn btn-ghost">
            اكتشف قصتنا
          </a>
        </div>
        <ul className="hero-perks">
          <li>
            <Icon name="cash" size={20} /> الدفع عند الاستلام
          </li>
          <li>
            <Icon name="truck" size={20} /> توصيل لجميع المناطق
          </li>
        </ul>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="pedestal" />
        <img className="jar jar-l" src="assets/samneh.jpg" alt="" />
        <img className="jar jar-r" src="assets/peanut.jpg" alt="" />
        <img className="jar jar-c" src="assets/tahini.jpg" alt="" />
      </div>
    </section>
  );
}

export function Marquee() {
  const words = ["100% طبيعي", "من دون سكّر", "بلا مواد حافظة", "خالٍ من الغلوتين", "أصالة", "جودة", "ثقة"];
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...row, ...row].map((w, i) => (
          <span key={i}>
            {w} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionHead({ kicker, title, children }) {
  return (
    <div className="section-head reveal">
      <p className="kicker">{kicker}</p>
      <h2 className="section-title gold-text">{title}</h2>
      <Ornament />
      {children && <p className="section-sub">{children}</p>}
    </div>
  );
}

function ProductCard({ p, index }) {
  const { qtyOf, add, setQty, setOpen } = useCart();
  const qty = qtyOf(p.id);
  return (
    <article className="product reveal" style={{ "--d": `${index * 120}ms` }}>
      <div className="product-frame">
        <span className="product-no">0{index + 1}</span>
        <div className="product-media">
          <img src={p.img} alt={p.name} loading="lazy" />
        </div>
        <div className="product-body">
          <p className="product-sub">{p.subtitle}</p>
          <h3 className="product-name">{p.name}</h3>
          <p className="product-desc">{p.desc}</p>
          <div className="product-meta">
            <span className="chip">100% طبيعي</span>
            <span className="chip">{p.note}</span>
          </div>
          <div className="product-foot">
            <span className="price">
              {p.price > 0 ? `${p.price} ${CURRENCY}` : "السعر عند التأكيد"}
              {p.size && <small className="size">مرطبان {p.size}</small>}
            </span>
            {qty === 0 ? (
              <button className="btn btn-gold btn-sm" onClick={() => add(p.id)}>
                أضف إلى السلة
              </button>
            ) : (
              <div className="stepper">
                <button onClick={() => setQty(p.id, qty - 1)} aria-label="إنقاص">
                  <Icon name="minus" size={16} />
                </button>
                <span>{qty}</span>
                <button onClick={() => add(p.id)} aria-label="زيادة">
                  <Icon name="plus" size={16} />
                </button>
              </div>
            )}
          </div>
          {qty > 0 && (
            <button className="link-btn" onClick={() => setOpen(true)}>
              عرض السلة وإتمام الطلب ←
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function Products() {
  return (
    <section className="section" id="products">
      <SectionHead kicker="المتوفّر دائماً" title="مجموعة الست">
        ثلاثة أصناف أصيلة، تُحضَّر من أجود المكوّنات الطبيعية
      </SectionHead>
      <div className="products">
        {PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

export function OnRequest() {
  const { cart, toggleExtra } = useCart();
  return (
    <section className="section request" id="request">
      <SectionHead kicker="تحت الطلب" title="طازة على طلبك">
        نحضّرها لك خصيصاً عند الطلب — اختر ما تحب ونتواصل معك لتأكيد التفاصيل
      </SectionHead>
      <div className="request-grid">
        {ON_REQUEST.map((name, i) => {
          const on = cart.extras.includes(name);
          return (
            <button
              key={name}
              className={`request-item reveal ${on ? "is-on" : ""}`}
              style={{ "--d": `${i * 90}ms` }}
              onClick={() => toggleExtra(name)}
              aria-pressed={on}
            >
              <span className="request-check">{on ? <Icon name="check" size={16} /> : <Icon name="plus" size={16} />}</span>
              <span className="request-name">{name}</span>
              <span className="request-hint">{on ? "مضافة إلى طلبك" : "أضف إلى الطلب"}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function Story() {
  return (
    <section className="section story" id="story">
      <div className="story-card reveal">
        <div className="story-logo">
          <img src="assets/logo.jpg" alt="شعار منتجات الست" />
        </div>
        <div className="story-text">
          <p className="kicker">منذ 2020</p>
          <h2 className="section-title gold-text">أصالة .. جودة .. ثقة</h2>
          <p>
            بدأت حكاية «الست» من مطبخ البيت، من وصفات الجدّات وطعم الأيام الحلوة. نختار مكوّناتنا بأيدينا، من حليب
            الأبقار البلدي الطازج إلى أجود حبوب السمسم والفول السوداني، ونحضّرها بلا سكّر، بلا مواد حافظة، وبلا أي
            إضافات.
          </p>
          <p>كل مرطبان بيوصلك هو وعد بالنقاء — من الطبيعة إلى مائدتك.</p>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="section features">
      {FEATURES.map((f, i) => (
        <div key={f.title} className="feature reveal" style={{ "--d": `${i * 100}ms` }}>
          <span className="feature-icon">
            <Icon name={f.icon} size={30} />
          </span>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
        </div>
      ))}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <Ornament />
      <img src="assets/logo.jpg" alt="" className="footer-logo" />
      <p className="footer-brand gold-text">منتجات الست</p>
      <p className="footer-tag">نقية .. طبيعية .. صحية</p>
      <a className="footer-phone" href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener">
        <WhatsAppIcon size={20} /> <span dir="ltr">{PHONE_DISPLAY}</span>
      </a>
      <p className="footer-small">توصيل متوفر لجميع المناطق · الدفع عند الاستلام</p>
      <p className="footer-small">© {new Date().getFullYear()} منتجات الست</p>
    </footer>
  );
}

export function WhatsAppFab() {
  return (
    <a
      className="wa-fab"
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener"
      aria-label="تواصل عبر واتساب"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
