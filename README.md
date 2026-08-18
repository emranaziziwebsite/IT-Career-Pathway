# 🚀 IT Career Pathway Explorer

An interactive, game-like roadmap for exploring IT careers — pick a career and immediately see what to learn, in what order, with real courses, certifications, and project ideas.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**.

## Features

- **20 IT careers** (Frontend, Backend, Full-Stack, Software Engineer, Game Dev, Cybersecurity, AI Engineer, Data Scientist, Data Engineer, Cloud Engineer, DevOps, Network Engineer, SysAdmin, Mobile Dev, Database Engineer, Robotics, Embedded, UI/UX, AR/VR, QA), each with its own uniquely structured pathway — no two careers are forced into the same template.
- **Interactive skill-tree pathway** per career: click any node to open a detail panel with what it is, what it's used for, what to learn, prerequisites, next steps, recommended resources (best/free/job-focused), and project ideas.
- **Progress tracking** (localStorage-based) with sequential skill-tree gating — nodes unlock as you complete the ones before them.
- **Career Finder** — a short quiz that matches you to careers by similarity scoring across ten dimensions.
- **Compare Careers** — side-by-side visual comparison of up to three careers.
- **Global search** (⌘K / Ctrl+K) across careers, languages, frameworks, tools, and certifications.
- **Technologies** and **Projects** index pages for browsing the full content library.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  types/        # Shared TypeScript types for careers & learning items
  data/
    items/      # Shared library of languages, frameworks, tools, certifications, concepts
    careers/    # Per-category career definitions + pathway structures
    quiz.ts     # Career Finder quiz questions & matching logic
  lib/          # Progress tracking, search, utilities
  components/   # UI, organized by feature (home, career, finder, compare, technologies, projects, shared)
  app/          # Next.js App Router routes
```

Content is fully separated from UI — adding a new career or technology only requires editing `src/data`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — lint the project
