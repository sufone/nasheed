# Nasheed.app



## Plan

- Trim opening and ending silences from all audios (ffmpeg automate) - so can be programmatically optimized client size
- optimize mp3s (avoid compressing until last choice, and even then: backup to D drive!)
- Use anwar al khalaf font - add dua for authors
- make title using aref ruqaa color
- use md3 style
- use blaze slider for circle shaped author portait, sliding loads a new track (and vice versa: new track means slide in)!
- optimize author portaits, use svelte-image
- re-introduce header and footer from layout file
- setup nasheed.app domain on cloudflare
- add more off my favs from yt
- make portaits all square 
- make it mobile first (and only at first)
- lyrics in text form!
- expose id on url (allow selection and sharing specific!), update as updates along with pg title
- setup media navigator api better


## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
