/* The two program days. A row with an `id` is a session tagged with a skill
 * theme (see event.js). Rows with `pause` are breaks and lunch; `plenary`
 * rows are untagged full-group moments. `min` drives lengths in the agenda.
 */
window.CONF = window.CONF || {};
(function () {
  const DJ = 'Daniel Tal + Jenn Becker';
  const P = (t, min, title, note, kind) => ({ pause: true, t, min, title, note: note || '', kind: kind || 'break' });
  window.CONF.days = [
    { label: 'Day 1', num: '01', hours: '9 a.m.–4 p.m.', theme: 'Foundations, generative design, 3D modeling, and responsible practice', rows: [
      { t: '9:00–9:15', min: 15, plenary: true, title: 'Welcome: ', sub: 'What we want you to leave knowing', lead: DJ },
      { id: 'S01', t: '9:15–10:00', min: 45, theme: 'foundations', level: 'Beginner', lead: DJ, title: 'AI fundamentals: ', sub: 'From LLMs to your first useful prompt',
        abstract: 'A plain-language introduction to large language models and the difference between generating an answer and establishing a fact. Build a simple prompt, improve it with context, and discuss when an answer needs verification or a different tool.',
        outcomes: ['Explain an LLM without technical jargon.', 'Write a task/context/constraints/output prompt.', 'Recognize uncertainty and plausible errors.'] },
      { id: 'S02', t: '10:00–10:30', min: 30, theme: 'foundations', level: 'Beginner', lead: DJ, title: 'Choosing your tools: ', sub: 'Chat, deep research, and evidence',
        abstract: 'Compare common AI assistants and research modes through the work they support. Show when a quick conversation is enough, when deeper research is useful, and how to inspect sources rather than accept a confident summary.',
        outcomes: ['Choose a tool for a task.', 'Distinguish chat from a research workflow.', 'Inspect citations and source quality.'] },
      { id: 'S03', t: '10:30–11:00', min: 30, theme: 'writing', level: 'Beginner to intermediate', lead: DJ, title: 'Research, writing, and proposals: ', sub: 'From question to reviewed draft',
        abstract: 'Follow a practical sequence from a research question and source material to an outline, written draft, and proposal narrative. Show where human editing, evidence checks, and project-specific judgment change the output.',
        outcomes: ['Structure a repeatable writing workflow.', 'Review claims against sources.', 'Adapt a draft to a real audience and project.'] },
      P('11:00–11:15', 15, 'Break'),
      { id: 'S04', t: '11:15–noon', min: 45, theme: 'imagery', level: 'Beginner to intermediate', lead: 'Jenn Becker', title: 'Generative design, part 1: ', sub: 'Image prompting for concepts and renderings',
        abstract: 'Turn sketches, massing models, Google Earth captures, and draft renderings into client-ready imagery. Build a detailed image prompt with AI, use segmentation to keep design intent, and compare each iteration against what the design actually is.',
        outcomes: ['Write an image prompt that tells the story of the design.', 'Use AI to draft and refine prompts for an image model.', 'Separate conceptual imagery from verified project information.'] },
      P('noon–12:45', 45, 'Included lunch and conversation', 'One included meal; placement proposed', 'lunch'),
      { id: 'S05', t: '12:45–1:15', min: 30, theme: 'imagery', level: 'Intermediate', lead: 'Jenn Becker', title: 'Generative design, part 2: ', sub: 'Video prompting and AI animation',
        abstract: 'Chain a massing model, diagrams, and AI key frames into a short animation. Storyboard the sequence, prompt each transition, and judge where a fast AI animation can stand in for a full rendering pass and where it cannot.',
        outcomes: ['Storyboard an animation from key frames.', 'Prompt transitions between frames.', 'Judge an AI animation against design intent and accuracy.'] },
      { id: 'S06', t: '1:15–2:00', min: 45, theme: 'building', level: 'Intermediate; accessible demonstration', lead: 'Daniel Tal', title: '3D modeling with AI: ', sub: 'From photo, sketch, and CAD to a working model',
        abstract: 'Watch current AI models build editable 3D models from a prompt, a photograph, a hand sketch, or a CAD file, then follow the review that has to happen next: scale, geometry, context, and whether the model is usable downstream.',
        outcomes: ['Identify where AI can start or speed up a model.', 'Distinguish imagery from usable model data.', 'Define checks before a model goes into a deliverable.'] },
      P('2:00–2:15', 15, 'Break'),
      { id: 'S07', t: '2:15–3:00', min: 45, theme: 'responsible', level: 'All levels', lead: DJ, title: 'Responsible practice: ', sub: 'Firm policy, data, and human review',
        abstract: 'Translate responsible AI use into everyday firm decisions: what information can enter a tool, who reviews the output, when use is disclosed, and how teams document accountability. Connect a practical policy framework to realistic work scenarios.',
        outcomes: ['Identify data boundaries.', 'Define review and escalation responsibilities.', 'Outline an acceptable-use policy.'] },
      { id: 'S08', t: '3:00–3:30', min: 30, theme: 'responsible', level: 'All levels', lead: 'Presenter TBD', title: 'AI infrastructure: ', sub: 'Data centers, energy, and growth',
        abstract: 'Examine the physical infrastructure behind AI and the questions it raises for energy demand, water, land use, communities, and growth. Separate measured conditions from estimates and projections, and discuss why comparisons need context.',
        outcomes: ['Interpret the scope of an infrastructure claim.', 'Distinguish forecasts from measured data.', 'Ask better questions about environmental impacts.'] },
      { id: 'S09', t: '3:30–4:00', min: 30, theme: 'building', level: 'Introductory demonstration', lead: 'Daniel Tal', title: 'Coding with AI: ', sub: 'From a useful idea to a tested small tool',
        abstract: 'Show how a non-specialist can describe a useful small tool, work through an AI-assisted draft, and test whether the result does what was intended. Explain what still requires technical review and maintenance.',
        outcomes: ['Turn a problem into a clear brief.', 'Iterate using observable failures.', 'Recognize when code needs expert review.'] },
    ] },
    { label: 'Day 2', num: '02', hours: '9 a.m.–noon', theme: 'Education, specialist applications, and firm adoption', rows: [
      { id: 'S10', t: '9:00–9:45', min: 45, theme: 'adoption', level: 'All levels', lead: 'Kelly Curl', proposedOutcomes: true, title: 'AI in academia: ', sub: 'A Colorado State University case study',
        abstract: 'A case study from a four-week summer field studio where students kept AI at the center of the design process: field research and hand drawing first, AI to generate and test ideas, then final design by hand. Includes a proposed four-year path for AI literacy in a landscape architecture curriculum.',
        outcomes: ['Examine an educational use case.', 'Discuss assessment and authorship.', 'Connect student learning with professional responsibility.'] },
      { id: 'S11', t: '9:45–10:30', min: 45, theme: 'adoption', level: 'To be confirmed', lead: 'Justin Gies', title: 'AI in specialist practice: ', sub: 'Guest presentation',
        abstract: 'A guest session exploring AI through Justin Gies’s specialist work. Topic, examples, and learning outcomes will be confirmed with the presenter.', outcomes: [] },
      P('10:30–10:45', 15, 'Break'),
      { id: 'S12', t: '10:45–11:30', min: 45, theme: 'adoption', level: 'Advanced concepts, explained for a mixed audience', lead: 'Angelo', proposedOutcomes: true, title: 'Advanced AI agents: ', sub: 'Orchestration, supervision, and management',
        abstract: 'Move beyond a single prompt to workflows in which agents perform coordinated tasks. Discuss task delegation, permissions, supervision, checkpoints, and how to evaluate whether an agent workflow is reliable enough for its intended use.',
        outcomes: ['Explain an agent workflow.', 'Identify approval and review points.', 'Recognize operational limits and failure modes.'] },
      { id: 'S13', t: '11:30–noon', min: 30, theme: 'adoption', level: 'Owners, managers, and practice leaders', lead: DJ, title: 'Bringing AI into your firm: ', sub: 'An owner’s implementation roadmap',
        abstract: 'Bring the program together through the decisions a firm owner must make: where to start, who is responsible, what to budget, how to train a team, and how to judge the result. End with a proposed 30-day pilot framework.',
        outcomes: ['Choose a bounded pilot.', 'Define ownership and success measures.', 'Connect adoption to staffing, fees, service quality, and client value.'] },
    ] },
  ];
}());
