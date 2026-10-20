# EPIC Learning Center

Website for **EPIC Learning Center** in Jinja, Uganda — hands-on classes, a children’s library, and a family community hub for ages 0–18.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123) if you start the dev server with:

```bash
npm run dev -- --hostname 127.0.0.1 --port 43123
```

`npm run dev` on its own uses port 3000.

## Update classes and special events

Weekly classes and one-off events come from the Google Sheet **EPIC Learning Center — Website Schedule**:

https://docs.google.com/spreadsheets/d/1xPTSbbbwSgvuGUrOPdlVoKEza721vMMwFjz8mPy7RtM/edit

- On **Classes**, set **Show on website** to Yes for a class that should appear on Home, What We Offer, and the Monthly Calendar.
- On **Special events**, add workshops and community dates. A past date drops off the calendar on its own.
- Mentor and Staff notes stay in the sheet. The website does not show them.
- Leave the sheet shared so anyone with the link can view it. A change shows on the site within a few minutes.
- If the sheet cannot be reached, the site keeps the class list saved in `src/content/siteData.ts`.

Membership prices, FAQs, hours, and contact links still live in `src/content/siteData.ts`.

To show a Google Calendar later, paste an embed URL into `googleCalendarEmbedUrl` in that same file. Leave it as `""` to hide the embed.

## Photos

The logo and founder portraits are already in place. Drop the remaining photos into `public/images/` with these names:

- `hero-project.jpg`
- `hero-outdoor.jpg`
- `hero-library.jpg`

## Newsletter (Netlify, no monthly fee)

The Join Us page includes an email form with `data-netlify="true"`. After you deploy to Netlify, submissions show up under **Forms → newsletter**. A copy of the form also lives in `public/forms.html` so Netlify can find it at build time.

## Deploy to Netlify

This project is set up for Netlify’s Next.js plugin (`netlify.toml`). Connect the site, use the default build command `npm run build`, and Netlify will handle the rest. Node 22 is set in the build environment.
