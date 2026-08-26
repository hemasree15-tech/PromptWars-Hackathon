'use client'

import { useState } from 'react'
import { ArrowUpRight, ChevronDown, FileText, HeartPulse, Menu, Mic, ShieldCheck, Sparkles, Stethoscope, X } from 'lucide-react'
import { HealthCheckChat } from '@/components/health-check-chat'

const journey = [
  { label: 'Text + Voice', icon: Mic },
  { label: 'Multilingual AI', icon: Sparkles },
  { label: 'Verified knowledge', icon: FileText },
  { label: 'Safety screening', icon: ShieldCheck },
  { label: 'Right care', icon: Stethoscope },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const [language, setLanguage] = useState('English')

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20 border-b border-primary-foreground/15 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Sahaay home">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground"><HeartPulse size={18} strokeWidth={2.5} /></span>
            <span><span className="block font-serif text-2xl leading-none">Sahaay</span><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.22em] text-primary-foreground/65">AI health navigator</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-primary-foreground/80 lg:flex" aria-label="Main navigation">
            <a href="#how-it-works" className="transition-colors hover:text-primary-foreground">How it works</a>
            <a href="#why-sahaay" className="transition-colors hover:text-primary-foreground">Why Sahaay</a>
            <a href="#safety" className="transition-colors hover:text-primary-foreground">Safety</a>
            <a href="#care" className="transition-colors hover:text-primary-foreground">Find care</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <label className="sr-only" htmlFor="language">Language</label>
            <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="cursor-pointer appearance-none bg-transparent px-2 py-2 text-sm text-primary-foreground outline-none">
              <option className="text-foreground">English</option><option className="text-foreground">हिन्दी</option><option className="text-foreground">తెలుగు</option>
            </select>
            <button onClick={() => setDemoOpen(true)} className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">Start health check</button>
          </div>
          <button className="lg:hidden" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <div className="border-t border-primary-foreground/15 bg-primary px-6 py-5 lg:hidden"><nav className="flex flex-col gap-5 text-sm"><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="#why-sahaay" onClick={() => setMenuOpen(false)}>Why Sahaay</a><a href="#safety" onClick={() => setMenuOpen(false)}>Safety</a><button className="w-fit rounded-full bg-accent px-4 py-2 text-accent-foreground" onClick={() => { setMenuOpen(false); setDemoOpen(true) }}>Start health check</button></nav></div>}
      </header>

      <section id="top" className="relative flex min-h-[680px] items-end bg-primary pb-16 pt-36 text-primary-foreground lg:min-h-[800px] lg:pb-24">
        <img src="/sahaay-hero.png" alt="Woman using Sahaay to navigate a health concern at home" className="absolute inset-0 size-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/75 to-primary/10" />
        <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10"><div className="max-w-2xl">
          <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-accent"><span className="size-2 rounded-full bg-accent" />Built for every next step</p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-balance sm:text-7xl lg:text-[92px]">Not sure how serious your symptoms are?</h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-primary-foreground/75">Tell Sahaay what&apos;s happening. Get a clear, safe next step — in a language you understand.</p>
          <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => setDemoOpen(true)} className="group flex items-center gap-3 rounded-full bg-accent px-6 py-4 font-semibold text-accent-foreground">Check my symptoms <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button><button onClick={() => setDemoOpen(true)} className="rounded-full border border-primary-foreground/35 px-6 py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10">Try the demo</button></div>
          <p className="mt-7 text-xs text-primary-foreground/55">Sahaay is an AI assistant, not a doctor. It does not diagnose or prescribe.</p>
        </div></div>
        <div className="absolute bottom-8 right-6 hidden items-center gap-3 text-xs text-primary-foreground/60 lg:flex"><span className="h-px w-12 bg-primary-foreground/35" />Scroll to explore</div>
      </section>

      <section id="how-it-works" className="bg-secondary px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:gap-24"><div><p className="eyebrow">A calmer way forward</p><h2 className="mt-5 max-w-md font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">From uncertainty to the right next step.</h2><p className="mt-6 max-w-sm leading-7 text-muted-foreground">Sahaay helps people understand symptoms, recognize potential warning signs, and reach the right level of care — without replacing a doctor.</p></div><div className="divide-y divide-border border-y border-border">{journey.map(({ label, icon: Icon }, index) => <div key={label} className="flex items-center justify-between py-5"><div className="flex items-center gap-5"><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span><span className="flex size-10 items-center justify-center rounded-full bg-background text-primary"><Icon size={18} /></span><span className="text-lg font-medium">{label}</span></div><ArrowUpRight size={18} className="text-muted-foreground" /></div>)}</div></div></div></section>

      <section id="why-sahaay" className="bg-background px-6 py-24 lg:px-10 lg:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 border-b border-border pb-12 lg:flex-row lg:items-end"><div><p className="eyebrow">Why Sahaay?</p><h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-6xl">Language should never be a barrier to basic health guidance.</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground">Designed for real life: informal language, shared phones, limited connectivity, and the questions people ask before they visit a clinic.</p></div><div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">{['Conversational understanding','Multilingual by design','Grounded in trusted sources','Safety before answers'].map((title, i) => <article key={title} className="bg-background p-7"><span className="font-mono text-xs text-accent">0{i+1}</span><h3 className="mt-14 text-xl font-medium leading-snug">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{['Understands everyday language, Hinglish, and how people actually describe symptoms.','Start in English, हिन्दी, or తెలుగు. Add more Indian languages over time.','Responses are designed around verified public-health information, not guesses.','Structured outputs, red-flag checks, and conservative ambiguity handling are built in.'][i]}</p></article>)}</div></div></section>

      <section id="safety" className="bg-primary px-6 py-24 text-primary-foreground lg:px-10 lg:py-28"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center"><div><p className="eyebrow text-accent">The Sahaay promise</p><h2 className="mt-5 max-w-2xl font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-6xl">We&apos;re not building an AI doctor.</h2><p className="mt-6 max-w-xl text-xl leading-8 text-primary-foreground/70">We&apos;re building an AI bridge between uncertainty and the right next step.</p></div><div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-7"><ShieldCheck className="text-accent" size={28} /><h3 className="mt-8 text-xl font-semibold">Safety is built into the architecture.</h3><p className="mt-4 text-sm leading-7 text-primary-foreground/65">Sahaay never claims a diagnosis or prescribes medicine. If a potential emergency is detected, the conversation stops and the user is guided to urgent care.</p><button onClick={() => setDemoOpen(true)} className="mt-8 flex items-center gap-2 text-sm font-semibold text-accent">See how it works <ArrowUpRight size={16} /></button></div></div></section>

      <section id="care" className="bg-accent px-6 py-20 text-accent-foreground lg:px-10"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">Your next step starts here</p><h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">When in doubt, ask Sahaay.</h2></div><button onClick={() => setDemoOpen(true)} className="flex items-center gap-3 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground">Start health check <ArrowUpRight size={18} /></button></div></section>

      <footer className="bg-primary px-6 py-10 text-primary-foreground lg:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-primary-foreground/55 md:flex-row"><span>© 2026 Sahaay. Built for better access to care.</span><span>Private by design · Not a substitute for medical advice</span></div></footer>

      {demoOpen && <div className="fixed inset-0 z-50 flex items-end justify-center bg-primary/60 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="demo-title"><div className="flex h-[85vh] w-full max-w-xl flex-col rounded-t-3xl bg-background p-6 shadow-2xl sm:h-[640px] sm:rounded-3xl sm:p-8"><div className="flex items-start justify-between"><div><p className="eyebrow">Private & secure</p><h2 id="demo-title" className="mt-3 font-serif text-3xl">How can we help today?</h2></div><button onClick={() => setDemoOpen(false)} className="rounded-full p-2 hover:bg-secondary" aria-label="Close health check"><X size={20} /></button></div><div className="mt-5 min-h-0 flex-1"><HealthCheckChat /></div></div></div>}
    </main>
  )
}
