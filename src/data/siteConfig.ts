/**
 * Central site configuration for BrightWorkSheets (brightworksheets.com)
 * Keeps site metadata, contact email, and last-updated date in one easily editable place.
 */

export const SITE_CONFIG = {
  name: 'BrightWorkSheets',
  domain: 'brightworksheets.com',
  url: 'https://brightworksheets.com',
  contactEmail: 'contact@brightworksheets.com',
  lastUpdated: 'October 5, 2026',
  responseTurnaround: '2-3 business days',
  tagline: 'Simple, clean, ad-light learning printables for parents, teachers, and homeschoolers',
  tools: [
    {
      id: 'Name Tracing',
      url: '/name-tracing/',
      title: 'Name Tracing Generator',
      description: 'Personalized handwriting practice with solid models, dotted tracing, and penmanship guidelines.',
    },
    {
      id: 'Alphabet Tracing',
      url: '/alphabet-tracing/',
      title: 'Alphabet Tracing Worksheets',
      description: 'Letter practice from A to Z with starting arrows and free-writing boxes.',
    },
    {
      id: 'Number Tracing',
      url: '/number-tracing/',
      title: 'Number Tracing Worksheets',
      description: 'Number writing 0–100 with counting stars/circles and stroke guides.',
    },
    {
      id: 'Math Worksheets',
      url: '/math-worksheets/',
      title: 'Math Worksheet Generator',
      description: 'Addition, subtraction, multiplication, and division drills with answer keys.',
    },
    {
      id: 'Word Search',
      url: '/word-search/',
      title: 'Word Search Generator',
      description: 'Custom spelling and themed word find puzzles with highlighted solutions.',
    },
    {
      id: 'Mazes',
      url: '/mazes/',
      title: 'Printable Maze Generator',
      description: 'Single-solution square and circular mazes with theme markers and answer keys.',
    },
  ],
};
