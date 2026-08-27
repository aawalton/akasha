import { parseFrontmatter } from "../../page/frontmatter.ts"
import { type Backed, type Deriver, type Relation, type Row } from "./page-derive.ts"
import { type Held, type Values } from "./page-file-values"
import { deriverFor } from "./deriver-hold.ts"
import { idOfFilePage as pageId, slugOfFilePage as pageSlug } from "../../page/name/naming/naming"
import { bind, documentFrom, type Given, isRefused, QUERY_PAGE_TYPE, type Refused, unfoundIn } from "./page-query-bind.ts"
import { carriesFor } from "./page-query-keys.ts"
import { narrowed } from "./page-query-narrow.ts"
import { NOTHING, reduced, reducedFault } from "./page-query-reduce.ts"
import { diskFileTree } from "../../page/file-tree.ts"
import { registryOf } from "../../page/property/registry.ts"
import { pagesOf, reposOf } from "../../page/page-types.ts"
import { textAt } from "../../page/text/text.ts"
import { stemOf as slugOf } from "../../page/name/name"
import { type Roots } from "../../page/page"
import { isAddressable } from "../../repo/roots/roots"
import { WAKE_DAY, type Woke, wokeOn } from "./wake-day.ts"

export type { Row, Values }

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

export function textOf(values: Values, key: string): string | null {
  const value = values[key]
  return typeof value === "string" ? value : null
}

export function listOf(values: Values, key: string): readonly string[] {
  const value = values[key]
  if (typeof value === "string") return [value]
  return Array.isArray(value) ? value : []
}

export function compare(left: string, right: string): number {
  const a = Number(left)
  const b = Number(right)
  const numeric = left.trim() !== "" && right.trim() !== "" && Number.isFinite(a) && Number.isFinite(b)
  if (numeric) return a === b ? 0 : a < b ? -1 : 1
  return left < right ? -1 : left > right ? 1 : 0
}

export const NOW = "now"

const INSTANT = "instant"
const CALENDAR_DATE = "calendar-date"

function momentOf(text: string): number | null {
  const ms = Date.parse(text)
  return Number.isFinite(ms) ? ms : null
}

function comparing(type: string | null): (left: string, right: string) => number {
  if (type !== INSTANT) return compare
  return (left, right) => {
    const a = momentOf(left)
    const b = momentOf(right)
    if (a === null || b === null) return compare(left, right)
    return a === b ? 0 : a < b ? -1 : 1
  }
}

function stated(value: string, type: string | null, at: number, woke: Woke | null): string {
  if (value === WAKE_DAY && woke !== null) {
    if (type === CALENDAR_DATE) return woke.day
    if (type === INSTANT) return woke.instant
    return value
  }
  if (type !== INSTANT) return value
  return value === NOW ? new Date(at).toISOString() : value
}

const REDUCTIONS: readonly string[] = ["sum", "mean"]

export function reduces(one: string): one is Reduction {
  return REDUCTIONS.includes(one)
}

export function statesBoth(query: PageQuery): boolean {
  return query.countBy !== undefined && query.function !== undefined
}

export function load(roots: Roots, pageType: string): readonly Row[] | null {
  return deriverFor(roots).rows(pageType)
}

