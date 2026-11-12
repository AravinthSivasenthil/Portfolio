/** Edit your site content and optional external links here. */
export const portfolio = {
  name: 'Aravinth Sivasenthil',
  role: 'Computer Science Student & Full-Stack Developer',
  personalEmail: 'aravinthsivasenthil@gmail.com',
  schoolEmail: 'aravinthsivasenthil@trentu.ca',
  // Add full https:// URLs when you are ready. Missing links are hidden, not replaced by fake links.
  github: 'https://github.com/AravinthSivasenthil',
  linkedin: '',
  projects: [
    {
      id: 'studyflow',
      number: '01',
      name: 'StudyFlow',
      eyebrow: 'ACADEMIC PRODUCTIVITY PLATFORM',
      status: 'In development',
      statusType: 'building',
      logo: '/assets/studyflow-logo.webp',
      description:
        'A full-stack academic companion built to organize course records, deadlines, and long-term academic progress — all in one place.',
      details: [
        'Multi-semester GPA and weighted-grade calculations',
        'Course records, deadlines, and trend projections',
        'MongoDB Atlas schemas for course and grade data',
      ],
      technologies: ['TypeScript', 'Python', 'MongoDB Atlas', 'Vercel', 'Render'],
      github: '',
      demo: '',
      theme: 'blue',
    },
    {
      id: 'ai-log-analyzer',
      number: '02',
      name: 'AI Test Log Analyzer',
      eyebrow: 'AI-ASSISTED ENGINEERING TOOL',
      status: 'Completed',
      statusType: 'completed',
      logo: '/assets/ai-log-analyzer-logo.webp',
      description:
        'An AI-assisted tool that turns simulated engineering test logs into clear pass/fail/warning counts and actionable troubleshooting summaries.',
      details: [
        'Precise PASS, FAIL, and WARN counts',
        'Express REST API and OpenAI SDK integration',
        'Input validation, no-key demo mode, and three passing unit tests',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'OpenAI SDK'],
      github: '',
      demo: '',
      theme: 'dark',
    },
  ],
};
