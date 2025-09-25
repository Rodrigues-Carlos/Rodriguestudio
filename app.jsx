const { useMemo, useState, useEffect } = React;
const { createRoot } = ReactDOM;
const _cfg = document.getElementById("wa-config");
const WA_PHONE = (_cfg?.dataset.phone || "5541999592689").replace(/\D/g, "");
const WA_MSG   = _cfg?.dataset.msg || "Olá, Carlos! Quero orçamento para um vídeo. Podemos conversar?.";
const WA_UTM   = _cfg?.dataset.utm || "";
const WA_ONLY_MOBILE   = (_cfg?.dataset.onlyMobile || "false") === "true";
const WA_SIDE          = (_cfg?.dataset.side || "right").toLowerCase(); // "right" | "left"
const WA_OFFSET_BOTTOM = parseInt(_cfg?.dataset.offsetBottom || "20", 10); // px
const WA_HIDE_ON       = (_cfg?.dataset.hideOn || "").split(",").map(s => s.trim()).filter(Boolean);
const WA_INCLUDE_CTX   = (_cfg?.dataset.includeContext || "").toLowerCase(); // "" | "path" | "path-title"
const WA_LABEL         = _cfg?.dataset.label || "Falar no WhatsApp";

function WhatsAppFAB() {
  // esconder em rotas específicas (mantém se você já usa)
  const path = typeof location !== "undefined" ? location.pathname : "/";
  if (WA_HIDE_ON?.some?.(p => p && path.startsWith(p))) return null;

  // mensagem com contexto (mantém se você já usa)
  let baseMsg = WA_MSG;
  if (WA_INCLUDE_CTX === "path" || WA_INCLUDE_CTX === "path-title") {
    const ctx = [`via ${path}`];
    if (WA_INCLUDE_CTX === "path-title" && typeof document !== "undefined" && document.title) {
      ctx.push(`(${document.title})`);
    }
    baseMsg = `${WA_MSG} ${ctx.join(" ")}`.trim();
  }

  const text = encodeURIComponent(baseMsg);
  const utm  = WA_UTM ? `&${WA_UTM}` : "";
  const href = `https://wa.me/${WA_PHONE}?text=${text}${utm}`;

  // posição
  const sideClass  = (WA_SIDE === "left" ? "left-5" : "right-5");
  const bottomStyle = { bottom: `${WA_OFFSET_BOTTOM || 20}px` };
  const mobileOnlyClass = WA_ONLY_MOBILE ? "md:hidden" : "";

  // efeito: pulse sutil 1s a cada 12s (sem criar elemento fora do botão)
  const [pulse, setPulse] = React.useState(false);
  React.useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1000);
      return () => clearTimeout(t);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  const anchor = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Abrir conversa no WhatsApp"
      style={bottomStyle}
      className={`${mobileOnlyClass} fixed ${sideClass} z-[9999] group focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded-full pointer-events-auto`}
    >
      {/* Glow/Aura (fica dentro, não causa scroll) */}
      <span className="absolute inset-0 rounded-full blur-xl opacity-60 bg-green-500/40 group-hover:bg-green-400/50 transition" />

      {/* Botão */}
      <span
        className={[
          "relative inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-3",
          "text-black font-semibold shadow-lg shadow-green-500/30 border border-white/10",
          "min-h-[44px]",
          pulse ? "ring-2 ring-green-300/60" : "" // <- pulse contido (sem flicker)
        ].join(" ")}
      >
        {/* Ícone WhatsApp (SVG completo + block) */}
        <svg
          viewBox="0 0 26 26"
          className="h-5 w-5 block"
          fill="currentColor"
          role="img"
          aria-label="WhatsApp"
        >
          <path fillRule="evenodd" clipRule="evenodd" d="M19.13 4.868A11.82 11.82 0 0 0 12.046 2h-.006C5.43 2 0 7.43 0 14.04c0 2.52.69 4.96 2.01 7.11L.75 24l3.88-1.02A11.98 11.98 0 0 0 12.04 26h.006C18.65 26 24.08 20.57 24.08 13.96c0-3.18-1.24-6.17-3.45-8.37ZM12.04 24a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 1 1 8.37 4.63Zm5.43-8.63c-.29-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.29-.15-1.26-.46-2.39-1.48a7.54 7.54 0 0 1-1.65-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.08-.12-.27-.2-.57-.35Z"/>
        </svg>

        <span className="hidden sm:inline">{WA_LABEL || "Falar no WhatsApp"}</span>

        {/* Badge de atividade (opcional, dentro do botão) */}
        {/* <span className="absolute right-1 bottom-1 h-2.5 w-2.5 rounded-full bg-white/70 mix-blend-overlay" /> */}
      </span>
    </a>
  );
  return ReactDOM.createPortal(anchor, document.body);
}

