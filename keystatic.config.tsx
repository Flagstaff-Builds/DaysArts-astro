import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'flagstaff-websites/daysarts-astro',
  },
  ui: {
    brand: {
      name: 'DaysArts',
      mark: () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 128 128"
          width={24}
          height={24}
        >
          <path d="M75,111.5c-0.8-0.2-1.7-0.4-2.5-0.7c-2.7-0.8-4.8-3.5-4.5-6.5c0.2-2.1,1.2-3.8,2.4-5.4c1.4-2,3.4-3.3,5.5-4.5c3.4-1.9,7.1-2.4,10.9-1.4c0.6,0.1,1.1,0.5,1.6,0.8c0.2,0.1,0.3,0.1,0.6,0.3c0-0.5,0-0.8,0-1.2c0-9.7,0-19.3,0-29c0-0.7-0.2-1.1-0.9-1.5c-2.9-1.7-5.7-3.5-8.6-5.2c-3.8-2.3-7.7-4.7-11.6-7c-2-1.2-4.1-2.5-6.3-3.8c0,0.5,0.1,0.9,0.1,1.3c0,4.7,0,9.5,0,14.2c0,6-0.1,12-0.1,18.1c0,3.4-1.5,5.9-3.9,8.2c-2,1.9-4.3,3.2-7,3.9c-2.5,0.7-5,1.1-7.6,0c-3.7-1.5-5.2-5.1-3.6-8.9c1.4-3.3,4-5.6,7.1-7.3c1.6-0.9,3.2-1.6,5-1.9c2.9-0.4,5.6-0.3,8.3,1.4c0-19.7,0-39.2,0-58.8c2.4-0.5,3.7,1.3,5.4,2.3c6.6,4.1,13.1,8.3,19.6,12.5c1.8,1.1,3.5,2.2,5.2,3.4c0.3,0.2,0.6,0.9,0.6,1.3c0,7.9,0,15.8,0,23.7c0,12.7,0,25.5,0,38.2c0,4.2-1.8,7.3-5.1,9.8c-2.4,1.8-5,3-7.9,3.5c-0.4,0.1-0.9,0.2-1.3,0.2C75.9,111.5,75.4,111.5,75,111.5zM88.9,60c0-3.1,0-5.9,0-8.8c0-0.2-0.2-0.5-0.5-0.7c-0.9-0.6-1.8-1.1-2.7-1.6c-3.5-2.1-7-4.2-10.5-6.3c-4.2-2.5-8.4-5.1-12.6-7.7c-0.3-0.2-0.7-0.4-1.2-0.7c0,0.6,0,0.9,0,1.3c0.1,2.2,0.2,4.3,0.1,6.5c-0.1,1.1,0.3,1.6,1.2,2c0.7,0.3,1.3,0.8,1.9,1.2c3.2,1.9,6.4,3.9,9.5,5.8C79.1,53.9,83.9,56.9,88.9,60z"/>
        </svg>
      )
    },
  },
  collections: {
    movies: collection({
      label: 'Movies',
      slugField: 'title',
      path: 'src/content/movie/*',
      format: { contentField: 'description' },
      schema: {
        // Basic Info
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.markdoc({ 
          label: 'Description',
          description: 'Movie description (keep it concise - under 200 characters recommended)'
        }),
        
        // Media
        poster: fields.conditional(
          fields.select({
            label: 'Poster Source',
            options: [
              { label: 'Upload Image', value: 'upload' },
              { label: 'Use URL', value: 'url' }
            ],
            defaultValue: 'upload'
          }),
          {
            upload: fields.image({ 
              label: 'Upload Movie Poster',
              directory: 'src/content/movie/images',
              publicPath: './images/',
              description: 'Upload poster image from your computer'
            }),
            url: fields.url({ 
              label: 'Poster URL',
              description: '1) Search movie https://rb.gy/els8zz 2) Click on poster image 3) Right-click → "Copy Image Address" 4) Paste URL here (e.g., https://image.tmdb.org/t/p/original/...)'
            })
          }
        ),
        trailer: fields.url({ 
          label: 'Trailer URL',
          description: 'Video URL (e.g., https://www.youtube.com/watch?v=-sAOWhvheK8)',
          validation: {
            isRequired: false
          }
        }),
        
        // Movie Details
        rating: fields.select({
          label: 'Rating',
          options: [
            { label: 'G', value: 'G' },
            { label: 'PG', value: 'PG' },
            { label: 'PG-13', value: 'PG-13' },
            { label: '14A', value: '14A' },
            { label: 'R', value: 'R' },
            { label: 'NC-17', value: 'NC-17' },
            { label: 'NR', value: 'NR' }
          ],
          defaultValue: 'PG'
        }),
        genre: fields.array(
          fields.select({
            label: 'Genre',
            options: [
              { label: 'Action', value: 'Action' },
              { label: 'Adventure', value: 'Adventure' },
              { label: 'Animation', value: 'Animation' },
              { label: 'Biography', value: 'Biography' },
              { label: 'Comedy', value: 'Comedy' },
              { label: 'Crime', value: 'Crime' },
              { label: 'Documentary', value: 'Documentary' },
              { label: 'Drama', value: 'Drama' },
              { label: 'Family', value: 'Family' },
              { label: 'Fantasy', value: 'Fantasy' },
              { label: 'History', value: 'History' },
              { label: 'Horror', value: 'Horror' },
              { label: 'Music', value: 'Music' },
              { label: 'Mystery', value: 'Mystery' },
              { label: 'Romance', value: 'Romance' },
              { label: 'Science Fiction', value: 'Science Fiction' },
              { label: 'Thriller', value: 'Thriller' },
              { label: 'War', value: 'War' },
              { label: 'Western', value: 'Western' }
            ],
            defaultValue: 'Drama'
          }),
          { 
            label: 'Genres', 
            itemLabel: (props: any) => props.value || 'Select Genre'
          }
        ),
        length: fields.text({ 
          label: 'Runtime',
          description: 'e.g. "1h 53m"'
        }),

        // Cast & Crew
        cast: fields.array(
          fields.text({ label: 'Actor Name' }),
          { 
            label: 'Cast', 
            itemLabel: (props: any) => props.value || 'New Cast Member'
          }
        ),
        
        // Screening Info
        showtimes: fields.array(
          fields.object({
            date: fields.date({ 
              label: 'Show Date',
              description: 'Date of the screening'
            }),
            isMatinee: fields.checkbox({
              label: 'Matinee Showing',
              description: 'Check if this is a matinee (afternoon) showing',
              defaultValue: false
            })
          }),
          { 
            label: 'Showtimes',
            itemLabel: (props: any) => {
              if (props.fields.date.value) {
                const date = new Date(props.fields.date.value);
                const dateStr = date.toLocaleDateString('en-CA', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                });
                return props.fields.isMatinee.value ? `${dateStr} (Matinee)` : dateStr;
              }
              return 'New Showtime';
            }
          }
        ),
        eventNote: fields.text({ 
          label: 'Special Event Note',
          description: 'Any special information about this screening'
        }),
        sponsors: fields.array(
          fields.text({ label: 'Sponsor Name' }),
          { 
            label: 'Sponsors',
            itemLabel: (props: any) => props.value || 'New Sponsor',
            description: 'Organizations or individuals sponsoring this movie'
          }
        ),
        reelAlternative: fields.checkbox({ 
          label: 'Reel Alternative Film',
          description: 'Check if this is a Reel Alternative screening'
        })
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/event/*',
      format: { contentField: 'description' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.markdoc({ 
          label: 'Description',
          description: 'Event description'
        }),
        price: fields.text({ 
          label: 'Price',
          description: 'Event ticket price (eg: $35)'
        }),
        dateTime: fields.datetime({ 
          label: 'Date & Time',
          description: 'Event date and time'
        }),
        poster: fields.image({ 
          label: 'Event Poster',
          directory: 'src/content/event/images',
          publicPath: './images/',
          description: 'Upload poster image for the event'
        }),
        links: fields.object({
          website: fields.text({ 
            label: 'Website',
            description: 'Website URL (optional)'
          }),
          facebook: fields.text({ 
            label: 'Facebook',
            description: 'Facebook URL (optional)'
          }),
          twitter: fields.text({ 
            label: 'Twitter',
            description: 'Twitter URL (optional)'
          }),
          instagram: fields.text({ 
            label: 'Instagram',
            description: 'Instagram URL (optional)'
          }),
          youtube: fields.text({ 
            label: 'YouTube',
            description: 'YouTube URL (optional)'
          })
        }, {
          label: 'Links & Social Media',
          layout: [12, 3, 3, 3, 3],
        }),
        eventSponsor: fields.array(
          fields.text({ label: 'Sponsor Name' }),
          { 
            label: 'Event Sponsors',
            itemLabel: (props: any) => props.value || 'New Sponsor'
          }
        ),
        receptionSponsor: fields.array(
          fields.text({ label: 'Sponsor Name' }),
          { 
            label: 'Reception Sponsors',
            itemLabel: (props: any) => props.value || 'New Sponsor'
          }
        )
      },
    }),
  },
});