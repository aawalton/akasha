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
import { getPages } from "@akasha/temper-addon-data/addon-data-page-rows"
import { ADDON_DATA_SECTIONS } from "@akasha/temper-addon-data/addon-data-writes"
import { withSidecars } from "@akasha/temper-addon-data/catalog-sidecars"
import { fetchMinedRestorePotions } from "@akasha/temper-addon-data/mined-restore-potions"
import type { Page } from "@akasha/temper-addon-generators/addon-data-page"

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
    unread.push(`${slug} — ${(String(e).split("\n")[0] ?? "").slice(0, 160)}`)
    const answer = { rows: [] as readonly Page[] }
    held.set(slug, answer)
    return answer
  }
}

// Every accessor AddonDataPages carries, and the page type each reads. Derived
// from the addon-data-pages module so a generator can never be left out of this report.
//
// It drifted once and that is why this checks itself: nine accessors were absent, all nine of
// them the completion section's, and the section threw on the first one. A section reported as
// throwing when the pipeline feeds it fine is a fault the harness has and its subject does not,
// and it reads exactly like a real one. So the table is held against the accessors
// AddonDataPages declares, and a gap stops the run instead of colouring one section red.
const SOURCE = JSON.parse(
  readFileSync(new URL("./addon-data-proof-sources.json", import.meta.url), "utf8")
) as Record<string, string>

const DECLARED_AT =
  "../akasha/temper/temper-addon-data/addon-data-pages/addon-data-pages.module.code.ts"

const DECLARED = [
  ...readFileSync(new URL(DECLARED_AT, import.meta.url), "utf8").matchAll(
    /^ {2}([a-zA-Z]+): PageResult$/gm
  ),
].map((one) => one[1] as string)

if (DECLARED.length === 0) {
  throw new Error(`${DECLARED_AT} declares no PageResult accessor, so this reads nothing`)
}

function gapIn(table: Readonly<Record<string, string>>): readonly string[] {
  return DECLARED.filter((one) => table[one] === undefined)
}

// The self-check below caught a real gap of nine accessors and had no control of its own, so it
// was proven only by the fault it happened to catch. This is that control: one accessor is taken
// off a copy of the table and the gap has to be seen. A self-check blind to a gap it was handed
// reads exactly like one with nothing to report.
const DROPPED = DECLARED[0] as string
const CONTROL: Record<string, string> = { ...SOURCE }
delete CONTROL[DROPPED]
const SEEN = gapIn(CONTROL)
if (SEEN.length !== 1 || SEEN[0] !== DROPPED) {
  throw new Error(
    `the accessor self-check was handed a table missing \`${DROPPED}\` and answered ` +
      `${SEEN.length} gap(s) as ${SEEN.join(", ") || "none"}, so it cannot see what it is for`
  )
}

const UNTABLED = gapIn(SOURCE)
if (UNTABLED.length > 0) {
  throw new Error(
    `addon-data-proof-sources.json misses ${UNTABLED.length} of the ${DECLARED.length} accessors ` +
      `AddonDataPages declares, so every section reading one would throw here and nowhere else: ` +
      UNTABLED.join(", ")
  )
}
console.log(
  `accessor self-check: ${DECLARED.length} declared, ${UNTABLED.length} untabled, ` +
    `control saw the 1 gap seeded into it`
)

const pages: Record<string, unknown> = {}
for (const [accessor, slug] of Object.entries(SOURCE)) pages[accessor] = await rowsOf(slug)

// The sweep's restore potions are no page type's rows, so they come the way
// fetchAddonDataPages takes them rather than out of the accessor table.
try {
  pages.minedRestorePotions = await fetchMinedRestorePotions()
} catch (e) {
  unread.push(`mined restore potions — ${(String(e).split("\n")[0] ?? "").slice(0, 160)}`)
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
