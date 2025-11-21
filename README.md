# Spinwheel Debt Profile Dashboard

Connect users and display their debt profiles and liabilities.

**Demo:** https://spinwheel-debt-profile-fa5bgns4h-rivanmota.vercel.app

![Spinwheel Debt Profile Dashboard](https://github.com/user-attachments/assets/a1f6962b-85f1-4d06-9a3a-eddf5722c0e9)

![Verify OTP](https://github.com/user-attachments/assets/799d304f-6d42-46cd-8a2f-f10729f5fa8e)


## Features

- **User Connection**: Connect users via SMS or pre-verified phone numbers
- **Debt Profile View**: Display comprehensive debt information including:
  - Credit cards with balances and credit limits
  - Loans and other liabilities
  - Payment due dates and minimum payments
  - Account status and types
- **Total Balance Summary**: View aggregated debt totals
- **Real-time Refresh**: Update debt profile data on demand


### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SPINWHEEL_SECRET_KEY` | Your Spinwheel API secret key | Yes |
| `NEXT_PUBLIC_SPINWHEEL_BASE_URL` | Base URL for Spinwheel API (default: sandbox) | No |
| `NEXT_PUBLIC_SPINWHEEL_SECURE_URL` | Secure URL for user connection (default: sandbox) | No |

## Usage

1. **Connect a User**: 
   - Enter a phone number (test phone number from Spinwheel sandbox)
   - Click "Connect User" to authenticate
   - The user ID will be stored and used for subsequent API calls

2. **View Debt Profile**:
   - After connecting, the debt profile will automatically load
   - View all liabilities with detailed information
   - See total debt balance at the top

3. **Refresh Data**:
   - Click "Refresh Debt Profile" to fetch the latest data
   - Disconnect and reconnect with a different user as needed

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── connect/route.ts          # User connection endpoint
│   │   └── debt-profile/route.ts     # Debt profile fetch endpoint
│   ├── layout.tsx                     # Root layout
│   ├── page.tsx                       # Main dashboard page
│   └── globals.css                    # Global styles
├── components/
│   ├── ConnectUserForm.tsx           # User connection form
│   ├── DebtProfileCard.tsx           # Individual liability card
│   └── LiabilityList.tsx             # List of all liabilities
├── lib/
│   └── spinwheel.ts                  # Spinwheel API client
└── package.json
```

## API Integration

The application uses the following Spinwheel API endpoints:

- **POST `/v1/users`**: Connect a new user
- **GET `/v1/users/{userId}/debt-profile`**: Fetch user's debt profile

All API calls are made server-side through Next.js API routes for security.

## Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Spinwheel API**: Embedded debt solutions

## Resources

- [Spinwheel API Documentation](https://docs.spinwheel.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

MIT

