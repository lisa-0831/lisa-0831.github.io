import rawDays from "./itinerary.json";

export type TripEvent = [string, string, string];

export type TripDay = {
  date: string;
  day: string;
  num: string;
  title: string;
  region: string;
  stay: string;
  events: TripEvent[];
  points: string[];
};

export const days = rawDays as TripDay[];

export const places = [
  {
    src: "/travel/plans/2026-fall-southwest/photos/gc-mather.jpg",
    alt: "Grand Canyon South Rim，Mather Point 望進峽谷",
    badge: "DAY 02",
    title: "Grand Canyon",
    caption: "Mather Point · 11/21",
    region: "Arizona",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/gc-sunset.jpg",
    alt: "Grand Canyon South Rim 夕陽照在岩層上",
    badge: "DAY 02",
    title: "Grand Canyon",
    caption: "South Rim 夕陽 · 11/21",
    region: "Arizona",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/antelope.jpg",
    alt: "羚羊谷裡層層的砂岩",
    badge: "DAY 03",
    title: "Antelope Canyon",
    caption: "Ken’s · 11/22",
    region: "Arizona",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/antelope-light.jpg",
    alt: "下羚羊谷岩壁間的光束",
    badge: "DAY 03",
    title: "Antelope Canyon",
    caption: "Lower Antelope · 11/22",
    region: "Arizona",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/horseshoe.jpg",
    alt: "Horseshoe Bend，科羅拉多河在紅色岩壁間轉彎",
    badge: "DAY 03",
    title: "Horseshoe Bend",
    caption: "Page · 11/22",
    region: "Arizona",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/horseshoe-winter.jpg",
    alt: "冬天的 Horseshoe Bend 與科羅拉多河",
    badge: "DAY 03",
    title: "Horseshoe Bend",
    caption: "Page · 11/22",
    region: "Arizona",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/bryce.jpg",
    alt: "Bryce Canyon 傍晚的紅色岩柱與松林",
    badge: "DAY 04",
    title: "Bryce Canyon",
    caption: "夕陽 · 11/23",
    region: "Utah",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/bryce-hoodoos.jpg",
    alt: "Bryce Canyon 的 hoodoo 岩柱",
    badge: "DAY 05",
    title: "Bryce Canyon",
    caption: "健行 · 11/24",
    region: "Utah",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/zion-overlook.jpg",
    alt: "Zion Canyon Overlook 的砂岩層理",
    badge: "DAY 05",
    title: "Zion",
    caption: "Canyon Overlook · 11/24",
    region: "Utah",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/zion-canyon.jpg",
    alt: "Zion 的紅色砂岩與沙漠植物",
    badge: "DAY 06",
    title: "Zion",
    caption: "峽谷健行 · 11/25",
    region: "Utah",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/vof-1.jpg",
    alt: "Valley of Fire 的紅色砂岩",
    badge: "DAY 08",
    title: "Valley of Fire",
    caption: "11/27",
    region: "Nevada",
  },
  {
    src: "/travel/plans/2026-fall-southwest/photos/vof-2.jpg",
    alt: "Valley of Fire 的紅岩與沙漠",
    badge: "DAY 08",
    title: "Valley of Fire",
    caption: "11/27",
    region: "Nevada",
  },
] as const;

export const loopPoints = [
  "Las Vegas, NV",
  "Grand Canyon South Rim, Arizona",
  "Lower Antelope Canyon, Page, Arizona",
  "Bryce Canyon National Park, Utah",
  "Zion National Park, Utah",
  "Las Vegas, NV",
];

export const cities = {
  LAS: { x: 85, y: 278, name: "LAS VEGAS" },
  VOF: { x: 144, y: 224, name: "VALLEY OF FIRE" },
  GC: { x: 472, y: 296, name: "GRAND CANYON" },
  PAGE: { x: 594, y: 185, name: "PAGE" },
  BRYCE: { x: 470, y: 62, name: "BRYCE" },
  ZION: { x: 338, y: 142, name: "ZION" },
} as const;

export type CityId = keyof typeof cities;

export const schematicDays: CityId[][] = [
  ["LAS"],
  ["LAS", "GC"],
  ["GC", "PAGE"],
  ["PAGE", "BRYCE"],
  ["BRYCE", "ZION"],
  ["ZION"],
  ["ZION", "LAS"],
  ["LAS", "VOF"],
  ["LAS"],
  ["LAS"],
];

