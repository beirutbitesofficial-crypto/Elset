import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS } from "./config.js";

const CartContext = createContext(null);
const KEY = "elset-cart-v1";
const MAX_QTY = 50;

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (saved && typeof saved === "object") {
      return { items: saved.items || {}, extras: Array.isArray(saved.extras) ? saved.extras : [] };
    }
  } catch {}
  return { items: {}, extras: [] };
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const api = useMemo(() => {
    const setQty = (id, qty) =>
      setCart((c) => {
        const items = { ...c.items };
        const q = Math.max(0, Math.min(MAX_QTY, qty));
        if (q === 0) delete items[id];
        else items[id] = q;
        return { ...c, items };
      });

    const lines = PRODUCTS.filter((p) => cart.items[p.id] > 0).map((p) => ({
      ...p,
      qty: cart.items[p.id],
      lineTotal: cart.items[p.id] * p.price,
    }));

    return {
      cart,
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0) + cart.extras.length,
      total: lines.reduce((s, l) => s + l.lineTotal, 0),
      hasPrices: lines.some((l) => l.price > 0),
      qtyOf: (id) => cart.items[id] || 0,
      setQty,
      add: (id) => setQty(id, (cart.items[id] || 0) + 1),
      toggleExtra: (name) =>
        setCart((c) => ({
          ...c,
          extras: c.extras.includes(name) ? c.extras.filter((x) => x !== name) : [...c.extras, name],
        })),
      clear: () => setCart({ items: {}, extras: [] }),
      open,
      setOpen,
    };
  }, [cart, open]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
