# Debate Platform — Supabase version

This version keeps the existing debate competition frontend but removes the separate Node/Express API. The React app talks directly to Supabase.

## Setup

1. Create a fresh Supabase project.
2. Open Supabase SQL Editor and run `supabase-schema.sql` from the project root.
3. Create an organizer user in Supabase Authentication → Users.
4. In SQL Editor, grant that user admin access:

```sql
insert into public.profiles (id, role)
values ('YOUR_AUTH_USER_UUID', 'ADMIN');
```

5. In `debate-web`, create `.env.local`:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

6. Run `npm install` and then `npm run dev`.

Never commit `.env.local` or any service-role key.