function App() {
  const [category, setCategory] = useState("todos");

  const projects = useMemo(() => [
  {
    id: 1,
    title: "Quiz estética",
    cat: "institucional",
    thumb: "thumbs/quiz-estetica.png",
    url: "https://www.instagram.com/p/DOGfTXpDDXq/",
    ratio: "aspect-[9/16]",
  },
  {
    id: 2,
    title: "Canal ESTAFERA",
    cat: "entretenimento",
    url: "https://www.youtube.com/watch?v=NhFd7FyaFMM&t=15s",
    ratio: "aspect-video",
  },
  {
    id: 3,
    title: "Telas Favretto",
    cat: "comercial",
    thumb: "thumbs/clinica-cliente.png",
    url: "conteudo/Criativo-frevetto.mp4",
    ratio: "aspect-square",
  },
  {
    id: 4,
    title: "Carro",
    cat: "cinematico",
    url: "https://www.youtube.com/watch?v=BPAbjeK8yoY",
    ratio: "aspect-video",
  },
  {
    id: 5,
    title: "Moto",
    cat: "cinematico",
    url: "https://www.youtube.com/watch?v=eGM58NmU3oM",
    ratio: "aspect-video",
  },
], []);

  const filtered = useMemo(
    () => (category === "todos" ? projects : projects.filter((p) => p.cat === category)),
    [category, projects]
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <Hero />
      <BrandsStrip />
      <Services />
      <Portfolio category={category} setCategory={setCategory} items={filtered} />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#servicos" className="hover:text-red-500 transition-colors">Serviços</a>
          <a href="#portfolio" className="hover:text-red-500 transition-colors">Portfólio</a>
          <a href="#depoimentos" className="hover:text-red-500 transition-colors">Depoimentos</a>
          <a href="#sobre" className="hover:text-red-500 transition-colors">Sobre</a>
          <a href="#contato" className="hover:text-red-500 transition-colors">Contato</a>
        </nav>
        <a
          href="#contato"
          className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-500 transition-colors"
        >
          Orçar projeto
        </a>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <a href="#top" className="group inline-flex items-center gap-5 select-none">
      <div className="relative">
        <span className="text-2xl font-extrabold tracking-tight leading-none">R</span>
        <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-red-500 text-2xl leading-none">•</span>
      </div>
      <span className="ml-1 text-xs uppercase tracking-[0.25em] text-white/70 group-hover:text-white/90 transition-colors">
        Rodrigues Studio
      </span>
    </a>
  );
}

