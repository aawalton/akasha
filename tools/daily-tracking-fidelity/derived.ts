/**
 * The half of fidelity the value checker cannot see: what a day READS as, rather than what it holds.
 *
 * `compare.ts` reads both corpora as files and compares the values stored in them, key by key. That
 * is honest and it is narrower than it is read as covering. A property nobody stores is judged by
 * nothing there: `sleep-hours` is nowhere in a markdown day's frontmatter and nowhere in a landed
 * day's body, because it is summed over the session rows filed beside the day. So a landed day that
 * rolled up nothing from its nine rows passed 18884 values with 0 faults, and `surplus-hours` —
 * `({sleep-hours} ?? 0) - ({spend-hours} ?? 0)` — read exactly 0 on all 133 days. Zero is the green
 * rung on Alan's surplus tile, which is the one reading a fault there must never look like.
 *
 * What catches that is comparing the two halves as READ. This derives once over a tree holding both
 * layouts and asks the deriver for each markdown day and its landed twin, then compares every key
 * either of them answers — the stored ones the checker already covers, and the derived ones it
 * cannot. A key that differs is named; the values themselves are never printed, because they are
 * Alan's and a check says whether they agree rather than what they are.
 *
 * BOTH HALVES MUST STAND IN ONE TREE. That is what the landing's own act-1 window is, and it is the
 * only moment this comparison can be made — before the markdown days are taken away there are two
 * answers to compare, and after there is one. Run against a rehearsal tree, or against the checkout
 * between the write and the removal.
 */

import { rootsNamed } from "@akasha/pages-system/checkout-roots"
import { deriver } from "../lib/page-derive.ts"
import { AKASHA_DAY_PAGE_TYPE, DAY_PAGE_TYPE } from "../daily-tracking-migration/shape.ts"

/**
 * A markdown day's file, and a landed day's, told apart by nothing but their endings.
 *
 * The two endings are built from two different page type names because a day is named one thing in
 * each half: `daily-tracking` in markdown and `wake-day` in akasha. A landed day's file really ends
 * `.wake-day.ts`, so an ending built from the markdown name matches none of the 133 of them and
 * this read reports every landed day as unpaired.
 */
const MARKDOWN_ENDING = `.${DAY_PAGE_TYPE}.md`

const AKASHA_ENDING = `.${AKASHA_DAY_PAGE_TYPE}.ts`

/**
 * The keys the two halves are meant to answer differently, which is every key naming the page rather
 * than the day.
 *
 * A landed day is slugged `day-2026-08-31` where the markdown one is slugged `2026-08-31`, and
 * thirty of the days were re-minted a uuid v7 because akasha takes no other kind. Both differences
 * are the migration's own decisions and `compare.ts` judges them against the id map. Everything else
 * is the day itself, and the day did not change by being written down somewhere else.
 */
const NAMES_THE_PAGE: readonly string[] = ["slug", "id"]

export type Held = string | readonly string[] | null | undefined

export type Difference = {
  readonly date: string
  readonly key: string
  /** Which half answers, said without saying what either answered. */
  readonly how: "differs" | "markdown only" | "landed only"
}

export type Verdict = {
  readonly markdownDays: number
  readonly landedDays: number
  readonly pairs: number
  readonly keysJudged: number
  readonly valuesJudged: number
  readonly differences: readonly Difference[]
  readonly unpaired: readonly string[]
  readonly faults: readonly string[]
}

export function saidOf(held: Held): string {
  return Array.isArray(held) ? held.join(",") : String(held ?? "")
}

export function answers(held: Held): boolean {
  return saidOf(held).trim() !== ""
}

/**
 * Every day in the tree, split by which kind of file it came out of and keyed by the date it names.
 *
 * The date is what pairs the halves, rather than the slug, because a markdown day states no slug in
 * its frontmatter and a landed day states one — pairing on the slug would pair nothing.
 */
function daysIn(rows: Iterable<{ readonly at: string; readonly values: Readonly<Record<string, Held>> }>): {
  readonly markdown: Map<string, Readonly<Record<string, Held>>>
  readonly landed: Map<string, Readonly<Record<string, Held>>>
  readonly undated: number
} {
  const markdown = new Map<string, Readonly<Record<string, Held>>>()
  const landed = new Map<string, Readonly<Record<string, Held>>>()
  let undated = 0
  for (const row of rows) {
    const date = saidOf(row.values["date"]).trim()
    if (date === "") {
      undated += 1
      continue
    }
    if (row.at.endsWith(MARKDOWN_ENDING)) markdown.set(date, row.values)
    else if (row.at.endsWith(AKASHA_ENDING)) landed.set(date, row.values)
    else undated += 1
  }
  return { markdown, landed, undated }
}

