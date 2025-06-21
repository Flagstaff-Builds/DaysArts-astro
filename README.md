# DaysArts

This is the repo for the DaysArts theater website with all build files. Built with Astro, Tailwind, and Keystatic. Deployed on Netlify.


To build a project in your local machine:
1. clone repo
2. `npm install` to install dependancies
3.
```sh
npm run dev
```
4. open browser to localhost:4321


## Featured collections
- movie
- event

### To update collections
- To create new movie or event, login to admin panel at https://daysarts.ca/admin


## DNS
### daysarts.ca
- Registered with webnames.ca
- DNS managed by Cloudflare
- Hosted on Netlify

### palacetheatre-daysarts.ca
- Registered with webnames.ca
- DNS managed by Cloudflare (after transfer from WordPress)
- Redirects to daysarts.ca, which is hosted on Netlify

palacetheatre-daysarts.ca --DNS managed by--> Cloudflare --redirects to--> daysarts.ca
                                                                       |
                                                                       v
                                                          Netlify <--- hosts --- webnames.ca
