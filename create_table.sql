
-- 1. Create the 'books' table
create table public.books (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  category text,
  price numeric default 0,
  details text,
  image_url text, -- Stores the link to the cover image
  file_url text,  -- Stores the link to the PDF/EPUB/ZIP file
  rating numeric default 5,
  reviews integer default 0
);

-- 2. Enable Row Level Security (RLS) is good practice
alter table public.books enable row level security;

-- 3. Policy: Allow EVERYONE to READ books (Catalog needs this)
create policy "Public Read Access" on public.books
  for select using (true);

-- 4. Policy: Allow EVERYONE to INSERT books (For your Admin Page)
-- WARNING: In a real production app with users, you'd restrict this to admins only.
create policy "Public Insert Access" on public.books
  for insert with check (true);
