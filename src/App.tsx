import { useEffect, useState } from "react";
import SouthwestTrip from "./travel/plans/2026-fall-southwest/SouthwestTrip";

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

const stateTiles = [
  ["AK", "Alaska", 1, 1],
  ["VT", "Vermont", 1, 11],
  ["NH", "New Hampshire", 1, 12],
  ["ME", "Maine", 1, 13],
  ["WA", "Washington", 2, 2],
  ["ID", "Idaho", 2, 3],
  ["MT", "Montana", 2, 4],
  ["ND", "North Dakota", 2, 5],
  ["MN", "Minnesota", 2, 6],
  ["WI", "Wisconsin", 2, 7],
  ["MI", "Michigan", 2, 8],
  ["NY", "New York", 2, 11],
  ["MA", "Massachusetts", 2, 12],
  ["OR", "Oregon", 3, 2],
  ["NV", "Nevada", 3, 3],
  ["WY", "Wyoming", 3, 4],
  ["SD", "South Dakota", 3, 5],
  ["IA", "Iowa", 3, 6],
  ["IL", "Illinois", 3, 7],
  ["IN", "Indiana", 3, 8],
  ["OH", "Ohio", 3, 9],
  ["PA", "Pennsylvania", 3, 10],
  ["NJ", "New Jersey", 3, 11],
  ["CT", "Connecticut", 3, 12],
  ["RI", "Rhode Island", 3, 13],
  ["CA", "California", 4, 2],
  ["UT", "Utah", 4, 3],
  ["CO", "Colorado", 4, 4],
  ["NE", "Nebraska", 4, 5],
  ["MO", "Missouri", 4, 6],
  ["KY", "Kentucky", 4, 7],
  ["WV", "West Virginia", 4, 8],
  ["VA", "Virginia", 4, 9],
  ["MD", "Maryland", 4, 10],
  ["DE", "Delaware", 4, 11],
  ["AZ", "Arizona", 5, 3],
  ["NM", "New Mexico", 5, 4],
  ["KS", "Kansas", 5, 5],
  ["AR", "Arkansas", 5, 6],
  ["TN", "Tennessee", 5, 7],
  ["NC", "North Carolina", 5, 9],
  ["DC", "District of Columbia", 5, 10],
  ["OK", "Oklahoma", 6, 5],
  ["LA", "Louisiana", 6, 6],
  ["MS", "Mississippi", 6, 7],
  ["AL", "Alabama", 6, 8],
  ["GA", "Georgia", 6, 9],
  ["SC", "South Carolina", 6, 10],
  ["HI", "Hawaii", 7, 1],
  ["TX", "Texas", 7, 5],
  ["FL", "Florida", 7, 9],
] as const;

const plannedStates = new Set(["NV", "UT", "AZ"]);

const southwestPlan = {
  date: "Nov 20–29, 2026",
  note: "Planned Southwest road trip across Nevada, Utah, and Arizona.",
  href: "#2026-fall-southwest",
};

const demoTrips: Record<string, { date: string; note: string }> = {
  CA: {
    date: "Dates still loose",
    note: "I’ve been. I’ll write the days in once I pin them down.",
  },
  NY: {
    date: "Dates still loose",
    note: "I’ve been. I’ll write the days in once I pin them down.",
  },
  MA: {
    date: "Dates still loose",
    note: "Boston. I’ll write the days in once I pin them down.",
  },
  GA: {
    date: "Dates still loose",
    note: "I’ve been. I’ll write the days in once I pin them down.",
  },
  NJ: {
    date: "Dates still loose",
    note: "I’ve been. I’ll write the days in once I pin them down.",
  },
  TN: {
    date: "Dates still loose",
    note: "I’ve been. I’ll write the days in once I pin them down.",
  },
  NC: {
    date: "Dates still loose",
    note: "I’ve been. I’ll write the days in once I pin them down.",
  },
  DC: {
    date: "Dates still loose",
    note: "I’ve been. I’ll write the days in once I pin them down.",
  },
};

type DemoPhoto = {
  caption: string;
  credit: string;
  url: string;
  alt: string;
};

