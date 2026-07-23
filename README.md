# Human Design Enterprise

Aplikasi SaaS analisis Human Design — freemium/berlangganan.

## Stack
Next.js 14, Supabase, Vercel, TypeScript, Tailwind CSS, next-intl.

## Struktur
Monorepo npm workspaces: `apps/web` (aplikasi) + `packages/*` (modul terpisah: database, astronomy-engine, hd-engine).

## Arsitektur
Clean Architecture per app: `domain` → `application` → `infrastructure` → `presentation`.
Dependency mengalir satu arah: presentation & infrastructure boleh bergantung ke domain, domain tidak boleh bergantung ke keduanya.

## Roadmap
1. ✅ Foundation
2. Database Enterprise
3. Authentication Enterprise
4. License System
5. Astronomy Engine
6. HD Calculation Engine
7. Bodygraph Engine
8. HD Knowledge Engine
9. Relationship Engine
10. Learning Center
11. CMS Enterprise
12. UI/UX Polish
13. Final Production
