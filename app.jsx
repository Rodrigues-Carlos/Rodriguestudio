const { useMemo, useState, useEffect, useRef } = React;
const { createRoot } = ReactDOM;
const _cfg = document.getElementById("wa-config");
const WA_PHONE = (_cfg?.dataset.phone || "5541995353406").replace(/\D/g, "");
const WA_MSG   = _cfg?.dataset.msg || "Olá, Carlos! Quero orçamento para um vídeo. Podemos conversar?.";
const WA_UTM   = _cfg?.dataset.utm || "";
const WA_ONLY_MOBILE   = (_cfg?.dataset.onlyMobile || "false") === "true";
const WA_SIDE          = (_cfg?.dataset.side || "right").toLowerCase();
const WA_OFFSET_BOTTOM = parseInt(_cfg?.dataset.offsetBottom || "20", 10);
const WA_HIDE_ON       = (_cfg?.dataset.hideOn || "").split(",").map(s => s.trim()).filter(Boolean);
const WA_INCLUDE_CTX   = (_cfg?.dataset.includeContext || "").toLowerCase();
const WA_LABEL         = _cfg?.dataset.label || "Falar no WhatsApp";
const LINKEDIN_URL = "https://www.linkedin.com/in/edu-carlos/";
const PROJECT_DESCRIPTIONS = {
  1: "Filme de produto com ritmo e acabamento para destacar presença e desejo pela marca.",
  2: "Criativo vertical pensado para transformar interesse em interação no universo da estética.",
  3: "Motion design que organiza informação e reforça valor de produto em poucos segundos.",
  4: "Edição dinâmica para gerar retenção e energia em conteúdo automotivo.",
  5: "Narrativa curta criada para interromper o scroll e abrir conversa com o público.",
  6: "Peça social com mensagem direta, construída para engajamento e reconhecimento local.",
  7: "Conteúdo gamer com ritmo, identidade e cortes que sustentam atenção até o fim.",
  8: "Flyer de campanha com hierarquia visual para comunicar e mobilizar a comunidade.",
  9: "Post de marca criado para transformar uma mensagem técnica em leitura imediata.",
  10: "Identidade visual que traduz segurança, clareza e confiança para o digital.",
  11: "Arte de parceria com presença visual para ampliar alcance entre comunidades.",
  12: "Peça promocional com informação objetiva e impacto para divulgação de evento.",
  13: "Flyer de atração com linguagem jovem, contraste forte e chamada para ação.",
};