/** Both halves of every day, derived once and compared as read. */
export function derivedVerdict(root: string): Verdict {
  const derive = deriver(rootsNamed({ akasha: root }, "akasha"))
  const rows = derive.rows(DAY_PAGE_TYPE)
  if (rows === null) {
    return {
      markdownDays: 0,
      landedDays: 0,
      pairs: 0,
      keysJudged: 0,
      valuesJudged: 0,
      differences: [],
      unpaired: [],
      faults: [`\`${DAY_PAGE_TYPE}\` reaches no page files under ${root}, so there is nothing to read`],
    }
  }
  const { markdown, landed, undated } = daysIn(rows)
  const differences: Difference[] = []
  const unpaired: string[] = []
  const judged = new Set<string>()
  let values = 0
  let pairs = 0

  for (const [date, one] of [...markdown].sort(([a], [b]) => (a < b ? -1 : 1))) {
    const two = landed.get(date)
    if (two === undefined) {
      unpaired.push(`${date} stands in markdown and nothing is landed for it`)
      continue
    }
    pairs += 1
    const keys = [...new Set([...Object.keys(one), ...Object.keys(two)])].sort()
    for (const key of keys) {
      if (NAMES_THE_PAGE.includes(key)) continue
      judged.add(key)
      values += 1
      const a = answers(one[key])
      const b = answers(two[key])
      if (a && b) {
        if (saidOf(one[key]) !== saidOf(two[key])) differences.push({ date, key, how: "differs" })
      } else if (a) differences.push({ date, key, how: "markdown only" })
      else if (b) differences.push({ date, key, how: "landed only" })
    }
  }
  for (const date of [...landed.keys()].sort()) {
    if (!markdown.has(date)) unpaired.push(`${date} is landed and no markdown day stands for it`)
  }

  const faults = [...derive.faults()]
  if (undated > 0) faults.push(`${String(undated)} day row(s) name no date, so nothing pairs them`)

  return {
    markdownDays: markdown.size,
    landedDays: landed.size,
    pairs,
    keysJudged: judged.size,
    valuesJudged: values,
    differences,
    unpaired,
    faults,
  }
}

const NAMED_AT_MOST = 40

/** What the verdict says, with no value in it. */
export function verdictSaid(verdict: Verdict): readonly string[] {
  const said: string[] = [
    `  markdown days  ${String(verdict.markdownDays)}`,
    `  landed days    ${String(verdict.landedDays)}`,
    `  pairs read     ${String(verdict.pairs)}`,
    `  keys judged    ${String(verdict.keysJudged)}, derived and stored alike`,
    `  values judged  ${String(verdict.valuesJudged)}`,
    `  differences    ${String(verdict.differences.length)}`,
  ]
  const byKey = new Map<string, number>()
  for (const one of verdict.differences) {
    const at = `${one.key} :: ${one.how}`
    byKey.set(at, (byKey.get(at) ?? 0) + 1)
  }
  for (const [at, count] of [...byKey].sort(([a], [b]) => (a < b ? -1 : 1)).slice(0, NAMED_AT_MOST)) {
    said.push(`    ${at} on ${String(count)} day(s)`)
  }
  for (const one of verdict.unpaired.slice(0, NAMED_AT_MOST)) said.push(`  UNPAIRED ${one}`)
  for (const why of verdict.faults.slice(0, NAMED_AT_MOST)) said.push(`  FAULT ${why}`)
  return said
}

const HELP = `daily-tracking derived fidelity

  bun tools/daily-tracking-fidelity/derived.ts --root <dir>

  --root  a checkout holding BOTH the markdown days and the landed day pages

  Derives once over that tree and compares every key each markdown day answers against the key
  its landed twin answers — the stored ones and the rolled-up ones alike. Prints no value.

  Exit 0 where every pair agrees on every key. Exit 1 on any difference, unpaired day or fault.
  Exit 2 on a usage error.
`

async function main(): Promise<never> {
  if (process.argv.includes("--help")) {
    process.stdout.write(HELP)
    process.exit(0)
  }
  const at = process.argv.indexOf("--root")
  const root = at === -1 ? null : process.argv[at + 1]
  if (root === undefined || root === null || root.startsWith("--")) {
    process.stderr.write(HELP)
    process.exit(2)
  }
  const verdict = derivedVerdict(root)
  process.stdout.write(`derived fidelity over ${root}\n`)
  for (const line of verdictSaid(verdict)) process.stdout.write(`${line}\n`)
  const wrong =
    verdict.differences.length > 0 || verdict.unpaired.length > 0 || verdict.faults.length > 0
  if (verdict.pairs === 0) {
    process.stdout.write(
      "\nVERDICT nothing compared: both halves must stand in one tree for either to be judged\n"
    )
    process.exit(1)
  }
  process.stdout.write(
    wrong
      ? "\nVERDICT the two halves do not read alike\n"
      : `\nVERDICT ${String(verdict.pairs)} day(s) read alike on all ${String(verdict.keysJudged)} keys\n`
  )
  process.exit(wrong ? 1 : 0)
}

if (import.meta.main) await main()
