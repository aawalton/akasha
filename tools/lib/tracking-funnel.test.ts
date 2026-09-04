// The decisive test of this scanner is a fixture rather than a live run. A live run answers what
// the checkout happens to hold today; a fixture answers whether the rule can see the shape at all.
// Both known escapes are built here from the source they actually had, and the boundary that keeps
// the naming closure from flooding is built here too — because a rule strong enough to catch them
// is a rule strong enough to make a namer of half the tree, and the fixture that proves it does
// not is worth as much as the two that prove it does.
import { expect, test } from "bun:test"
import { type Corpus, readingOf } from "./tracking-funnel.ts"

/**
 * A checkout in memory. `files` is the population; `outside` is in the checkout and read for its
 * names, exactly as `akasha/` is, without ever being weighed.
 */
function corpusOfFixture(
  files: Record<string, string>,
  exports: Record<string, string> = {},
  outside: Record<string, string> = {}
): Corpus {
  const all: Record<string, string> = { ...outside, ...files }
  return {
    files: Object.keys(files).sort(),
    unread: [],
    read: (relPath) => {
      const held = all[relPath]
      if (held === undefined) throw new Error(`no fixture file at ${relPath}`)
      return held
    },
    holds: (relPath) => all[relPath] !== undefined,
    exports: new Map(Object.entries(exports)),
  }
}

const CLIENT = "export function askComposed() {}\nexport function pageLanding() {}\n"

test("a file that spells no day and takes no verb is not a finding", () => {
  const reading = readingOf(
    corpusOfFixture({
      "tools/lib/page-query-client.ts": CLIENT,
      "tools/lib/plain.ts": 'import { askComposed } from "./page-query-client.ts"\n',
    })
  )
  expect(reading.bypasses).toEqual([])
  expect(reading.coverage).toBe("complete")
})

// ── escape one: the name lives in a workspace package, one import away ──────────────────────────
// `readouts/surplus-reading.ts` held `askComposed` and handed it to `fetchSurplusHours`, which
// composed its own `daily-tracking` query. Nothing in the file spelled a day. It was found by
// hand. The import lines below are the ones it carried before it was repaired, and the export map
// is the one `akasha/readout-system/package.json` really states.
// The file itself was carried into akasha on 2026-09-03 and now lives at
// `akasha/alan/harness/surplus/reading/surplus-reading.module.code.ts`, so the path keyed below
// names no file on disk. It stays spelled the old way on purpose: `NOT_WEIGHED_TREES` holds
// `akasha` out of the population, so a fixture keyed on the carried path would assert a finding
// `filesUnder` can never produce, and the last test in this file exists to deny exactly that.
const PRE_REPAIR_SURPLUS_READING = `import { getEsoDayStr } from "@akasha/day/eso-day"
import { keepReading } from "@akasha/readout-system/readout-reading"
import { fetchSurplusHours } from "@akasha/readout-system/upkeep-surplus"
import { askComposed } from "../tools/lib/page-query-client.ts"

export async function takeReading(now: Date): Promise<number | null> {
  return await fetchSurplusHours(askComposed, getEsoDayStr(now))
}
`

const UPKEEP_SURPLUS = `const DAY = "daily-tracking"
export async function fetchSurplusHours(ask: unknown, dayStr: string): Promise<number | null> {
  return null
}
`

test("the name reaches through a workspace package export, which is escape one", () => {
  const reading = readingOf(
    corpusOfFixture(
      {
        "tools/lib/page-query-client.ts": CLIENT,
        "readouts/surplus-reading.ts": PRE_REPAIR_SURPLUS_READING,
      },
      {
        "@akasha/readout-system/upkeep-surplus":
          "akasha/readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.code.ts",
      },
      {
        "akasha/readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.code.ts":
          UPKEEP_SURPLUS,
      }
    )
  )
  const found = reading.bypasses.filter((one) => one.path === "readouts/surplus-reading.ts")
  expect(found.length).toBe(1)
  expect(found[0]?.kind).toBe("read")
  expect(found[0]?.named.how).toBe("delegate")
  expect(found[0]?.named.from).toBe(
    "akasha/readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.code.ts"
  )
})

test("without the export map the package is opaque and escape one goes through", () => {
  // Not a wish: this is what the scanner did until the map was read. `moduleOf` keeps the package
  // whole on purpose, and the specifier says nothing about which file holds the literal.
  const reading = readingOf(
    corpusOfFixture(
      {
        "tools/lib/page-query-client.ts": CLIENT,
        "readouts/surplus-reading.ts": PRE_REPAIR_SURPLUS_READING,
      },
      {},
      {
        "akasha/readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.code.ts":
          UPKEEP_SURPLUS,
      }
    )
  )
  expect(reading.bypasses).toEqual([])
})

