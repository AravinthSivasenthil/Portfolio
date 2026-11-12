import { useEffect, useState } from 'react';
import { portfolio } from './siteData';

type IconName = 'arrow' | 'diagonal' | 'download' | 'mail' | 'github' | 'linkedin' | 'menu' | 'close' | 'arrowup' | 'external' | 'check' | 'pin' | 'spark';

function Icon({ name, size = 19, className = '' }: { name: IconName; size?: number; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <><path d="M4 12h16" /><path d="m14 6 6 6-6 6" /></>,
    diagonal: <><path d="M7 17 17 7" /><path d="M8 7h9v9" /></>,
    arrowup: <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>,
    download: <><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M4 17v3h16v-3" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 7 9-7" /></>,
    github: <><path d="M9 19c-4 1-4-2-6-2m12 4v-3.9c0-.8.3-1.4.8-1.9 2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 20 5.8c.1-1-.1-2.1-.6-3-1.1 0-2.2.6-3 1.3a12.2 12.2 0 0 0-8 0c-.8-.7-1.9-1.3-3-1.3-.5.9-.7 2-.6 3A4.7 4.7 0 0 0 3.5 9c0 4.7 2.8 5.7 5.5 6 .5.5.8 1.1.8 1.9V21" /></>,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-7m0 3a3 3 0 0 1 6 0v4" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5 19 19M19 5 5 19" /></>,
    external: <><path d="M14 4h6v6M20 4l-9 9" /><path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    spark: <><path d="m12 2 1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" /><path d="m19 17 .7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7L19 17Z" /></>,
  };
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 45);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const ids = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-25% 0px -58% 0px', threshold: 0 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="shell header-inner">
      <a className="brand" href="#home" aria-label="Aravinth Sivasenthil, back to home" onClick={() => setMenuOpen(false)}>
        <span className="brand-symbol">A<span className="brand-period">.</span></span>
        <span className="brand-name">Aravinth</span>
      </a>
      <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} id="primary-navigation" aria-label="Main navigation">
        {navLinks.map((item) => <a key={item.href} href={item.href} className={`${active === item.href.slice(1) ? 'is-active ' : ''}${item.label === 'Contact' ? 'nav-contact' : ''}`} onClick={() => setMenuOpen(false)}>{item.label}{item.label === 'Contact' && <Icon name="diagonal" size={14}/>}</a>)}
      </nav>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="primary-navigation" aria-expanded={menuOpen} type="button" onClick={() => setMenuOpen(x => !x)}>
        <Icon name={menuOpen ? 'close' : 'menu'} size={23}/>
      </button>
    </div>
  </header>;
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function SectionHeading({ number, eyebrow, title, lead }: { number: string; eyebrow: string; title: string; lead?: string }) {
  return <Reveal className="section-heading">
    <div className="section-kicker"><span>{number}</span><span className="kicker-rule"/><span>{eyebrow}</span></div>
    <h2>{title}</h2>
    {lead && <p>{lead}</p>}
  </Reveal>;
}

function Hero() {
  return <section className="hero" id="home" aria-labelledby="hero-title">
    <div className="hero-art" aria-hidden="true"><img src={asset("/assets/hero-mechanism.svg")} alt="" /></div>
    <div className="hero-soft-light" aria-hidden="true"/>
    <div className="shell hero-inner">
      <div className="hero-content">
        <div className="hero-overline"><span className="overline-line"/> SOFTWARE DEVELOPMENT <span className="overline-dot">/</span> AI TOOLS</div>
        <h1 id="hero-title">Aravinth<br/><span>Sivasenthil</span><span className="title-dot">.</span></h1>
        <p className="hero-description">Computer Science student building thoughtful <strong>full-stack applications</strong> and <strong>AI-powered software tools.</strong></p>
        <div className="availability"><span className="availability-dot"/> <span>Open to opportunities</span> <Icon name="diagonal" size={17}/></div>
        <div className="hero-actions">
          <a className="button button-light" href="#projects">Explore my work <Icon name="diagonal" size={18}/></a>
          <a className="button button-outline" href={asset("/Aravinth_Sivasenthil_Resume.pdf")} download>Download résumé <Icon name="download" size={17}/></a>
        </div>
      </div>
      <div className="hero-bottom"><span className="hero-coordinate">BASED IN ONTARIO, CANADA</span><a href="#about" className="scroll-cue">SCROLL TO EXPLORE <span className="scroll-line"/></a></div>
    </div>
  </section>;
}

