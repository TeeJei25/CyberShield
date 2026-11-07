# CyberShield ZA

An AI-assisted mobile app that helps South Africans check suspicious SMS, WhatsApp and email messages for scams, and learn how to stay safe.

Built by **Tselane Moatshe** at the Newly hackathon (6 November 2026), using [Newly](https://newly.app).

> **Prototype.** This is a development preview built in a hackathon. It is not a production service, and it makes no claim of legal compliance.

## The problem

Scam messages that impersonate banks, couriers, employers and WhatsApp itself are common, and many people have nowhere simple to check a message before they act on it. CyberShield ZA gives a quick second opinion and clear next steps, without asking for an email address.

## What it does

- **Check a message:** paste 10 to 6,000 characters, choose SMS, WhatsApp or Email, then get a Low, Medium or High risk rating with reasons and next steps. If the service or network fails, the app says "Message not assessed" and never makes up a rating.
- **Scam Scans:** seven authored South African scenarios with non-working `.example` links. Open one and try it in the scanner.
- **Education:** five short guides with saved progress and a final knowledge check.
- **Privacy controls:** AI processing is off until you allow it. Scan history is saved on the phone by default (up to 100 scans) and can be turned off, exported or deleted. "Delete all data and private session" also deletes the guest account on the backend.

## Privacy by design

- AI is **opt-in**. The user must read the disclosure and switch on "Allow AI processing" before anything is sent.
- No account is needed. The first check creates a **private guest session** without asking for an email address.
- The app tells users to remove names, ID numbers, addresses and account numbers, and never to submit a PIN, password or OTP.
- The backend treats pasted text as untrusted data, validates consent, message length and the shape of the AI response, and does not intentionally store or log submitted messages.
- Credentials for the AI service are injected on the backend and are never bundled into the app.

## How it is built

| Part | Technology |
|------|------------|
| Mobile app | Expo (React Native) with Expo Router |
| UI and state | HeroUI Native, Uniwind (Tailwind v4), Zustand and MMKV |
| Authentication | Guest sessions with Better Auth (`backend/auth-service`) |
| Backend | Cloudflare Workers via Newly Backend (`backend/api-service`), with a protected `/api/analyze` route |
| AI | A model reached through Newly AI |

```
src/app/            Screens: Home, Scam Scans, Education, Privacy, scanner, result, history, guides
src/features/shield Content, state, screen hooks and design elements
src/lib/auth.ts     Public service addresses and the secure-session client (no private keys)
backend/            Auth service and API service
design/             Design references from the build
```

## Running it

The native preview is built through Newly, not Expo Go.

```bash
bun install
bun run typecheck
bun scripts/anti-slop-lint.mjs
```

For a local checkout outside Newly, use the project's Expo start scripts with a development client. The backend needs a Newly Backend deployment.

## Known limitations

- Development deployment only. No production availability is claimed.
- The AI can be wrong. It is a second opinion and does not replace contacting your bank or reporting fraud to SAPS.
- The per-minute rate limit is an in-memory, per-instance guard, not a distributed quota.
- Before any public release, the project would need an operator-owned privacy policy and support contact, confirmation of the AI provider's retention and cross-border processing, and advice from a qualified person on POPIA obligations.

## Credits and licence

Built by Tselane Moatshe with Newly's AI design and build tools. Based on a Newly and Expo template. The `LICENSE` file is the template's MIT licence. [Choose the licence for your own code and update this line.]
