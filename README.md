# PanahTech Website

An interactive company profile website for **PanahTech**, showcasing digital services (Web, AI, VR, IoT), project portfolio, contact page, and an AI chatbot for initial project consultation.

## About This Website

This website is designed as both a landing page and a service catalog for PanahTech, with a focus on:

* Modern and responsive brand presentation
* Clear service categorization with detailed service pages
* Project portfolio showcase
* Contact form and consultation chat
* AI chatbot integration powered by Gemini

## Key Features

* **Interactive Homepage** with hero section, features, services, showcase, and call-to-action
* **Services Pages**:

  * `/services`
  * `/services/[slug]`
* **Portfolio Page**: `/portfolio`
* **Contact Page**: `/contact`

### AI Chatbot

* Responds in the user's language
* Maintains chat context per session
* Displays a WhatsApp follow-up button when user requirements are clearly identified

## Tech Stack

* Next.js (App Router)
* React
* Tailwind CSS
* GSAP
* Gemini API (Google Generative Language API)

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key_optional
GEMINI_API_KEY=your_gemini_api_key
```

Notes:
* `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` is required for the contact form because submit now goes directly from browser to Web3Forms.
* `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is optional, but recommended for stronger spam protection.