function About() {
  return <section className="section about-section" id="about">
    <div className="shell">
      <SectionHeading number="01" eyebrow="INTRODUCTION" title="A little about me." />
      <div className="about-grid">
        <Reveal className="about-main">
          <p className="about-lead">I like building things that are <em>useful, intuitive,</em> and a little ambitious.</p>
          <p>I'm a third-year Computer Science student at Trent University with a focus on full-stack development and practical software engineering. I enjoy taking an idea from its earliest sketch all the way to a working application.</p>
          <p>Recently, I've been building an AI-assisted engineering log analyzer and <strong>StudyFlow</strong>, an academic planning platform. I'm especially interested in AI software systems, developer tooling, and engineering automation.</p>
          <a className="text-link" href="#projects">See what I've built <Icon name="diagonal" size={18}/></a>
        </Reveal>
        <Reveal className="about-side">
          <div className="about-detail"><span>01 / CURRENTLY</span><strong>Building full-stack tools</strong></div>
          <div className="about-detail"><span>02 / STUDYING</span><strong>B.Sc. Computer Science<br/>Trent University</strong></div>
          <div className="about-detail"><span>03 / INTERESTED IN</span><strong>AI Systems · Developer Tools<br/>Engineering Automation</strong></div>
          <div className="about-detail"><span>04 / LOCATION</span><strong><Icon name="pin" size={15}/> Ontario, Canada</strong></div>
        </Reveal>
      </div>
    </div>
  </section>;
}

const skills = [
  { number: '01', title: 'Languages', description: 'The tools I write with.', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'SQL · learning'] },
  { number: '02', title: 'Frontend', description: 'Thoughtful interfaces and experiences.', items: ['React', 'HTML', 'CSS', 'Vite'] },
  { number: '03', title: 'Backend & APIs', description: 'The systems behind the screen.', items: ['Node.js', 'Express', 'REST APIs', 'OpenAI SDK'] },
  { number: '04', title: 'Data & Delivery', description: 'From data models to deployment.', items: ['MongoDB Atlas', 'Schema Design', 'ER Diagrams', 'Vercel', 'Render', 'Unit Testing'] },
];

function Skills() {
  return <section className="section skills-section" id="skills">
    <div className="shell">
      <SectionHeading number="02" eyebrow="CAPABILITIES" title="My toolkit." lead="A mix of languages, frameworks, and tools I use to turn ideas into working software." />
      <div className="skills-grid">
        {skills.map((skill) => <Reveal key={skill.title} className="skill-card">
          <div className="skill-top"><span>{skill.number}</span><Icon name="diagonal" size={19}/></div>
          <h3>{skill.title}</h3><p>{skill.description}</p>
          <div className="skill-tags">{skill.items.map(item => <span key={item}>{item}</span>)}</div>
        </Reveal>)}
      </div>
    </div>
  </section>;
}

