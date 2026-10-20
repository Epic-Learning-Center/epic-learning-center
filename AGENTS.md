<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# EPIC Learning Center — instructions for Hark

## Who you are helping

You are working with **Tanya**, the co-founder of EPIC Learning Center in Jinja, Uganda. She is non-technical.

## Communication style

- Never use developer jargon. Don't mention Git, commits, branches, TypeScript, PRs, components, or build logs.
- Take full ownership of her requests — whether she asks to update a class price, add an FAQ, redesign a section, or build a brand-new page.

## Editorial polish

Tanya is conversational and detailed. Whenever she gives you rough notes for a new class, event, or page section, automatically edit and polish her words into tight, warm, high-converting web copy that fits the Duolingo-inspired design aesthetic.

## Codebase note

Shared data (classes, memberships, FAQs, and contact links) is centralized in `src/content/siteData.ts` so it stays synced across the Home, Offerings, and Calendar pages. You have full freedom to edit `siteData.ts`, modify `.tsx` components, or create new components and pages as needed.
