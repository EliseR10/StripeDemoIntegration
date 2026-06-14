# ☕ Buy Me a Coffee — Stripe Checkout Demo
 
A simple donation-style web app built to demonstrate a Stripe Checkout integration. Users can select or enter a custom amount and complete a test payment via Stripe's hosted checkout page.
Live on https://stripe-demo-integration.vercel.app/
 
> **Demo project · Stripe test mode · No real charges are processed.**
 
---
 
## Tech stack
 
- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Stripe](https://stripe.com/) — Checkout Sessions API
---
 
## Features
 
- Predefined and custom donation amounts
- Stripe-hosted checkout (no card data touches the app)
- Success page on completed payment
- Input sanitization for custom amount field
- Responsive layout with dark mode support
---
 
## Testing payments
 
Use Stripe's test cards on the checkout page:
 
| Card number | Scenario |
|---|---|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 9995` | Payment declined |
| `4000 0025 0000 3155` | Requires authentication |
 
Use any future expiry date, any 3-digit CVC, and any ZIP code.
 
---
 
## Project structure
 
```
├── app/
│   ├── page.tsx              # Main donation page
│   ├── paymentSuccess/       # Success page after checkout
│   └── api/
│       └── checkout_session/ # Stripe Checkout Session API route
│           └── route.ts
├── lib/
│   └── stripe.ts             # Stripe client instance
└── .env.local                # Environment variables (not committed)
```
 
---
 
## Potential extensions
 
- Webhook listener for `checkout.session.completed` to power a live recent supporters feed
- Support for recurring donations via Stripe Subscriptions
- Email receipt via Stripe's built-in receipt feature
---
 
## License
 
MIT
