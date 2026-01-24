
-- Enable Update and Delete for everyone (Development Mode)
-- Run this in Supabase SQL Editor

create policy "Public Update Access" on public.books
  for update using (true);

create policy "Public Delete Access" on public.books
  for delete using (true);
