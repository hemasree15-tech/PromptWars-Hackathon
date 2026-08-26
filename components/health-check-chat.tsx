'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ShieldCheck } from 'lucide-react'

type Role = 'user' | 'assistant'
type Message = { role: Role; content: string; tag?: string | null }

const TAG_STYLES: Record<string, { label: string; className: string }> = {
  EMERGENCY: { label: '🚨 Emergency', className: 'bg-red-500 text-white' },
  CLINIC: { label: '🩺 See a doctor', className: 'bg-amber-400 text-amber-950' },
  SELFCARE: { label: '🏠 Self-care', className: 'bg-accent text-accent-foreground' },
}

function sessionId() {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem('sahaay_session_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('sahaay_session_id', id)
  }
  return id
}

export function HealthCheckChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hi, I'm Sahaay. Tell me what symptoms you or a family member is experiencing, and I'll help you figure out the right next step.",
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  async function send(text: string) {
    if (!text.trim() || loading) return
    const nextMessages: Message[] = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          sessionId: sessionId(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply, tag: data.tag }])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "Couldn't reach the assistant right now. If this is a medical emergency, please call your local emergency number immediately.",
          tag: 'EMERGENCY',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const suggestions = [
    'I have a mild fever and body ache since this morning',
    'Severe chest pain and shortness of breath',
    'My child has had loose motions since yesterday',
  ]

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto rounded-2xl bg-secondary/50 p-4">
        {messages.map((m, i) => {
          const tagInfo = m.tag ? TAG_STYLES[m.tag] : null
          return (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'ml-auto rounded-br-sm bg-primary text-primary-foreground'
                  : `mr-auto rounded-bl-sm bg-background ${m.tag === 'EMERGENCY' ? 'border border-red-400' : 'border border-border'}`
              }`}
            >
              {tagInfo && (
                <span className={`mb-2 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tagInfo.className}`}>
                  {tagInfo.label}
                </span>
              )}
              <div>{m.content}</div>
            </div>
          )
        })}
        {loading && (
          <div className="mr-auto flex w-fit gap-1 rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-3">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent"
          >
            {s.length > 34 ? s.slice(0, 34) + '…' : s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="mt-3 flex items-center gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe a symptom..."
          className="flex-1 rounded-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground disabled:opacity-50"
          aria-label="Send"
        >
          <ArrowUp size={18} />
        </button>
      </form>

      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <ShieldCheck size={13} /> Not a diagnosis. Always escalates emergencies to real care.
      </p>
    </div>
  )
}
