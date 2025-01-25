# Project Overview
This is a local theatre website showing upcoming movies and events, as well as a few informational pages. It's built in Astro with tailwind CSS. The following features are to be built into the current system as seemlessly as possible:

## Features to add
1. ** Authentication **:
    - Implement user authentication using Appwrite Cloud (creds are in the .env file)
    - There will only be 2 users approved in Appwrite, so there's no need for signup features

2. ** Admin Interface Dashboard **:
   - Authenticed users can:
    - add, edit and delete movies
    - add, edit and delete upcoming events
    - this should be a table based interface using shadcn ui

3. ** Connect Movie API for Movie Management **:
   - Add new movie will start a fetch movie data from a free movie database API - TMDB (the .env file provies the api keys)
   - Searching the title will start to autocomplete when typing
   - Once a movie is selected, it will populate the appropiate fields
   - Automatically remove movies from the "Upcoming Movies" section after scheduled dates (possibly using appwrite functions)

4. ** Event Management **:
   - Ability to add and edit upcoming events
   - Automatically transition to "Past Events" page after event date has passed (possibly using appwrite functions)


## Additional Requirements
- Site administrators should have an easy-to-use interface to add new movies/events
- Movies should automatically be removed from the "Upcoming Movies" section after scheduled dates
- Events should move to a "Past Events" page after their event date has passed

## Tech Stack
- **Frontend**: Astro v5, shadcn ui, tailwind
- **Backend**: Appwrite with appwrite functions
- **Database**: Appwrite database if needed
- **API Integration**: TMDB API (for movie data fetching)
- **Hosting**: Cloud hosted with Cloudflare DNS
- **Authentication**: Appwrite

