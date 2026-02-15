// ============================================================
// CENTRALIZED CONTENT STORE
// All static content (not from DB) lives here for easy editing.
// ============================================================

export const SITE = {
    title: 'TMCP Engineering',
    description:
        'Deep dives into AI Agents, DevOps, and modern infrastructure. Built by engineers, for engineers.',
    url: 'https://blog.tmcp.io',
    language: 'en',
    author: 'TMCP Team',
} as const;

export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
] as const;

export const SOCIAL_LINKS = [
    {
        platform: 'github' as const,
        url: 'https://github.com/tmcp',
        label: 'GitHub',
        icon: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z',
    },
    {
        platform: 'twitter' as const,
        url: 'https://x.com/tmcp',
        label: 'X / Twitter',
        icon: 'M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z',
    },
] as const;

export const HERO = {
    headline: 'Engineering the Future with AI Agents & DevOps',
    subheadline:
        'Exploring the intersection of artificial intelligence and developer operations to build scalable, efficient, and intelligent software systems.',
    cta: { label: 'Read the Blog', href: '/blog' },
} as const;

export const TOPICS = [
    {
        title: 'AI Agents',
        description:
            'Autonomous systems that reason, plan, and act. From LLM orchestration to production-ready agent architectures.',
        icon: '🤖',
        color: 'var(--accent-cyan)',
    },
    {
        title: 'DevOps',
        description:
            'CI/CD pipelines, infrastructure as code, and the culture of continuous delivery at scale.',
        icon: '⚙️',
        color: 'var(--accent-violet)',
    },
    {
        title: 'Infrastructure',
        description:
            'Cloud-native architecture, Kubernetes, observability, and building resilient distributed systems.',
        icon: '☁️',
        color: 'var(--accent-blue)',
    },
    {
        title: 'Engineering Culture',
        description:
            'How we build teams, make decisions, and create an environment where great engineering thrives.',
        icon: '🚀',
        color: 'var(--accent-green)',
    },
] as const;

export const ABOUT = {
    title: 'About TMCP Engineering',
    intro:
        'We are a team of engineers passionate about pushing the boundaries of what software can do. Our focus lies at the intersection of AI and DevOps — building intelligent systems that automate, optimize, and scale.',
    sections: [
        {
            title: 'Our Mission',
            content:
                'We believe the future of software engineering is autonomous. AI agents that can reason about infrastructure, deploy code, and respond to incidents — not as science fiction, but as production reality. Our mission is to build these systems and share what we learn along the way.',
        },
        {
            title: 'What We Write About',
            content:
                'This blog is our engineering journal. We write about the real challenges of building AI-powered automation: agent architectures, LLM integration patterns, GitOps workflows, observability at scale, and the DevOps practices that make it all reliable. No fluff — just lessons from the trenches.',
        },
        {
            title: 'Open Source & Community',
            content:
                'We are strong believers in the open-source ecosystem. Many of our tools and frameworks are available on GitHub. We contribute back to the communities that have shaped our engineering culture, and we encourage collaboration from anyone building in the AI + DevOps space.',
        },
    ],
} as const;

export const FOOTER = {
    tagline: 'Building intelligent infrastructure, one commit at a time.',
    copyright: `© ${new Date().getFullYear()} TMCP Engineering. All rights reserved.`,
    links: [
        { label: 'RSS Feed', href: '/rss.xml' },
        { label: 'Sitemap', href: '/sitemap-index.xml' },
    ],
} as const;
