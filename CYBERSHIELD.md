# CyberShield ZA — running and testing

## In Newly
Open the mobile preview. Home → message field opens Check a message. Paste 10–6,000 characters, choose SMS / WhatsApp / Email, read the AI disclosure, turn on Allow AI processing, then Analyse message. The first check creates a private guest session, without requesting an email. A real AI result includes Low / Medium / High risk, reasons and next steps. A failed service or network request shows Message not assessed; it never substitutes a made-up rating.

History is saved on this phone by default, up to 100 scans. It survives relaunch. In Privacy, turn Save scan history off to keep future results temporary. Existing history remains until deleted. Export uses the native share sheet. Individual and bulk deletion require confirmation. Delete all data & private session also deletes the guest account on the backend; it needs internet.

Scam Scans contains seven authored, clearly labelled South African scenarios with non-working .example URLs. Open one and choose Try this message with AI to prefill the real scanner. Education contains five guides with saved step progress and a final knowledge check.

## Source structure
- `src/app/(tabs)`: Home, Scam Scans, Education, Privacy
- `src/app`: scanner, assessment, history, example, guide reader and privacy notice
- `src/features/shield`: content, state, screen hooks and reusable design elements
- `src/lib/auth.ts`: public service addresses and secure-session client; no private API keys
- `backend/auth-service`: guest sessions and deletion using the canonical auth service
- `backend/api-service/src/routes/analyze.ts`: protected AI route, input validation, structured-output validation and per-instance abuse limits
- `assets/cybershield`: exact artwork cropped from the four supplied references

## Developer checks
The project uses Bun. `bun install` installs dependencies. `bun run typecheck` checks TypeScript. `bun scripts/anti-slop-lint.mjs` checks design rules. `bun .newly/test-ai.ts` exercises the deployed development AI with a fictional FNB impersonation message and deletes its test guest account. It prints only the assessment and status, never credentials. The native preview is built through Newly, not Expo Go. For a local checkout outside Newly, use the package's existing Expo start scripts with an appropriate development client.

## Secure AI configuration
Newly AI model alias `chat` is enabled in dev. The mobile client talks only to the public auth/API addresses. AI service credentials are injected into the backend by Newly and never bundled. The route uses authenticated requests, a 90-second AI deadline, validates consent and message size, treats pasted text as untrusted data and validates the response shape. It does not intentionally persist or log submitted messages. The in-memory five-per-minute user limit is a best-effort per-instance guard, not a distributed quota system.

## Manual acceptance checklist
1. Empty / short input produces a clear validation message without transmission.
2. AI consent starts off. An unchecked permission prevents analysis.
3. The FNB example produces a real High risk response; watch the shield outline draw beside Check complete.
4. Check that summary, signs, recommendations and original text are readable.
5. Return Home / history, open a saved check, relaunch the app and confirm retention.
6. Turn history off; new result is temporary. Confirm old history remains.
7. Disconnect networking and check the retryable error; no result is invented.
8. Search and filter the examples; prefill one into the scanner.
9. Complete a guide's five steps and answer correctly; completion and progress persist.
10. Privacy: revoke AI consent, export, cancel a delete, confirm a delete, and delete the private session.

## Before public release
Publish an operator-owned privacy policy and support contact. Confirm processor retention and cross-border processing disclosures and any applicable POPIA obligations with qualified advice. Review AI usage costs, abuse controls and store disclosures. Development deployment is not a production deployment. The project owner enables production models and deploys the backend from the main version using Newly's project controls before distributing a production app. No production availability or legal compliance is claimed by this preview.
