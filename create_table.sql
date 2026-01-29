
-- 1. Create the 'books' table
create table public.books (
  id integer primary key default floor(random() * 90000 + 10000),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  main_category text, -- Main category (e.g., "Architectural Documents")
  category text,       -- Subcategory (e.g., "Architectural Document", "Code Standard")
  price numeric default 0,
  details text,
  image_url text, -- Stores the link to the cover image
  image_url2 text, -- Stores the link to the second image
  image_url3 text, -- Stores the link to the third image
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

-- 5. Policy: Allow EVERYONE to UPDATE books (For your Admin Page)
create policy "Public Update Access" on public.books
  for update using (true);

-- 6. Policy: Allow EVERYONE to DELETE books (For your Admin Page)
create policy "Public Delete Access" on public.books
  for delete using (true);

-- 7. If you already have the books table, run this to add the main_category column:
-- ALTER TABLE public.books ADD COLUMN IF NOT EXISTS main_category text;
