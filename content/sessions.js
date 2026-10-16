/* Published copy. Organizer-only internal notes removed. */
window.CONF = window.CONF || {};
window.CONF.sessions = [
  {
    "id": "opening",
    "day": 1,
    "start": "09:00",
    "end": "09:15",
    "kind": "opening",
    "title": "Welcome: What we want you to leave knowing",
    "speakerIds": [
      "daniel",
      "jenn"
    ],
    "status": "proposed"
  },
  {
    "id": "S01",
    "day": 1,
    "start": "09:15",
    "end": "10:00",
    "kind": "session",
    "title": "AI fundamentals: From LLMs to your first useful prompt",
    "speakerIds": [
      "daniel",
      "jenn"
    ],
    "level": "Beginner",
    "abstract": "A plain-language introduction to large language models and the difference between generating an answer and establishing a fact. Build a simple prompt, improve it with context, and discuss when an answer needs verification or a different tool.",
    "outcomes": [
      "Explain an LLM without technical jargon.",
      "Write a task/context/constraints/output prompt.",
      "Recognize uncertainty and plausible errors."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "llm",
        "label": "What a large language model actually is",
        "speaker": "Daniel Tal and Jenn Becker",
        "length": "1:11"
      }
    ]
  },
  {
    "id": "S02",
    "day": 1,
    "start": "10:00",
    "end": "10:30",
    "kind": "session",
    "title": "Choosing your tools: Chat, deep research, and evidence",
    "speakerIds": [
      "daniel",
      "jenn"
    ],
    "level": "Beginner",
    "abstract": "Compare common AI assistants and research modes through the work they support. Show when a quick conversation is enough, when deeper research is useful, and how to inspect sources rather than accept a confident summary.",
    "outcomes": [
      "Choose a tool for a task.",
      "Distinguish chat from a research workflow.",
      "Inspect citations and source quality."
    ],
    "outcomesStatus": "draft",
    "status": "proposed"
  },
  {
    "id": "S03",
    "day": 1,
    "start": "10:30",
    "end": "11:00",
    "kind": "session",
    "title": "Research, writing, and proposals: From question to reviewed draft",
    "speakerIds": [
      "daniel",
      "jenn"
    ],
    "level": "Beginner to intermediate",
    "abstract": "Follow a practical sequence from a research question and source material to an outline, written draft, and proposal narrative. Show where human editing, evidence checks, and project-specific judgment change the output.",
    "outcomes": [
      "Structure a repeatable writing workflow.",
      "Review claims against sources.",
      "Adapt a draft to a real audience and project."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "scaffolding",
        "label": "AI builds the scaffolding, people make it their own",
        "speaker": "Daniel Tal",
        "length": "0:46"
      }
    ]
  },
  {
    "id": "break-1",
    "day": 1,
    "start": "11:00",
    "end": "11:15",
    "kind": "break",
    "title": "Break",
    "speakerIds": [],
    "status": "proposed"
  },
  {
    "id": "S04",
    "day": 1,
    "start": "11:15",
    "end": "12:00",
    "kind": "session",
    "title": "Generative design, part 1: Image prompting for concepts and renderings",
    "speakerIds": [
      "jenn"
    ],
    "level": "Beginner to intermediate",
    "abstract": "Turn sketches, massing models, Google Earth captures, and draft renderings into client-ready imagery. Build a detailed image prompt with AI, use segmentation to keep design intent, and compare each iteration against what the design actually is.",
    "outcomes": [
      "Write an image prompt that tells the story of the design.",
      "Use AI to draft and refine prompts for an image model.",
      "Separate conceptual imagery from verified project information."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "image-prompts",
        "label": "Use AI to talk to AI: prompting a rendering",
        "speaker": "Jenn Becker",
        "length": "0:58"
      },
      {
        "id": "drone",
        "label": "A drone shot from a Google Earth image",
        "speaker": "Jenn Becker",
        "length": "0:41"
      }
    ]
  },
  {
    "id": "lunch",
    "day": 1,
    "start": "12:00",
    "end": "12:45",
    "kind": "meal",
    "title": "Included lunch and conversation",
    "speakerIds": [],
    "status": "proposed",
    "note": "One included meal; placement proposed"
  },
  {
    "id": "S05",
    "day": 1,
    "start": "12:45",
    "end": "13:15",
    "kind": "session",
    "title": "Generative design, part 2: Video prompting and AI animation",
    "speakerIds": [
      "jenn"
    ],
    "level": "Intermediate",
    "abstract": "Chain a massing model, diagrams, and AI key frames into a short animation. Storyboard the sequence, prompt each transition, and judge where a fast AI animation can stand in for a full rendering pass and where it cannot.",
    "outcomes": [
      "Storyboard an animation from key frames.",
      "Prompt transitions between frames.",
      "Judge an AI animation against design intent and accuracy."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "animation",
        "label": "From massing model to animation in key frames",
        "speaker": "Jenn Becker",
        "length": "0:56"
      }
    ]
  },
  {
    "id": "S06",
    "day": 1,
    "start": "13:15",
    "end": "14:00",
    "kind": "session",
    "title": "3D modeling with AI: From photo, sketch, and CAD to a working model",
    "speakerIds": [
      "daniel"
    ],
    "level": "Intermediate; accessible demonstration",
    "abstract": "Watch current AI models build editable 3D models from a prompt, a photograph, a hand sketch, or a CAD file, then follow the review that has to happen next: scale, geometry, context, and whether the model is usable downstream.",
    "outcomes": [
      "Identify where AI can start or speed up a model.",
      "Distinguish imagery from usable model data.",
      "Define checks before a model goes into a deliverable."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "central-park",
        "label": "Central Park modeled in about 40 minutes",
        "speaker": "Daniel Tal and Jenn Becker",
        "length": "1:03"
      },
      {
        "id": "vase",
        "label": "Image to SketchUp model with a custom tool",
        "speaker": "Daniel Tal",
        "length": "0:54"
      }
    ]
  },
  {
    "id": "break-2",
    "day": 1,
    "start": "14:00",
    "end": "14:15",
    "kind": "break",
    "title": "Break",
    "speakerIds": [],
    "status": "proposed"
  },
  {
    "id": "S07",
    "day": 1,
    "start": "14:15",
    "end": "15:00",
    "kind": "session",
    "title": "Responsible practice: Firm policy, data, and human review",
    "speakerIds": [
      "daniel",
      "jenn"
    ],
    "level": "All levels",
    "abstract": "Translate responsible AI use into everyday firm decisions: what information can enter a tool, who reviews the output, when use is disclosed, and how teams document accountability. Connect a practical policy framework to realistic work scenarios.",
    "outcomes": [
      "Identify data boundaries.",
      "Define review and escalation responsibilities.",
      "Outline an acceptable-use policy."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "liability",
        "label": "If you use AI, the liability is on you",
        "speaker": "Jenn Becker",
        "length": "0:42"
      }
    ]
  },
  {
    "id": "S08",
    "day": 1,
    "start": "15:00",
    "end": "15:30",
    "kind": "session",
    "title": "AI infrastructure: Data centers, energy, and growth",
    "speakerIds": [],
    "level": "All levels",
    "abstract": "Examine the physical infrastructure behind AI and the questions it raises for energy demand, water, land use, communities, and growth. Separate measured conditions from estimates and projections, and discuss why comparisons need context.",
    "outcomes": [
      "Interpret the scope of an infrastructure claim.",
      "Distinguish forecasts from measured data.",
      "Ask better questions about environmental impacts."
    ],
    "outcomesStatus": "draft",
    "status": "proposed"
  },
  {
    "id": "S09",
    "day": 1,
    "start": "15:30",
    "end": "16:00",
    "kind": "session",
    "title": "Coding with AI: From a useful idea to a tested small tool",
    "speakerIds": [
      "daniel"
    ],
    "level": "Introductory demonstration",
    "abstract": "Show how a non-specialist can describe a useful small tool, work through an AI-assisted draft, and test whether the result does what was intended. Explain what still requires technical review and maintenance.",
    "outcomes": [
      "Turn a problem into a clear brief.",
      "Iterate using observable failures.",
      "Recognize when code needs expert review."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "citizen-dev",
        "label": "English is the new coding language",
        "speaker": "Daniel Tal",
        "length": "0:40"
      },
      {
        "id": "terrain",
        "label": "A custom grading tool built by prompting",
        "speaker": "Daniel Tal",
        "length": "0:39"
      }
    ]
  },
  {
    "id": "S10",
    "day": 2,
    "start": "09:00",
    "end": "09:45",
    "kind": "session",
    "title": "AI in academia: A Colorado State University case study",
    "speakerIds": [
      "kelly"
    ],
    "level": "All levels",
    "abstract": "A case study from a four-week summer field studio where students kept AI at the center of the design process: field research and hand drawing first, AI to generate and test ideas, then final design by hand. Includes a proposed four-year path for AI literacy in a landscape architecture curriculum.",
    "outcomes": [
      "Examine an educational use case.",
      "Discuss assessment and authorship.",
      "Connect student learning with professional responsibility."
    ],
    "outcomesStatus": "proposed",
    "status": "proposed",
    "clips": [
      {
        "id": "kelly",
        "label": "Teach students where AI belongs in the design process",
        "speaker": "Kelly Curl",
        "length": "0:47"
      }
    ]
  },
  {
    "id": "S11",
    "day": 2,
    "start": "09:45",
    "end": "10:30",
    "kind": "session",
    "title": "AI in specialist practice: Guest presentation",
    "speakerIds": [
      "justin"
    ],
    "level": "To be confirmed",
    "abstract": "A guest session exploring AI through Justin Gies’s specialist work. Topic, examples, and learning outcomes will be confirmed with the presenter.",
    "outcomes": [],
    "outcomesStatus": "draft",
    "status": "proposed"
  },
  {
    "id": "break-3",
    "day": 2,
    "start": "10:30",
    "end": "10:45",
    "kind": "break",
    "title": "Break",
    "speakerIds": [],
    "status": "proposed"
  },
  {
    "id": "S12",
    "day": 2,
    "start": "10:45",
    "end": "11:30",
    "kind": "session",
    "title": "Advanced AI agents: Orchestration, supervision, and management",
    "speakerIds": [
      "angelo"
    ],
    "level": "Advanced concepts, explained for a mixed audience",
    "abstract": "Move beyond a single prompt to workflows in which agents perform coordinated tasks. Discuss task delegation, permissions, supervision, checkpoints, and how to evaluate whether an agent workflow is reliable enough for its intended use.",
    "outcomes": [
      "Explain an agent workflow.",
      "Identify approval and review points.",
      "Recognize operational limits and failure modes."
    ],
    "outcomesStatus": "proposed",
    "status": "proposed"
  },
  {
    "id": "S13",
    "day": 2,
    "start": "11:30",
    "end": "12:00",
    "kind": "session",
    "title": "Bringing AI into your firm: An owner’s implementation roadmap",
    "speakerIds": [
      "daniel",
      "jenn"
    ],
    "level": "Owners, managers, and practice leaders",
    "abstract": "Bring the program together through the decisions a firm owner must make: where to start, who is responsible, what to budget, how to train a team, and how to judge the result. End with a proposed 30-day pilot framework.",
    "outcomes": [
      "Choose a bounded pilot.",
      "Define ownership and success measures.",
      "Connect adoption to staffing, fees, service quality, and client value."
    ],
    "outcomesStatus": "draft",
    "status": "proposed",
    "clips": [
      {
        "id": "roadmap",
        "label": "Find your person, and don't expect a return yet",
        "speaker": "Daniel Tal",
        "length": "0:40"
      }
    ]
  }
];
