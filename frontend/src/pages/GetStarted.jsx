import { useNavigate } from "react-router-dom";

const GetStartedStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .gs-root {
      font-family: 'DM Sans', sans-serif;
      color: #1a1a1a;
      background: #f5f0e8;
      min-height: 100vh;
    }

    /* ── Hero ── */
    .gs-hero {
      background: #0d2e1a;
      padding: 100px 24px 80px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .gs-hero-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(165,214,167,0.07);
      pointer-events: none;
    }
    .gs-hero-ring-1 { width: 500px; height: 500px; top: -200px; right: -100px; }
    .gs-hero-ring-2 { width: 380px; height: 380px; bottom: -120px; left: -80px; }
    .gs-hero-ring-3 { width: 660px; height: 660px; top: 50%; left: 50%; transform: translate(-50%,-50%); opacity: 0.3; }

    .gs-hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(46,125,50,0.2);
      border: 1px solid rgba(165,214,167,0.25);
      border-radius: 50px;
      padding: 6px 18px;
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #a5d6a7; margin-bottom: 24px; position: relative;
    }
    .gs-hero-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(40px, 7vw, 76px);
      font-weight: 600; color: #ffffff;
      line-height: 1.06; margin-bottom: 10px;
      position: relative;
    }
    .gs-hero-title em { font-style: italic; color: #a5d6a7; }
    .gs-hero-sub {
      font-size: clamp(15px, 2vw, 18px);
      color: rgba(200,230,201,0.6);
      max-width: 580px; margin: 0 auto 40px;
      line-height: 1.7; position: relative;
    }
    .gs-hero-cta-group { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; }
    .gs-btn-primary {
      font-family: 'DM Sans', sans-serif;
      font-size: 15px; font-weight: 500;
      padding: 13px 36px; border-radius: 50px;
      border: none; background: #a5d6a7; color: #0d2e1a;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    }
    .gs-btn-primary:hover { background: #c8e6c9; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(165,214,167,0.3); }
    .gs-btn-outline {
      font-family: 'DM Sans', sans-serif;
      font-size: 15px; font-weight: 500;
      padding: 13px 32px; border-radius: 50px;
      border: 1.5px solid rgba(255,255,255,0.2);
      background: transparent; color: rgba(255,255,255,0.8);
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s, color 0.2s;
    }
    .gs-btn-outline:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.07); color: #fff; }

    /* Scroll indicator */
    .gs-scroll {
      position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      color: rgba(255,255,255,0.25); font-size: 10px;
      letter-spacing: 0.12em; text-transform: uppercase;
    }
    .gs-scroll-line {
      width: 1px; height: 36px;
      background: linear-gradient(to bottom, rgba(165,214,167,0.5), transparent);
      animation: gs-scrollpulse 1.8s ease-in-out infinite;
    }
    @keyframes gs-scrollpulse {
      0%,100% { opacity: 0.3; } 50% { opacity: 0.8; }
    }

    /* ── Section wrapper ── */
    .gs-section { max-width: 1100px; margin: 0 auto; padding: 72px 24px; }
    .gs-section-sm { max-width: 760px; margin: 0 auto; padding: 64px 24px; }

    /* Section heading */
    .gs-section-tag {
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.18em; text-transform: uppercase;
      color: #2e7d32; margin-bottom: 10px;
    }
    .gs-section-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 600; color: #0d2e1a;
      line-height: 1.15; margin-bottom: 16px;
    }
    .gs-section-title em { font-style: italic; color: #2e7d32; }
    .gs-section-body {
      font-size: 15.5px; color: #3a4a3f;
      line-height: 1.8; margin-bottom: 14px;
    }

    /* ── What is nutraceutical ── */
    .gs-what-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }
    .gs-what-visual {
      background: #0d2e1a;
      border-radius: 20px;
      padding: 40px 32px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .gs-what-visual::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at 30% 30%, rgba(46,125,50,0.3), transparent 60%);
    }
    .gs-word-stack { position: relative; display: flex; flex-direction: column; gap: 6px; }
    .gs-word {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 600; color: rgba(255,255,255,0.15);
      font-size: clamp(28px, 4vw, 44px);
      letter-spacing: 0.04em;
      transition: color 0.2s;
    }
    .gs-word.hi { color: #a5d6a7; font-size: clamp(34px, 5vw, 54px); }
    .gs-word-plus {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(22px, 3vw, 32px);
      color: rgba(165,214,167,0.4);
      margin: 4px 0;
    }
    .gs-word-eq {
      width: 48px; height: 2px;
      background: rgba(165,214,167,0.3);
      margin: 8px auto;
    }
    .gs-word-result {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(14px, 2vw, 18px);
      color: rgba(200,230,201,0.7);
      letter-spacing: 0.12em; text-transform: uppercase;
      margin-top: 6px;
    }

    /* ── Timeline ── */
    .gs-timeline { position: relative; padding-left: 32px; }
    .gs-timeline::before {
      content: '';
      position: absolute; left: 9px; top: 6px;
      width: 2px; bottom: 6px;
      background: linear-gradient(to bottom, #2e7d32, rgba(46,125,50,0.1));
    }
    .gs-tl-item { position: relative; margin-bottom: 36px; }
    .gs-tl-item:last-child { margin-bottom: 0; }
    .gs-tl-dot {
      position: absolute; left: -27px; top: 4px;
      width: 16px; height: 16px; border-radius: 50%;
      background: #2e7d32;
      border: 3px solid #f5f0e8;
      box-shadow: 0 0 0 2px #2e7d32;
    }
    .gs-tl-year {
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase;
      color: #2e7d32; margin-bottom: 4px;
    }
    .gs-tl-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 19px; font-weight: 600;
      color: #0d2e1a; margin-bottom: 6px;
    }
    .gs-tl-desc { font-size: 14px; color: #5a6a5f; line-height: 1.65; }

    /* ── Categories grid ── */
    .gs-cat-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 36px;
    }
    .gs-cat-card {
      background: #ffffff;
      border: 1px solid #e8e0d0;
      border-radius: 14px;
      padding: 22px 18px;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .gs-cat-card:hover { transform: translateY(-3px); box-shadow: 0 6px 22px rgba(0,0,0,0.09); }
    .gs-cat-icon { font-size: 30px; margin-bottom: 10px; display: block; }
    .gs-cat-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px; font-weight: 600;
      color: #0d2e1a; margin-bottom: 6px;
    }
    .gs-cat-desc { font-size: 12.5px; color: #5a6a5f; line-height: 1.55; }

    /* ── Dark band ── */
    .gs-dark-band { background: #0d2e1a; padding: 72px 24px; }
    .gs-dark-inner { max-width: 1100px; margin: 0 auto; }
    .gs-dark-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 600; color: #ffffff;
      line-height: 1.15; margin-bottom: 8px;
    }
    .gs-dark-title em { font-style: italic; color: #a5d6a7; }
    .gs-dark-sub { font-size: 14px; color: rgba(200,230,201,0.55); margin-bottom: 40px; }

    .gs-benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 16px;
    }
    .gs-benefit {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(165,214,167,0.1);
      border-radius: 14px;
      padding: 22px 20px;
      transition: background 0.2s;
    }
    .gs-benefit:hover { background: rgba(255,255,255,0.07); }
    .gs-benefit-icon { font-size: 24px; margin-bottom: 10px; display: block; }
    .gs-benefit-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px; font-weight: 600;
      color: #c8e6c9; margin-bottom: 6px;
    }
    .gs-benefit-desc { font-size: 13px; color: rgba(200,230,201,0.55); line-height: 1.6; }

    /* ── Popular examples table ── */
    .gs-examples { margin-top: 36px; display: flex; flex-direction: column; gap: 10px; }
    .gs-example-row {
      display: grid;
      grid-template-columns: 180px 1fr auto;
      align-items: center;
      gap: 16px;
      background: #ffffff;
      border: 1px solid #e8e0d0;
      border-radius: 12px;
      padding: 14px 18px;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }
    .gs-ex-name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 17px; font-weight: 600; color: #0d2e1a;
    }
    .gs-ex-use { font-size: 13.5px; color: #5a6a5f; line-height: 1.5; }
    .gs-ex-badge {
      font-size: 11px; font-weight: 500;
      padding: 4px 12px; border-radius: 50px;
      white-space: nowrap;
    }
    .gs-ex-badge.herb   { background: #f1f8f2; color: #2e7d32; border: 1px solid #c8e6c9; }
    .gs-ex-badge.vitamin { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
    .gs-ex-badge.mineral { background: #f0f4ff; color: #3949ab; border: 1px solid #c5cae9; }
    .gs-ex-badge.probiotic { background: #fce4ec; color: #c2185b; border: 1px solid #f8bbd0; }

    /* ── Safety section ── */
    .gs-safety-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 28px;
    }
    .gs-safety-card {
      border-radius: 14px;
      padding: 22px 20px;
    }
    .gs-safety-card.do   { background: #f1f8f2; border: 1px solid #c8e6c9; }
    .gs-safety-card.dont { background: #fff5f5; border: 1px solid #ffcdd2; }
    .gs-safety-label {
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.14em; text-transform: uppercase;
      margin-bottom: 12px;
    }
    .gs-safety-card.do   .gs-safety-label { color: #2e7d32; }
    .gs-safety-card.dont .gs-safety-label { color: #c62828; }
    .gs-safety-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .gs-safety-item { display: flex; gap: 9px; font-size: 13.5px; color: #3a4a3f; line-height: 1.5; }
    .gs-safety-icon { flex-shrink: 0; margin-top: 1px; }

    /* ── Quote band ── */
    .gs-quote { background: #1a4a2a; padding: 56px 24px; text-align: center; }
    .gs-quote-text {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(20px, 3vw, 30px);
      font-style: italic; color: rgba(200,230,201,0.9);
      max-width: 700px; margin: 0 auto 12px; line-height: 1.5;
    }
    .gs-quote-src { font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(165,214,167,0.5); }

    /* ── Final CTA ── */
    .gs-cta-band {
      background: #f5f0e8;
      padding: 80px 24px;
      text-align: center;
      border-top: 1px solid #e8e0d0;
    }
    .gs-cta-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(30px, 5vw, 52px);
      font-weight: 600; color: #0d2e1a;
      line-height: 1.15; margin-bottom: 12px;
    }
    .gs-cta-title em { font-style: italic; color: #2e7d32; }
    .gs-cta-sub { font-size: 16px; color: #5a6a5f; margin-bottom: 36px; line-height: 1.6; }

    /* ── Footer ── */
    .gs-footer {
      text-align: center; padding: 24px;
      font-size: 12px; color: #a09888;
      border-top: 1px solid #e8e0d0;
    }

    /* ── Divider ── */
    .gs-divider { height: 1px; background: #e8e0d0; }

    @media (max-width: 768px) {
      .gs-what-grid  { grid-template-columns: 1fr; }
      .gs-what-visual { display: none; }
      .gs-example-row { grid-template-columns: 1fr; }
      .gs-ex-badge { width: fit-content; }
      .gs-safety-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 480px) {
      .gs-hero { padding: 100px 16px 70px; }
      .gs-section { padding: 48px 16px; }
      .gs-section-sm { padding: 48px 16px; }
    }
  `}</style>
);

/* ── Data ── */
const timeline = [
  { year: "Ancient Times", title: "Roots in Ayurveda & Traditional Medicine", desc: "Civilisations in India, China, Egypt and Greece used herbs, spices, and foods as medicine. Turmeric, ashwagandha, ginseng, and garlic were documented as healing substances thousands of years ago." },
  { year: "1920s–1940s", title: "Discovery of Vitamins & Minerals", desc: "Scientists isolated essential vitamins (A, B, C, D, E, K) and identified their roles in preventing deficiency diseases like scurvy, rickets, and pellagra — laying the foundation for nutritional science." },
  { year: "1989", title: "The Term 'Nutraceutical' is Coined", desc: "Dr. Stephen DeFelice combined 'nutrition' and 'pharmaceutical' to create the word nutraceutical, defining it as any food or part of a food that provides medical or health benefits beyond basic nutrition." },
  { year: "1990s–2000s", title: "Industry Growth & Regulation", desc: "The global nutraceuticals market expanded rapidly. Governments introduced regulations (like the US DSHEA 1994) to govern supplement labelling and safety claims." },
  { year: "2010s", title: "Functional Foods Boom", desc: "Probiotic yogurts, omega-3 enriched eggs, fortified cereals and antioxidant beverages became mainstream as consumers began seeking foods that actively promoted health." },
  { year: "Today", title: "Personalised Nutraceuticals & AI Guidance", desc: "Advanced research, genomics, and AI now allow personalised supplement recommendations based on individual health profiles, diet, genetics, and disease risk." },
];

const categories = [
  { icon: "🌿", name: "Herbal Extracts", desc: "Derived from plants — roots, leaves, flowers, bark — like Ashwagandha, Turmeric, Neem, and Ginseng." },
  { icon: "💊", name: "Dietary Supplements", desc: "Vitamins, minerals, amino acids taken in capsule, tablet, or powder form to fill nutritional gaps." },
  { icon: "🥛", name: "Functional Foods", desc: "Everyday foods enriched with bioactive compounds — probiotic yogurt, omega-3 eggs, fortified milk." },
  { icon: "🧬", name: "Probiotics", desc: "Live beneficial bacteria that support gut health, immunity, and mental wellbeing." },
  { icon: "🐟", name: "Nutraceutical Oils", desc: "Omega-3 fatty acids from fish oil and flaxseed that support heart, brain, and joint health." },
  { icon: "🍵", name: "Phytochemicals", desc: "Plant compounds like polyphenols, flavonoids, and carotenoids with powerful antioxidant effects." },
];

const benefits = [
  { icon: "❤️", title: "Heart Health", desc: "Omega-3s, CoQ10, and magnesium support cardiovascular function and reduce inflammation." },
  { icon: "🧠", title: "Brain & Memory", desc: "Bacopa, lion's mane mushroom, and B-vitamins promote cognitive function and mental clarity." },
  { icon: "🛡️", title: "Immunity Boost", desc: "Vitamin C, zinc, elderberry, and echinacea strengthen immune response and reduce illness duration." },
  { icon: "🦴", title: "Bone Strength", desc: "Calcium, vitamin D3, and K2 work together to build and maintain healthy bone density." },
  { icon: "⚡", title: "Energy & Vitality", desc: "Ashwagandha, iron, and B-complex vitamins combat fatigue and support sustained energy levels." },
  { icon: "🌙", title: "Sleep & Stress", desc: "Melatonin, magnesium glycinate, and L-theanine promote restful sleep and reduce cortisol." },
  { icon: "🌱", title: "Gut Health", desc: "Probiotics and prebiotics maintain a healthy microbiome for digestion, immunity, and mood." },
  { icon: "✨", title: "Skin & Hair", desc: "Collagen peptides, biotin, and vitamin E support skin elasticity, hair strength, and nail health." },
];

const examples = [
  { name: "Ashwagandha", use: "Reduces stress, boosts energy, supports thyroid and adrenal health", type: "herb" },
  { name: "Turmeric (Curcumin)", use: "Powerful anti-inflammatory, supports joint health and digestion", type: "herb" },
  { name: "Vitamin D3", use: "Bone density, immune function, mood regulation", type: "vitamin" },
  { name: "Omega-3 (Fish Oil)", use: "Heart health, brain function, inflammation reduction", type: "vitamin" },
  { name: "Magnesium", use: "Muscle relaxation, sleep quality, blood sugar regulation", type: "mineral" },
  { name: "Zinc", use: "Immune support, wound healing, testosterone production", type: "mineral" },
  { name: "Lactobacillus acidophilus", use: "Gut microbiome balance, digestion, IBS relief", type: "probiotic" },
  { name: "Neem", use: "Antibacterial, blood purification, skin conditions, diabetes", type: "herb" },
];

const doList = [
  "Consult a healthcare provider before starting any supplement",
  "Check for third-party testing and quality certifications",
  "Follow recommended dosages on labels",
  "Inform your doctor about supplements you take",
  "Buy from reputable, licensed manufacturers",
];

const dontList = [
  "Don't replace prescribed medications with supplements",
  "Avoid mega-dosing — more is not always better",
  "Don't take supplements without knowing interactions",
  "Avoid products with unverified health claims",
  "Don't give adult supplements to children without guidance",
];

/* ── Main component ── */
const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="gs-root">
      <GetStartedStyle />

      {/* ── Hero ── */}
      <section className="gs-hero">
        <div className="gs-hero-ring gs-hero-ring-1" />
        <div className="gs-hero-ring gs-hero-ring-2" />
        <div className="gs-hero-ring gs-hero-ring-3" />

        <div className="gs-hero-badge">🌿 Your Complete Guide</div>

        <h1 className="gs-hero-title">
          What Are<br /><em>Nutraceuticals?</em>
        </h1>
        <p className="gs-hero-sub">
          Discover the ancient science and modern research behind nature's most powerful healing compounds — and how they can transform your health.
        </p>
        <div className="gs-hero-cta-group">
          <button className="gs-btn-primary" onClick={() => navigate("/signup")}>
            Create Free Account
          </button>
          <button className="gs-btn-outline" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
        <div className="gs-scroll">
          <div className="gs-scroll-line" />
          Explore
        </div>
      </section>

      {/* ── What is a nutraceutical ── */}
      <section className="gs-section">
        <div className="gs-what-grid">
          <div>
            <p className="gs-section-tag">The Definition</p>
            <h2 className="gs-section-title">Nutrition meets<br /><em>Pharmaceutical</em></h2>
            <p className="gs-section-body">
              The word <strong>nutraceutical</strong> was coined in 1989 by Dr. Stephen DeFelice by combining <em>nutrition</em> and <em>pharmaceutical</em>. It refers to any food, food component, or supplement that provides health benefits beyond basic nutritional value — including the prevention or treatment of disease.
            </p>
            <p className="gs-section-body">
              Unlike regular food which nourishes the body, and unlike drugs which treat specific diseases, nutraceuticals occupy a unique space in between — they are natural, bioactive substances that actively support health, prevent illness, and enhance physiological function.
            </p>
            <p className="gs-section-body">
              They include everything from a handful of turmeric in your curry, to omega-3 capsules on your shelf, to the probiotics in your morning yogurt.
            </p>
          </div>
          <div className="gs-what-visual">
            <div className="gs-word-stack">
              <div className="gs-word">NUTRITION</div>
              <div className="gs-word-plus">+</div>
              <div className="gs-word">PHARMACEUTICAL</div>
              <div className="gs-word-eq" />
              <div className="gs-word hi">NUTRACEUTICAL</div>
              <div className="gs-word-result">Food as Medicine</div>
            </div>
          </div>
        </div>
      </section>

      <div className="gs-divider" />

      {/* ── History Timeline ── */}
      <section className="gs-section-sm">
        <p className="gs-section-tag">History & Origin</p>
        <h2 className="gs-section-title">How It All <em>Began</em></h2>
        <p className="gs-section-body" style={{ marginBottom: 40 }}>
          The science of nutraceuticals is thousands of years old, even if the word itself is recent. Humans have always used food as medicine — from ancient Ayurvedic texts to modern clinical trials.
        </p>
        <div className="gs-timeline">
          {timeline.map((item, i) => (
            <div key={i} className="gs-tl-item">
              <div className="gs-tl-dot" />
              <p className="gs-tl-year">{item.year}</p>
              <p className="gs-tl-title">{item.title}</p>
              <p className="gs-tl-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="gs-divider" />

      {/* ── Categories ── */}
      <section className="gs-section">
        <p className="gs-section-tag">Types & Categories</p>
        <h2 className="gs-section-title">The Six Main <em>Categories</em></h2>
        <p className="gs-section-body">
          Nutraceuticals are classified into several broad categories based on their source, form, and mechanism of action. Understanding these helps you choose the right type for your specific health goals.
        </p>
        <div className="gs-cat-grid">
          {categories.map((c, i) => (
            <div key={i} className="gs-cat-card">
              <span className="gs-cat-icon">{c.icon}</span>
              <p className="gs-cat-name">{c.name}</p>
              <p className="gs-cat-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Benefits dark band ── */}
      <section className="gs-dark-band">
        <div className="gs-dark-inner">
          <p className="gs-section-tag" style={{ color: "#a5d6a7" }}>Health Benefits</p>
          <h2 className="gs-dark-title">What Can Nutraceuticals<br /><em>Do For You?</em></h2>
          <p className="gs-dark-sub">
            Backed by decades of clinical research, these bioactive compounds address a wide range of health conditions.
          </p>
          <div className="gs-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="gs-benefit">
                <span className="gs-benefit-icon">{b.icon}</span>
                <p className="gs-benefit-title">{b.title}</p>
                <p className="gs-benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Examples ── */}
      <section className="gs-section">
        <p className="gs-section-tag">Common Examples</p>
        <h2 className="gs-section-title">Popular <em>Nutraceuticals</em></h2>
        <p className="gs-section-body">
          Here are some of the most widely researched and used nutraceuticals, their primary applications, and their category.
        </p>
        <div className="gs-examples">
          {examples.map((ex, i) => (
            <div key={i} className="gs-example-row">
              <p className="gs-ex-name">{ex.name}</p>
              <p className="gs-ex-use">{ex.use}</p>
              <span className={`gs-ex-badge ${ex.type}`}>
                {ex.type.charAt(0).toUpperCase() + ex.type.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="gs-divider" />

      {/* ── Safety ── */}
      <section className="gs-section-sm">
        <p className="gs-section-tag">Safety & Guidelines</p>
        <h2 className="gs-section-title">Using Nutraceuticals <em>Responsibly</em></h2>
        <p className="gs-section-body">
          Nutraceuticals are generally safe when used correctly, but like any bioactive substance they require informed, responsible use. Here is what to keep in mind.
        </p>
        <div className="gs-safety-grid">
          <div className="gs-safety-card do">
            <p className="gs-safety-label">✓ Do This</p>
            <ul className="gs-safety-list">
              {doList.map((d, i) => (
                <li key={i} className="gs-safety-item">
                  <span className="gs-safety-icon" style={{ color: "#2e7d32" }}>✓</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="gs-safety-card dont">
            <p className="gs-safety-label">✕ Avoid This</p>
            <ul className="gs-safety-list">
              {dontList.map((d, i) => (
                <li key={i} className="gs-safety-item">
                  <span className="gs-safety-icon" style={{ color: "#c62828" }}>✕</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Quote ── */}
      <section className="gs-quote">
        <p className="gs-quote-text">
          "The doctor of the future will no longer treat the human frame with drugs, but rather will cure and prevent disease with nutrition."
        </p>
        <p className="gs-quote-src">— Thomas Edison</p>
      </section>

      {/* ── Final CTA ── */}
      <section className="gs-cta-band">
        <p className="gs-section-tag" style={{ marginBottom: 10 }}>Ready to Begin?</p>
        <h2 className="gs-cta-title">Start Your<br /><em>Wellness Journey</em></h2>
        <p className="gs-cta-sub">
          Search our database of Ayurvedic remedies and nutraceuticals tailored to your condition — with dosage guidance, plant profiles, and safety notes.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="gs-btn-primary" style={{ background: "#2e7d32", color: "#fff" }} onClick={() => navigate("/signup")}>
            Create Free Account
          </button>
          <button
            className="gs-btn-outline"
            style={{ border: "1.5px solid #2e7d32", color: "#2e7d32" }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </div>
      </section>

      <footer className="gs-footer">
        © {new Date().getFullYear()} Nutracare · Ayurvedic &amp; Nutraceutical Guidance System
      </footer>
    </div>
  );
};

export default GetStarted;