test("the repaired shape, asking the funnel for its day, is not a finding", () => {
  const reading = readingOf(
    corpusOfFixture(
      {
        "tools/lib/page-query-client.ts": CLIENT,
        "tools/lib/tracking/day-place.ts":
          'import { askComposed } from "../page-query-client.ts"\n' +
          'export const DAILY_TRACKING = "daily-tracking"\n' +
          "export async function askDayByDate(dayStr: string) { return askComposed() }\n",
        "readouts/surplus-reading.ts":
          'import { surplusIn } from "@akasha/readout-system/upkeep-surplus"\n' +
          'import { askDayByDate } from "../tools/lib/tracking/day-place.ts"\n' +
          "export async function takeReading(dayStr: string) {\n" +
          "  return surplusIn(await askDayByDate(dayStr))\n}\n",
      },
      {
        "@akasha/readout-system/upkeep-surplus":
          "akasha/readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.code.ts",
      },
      {
        "akasha/readout-system/readouts/pages/upkeep-surplus/upkeep-surplus.readout.code.ts":
          UPKEEP_SURPLUS,
      }
    )
  )
  expect(reading.bypasses).toEqual([])
})

// ── escape two: the day page type under another name, through a barrel ──────────────────────────
// `tools/lib/daily-tracking/value-points.ts` took the page type as `DAILY_TRACKING_PAGE_TYPE_SLUG`
// from `daily-row.ts` while taking `askingFor` from the service. It surfaced only because a lane
// deleted the file it was hiding behind. The barrel here renames it a second time, because the
// rename is the thing the old text search could not follow and one rename is no harder than two.
test("the day page type renamed twice through a barrel, which is escape two", () => {
  const reading = readingOf(
    corpusOfFixture({
      "tools/lib/page-query-client.ts": CLIENT,
      "tools/lib/rows/daily-row.ts":
        'export const DAILY_TRACKING_PAGE_TYPE_SLUG = "daily-tracking"\n',
      "tools/lib/rows/modules.ts":
        'export { DAILY_TRACKING_PAGE_TYPE_SLUG as THE_DAY_TYPE } from "./daily-row.ts"\n',
      // `askingFor` off the service package, which is the road `value-points.ts` really took, and
      // which is a road with no file behind it — the specifier is the whole of the evidence.
      "tools/lib/rows/value-points.ts":
        'import { THE_DAY_TYPE } from "./modules.ts"\n' +
        'import { askingFor } from "@akasha/pages-system-service/calling"\n' +
        "export async function points() { return askingFor() }\n",
    })
  )
  const found = reading.bypasses.filter((one) => one.path === "tools/lib/rows/value-points.ts")
  expect(found.length).toBe(1)
  expect(found[0]?.kind).toBe("read")
  expect(found[0]?.named.how).toBe("carrier")
  expect(found[0]?.named.from).toBe("tools/lib/rows/modules.ts")
})

test("a day page type assigned on from an imported name is still carried", () => {
  const reading = readingOf(
    corpusOfFixture({
      "tools/lib/page-query-client.ts": CLIENT,
      "tools/lib/rows/one.ts": 'export const A = "session-tracking"\n',
      "tools/lib/rows/two.ts": 'import { A } from "./one.ts"\nexport const B = A\n',
      "tools/lib/rows/three.ts":
        'import { B } from "./two.ts"\n' +
        'import { pageLanding } from "../page-query-client.ts"\n' +
        "export function land() { return pageLanding() }\n",
    })
  )
  const found = reading.bypasses.filter((one) => one.path === "tools/lib/rows/three.ts")
  expect(found.length).toBe(1)
  expect(found[0]?.kind).toBe("write")
  expect(found[0]?.named.how).toBe("carrier")
})

// ── the boundary: a rule this strong has to be stopped somewhere ────────────────────────────────
// `WRITER = "daily-tracking"` is the git author a points write lands under. Travelling the name out
// of the barrel that holds it made namers of 167 files under `tools/` against an honest 21, and
// turned one finding into 77. All 76 were this.
test("a binding that spells a day slug meaning a git author is not a day page type", () => {
  const reading = readingOf(
    corpusOfFixture({
      "tools/lib/page-query-client.ts": CLIENT,
      "tools/lib/points/modules.ts": 'export const WRITER = "daily-tracking"\n',
      "tools/lib/points/totals.ts":
        'import { WRITER } from "./modules.ts"\n' +
        'import { pageLanding } from "../page-query-client.ts"\n' +
        "export function land() { return pageLanding() }\n",
    })
  )
  expect(reading.bypasses).toEqual([])
})

