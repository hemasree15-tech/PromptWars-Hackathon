-- Run this once in the Neon SQL Editor (console.neon.tech → your project → SQL Editor)

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  user_message text,
  assistant_reply text,
  urgency_tag text check (urgency_tag in ('EMERGENCY', 'CLINIC', 'SELFCARE') or urgency_tag is null),
  created_at timestamptz not null default now()
);

create index if not exists idx_conversations_session on conversations (session_id);
create index if not exists idx_conversations_created_at on conversations (created_at);