function WhatsAppFAB() {
  const path = typeof location !== "undefined" ? location.pathname : "/";
  const hideOnPath = WA_HIDE_ON?.some?.(p => p && path.startsWith(p));
  const [hideAtPageEnd, setHideAtPageEnd] = React.useState(false);

  React.useEffect(() => {
    const updateVisibility = () => {
      const page = document.documentElement;
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageBottom = page.scrollHeight;
      setHideAtPageEnd(pageBottom - scrollBottom < 180);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

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

  const sideClass  = (WA_SIDE === "left" ? "left-5" : "right-5");
  const bottomStyle = { bottom: `${WA_OFFSET_BOTTOM || 20}px` };
  const mobileOnlyClass = WA_ONLY_MOBILE ? "md:hidden" : "";

  const [pulse, setPulse] = React.useState(false);
  React.useEffect(() => {
    const id = setInterval(() => {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1000);
      return () => clearTimeout(t);
    }, 12000);
    return () => clearInterval(id);
  }, []);

  if (hideOnPath) return null;

  const anchor = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      title="Abrir conversa no WhatsApp"
      style={bottomStyle}
      className={[
        mobileOnlyClass,
        "fixed",
        sideClass,
        "z-[9999] group focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded-full transition-all duration-300",
        hideAtPageEnd ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"
      ].join(" ")}
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

function VideoPlayer({ project }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play();
    else video.pause();
  };

  const seek = (event) => {
    const video = videoRef.current;
    const nextTime = Number(event.target.value);
    if (video && Number.isFinite(nextTime)) video.currentTime = nextTime;
  };

  const toggleFullscreen = () => {
    const player = videoRef.current?.parentElement;
    if (!player) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else player.requestFullscreen?.();
  };

  return (
    <div className="group/player relative w-full overflow-hidden rounded-2xl bg-black shadow-2xl shadow-black/60">
      <video
        ref={videoRef}
        src={project.url}
        poster={project.thumb}
        playsInline
        preload="metadata"
        className="max-h-[74vh] w-full object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pausar video" : "Reproduzir video"}
        className={`absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-black/55 text-xl text-white backdrop-blur-md transition-all duration-300 ${isPlaying ? "opacity-0 group-hover/player:opacity-100" : "opacity-100 hover:scale-105"}`}
      >
        {isPlaying ? "Ⅱ" : "▶"}
      </button>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-4 pb-4 pt-12 opacity-100 transition-opacity md:opacity-0 md:group-hover/player:opacity-100">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          step="0.1"
          onChange={seek}
          aria-label="Progresso do video"
          className="mb-3 h-1 w-full cursor-pointer accent-red-500"
        />
        <div className="flex items-center justify-between text-xs font-medium text-white">
          <div className="flex items-center gap-3">
            <button type="button" onClick={togglePlayback} className="transition-colors hover:text-red-400" aria-label={isPlaying ? "Pausar video" : "Reproduzir video"}>{isPlaying ? "Pausar" : "Reproduzir"}</button>
            <button type="button" onClick={() => { const video = videoRef.current; if (video) { video.muted = !video.muted; setMuted(video.muted); } }} className="transition-colors hover:text-red-400" aria-label={muted ? "Ativar som" : "Silenciar video"}>{muted ? "Sem som" : "Som"}</button>
          </div>
          <button type="button" onClick={toggleFullscreen} className="transition-colors hover:text-red-400" aria-label="Tela cheia">Tela cheia</button>
        </div>
      </div>
    </div>
  );
}

function ProjectLightbox({ project, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} role="dialog" aria-modal="true" aria-label={project.title}>
      <div className="relative w-full max-w-6xl">
        <button type="button" onClick={onClose} aria-label="Fechar visualizacao" className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition-colors hover:bg-red-500">×</button>
        {project.type === "video" ? <VideoPlayer project={project} /> : <img src={project.url} alt={project.title} className="max-h-[82vh] w-full rounded-2xl object-contain" />}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div><p className="text-xs uppercase tracking-[.18em] text-red-400">{project.type === "video" ? "Video" : "Peca estatica"}</p><h2 className="mt-1 text-xl font-semibold text-white">{project.title}</h2></div>
          <p className="max-w-md text-right text-sm leading-6 text-white/60">{project.description}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState("video");

  const projects = useMemo(() => [

    {
    id: 1,
    title: "Ford Bronco",
    type: "video",
    thumb: "thumbs/bronco.jpg",
    url: "conteudo/carro.mp4",
    ratio: "aspect-video",
  },
  {
    id: 2,
    title: "Quiz estética",
    type: "video",
    thumb: "thumbs/quiz-estetica.png",
    url: "conteudo/quiz.mp4",
    ratio: "aspect-[9/16]",
  },
  {
    id: 3,
    title: "Motion Hafele",
    type: "video",
    thumb: "thumbs/Hafele.png",
    url: "conteudo/Motion Hafele.mp4",
    ratio: "aspect-video",
  },
  {
    id: 4,
    title: "DrifftCar",
    type: "video",
    thumb: "thumbs/drifft.png",
    url: "conteudo/drifftcar.mp4",
    ratio: "aspect-[9/16]",
  },
  {
    id: 5,
    title: "Se o pix sumisse?",
    type: "video",
    thumb: "thumbs/pix.png",
    url: "conteudo/Dr. Cadu.mp4",
    ratio: "aspect-[9/16]",
  },
  {
    id: 6,
    title: "Telas Favretto",
    type: "video",
    thumb: "thumbs/clinica-cliente.png",
    url: "conteudo/Criativo-frevetto.mp4",
    ratio: "aspect-square",
  },
  {
    id: 7,
    title: "Melhor Sniper - Warzone",
    type: "video",
    thumb: "thumbs/capa-sniper.png",
    url: "conteudo/melhorsniper.mp4",
    ratio: "aspect-video",
  },
  {
    id: 8,
    title: "Flyer Octacore",
    type: "static",
    url: "conteudo/Flyer Octacore.png",
    ratio: "aspect-[0.707/1]",
  },
  {
    id: 9,
    title: "Post GDSun",
    type: "static",
    url: "conteudo/postgds.png",
    ratio: "aspect-[1.91/1]",
  },
  {
    id: 10,
    title: "Logo Cibersegurança",
    type: "static",
    url: "conteudo/Ciberseglogo.jpg",
    ratio: "aspect-[2.08/1]",
  },
  {
    id: 11,
    title: "Post Octa + UNI",
    type: "static",
    url: "conteudo/UNI.png",
    ratio: "aspect-[4/1]",
  },
  {
    id: 12,
    title: "Flyer CyberCon",
    type: "static",
    url: "conteudo/Cybercon.png",
    ratio: "aspect-[0.707/1]",
  },
  {
    id: 13,
    title: "Flyer Calouros",
    type: "static",
    url: "conteudo/procura-se.png",
    ratio: "aspect-[0.707/1]",
  },
].map((project) => ({ ...project, description: PROJECT_DESCRIPTIONS[project.id] })), []);

  const filtered = useMemo(
  () => projects.filter((p) => p.type === filter),
  [projects, filter]
);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <ScrollExperience />
      <Header />
      <Hero />
      <BrandsStrip />
      <Services />
      <Portfolio
        filter={filter}
        setFilter={setFilter}
        items={filtered}
        setLightbox={setLightbox}
      />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
      <WhatsAppFAB />
      {lightbox && <ProjectLightbox project={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

function ScrollExperience() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      }),
      { threshold: 0.14, rootMargin: "-8% 0px -8%" }
    );

    if (reducedMotion) revealItems.forEach((item) => item.classList.add("is-visible"));
    else revealItems.forEach((item) => observer.observe(item));

    let frame;
    const updateProgress = () => {
      frame = undefined;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(updateProgress); };
    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return null;
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 28);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`header-shell fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${scrolled ? "is-scrolled" : "bg-black/45 border-white/5"}`}>
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
          className="button-lift inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-500"
        >
          Orçar projeto
        </a>
      </div>
      <div className="scroll-progress absolute bottom-0 left-0 h-px w-full bg-red-500" aria-hidden="true" />
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
        Rodrigues Films
      </span>
    </a>
  );
}

function LinkedInIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="4" fill="currentColor" />
      <circle cx="7.1" cy="7.25" r="1.7" fill="white" />
      <path d="M5.65 10.1h2.9V18h-2.9v-7.9Z" fill="white" />
      <path
        d="M10.55 10.1h2.75v1.08c.48-.72 1.33-1.28 2.62-1.28 2.05 0 3.43 1.35 3.43 4.05V18h-2.9v-3.72c0-1.23-.48-1.86-1.46-1.86-.98 0-1.54.68-1.54 1.86V18h-2.9v-7.9Z"
        fill="white"
      />
    </svg>
  );
}

function Hero() {
  const wa = "5541995353406";
const msg = encodeURIComponent(
  "Olá, Carlos! Quero orçamento para um vídeo. Podemos conversar?"
);
  return (
    <section id="top" className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover brightness-[0.45]"
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.6)_60%,rgba(0,0,0,0.9)_100%)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="hero-copy max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Cinema para empresas que querem <span className="text-red-500">resultado</span>.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            Produção e edição de vídeos com linguagem cinematográfica para campanhas, institucionais e social media.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#portfolio"
              className="button-lift rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-red-500 hover:text-white"
            >
              Ver portfólio
            </a>
            <a
              href={`https://wa.me/${wa}?text=${msg}`}
              target="_blank"
              rel="noreferrer"
              className="button-lift rounded-full border border-white/20 px-5 py-3 text-sm font-semibold hover:border-red-500 hover:text-red-400"
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
        "Vídeos que posicionam sua marca, traduzem valor e ajudam decisões de compra acontecerem.",
      bullets: ["Narrativa orientada a resultado", "Captação com padrão cinematográfico", "Imagem que reforça confiança"],
    },
    {
      icon: "✂️",
      title: "Edição Criativa",
      desc:
        "Campanhas que geram engajamento com ritmo, clareza e uma ideia que fica na memória.",
      bullets: ["Atenção nos primeiros segundos", "Design de som que cria impacto", "Cortes pensados para conversão"],
    },
    {
      icon: "📱",
      title: "Social Media Audiovisual",
      desc:
        "Conteúdo com identidade e performance para sua marca ser reconhecida no feed e lembrada depois.",
      bullets: ["Formatos que respeitam cada plataforma", "Identidade visual consistente", "Conteúdo feito para gerar conversa"],
    },
  ];

  return (
    <section id="servicos" data-reveal className="reveal max-w-7xl mx-auto px-6 pt-20 pb-10">
      <div className="flex items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Serviços</h2>
        <a href="#contato" className="text-sm text-red-400 hover:text-red-300">Solicitar proposta →</a>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {items.map((p, i) => (
    <article
      key={i}
      className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 
                 transition-all duration-300 hover:-translate-y-1 
                 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10"
    >
      {/* Ícone / balão */}
      <div className="mb-6 inline-flex h-14 w-14 items-center justify-center 
                      rounded-full bg-red-500/10 text-3xl 
                      group-hover:bg-red-500 group-hover:text-black transition">
        {p.icon}
      </div>

      <h3 className="text-xl font-semibold mb-3">
        {p.title}
      </h3>

      <p className="text-sm text-white/70 mb-4">
        {p.desc}
      </p>

      <ul className="space-y-2 text-sm text-white/60">
        {p.bullets.map((b, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            {b}
          </li>
        ))}
      </ul>
    </article>
  ))}
</div>
    </section>
  );
}

