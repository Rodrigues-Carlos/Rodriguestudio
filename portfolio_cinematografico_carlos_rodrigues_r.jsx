import React from "react";
import { motion } from "framer-motion";
import { Film, Scissors, TrendingUp, Play, Quote, Mail, Phone, ExternalLink } from "lucide-react";

// Observações rápidas para você editar depois:
// 1) Troque o src do <video> pela sua demo (mp4 curto sem som).
// 2) Substitua as imagens de placeholder pelos seus thumbs reais.
// 3) Ajuste textos/serviços e depoimentos conforme necessidade.

export default function PortfolioCarlos() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 backdrop-blur-sm/0 bg-black/20">
          <a href="#" className="font-black tracking-wide text-2xl">
            R<span className="text-red-500">•</span>
          </a>
          <ul className="hidden gap-8 md:flex text-sm">
            {[
              ["Início", "#inicio"],
              ["Sobre", "#sobre"],
              ["Serviços", "#servicos"],
              ["Portfólio", "#portfolio"],
              ["Depoimentos", "#depoimentos"],
              ["Contato", "#contato"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-white/80 transition hover:text-red-500"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            className="rounded-2xl border border-red-600 px-4 py-2 text-sm font-medium text-white/90 hover:bg-red-600/10"
          >
            Fale comigo
          </a>
        </nav>
      </header>

      {/* HERO / LANDING */}
      <section id="inicio" className="relative h-[92vh] w-full overflow-hidden">
        {/* Vídeo de fundo */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/video-demo.mp4" // troque por seu arquivo
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Texto central */}
        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-6 text-5xl font-extrabold leading-tight md:text-7xl">
              Histórias visuais
              <br />
              que <span className="text-red-500">conectam</span>
              <br /> marcas e pessoas.
            </div>
            <p className="mb-10 max-w-xl text-white/80">
              Produção e edição cinematográfica com foco em resultado: estética, narrativa e estratégia para marcas que querem performar no digital.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="rounded-2xl border border-red-600 px-6 py-3 text-sm font-semibold tracking-wide hover:bg-red-600/10"
              >
                Ver Portfólio
              </a>
              <a
                href="#servicos"
                className="rounded-2xl border border-white/30 px-6 py-3 text-sm font-semibold tracking-wide text-white/90 hover:bg-white/10"
              >
                Serviços
              </a>
            </div>
          </motion.div>
        </div>
        {/* Vinheta gradiente no rodapé do hero */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* SOBRE */}
      <section id="sobre" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10"
          >
            <img
              src="https://images.unsplash.com/photo-1520697222868-83a6b6b12b14?q=80&w=1400&auto=format&fit=crop"
              alt="Retrato cinematográfico de Carlos"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="mb-4 text-3xl font-extrabold md:text-4xl">Carlos Rodrigues <span className="text-red-500">R•</span></h2>
            <p className="mb-6 text-white/80">
              Produtor e editor de vídeo, especializado em storytelling visual e formatos de alta performance para redes sociais. Combino direção, fotografia e edição para criar peças que unem estética forte com objetivo de negócio.
            </p>
            <ul className="mb-8 grid grid-cols-1 gap-3 text-white/80 md:grid-cols-2">
              {[
                "+7 anos de audiovisual",
                "Premiere, After, DaVinci",
                "Social Media orientado a vendas",
                "Planejamento e roteiro",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-3">
              <a href="#contato" className="rounded-xl bg-red-600/90 px-5 py-3 text-sm font-semibold shadow-lg shadow-red-900/30 transition hover:bg-red-600">
                Solicitar orçamento
              </a>
              <a href="#portfolio" className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold hover:bg-white/10">
                Ver trabalhos
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="border-y border-white/10 bg-gradient-to-b from-black via-black to-black px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <h3 className="text-2xl font-extrabold md:text-3xl">Serviços</h3>
            <a href="#contato" className="text-sm text-white/70 hover:text-red-500">
              Precisa de algo sob medida?
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ServiceCard
              icon={<Film className="h-6 w-6" />}
              title="Produção Audiovisual"
              desc="Institucionais, comerciais, vídeos para lançamentos e campanhas com direção, fotografia e captação profissional."
            />
            <ServiceCard
              icon={<Scissors className="h-6 w-6" />}
              title="Edição Criativa"
              desc="Cortes dinâmicos, ritmos modernos, motion e finalização para reels, tiktok, clipes e conteúdos curtos."
            />
            <ServiceCard
              icon={<TrendingUp className="h-6 w-6" />}
              title="Social Media Visual"
              desc="Planejamento audiovisual estratégico para gerar alcance, conversão e reforço de marca."
            />
          </div>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="portfolio" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex items-end justify-between">
          <h3 className="text-2xl font-extrabold md:text-3xl">Portfólio</h3>
          <div className="flex gap-3 text-xs md:text-sm">
            {[
              "Todos",
              "Institucional",
              "Social Media",
              "Comercial",
            ].map((f) => (
              <button
                key={f}
                className="rounded-full border border-white/15 px-3 py-1.5 text-white/80 hover:border-red-500 hover:text-white"
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry com CSS columns */}
        <div className="[column-fill:_balance] columns-1 gap-4 sm:columns-2 lg:columns-3">
          {placeholders.map((item, i) => (
            <div key={i} className="mb-4 break-inside-avoid">
              <div className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <a
                  href={item.href}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100"
                  title="Assistir"
                >
                  <Play className="h-10 w-10" />
                </a>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-white/80">
                <span>{item.title}</span>
                <span className="text-white/50">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="depoimentos" className="border-y border-white/10 bg-black px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h3 className="mb-10 text-2xl font-extrabold md:text-3xl">O que dizem</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <Quote className="mb-4 h-6 w-6 text-red-500" />
                <p className="mb-4 text-white/80">{t.text}</p>
                <div className="text-sm text-white/60">{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="mb-4 text-3xl font-extrabold md:text-4xl">
            Pronto para transformar sua ideia em vídeo?
          </h3>
          <p className="mb-8 text-white/70">
            Fale comigo e vamos criar algo poderoso para sua marca.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-red-600 px-6 py-3 text-sm font-semibold hover:bg-red-600/10"
            >
              <Phone className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="mailto:email@seuportfolio.com"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              <Mail className="h-4 w-4" /> E-mail
            </a>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black">R<span className="text-red-500">•</span></span>
            <span className="text-sm text-white/60">© {new Date().getFullYear()} Carlos Rodrigues. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/60">
            <a href="#portfolio" className="hover:text-red-500">Portfólio</a>
            <a href="#servicos" className="hover:text-red-500">Serviços</a>
            <a href="#contato" className="hover:text-red-500">Contato</a>
            <a href="#" className="inline-flex items-center gap-1 hover:text-red-500">
              PDF Portfólio <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] transition hover:shadow-[0_0_0_1px_rgba(244,63,94,0.6)]">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/15 ring-1 ring-red-600/40">
        {icon}
      </div>
      <div className="mb-2 text-lg font-bold">{title}</div>
      <p className="text-sm text-white/70">{desc}</p>
    </div>
  );
}

const placeholders = [
  {
    title: "Institucional – Clínica Parceira",
    tag: "Institucional",
    href: "#",
    src: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Comercial – Campanha Sazonal",
    tag: "Comercial",
    href: "#",
    src: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Social Media – Reels Performance",
    tag: "Social Media",
    href: "#",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Institucional – Bastidores",
    tag: "Institucional",
    href: "#",
    src: "https://images.unsplash.com/photo-1499359160645-1e4eab4d2b0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Comercial – Produto em Destaque",
    tag: "Comercial",
    href: "#",
    src: "https://images.unsplash.com/photo-1505238680356-667803448bb6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Social Media – Motion Cut",
    tag: "Social Media",
    href: "#",
    src: "https://images.unsplash.com/photo-1466854076813-4aa9ac0fc347?q=80&w=1200&auto=format&fit=crop",
  },
];

const testimonials = [
  {
    text: "A entrega do Carlos elevou a percepção da nossa marca nas redes – estética impecável e foco em conversão.",
    author: "Mariana S., Diretora de Marketing",
  },
  {
    text: "Agilidade e visão criativa. O vídeo institucional trouxe novos clientes já na primeira semana.",
    author: "Eduardo P., CEO de clínica parceira",
  },
  {
    text: "Sabe unir cinema e estratégia. Resultado acima do esperado no TikTok e Instagram.",
    author: "Letícia A., Gestora de Social",
  },
];