const demoPhotos: Record<string, DemoPhoto[]> = {
  CA: [
    {
      caption: "Pacific coast",
      credit: "Craig Melville",
      url: "/travel/states/CA/01.jpg",
      alt: "Rocky California mountain beside the Pacific Ocean",
    },
    {
      caption: "Coastal road",
      credit: "Craig Melville",
      url: "/travel/states/CA/02.jpg",
      alt: "Brown cliffs beside the sea on the California coast",
    },
    {
      caption: "Mountain lake",
      credit: "Ganapathy Kumar",
      url: "/travel/states/CA/03.jpg",
      alt: "Gray and brown mountains beside a California lake",
    },
  ],
  NY: [
    {
      caption: "Brooklyn Bridge",
      credit: "Patrick Tomasso",
      url: "/travel/states/NY/01.jpg",
      alt: "Manhattan skyline and Brooklyn Bridge over the East River",
    },
    {
      caption: "A yellow cab",
      credit: "Robert Bye",
      url: "/travel/states/NY/02.jpg",
      alt: "A yellow taxi driving between tall New York buildings",
    },
    {
      caption: "Downtown light",
      credit: "Andrea Cau",
      url: "/travel/states/NY/03.jpg",
      alt: "A pathway between high-rise buildings in New York",
    },
  ],
  MA: [
    {
      caption: "Brick and green",
      credit: "Matt Collamer",
      url: "/travel/states/MA/01.jpg",
      alt: "A historic brick building surrounded by trees in Boston",
    },
    {
      caption: "Beacon Hill",
      credit: "Amanda Murphy",
      url: "/travel/states/MA/02.jpg",
      alt: "A cobblestone Boston street lined with brick buildings",
    },
    {
      caption: "A walk through Boston",
      credit: "Asael Peña",
      url: "/travel/states/MA/03.jpg",
      alt: "People walking through a tree-lined place in Boston",
    },
  ],
  GA: [
    {
      caption: "Savannah oaks",
      credit: "Ryan Arnst",
      url: "/travel/states/GA/01.jpg",
      alt: "A road passing beneath green trees in Savannah, Georgia",
    },
    {
      caption: "Atlanta skyline",
      credit: "Lance Asper",
      url: "/travel/states/GA/02.jpg",
      alt: "The Atlanta skyline during daytime",
    },
    {
      caption: "Historic streets",
      credit: "Jonah Townsley",
      url: "/travel/states/GA/03.jpg",
      alt: "A Savannah street with moss-draped trees and historic buildings",
    },
  ],
  TN: [
    {
      caption: "Cumberland River",
      credit: "King of Hearts",
      url: "/travel/states/TN/01.jpg",
      alt: "Nashville skyline reflected in the Cumberland River",
    },
    {
      caption: "Smoky overlook",
      credit: "Shadowmeld Photography",
      url: "/travel/states/TN/02.jpg",
      alt: "Forested ridges of the Great Smoky Mountains under a cloudy sky",
    },
    {
      caption: "Broadway",
      credit: "Antony-22",
      url: "/travel/states/TN/03.jpg",
      alt: "People walking along Broadway in downtown Nashville",
    },
  ],
  NC: [
    {
      caption: "Biltmore",
      credit: "Blake Lewis",
      url: "/travel/states/NC/01.jpg",
      alt: "The Biltmore Estate and its lawn in Asheville, North Carolina",
    },
    {
      caption: "Cape Hatteras",
      credit: "Bohemian Baltimore",
      url: "/travel/states/NC/02.jpg",
      alt: "The black and white spiral of the Cape Hatteras Lighthouse",
    },
    {
      caption: "Blue Ridge road",
      credit: "Maria newengland",
      url: "/travel/states/NC/03.jpg",
      alt: "A stone tunnel on the Blue Ridge Parkway in North Carolina",
    },
  ],
  DC: [
    {
      caption: "Reflecting Pool",
      credit: "Ali Khan",
      url: "/travel/states/DC/01.jpg",
      alt: "The Washington Monument reflected in the Lincoln Memorial Reflecting Pool",
    },
    {
      caption: "Cherry blossoms",
      credit: "Kurt Kaiser",
      url: "/travel/states/DC/02.jpg",
      alt: "Cherry blossoms in front of the Washington Monument",
    },
    {
      caption: "The Capitol",
      credit: "Martin Falbisoner",
      url: "/travel/states/DC/03.jpg",
      alt: "The west front of the United States Capitol",
    },
  ],
  NJ: [
    {
      caption: "Cape May light",
      credit: "King of Hearts",
      url: "/travel/states/NJ/01.jpg",
      alt: "Cape May Lighthouse at sunset behind beach grass",
    },
    {
      caption: "Asbury Park",
      credit: "Acroterion",
      url: "/travel/states/NJ/02.jpg",
      alt: "The brick Paramount Theatre and Convention Hall in Asbury Park",
    },
    {
      caption: "Across the river",
      credit: "King of Hearts",
      url: "/travel/states/NJ/03.jpg",
      alt: "The Manhattan skyline at dusk seen from the Jersey City waterfront",
    },
  ],
};

