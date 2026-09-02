// Answers, for every file `ops temper addon-data generate` emits, whether that
// file regenerates byte-identical from the live pages.
//
// It runs the REAL write table with a `w` that compares instead of writing, so
// it cannot drift from what generate does. Where a section throws, the throw is
// the answer: a generator reads something its page type no longer carries.
//
// `buildAddonDataWrites` flatMaps the table, so the first synchronous throw
// would hide every later section. This drives the sections one at a time for
// that reason, and reports each one whether its neighbours stood or fell.
//
// Name one or more section names as arguments to narrow the run.
import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Page } from "@akasha/temper-addon-generators/addon-data-page"
import { withSidecars } from "./lib/temper-addon-data/catalog-sidecars.ts"
import { fetchMinedRestorePotions } from "./lib/temper-addon-data/mined-restore-potions.ts"
import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
import { ADDON_DATA_SECTIONS } from "./lib/temper-addon-data/writes.ts"

const ONLY = new Set(process.argv.slice(2))

const held = new Map<string, { rows: readonly Page[] }>()
const unread: string[] = []

async function rowsOf(slug: string): Promise<{ rows: readonly Page[] }> {
  const already = held.get(slug)
  if (already !== undefined) return already
  try {
    const got = await getPages({ pageTypeSlug: slug, limit: 5000 })
    const answer = { rows: withSidecars(slug, got.rows) }
    held.set(slug, answer)
    return answer
  } catch (e) {
    unread.push(`${slug} — ${String(e).split("\n")[0].slice(0, 160)}`)
    const answer = { rows: [] as readonly Page[] }
    held.set(slug, answer)
    return answer
  }
}

// Every accessor AddonDataPages carries, and the page type each reads. Derived
// from addon-data-pages.ts so a generator can never be left out of this report.
const SOURCE = JSON.parse(
  readFileSync(new URL("./addon-data-proof-sources.json", import.meta.url), "utf8")
) as Record<string, string>

const pages: Record<string, unknown> = {}
for (const [accessor, slug] of Object.entries(SOURCE)) pages[accessor] = await rowsOf(slug)

// The sweep's restore potions are no page type's rows, so they come the way
// fetchAddonDataPages takes them rather than out of the accessor table.
try {
  pages.minedRestorePotions = await fetchMinedRestorePotions()
} catch (e) {
  unread.push(`mined restore potions — ${String(e).split("\n")[0].slice(0, 160)}`)
  pages.minedRestorePotions = []
}

type Answer = { section: string; name: string; verdict: string; disk: number; made: number }
const answers: Answer[] = []
const threw: string[] = []
let section = ""

const compare = async (dir: string, name: string, source: string): Promise<number> => {
  const at = resolve(dir, name)
  const onDisk = existsSync(at) ? readFileSync(at, "utf8") : null
  const verdict = onDisk === null ? "ABSENT" : onDisk === source ? "SAME" : "DIFF"
  answers.push({ section, name, verdict, disk: onDisk?.length ?? 0, made: source.length })
  return source.length
}

function said(when: string, e: unknown): void {
  const error = e as Error
  const why = (error?.message ?? String(e)).replace(/\s+/g, " ").slice(0, 700)
  const frames = (error?.stack ?? "")
    .split("\n")
    .filter((line) => line.includes("    at "))
    .slice(0, 8)
    .map((line) => `      ${line.trim()}`)
  threw.push([`${section} — ${when} ${error?.name}: ${why}`, ...frames].join("\n"))
}

for (const [name, build] of ADDON_DATA_SECTIONS) {
  if (ONLY.size > 0 && !ONLY.has(name)) continue
  section = name
  let built: readonly Promise<number>[] = []
  try {
    built = build(pages as never, compare)
  } catch (e) {
    said("building", e)
    continue
  }
  for (const one of built) {
    try {
      await one
    } catch (e) {
      said("writing", e)
    }
  }
}

let last = ""
for (const one of answers) {
  if (one.section !== last) {
    console.log(`\n### ${one.section}`)
    last = one.section
  }
  console.log(
    `  ${one.verdict.padEnd(6)} ${one.name.padEnd(48)} disk=${String(one.disk).padStart(8)} made=${String(one.made).padStart(8)}`
  )
}
const tally = (v: string): number => answers.filter((one) => one.verdict === v).length
console.log(
  `\nSAME ${tally("SAME")}   DIFF ${tally("DIFF")}   ABSENT ${tally("ABSENT")}   sections that threw ${threw.length}`
)
for (const one of threw) console.log(`\n  THREW ${one}`)
if (unread.length > 0) {
  console.log(`\npage types the store would not answer (${unread.length}):`)
  for (const one of unread) console.log(`  ${one}`)
}
