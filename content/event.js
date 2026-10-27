/* Event-level content: copy, themes, example images, logistics, hotels.
 * Edit here; app.js renders it. Run `node app.js --refresh` to update the
 * no-JavaScript snapshot baked into index.html.
 */
window.CONF = window.CONF || {};
window.CONF.event = {
  title: 'AI in Your Practice',
  titleLead: 'AI in ',
  titleAccent: 'Your',
  titleTail: ' Practice',
  city: 'Boulder',
  year: 2027,

  /* Set to the registration page URL when it exists. While null, every
   * "Reserve your spot" button goes to the Details page. */
  registrationUrl: null,

  /* Design options. */
  colorCoding: true,          // color each skill theme through the agenda
  heroLayout: 'mosaic',       // 'mosaic' (main image + three) or 'single'

  hero: {
    tag: 'Two-day conference',
    eyebrow: 'Boulder, Colorado · 2027 · Dates to be announced',
    subtitle: 'From your first prompt to your firm’s next workflow.',
    body: 'Two days of practical AI learning for design professionals and the people who lead them. Daniel Tal, Jenn Becker, and guest presenters take you from your first prompt to a plan for your firm, using real project examples throughout.',
    main: 'park',
    small: ['drone', 'massing', 'grading'],
    caption: 'Examples of AI workflows you will learn.',
  },

  learn: {
    eyebrow: '01 / What you’ll learn',
    title: 'Six skills, each taught in the sessions that follow.',
    body: 'Every session shows the whole job: the task, the inputs, the process, the result, the review, and the limits. Start simply, build context, test the result, and keep people accountable.',
    audience: 'For landscape architects, architects, planners, designers, visualization professionals, educators, firm owners, and practice leaders.',
  },

  agenda: {
    intro: 'Tap a session for its abstract and outcomes. Each one is tagged with the skill it teaches. All times local to Boulder.',
  },

  /* Example images in media/. */
  images: {
    research: { f: 'ex-research.jpg', title: 'Prompt to sourced guide', caption: 'A one-paragraph prompt turned into a researched design guide for a mixed-use site.', alt: 'A short research prompt beside the long research guide it produced' },
    wfChapter: { f: 'ex-workflow-chapter.jpg', title: 'Script to deck to chapter', caption: 'ChatGPT writes the script, Claude Design builds the deck, a person records the talk, ChatGPT drafts the chapter, and a person edits it.', alt: 'Five-step workflow diagram from script to edited chapter' },
    chapter: { f: 'ex-chapter.jpg', title: 'Talk to draft chapter', caption: 'A recorded talk became a 3,000-word draft chapter, then a full round of human edits.', alt: 'Draft book chapter pages with tracked changes' },
    drone: { f: 'ex-drone.jpg', title: 'Google Earth to drone aerial', caption: 'A Google Earth capture turned into a drone-style aerial for a proposal.', alt: 'Google Earth capture beside the AI drone-style aerial made from it' },
    massing: { f: 'ex-massing.jpg', title: 'Massing to concept aerial', caption: 'Simple SketchUp massing rendered into an illustrative aerial for a client to react to.', alt: 'White massing model beside an AI-rendered aerial of the same blocks' },
    park: { f: 'ex-central-park.jpg', title: 'Central Park from one prompt', caption: 'An editable model with topography and surrounding buildings, built in about 40 minutes.', alt: 'AI-built 3D model of Central Park and the Manhattan skyline' },
    piazza: { f: 'ex-piazza.jpg', title: 'A street wall from photos', caption: 'Building facades modeled in SketchUp from a few reference photos.', alt: 'AI-built SketchUp model of a row of facades' },
    grading: { f: 'ex-grading.jpg', title: 'Grading tool', caption: 'Grades a path to a set slope and places retaining walls where the slope demands them.', alt: 'SketchUp grading tool showing a graded path with retaining walls' },
    parking: { f: 'ex-parking.jpg', title: 'Parametric parking', caption: 'Draw a boundary, set the rules, and the tool lays out stalls, islands, and lights.', alt: 'SketchUp parking layout tool over a site plan' },
    wfCoding: { f: 'ex-workflow-coding.jpg', title: 'People stay accountable', caption: 'People define the feature, test it, and approve the release. AI builds the scaffolding and drafts the code.', alt: 'Five-step human and AI coding workflow diagram' },
  },

  /* Six skill themes. tone = [color on white, color on navy]. */
  themes: [
    { id: 'foundations', num: '01', name: 'Start with the fundamentals', short: 'Fundamentals', tone: ['#2563c9', '#7fb2ff'], outcome: 'Understand what a large language model is and why its answers need checking, write a prompt that works, and pick the right tool for the task, the data, and the evidence you need.' },
    { id: 'writing', num: '02', name: 'Research and write with AI', short: 'Research & writing', tone: ['#7c3aed', '#c4a5ff'], outcome: 'Go from a question and source material to a reviewed draft or proposal, checking every claim against its source along the way.' },
    { id: 'imagery', num: '03', name: 'Prompt images and animation', short: 'Images & animation', tone: ['#d6336c', '#ff8fb5'], outcome: 'Turn sketches, massing models, and site captures into concept imagery and short animations without losing design intent.' },
    { id: 'building', num: '04', name: 'Build models and small tools', short: 'Models & tools', tone: ['#d6561d', '#ffa06b'], outcome: 'Generate editable 3D models from a prompt, photo, sketch, or CAD file, and describe your way to a small custom tool you test before you trust.' },
    { id: 'responsible', num: '05', name: 'Use AI responsibly', short: 'Responsible use', tone: ['#2f8a3e', '#7fd98c'], outcome: 'Decide what data can enter a tool, who reviews the output, and how use is disclosed, and weigh the energy and infrastructure questions behind adoption.' },
    { id: 'adoption', num: '06', name: 'Bring AI into your firm', short: 'Firm adoption', tone: ['#0f8a87', '#5fd4d0'], outcome: 'Learn from a university studio and specialist practice, see how agents take on coordinated work, and leave with a 30-day pilot plan for your own firm.' },
  ],

  logistics: [
    ['Dates', 'To be announced'],
    ['Location', 'Boulder, Colorado'],
    ['Venue', 'To be announced'],
    ['Ticket price', 'To be announced'],
    ['Hours', 'Day 1: 9 a.m.–4 p.m. · Day 2: 9 a.m.–noon'],
    ['Capacity', 'Limited to 100 attendees'],
  ],

  /* Sponsors band, shown above the footer on every view. Replace each
   * placeholder with the sponsor's name, logo file, and website, e.g.
   *   { name: 'Acme Studio', logo: 'media/sponsors/acme.png', href: 'https://acme.example' }
   * A tile with href is a link to that site (opens in a new tab). Put logo
   * files in media/sponsors/; SVG or a wide transparent PNG works best. */
  sponsors: {
    title: 'Sponsors',
    note: 'Sponsorship opportunities will be announced with the confirmed event details.',
    list: [{ name: 'Sponsor' }, { name: 'Sponsor' }, { name: 'Sponsor' }, { name: 'Sponsor' }],
  },

  /* Replace with real hotels and booking links. */
  hotels: [
    { name: 'Hotel name', href: '#hotels' },
    { name: 'Hotel name', href: '#hotels' },
  ],
};
