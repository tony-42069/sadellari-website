# Sadellari Enterprises Website

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-ff69b4?style=flat&logo=framer)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat)](LICENSE)

Welcome to the Sadellari Enterprises website repository. This is the official codebase for [sadellari.com](https://sadellari.com), our enterprise innovation lab focused on AI/ML solutions and strategic technology implementation.

![Sadellari Enterprises Homepage Preview](/public/preview.png)

## About Sadellari Enterprises

Sadellari Enterprises operates as a dynamic holding company and innovation lab, specializing in:
- **AI/ML Solutions**: Developing cutting-edge artificial intelligence and machine learning applications
- **Strategic Technology**: Implementing advanced technical solutions for complex business challenges
- **Innovation Lab**: Incubating and developing breakthrough technology products
- **Enterprise Solutions**: Creating scalable solutions for modern business needs

## Technology Stack

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for advanced interactions
- **Deployment**: Vercel Platform
- **Version Control**: Git

### Key Dependencies
- `framer-motion`: Advanced animations and interactions
- `@radix-ui`: Accessible UI components
- `class-variance-authority`: Dynamic class composition
- `clsx` & `tailwind-merge`: Utility-first CSS management
- `lucide-react`: Modern icon system

## Key Features

### Visual Elements
- Interactive particle background with mouse tracking
- Smooth page transitions and scroll animations
- Modern glass-morphism design elements
- Responsive design across all devices
- Dynamic color schemes and gradients

### Technical Features
- Server-side rendering for optimal performance
- Type-safe component architecture
- SEO-optimized structure
- Progressive Web App capabilities
- Optimized asset delivery

### Interactive Elements
- Dynamic brand cards with hover effects
- Contact form integration
- Animated navigation system
- Particle effect system with user interaction
- Custom cursor effects

## Project Structure

```
sadellari-website/
├── public/             # Static assets and images
├── src/
│   ├── app/           # Next.js app directory
│   │   ├── page.tsx   # Homepage
│   │   └── layout.tsx # Root layout
│   ├── components/    # React components
│   │   ├── ui/        # Reusable UI components
│   │   └── sections/  # Page sections
│   ├── styles/        # Global styles
│   └── lib/           # Utilities and helpers
├── tailwind.config.js  # Tailwind configuration
└── package.json       # Project dependencies
```

## Getting Started

1. **Clone the repository:**
```bash
git clone https://github.com/tony-42069/sadellari-website.git
```

2. **Install dependencies:**
```bash
cd sadellari-website
npm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Maintain component isolation
- Use Tailwind CSS utility classes
- Implement responsive design patterns
- Follow accessibility guidelines

### Commit Convention
```
feat: Add new feature
fix: Bug fix
docs: Documentation updates
style: Code style updates
refactor: Code refactoring
test: Test updates
chore: Maintenance tasks
```

## Deployment

The site is automatically deployed via Vercel. Any push to the master branch triggers a new deployment with:
- Automatic HTTPS
- Edge Network Distribution
- Asset Optimization
- Preview Deployments

## Contributing

This is a private repository for Sadellari Enterprises. External contributions are not accepted at this time.

## License

© 2024 Sadellari Enterprises. All rights reserved. This code is proprietary and confidential.

