# Yash Jain — Portfolio

> Personal developer portfolio for **Yash Jain** — Flutter & AI Developer. Showcases projects, experience, and contact info. Deployed via Netlify.

[![Live Site](https://img.shields.io/badge/Live-yash--portfolio.netlify.app-blueviolet?style=flat-square)](https://yashjain-portfolio-dev.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Yashjain329-181717?style=flat-square&logo=github)](https://github.com/Yashjain329)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-yash--jain329-0077B5?style=flat-square&logo=linkedin)](https://linkedin.com/in/yash-jain329/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Sections](#sections)
- [Featured Projects](#featured-projects)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contact](#contact)

---

## Overview

A fully static, single-page portfolio website built with vanilla **HTML, CSS, and JavaScript** — no frameworks, no dependencies. Designed with a dark sci-fi aesthetic using scroll-snapping sections, SVG animations, and a particle canvas on the hero. Deployed to Netlify with a custom `netlify.toml` config.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (custom, no framework) |
| Scripting | Vanilla JavaScript |
| Fonts | Oxanium, Space Grotesk, JetBrains Mono (Google Fonts) |
| Hosting | Netlify |
| Contact Form | Custom JS handler (`handleSubmit`) |

---

## Sections

The portfolio is a full-page scroll-snapped single-page app with 7 sections:

1. **Hero** — Animated particle canvas + rotating SVG ring with initials `YJ`; tagline: *Perceive. Build. Ship.*
2. **Philosophy I** — Phone wireframe visual; message: *Apps that solve real problems.*
3. **Philosophy II** — Animated network node diagram of the full tech stack; message: *One dev. Full stack.*
4. **Work** — Filterable project grid (All / Flutter / Android / AI·Web); 8 featured projects, link to all 14 repos.
5. **About / Background** — Timeline of experience + animated skill bubbles across 4 domains.
6. **Philosophy III** — Key stats: 14 repos, #1 hackathon win, 15+ devs led, 9th national rank.
7. **Contact** — Email, phone, LinkedIn, GitHub links + resume downloads + contact form.

---

## Project Structure

```
yash-portfolio/
├── index.html                          # Single-page app entry point
├── style.css                           # All custom styles
├── main.js                             # Scroll logic, canvas, form handler
├── netlify.toml                        # Netlify deployment config
├── .gitignore
├── Yash_Jain_Resume (2).pdf            # General resume (downloadable)
├── Yash_Jain_Resume__Copy__AI (1).pdf  # AI-focused resume (downloadable)
└── .netlify/                           # Netlify state (auto-generated)
```

---

## Getting Started

No build step required — this is a fully static site.

```bash
# 1. Clone the repository
git clone https://github.com/Yashjain329/yash-portfolio.git

# 2. Navigate into the project
cd yash-portfolio

# 3. Open in browser
open index.html
# or serve locally with any static server:
npx serve .
```

---

## Deployment

The site is deployed via **Netlify** with configuration in `netlify.toml`.

To deploy your own fork:

1. Fork this repository
2. Log in to [Netlify](https://netlify.com) and click **Add new site → Import from Git**
3. Select your fork — Netlify auto-detects the `netlify.toml`
4. Click **Deploy Site**

---

## Contact

| Channel | Details |
|---------|---------|
| 📧 Email | [Yashjain9350@gmail.com](mailto:Yashjain9350@gmail.com) |
| 💼 LinkedIn | [yash-jain329](https://linkedin.com/in/yash-jain329/) |
| 🐙 GitHub | [Yashjain329](https://github.com/Yashjain329) |

---

© 2026 Yash Jain · Flutter · Android · AI
