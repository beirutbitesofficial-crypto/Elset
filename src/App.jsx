import CartDrawer from "./components/CartDrawer.jsx";
import { Features, Footer, Header, Hero, Marquee, OnRequest, Products, Story, WhatsAppFab } from "./components/Sections.jsx";
import { useReveal } from "./useReveal.js";

export default function App() {
  useReveal();
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <Features />
        <OnRequest />
        <Story />
      </main>
      <Footer />
      <WhatsAppFab />
      <CartDrawer />
    </>
  );
}
