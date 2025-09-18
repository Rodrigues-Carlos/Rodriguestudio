// App.jsx — Portfólio cinematográfico (sem build, usando React UMD + Tailwind CDN)
const { useMemo, useState } = React;

function App() {
  const [category, setCategory] = useState("todos");

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Clínica Estética — Institucional",
        cat: "institucional",
        thumb:
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1600&auto=format&fit=crop",
        ratio: "aspect-video",
      },
      {
        id: 2,
        title: "Série Social — Reels",
        cat: "social",
        thumb:
          "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1600&auto=format&fit=crop",
        ratio: "aspect-[4/5]",
      },
      {
        id: 3,
        title: "Produto — Comercial",
        cat: "comercial",
        thumb:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
        ratio: "aspect-square",
      },
      {
        id: 4,
        title: "Treinamento — Corporativo",
        cat: "institucional",
        thumb:
          "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1600&auto=format&fit=crop",
        ratio: "aspect-[21/9]",
      },
      {
        id: 5,
        title: "Campanha — Comercial",
        cat: "comercial",
        thumb:
          "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1600&auto=format&fit=crop",
        ratio: "aspect-[3/4]",
      },
      {
        id: 6,
        title: "Making of — Social",
        cat: "social",
        thumb:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
        ratio: "aspect-video",
      },
    ],
    []
  );

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
    <a href="#top" className="group inline-flex items-center gap-2 select-none">
      <div className="relative">
        <span className="text-2xl font-extrabold tracking-tight leading-none">R</span>
        <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-red-500 text-2xl leading-none">•</span>
      </div>
      <span className="text-xs uppercase tracking-[0.25em] text-white/70 group-hover:text-white/90 transition-colors">Rodrigues Studio</span>
    </a>
  );
}

function Hero() {
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
            Cinema para marcas que querem <span className="text-red-500">resultado</span>.
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
              href="https://wa.me/5541999999999"
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
        <span className="px-3 py-1 rounded-full border border-white/10">Educação</span>
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
      bullets: ["Planejamento criativo", "Captação em 4K", "Entrega color grade"],
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

function Portfolio({ category, setCategory, items }) {
  const tabs = [
    { key: "todos", label: "Todos" },
    { key: "institucional", label: "Institucional" },
    { key: "comercial", label: "Comercial" },
    { key: "social", label: "Social" },
  ];

  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between gap-6 mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">Portfólio</h2>
        <a href="#contato" className="text-sm text-red-400 hover:text-red-300">Quero algo assim →</a>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setCategory(t.key)}
            className={
              "px-4 py-2 rounded-full border text-sm transition-colors " +
              (category === t.key
                ? "bg-red-600 border-red-600"
                : "border-white/15 hover:border-red-500/60")
            }
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <article key={p.id} className="group">
            <div className={`${p.ratio} relative overflow-hidden rounded-2xl border border-white/10 bg-white/5` }>
              <img
                src={p.thumb}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/70 mb-1">
                    <span className="h-1 w-1 rounded-full bg-red-500 inline-block" /> {p.cat}
                  </div>
                  <h3 className="text-base font-semibold leading-snug">{p.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="h-14 w-14 rounded-full bg-white/90 text-black grid place-items-center text-xs font-bold">▶</span>
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
      name: "Mariana S.",
      role: "Diretora — Clínica Lumi",
      text:
        "O filme institucional elevou nossa marca. Passamos a receber clientes comentando diretamente sobre o vídeo.",
    },
    {
      name: "Eduardo R.",
      role: "CMO — Startup Health",
      text:
        "Carlos entende de narrativa e de negócio. O corte para ads aumentou o CTR e reduziu o CPA.",
    },
    {
      name: "Paula G.",
      role: "Produtora Executiva",
      text:
        "Entrega fina, estética e no prazo. Virou parceiro recorrente em nossos jobs.",
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
            Rodrigues Studio é dirigido por <span className="text-white">Carlos Rodrigues</span>, produtor e editor com 7 anos de experiência
            em linguagem cinematográfica para marcas. Meu foco é unir estética, estratégia e performance.
          </p>
          <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-red-500"/> Captação e edição 4K</li>
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
  return (
    <section id="contato" className="max-w-7xl mx-auto px-6 py-20">
      <div className="rounded-3xl border border-white/10 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative p-8 md:p-12 bg-gradient-to-b from-white/5 to-transparent">
            <h2 className="text-3xl md:text-4xl font-bold">Vamos tirar sua ideia do papel?</h2>
            <p className="mt-3 text-white/80">Conte em poucas linhas o que você precisa e eu retorno com orçamento e prazos.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <a
                href="https://wa.me/5541999999999"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-red-600 hover:bg-red-500 transition-colors px-4 py-3 text-center font-semibold"
              >
                WhatsApp
              </a>
              <a
                href="mailto:carlos@rodrigues.studio"
                className="rounded-xl border border-white/20 hover:border-red-500/60 transition-colors px-4 py-3 text-center font-semibold"
              >
                E-mail
              </a>
            </div>
          </div>
          <div className="p-8 md:p-12 border-t md:border-t-0 md:border-l border-white/10">
            <form className="grid gap-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-white/60">Nome</label>
                <input
                  type="text"
                  placeholder="Seu nome"
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/60">E-mail</label>
                <input
                  type="email"
                  placeholder="voce@email.com"
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-white/60">Mensagem</label>
                <textarea
                  rows={4}
                  placeholder="Conte sobre o projeto, objetivos e prazos."
                  className="mt-1 w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-red-500"
                />
              </div>
              <button
                type="button"
                className="rounded-xl bg-white text-black hover:bg-red-500 hover:text-white transition-colors px-4 py-3 font-semibold"
                title="Demonstração — integrar via formulário real no deploy"
              >
                Enviar mensagem
              </button>
            </form>
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

// Render
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
