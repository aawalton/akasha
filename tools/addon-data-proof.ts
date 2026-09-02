// Answers, for every file `ops temper addon-data generate` emits, whether that
// file regenerates byte-identical from the live pages.
//
// It runs the REAL write table with a `w` that compares instead of writing, so
// it cannot drift from what generate does. Where a generator throws, the throw
// is the answer: its page type no longer carries what it reads.
//
// The sidecar rows the catalog carries moved out of the page store and into
// `<page>.<page-type>.<key>.jsonl` files beside each page, and their keys moved
// from kebab to camel with `type`/`value` standing for `effect-type`/`effect-value`.
// SIDECAR_KEYS below is that translation, and every DIFF it would cause shows up
// in this report rather than in a silently wrong table.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join, resolve } from "node:path"
import type { Page } from "@akasha/temper-addon-generators/addon-data-page"
import { withSidecars } from "./lib/temper-addon-data/catalog-sidecars.ts"
import { getPages } from "./lib/temper-addon-data/pages-bridge.ts"
import { ADDON_DATA_SECTIONS } from "./lib/temper-addon-data/writes.ts"

const ROOT = "/var/home/walton/repos/akasha"
const CATALOG = join(ROOT, "akasha/temper")

// jsonl key -> the key the shapers in catalog-sidecars.ts read
const SIDECAR_KEYS: Readonly<Record<string, string>> = {
  metricId: "metric-id",
  type: "effect-type",
  value: "effect-value",
  seconds: "effect-seconds",
  scriptId: "script-id",
  classId: "class-id",
}

type Values = Record<string, unknown>
type Held = { readonly at: number; readonly values: Values }

function translated(row: Values): Values {
  const out: Values = {}
  for (const [k, v] of Object.entries(row)) {
    out[SIDECAR_KEYS[k] ?? k] = v
    // `quality` and `value` are read under those names by flatQualityOf and
    // metricQualityOf, so keep the original spelling alongside the translation.
    if (k === "value") out.value = v
  }
  return out
}

const sidecars = new Map<string, Held[]>()
function collect(dir: string): void {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      collect(full)
      continue
    }
    if (!name.endsWith(".jsonl")) continue
    const bits = name.slice(0, -6).split(".")
    if (bits.length !== 3) continue
    const [named, pageType, key] = bits
    const held = readFileSync(full, "utf8")
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line, at) => ({ at, values: translated(JSON.parse(line) as Values) }))
    sidecars.set(`${pageType} ${named} ${key}`, held)
  }
}
collect(CATALOG)

const held = new Map<string, { rows: readonly Page[] }>()
const unread: string[] = []

async function rowsOf(slug: string, select?: readonly string[]): Promise<{ rows: readonly Page[] }> {
  const already = held.get(slug)
  if (already !== undefined) return already
  try {
    const got = await getPages({ pageTypeSlug: slug, limit: 5000, ...(select ? { select } : {}) })
    const answer = { rows: withSidecars(slug, got.rows, sidecars as never) }
    held.set(slug, answer)
    return answer
  } catch (e) {
    unread.push(`${slug} — ${String(e).split("\n")[0].slice(0, 120)}`)
    const answer = { rows: [] as readonly Page[] }
    held.set(slug, answer)
    return answer
  }
}

// Every accessor AddonDataPages carries, and the page type each reads. Derived
// from addon-data-pages.ts so a generator can never be left out of this report.
const SOURCE = JSON.parse(readFileSync(join(import.meta.dirname, "addon-data-proof-sources.json"), "utf8")) as Record<string, string>

const pages: Record<string, { rows: readonly Page[] }> = {}
for (const [accessor, slug] of Object.entries(SOURCE)) {
  pages[accessor] = await rowsOf(slug)
}

type Answer = { name: string; dir: string; verdict: string; disk: number; made: number }
const answers: Answer[] = []

const compare = async (dir: string, name: string, source: string): Promise<number> => {
  const at = resolve(dir, name)
  const onDisk = existsSync(at) ? readFileSync(at, "utf8") : null
  const verdict = onDisk === null ? "ABSENT" : onDisk === source ? "SAME" : "DIFF"
  answers.push({ name, dir, verdict, disk: onDisk?.length ?? 0, made: source.length })
  return source.length
}

const threw: string[] = []
for (const [section, build] of ADDON_DATA_SECTIONS) {
  let built: readonly Promise<number>[] = []
  try {
    built = build(pages as never, compare)
  } catch (e) {
    threw.push(`${section} — ${String(e).split("\n").slice(0, 3).join(" ").slice(0, 220)}`)
    continue
  }
  for (const one of built) {
    try {
      await one
    } catch (e) {
      threw.push(`${section} — ${String(e).split("\n")[0].slice(0, 220)}`)
    }
  }
}

answers.sort((a, b) => a.name.localeCompare(b.name))
for (const one of answers) {
  console.log(`${one.verdict.padEnd(6)} ${one.name.padEnd(46)} disk=${String(one.disk).padStart(7)} made=${String(one.made).padStart(7)}`)
}
const tally = (v: string): number => answers.filter((one) => one.verdict === v).length
console.log(`\nSAME ${tally("SAME")}   DIFF ${tally("DIFF")}   ABSENT ${tally("ABSENT")}   threw ${threw.length}`)
for (const one of threw) console.log(`  THREW ${one}`)
if (unread.length > 0) {
  console.log(`\npage types the store would not answer (${unread.length}):`)
  for (const one of unread) console.log(`  ${one}`)
}
