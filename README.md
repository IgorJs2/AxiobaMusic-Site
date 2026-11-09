# AxiobaMusic: music streaming web app

> [!WARNING]
> DEPRECATED: an old learning project (2022). Archived and no longer maintained. I keep it public to show where I started.
> My current work (Metrocraft 2036 and Stalcraft LAB) is on [my GitHub profile](https://github.com/IgorJs2).

A Spotify-inspired music site: listen to tracks, save favourites and build your own albums.

## Features
- Registration and login (Passport local + JWT, httpOnly cookies)
- Track upload and playback
- Personal library and custom albums
- Server-side rendered UI

## Tech stack
| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Redux, Tailwind CSS, daisyUI |
| Backend | NestJS, Passport, JWT, bcrypt |
| Database | MongoDB, Mongoose |

## Run locally
```bash
git clone https://github.com/IgorJs2/AxiobaMusic-Site.git
cd AxiobaMusic-Site
npm run modules
# set MONGO_URI in server/.env
npm run start
```