function Hero() {
  const wa = "5541999592689";
const msg = encodeURIComponent(
  "Olá, Carlos! Quero orçamento para um vídeo. Podemos conversar?"
);
  return (
    <section id="top" className="relative h-[92vh] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,0.9)_100%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Cinema para empresas que querem <span className="text-red-500">resultado</span>.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            Produção e edição de vídeos com linguagem cinematográfica para campanhas, institucionais e social media.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors"
            >
              Ver portfólio
            </a>
            <a
              href={`https://wa.me/${wa}?text=${msg}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold hover:border-red-500 hover:text-red-400 transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandsStrip() {
  return (
    <section className="bg-black border-t border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center gap-x-12 gap-y-4 justify-center text-white/50 text-xs uppercase tracking-widest">
        <span className="opacity-70">Clientes & Parceiros</span>
        <span className="px-3 py-1 rounded-full border border-white/10">Clínicas</span>
        <span className="px-3 py-1 rounded-full border border-white/10">YouTubers</span>
        <span className="px-3 py-1 rounded-full border border-white/10">Startups</span>
        <span className="px-3 py-1 rounded-full border border-white/10">Saúde & Estética</span>
        <span className="px-3 py-1 rounded-full border border-white/10">Comércio Local</span>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      icon: "🎬",
      title: "Produção Institucional",
      desc:
        "Roteiro, gravação e direção de cenas com estética cinematográfica para vídeos institucionais e corporativos.",
      bullets: ["Planejamento criativo", "Captação em alta resolução", "Entrega color grade"],
    },
    {
      icon: "✂️",
      title: "Edição Criativa",
      desc:
        "Montagem ágil, narrativa envolvente e motion sutil para campanhas e anúncios que convertem.",
      bullets: ["Ritmo certo para cada plataforma", "Design de som", "Legendas e cortes dinâmicos"],
    },
    {
      icon: "📱",
      title: "Social Media Audiovisual",
      desc:
        "Calendário de vídeos, formatos verticais e séries com identidade para crescer nas redes.",
      bullets: ["Reels/TikTok/Shorts", "Templates consistentes", "Relatórios de desempenho"],
    },
  ];

  return (
    <section id="servicos" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Serviços</h2>
        <a href="#contato" className="text-sm text-red-400 hover:text-red-300">Solicitar proposta →</a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((s, i) => (
          <div
            key={i}
            className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 hover:border-red-500/60 transition-all"
          >
            <div className="text-4xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-white/70">{s.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {s.bullets.map((b, j) => (
                <li key={j} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" /> {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ytId(u) {
  try {
    const url = new URL(u);
    if (url.hostname.includes("youtu.be")) return url.pathname.slice(1);
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2];
    if (url.hostname.includes("youtube.com")) return url.searchParams.get("v");
  } catch {}
  return null;
}
function toEmbed(url) {
  const id = ytId(url);
  if (id) return { type: "youtube", src: `https://www.youtube.com/embed/${id}?modestbranding=1&rel=0` };
  if (/instagram\.com\/p\//.test(url)) {
    const base = url.split("?")[0].replace(/\/$/, "");
    return { type: "instagram", src: `${base}/embed` };
  }
  if ((url || "").endsWith(".mp4")) return { type: "mp4", src: url };
  return null;
}
function youtubeThumb(u) {
  const id = ytId(u);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

function Portfolio({ category, setCategory, items }) {
  const tabs = [
    { key: "todos",          label: "Todos" },
    { key: "institucional",  label: "Institucional" },
    { key: "comercial",      label: "Comercial" },
    { key: "entretenimento", label: "Entretenimento" },
    { key: "cinematico",     label: "Cinemático" },
  ];
  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20">
      {/* Filtros */}
      <div
        className="mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar"
        role="tablist"
        aria-label="Filtrar portfólio por categoria"
      >
        {tabs.map((t) => {
          const active = category === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(t.key)}
              className={[
                "shrink-0 rounded-full px-4 py-2 text-sm transition-colors border",
                active
                  ? "bg-red-600 border-red-500 text-white"
                  : "bg-black border-white/15 text-white/80 hover:text-white hover:border-red-500/60"
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <article key={p.id} className="group">
            <div className={`${p.ratio} relative overflow-hidden rounded-2xl border border-white/10 bg-white/5`}>
              {(() => {
                const em = toEmbed(p.url || "");
                if (em?.type === "youtube") {
                  return (
                    <iframe
                      src={em.src}
                      title={p.title}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                      loading="lazy"
                    />
                  );
                }
                if (em?.type === "instagram") {
                  return (
                    <iframe
                      src={em.src}
                      title={p.title}
                      className="absolute inset-0 h-full w-full bg-black"
                      loading="lazy"
                    />
                  );
                }
                if (em?.type === "mp4") {
                  return (
                    <video
                      src={em.src}
                      poster={p.thumb}
                      className="absolute inset-0 h-full w-full"
                      controls
                      playsInline
                    />
                  );
                }
                // fallback: capa
                return (
                  <img
                    src={p.thumb || youtubeThumb(p.url) || "https://placehold.co/640x360?text=Prévia"}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                );
              })()}

              {/* overlay de info */}
              <div className="pointer-events-none absolute inset-0 flex items-end p-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/70 mb-1">
                    <span className="h-1 w-1 rounded-full bg-red-500 inline-block" /> {p.cat}
                  </div>
                  <h3 className="text-base font-semibold leading-snug drop-shadow">{p.title}</h3>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      name: "Leo Ritchie",
      role: "Youtuber - Estafera",
      text:
        "Grande Carlão, melhorou a qualidade dos meus vídeos e trouxe mais engajamento no meu canal. Esse cara é nota 10!",
    },
    {
      name: "Investmoney",
      role: "Securitizadora - Startup",
      text:
        "+600% de engajamento nas redes sociais com estratégias direcionadas e foco em qualidade, comprovando a eficiência de conteúdo que converte.",
    },
    {
      name: "Gabriela - Fundadora Octacore",
      role: "Octacore - AAACPUCPR",
      text:
        "Gestor impecável, sempre realizou entregas dentro do prazo e com alta qualidade. Vestiu a camisa da atlética e elevou o nível da propaganda.",
    },
  ];

  return (
    <section id="depoimentos" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Depoimentos</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {quotes.map((q, i) => (
          <figure
            key={i}
            className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6"
          >
            <blockquote className="text-white/80">“{q.text}”</blockquote>
            <figcaption className="mt-4 text-sm text-white/60">
              <span className="font-medium text-white/90">{q.name}</span> — {q.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Sobre o estúdio</h2>
          <p className="mt-4 text-white/80">
            Rodrigues Studio é dirigido por <span className="text-white">Carlos Edaurdo Rodrigues</span>, produtor e editor com 7 anos de experiência
            em edição de vídeos. Meu foco é unir estética, estratégia e performance.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Captação e edição alta resolução</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Motion e color grading</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Formatos para redes</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Roteiro e direção</li>
          </ul>
        </div>
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop"
            alt="Making of"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-white/70">
            Backstage
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const wa = "5541999592689";
  const msg = encodeURIComponent(
    "Olá, Carlos! Quero orçamento para um vídeo. Podemos conversar?"
  );

  return (
    <section id="contato" className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Vamos tirar sua ideia do papel?</h2>

          <a
            href={`https://wa.me/${wa}?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-xl px-8 py-4 font-semibold bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-black/30"
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-4 justify-between text-white/60 text-sm">
        <div className="flex items-center gap-3">
          <Logo />
          <span>© {new Date().getFullYear()} Rodrigues Studio. Todos os direitos reservados.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#portfolio" className="hover:text-white/90">Portfólio</a>
          <a href="#sobre" className="hover:text-white/90">Sobre</a>
          <a href="#contato" className="hover:text-white/90">Contato</a>
        </div>
      </div>
    </footer>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
