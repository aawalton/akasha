import { type Backed, type Row } from "./page-derive-shape.ts"
import { type Held, type Values } from "./page-file-values.ts"
import { deriverFor } from "./deriver-hold.ts"
import { idOfFilePage as pageId, slugOfFilePage as pageSlug } from "../../page/name/naming/naming.ts"
import { bind, type Given, isRefused, QUERY_PAGE_TYPE, type Refused } from "./page-query-bind.ts"
import { comparing, stated } from "./page-query-compare.ts"
import { queryOf } from "./page-query-fields.ts"
import { carriesFor } from "./page-query-keys.ts"
import { NOTHING, reduced, reducedFault } from "./page-query-reduce.ts"
import { listOf, textOf } from "./page-query-values.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { pagesOf, reposOf } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { type Roots } from "../../page/page.ts"
import { isAddressable } from "../../repo/roots/roots.ts"
import { WAKE_DAY, type Woke, wokeOn } from "./wake-day.ts"

export const UNREACHED = "names no page type whose pages are files"

export interface Test {
  readonly key: string
  readonly is?: string
  readonly in?: readonly string[]
  readonly notIn?: readonly string[]
  readonly has?: string
  readonly contains?: readonly string[]
  readonly endsWith?: string
  readonly empty?: boolean
  readonly atOrAfter?: string
  readonly before?: string
}

export type Reduction = "sum" | "mean"

export interface PageQuery {
  readonly pageType: string
  readonly takes?: Readonly<Record<string, string>>
  readonly where?: readonly Test[]
  readonly countBy?: readonly string[]
  readonly function?: Reduction
  readonly target?: string
  readonly sortBy?: string
  readonly descending?: boolean
  readonly limit?: number
  readonly offset?: number
  readonly keys?: readonly string[]
  readonly unreadable?: readonly string[]
}

export interface Group {
  readonly by: Readonly<Record<string, string | null>>
  readonly n: number
}

export interface Answer {
  readonly n: number
  readonly rows: readonly Row[]
  readonly groups: readonly Group[]
  readonly value: number | null
  readonly over: number | null
  readonly absent: readonly string[]
  readonly faults: readonly string[]
  readonly omitted: readonly string[]
  readonly unfound: readonly string[]
}

export function statesBoth(query: PageQuery): boolean {
  return query.countBy !== undefined && query.function !== undefined
}

export function load(roots: Roots, pageType: string): Iterable<Row> | null {
  return deriverFor(roots).rows(pageType)
}

/** The slots a test states one value in, and the slots it states a list of them in. */
const SINGLE = ["is", "has", "endsWith", "atOrAfter", "before"] as const

const MANY = ["in", "notIn", "contains"] as const

/** Every value a test states, whichever slot it stands in. */
function statedIn(test: Test): readonly string[] {
  return [
    ...SINGLE.flatMap((slot) => (test[slot] === undefined ? [] : [test[slot]])),
    ...MANY.flatMap((slot) => test[slot] ?? []),
  ]
}

/**
 * One test with every named time it states swapped for the moment that name stands for.
 *
 * A NAMED TIME IS RESOLVED IN EVERY SLOT, not in the three that compare an instant. `now` and
 * `wake-day` were swapped inside `is`, `at-or-after` and `before` alone and left as literal text
 * everywhere else, so `in: [wake-day]` asked for a row carrying the eight characters `wake-day`.
 * Nothing carries that, and a test matching no row is a legal answer of zero — which is what a
 * true zero looks like — so the query handed back the miss as an answer.
 *
 * SWAPPED ONCE PER TEST rather than at each comparison, because what a name stands for does not
 * vary by row and `passes` runs once per row.
 */
function resolving(test: Test, type: string | null, at: number, woke: Woke | null): Test {
  const swap = (value: string): string => stated(value, type, at, woke)
  const out: { -readonly [K in keyof Test]: Test[K] } = { ...test }
  for (const slot of SINGLE) {
    const value = test[slot]
    if (value !== undefined) out[slot] = swap(value)
  }
  for (const slot of MANY) {
    const value = test[slot]
    if (value !== undefined) out[slot] = value.map(swap)
  }
  return out
}