function TravelScreen() {
  const [selected, setSelected] = useState("NY");
  const selectedState = stateTiles.find(([code]) => code === selected)!;
  const trip = demoTrips[selected];
  const planned = plannedStates.has(selected);
  const selectedPhotos = demoPhotos[selected] ?? [];

  return (
    <main className="travel-screen">
      <nav className="site-bar page-pad" aria-label="Travel map navigation">
        <a className="identity" href="#life" aria-label="Back to portfolio">
          <strong>LW.</strong>
          <span className="identity-rule" />
          <span>States &amp; stories</span>
        </a>
        <a className="back-link" href="#life">
          <span aria-hidden="true">←</span> Back to portfolio
        </a>
      </nav>

      <header className="travel-header page-pad">
        <div>
          <Label>Beyond the work</Label>
          <h1>
            A map of places
            <br />
            and small moments.
          </h1>
        </div>
        <div className="demo-notice">
          <span>THE MAP SO FAR</span>
          <p>
            Darker purple is where I’ve been. I’m still writing the dates and notes in, and the
            photos below are borrowed until mine are ready.
          </p>
        </div>
      </header>

      <section className="map-section page-pad" aria-label="Interactive United States travel map">
        <div className="map-toolbar">
          <div className="map-legend" aria-label="Map legend">
            <span>
              <i className="legend-swatch visited" /> Visited
            </span>
            <span>
              <i className="legend-swatch planned" /> Planned
            </span>
            <span>
              <i className="legend-swatch" /> Not visited
            </span>
          </div>
          <p>{Object.keys(demoTrips).length} of 50 States + D.C. visited</p>
        </div>

        <div className="map-layout">
          <div className="map-scroll">
            <div className="state-map">
              {stateTiles.map(([code, name, row, column]) => {
                const visited = Boolean(demoTrips[code]);
                const planned = plannedStates.has(code);
                const status = visited ? "visited" : planned ? "planned" : "not visited";
                return (
                  <button
                    className={`state-tile ${visited ? "is-visited" : ""} ${planned ? "is-planned" : ""} ${
                      selected === code ? "is-selected" : ""
                    }`}
                    style={{ gridRow: row, gridColumn: column }}
                    key={code}
                    type="button"
                    aria-label={`${name}, ${status}`}
                    aria-pressed={selected === code}
                    onClick={() => setSelected(code)}
                  >
                    <span>{code}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="state-detail" aria-live="polite">
            <div className="state-detail-top">
              <span>{selected}</span>
              <span className={trip ? "status-visited" : planned ? "status-planned" : ""}>
                {trip ? "Visited" : planned ? "Planned" : "Not visited"}
              </span>
            </div>
            <div>
              <p className="detail-label">
                {selected === "DC" ? "Selected district" : "Selected state"}
              </p>
              <h2>{selectedState[1]}</h2>
            </div>
            {trip ? (
              <>
                <div className="trip-date">
                  <p className="detail-label">Travel time</p>
                  <strong>{trip.date}</strong>
                </div>
                <p className="trip-note">{trip.note}</p>
              </>
            ) : planned ? (
              <>
                <div className="trip-date">
                  <p className="detail-label">Travel time</p>
                  <strong>{southwestPlan.date}</strong>
                </div>
                <p className="trip-note">{southwestPlan.note}</p>
                <a className="itinerary-link" href={southwestPlan.href}>
                  Open the planned itinerary ↗
                </a>
              </>
            ) : (
              <p className="trip-note">
                I haven’t been here yet. Pick a darker purple state to see a date and a note from a
                trip I did take.
              </p>
            )}
            <div className="sample-tag">
              {trip ? "STILL WRITING" : planned ? "COMING UP" : "NOT YET"}
            </div>
          </aside>
        </div>
      </section>

      <section className="travel-gallery page-pad" aria-label="Travel photos">
        <div className="gallery-heading">
          <span>{selectedState[1]} / FROM THE ROAD</span>
          <p>
            {selectedPhotos.length
              ? `Photos of ${selectedState[1]}, for now. Mine will replace these. The film’s still at the lab.`
              : planned
                ? `No photos of ${selectedState[1]} yet. The plan is linked in the panel above.`
                : `Nothing from ${selectedState[1]} yet.`}
          </p>
        </div>
        {selectedPhotos.length ? (
          <div className="gallery-grid" key={selected}>
            {selectedPhotos.map((item, index) => (
              <figure className={`gallery-card gallery-card-${index + 1}`} key={item.url}>
                <div className="gallery-image">
                  <img src={item.url} alt={item.alt} loading="lazy" />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <figcaption>
                  <div>
                    <strong>{selectedState[1]}</strong>
                    <span>{item.caption}</span>
                  </div>
                  <span>Photo · {item.credit}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="gallery-empty">
            <span>{selected}</span>
            <div>
              <h2>No photos here yet.</h2>
              <p>
                {planned
                  ? `I’ll add photos of ${selectedState[1]} after the trip.`
                  : trip
                    ? `My photos of ${selectedState[1]} aren’t in yet.`
                    : "I haven’t been here. Darker purple states are the ones with a note, and a few borrowed photos for now."}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="travel-footnote page-pad">
        <span>50 States + D.C.</span>
        <p>
          A lighter corner of the portfolio, built to hold dates, memories, and the places still
          ahead.
        </p>
      </section>
    </main>
  );
}

type Screen = "home" | "travel" | "southwest";

function screenFromHash(hash: string): Screen {
  if (hash === "#travel") return "travel";
  if (hash === "#2026-fall-southwest") return "southwest";
  return "home";
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(() => screenFromHash(window.location.hash));

  useEffect(() => {
    const handleHashChange = () => {
      const next = screenFromHash(window.location.hash);
      setScreen(next);
      if (next !== "home") window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  if (screen === "travel") return <TravelScreen />;
  if (screen === "southwest") return <SouthwestTrip />;

  return (
    <main>
      <section className="intro page-pad">
        <nav className="site-bar" aria-label="Primary navigation">
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
                  className="project-title-link"
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
              className="project-github"
              href="https://github.com/lisa-0831/unicorn-ll"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
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
                  className="project-title-link"
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
              className="project-github"
              href="https://github.com/lisa-0831/Online-Learning-Platform"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
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
              <p>Business Promotions and Business Intelligence Analyst at ASE Group · May–Aug 2021</p>
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

      <section id="life" className="travel-portal page-pad">
        <div className="travel-portal-copy">
          <Label light>Beyond the work</Label>
          <h2>
            There’s more to a life
            <br />
            than a résumé.
          </h2>
          <p>
            A lighter collection of places, dates, and memories—starting with an interactive map of
            the states and D.C. I’ve explored.
          </p>
          <a className="travel-button" href="#travel">
            Open the travel map <Arrow />
          </a>
        </div>
        <a className="travel-preview" href="#travel" aria-label="Open interactive travel map">
          <div className="preview-meta">
            <span>USA / 50 States + D.C.</span>
            <span>Interactive journal</span>
          </div>
          <div className="preview-tiles" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((tile) => (
              <i className={tile === 2 || tile === 5 || tile === 9 ? "filled" : ""} key={tile} />
            ))}
          </div>
          <div className="preview-footer">
            <span>Places visited</span>
            <span className="preview-arrow">↗</span>
          </div>
        </a>
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
