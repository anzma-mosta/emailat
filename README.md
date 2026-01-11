# Emailat - Professional Email Hosting

A modern Next.js application for email hosting subscription and management.

## Project Structure

```
emails-next/
├── app/                    # Next.js App Router
│   ├── subscribe/         # Subscription flow (Stage 1)
│   │   ├── plans/        # Step 1: Choose plan
│   │   ├── domain/       # Step 2: Domain selection
│   │   ├── phone/        # Step 3: Phone number
│   │   ├── register/     # Step 4: Registration
│   │   ├── payment/      # Step 5: Payment
│   │   └── success/      # Step 6: Success page
│   ├── dashboard/        # Dashboard (Stage 2)
│   │   ├── layout.tsx    # Dashboard layout with sidebar
│   │   └── page.tsx      # Dashboard home
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/           # Reusable components
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   └── ProgressStepper.tsx
├── lib/                  # Utilities and constants
│   ├── constants.ts
│   └── types.ts
└── services/            # API services (placeholder)
```

## Features

### Stage 1: Subscription Flow
1. **Plan Selection** (`/subscribe/plans`)
   - Choose from Starter, Growth, or Enterprise plans
   - Monthly/Yearly billing toggle
   
2. **Domain Selection** (`/subscribe/domain`)
   - Register new domain or use existing
   - Domain availability check
   
3. **Phone Number** (`/subscribe/phone`)
   - Phone number registration
   - Country code selection
   
4. **Registration** (`/subscribe/register`)
   - User account creation
   - Password setup
   
5. **Payment** (`/subscribe/payment`)
   - Payment method selection (Card, PayPal, Bank Transfer)
   - Order review
   
6. **Success** (`/subscribe/success`)
   - Confirmation page
   - Redirect to dashboard

### Stage 2: Dashboard
- Overview statistics
- Recent activity
- Navigation sidebar
- Domain and email management (ready for implementation)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Design System

- **Primary Color**: `#000c7c`
- **Font**: Inter
- **Icons**: Material Symbols Outlined
- **Styling**: Tailwind CSS with custom theme

## Technologies

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Material Symbols Icons

