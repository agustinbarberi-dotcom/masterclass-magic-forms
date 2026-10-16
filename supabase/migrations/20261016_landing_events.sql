-- Eventos de la landing para la página privada de estadísticas.
create table if not exists public.landing_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  event text not null check (event in ('visita', 'optin', 'gracias')),
  visitor_id text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  fbclid boolean not null default false,
  referrer_host text,
  path text
);

-- Sin políticas públicas: solo el servidor (service role) escribe y lee.
alter table public.landing_events enable row level security;

create index if not exists landing_events_created_at_idx on public.landing_events (created_at);
