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
- Drag a row up or down to change the order on the website. The Sort order column is not used and can be deleted.
- Category can be any label. A new one shows up as a filter on What We Offer.
- On **Special events**, add workshops and community dates. A past date drops off the calendar on its own.
- Mentor and Staff notes stay in the sheet. The website does not show them.
- Leave the sheet shared so anyone with the link can view it. A change shows on the site within a few minutes.
- If a tab is empty, or the sheet cannot be reached, that part of the site simply shows that nothing is posted. There is no saved class list.

Membership prices, FAQs, hours, and contact links still live in `src/content/siteData.ts`.

To show a Google Calendar later, paste an embed URL into `googleCalendarEmbedUrl` in that same file. Leave it as `""` to hide the embed.

## Photos

Photos are already in `public/images/`. The homepage uses `classroom-lesson.jpg`, `sandpit-play.jpg`, and `library-storytime.jpg`. The other photos are there for later pages.

## Newsletter (Netlify, no monthly fee)

The Join Us page includes an email form with `data-netlify="true"`. After you deploy to Netlify, submissions show up under **Forms → newsletter**. A copy of the form also lives in `public/forms.html` so Netlify can find it at build time.

## Deploy to Netlify

This project is set up for Netlify’s Next.js plugin (`netlify.toml`). Connect the site, use the default build command `npm run build`, and Netlify will handle the rest. Node 22 is set in the build environment.
