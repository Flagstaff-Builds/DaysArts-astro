import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    movies: collection({
      label: 'Movies',
      slugField: 'title',
      path: 'src/content/movie/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        sortOrder: fields.integer({ 
          label: 'Sort Order',
          description: 'Used for ordering movies in listings'
        }),
        description: fields.text({ 
          label: 'Description',
          multiline: true
        }),
        eventNote: fields.text({ 
          label: 'Event Note',
          description: 'Special note about the movie event'
        }),
        rating: fields.text({ label: 'Rating' }),
        genre: fields.array(
          fields.text({ label: 'Genre' }),
          { label: 'Genres', itemLabel: props => props.value }
        ),
        length: fields.text({ label: 'Length' }),
        cast: fields.array(
          fields.text({ label: 'Actor' }),
          { label: 'Cast', itemLabel: props => props.value }
        ),
        showtimes: fields.array(
          fields.text({ label: 'Showtime' }),
          { label: 'Showtimes', itemLabel: props => props.value }
        ),
        poster: fields.image({ 
          label: 'Poster',
          directory: 'src/content/movie/images',
          publicPath: './images/'
        }),
        trailer: fields.url({ label: 'Trailer URL' }),
        socialImage: fields.image({ 
          label: 'Social Image',
          directory: 'src/content/movie/images',
          publicPath: './images/',
          description: 'Image for social media sharing'
        }),
        reelAlternative: fields.checkbox({ 
          label: 'Reel Alternative',
          description: 'Is this a Reel Alternative film?'
        }),
        content: fields.markdoc({ 
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/movie/images',
              publicPath: './images/'
            }
          }
        })
      },
    }),
    events: collection({
      label: 'Events',
      slugField: 'title',
      path: 'src/content/event/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ 
          label: 'Description',
          multiline: true
        }),
        entertainment: fields.array(
          fields.text({ label: 'Type' }),
          { label: 'Entertainment Types', itemLabel: props => props.value }
        ),
        date: fields.text({ label: 'Date' }),
        time: fields.text({ label: 'Time' }),
        price: fields.text({ label: 'Price' }),
        poster: fields.image({ 
          label: 'Poster',
          directory: 'src/content/event/images',
          publicPath: './images/'
        }),
        socialImage: fields.image({ 
          label: 'Social Image',
          directory: 'src/content/event/images',
          publicPath: './images/',
          description: 'Image for social media sharing'
        }),
        website: fields.url({ label: 'Website' }),
        facebook: fields.url({ label: 'Facebook' }),
        twitter: fields.url({ label: 'Twitter' }),
        instagram: fields.url({ label: 'Instagram' }),
        youtube: fields.url({ label: 'YouTube' }),
        concertSponsor: fields.array(
          fields.text({ label: 'Sponsor' }),
          { label: 'Concert Sponsors', itemLabel: props => props.value }
        ),
        receptionSponsor: fields.array(
          fields.text({ label: 'Sponsor' }),
          { label: 'Reception Sponsors', itemLabel: props => props.value }
        ),
        past: fields.checkbox({ 
          label: 'Past Event',
          description: 'Is this a past event?'
        }),
        content: fields.markdoc({ 
          label: 'Content',
          options: {
            image: {
              directory: 'src/content/event/images',
              publicPath: './images/'
            }
          }
        })
      },
    }),
  },
});