function passes(values: Values, test: Test, typeOf: (key: string) => string | null): boolean {
  const one = textOf(values, test.key)
  const type = typeOf(test.key)
  if (test.is !== undefined && one !== test.is) return false
  if (test.in !== undefined && (one === null || !test.in.includes(one))) return false
  if (test.notIn !== undefined && one !== null && test.notIn.includes(one)) return false
  if (test.has !== undefined && !listOf(values, test.key).includes(test.has)) return false
  if (test.contains !== undefined) {
    if (one === null) return false
    const held = one.toLowerCase()
    if (!test.contains.every((wanted) => held.includes(wanted.toLowerCase()))) return false
  }
  if (test.endsWith !== undefined && (one === null || !one.endsWith(test.endsWith))) return false
  if (test.empty !== undefined && (one === null && listOf(values, test.key).length === 0) !== test.empty) {
    return false
  }
  if (test.atOrAfter !== undefined && (one === null || comparing(type)(one, test.atOrAfter) < 0)) {
    return false
  }
  if (test.before !== undefined && (one === null || comparing(type)(one, test.before) >= 0)) {
    return false
  }
  return true
}

function grouped(rows: readonly Row[], by: readonly string[]): readonly Group[] {
  const tally = new Map<string, Group>()
  for (const row of rows) {
    const values: Record<string, string | null> = {}
    for (const key of by) values[key] = textOf(row.values, key)
    const at = JSON.stringify(by.map((key) => values[key]))
    const held = tally.get(at)
    tally.set(at, { by: values, n: (held?.n ?? 0) + 1 })
  }
  return [...tally.values()].sort((a, b) => b.n - a.n)
}

function cut(
  rows: readonly Row[],
  query: PageQuery,
  typeOf: (key: string) => string | null
): readonly Row[] {
  const sortBy = query.sortBy
  const sorted = [...rows]
  if (sortBy !== undefined) {
    const way = query.descending === true ? -1 : 1
    const by = comparing(typeOf(sortBy))
    sorted.sort((a, b) => way * by(textOf(a.values, sortBy) ?? "", textOf(b.values, sortBy) ?? ""))
  }
  const from = query.offset ?? 0
  const past = from > 0 ? sorted.slice(from) : sorted
  const limited = query.limit === undefined ? past : past.slice(0, query.limit)
  const keys = query.keys
  if (keys === undefined) return limited
  return limited.map((row) => {
    const values: Record<string, string | readonly string[] | null> = {}
    for (const key of keys) values[key] = row.values[key] ?? null
    return { at: row.at, values }
  })
}

/**
 * The slots a test states without asking anything of a value. A test stating only these asks
 * nothing of a page, so the key it names is not held against what the page type declares.
 *
 * `empty` IS NOT ONE OF THEM. It stood here, and a test naming a key no property declares and no
 * page carries came back as a clean answer rather than a refusal: `empty: true` held of every page
 * and `empty: false` of none, both marked success. Either reads exactly like the same test on a key
 * that is declared and genuinely empty, which is the one thing `absent` exists to tell apart.
 * `empty` asks what a key holds, as `is` and `notIn` do, so it is held to the declaration as they
 * are.
 */
const CARRIED: readonly string[] = ["key"]

function valued(test: Test): boolean {
  return Object.keys(test).some((slot) => !CARRIED.includes(slot))
}

const FALLS_BACK: Readonly<Record<string, (stated: string | null, at: string) => Held>> = {
  id: pageId,
  slug: pageSlug,
}

function namesKey(query: PageQuery, key: string): boolean {
  if (query.sortBy === key || query.target === key) return true
  if ((query.keys ?? []).includes(key)) return true
  if ((query.countBy ?? []).includes(key)) return true
  return (query.where ?? []).some((test) => test.key === key)
}

function fallenBack(query: PageQuery): readonly string[] {
  return Object.keys(FALLS_BACK).filter((key) => namesKey(query, key))
}

function stating(row: Row, keys: readonly string[]): Row {
  const values: Record<string, Held> = { ...row.values }
  for (const key of keys) {
    const fallback = FALLS_BACK[key]
    if (fallback !== undefined) values[key] = fallback(textOf(row.values, key), row.at)
  }
  return { at: row.at, values }
}

