# DaysArts

This is the repo for the DaysArts theater website with all build files. Built on Astro, Vue, Tailwind.


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
- To create new movie or event, copy the _YYYY-MM-DD-event.md template
- To remove a past movie or event, delete the .mdx file or move into their "_old" folder


## Helpful bash shortcuts

### my alias for astro
alias astro='npm run dev'
alias ad='npm run dev'
alias astrob='npm run build'
alias ab='npm run dev'




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
