# Real estate site: instructions for AI agents

Next.js 16 (App Router), TypeScript, Supabase, framer-motion, lucide-react.
A luxury rentals and sales site with an admin panel.

## Rules
- Never delete, empty or overwrite a file. Show the change first and edit only the lines needed.
- Never open, print or commit `.env.local`. Never use `SUPABASE_SERVICE_ROLE_KEY` in client code.
- Ask before running scripts that change the database, `npm install`, or `git push`.
- Do not restyle or reformat files you were not asked to change.
- After editing, run `npx tsc --noEmit` and report any errors.

## Structure
- `app/page.tsx`: home page. `app/properties/[id]/page.tsx`: property details.
- `app/admin/*`: admin panel. `app/actions.ts`: server actions (`"use server"`).
- `lib/supabase.ts`: browser client (anon key), safe in client components.
- `lib/supabaseAdmin.ts`: server-only admin client. Import it only in server files such as `actions.ts`.
- `components/admin/ImageUpload.tsx`: uploads photos to the public Storage bucket `property-images`.
- `i18n/locales.ts` and `components/LanguageProvider.tsx`: translations.

## Data rules
- `properties.purpose` is `rent` or `sale`. Never use `buy` as a value; the button label can say Buy.
- `properties.category` is one of: villas, apartments, houses, penthouses, castles, yachts, rooms, land.
- Database columns are snake_case. `mapProperty` in `actions.ts` converts them to camelCase.

## Style
- Colors come from the variables in `app/globals.css` (`--primary`, `--background`, `--secondary`). Do not hard-code colors, and keep dark mode (`data-theme="dark"`) working.
- Each component has its own CSS Module.

## Known limits
- The admin panel has no login yet. Do not describe it as secure.
- `saveContent` writes `data/content.json`, which will not persist on serverless hosting.