export function answer(roots: Roots, query: PageQuery, at: number = Date.now()): Answer | null {
  const everyKey = query.keys === undefined
  const derive = deriverFor(roots, carriesFor(query))
  const found = derive.rows(query.pageType)
  if (found === null) return null
  const falling = fallenBack(query)
  const typeOf = (key: string): string | null => derive.typeOf(query.pageType, key)
  const tests = query.where ?? []
  // WHETHER TO DERIVE THE WAKE INSTANT IS ASKED OF THE SAME SLOTS THE SWAP READS. This scanned
  // `is`, `at-or-after` and `before` by name — a second list of where a named time can stand —
  // so a query naming `wake-day` under `in` skipped the derivation as well as the swap, and two
  // lists that had to agree could disagree without anything saying so.
  const woke = tests.some((one) => statedIn(one).includes(WAKE_DAY)) ? wokeOn(roots, at) : null
  const asked = tests.map((one) => resolving(one, typeOf(one.key), at, woke))
  const unseen = new Set(
    tests.filter(valued).map((test) => test.key).filter((key) => typeOf(key) === null)
  )
  const unfound = new Set((query.keys ?? []).filter((key) => typeOf(key) === null))
  // ONE WALK OVER THE PAGES, whatever the answer needs of them. The rows are walked rather than
  // held, so a second pass would read every sidecar again; what only a pass can settle — which
  // keys no page states — is worked out here, beside the rows the tests keep.
  const matched: Row[] = []
  for (const page of found) {
    const row = falling.length === 0 ? page : stating(page, falling)
    for (const key of unseen) if (row.values[key] !== undefined) unseen.delete(key)
    for (const key of unfound) if (row.values[key] !== undefined) unfound.delete(key)
    if (asked.every((test) => passes(row.values, test, typeOf))) matched.push(row)
  }
  // WHAT NO PROPERTY DECLARES IS ABSENT WHETHER OR NOT A SINGLE PAGE STANDS. Both sets are seeded
  // from the declaration — `typeOf(key) === null` — so they are already right before the walk, and
  // the walk only ever takes keys out of them. Withholding them when nothing was walked took the
  // refusal away from exactly the page types most likely to be addressed by a name they do not
  // carry: a new one, or one whose pages have all gone. The reader got back the uninformative zero
  // the refusal itself warns about, marked as success — and then the same call began refusing on
  // the day that type first page landed, so the mistake surfaced nowhere near the change that
  // made it.
  const beside = {
    absent: [...unseen].sort(),
    faults: [...derive.faults(), ...reducedFault(query, typeOf)],
    omitted: everyKey ? derive.attachmentKeys(query.pageType) : [],
    unfound: query.keys === undefined ? [] : [...unfound].sort(),
  }
  const countBy = query.countBy
  if (countBy !== undefined) {
    return {
      n: matched.length,
      rows: [],
      groups: grouped(matched, countBy),
      ...beside,
      ...NOTHING,
    }
  }
  if (query.function !== undefined) {
    return {
      n: matched.length,
      rows: [],
      groups: [],
      ...beside,
      ...reduced(matched, query, typeOf),
    }
  }
  return {
    n: matched.length,
    rows: cut(matched, query, typeOf),
    groups: [],
    ...beside,
    ...NOTHING,
  }
}

export function backedTypes(roots: Roots): readonly Backed[] {
  return deriverFor(roots).backed()
}

export function reaches(roots: Roots, pageType: string): boolean {
  return deriverFor(roots).rows(pageType) !== null
}

interface QueryPage {
  readonly root: string
  readonly relPath: string
}

function queryPages(roots: Roots): readonly QueryPage[] {
  const type = registryOf(diskFileTree(roots)).find((one) => one.slug === QUERY_PAGE_TYPE)
  if (type === undefined) return []
  const found: QueryPage[] = []
  for (const repo of reposOf(type)) {
    if (!isAddressable(repo)) continue
    const root = roots[repo]
    if (root === undefined) continue
    for (const relPath of pagesOf(root, type, repo)) found.push({ root, relPath })
  }
  return found
}

export function queryNames(roots: Roots): readonly string[] {
  return [...new Set(queryPages(roots).map((one) => pageStemOf(one.relPath)))].sort()
}

export function namedQuery(roots: Roots, slug: string): PageQuery | null {
  for (const { root, relPath } of queryPages(roots)) {
    if (pageStemOf(relPath) !== slug) continue
    const text = textAt(root, relPath)
    return text === null ? null : queryOf(text, roots)
  }
  return null
}

export function answerNamed(
  roots: Roots,
  slug: string,
  given: Given = {}
): Answer | Refused | null {
  const query = namedQuery(roots, slug)
  if (query === null) return null
  const bound = bind(query, given)
  if (isRefused(bound)) return bound
  return answer(roots, bound)
}
