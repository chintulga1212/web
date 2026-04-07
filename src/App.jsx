import { useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import heroArt from "./assets/image.png";
import qpayQr from "./assets/monpay.png";
import "./App.css";

const TABS = [
  { id: "bundles", label: "Material" },
  { id: "sets", label: "Sets" },

  { id: "clan", label: "Chest" },
];

const ITEMS = {
  bundles: [
    {
      id: "Material-1",
      name: "Upper Seal 10x",
      desc: "Material",
      price: "2,000 point",
      value: 200,
    },
    {
      id: "Material-2",
      name: "Abyss Sigil 10x",
      desc: "Material",
      price: "1,000 point",
      value: 1000,
    },
    {
      id: "Material-3",
      name: "Chrysalis Sigil",
      desc: "Material",
      price: "2,500 point",
      value: 2500,
    },
    {
      id: "Material-4",
      name: "Azure Heart",
      desc: "Material",
      price: "7,500 point",
      value: 5000,
    },
    {
      id: "Material-5",
      name: "Blood Ring",
      desc: "Material",
      price: "10,000 point",
      value: 10000,
    },
    {
      id: "Material-6",
      name: "Crescend Shard",
      desc: "Material",
      price: "10,000 point",
      value: 130000,
    },
    {
      id: "Material-7",
      name: "Battle Sigil",
      desc: "Material",
      price: "15,000 point",
      value: 15000,
    },
    {
      id: "Material-8",
      name: "Reiatsu Core",
      desc: "Material",
      price: "15,000 point",
      value: 15000,
    },
    {
      id: "Material-9",
      name: "Power Shard 500x",
      desc: "Material",
      price: "30,000 point",
      value: 30000,
    },
    {
      id: "Material-10",
      name: "Passive Shard 500x",
      desc: "Material",
      price: "10,000 point",
      value: 10000,
    },
    {
      id: "Material-11",
      name: "Broken Sword 10x",
      desc: "Material",
      price: "1,000 point",
      value: 1000,
    },
    {
      id: "Material-12",
      name: "Dismantle Fang",
      desc: "Material",
      price: "15,000 point",
      value: 15000,
    },
    {
      id: "Material-13",
      name: "Dark Grail",
      desc: "Material",
      price: "1,000 point",
      value: 1000,
    },
  ],
  sets: [
    {
      id: "set-1",
      name: "Madara set",
      desc: "Legendary drop",
      price: "100,000 point",
      value: 100000,
    },
    {
      id: "set-2",
      name: "Atomic set",
      desc: "Арена багц",
      price: "45,000 point",
      value: 45000,
    },
    {
      id: "set-3",
      name: "Gojo set",
      desc: "Raid-ын сет",
      price: "20,000 point",
      value: 20000,
    },
    {
      id: "set-4",
      name: "True Aizen",
      desc: "Premium skin",
      price: "75,000 point",
      value: 75000,
    },
    {
      id: "set-5",
      name: "Moon set",
      desc: "Premium skin",
      price: "75,000 point",
      value: 75000,
    },
    {
      id: "set-6",
      name: "Demon king set",
      desc: "Premium skin",
      price: "30,000 point",
      value: 30000,
    },
    {
      id: "set-7",
      name: "Sukuna set",
      desc: "Premium skin",
      price: "20,000 point",
      value: 20000,
    },
    {
      id: "set-8",
      name: "Blessed Maiden set",
      desc: "Premium skin",
      price: "40,000 point",
      value: 40000,
    },
    {
      id: "set-9",
      name: "Gilgamish set",
      desc: "Premium skin",
      price: "65,000 point",
      value: 65000,
    },
    {
      id: "set-10",
      name: "Yamato set",
      desc: "Premium skin",
      price: "90,000 point",
      value: 90000,
    },
  ],

  clan: [
    {
      id: "Aura-1",
      name: "Aura Create",
      desc: "Create aura",
      price: "100000 point",
      value: 100000,
    },
    {
      id: "Cosmic-2",
      name: "Cosmic Create",
      desc: "Create cosmic item",
      price: "80000 point",
      value: 80000,
    },

    {
      id: "Mythic Chest-4",
      name: "Mythic Chest",
      desc: "Chest",
      price: "1000 point",
      value: 1000,
    },
    {
      id: "Legendary Chest-5",
      name: "Legendary Chest",
      desc: "Chest",
      price: "500 point",
      value: 500,
    },
  ],
};

function HomePage() {
  const [activeTab, setActiveTab] = useState("bundles");
  const [quantityByTab, setQuantityByTab] = useState(() =>
    Object.fromEntries(TABS.map((tab) => [tab.id, ""])),
  );

  const [selectedByTab, setSelectedByTab] = useState(() =>
    Object.fromEntries(
      TABS.map((tab) => [tab.id, ITEMS[tab.id]?.[0]?.id || ""]),
    ),
  );

  const currentItems = useMemo(() => ITEMS[activeTab] || [], [activeTab]);
  const selectedId = selectedByTab[activeTab] || currentItems[0]?.id;
  const selectedItem = useMemo(
    () => currentItems.find((item) => item.id === selectedId),
    [currentItems, selectedId],
  );
  const quantity = quantityByTab[activeTab];
  const numericQuantity =
    quantity === "" ? 0 : Math.min(100, Math.max(1, Number(quantity)));
  const totalValue = selectedItem ? selectedItem.value * numericQuantity : 0;
  const totalLabel = totalValue
    ? `${totalValue.toLocaleString("en-US")} point`
    : "0 point";
  const [showQr, setShowQr] = useState(false);
  const isPayDisabled = totalValue === 0;

  return (
    <div className="market">
      <header className="market-header">
        <div className="brand">
          <span className="brand-mark">K</span>
          <div>
            <p className="brand-title">Kairina Vault</p>
            <span className="brand-sub">Game item exchange</span>
          </div>
        </div>
        <nav className="market-nav">
          <a href="#items">Items</a>
          <a href="#bundles">Bundles</a>
          <a href="#support">Support</a>
        </nav>
        <span className="nav-cta" aria-disabled="true">
          Нэвтрэх
        </span>
      </header>

      <main className="market-grid">
        <section className="spotlight">
          <div className="cover-frame">
            <img src={heroArt} alt="Sailor Piece cover art" />
            <div className="cover-badge">Legendary drop</div>
          </div>
        </section>

        <section className="detail-stack">
          <div className="spotlight-body">
            <p className="label">Featured title</p>
            <h1>Sailor Piece</h1>
            <p className="spotlight-copy">
              Roblox-ийн Sailor Piece тоглоом доторх, багц болон item-уудыг шууд
              хүргэнэ. Төлбөр баталгаажсаны дараа бид таньтай шуурхай холбогдож,
              үйлчилгээг хүргэж ажиллана.
            </p>
            <div className="spotlight-actions">
              <button className="primary-cta">Багц сонгох</button>
              <button className="ghost-cta">Жагсаалтыг харах</button>
            </div>
          </div>
        </section>
      </main>

      <section className="purchase purchase-wide" id="items">
        <div className="purchase-head">
          <div>
            <p className="purchase-title">Худалдан авах</p>
            <span>Багц эсвэл сет сонгоод сагсанд нэмнэ үү</span>
          </div>
          <div className="status-pill">Live</div>
        </div>

        <div className="tab-row" id="bundles">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              type="button"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bundle-list">
          {currentItems.map((item) => (
            <label className="bundle" key={item.name}>
              <input
                type="radio"
                name="bundle"
                checked={selectedId === item.id}
                onChange={() =>
                  setSelectedByTab((prev) => ({
                    ...prev,
                    [activeTab]: item.id,
                  }))
                }
              />
              <div>
                <p>{item.name}</p>
                <span>{item.desc}</span>
              </div>
              <strong>{item.price}</strong>
            </label>
          ))}
        </div>

        <div className="purchase-footer">
          <div className="total">
            <span>Нийт</span>
            <strong>{totalLabel}</strong>
          </div>
          <div className="qty">
            <span>Тоо</span>
            <div className="qty-controls">
              <button
                type="button"
                onClick={() =>
                  setQuantityByTab((prev) => ({
                    ...prev,
                    [activeTab]: Math.max(1, Number(prev[activeTab] || 1) - 1),
                  }))
                }
              >
                -
              </button>
              <input
                className="qty-input"
                type="number"
                min="1"
                max="100"
                value={quantity}
                placeholder="0"
                onChange={(event) => {
                  const nextValue = event.target.value.trim();
                  if (nextValue === "") {
                    setQuantityByTab((prev) => ({
                      ...prev,
                      [activeTab]: "",
                    }));
                    return;
                  }
                  const raw = Number(nextValue);
                  const next = Number.isNaN(raw)
                    ? 1
                    : Math.min(100, Math.max(1, raw));
                  setQuantityByTab((prev) => ({
                    ...prev,
                    [activeTab]: next,
                  }));
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setQuantityByTab((prev) => ({
                    ...prev,
                    [activeTab]: Math.min(
                      100,
                      Number(prev[activeTab] || 0) + 1,
                    ),
                  }))
                }
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="qpay-row">
          <button
            className="qpay-cta"
            type="button"
            disabled={isPayDisabled}
            onClick={() => setShowQr(true)}
          >
            Pay with QPay
          </button>
          <span className="qpay-note">
            Donate хийхийг хүсвэл MonPay хийгээрэй.
          </span>
        </div>

        {showQr ? (
          <div
            className="qpay-modal"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setShowQr(false);
              }
            }}
          >
            <button
              className="qpay-overlay"
              type="button"
              onClick={() => setShowQr(false)}
              aria-label="Close QPay modal"
            />
            <div className="qpay-panel">
              <div className="qpay-head">
                <div>
                  <p className="qpay-title">QPay төлбөр</p>
                  <span>Захиалгын дүн: {totalLabel}</span>
                </div>
                <button
                  className="qpay-close"
                  type="button"
                  onClick={() => setShowQr(false)}
                >
                  ✕
                </button>
              </div>
              <img src={qpayQr} alt="QPay QR" />
            </div>
          </div>
        ) : null}

        <div className="support-card" id="support">
          <p>Баталгаатай хүргэлт</p>
          <span>
            Таны захиалгыг шуурхай хүргэнэ. Асуудал гарвал бид даруй холбогдож,
            хүлээн авах хүртэл анхааран хянаж ажиллана.
          </span>
        </div>
      </section>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Нэвтрэх</h2>
          <p>Захиалга болон статус шалгахын тулд нэвтэрнэ үү.</p>
        </div>
        <form className="login-form">
          <label>
            <span>Имэйл эсвэл хэрэглэгчийн нэр</span>
            <input type="text" placeholder="username@email.com" />
          </label>
          <label>
            <span>Нууц үг</span>
            <input type="password" placeholder="••••••••" />
          </label>
          <div className="login-actions">
            <button type="submit" className="checkout-cta">
              Нэвтрэх
            </button>
            <button type="button" className="ghost-cta">
              Бүртгүүлэх
            </button>
          </div>
        </form>
        <button className="login-link" type="button">
          Нууц үг мартсан уу?
        </button>

        <Link className="login-back" to="/">
          ← Нүүр хуудас руу буцах
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