test("the naming closure does not travel through the funnel itself", () => {
  // Taking `dayPlaceOf` off the funnel is what every caller is supposed to do. If the funnel were
  // a road for the name, asking it would be the finding and the check would refuse its own remedy.
  const reading = readingOf(
    corpusOfFixture({
      "tools/lib/page-query-client.ts": CLIENT,
      "tools/lib/tracking/day-place.ts":
        'export const DAILY_TRACKING = "daily-tracking"\n' +
        "export function dayPlaceOf(dayStr: string) { return dayStr }\n",
      "tools/lib/asks-the-funnel.ts":
        'import { dayPlaceOf } from "./tracking/day-place.ts"\n' +
        'import { askComposed } from "./page-query-client.ts"\n' +
        "export function ask(dayStr: string) { return dayPlaceOf(dayStr) && askComposed() }\n",
    })
  )
  expect(reading.bypasses).toEqual([])
})

test("the delegate rule travels one hop and no further", () => {
  // Unbounded, this is the rule that floods: anything that transitively touches a module that
  // mentions a day becomes a namer. `far.ts` is two hops off the module that spells the day.
  const reading = readingOf(
    corpusOfFixture({
      "tools/lib/page-query-client.ts": CLIENT,
      "tools/lib/chain/spells.ts":
        'const DAY = "daily-tracking"\nexport function one() { return DAY }\n',
      "tools/lib/chain/near.ts":
        'import { one } from "./spells.ts"\n' +
        'import { askComposed } from "../page-query-client.ts"\n' +
        "export function two() { return one() && askComposed() }\n",
      "tools/lib/chain/far.ts":
        'import { two } from "./near.ts"\n' +
        'import { askComposed } from "../page-query-client.ts"\n' +
        "export function three() { return two() && askComposed() }\n",
    })
  )
  expect(reading.namers).toContain("tools/lib/chain/near.ts")
  expect(reading.namers).not.toContain("tools/lib/chain/far.ts")
  expect(reading.bypasses.map((one) => one.path)).toEqual(["tools/lib/chain/near.ts"])
})

// ── fail closed ─────────────────────────────────────────────────────────────────────────────────
test("a file that cannot be read is an unread, and coverage says so", () => {
  const reading = readingOf({
    files: ["tools/lib/gone.ts"],
    unread: [],
    read: () => {
      throw new Error("EACCES")
    },
    holds: () => true,
    exports: new Map(),
  })
  expect(reading.unread.length).toBe(1)
  expect(reading.coverage).toBe("truncated")
  expect(reading.weighed).toEqual([])
})

test("a folder that could not be listed carries through to coverage", () => {
  const reading = readingOf({
    files: [],
    unread: [{ path: "tools/lib/locked", why: "could not be listed: EACCES" }],
    read: () => "",
    holds: () => false,
    exports: new Map(),
  })
  expect(reading.coverage).toBe("truncated")
  expect(reading.scanned).toEqual([])
})

test("coverage is derived from what was read rather than asserted", () => {
  const reading = readingOf(corpusOfFixture({ "tools/lib/one.ts": "export const a = 1\n" }))
  expect(reading.coverage).toBe("complete")
  expect(reading.weighed).toEqual(["tools/lib/one.ts"])
})

// ── the population ──────────────────────────────────────────────────────────────────────────────
test("a file under a tree held out of the population is read but never a finding", () => {
  // akasha's own files reach the store and spell day page types. They cannot import the funnel, so
  // the remedy every finding names is impossible there; they are graph, not population.
  const reading = readingOf(
    corpusOfFixture(
      {
        "tools/lib/page-query-client.ts": CLIENT,
        "readouts/reads-it.ts":
          'import { fetchIt } from "@akasha/somewhere/day"\n' +
          'import { askComposed } from "../tools/lib/page-query-client.ts"\n' +
          "export function take() { return fetchIt(askComposed) }\n",
      },
      { "@akasha/somewhere/day": "akasha/somewhere/day.code.ts" },
      {
        "akasha/somewhere/day.code.ts":
          'const DAY = "daily-tracking"\nexport function fetchIt(ask: unknown) { return DAY }\n',
      }
    )
  )
  expect(reading.graph).toContain("akasha/somewhere/day.code.ts")
  expect(reading.bypasses.map((one) => one.path)).toEqual(["readouts/reads-it.ts"])
})