function passes(
  values: Values,
  test: Test,
  typeOf: (key: string) => string | null,
  at: number,
  woke: Woke | null
): boolean {
  const one = textOf(values, test.key)
  const type = typeOf(test.key)
  if (test.is !== undefined && one !== stated(test.is, type, at, woke)) return false
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
  if (test.atOrAfter !== undefined) {
    const bound = stated(test.atOrAfter, type, at, woke)
    if (one === null || comparing(type)(one, bound) < 0) return false
  }
  if (test.before !== undefined) {
    const bound = stated(test.before, type, at, woke)
    if (one === null || comparing(type)(one, bound) >= 0) return false
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

const CARRIED: readonly string[] = ["key", "empty"]

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
  const loaded = falling.length === 0 ? found : found.map((row) => stating(row, falling))
  const typeOf = (key: string): string | null => derive.typeOf(query.pageType, key)
  const tests = query.where ?? []
  const named = (one: Test): boolean =>
    one.is === WAKE_DAY || one.atOrAfter === WAKE_DAY || one.before === WAKE_DAY
  const woke = tests.some(named) ? wokeOn(roots, at) : null
  const unseen = new Set(
    tests.filter(valued).map((test) => test.key).filter((key) => typeOf(key) === null)
  )
  const matched = loaded.filter((row) => {
    for (const key of unseen) if (row.values[key] !== undefined) unseen.delete(key)
    return tests.every((test) => passes(row.values, test, typeOf, at, woke))
  })
  const beside = {
    absent: loaded.length === 0 ? [] : [...unseen].sort(),
    faults: [...derive.faults(), ...reducedFault(query, typeOf)],
    omitted: everyKey ? derive.attachmentKeys(query.pageType) : [],
    unfound: unfoundIn(query.keys, loaded, typeOf),
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

export interface Named {
  readonly pageType: string
  readonly name: string
  readonly title: string | null
  readonly at: string | null
}

export interface Whole {
  readonly pageType: string
  readonly name: string
  readonly at: string
  readonly values: Values
  readonly relations: Readonly<Record<string, readonly Named[]>>
}

export function whole(roots: Roots, pageType: string, name: string): Whole | null {
  const derive = deriverFor(roots, { body: true, pages: true })
  const row = derive.one(pageType, name)
  if (row === null) return null
  const relations: Record<string, readonly Named[]> = {}
  for (const relation of derive.relations(pageType)) {
    const named = listOf(row.values, relation.key)
    if (named.length === 0) continue
    relations[relation.key] = named.map((one) => namedFor(derive, relation, one))
  }
  return { pageType, name, at: row.at, values: row.values, relations }
}

function namedFor(derive: Deriver, relation: Relation, name: string): Named {
  const found = derive.one(relation.target, name, relation.slugProperty)
  if (found === null) return { pageType: relation.target, name, title: null, at: null }
  return { pageType: relation.target, name, title: textOf(found.values, "title"), at: found.at }
}

export function backedTypes(roots: Roots): readonly Backed[] {
  return deriverFor(roots).backed()
}

export function reaches(roots: Roots, pageType: string): boolean {
  return deriverFor(roots).rows(pageType) !== null
}

function listValue(value: unknown): readonly string[] {
  if (typeof value === "string") return [value]
  return Array.isArray(value) ? value.filter((one): one is string => typeof one === "string") : []
}


function textIn(fields: Readonly<Record<string, unknown>>, key: string): string | null {
  const value = fields[key]
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

function countIn(fields: Readonly<Record<string, unknown>>, key: string): number | null {
  const stated = textIn(fields, key)
  if (stated === null) return null
  const value = Number(stated)
  return Number.isFinite(value) ? value : null
}

export function queryFrom(fields: Readonly<Record<string, unknown>>): PageQuery | null {
  const pageType = textIn(fields, "page-type")
  if (pageType === null) return null
  const narrows = narrowed(fields.where)
  const takes = fields.takes
  const countBy = fields["count-by"]
  const keys = fields.keys
  const sortBy = textIn(fields, "sort-by")
  const limit = countIn(fields, "limit")
  const offset = countIn(fields, "offset")
  const how = textIn(fields, "function")
  const target = textIn(fields, "target")
  return {
    pageType,
    ...(typeof takes !== "object" || takes === null || Array.isArray(takes)
      ? {}
      : {
          takes: Object.fromEntries(
            Object.entries(takes as Record<string, unknown>).map(([name, type]) => [
              name,
              typeof type === "string" ? type.trim() : String(type),
            ])
          ),
        }),
    ...(narrows.where === undefined ? {} : { where: narrows.where }),
    ...(narrows.unreadable.length === 0 ? {} : { unreadable: narrows.unreadable }),
    ...(countBy === undefined ? {} : { countBy: listValue(countBy) }),
    ...(sortBy === null ? {} : { sortBy }),
    ...(textIn(fields, "descending") === "true" ? { descending: true } : {}),
    ...(limit === null ? {} : { limit }),
    ...(offset === null || offset === 0 ? {} : { offset }),
    ...(keys === undefined ? {} : { keys: listValue(keys) }),
    ...(how === null || !reduces(how) ? {} : { function: how }),
    ...(target === null ? {} : { target }),
  }
}

export function queryOf(text: string, roots?: Roots): PageQuery | null {
  const fields = Object.fromEntries(parseFrontmatter(text).fields)
  return documentFrom(queryFrom(fields), fields, roots)
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
  return [...new Set(queryPages(roots).map((one) => slugOf(one.relPath)))].sort()
}

export function namedQuery(roots: Roots, slug: string): PageQuery | null {
  for (const { root, relPath } of queryPages(roots)) {
    if (slugOf(relPath) !== slug) continue
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
