# DaysArts

This is the private repo with all build files. Built on Astro, Vue, Tailwind.


To build a project in the browser, run:
```sh
npm run dev
```
localhost:4321


## Featured collections
- movie
- event

### Update collections
- Create new movie or event, copy the _YYYY-MM-DD-event.md template
- Move past movie or event into their "_old" folder

## Dependencies
- don't forget to add multiple dependencies


## created some helpers

### my alias for git
alias gs='git status'
alias gp='git push'
alias gpl='git pull'
alias gc='git commit -m'
alias ga='git add .'
alias gl='git log'
alias gd='git diff'

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
