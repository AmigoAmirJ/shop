# About and account pages

## Routes
- `/about`: reads the Strapi single type `about` and renders its Rich text, Quote, Media and Slider blocks.
- `/login`: signs in through Strapi Users & Permissions (`/api/auth/local`).
- `/register`: creates an account through Strapi (`/api/auth/local/register`).
- `/dashboard`: checks the signed-in user's session against Strapi (`/api/users/me`).

## Environment
Create `web/.env.local` (do not commit it):

```env
STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

`STRAPI_URL` is server-only. The browser never receives the Strapi JWT; Next.js stores it in an HttpOnly cookie. Set HTTPS in production so the cookie is Secure.

## Strapi setup
1. Start the CMS and open the Strapi admin panel.
2. In Content Manager → About, add a title and content blocks, then save/publish (the About single type in this project has draft/publish disabled).
3. In Settings → Users & Permissions plugin → Roles → Public, enable `find` and `findOne` for the `about` content type, then save. This makes the About page publicly readable.
4. In Users & Permissions settings, configure allowed registration fields and email confirmation according to the project needs. If email confirmation is enabled, the registration flow may require a separate confirmation/login step; this implementation expects Strapi to return a JWT at registration.
5. Keep the Users & Permissions plugin enabled. The project config already enables its HTTP-only session option; this Next.js implementation stores the returned access JWT in its own HttpOnly cookie.

## Notes
- Strapi is the source of truth for accounts and passwords. Passwords are never stored by the Next.js app.
- Registration and login responses are handled server-side. The dashboard revalidates the token with Strapi on every request.
- Add rate limiting, email verification and a password-reset flow before using this on a public production site.
