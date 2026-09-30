"use client";

import { siteUrl, sitePath, SITE_UPDATED_AT } from "@/lib/site";

import { useEffect, useState } from "react";
import { MediumRssWidget } from "@/components/MediumRssWidget";
import { FooterLocationMap } from "@/components/FooterLocationMap";

const serviceUrl = "https://vyapai.in/";
const labsUrl = "https://sudarshan-ai-labs-lucknow.sheevumgoel.chatgpt.site/";
const linkedinUrl = "https://www.linkedin.com/in/sheevumgoel";
const founderUrl = "https://sheevum-goel-about.netlify.app/";
const mediumUrl = "https://medium.com/@sheevumgoel";

const mediumArticles = [
  {
    title: "Best Digital Marketing Agency in Lucknow: Building Visibility Beyond Google",
    date: "24 August 2026",
    topic: "Local growth",
    summary: "Why Lucknow businesses need a connected presence across Search, Maps, social media and AI-powered discovery—not another set of disconnected accounts.",
    url: "https://sheevumgoel.medium.com/best-digital-marketing-agency-in-lucknow-building-visibility-beyond-google-8aa13d74396c",
  },
  {
    title: "The AI Advantage Isn’t Speed. It’s Better Questions.",
    date: "17 August 2026",
    topic: "AI strategy",
    summary: "A practical reframing of AI: the real advantage comes from sharper questions, clearer judgement and better-defined business problems.",
    url: "https://sheevumgoel.medium.com/the-ai-advantage-isnt-speed-it-s-better-questions-90e0b51fc229",
  },
  {
    title: "Best Digital Marketing Services in Lucknow – Grow Your Business with Sudarshan AI Labs",
    date: "16 August 2026",
    topic: "Digital marketing",
    summary: "A guide for local businesses comparing SEO, local search, social media, websites, lead generation and automation services in Lucknow.",
    url: "https://sheevumgoel.medium.com/best-digital-marketing-services-in-lucknow-grow-your-business-with-sudarshan-ai-labs-11ab70dd533c",
  },
  {
    title: "Introducing Selfie for Sign-In: How to Use Google’s New Selfie Video to Recover Your Account",
    date: "24 July 2026",
    topic: "Digital security",
    summary: "A step-by-step explainer on Google’s selfie-video recovery option, including setup, liveness checks, privacy considerations and practical safeguards.",
    url: "https://sheevumgoel.medium.com/introducing-selfie-for-sign-in-how-to-use-googles-new-selfie-video-to-recover-your-account-0faa02705b76",
  },
  {
    title: "Best Digital Marketing Agency in Lucknow for MSMEs: Why Sudarshan AI Labs Leads the Game",
    date: "13 July 2026",
    topic: "MSME growth",
    summary: "An MSME-focused look at how local visibility, useful content and measurable digital systems can turn online attention into real enquiries.",
    url: "https://sheevumgoel.medium.com/best-digital-marketing-agency-in-lucknow-for-msmes-why-sudarshan-ai-labs-leads-the-game-1f72c50c6d7f",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Lucknow's AI Growth Story: From Search Signals to Smarter MSMEs",
  description: "An expert-led, source-checked field guide to AI digital marketing, local SEO and practical growth systems for Lucknow MSMEs.",
  datePublished: "2026-08-21",
  dateModified: SITE_UPDATED_AT,
  mainEntityOfPage: siteUrl("/"),
  url: siteUrl("/"),
  image: siteUrl("/og.png"),
  inLanguage: "en-IN",
  author: {
    "@type": "Person",
    name: "Sheevum Goel",
    url: founderUrl,
    sameAs: [linkedinUrl],
    jobTitle: "Founder and AI Growth Strategist",
    worksFor: { "@type": "Organization", name: "Sudarshan AI Labs", url: labsUrl },
  },
  publisher: { "@type": "Organization", name: "Sudarshan AI Labs", url: labsUrl },
  about: ["AI digital marketing", "local SEO", "Lucknow MSMEs", "Google Trends"],
};

const mediumListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Latest articles by Sheevum Goel on Medium",
  numberOfItems: mediumArticles.length,
  itemListElement: mediumArticles.map((article, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: article.url,
    name: article.title,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should a Lucknow MSME do first in digital marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with accurate local information, a focused mobile landing page, authentic proof and dependable enquiry follow-up before expanding advertising.",
      },
    },
    {
      "@type": "Question",
      name: "Does Google Trends show exact search volume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Google Trends shows normalized relative interest for the selected time and geography. Use it for direction and wording, then validate with first-party business data and keyword tools.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI automate all digital marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI can assist repetitive research, adaptation, routing and reporting, but truthful offers, strategic judgement and sensitive customer conversations need accountable human review.",
      },
    },
  ],
};

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [shareText, setShareText] = useState("SHARE STORY");

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  async function shareStory() {
    const payload = {
      title: "Lucknow AI Growth Storybook by Sheevum Goel",
      text: "An expert-led comic field guide to AI digital marketing and Lucknow MSME growth.",
      url: window.location.href,
    };
    try {
      if (navigator.share) await navigator.share(payload);
      else {
        await navigator.clipboard.writeText(window.location.href);
        setShareText("LINK COPIED!");
        window.setTimeout(() => setShareText("SHARE STORY"), 1800);
      }
    } catch {
      setShareText("SHARE STORY");
    }
  }

  return (
    <main id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mediumListSchema) }} />
      <div className="ink-progress" style={{ width: `${progress}%` }} aria-hidden="true" />

      <nav className="comic-nav" aria-label="Primary navigation">
        <a className="comic-brand" href="#top"><span>S</span><span className="brand-copy"><b>SUDARSHAN AI LABS</b><small>STORYBOOK</small></span></a>
        <div className="comic-links">
          <a href="#city">01 · Context</a>
          <a href="#signals">02 · Signals</a>
          <a href="#playbook">03 · Playbook</a>
          <a href={sitePath("/blogs/")}>05 · Blogs &amp; Articles</a>
          <a className="nav-pop" href={serviceUrl} target="_blank" rel="noreferrer">LET&apos;S GROW ↗</a>
        </div>
      </nav>
      <nav className="mobile-index" aria-label="Mobile story sections">
        <a href="#city">Context</a><a href="#signals">Signals</a><a href="#playbook">Playbook</a><a href="#roadmap">90 days</a><a href={sitePath("/blogs/")}>Blogs &amp; Articles</a><a href="#trust">Trust</a>
      </nav>

      <header className="comic-hero">
        <div className="burst-lines" aria-hidden="true" />
        <div className="hero-copy">
          <div className="issue-line"><span>FIELD NOTES · ISSUE 01</span><b>LUCKNOW / 2026</b></div>
          <h1>
            LUCKNOW&apos;S<br />
            <span>AI GROWTH</span><br />
            JOURNEY
          </h1>
          <p className="hero-subtitle">From search signals to smarter MSMEs — an expert-led digital marketing field guide.</p>
          <div className="hero-stickers" aria-label="Trust signals">
            <span>EXPERT-LED</span><span>SOURCE-CHECKED</span><span>LOCAL-FIRST</span>
          </div>
          <div className="hero-actions">
            <a className="pop-button cyan" href="#city">START THE STORY <b>↓</b></a>
            <a className="pop-button cream" href={serviceUrl} target="_blank" rel="noreferrer">FREE CONSULTATION ↗</a>
          </div>
        </div>

        <figure className="hero-panel">
          <span className="panel-label">COVER STORY</span>
          <img src={sitePath("/storyboard/ai-creativity.webp")} alt="Comic artwork of an Indian AI creator using digital branding and content tools" fetchPriority="high" decoding="async" />
          <figcaption>Creative direction: human judgement + AI-assisted execution.</figcaption>
          <i className="tape tape-a" /><i className="tape tape-b" />
        </figure>

        <div className="sound-effect effect-one">WHOOSH!</div>
        <div className="sound-effect effect-two">IDEA → IMPACT</div>
      </header>

      <section className="trust-strip" aria-label="Article authorship and review information">
        <div className="author-avatar">SG</div>
        <div><small>WRITTEN & REVIEWED BY</small><h2>Sheevum Goel</h2><p>Founder, Sudarshan AI Labs · AI trainer & local growth strategist</p></div>
        <div className="trust-meta"><span><b>Experience</b> Lucknow MSME-first lens</span><span><b>Method</b> Trends + official guidance</span><span><b>Updated</b> 29 August 2026</span></div>
        <a className="content-cta compact-cta" href={founderUrl} target="_blank" rel="noreferrer"><span>Meet the expert</span><b>View author profile</b><i>↗</i></a>
      </section>

      <section className="scene scene-city" id="city">
        <div className="scene-heading">
          <span>SCENE 01</span>
          <h2>THE CITY IS<br /><em>CHANGING.</em></h2>
          <p>Lucknow&apos;s AI ambition is real — but the careful version of the story matters.</p>
        </div>

        <div className="panel-grid city-grid">
          <figure className="story-panel city-art reveal">
            <div className="panel-top"><span>CONCEPT ART</span><b>NOT A PROJECT RENDER</b></div>
            <img src={sitePath("/storyboard/ai-city-concept.webp")} alt="Comic concept artwork imagining Lucknow as a future AI hub" loading="lazy" decoding="async" />
          </figure>
          <article className="story-panel text-panel yellow reveal">
            <span className="speech-tail" />
            <small>FACT-CHECK FRAME</small>
            <h3>PROPOSAL ≠ COMPLETION</h3>
            <p>
              Official Uttar Pradesh sources show an AI City process for Lucknow, including an Expression of Interest in
              July 2025 and an RFP for selecting a joint-venture partner dated 19 March 2026. Separate Invest UP reporting
              records discussions with Tata leadership. The accurate wording is <b>proposed and under development
              process</b>, not a finished Tata-built city.
            </p>
            <a className="content-cta" href="https://uplc.up.gov.in/en/article/ai-city" target="_blank" rel="noreferrer"><span>Verify the claim</span><b>Explore the official AI City records</b><i>↗</i></a>
          </article>
          <article className="story-panel text-panel white reveal">
            <small>WHY THIS MATTERS TO AN MSME</small>
            <h3>AI FEELS LOCAL NOW.</h3>
            <p>
              Public investment signals do not create customers by themselves. They do change the conversation.
              Lucknow founders, retailers, clinics, coaching institutes and service businesses are asking how AI can
              reduce repetitive work, improve visibility and help teams respond faster.
            </p>
            <p>
              The practical opportunity is not to label every activity “AI-powered.” It is to connect trustworthy local
              information, useful content, measurable campaigns and responsible automation into one customer journey.
            </p>
          </article>
          <div className="story-panel stat-burst reveal" aria-label="Key editorial takeaway">
            <span>THE<br />REAL<br />SHIFT</span>
            <p>FROM<br /><b>AI HYPE</b><br />TO<br /><b>AI UTILITY</b></p>
          </div>
        </div>

        <div className="scene-footer">
          <a href="#signals">NEXT: WHAT PEOPLE ARE SEARCHING FOR <span>→</span></a>
          <b>01 / 06</b>
        </div>
      </section>

      <section className="scene scene-signals" id="signals">
        <div className="scene-heading split-title">
          <div><span>SCENE 02</span><h2>FOLLOW THE<br /><em>SEARCH TRAIL.</em></h2></div>
          <div className="scene-intro-card">
            <small>THE EVIDENCE RULE</small>
            <p>Google Trends reveals relative momentum, not guaranteed demand. Read the pattern, check the context, then validate it with calls, forms, sales notes and Search Console.</p>
          </div>
        </div>

        <div className="search-stats">
          <article className="pop-stat teal reveal"><small>RISING QUERY</small><strong>+150%</strong><p>business intelligence tools</p><span>Direction, not search volume</span></article>
          <article className="pop-stat purple reveal"><small>RISING QUERY</small><strong>+250%</strong><p>best small business accounts…</p><span>Captured wording is truncated</span></article>
          <article className="pop-stat orange reveal"><small>TOP QUERY</small><strong>+4%</strong><p>digital marketing agency</p><span>Modest period-on-period lift</span></article>
        </div>

        <div className="signal-layout">
          <article className="story-panel signal-copy reveal">
            <small>EXPERT INTERPRETATION</small>
            <h3>SPECIFIC INTENT BEATS GENERIC TRAFFIC.</h3>
            <p>
              The attached India view places “digital marketing agency” alongside educational and employment phrases.
              That means a service provider should not treat every visitor as ready to buy. Build separate journeys:
              explanatory content for a learner, comparison content for an evaluator, and a focused service page for a
              local buyer.
            </p>
            <p>
              The rising business-intelligence query matters because it hints at a decision problem. Owners want to know
              what is working, which leads are valuable and where time is being lost. A strong AI digital marketing system
              therefore includes reporting and workflow design, not just content production.
            </p>
            <a className="content-cta light-cta" href="https://support.google.com/trends/answer/4365533?hl=en" target="_blank" rel="noreferrer"><span>Read the methodology</span><b>Understand Google Trends data</b><i>↗</i></a>
          </article>
          <figure className="story-panel evidence-hero reveal">
            <span className="evidence-tag">ORIGINAL EVIDENCE</span>
            <img src={sitePath("/trends/01-1000776056.jpg")} alt="Google Trends related searches for digital marketing in India over the past three months" loading="lazy" decoding="async" />
            <figcaption>India · Past 3 months · Web Search. Screenshot supplied for this article.</figcaption>
          </figure>
        </div>

        <section className="contact-sheet reveal" aria-label="Google Trends evidence gallery">
          <div className="sheet-heading"><span>CONTACT SHEET</span><h3>FIVE SNAPSHOTS. ONE CAUTIOUS STORY.</h3><p>Swipe horizontally on mobile.</p></div>
          <div className="sheet-scroll">
            <figure><span>FRAME A</span><img src={sitePath("/trends/01-1000776056.jpg")} alt="Digital marketing top queries in India" loading="lazy" decoding="async" /><figcaption>Agency intent appears inside a mixed learning-and-hiring cluster.</figcaption></figure>
            <figure><span>FRAME B</span><img src={sitePath("/trends/03-1000776055.jpg")} alt="Rising business queries in India" loading="lazy" decoding="async" /><figcaption>Business intelligence and WhatsApp-related activity point toward operational needs.</figcaption></figure>
            <figure><span>FRAME C</span><img src={sitePath("/trends/04-1000776050.jpg")} alt="Social media marketing related queries in India" loading="lazy" decoding="async" /><figcaption>Strategy, services, SEO, management and email form a connected discovery path.</figcaption></figure>
            <figure><span>FRAME D</span><img src={sitePath("/trends/05-1000776051.jpg")} alt="Additional social media marketing queries in India" loading="lazy" decoding="async" /><figcaption>Near-me, agency and company terms deserve strong local service pages.</figcaption></figure>
            <figure><span>FRAME E</span><img src={sitePath("/trends/02-1000776062.jpg")} alt="Trending Now searches in India" loading="lazy" decoding="async" /><figcaption>Fast national spikes are useful only when the topic genuinely fits the brand.</figcaption></figure>
          </div>
        </section>

        <div className="scene-footer">
          <a href="#playbook">NEXT: BUILD THE GROWTH ENGINE <span>→</span></a>
          <b>02 / 06</b>
        </div>
      </section>

      <section className="scene scene-playbook" id="playbook">
        <div className="scene-heading">
          <span>SCENE 03</span>
          <h2>SIX MOVES.<br /><em>ONE JOURNEY.</em></h2>
          <p>Think of digital marketing as connected storyboard frames: discovery, trust, action and follow-up.</p>
        </div>

        <div className="services-layout">
          <figure className="story-panel services-art reveal">
            <div className="panel-top"><span>SERVICE MAP</span><b>SUDARSHAN AI LABS</b></div>
            <img src={sitePath("/blog-visuals/startup-team-collaboration.png")} alt="Illustrated Sudarshan AI Labs creative about team collaboration for startups that scale" loading="lazy" decoding="async" />
            <figcaption>Visual field note: smarter teams, faster growth and bigger business impact.</figcaption>
          </figure>
          <div className="service-notes">
            <article className="service-note teal reveal"><b>01</b><h3>GET FOUND</h3><p>Accurate Google Business Profile, useful service pages, local context and consistent contact information.</p></article>
            <article className="service-note blue reveal"><b>02</b><h3>BUILD TRUST</h3><p>Mobile-first pages, clear offers, authentic photos, FAQs, founder perspective and honest proof.</p></article>
            <article className="service-note purple reveal"><b>03</b><h3>CREATE DEMAND</h3><p>Answer real questions through search-led guides, short video, carousels and local posts.</p></article>
            <article className="service-note orange reveal"><b>04</b><h3>CAPTURE INTENT</h3><p>Make calls, forms and WhatsApp actions obvious; label each lead by service, locality and urgency.</p></article>
            <article className="service-note green reveal"><b>05</b><h3>FOLLOW UP</h3><p>Use responsible reminders and reusable answers while preserving fast access to a real person.</p></article>
            <article className="service-note pink reveal"><b>06</b><h3>LEARN & IMPROVE</h3><p>Review qualified leads, response time, close rate, revenue and the language customers actually use.</p></article>
          </div>
        </div>

        <div className="ads-story">
          <figure className="story-panel ads-art reveal">
            <span className="concept-stamp">ILLUSTRATIVE CONCEPT</span>
            <img src={sitePath("/storyboard/google-ads-concept.webp")} alt="Comic concept artwork about Google Ads, AI-assisted search and Performance Max" loading="lazy" decoding="async" />
            <figcaption>Creative percentages and budget allocations shown in this artwork are fictional examples, not benchmarks or promises.</figcaption>
          </figure>
          <article className="story-panel text-panel white reveal">
            <small>PAID MEDIA REALITY CHECK</small>
            <h3>AUTOMATION NEEDS A CLEAN GOAL.</h3>
            <p>
              Google describes Performance Max as a goal-based campaign type that can access inventory across Search,
              YouTube, Display, Discover, Gmail and Maps. It uses Google AI for bidding, targeting, creative and
              attribution. That does not mean every business should start there or that a platform will deliver a fixed
              channel split.
            </p>
            <p>
              Before increasing spend, define the conversion, confirm tracking, prepare suitable creative and decide what
              makes an enquiry qualified. A low-cost lead that never becomes a customer is not a growth result.
            </p>
            <a className="content-cta" href="https://support.google.com/google-ads/answer/10724817?hl=en" target="_blank" rel="noreferrer"><span>Plan before you spend</span><b>Review Performance Max guidance</b><i>↗</i></a>
          </article>
        </div>

        <div className="scene-footer">
          <a href="#roadmap">NEXT: THE 90-DAY STORYBOARD <span>→</span></a>
          <b>03 / 06</b>
        </div>
      </section>

      <section className="scene scene-roadmap" id="roadmap">
        <div className="scene-heading split-title">
          <div><span>SCENE 04</span><h2>PLAN THE<br /><em>NEXT 90 DAYS.</em></h2></div>
          <div className="speech-card"><b>“</b><p>Do not automate the confusion. Fix the journey, then automate what repeats.</p></div>
        </div>

        <div className="roadmap-strip">
          <article className="road-card reveal"><span>ACT I</span><small>DAYS 1–30</small><h3>FOUNDATION</h3><ul><li>Audit Google Business Profile and website accuracy.</li><li>Choose three priority services and local audiences.</li><li>Create one focused conversion page.</li><li>Track calls, forms and WhatsApp enquiries.</li></ul></article>
          <article className="road-card reveal"><span>ACT II</span><small>DAYS 31–60</small><h3>DEMAND</h3><ul><li>Group customer questions into content themes.</li><li>Publish one deep guide and repurpose it by channel.</li><li>Add authentic photos, FAQs and service proof.</li><li>Test one campaign against a clear conversion goal.</li></ul></article>
          <article className="road-card reveal"><span>ACT III</span><small>DAYS 61–90</small><h3>SYSTEM</h3><ul><li>Label leads by service, location and urgency.</li><li>Add reminders without blocking human support.</li><li>Review cost, quality, response and close rate.</li><li>Scale only what creates measurable value.</li></ul></article>
        </div>

        <div className="automation-layout">
          <article className="story-panel text-panel yellow reveal">
            <small>RESPONSIBLE AUTOMATION</small>
            <h3>REMOVE BUSYWORK. KEEP ACCOUNTABILITY.</h3>
            <p>
              AI can assist with research summaries, content adaptation, lead routing, response drafts and weekly
              reporting. It should not invent customer promises, publish sensitive claims without review or hide the way
              a customer can reach a person.
            </p>
            <p>
              Start with the repetitive action that consumes time without requiring judgement: lead logging, appointment
              reminders, review requests or report assembly. Document the process, test edge cases, assign an owner and
              provide a manual fallback.
            </p>
            <a className="content-cta" href={labsUrl} target="_blank" rel="noreferrer"><span>From idea to implementation</span><b>Explore Sudarshan AI Labs</b><i>↗</i></a>
          </article>
          <figure className="story-panel automation-art reveal">
            <img src={sitePath("/blog-visuals/instruct-your-ai-app.png")} alt="Illustrated guide cover asking how to properly instruct an AI application" loading="lazy" decoding="async" />
            <figcaption>Visual field note: useful automation begins with a clear instruction, a defined outcome and human review.</figcaption>
          </figure>
        </div>

        <section className="scoreboard reveal">
          <div><small>WEEKLY SCOREBOARD</small><h3>MEASURE THE JOURNEY — NOT JUST THE APPLAUSE.</h3></div>
          <ol>
            <li><span>01</span><p><b>VISIBILITY</b>Search appearance, Maps discovery and qualified profile actions</p></li>
            <li><span>02</span><p><b>INTENT</b>Relevant calls, messages, forms and consultation bookings</p></li>
            <li><span>03</span><p><b>QUALITY</b>Fit, urgency, sales acceptance and response time</p></li>
            <li><span>04</span><p><b>VALUE</b>Closed work, revenue, payback and retention</p></li>
          </ol>
        </section>

        <div className="scene-footer">
          <a href="#medium">NEXT: READ THE LATEST FIELD NOTES <span>→</span></a>
          <b>04 / 06</b>
        </div>
      </section>

      <section className="scene scene-medium" id="medium">
        <div className="scene-heading split-title">
          <div><span>SCENE 05</span><h2>FIVE FRESH<br /><em>FIELD NOTES.</em></h2></div>
          <div className="scene-intro-card medium-intro">
            <small>FROM SHEEVUM&apos;S MEDIUM</small>
            <p>The five newest published stories, selected directly from the author feed and arranged from most recent to oldest.</p>
          </div>
        </div>

        <MediumRssWidget fallbackArticles={mediumArticles} profileUrl={mediumUrl} />

        <div className="editorial-visual reveal">
          <figure>
            <span>FEATURED VISUAL ESSAY</span>
            <img src={sitePath("/blog-visuals/ai-team-synergy.png")} alt="Comic-style network diagram showing diverse teams connected through AI" loading="lazy" decoding="async" />
          </figure>
          <article>
            <small>AI + PEOPLE + ALIGNMENT</small>
            <h3>SYNERGIZING INTELLIGENCE.</h3>
            <p>AI creates better results when people, responsibilities and decisions are connected. This visual story turns team alignment, network optimisation and practical AI integration into one readable frame.</p>
            <a className="content-cta" href="https://sheevumgoel.medium.com/the-ai-advantage-isnt-speed-it-s-better-questions-90e0b51fc229" target="_blank" rel="noreferrer"><span>Continue the idea</span><b>Read: The AI Advantage</b><i>↗</i></a>
          </article>
        </div>

        <div className="scene-footer">
          <a href="#trust">NEXT: WHY YOU CAN TRUST THIS GUIDE <span>→</span></a>
          <b>05 / 06</b>
        </div>
      </section>

      <section className="scene scene-trust" id="trust">
        <div className="scene-heading">
          <span>SCENE 06</span>
          <h2>THE TRUST<br /><em>FRAME.</em></h2>
          <p>E-E-A-T is not a decorative badge. It is clear authorship, relevant experience, verifiable sources and honest limits.</p>
        </div>

        <div className="eeat-grid">
          <article className="eeat-card yellow reveal"><span>E</span><small>EXPERIENCE</small><h3>LOCAL OPERATING LENS</h3><p>The guide is written for the realities of Lucknow MSMEs: limited time, mixed Hindi-English discovery, WhatsApp-led enquiries and the need for practical handover.</p></article>
          <article className="eeat-card cyan reveal"><span>E</span><small>EXPERTISE</small><h3>METHOD OVER HYPE</h3><p>It distinguishes relative trend signals from volume, separates platform capability from business readiness and explains where accountable human review remains essential.</p></article>
          <article className="eeat-card purple reveal"><span>A</span><small>AUTHORITATIVENESS</small><h3>PRIMARY SOURCES</h3><p>Key statements link to Google documentation and official Uttar Pradesh AI City materials instead of depending on promotional summaries.</p></article>
          <article className="eeat-card pink reveal"><span>T</span><small>TRUST</small><h3>VISIBLE CAVEATS</h3><p>Concept images are labelled, fictional percentages are not presented as results, and proposals are described as proposals until official implementation changes.</p></article>
        </div>

        <div className="author-story">
          <figure className="story-panel network-art reveal">
            <img src={sitePath("/blog-visuals/local-business-networking.png")} alt="Illustrated Sudarshan AI Labs creative about local business networking and collaborative growth" loading="lazy" decoding="async" />
            <figcaption>Visual field note: trusted local connections can unlock referrals, shared resources and stronger growth.</figcaption>
          </figure>
          <article className="story-panel author-panel reveal">
            <div className="author-avatar large">SG</div>
            <small>ABOUT THE AUTHOR</small>
            <h3>SHEEVUM GOEL</h3>
            <p>
              Sheevum Goel is the founder of Sudarshan AI Labs, an AI trainer and a digital growth strategist based in
              Lucknow. His work focuses on helping MSMEs translate websites, local search, content and automation into
              systems that owners can understand and eventually operate.
            </p>
            <p>
              This article combines the supplied Google Trends captures with official product documentation and a local
              implementation lens. It is educational content, not a promise of rankings, leads or financial performance.
            </p>
            <div className="author-links"><a className="content-cta" href={founderUrl} target="_blank" rel="noreferrer"><span>Founder story</span><b>View full profile</b><i>↗</i></a><a className="content-cta purple-cta" href={linkedinUrl} target="_blank" rel="noreferrer"><span>Connect professionally</span><b>Visit LinkedIn</b><i>↗</i></a></div>
          </article>
        </div>

        <section className="faq-board reveal">
          <div><small>READER QUESTIONS</small><h3>QUICK ANSWERS</h3></div>
          <div>
            <details open><summary>What should a Lucknow MSME do first?</summary><p>Correct local information, build one focused mobile page, add authentic proof and create a dependable response process before buying more traffic.</p></details>
            <details><summary>Does Google Trends show exact search volume?</summary><p>No. It shows normalized relative interest for the selected time and geography. Use it to find direction and language, then validate with business data and keyword tools.</p></details>
            <details><summary>Can AI automate the whole marketing function?</summary><p>No. AI can accelerate repetitive research, adaptation, routing and reporting, but truthful offers, strategic judgement and sensitive customer conversations need human accountability.</p></details>
            <details><summary>Should every small business use Performance Max?</summary><p>No. It requires a suitable goal, sound tracking, appropriate creative and enough conversion data. The right campaign type depends on the business and its readiness.</p></details>
          </div>
        </section>

        <section className="source-board reveal">
          <div><small>SOURCE LEDGER</small><h3>CHECK THE EVIDENCE</h3><p>Last editorial review: 29 August 2026. Corrections can be requested through the author profile.</p></div>
          <div className="source-list">
            <a href="https://uplc.up.gov.in/en/article/ai-city" target="_blank" rel="noreferrer"><b>UPLC</b><span>AI City EOI & RFP records</span><i>↗</i></a>
            <a href="https://support.google.com/trends/answer/4365533?hl=en" target="_blank" rel="noreferrer"><b>GOOGLE TRENDS</b><span>Normalization & data caveats</span><i>↗</i></a>
            <a href="https://support.google.com/trends/answer/4355000?hl=en" target="_blank" rel="noreferrer"><b>GOOGLE TRENDS</b><span>Related & rising searches</span><i>↗</i></a>
            <a href="https://support.google.com/business/answer/7091?hl=en" target="_blank" rel="noreferrer"><b>BUSINESS PROFILE</b><span>Local ranking guidance</span><i>↗</i></a>
            <a href="https://support.google.com/google-ads/answer/10724817?hl=en" target="_blank" rel="noreferrer"><b>GOOGLE ADS</b><span>Performance Max overview</span><i>↗</i></a>
            <a href="https://support.google.com/merchants/answer/14615117?hl=en" target="_blank" rel="noreferrer"><b>MERCHANT CENTER</b><span>Local inventory listings</span><i>↗</i></a>
          </div>
        </section>

        <section className="finale reveal">
          <span className="finale-kicker">THE NEXT PANEL IS YOURS.</span>
          <h2>READY TO TURN<br />VISIBILITY INTO <em>GROWTH?</em></h2>
          <p>Build a clear, measurable digital growth system for your Lucknow business — with human judgement at the centre.</p>
          <div className="finale-actions">
            <a className="pop-button cyan" href={serviceUrl} target="_blank" rel="noreferrer">BOOK A FREE CONSULTATION ↗</a>
            <a className="pop-button cream" href={labsUrl} target="_blank" rel="noreferrer">EXPLORE SUDARSHAN AI LABS</a>
            <a className="pop-button purple-button" href={linkedinUrl} target="_blank" rel="noreferrer">CONNECT ON LINKEDIN</a>
          </div>
          <button type="button" onClick={shareStory}>{shareText} ↗</button>
        </section>

        <div className="scene-footer">
          <a href="#top">BACK TO THE COVER <span>↑</span></a>
          <b>06 / 06</b>
        </div>
      </section>

      <footer className="comic-footer">
        <FooterLocationMap />
        <div className="footer-brand-block">
          <a className="comic-brand" href="#top"><span>S</span><span className="brand-copy"><b>SUDARSHAN AI LABS</b><small>DIGITAL GROWTH STORYBOOK</small></span></a>
          <p>AI-powered digital growth insights for Indian MSMEs, created in Lucknow.</p>
        </div>
        <div className="footer-cta-panel">
          <div className="footer-cta-heading"><small>CHOOSE YOUR NEXT MOVE</small><h2>EXPLORE. CONNECT. GROW.</h2></div>
          <div className="footer-cta-grid">
            <a href="https://vyapai.in/" target="_blank" rel="noreferrer"><span>BUILD YOUR DIGITAL PRESENCE</span><b>Visit Vyapai.in</b><i>↗</i></a>
            <a href="https://medium.com/@sheevumgoel" target="_blank" rel="noreferrer"><span>READ THE LATEST IDEAS</span><b>Explore Blogs</b><i>↗</i></a>
            <a href="https://agent.jotform.com/019aa7fd4aaa7cccb0ce1b2c0748666c3478" target="_blank" rel="noreferrer"><span>START AN AI CONVERSATION</span><b>Meet AI Agent Leeila</b><i>↗</i></a>
            <a href="https://www.linkedin.com/company/sudarshan-ai-labs/" target="_blank" rel="noreferrer"><span>FOLLOW THE COMPANY JOURNEY</span><b>Connect on LinkedIn</b><i>↗</i></a>
            <a href="https://pinterest.com/ailabslucknow" target="_blank" rel="noreferrer"><span>DISCOVER VISUAL IDEAS</span><b>Follow on Pinterest</b><i>↗</i></a>
            <a href="https://sudarshan-ai.com/" target="_blank" rel="noreferrer"><span>EXPLORE THE AI ECOSYSTEM</span><b>Visit Sudarshan-AI.com</b><i>↗</i></a>
          </div>
        </div>
        <div className="footer-bottom"><span>Written by Sheevum Goel · Lucknow, India</span><a href="#top">Back to top ↑</a></div>
      </footer>
      <a className="back-top" href="#top" aria-label="Back to top">↑</a>
    </main>
  );
}
