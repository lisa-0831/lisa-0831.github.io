import { useEffect, useRef, useState, type MouseEvent } from "react";
import "./southwest.css";
import {
  cities,
  days,
  embedLink,
  loopPoints,
  places,
  planText,
  routeLink,
  schematicDays,
  schematicRoutes,
  shortStop,
  staysCsv,
  type CityId,
} from "./itinerary";

const TRIP_TITLE =
  "2026 Southwest Road Trip｜Grand Canyon・Antelope Canyon・Bryce・Zion・Valley of Fire";

type MapMode = "google" | "schematic";

function scrollToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function labelOffset(id: CityId, y: number) {
  if (id === "BRYCE" || id === "GC") return y - 22;
  if (id === "VOF") return y - 23;
  return y + 29;
}

function SchematicMap({ dayIndex }: { dayIndex: number }) {
  const active = schematicDays[dayIndex] ?? [];
  return (
    <svg
      viewBox="0 0 700 370"
      width="100%"
      height="100%"
      role="img"
      aria-label="西南自駕位置示意圖，非導航道路形狀"
    >
      <rect width="700" height="370" fill="transparent" />
      <text x="19" y="24" className="svgmap-caption">
        地理位置示意 · 直線不是實際自駕道路
      </text>
      {schematicRoutes.map(([from, to]) => {
        const start = cities[from];
        const end = cities[to];
        const focus = active.includes(from) && active.includes(to) && active.length > 1;
        return (
          <line
            key={`${from}-${to}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke={focus ? "#7351d7" : "#d0c9df"}
            strokeWidth={focus ? 2.4 : 1}
            strokeLinecap="round"
            strokeDasharray={focus ? undefined : "7 6"}
            opacity="0.95"
          />
        );
      })}
      {(Object.entries(cities) as [CityId, (typeof cities)[CityId]][]).map(([id, city]) => {
        const highlighted = active.includes(id);
        return (
          <g key={id}>
            <circle
              cx={city.x}
              cy={city.y}
              r={highlighted ? 6 : 3.5}
              fill={highlighted ? "#7351d7" : "#f7f5fb"}
              stroke={highlighted ? "#7351d7" : "#17191c"}
              strokeWidth="1.4"
            />
            <text
              x={city.x}
              y={labelOffset(id, city.y)}
              textAnchor="middle"
              className="svgmap-label"
            >
              {city.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function RouteCard() {
  return (
    <div className="route-card">
      <div className="route-card-top">
        <span>THE LOOP</span>
        <span>NV · AZ · UT</span>
      </div>
      <svg className="route-illustration" viewBox="0 0 360 265" role="presentation">
        <defs>
          <linearGradient id="routeGlow" x1="0" x2="1">
            <stop stopColor="#f79f80" />
            <stop offset="1" stopColor="#d8b8ff" />
          </linearGradient>
        </defs>
        <path
          d="M54 203 C65 235,119 214,135 180 S196 180,212 133 S304 124,310 76 S256 47,241 50 S180 93,167 109 S110 153,54 203"
          fill="none"
          stroke="#565860"
          strokeWidth="1.25"
          strokeDasharray="4 6"
        />
        <path
          d="M54 203 C65 235,119 214,135 180 S196 180,212 133 S304 124,310 76 S256 47,241 50 S180 93,167 109 S110 153,54 203"
          fill="none"
          stroke="#f4f1ea"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <g fill="#202226" stroke="#f4f1ea" strokeWidth="1.4">
          <circle cx="54" cy="203" r="8" />
          <circle cx="135" cy="180" r="7" />
          <circle cx="212" cy="133" r="7" />
          <circle cx="310" cy="76" r="7" />
          <circle cx="241" cy="50" r="7" />
          <circle cx="167" cy="109" r="7" />
        </g>
        <g fill="#f4f1ea" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="500">
          <text x="8" y="236">
            VEGAS
          </text>
          <text x="78" y="208">
            GRAND CANYON
          </text>
          <text x="222" y="150">
            PAGE
          </text>
          <text x="286" y="58">
            BRYCE
          </text>
          <text x="198" y="32">
            ZION
          </text>
          <text x="86" y="96">
            RETURN
          </text>
        </g>
      </svg>
      <div className="route-card-bottom">
        <span>
          ROAD TRIP
          <br />
          <strong>10 DAYS, 9 NIGHTS.</strong>
        </span>
        <a
          className="route-arrow"
          href="#2026-fall-southwest"
          aria-label="打開路線地圖"
          onClick={(event) => scrollToSection(event, "map-panel")}
        >
          ↗
        </a>
      </div>
    </div>
  );
}

export default function SouthwestTrip() {
  const [chosen, setChosen] = useState(0);
  const [mapMode, setMapMode] = useState<MapMode>("google");
  const [copyLabel, setCopyLabel] = useState("複製每日行程文字");
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const trackRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    document.title = TRIP_TITLE;
    document.documentElement.lang = "zh-Hant";

    const ensureLink = (id: string, attributes: Record<string, string>) => {
      if (document.getElementById(id)) return;
      const link = document.createElement("link");
      link.id = id;
      for (const [key, value] of Object.entries(attributes)) link.setAttribute(key, value);
      document.head.appendChild(link);
    };
    ensureLink("southwest-font-preconnect", {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    });
    ensureLink("southwest-font-gstatic", {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    });
    ensureLink("southwest-fonts", {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+TC:wght@400;500&display=swap",
    });

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
      window.clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanPrev(track.scrollLeft > 2);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 2);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const day = days[chosen];
  const fullMap = routeLink(day.points);
  const simpleMap = routeLink([day.points[0], day.points[day.points.length - 1]]);
  const embeddedMap = embedLink(day.points);

  function selectDay(index: number, scrollToMap = false) {
    setChosen(index);
    if (scrollToMap && window.innerWidth < 900) {
      document.getElementById("map-panel")?.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function copyPlan() {
    const text = planText(days);
    try {
      await navigator.clipboard.writeText(text);
      setCopyLabel("已複製 ✓");
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopyLabel("複製每日行程文字"), 1800);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
      window.alert("已嘗試複製行程；如瀏覽器禁止，請使用列印功能。");
    }
  }

  function downloadCsv() {
    const csv = staysCsv(days);
    const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "2026_roadtrip_hotels_1120_1129.csv";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  function scrollPlaces(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".place-card");
    const step = card ? card.getBoundingClientRect().width + 16 : 480;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className="southwest">
      <nav className="site-bar page-pad" id="top" aria-label="頁面導覽">
        <a className="identity" href="#travel" aria-label="回到 Portfolio 的 Travel 區塊">
          <strong>LW.</strong>
          <span className="identity-rule" />
          <span>Travel journal</span>
        </a>
        <div className="nav-links">
          <a href="#2026-fall-southwest" onClick={(event) => scrollToSection(event, "itinerary")}>
            每日行程
          </a>
          <a href="#2026-fall-southwest" onClick={(event) => scrollToSection(event, "map-panel")}>
            路線地圖
          </a>
          <a href="#2026-fall-southwest" onClick={(event) => scrollToSection(event, "stays")}>
            住宿與提醒
          </a>
          <a className="nav-home" href="#travel">
            <span aria-hidden="true">←</span> 返回 Travel
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            TRAVEL COLLECTION / FALL 2026
          </div>
          <h1>
            <span className="h1-primary">從霓虹走進</span>
            <span className="h1-serif">
              紅岩峽谷<span className="h1-spark">✳</span>
            </span>
          </h1>
        </div>
        <div className="hero-note">
          <span>11/20 – 11/29</span>
          <p>
            10 天 9 夜，從 Las Vegas 走到 Grand Canyon、Page、Bryce、Zion，再回到城市。11/22 中午是
            Ken’s Lower Antelope Canyon。
          </p>
        </div>
      </header>

      <main className="wrap">
        <section className="loop-band" aria-label="這趟的環線">
          <div className="loop-copy">
            <p>Las Vegas，走到紅岩，再回到霓虹。</p>
            <a
              className="hero-cta"
              href="#2026-fall-southwest"
              onClick={(event) => scrollToSection(event, "itinerary")}
            >
              探索完整行程 <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-right">
            <RouteCard />
          </div>
        </section>

        <section className="places" aria-label="這趟會經過的風景">
          <div className="places-head">
            <span>THE PLACES / 2026</span>
          </div>
          <div className="places-stage">
            <button
              className="places-arrow prev"
              type="button"
              aria-label="上一張"
              disabled={!canPrev}
              onClick={() => scrollPlaces(-1)}
            >
              &lt;
            </button>
            <div className="places-track" ref={trackRef}>
              {places.map((place) => (
                <figure className="place-card" key={place.src}>
                  <div className="place-image">
                    <img src={place.src} alt={place.alt} />
                    <span>{place.badge}</span>
                  </div>
                  <figcaption>
                    <div>
                      <strong>{place.title}</strong>
                      <span>{place.caption}</span>
                    </div>
                    <span>{place.region}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <button
              className="places-arrow next"
              type="button"
              aria-label="下一張"
              disabled={!canNext}
              onClick={() => scrollPlaces(1)}
            >
              &gt;
            </button>
          </div>
        </section>

        <div className="section-intro">
          <div>
            <h2>一次，把美國西南走成一圈。</h2>
          </div>
          <p>
            自駕、峽谷、日落與城市夜景。下方保留每個時段、住宿地點和地圖導航，讓旅伴一眼掌握整趟旅行。
          </p>
        </div>

        <section className="summary" aria-label="行程概要">
          <div className="stat">
            <div className="n">11/20–11/29</div>
            <small>JetBlue｜22:45 到 LAS，23:59 回 JFK</small>
          </div>
          <div className="stat">
            <div className="n">11/22 · 12:00</div>
            <small>Ken’s Tours 羚羊峽谷導覽（以訂單為準）</small>
          </div>
          <div className="stat">
            <div className="n">11/21–26</div>
            <small>Grand Canyon → Page → Bryce → Zion 環線</small>
          </div>
          <div className="stat">
            <div className="n">11/27</div>
            <small>Valley of Fire 從 Vegas 當日往返</small>
          </div>
        </section>

        <div className="buttons">
          <button className="btn dark" type="button" onClick={() => window.print()}>
            列印 / 存成 PDF
          </button>
          <button className="btn" type="button" onClick={() => void copyPlan()}>
            {copyLabel}
          </button>
          <button className="btn" type="button" onClick={downloadCsv}>
            匯出住宿 CSV
          </button>
        </div>

        <div className="layout">
          <section id="itinerary">
            <div className="heading">
              <div>
                <h2>每日詳細行程</h2>
              </div>
              <span>點一天，右側地圖跟著換</span>
            </div>
            <div className="days">
              {days.map((tripDay, index) => (
                <article
                  className={`day${index === chosen ? " selected" : ""}`}
                  id={`day-${index}`}
                  key={tripDay.date}
                >
                  <div className="day-top">
                    <div className="day-index">
                      <span>DAY {tripDay.num}</span>
                      <b>{tripDay.date}</b>
                      <em>{tripDay.day}</em>
                    </div>
                    <div className="day-info">
                      <h3>{tripDay.title}</h3>
                      <p className="region">{tripDay.region}</p>
                      <p className="lodging">
                        {tripDay.stay === "無，返程日" ? "返程日，無住宿" : `住 ${tripDay.stay}`}
                      </p>
                    </div>
                  </div>
                  <ol className="timeline">
                    {tripDay.events.map((event) => (
                      <li key={`${tripDay.date}-${event[0]}-${event[1]}`}>
                        <span className="tt">{event[0]}</span>
                        <div>
                          <b>{event[1]}</b>
                          {event[2] ? <span className="minor">{event[2]}</span> : null}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="day-foot">
                    <button type="button" onClick={() => selectDay(index, true)}>
                      {index === chosen ? "正在看這天地圖" : "看這天的地圖"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="panel" id="map-panel">
            <h2>自駕路線地圖</h2>
            <p className="sub">以 Google Maps 規劃當日開車順序；接駁車、步道不算在自駕道路。</p>
            <div className="tabs">
              {days.map((tripDay, index) => (
                <button
                  className={chosen === index ? "active" : ""}
                  type="button"
                  aria-pressed={chosen === index}
                  key={tripDay.date}
                  onClick={() => selectDay(index)}
                >
                  {tripDay.date}
                </button>
              ))}
            </div>
            <div className="mapbar">
              <b>
                {day.date} · {day.region.replace(" / ", "／")}
              </b>
              <small>{day.stay === "無，返程日" ? "返程日" : `住宿 ${day.stay}`}</small>
            </div>
            <div className="map-toggle">
              <button
                className={mapMode === "google" ? "active" : ""}
                type="button"
                onClick={() => setMapMode("google")}
              >
                Google Maps
              </button>
              <button
                className={mapMode === "schematic" ? "active" : ""}
                type="button"
                onClick={() => setMapMode("schematic")}
              >
                路線位置示意圖
              </button>
            </div>
            <div className={`mapframe${mapMode === "schematic" ? " schematic-active" : ""}`}>
              <iframe
                title="Google Maps 自駕路線"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={embeddedMap}
              />
              <div
                className="schematic"
                role="img"
                aria-label="各地點地理位置示意圖；直線不代表道路"
              >
                <SchematicMap dayIndex={chosen} />
              </div>
            </div>
            <div className="maplinks">
              <a className="maplink primary" href={fullMap} target="_blank" rel="noopener">
                當日 Google Maps 路線 ↗
              </a>
              <a className="maplink" href={simpleMap} target="_blank" rel="noopener">
                起終點導航 ↗
              </a>
              <a className="maplink" href={routeLink(loopPoints)} target="_blank" rel="noopener">
                查看 6 天完整環線 ↗
              </a>
            </div>
            <div className="maphelp">
              地圖顯示當日自駕順序；接駁車與步道不在自駕路線內。車程會依當日路況變動。
            </div>
            <div className="segmenthead">
              <b>點對點車程（按當天順序）</b>
              <small>{day.points.length - 1} 個自駕路段</small>
            </div>
            <div className="segments">
              {day.points.slice(0, -1).map((point, index) => {
                const nextPoint = day.points[index + 1];
                return (
                  <div className="segment" key={`${day.date}-${point}`}>
                    <div className="route">
                      <b>
                        {index + 1}. {shortStop(point)} → {shortStop(nextPoint)}
                      </b>
                    </div>
                    <a href={routeLink([point, nextPoint])} target="_blank" rel="noopener">
                      查看
                    </a>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <section className="bottom" id="stays">
          <div className="panel2">
            <h2>九晚住宿總表</h2>
            <table>
              <thead>
                <tr>
                  <th>入住日期</th>
                  <th>住宿城市／鄉鎮</th>
                  <th>晚數</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>11/20</td>
                  <td>
                    <a
                      href="https://www.ihg.com/atwellsuites/hotels/us/en/henderson/lashr/hoteldetail"
                      target="_blank"
                      rel="noopener"
                    >
                      Atwell Suites Henderson by IHG
                    </a>
                    <br />
                    150 S Water St, Henderson, NV
                  </td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>11/21</td>
                  <td>
                    <a href="https://www.airbnb.com/l/jPAjKZF7" target="_blank" rel="noopener">
                      Stargazer Tiny Home
                    </a>
                    <br />
                    Grand Canyon Oasis，28272 N US-89, Flagstaff
                  </td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>11/22</td>
                  <td>
                    <a
                      href="https://www.airbnb.com/rooms/1365517416009497437"
                      target="_blank"
                      rel="noopener"
                    >
                      The Coyote Cottage
                    </a>
                    <br />
                    Page, Arizona
                  </td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>11/23</td>
                  <td>
                    <a
                      href="https://www.bestwestern.com/en-us/book/rooms/45040?checkIn=2026-11-23&checkOut=2026-11-24&adults=2"
                      target="_blank"
                      rel="noopener"
                    >
                      Best Western Plus Ruby's Inn
                    </a>
                    <br />
                    26 S Main St, Bryce Canyon City；11/24 退房
                  </td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>11/24–25</td>
                  <td>
                    <a
                      href="https://www.airbnb.com/rooms/1542246716166305139"
                      target="_blank"
                      rel="noopener"
                    >
                      沙漠綠洲
                    </a>
                    <br />
                    La Verkin, Utah，Confluence Park 旁
                  </td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>11/26–28</td>
                  <td>
                    <a
                      href="https://www.hilton.com/en/hotels/lasvgqq-virgin-hotels-las-vegas"
                      target="_blank"
                      rel="noopener"
                    >
                      Virgin Hotels Las Vegas
                    </a>
                    <br />
                    4455 Paradise Rd；11/29 早上退房
                  </td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>
                    <b>總計</b>
                  </td>
                  <td>6 個住宿地（6 次入住）</td>
                  <td>
                    <b>9</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="panel2">
            <h2>行前準備</h2>
            <ul className="sources">
              <li>
                <b>保暖：</b>Grand Canyon、Bryce Canyon 與 Zion 早晚溫差大，11
                月可能低於冰點。請準備分層衣物、保暖帽與手套。
              </li>
              <li>
                <b>鞋子：</b>
                多段步道可能有砂地、碎石或結冰。請穿抓地力良好的健行鞋，並準備可套在鞋底的防滑裝備。
              </li>
              <li>
                <b>飲水與食物：</b>每天出發前請帶足飲水、簡單午餐與行動糧。
              </li>
              <li>
                <b>隨身裝備：</b>
                建議攜帶小型背包、頭燈、防曬用品、行動電源與可離線查看的行程。山區部分路段可能沒有訊號。
              </li>
              <li>
                <b>Ken’s Tours：</b>
                導覽禁止攜帶背包、腰包、補水背包、自拍棒與 GoPro；報到時需出示有照片的身分證件及訂位使用的信用卡。可攜帶水。
              </li>
            </ul>
          </div>
        </section>

        <div className="footer-line">
          <span>
            TRAVEL JOURNAL <span className="footer-star">✳</span> 2026 SOUTHWEST
          </span>
          <a href="#travel">BACK TO TRAVEL ↗</a>
        </div>
        <p className="endnote">更新日期：2026/11/07</p>
      </main>
    </div>
  );
}
