
# Supabase Setup Instructions

## 1. Create a Supabase Project
Go to [database.new](https://database.new) and create a new project.

## 2. Get Credentials
Get your `Project URL` and `Anon Key` from Project Settings > API.
Add them to your `.env.local` file (create it if it doesn't exist):

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## 3. Run SQL
Go to the **SQL Editor** in your Supabase dashboard and run the following script to create the table and policies:

```sql
-- Create the books table
create table public.books (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  category text,
  price numeric default 0,
  image_url text,
  file_url text,
  rating numeric default 5,
  reviews integer default 0,
  details text
);

-- Enable Row Level Security (RLS)
alter table public.books enable row level security;

-- Allow public read access
create policy "Public Read Access" on public.books
  for select using (true);

-- Allow public insert access (FOR DEVELOPMENT ONLY - Secure this later!)
create policy "Public Insert Access" on public.books
  for insert with check (true);

-- Allow public update access (FOR DEVELOPMENT ONLY)
create policy "Public Update Access" on public.books
  for update using (true);
```

## 4. Storage Setup
1. Go to **Storage** in the sidebar.
2. Create a new bucket named `book-covers`.
   - Toggle "Public bucket" to ON.
3. Create a new bucket named `book-files`.
   - Toggle "Public bucket" to ON (or keep private if you want to restrict downloads, but for now public is easier).
