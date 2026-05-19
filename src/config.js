export const config = {
  name: "Akshay Vilekar",
  role: "Senior Backend Engineer",
  location: "Indore, India",
  email: "contact@akshayvilekar.me",
  github: "https://github.com/ak2703",
  linkedin: "https://www.linkedin.com/in/akshay-vilekar-b25a2584/",
  twitter: "https://twitter.com/ak2703",
  twitterHandle: "@ak2703",
  tagline: "I build backend systems that don't fall over.",
  summary: "Eight years shipping the parts of software most people never see — data models, event flows, the contract between services.",

  askMeAbout: [
    { t: "kafka", c: "c-yellow" }, { t: "idempotency", c: "c-mint" },
    { t: "rlhf data", c: "c-blue" }, { t: "postgres", c: "c-pink" },
    { t: "search indexes", c: "c-orange" }, { t: "slow migrations", c: "c-red" },
    { t: "spring boot", c: "c-purple" }, { t: "aws bills", c: "c-yellow" },
    { t: "code reviews", c: "c-mint" }, { t: "on-call horror", c: "c-pink" },
  ],

  now: [
    { k: "shipping", v: "Distributed systems and agentic workflows" },
    { k: "reading", v: "Designing Data-Intensive Apps", em: "(again)" },
    { k: "learning", v: "Rust + tokio", em: "for fun" },
    { k: "fueled by", v: "filter coffee" },
    { k: "open to", v: "Sr / Staff IC roles" },
    { k: "based in", v: "Indore", em: "IST · UTC+5:30" },
  ],

  about: {
    lead: "I build backend systems that quietly hold up the apps people actually use — services that have to stay up, stay fast, and stay correct under real load.",
    body: [
      "Eight years across e-commerce, education ERP, real estate, and now AI/ML data platforms. I gravitate toward the parts of a system that are hard to walk back: data models, event flows, the contract between services.",
      "Recent work has centered on RLHF data pipelines and prompt-engineering tooling for foundation-model evaluation — building the unglamorous infrastructure that makes good model training possible."
    ],
    principles: [
      "Boring tech, novel problems.",
      "Make the wrong thing hard to do.",
      "Observe, then optimize — never the other way around.",
      "Idempotency is a love language."
    ]
  },

  experience: [
    { when: "2024 → Sep 2025", role: "Sr. Software Engineer", company: "Wrkspot", place: "Remote", tags: ["IoT", "Spring", "Kafka", "Postgres"], badge: "current", detail: "Owned end-to-end development of scheduling, access control, licensing, onboarding on IoT hospitality SaaS." },
    { when: "2023 → Aug 2024", role: "Sr. Software Engineer", company: "Micro1", place: "Remote", tags: ["RLHF", "Spring", "Kafka", "Postgres"], detail: "Building backend systems for prompt-engineering workflows and RLHF-driven model evaluation. Designed data pipelines that ingest, deduplicate and route human-feedback signals into training datasets." },
    { when: "2021 → 2023", role: "Software Engineer", company: "Immobel", place: "Colorado, US (remote)", tags: ["Java", "Microservices", "AWS"], detail: "Automated real-estate operational workflows and built cross-brand referral systems that unified lead data across business units." },
    { when: "2018 → 2021", role: "Full Stack Developer", company: "School of the Nations", place: "Macau, China", tags: ["Spring", "Angular", "MySQL", "SOLR"], detail: "Led the build of SONIS — a school-wide ERP serving thousands of users daily. Integrated Macau-Pay for in-app payments, redesigned the reporting service for 80% lower latency." },
    { when: "2017 → 2018", role: "Software Engineer", company: "Walkover", place: "Indore, India", tags: ["AWS", "Search", "Infra"], detail: "Shipped an 8× search-performance improvement by re-thinking inverted-index sharding and query planning." },
    { when: "2015 → 2017", role: "SDE Intern", company: "Hotwax Systems", place: "Indore, India", tags: ["IoT", "Analytics"], detail: "Designed Bluetooth/Wi-Fi data collection and hotspot analytics for in-store behavior, lifting recommendation effectiveness 30%." }
  ],

  skills: [
    { group: "Languages", items: [["Java", "8 yrs"], ["TypeScript", "4 yrs"], ["Python", "3 yrs"], ["SQL", "8 yrs"]] },
    { group: "Backend", items: [["Spring Boot", "core"], ["Kafka", "core"], ["gRPC", "ok"], ["REST / GraphQL", "ok"]] },
    { group: "Data", items: [["PostgreSQL", "core"], ["MySQL", "core"], ["Redis", "ok"], ["SOLR / Elastic", "ok"]] },
    { group: "Infra", items: [["AWS", "core"], ["Docker / k8s", "ok"], ["Terraform", "ok"], ["CI/CD", "core"]] },
  ],

  projects: [
    { n: "01", title: "reinforce-backend", sub: "rlhf · data platform · 2024", caption: "the unglamorous plumbing behind good model evals", desc: "A backend for reinforcement learning through human feedback — collects, validates and routes annotator signals into datasets ready for model training.", stack: ["Java", "Spring", "Kafka", "Postgres"], href: "https://github.com/ak2703/reinforce-backend", vis: "rlhf" },
    { n: "02", title: "SONIS", sub: "edu · erp · 2018→2021", caption: "billing, payroll, reports — for thousands of kids", desc: "End-to-end school operations platform: admissions, billing, payroll, reporting. Owned the reporting rewrite that cut p95 by 80%.", stack: ["Spring", "Angular", "MySQL", "SOLR"], href: "https://github.com/ak2703", vis: "erp" },
    { n: "03", title: "referral-graph", sub: "real-estate · routing · 2022", caption: "leads find the right agent. attribution stays clean.", desc: "Unified referral and conversion data from multiple real-estate brands into one routing engine.", stack: ["Java", "AWS", "Postgres"], href: "https://github.com/ak2703", vis: "graph" },
    { n: "04", title: "search re-arch", sub: "infra · perf · 2018", caption: "8× faster. zero changes to the engine.", desc: "Re-sharded an inverted index and rewrote the query planner around the actual access pattern.", stack: ["Java", "AWS", "Search"], href: "https://github.com/ak2703", vis: "search" },
  ],

  writing: [
    { tag: "essay", title: "What I learned shipping RLHF pipelines", when: "soonish" },
    { tag: "notes", title: "Idempotency keys — but for analytics events", when: "in flight" },
    { tag: "case-study", title: "8× faster search without changing the engine", when: "drafting" },
  ],

  education: {
    school: "Sri Vaishnav Institute of Technology and Science",
    degree: "B.E., Computer Science",
    years: "2013 → 2017",
    blurb: "Data Structures, Algorithms, DBMS, Operating Systems, Computer Architecture, AI.",
    extras: "+ self-directed Deep Learning, Data Science, Cloud and full-stack tracks alongside."
  },
};
