# Aravinth Sivasenthil — Portfolio

A responsive, single-page portfolio built with **React, TypeScript, Vite, and CSS**. Features a dark minimalist hero, original technology-themed illustration, custom StudyFlow and AI Test Log Analyzer logos, skills, projects, experience, education, and click-to-email contact cards.

## Start the project locally

1. Install Node.js 22 or newer.
2. Open a terminal in this repository.
3. Run `npm install`.
4. Run `npm run dev` and open the local address shown in the terminal.
5. Run `npm run build` before deployment.

## Edit your information

- Profile links, project links, email addresses, and project descriptions: `src/siteData.ts`
- Main sections and their content: `src/App.tsx`
- Theme, layout, and responsive styling: `src/styles.css`
- Project images: `public/assets/`
- Resume download: `public/Aravinth_Sivasenthil_Resume.pdf`

The GitHub profile link is configured. LinkedIn and project repositories/demos are intentionally blank until their exact URLs are provided; buttons for missing links are hidden instead of leading to fake pages.

## Publish with GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`. On a push to `main`, GitHub Actions installs dependencies, builds the site, and deploys `dist/` to Pages.

1. In repository **Settings → Pages → Build and deployment**, set **Source: GitHub Actions**.
2. In the **Actions** tab, open the latest **Deploy portfolio to GitHub Pages** run and confirm it succeeds.
3. The initial site is available on `https://AravinthSivasenthil.github.io/Portfolio/` only after Pages is enabled. The permanent domain setup is a separate step.
4. To connect the purchased `aravinth.ca` domain later, set it under **Settings → Pages → Custom domain** and configure the domain's DNS at Porkbun. Wait for DNS propagation, then enable **Enforce HTTPS** when GitHub offers it.

**Important:** This Vite project uses a dynamic Vite `base` setting. The GitHub Actions build automatically uses `/Portfolio/` for the temporary project Pages URL. When `aravinth.ca` is connected later, set `SITE_BASE_PATH: '/'` on the workflow's **Build React website** step; this switches the output to the custom domain root.

## Notes

- The contact cards open the visitor's default email app; no email/password credentials are stored or needed.
- This is a **static portfolio**. The linked full-stack project backends must be hosted separately if you want their live demos online.
- Honors `prefers-reduced-motion` and supports keyboard navigation.
