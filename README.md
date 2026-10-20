# SZKPROTECT starter

A black-and-white React/Vite starter UI for SZKPROTECT, a Lua-focused protection workspace. Intended for GitHub + Vercel.

## Included
- Responsive landing page and version navigation
- SZKPROTECT 1.0 workspace UI
- `.lua` upload with a 500 KB client-side limit
- Copy/download output controls
- SZKPROTECT 2.0 Premium “Coming soon” page
- **No checkout or payment integration**; Premium is locked for now
- Honest placeholder for the obfuscation engine (does not generate fake protected code)
- Discord community link

## Run locally
Requires Node.js 20+.

```bash
npm install
npm run dev
```

Build:
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Create a GitHub repository and upload these files.
2. In Vercel, import that GitHub repository.
3. Use the Vite framework preset (Vercel should detect it automatically).
4. Deploy. No environment variables are required for this UI-only starter.

## Important: this is the frontend starter, not a complete production service
- Login buttons intentionally show a setup notice. Google, Discord, and GitHub OAuth are not connected yet.
- The obfuscate action intentionally does not return fake output. Connect a real, authorized Lua obfuscation engine through a secure server-side API before enabling real processing.
- No backend, database, account system, or job persistence is included yet.
- Premium is a coming-soon page only. There is no checkout, subscription, or payment collection.
- Do not place OAuth secrets, engine keys, database credentials, or Discord webhook URLs in frontend code.
- The Discord webhook previously shared should be rotated before use. Store a replacement only in server-side environment variables.
- Client-side file checks improve usability but do not replace server-side validation.

## Planned next steps
1. Choose an authentication provider and configure Google, Discord, and GitHub OAuth.
2. Add a server-side API and database compatible with the Vercel deployment model.
3. Integrate an authorized obfuscation engine, with server-side validation, rate limits, and job timeouts.
4. Add account history and privacy controls.
5. Keep payments disabled until the Premium release is intentionally launched.