function Projects() {
  return <section className="section projects-section" id="projects">
    <div className="shell">
      <SectionHeading number="03" eyebrow="SELECTED WORK" title="Things I've built." lead="Two projects that reflect what I like most: solving real problems with code." />
      <div className="projects-list">
        {portfolio.projects.map(project => <Reveal key={project.id} className={`project-card project-${project.theme}`}>
          <div className="project-main">
            <div className="project-meta"><span>{project.number} / FEATURED PROJECT</span><span className={`project-status ${project.statusType}`}><span className="project-status-dot"/>{project.status}</span></div>
            <span className="project-eyebrow">{project.eyebrow}</span>
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <ul className="project-points">{project.details.map(point => <li key={point}><Icon name="check" size={16}/><span>{point}</span></li>)}</ul>
            <div className="project-tech">{project.technologies.map(t => <span key={t}>{t}</span>)}</div>
            <div className="project-links">
              {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="project-link"><Icon name="github" size={17}/> GitHub <Icon name="diagonal" size={15}/></a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noreferrer" className="project-link"><Icon name="external" size={17}/> Live demo <Icon name="diagonal" size={15}/></a>}
              {!project.github && !project.demo && <span className="project-links-unavailable">PROJECT LINKS TO BE ADDED</span>}
            </div>
          </div>
          <div className="project-visual" aria-label={`${project.name} logo`}>
            <div className="project-visual-grid" aria-hidden="true"/>
            <div className="project-logo-orbit"><img src={asset(project.logo)} alt={`${project.name} official logo`} loading="lazy"/></div>
            <span className="project-visual-caption">{project.name.toUpperCase()} / {project.number}</span>
          </div>
        </Reveal>)}
      </div>
      <Reveal className="project-footnote"><Icon name="spark" size={18}/> More in the works — always learning, always building.</Reveal>
    </div>
  </section>;
}

const jobs = [
  {role: 'Student Summer Worker', company: 'Smurfit Westrock', location: 'Ajax, Ontario', date: 'APR 2025 — AUG 2025', description: 'Supported high-volume production operations while following quality and process requirements. Adapted to changing priorities and responded to feedback in a fast-paced team environment.'},
  {role: "Coach's Assistant", company: 'West Hill Baseball', location: 'Port Union, Scarborough', date: 'JUN 2024 — AUG 2024', description: 'Helped coordinate youth-program activities and communicated with families and teammates to resolve on-site issues and keep activities running smoothly.'},
];

function Experience() {
  return <section className="section experience-section" id="experience"><div className="shell">
    <SectionHeading number="04" eyebrow="MY JOURNEY" title="Experience." lead="The experiences that have shaped how I work, communicate, and solve problems." />
    <div className="timeline">{jobs.map(job => <Reveal className="timeline-entry" key={job.company}><div className="timeline-track"><span className="timeline-node"/></div><div className="timeline-date">{job.date}</div><div className="timeline-card"><div className="timeline-card-header"><div><h3>{job.role}</h3><p className="timeline-company">{job.company}</p></div><Icon name="diagonal" size={21}/></div><p className="timeline-description">{job.description}</p><span className="timeline-location"><Icon name="pin" size={14}/>{job.location}</span></div></Reveal>)}</div>
  </div></section>;
}

function Education() {
  return <section className="section education-section" id="education"><div className="shell">
    <SectionHeading number="05" eyebrow="FOUNDATION" title="Education." />
    <Reveal className="education-card"><div className="education-main"><span className="education-eyebrow">SEPTEMBER 2024 — PRESENT</span><h3>Trent University<span className="heading-period">.</span></h3><p>Bachelor of Science in Computer Science</p><span className="education-caption">Third-year student · Peterborough, Ontario</span></div><div className="education-courses"><span className="courses-label">RELEVANT COURSEWORK</span><div><span>Data Structures</span><span>Discrete Mathematics</span><span>SQL & Database Concepts <small>(In progress)</small></span></div></div></Reveal>
  </div></section>;
}

function Contact() {
  return <section className="section contact-section" id="contact"><div className="shell contact-shell">
    <Reveal className="contact-heading"><span className="section-kicker contact-kicker"><span>06</span><span className="kicker-rule"/><span>GET IN TOUCH</span></span><h2>Let's connect<span className="heading-period">.</span></h2><p>Have an opportunity, a project in mind, or just want to say hello?<br/>My inbox is always open.</p></Reveal>
    <div className="contact-cards">
      <Reveal><a className="email-card" href={`mailto:${portfolio.schoolEmail}`} aria-label={`Send email to school address ${portfolio.schoolEmail}`}><span className="email-icon"><Icon name="mail" size={25}/></span><span className="email-body"><span className="email-label">SCHOOL EMAIL</span><span className="email-address">{portfolio.schoolEmail}</span></span><span className="email-arrow"><Icon name="diagonal" size={22}/></span></a></Reveal>
      <Reveal><a className="email-card" href={`mailto:${portfolio.personalEmail}`} aria-label={`Send email to personal address ${portfolio.personalEmail}`}><span className="email-icon"><Icon name="mail" size={25}/></span><span className="email-body"><span className="email-label">PERSONAL EMAIL</span><span className="email-address">{portfolio.personalEmail}</span></span><span className="email-arrow"><Icon name="diagonal" size={22}/></span></a></Reveal>
    </div>
    <Reveal className="contact-below"><span>LET'S MAKE SOMETHING GREAT.</span><span>AVAILABLE FOR CONVERSATION <span className="little-green-dot"/></span></Reveal>
  </div></section>;
}

function Footer() {
  return <footer className="footer"><div className="shell footer-inner"><div><a href="#home" className="footer-brand">AS<span>.</span></a><span className="copyright">© {new Date().getFullYear()} Aravinth Sivasenthil. Built with intention.</span></div><div className="footer-right">{portfolio.github && <a href={portfolio.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18}/></a>}{portfolio.linkedin && <a href={portfolio.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18}/></a>}<a href="#home" className="back-to-top">Back to top <Icon name="arrowup" size={17}/></a></div></div></footer>;
}

function ProgressBar() {
  useEffect(() => {
    let pending = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? window.scrollY / max * 100 : 0}%`);
      pending = false;
    };
    const onScroll = () => { if (!pending) { pending = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return <div className="scroll-progress" aria-hidden="true"/>;
}

export default function App() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const nodes = Array.from(document.querySelectorAll('.reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return <><ProgressBar/><Header/><main><Hero/><About/><Skills/><Projects/><Experience/><Education/><Contact/></main><Footer/></>;
}
