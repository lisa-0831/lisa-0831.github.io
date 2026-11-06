const asset = (name: string) => `/assets/${name}`;

function Arrow({ large = false }: { large?: boolean }) {
  return (
    <img
      className={large ? "icon icon-large" : "icon"}
      src={asset(large ? "66e66.svg" : "da7c6.svg")}
      alt=""
    />
  );
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}>
      <span className="signal" />
      <span>{children}</span>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span className="tag" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
}

function Artwork({
  image,
  alt,
  caption,
  number,
  className = "",
}: {
  image: string;
  alt: string;
  caption: string;
  number: string;
  className?: string;
}) {
  return (
    <figure className={`artwork ${className}`}>
      <img src={asset(image)} alt={alt} />
      <figcaption>
        <span>{number}</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

const journeys = [
  {
    date: (
      <>
        AUG 2025 —
        <br />
        MAY 2027 expected
      </>
    ),
    title: "Cornell University",
    role: "MS · Information Systems & Computer Science",
    detail: "New York · GPA 4.03 / 4.3",
  },
  {
    date: (
      <>
        MAR 2022 —
        <br />
        AUG 2025
      </>
    ),
    title: "Backend → Cloud Engineering",
    role: "Aiworks → Ubiquiti",
    detail:
      "Backend Engineer at Aiworks (Mar–Aug 2022), followed by Cloud Software Engineer at Ubiquiti (Oct 2022–Aug 2025).",
  },
  {
    date: (
      <>
        JUL 2020 —
        <br />
        APR 2022
      </>
    ),
    title: "Digital Marketing Specialist → Marketing Manager",
    role: "JOY COLORi",
    detail:
      "Digital Marketing Specialist (Jul–Dec 2020) and Marketing Manager (Jan 2021–Apr 2022), Taipei.",
  },
];

export default function App() {
  return (
    <main>
      <section className="intro page-pad">
        <nav aria-label="Primary navigation">
          <a className="identity" href="#top" aria-label="Pei-Wen Lisa Wang, home">
            <strong>LW.</strong>
            <span className="identity-rule" />
            <span>Pei-Wen (Lisa) Wang</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#journey">Journey</a>
            <a className="purple-link" href="#contact">
              Get in touch <Arrow />
            </a>
          </div>
        </nav>

        <div id="top" className="hero">
          <div className="hero-copy">
            <Label>Software engineer · New York</Label>
            <h1>
              Engineering,
              <br />
              with a wider
              <br />
              perspective.
            </h1>
            <p className="hero-deck">
              Cloud and backend systems, informed by experience across product, business, and
              research.
            </p>
            <a className="primary-button" href="#work">
              Explore selected work
              <img className="icon" src={asset("94df0.svg")} alt="" />
            </a>
          </div>
          <Artwork
            className="hero-art"
            image="8d13a.png"
            alt="Abstract intertwined metallic and lavender sculpture"
            number="01 / CONNECTING PERSPECTIVES"
            caption="Conceptual illustration"
          />
        </div>

        <div className="current-context">
          <div>
            <span className="micro-label">Currently at Cornell</span>
            <strong>MS · Information Systems &amp; Computer Science</strong>
          </div>
          <p>Previously Cloud Software Engineer at Ubiquiti</p>
          <a href="#production">
            A closer look
            <img className="icon-small" src={asset("cad14.svg")} alt="" />
          </a>
        </div>
      </section>

      <section id="production" className="production page-pad">
        <div className="production-heading">
          <div>
            <Label light>Engineering in production</Label>
            <h2>Less latency. More possibility.</h2>
          </div>
          <div className="experience-context">
            <strong>Ubiquiti · Cloud Software Engineer</strong>
            <span>OCT 2022 — AUG 2025</span>
            <p>
              Backend performance, cloud infrastructure, and the tools behind reliable releases.
            </p>
          </div>
        </div>
        <div className="dark-rule" />
        <div className="results">
          {[
            ["92.62%", "Lower REST API response time", "JavaScript-to-Go refactor"],
            ["76.73%", "Lower monthly AWS cost", "Cloud infrastructure cost review"],
            ["Zero", "Downtime at 10K+ QPS", "MySQL 5-to-8 migration"],
          ].map(([figure, title, detail]) => (
            <article className="result" key={figure}>
              <strong>{figure}</strong>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="work" className="projects page-pad">
        <header className="section-heading">
          <div>
            <Label>Selected projects</Label>
            <h2>
              From complex inputs
              <br />
              to useful experiences.
            </h2>
          </div>
          <p>
            Ideas made visible. The illustrations below are conceptual, not product screenshots.
          </p>
        </header>

        <article className="project project-unicorn">
          <Artwork
            image="fcaa8.png"
            alt="Translucent lavender strands becoming a structured form"
            number="02 / SIGNALS → STRUCTURE"
            caption="Conceptual illustration"
          />
          <div className="project-copy">
            <span className="project-kicker">AI × OPERATIONS</span>
            <div>
              <h3>
                <a
                  href="https://github.com/lisa-0831/unicorn-ll#unicorn-ll--ai-assisted-hospitality-operations"
                  target="_blank"
                  rel="noreferrer"
                >
                  UnicornLL
                </a>
              </h3>
              <h4>AI-assisted hospitality operations</h4>
            </div>
            <p className="project-lead">
              Turning guest complaints and requests into an AI-assisted resolution dashboard.
            </p>
            <div>
              <h5>Context, not just sentiment</h5>
              <p>
                Local RoBERTa sentiment and gpt-5-mini summaries of emails and call transcripts
                inform explainable severity scores.
              </p>
            </div>
            <div>
              <h5>Designed for imperfect inputs</h5>
              <p>
                Scoring considers loyalty tier and issue category, with a fault-tolerant
                deterministic extraction fallback.
              </p>
            </div>
            <Tags items={["Next.js / React", "Koa.js", "FastAPI"]} />
            <a
              className="project-link"
              href="https://github.com/lisa-0831/unicorn-ll"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <Arrow />
            </a>
          </div>
        </article>

        <div className="rule" />

        <article className="project project-pi">
          <div className="project-copy">
            <span className="project-kicker">REAL-TIME × LEARNING</span>
            <div>
              <h3>
                <a
                  href="https://github.com/lisa-0831/Online-Learning-Platform#pi-course"
                  target="_blank"
                  rel="noreferrer"
                >
                  Pi Course
                </a>
              </h3>
              <h4>A more connected learning experience</h4>
            </div>
            <p className="project-lead">
              An online learning platform that brings personalized discovery and live teaching into
              one experience.
            </p>
            <div>
              <h5>Relevant paths to learning</h5>
              <p>Personalized recommendations based on user labels and purchase behavior.</p>
            </div>
            <div>
              <h5>One teacher, many learners</h5>
              <p>One-to-many livestreaming built with WebSocket and WebRTC.</p>
            </div>
            <Tags items={["Recommendations", "WebSocket", "WebRTC"]} />
            <a
              className="project-link"
              href="https://github.com/lisa-0831/Online-Learning-Platform"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
              <Arrow />
            </a>
          </div>
          <Artwork
            image="48259.png"
            alt="A connected network of folded white and lavender structures"
            number="03 / KNOWLEDGE IN CONNECTION"
            caption="Conceptual illustration"
          />
        </article>
      </section>

      <section id="journey" className="perspective page-pad">
        <div className="journey-layout">
          <div className="personal-context">
            <Label>The wider perspective</Label>
            <h2>
              A background
              <br />
              that crosses
              <br />
              boundaries.
            </h2>
            <p>
              My background spans political science, product, marketing, research, and Python
              teaching—alongside hands-on backend and cloud engineering.
            </p>
            <div className="earlier">
              <span className="project-kicker">EARLIER CHAPTERS</span>
              <p>Product internship at Sohu · Apr–Aug 2018</p>
              <p>
                Research assistant at Chung-Hua Institution for Economic Research · Jul–Aug 2019
              </p>
              <p>Python teaching assistant at stanCode · May–Aug 2021</p>
            </div>
          </div>

          <div className="journey-list">
            {journeys.map((item) => (
              <article className="journey-item" key={item.title}>
                <div className="journey-date">{item.date}</div>
                <div>
                  <h3>{item.title}</h3>
                  <strong>{item.role}</strong>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="rule" />

        <div className="foundation-layout">
          <div className="foundation">
            <span className="project-kicker">ACADEMIC FOUNDATION</span>
            <h3>National Taiwan University</h3>
            <p>
              BA · Political Science &amp; International Relations
              <br />
              2020 · GPA 3.92 / 4.3
              <br />
              Exchange program · Peking University
            </p>
          </div>
          <div className="toolkit">
            <span className="project-kicker">TOOLS I WORK WITH</span>
            {[
              ["Backend", "Go · TypeScript / JavaScript · Python · Node.js"],
              ["Cloud & data", "AWS · Docker · Kubernetes · Redis · PostgreSQL / MySQL"],
              ["Product & observability", "React / Next.js · CI/CD · Grafana / Prometheus"],
            ].map(([title, tools]) => (
              <div className="tool-row" key={title}>
                <span>{title}</span>
                <strong>{tools}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact page-pad">
        <div className="contact-main">
          <div>
            <Label>Contact</Label>
            <h2>Let’s connect.</h2>
          </div>
          <div className="contact-links">
            <a className="contact-email" href="mailto:pw493@cornell.edu">
              <span>pw493@cornell.edu</span>
              <Arrow large />
            </a>
            <a href="https://www.linkedin.com/in/peiwenwang0831" target="_blank" rel="noreferrer">
              <span>LinkedIn</span>
              <Arrow />
            </a>
            <a href="https://github.com/lisa-0831" target="_blank" rel="noreferrer">
              <span>GitHub</span>
              <Arrow />
            </a>
          </div>
        </div>
        <footer>
          <span>Pei-Wen (Lisa) Wang</span>
          <span>New York</span>
          <span>Engineering, with perspective.</span>
        </footer>
      </section>
    </main>
  );
}