export const schematicRoutes: [CityId, CityId][] = [
  ["LAS", "GC"],
  ["GC", "PAGE"],
  ["PAGE", "BRYCE"],
  ["BRYCE", "ZION"],
  ["ZION", "LAS"],
  ["LAS", "VOF"],
];

export function routeLink(points: string[]) {
  const params = new URLSearchParams({
    api: "1",
    origin: points[0],
    destination: points[points.length - 1],
    travelmode: "driving",
  });
  if (points.length > 2) params.set("waypoints", points.slice(1, -1).join("|"));
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export function embedLink(points: string[]) {
  const url = new URL("https://maps.google.com/maps");
  url.searchParams.set("f", "d");
  url.searchParams.set("hl", "zh-TW");
  url.searchParams.set("saddr", points[0]);
  url.searchParams.set(
    "daddr",
    points.length > 2 ? points.slice(1).join(" to:") : points[points.length - 1],
  );
  url.searchParams.set("output", "embed");
  return url.toString();
}

export function shortStop(value: string) {
  return value
    .replace(
      "Atwell Suites Henderson, 150 S Water St, Henderson, NV 89015",
      "Atwell Suites Henderson",
    )
    .replace("Grand Canyon Visitor Center, Grand Canyon Village, AZ", "Grand Canyon Visitor Center")
    .replace("Grand Canyon Oasis, 28272 N US Highway 89, Flagstaff, AZ 86004", "Grand Canyon Oasis")
    .replace("Fire Wave Trailhead, Valley of Fire State Park, NV", "Fire Wave")
    .replace("White Domes Trailhead, Valley of Fire State Park, NV", "White Domes")
    .replace("Canyon Overlook Trailhead, Zion National Park, UT", "Canyon Overlook")
    .replace("Virgin Hotels Las Vegas, 4455 Paradise Rd, Las Vegas, NV 89169", "Virgin Hotels")
    .replace("Harry Reid International Airport Terminal 3, Las Vegas, NV", "LAS Terminal 3")
    .replace(
      "Best Western Plus Ruby's Inn, 26 S Main St, Bryce Canyon City, UT 84764",
      "Ruby's Inn",
    )
    .replace("Confluence Park, La Verkin, UT", "La Verkin")
    .replace(/,? (Grand Canyon National Park|Las Vegas|Springdale),? (AZ|NV|UT)/g, "")
    .replace(/, (Arizona|Utah|Nevada)/g, "")
    .replace(/, (AZ|NV|UT)$/, "")
    .replace("Harry Reid International Airport", "LAS 機場")
    .replace("Bellagio Conservatory & Botanical Gardens", "Bellagio")
    .replace("The Venetian Resort Las Vegas", "Venetian")
    .replace("The STRAT Hotel Casino", "STRAT")
    .replace("Yavapai Geology Museum", "Yavapai Museum")
    .replace("Zion Canyon Visitor Center", "Zion Visitor Center")
    .replace("Canyon Overlook Trailhead", "Canyon Overlook");
}

export type MealSlot = {
  label: "早餐" | "午餐" | "晚餐";
  time: string;
  place: string;
};

export type DayMeals = {
  date: string;
  day: string;
  num: string;
  slots: [MealSlot, MealSlot, MealSlot];
};

export const meals: DayMeals[] = [
  {
    date: "11/20",
    day: "FRI",
    num: "01",
    slots: [
      { label: "早餐", time: "出發前", place: "紐約。傍晚才去機場，早餐在紐約自己解決" },
      { label: "午餐", time: "出發前", place: "紐約。行程沒有另排" },
      { label: "晚餐", time: "19:50 前", place: "JFK Terminal 5，或機上。22:45 到了就去飯店休息" },
    ],
  },
  {
    date: "11/21",
    day: "SAT",
    num: "02",
    slots: [
      { label: "早餐", time: "06:00 出門前", place: "帶走。紐約先買，或 Jason 在 Vegas 代買，車上吃" },
      { label: "午餐", time: "約 11:30–12:15", place: "Grand Canyon Visitor Center" },
      { label: "晚餐", time: "晚上抵達後", place: "Stargazer Tiny Home，Grand Canyon Oasis" },
    ],
  },
  {
    date: "11/22",
    day: "SUN",
    num: "03",
    slots: [
      { label: "早餐", time: "途中，或 09:30–10:30", place: "US-89 沿路，或抵達 Page 後" },
      { label: "午餐", time: "14:00–15:00", place: "Page。導覽結束後" },
      { label: "晚餐", time: "傍晚入住後", place: "The Coyote Cottage，Page" },
    ],
  },
  {
    date: "11/23",
    day: "MON",
    num: "04",
    slots: [
      { label: "早餐", time: "07:00 出發前", place: "The Coyote Cottage，Page" },
      { label: "午餐", time: "約 11:00–11:45", place: "Sunrise Point。簡單午餐，建議自備" },
      { label: "晚餐", time: "晚上入住後", place: "Ruby's Inn，Bryce Canyon City" },
    ],
  },
  {
    date: "11/24",
    day: "TUE",
    num: "05",
    slots: [
      { label: "早餐", time: "10:00 出發前", place: "Ruby's Inn，Bryce Canyon City" },
      { label: "午餐", time: "12:00–13:00", place: "Canyon Overlook Trailhead。簡單午餐，建議自備" },
      { label: "晚餐", time: "16:00 入住後", place: "沙漠綠洲，La Verkin" },
    ],
  },
  {
    date: "11/25",
    day: "WED",
    num: "06",
    slots: [
      { label: "早餐", time: "06:15 出發前", place: "沙漠綠洲帶走，車上吃" },
      { label: "午餐", time: "11:00 之後", place: "Zion，Visitor Center 附近" },
      { label: "晚餐", time: "約 16:15 回到後", place: "沙漠綠洲，La Verkin。行程沒有另約餐廳" },
    ],
  },
  {
    date: "11/26",
    day: "THU",
    num: "07",
    slots: [
      { label: "早餐", time: "09:00–10:00", place: "沙漠綠洲。退房前" },
      { label: "午餐", time: "車程中", place: "回 Las Vegas 的路上，或抵達 Virgin Hotels 後" },
      { label: "晚餐", time: "傍晚", place: "感恩節晚餐。餐廳與時間待確認" },
    ],
  },
  {
    date: "11/27",
    day: "FRI",
    num: "08",
    slots: [
      { label: "早餐", time: "07:00 出發前", place: "Virgin Hotels，或帶走" },
      { label: "午餐", time: "12:00–13:00", place: "Valley of Fire 野餐區，或車上" },
      { label: "晚餐", time: "晚上", place: "Las Vegas。回到 Virgin Hotels 後自由活動" },
    ],
  },
  {
    date: "11/28",
    day: "SAT",
    num: "09",
    slots: [
      { label: "早餐", time: "上午出門前", place: "Virgin Hotels" },
      { label: "午餐", time: "上午", place: "The Venetian 館內" },
      { label: "晚餐", time: "傍晚", place: "Strip。Bellagio 噴泉之後，餐廳未定" },
    ],
  },
  {
    date: "11/29",
    day: "SUN",
    num: "10",
    slots: [
      { label: "早餐", time: "上午退房前", place: "Virgin Hotels" },
      { label: "午餐", time: "白天", place: "Las Vegas。自由活動，地點未定" },
      { label: "晚餐", time: "23:59 起飛前", place: "Las Vegas 或 LAS Terminal 3。集合時間待確認" },
    ],
  },
];

export function planText(tripDays: TripDay[]) {
  return tripDays
    .map(
      (day) =>
        `${day.date} (${day.day})｜${day.title}\n` +
        day.events
          .map((event) => `- ${event[0]}：${event[1]}${event[2] ? `（${event[2]}）` : ""}`)
          .join("\n") +
        `\n住宿：${day.stay}`,
    )
    .join("\n\n");
}

export function staysCsv(tripDays: TripDay[]) {
  const quote = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const rows: (string | number)[][] = [
    ["日期", "住宿城市／鄉鎮", "晚數"],
    ...tripDays.filter((day) => day.stay !== "無，返程日").map((day) => [day.date, day.stay, 1]),
  ];
  return rows.map((row) => row.map(quote).join(",")).join("\r\n");
}
