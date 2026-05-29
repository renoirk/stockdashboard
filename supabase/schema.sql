-- Portfolio table: stores user's stock holdings
create table if not exists portfolio (
  id         uuid        primary key default gen_random_uuid(),
  ticker     text        not null,
  name       text        not null,
  quantity   numeric     not null,
  avg_price  numeric     not null,
  notes      text,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security (optional: remove if not using auth)
alter table portfolio enable row level security;

-- Allow all operations for anonymous users (adjust if you add auth)
create policy "allow_all" on portfolio for all using (true) with check (true);