function Portfolio({ filter, setFilter, items, setLightbox }) {
  const [page, setPage] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isDesktopCarousel, setIsDesktopCarousel] = useState(false);
  const [carouselMetrics, setCarouselMetrics] = useState({
    viewport: 0,
    card: 0,
    gap: 16,
  });
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const firstCardRef = useRef(null);
  const touchRef = useRef({
    startX: 0,
    startY: 0,
    handled: false,
  });

  const isVideo = filter === "video";
  const usePeekCarousel = isVideo || !isDesktopCarousel;
  const cloneCount = useMemo(() => {
    if (!usePeekCarousel || !items.length) return 0;

    const { viewport, card, gap } = carouselMetrics;
    const measuredStep = card + gap;
    const visibleCards = measuredStep > 0 ? Math.ceil(viewport / measuredStep) : 2;
    return Math.min(items.length, Math.max(2, visibleCards + 1));
  }, [carouselMetrics, items.length, usePeekCarousel]);
  const carouselItems = useMemo(() => {
    if (!items.length) return [];
    if (!usePeekCarousel) return items;

    const headClones = items.slice(-cloneCount);
    const tailClones = items.slice(0, cloneCount);
    return [...headClones, ...items, ...tailClones];
  }, [cloneCount, items, usePeekCarousel]);
  const maxPage = isDesktopCarousel && !usePeekCarousel
    ? Math.max(items.length - 3, 0)
    : Math.max(items.length - 1, 0);
  const cardWidth = isDesktopCarousel
    ? isVideo
      ? "calc((100% - 48px) / 3.5)"
      : "calc((100% - 32px) / 3)"
    : isVideo
    ? "50%"
    : "70%";

  useEffect(() => {
    setPage((p) => Math.min(p, maxPage));
  }, [maxPage]);

  useEffect(() => {
    setTransitionEnabled(false);
    setVisualIndex(usePeekCarousel ? cloneCount + page : page);

    const frame = requestAnimationFrame(() => {
      setTransitionEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [cloneCount, items.length, usePeekCarousel]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktopCarousel(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const card = firstCardRef.current;
      if (!viewport || !track || !card) return;

      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
      setCarouselMetrics({
        viewport: viewport.getBoundingClientRect().width,
        card: card.getBoundingClientRect().width,
        gap,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [carouselItems.length, isDesktopCarousel, isVideo]);

  const carouselTranslate = (() => {
    const { viewport, card, gap } = carouselMetrics;
    if (!card) return 0;

    const step = card + gap;
    if (isDesktopCarousel && isVideo) {
      return -card / 2 - visualIndex * step;
    }

    if (isDesktopCarousel) {
      return -visualIndex * step;
    }

    return viewport / 2 - card / 2 - visualIndex * step;
  })();

  const selectFilter = (nextFilter) => {
    setPage(0);
    setFilter(nextFilter);
  };

  const goPrevious = () => {
    if (!items.length) return;

    setTransitionEnabled(true);
    if (usePeekCarousel && page <= 0) {
      setPage(maxPage);
      setVisualIndex(cloneCount - 1);
      return;
    }

    const nextPage = page <= 0 ? maxPage : page - 1;
    setPage(nextPage);
    setVisualIndex(usePeekCarousel ? cloneCount + nextPage : nextPage);
  };

  const goNext = () => {
    if (!items.length) return;

    setTransitionEnabled(true);
    if (usePeekCarousel && page >= maxPage) {
      setPage(0);
      setVisualIndex(cloneCount + items.length);
      return;
    }

    const nextPage = page >= maxPage ? 0 : page + 1;
    setPage(nextPage);
    setVisualIndex(usePeekCarousel ? cloneCount + nextPage : nextPage);
  };

  const handleTransitionEnd = (event) => {
    if (event.target !== trackRef.current || !usePeekCarousel || !items.length) return;

    if (visualIndex >= cloneCount + items.length) {
      setTransitionEnabled(false);
      setVisualIndex(cloneCount);
    } else if (visualIndex < cloneCount) {
      setTransitionEnabled(false);
      setVisualIndex(cloneCount + items.length - 1);
    }
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      handled: false,
    };
  };

  const handleTouchMove = (event) => {
    const state = touchRef.current;
    if (state.handled) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - state.startX;
    const deltaY = touch.clientY - state.startY;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
      return;
    }

    state.handled = true;
    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  return (
    <section id="portfolio" data-reveal className="reveal max-w-7xl mx-auto px-6 pt-10 pb-20">
      <div className="flex items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">Portfólio</h2>
      </div>

      <div className="mb-8 flex gap-3">
        {[
          { key: "video", label: "Vídeos" },
          { key: "static", label: "Estáticos" },
        ].map((t) => {
          const active = filter === t.key;
          return (
            <button
              key={t.key}
              onClick={() => selectFilter(t.key)}
              className={[
                "rounded-full px-6 py-2 text-sm font-medium transition-all border",
                active
                  ? "bg-red-600 border-red-500 text-white"
                  : "border-white/15 text-white/70 hover:border-red-500/60"
              ].join(" ")}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div
        ref={viewportRef}
        className="relative overflow-hidden touch-pan-y"
        onTouchStartCapture={handleTouchStart}
        onTouchMoveCapture={handleTouchMove}
      >
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className={[
              "flex gap-4 will-change-transform",
              transitionEnabled ? "transition-transform duration-500 ease-out" : ""
            ].join(" ")}
            style={{ transform: `translateX(${carouselTranslate}px)` }}
          >
            {carouselItems.map((p, index) => (
              <article
                ref={index === 0 ? firstCardRef : null}
                key={`${p.id}-${index}`}
                style={{ width: cardWidth }}
                className="group flex flex-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10"
              >
                <div
                  role="button"
                  tabIndex="0"
                  onClick={() => setLightbox(p)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setLightbox(p); } }}
                  aria-label={`Abrir ${p.title}`}
                  className="relative h-48 cursor-pointer overflow-hidden bg-black md:h-56"
                >
                  <img
                    src={isVideo ? p.thumb : p.url}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[.16em] text-white/90 backdrop-blur-md">
                    {isVideo ? "Video" : "Estatico"}
                  </span>
                  {isVideo && <span className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/45 pl-0.5 text-sm text-white backdrop-blur-md">▶</span>}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{p.description}</p>
                  <button
                    type="button"
                    onClick={() => setLightbox(p)}
                    className="button-lift mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-red-500 hover:bg-red-500"
                  >
                    {isVideo ? "Ver video" : "Abrir peca"}
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

                <button
          onClick={goPrevious}
          className="absolute left-3 top-1/2 -translate-y-1/2
                    bg-red-500/20 text-red-400
                    hover:bg-red-500/40 hover:text-white
                    backdrop-blur-md
                    rounded-full w-11 h-11 flex items-center justify-center
                    transition-all shadow-lg shadow-red-500/20"
          aria-label="Projeto anterior"
        >
          ‹
        </button>


                <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2
                    bg-red-500/20 text-red-400
                    hover:bg-red-500/40 hover:text-white
                    backdrop-blur-md
                    rounded-full w-11 h-11 flex items-center justify-center
                    transition-all shadow-lg shadow-red-500/20"
          aria-label="Proximo projeto"
        >
          ›
        </button>

      </div>
      <div className="mt-6 flex items-center justify-center gap-2" aria-label="Navegacao do portfolio">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Ir para ${item.title}`}
            aria-current={index === page ? "true" : undefined}
            onClick={() => {
              setTransitionEnabled(true);
              setPage(index);
              setVisualIndex(usePeekCarousel ? cloneCount + index : index);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === page ? "w-7 bg-red-500" : "w-1.5 bg-white/25 hover:bg-white/60"}`}
          />
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
        "A edição elevou a qualidade dos vídeos e trouxe mais engajamento para o canal, sem perder a identidade do conteúdo.",
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
        "Entregas dentro do prazo e alta qualidade que elevaram o nível da comunicação e da propaganda da atlética.",
    },
  ];

  return (
    <section id="depoimentos" data-reveal className="reveal max-w-7xl mx-auto px-6 py-20">
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
    <section id="sobre" data-reveal className="reveal max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold">Sobre o estúdio</h2>
          <p className="mt-4 text-white/80">
            A Rodrigues Films é dirigida por <span className="text-white">Carlos Eduardo Rodrigues</span>: produção visual para marcas de estética, startups e redes sociais
            que precisam transformar atenção em percepção de valor. São 3 anos de edição com olhar cinematográfico, unindo estética, estratégia e performance.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Visual que valoriza marcas</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Motion e color grading estratégico</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Conteúdo nativo para redes</li>
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Roteiro com foco em resposta</li>
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
  const wa = "5541995353406";
  const msg = encodeURIComponent(
    "Olá, Carlos! Quero orçamento para um vídeo. Podemos conversar?"
  );

  return (
    <section id="contato" data-reveal className="reveal max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Vamos tirar sua ideia do papel?</h2>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/${wa}?text=${msg}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-black/30"
            >
              Falar no WhatsApp
            </a>

            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir LinkedIn de Carlos Eduardo"
              title="LinkedIn"
              className="inline-flex h-14 w-14 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-[#0A66C2] transition-colors hover:border-[#0A66C2]/70 hover:bg-white/10"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
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
          <span>© {new Date().getFullYear()} Rodrigues Films. Todos os direitos reservados.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#portfolio" className="hover:text-white/90">Portfólio</a>
          <a href="#sobre" className="hover:text-white/90">Sobre</a>
          <a href="#contato" className="hover:text-white/90">Contato</a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[#0A66C2] transition-colors hover:border-[#0A66C2]/70 hover:bg-white/10"
          >
            <LinkedInIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
