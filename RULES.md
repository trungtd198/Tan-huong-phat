# Rules

- Use Next.js Pages Router (current setup)
- Use TypeScript (strict mode)
- Use TailwindCSS only — no CSS files
- Use design system tokens from tailwind.config.js
- Reusable components — always check ui/ first
- Use SectionWrapper + SectionHeader for all sections
- Mobile-first responsive design
- Keep animations subtle ("felt, not seen")
- Use Lucide icons (not inline SVGs or emoji)
- Use font-display (Playfair Display) for headings
- Use font-sans (Inter) for body text
- Put content data in src/data/ — not inline
- Put config in src/config/ — not inline
- Import from barrel exports: @/components/ui
- Run lint + type-check + build before finishing