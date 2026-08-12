# Eco Yachts — Sustainable Yacht Charter Platform

A production-grade web platform for a sustainable yacht charter business, built with **Next.js 16 (App Router)**, **React 19**, and **TypeScript**. The project ships a full public-facing marketing/booking site alongside a self-service **admin dashboard (CMS)** that lets non-technical staff manage every piece of content — hero banners, yacht listings, destinations, blog, testimonials, staff, and more — without touching code.

---

## Overview

| | |
|---|---|
| **Type** | Full-stack frontend (Next.js) consuming a REST API |
| **Audience** | Public marketing/booking site + internal content-management dashboard |
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Redux Toolkit |
| **Rendering** | App Router with route groups for layout separation |

The codebase is organized into two clearly separated experiences under a single Next.js App Router instance:

- **`(withCommonLayout)`** — the public site: Home, Yachts, Destinations, Contact, Privacy Policy, Terms & Conditions, Refund Policy.
- **`(dashboardLayout)`** — the internal CMS: authenticated staff tooling for managing every content type on the public site (hero sections, yachts/services, destinations/chambers, blog, gallery, video gallery, testimonials, FAQs, employees, roles/permissions, appointments, and account settings).

This route-group pattern keeps public and authenticated experiences on independent layouts, navigation, and data-fetching strategies while sharing the same build and deployment pipeline.

---

## Tech Stack

**Core**
- [Next.js 16](https://nextjs.org/) — App Router, file-based routing, image optimization, server/client component split
- [React 19](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/) — strict typing across pages, components, hooks, and API layer

**State & Data**
- [Redux Toolkit](https://redux-toolkit.js.org/) + `react-redux` — global state
- `redux-persist` — persisted client state (e.g. auth session)
- [Axios](https://axios-http.com/) — typed HTTP client / API service layer
- `js-cookie` / `cookies-next` — cookie-based session handling
- `jwt-decode` — client-side token inspection

**UI & Forms**
- [Tailwind CSS 4](https://tailwindcss.com/) — utility-first styling
- [react-hook-form](https://react-hook-form.com/) — form state and validation
- [react-datepicker](https://reactdatepicker.com/), `react-paginate`, `lucide-react`, `react-icons`
- `sweetalert2`, `react-toastify` — user feedback / alerts
- `recharts` — dashboard analytics and charts
- `html2canvas` + `jspdf` — client-side document/PDF export (e.g. prescriptions)

**Tooling**
- ESLint 9 (flat config) with `eslint-config-next`
- `date-fns` for date formatting/manipulation

---

## Project Structure

```
src/
├── app/
│   ├── (withCommonLayout)/     # Public site: yachts, destinations, contact, legal pages
│   ├── (dashboardLayout)/
│   │   └── dashboard/          # Admin CMS: content management for every public section
│   ├── login/ signup/ otp/     # Authentication flows
│   └── prescription/[token]/   # Tokenized, shareable document view
├── components/
│   ├── Common/                 # Shared form controls, modals, auth UI
│   ├── Shared/                 # Navbar, Footer, PageHero, Logo
│   └── Ui/
│       ├── HomePage/           # Hero, Destinations, Featured Yachts, Sustainability, FAQ, etc.
│       └── Dashboard/          # CMS modules, one per content type (mirrors app/dashboard routes)
├── redux/
│   ├── api/                    # RTK Query / API slice definitions
│   └── features/auth/          # Auth state slice
├── services/                   # API service functions (Axios)
├── hooks/                      # Custom React hooks
├── helpers/ lib/ utils/        # Utilities, providers, shared constants/data
└── types/                      # Shared TypeScript types
```

Each CMS module under `dashboard/` follows a consistent **add / all / edit** pattern (e.g. `hero/add-hero`, `hero/all-hero`, `hero/edit-hero/[id]`), giving content editors a predictable CRUD workflow across every content type.

---

## Key Features

- **Public marketing & booking site** — yacht search, destination browsing, featured yachts, sustainability messaging, testimonials, and a contact/inquiry flow.
- **Full CMS/admin dashboard** — role-based staff access to manage hero content, yachts/services, destinations, blog (with categories), gallery and video gallery, testimonials, FAQs (Q&A), employees, and appointments — no code changes required to update the live site.
- **Authentication** — email/OTP-based signup and login, JWT session handling, protected dashboard routes.
- **Role & permission management** — configurable staff roles for dashboard access control.
- **Document generation** — client-side PDF export (e.g. prescriptions) via `html2canvas` + `jspdf`, including tokenized public share links.
- **Optimized media delivery** — Next.js `Image` component with remote patterns configured for Cloudinary and other CDNs.

---

## Getting Started

### Prerequisites
- Node.js 18.18+ (recommended: latest LTS)
- npm (project is committed with `package-lock.json`)
- A running instance of the backend API

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_API_URL=https://your-api-host/api
```

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public site, and `/dashboard` for the CMS (requires authentication).

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## Deployment

The app builds as a standard Next.js application and deploys cleanly to [Vercel](https://vercel.com/) or any Node-compatible host. Ensure `NEXT_PUBLIC_API_URL` and any additional remote image hostnames (see `next.config.ts` → `images.remotePatterns`) are configured per environment.

---

## Author

Built and maintained by **Zamirul Kabir** — frontend engineer specializing in Next.js/React platforms with integrated CMS tooling for non-technical stakeholders.
