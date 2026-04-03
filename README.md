# Tokim Analytics — Quantitative Risk Intelligence

Institutional-grade quantitative risk advisory built on peer-reviewed research. GARCH-EVT modeling, stress testing, model validation, and SHAP-driven attribution for banks, asset managers, and hedge funds.

## Project Overview

Tokim Analytics delivers advanced quantitative risk solutions based on:
- **GARCH-EVT VaR** modeling across multiple asset classes
- **Backtesting methodologies**: Kupiec (1995), Christoffersen (1998), Diebold-Mariano (1995)
- **SHAP attribution** for multi-asset, multi-regime analysis
- **Stress testing** and model validation frameworks

## Live Demo

Visit the live site: **https://tokim-var.vercel.app/**

## Repository

- **GitHub**: https://github.com/Hillkip23/tokim-var
- **Deployment**: Vercel (https://tokim-var.vercel.app/)

## Project Structure

```
.
├── index.html       # Main HTML file
├── main.js          # JavaScript functionality
├── style.css        # Styling
└── README.md        # This file
```

## Features

- Responsive design with dark/light theme toggle
- Mobile-friendly navigation
- Services overview (GARCH-EVT, Stress Testing, SHAP Attribution)
- Research & publications section
- Team profiles
- Contact form for discovery calls

## Getting Started

### Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

### Deployment

The site is deployed on Vercel and automatically updates when changes are pushed to the main branch on GitHub.

**To make changes:**

1. Edit files locally
2. Commit changes: `git commit -m "Your message"`
3. Push to GitHub: `git push origin master`
4. Vercel automatically deploys the changes

## Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Modern styling with custom properties
- **JavaScript** — Vanilla JS for interactivity
- **Deployment** — Vercel

## License

© 2026 Tokim Analytics. All rights reserved.
