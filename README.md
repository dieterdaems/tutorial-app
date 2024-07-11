# Requirements

- Create .env.local file that has the following entries:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=

CLERK_PUBLISHABLE_KEY=

CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in

NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

DATABASE_URL=

NEXT_PUBLIC_API_URL=

- Clerk keys
These keys can always be retrieved from the API Keys page of your Clerk Dashboard. NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_PUBLISHABLE_KEY are the same key. DATABASE_URL is the link towards your Postgress DB, NEXT_PUBLIC_API_URL is the link of your site, to run local use http://localhost:3000

# Commands

npm install

npm run dev