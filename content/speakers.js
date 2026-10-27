/* Speakers. `match` is the name used in session `lead` fields, which links
 * each speaker to their sessions. photoScale/photoOrigin crop the headshot.
 * Speakers with org: true are shown as organizers.
 */
window.CONF = window.CONF || {};
window.CONF.speakers = [
  { key: 'daniel', match: 'Daniel Tal', initials: 'DT', photo: 'media/headshots/daniel-tal.jpg', photoScale: 1.9, photoOrigin: '52% 28%', name: 'Daniel Tal, FASLA', title: 'Co-organizer', focus: 'Digital design and AI workflows', org: true,
    bio: 'Landscape architect, author, software developer, and educator whose work connects digital design tools with professional practice. His experience spans 3D modeling, visualization, software development, and AI-supported workflows.' },
  { key: 'jenn', match: 'Jenn Becker', initials: 'JB', photo: 'media/headshots/jenn-becker.jpg', photoScale: 1.55, photoOrigin: '50% 100%', name: 'Jenn Becker', title: 'Co-organizer', focus: 'Visualization and AI workflows', org: true,
    bio: 'Jenn Becker is a Digital Technology Strategist with over 11 years of experience in landscape architecture. She brings deep expertise in 3D modeling, rendering, and visualization, and leads AI research and development initiatives across her firm. Jenn has developed training manuals and established standards, policies, and workflows to guide responsible and innovative AI implementation. Over the past two years, she has presented nationally on emerging AI and digital technology trends. She has also created custom toolsets and streamlined workflows integrating visualization, drone technology, and artificial intelligence to advance design processes.' },
  { key: 'kelly', match: 'Kelly Curl', initials: 'KC', photo: 'media/headshots/kelly-curl.jpg', photoScale: 1.1, photoOrigin: '52% 40%', name: 'Kelly Curl', title: 'Guest speaker', focus: 'AI in academia',
    bio: 'Associate professor of landscape architecture at Colorado State University, where she has taught for 16 years, after practicing with PWP on the West Coast. She presented AI work from her summer field studio with Daniel and Jenn at ASLA National 2026.' },
  { key: 'angelo', match: 'Angelo', initials: 'A', name: 'Angelo', title: 'Guest speaker', focus: 'Advanced AI agents and management',
    bio: 'Bio forthcoming.' },
  { key: 'justin', match: 'Justin Gies', initials: 'JG', photo: 'media/headshots/justin-gies.jpg', photoScale: 1.15, photoOrigin: '53% 42%', name: 'Justin Gies', title: 'Guest speaker', focus: 'Topic to be announced',
    bio: 'Bio forthcoming.' },
];
