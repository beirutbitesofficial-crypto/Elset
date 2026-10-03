// ===== Store settings — edit here =====
export const WHATSAPP_NUMBER = "96181896924"; // +961 81 896 924, digits only
export const PHONE_DISPLAY = "81 896 924";
export const CURRENCY = "$";

// Set `price` to a number (e.g. 8) to show prices and totals.
// Leave it at 0 to show "السعر عند التأكيد".
export const PRODUCTS = [
  {
    id: "samneh",
    name: "سمنة الست",
    subtitle: "سمنة بلدية",
    desc: "سمنة طبيعية 100% من حليب أبقار بلدي طازج، بطعم البيت ورائحة الأصالة.",
    img: "assets/samneh.jpg",
    size: "نص كيلو",
    price: 10,
    note: "حليب بلدي طازج",
  },
  {
    id: "tahini",
    name: "طحينة الست",
    subtitle: "طحينة سمسم",
    desc: "طحينة سمسم 100% من حبوب السمسم الطبيعية المختارة، ناعمة وغنية.",
    img: "assets/tahini.jpg",
    size: "600 غ",
    price: 4,
    note: "سمسم مختار",
  },
  {
    id: "peanut",
    name: "زبدة الفول السوداني",
    subtitle: "زبدة طبيعية",
    desc: "زبدة فول سوداني 100% من حبوب طبيعية مختارة، بلا سكّر ولا إضافات.",
    img: "assets/peanut.jpg",
    size: "300 غ",
    price: 3,
    note: "حبوب محمّصة",
  },
];

// Made fresh on request
export const ON_REQUEST = ["زبدة البندق", "زبدة الفستق الحلبي", "زبدة الكاجو", "زبدة اللوز"];

export const FEATURES = [
  { icon: "leaf", title: "100% طبيعي", text: "مكوّنات من الطبيعة فقط" },
  { icon: "sugar", title: "من دون سكّر", text: "حلاوة المكوّن كما هو" },
  { icon: "flask", title: "بلا مواد حافظة", text: "طازج ونقي دائماً" },
  { icon: "wheat", title: "خالٍ من الغلوتين", text: "مناسب للجميع" },
];
