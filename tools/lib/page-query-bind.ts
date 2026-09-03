import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { TRACKING_DAY } from "@akasha/pages-system/page-query-day"
import { diskFileTree } from "../../page/file-tree.ts"
import { kebabized } from "../../page/property/key-spelling.ts"
import { declaredFor } from "../page/page-rows-home.ts"
import type { PageQuery, Test } from "./page-query.ts"
import { dayNameOf } from "./tracking/day-place.ts"

export type Given = Readonly<Record<string, string | readonly string[]>>

export interface Refused {
  readonly refused: string
}

export function isRefused(one: unknown): one is Refused {
  return typeof one === "object" && one !== null && "refused" in one
}

export function absentSays(pageType: string, absent: readonly string[]): string {
  const named = absent.map((one) => `\`${one}\``).join(", ")
  const which = absent.length === 1 ? "which is a key" : "which are keys"
  return `this query tests ${named}, ${which} no property declares on \`${pageType}\` and no page of it carries, so a zero here would say nothing about what matched`
}

const UNREAD_SAYS =
  "a narrow or parameter this service cannot read is refused rather than dropped, because dropping one answers with every page of the type instead of the pages asked for, or with every key instead of the keys asked for"

export const COMPOSED_FIELDS: readonly string[] = [
  "page-type",
  "takes",
  "where",
  "count-by",
  "keys",
  "sort-by",
  "descending",
  "limit",
  "offset",
  "function",
  "target",
]

const INSTEAD: Readonly<Record<string, string>> = { select: "keys" }

function listed(names: readonly string[]): string {
  const quoted = names.map((one) => `\`${one}\``)
  const last = quoted.at(-1) ?? ""
  return quoted.length < 2 ? last : `${quoted.slice(0, -1).join(", ")} and ${last}`
}

function untakenSays(name: string): string {
  const instead = INSTEAD[name]
  const points =
    instead === undefined
      ? ""
      : ` — \`${instead}\` is the parameter that names what \`${name}\` was reaching for`
  const may = COMPOSED_FIELDS.filter((one) => one !== "page-type")
  return `\`${name}\` is no parameter this service reads${points}; a composed query states \`page-type\`, and may state ${listed(may)}`
}

export function composedFrom(
  query: PageQuery,
  fields: Readonly<Record<string, unknown>>
): PageQuery {
  const untaken = Object.keys(fields)
    .filter((one) => !COMPOSED_FIELDS.includes(one))
    .map(untakenSays)
  if (untaken.length === 0) return query
  return { ...query, unreadable: [...(query.unreadable ?? []), ...untaken] }
}

export const QUERY_PAGE_TYPE = "page-query"

function unstatedSays(name: string, permitted: ReadonlySet<string>): string {
  const meant = kebabized(name)
  const points =
    meant !== name && permitted.has(meant) ? ` — \`${meant}\` is how this key is spelled here` : ""
  const may = COMPOSED_FIELDS.filter((one) => one !== "page-type")
  return `\`${name}\` is no key a page query states${points}; a page query states \`page-type\`, may state ${listed(may)}, and may carry the keys \`${QUERY_PAGE_TYPE}\` and what it extends declare`
}

export function documentKeys(roots: Roots): ReadonlySet<string> | null {
  const declared = declaredFor(diskFileTree(roots), QUERY_PAGE_TYPE)
  return declared === null
    ? null
    : new Set([...COMPOSED_FIELDS, ...declared.map((one) => one.name)])
}

export function documentFrom(
  query: PageQuery | null,
  fields: Readonly<Record<string, unknown>>,
  roots: Roots | undefined
): PageQuery | null {
  if (query === null || roots === undefined) return query
  const permitted = documentKeys(roots)
  if (permitted === null) return query
  const unstated = Object.keys(fields)
    .filter((one) => !permitted.has(one))
    .map((one) => unstatedSays(one, permitted))
  if (unstated.length === 0) return query
  return { ...query, unreadable: [...(query.unreadable ?? []), ...unstated] }
}

const LIST_TAKE = "list(text)"

const CALENDAR_DATE = "calendar-date"

const TAKE_TYPES: readonly string[] = [
  "text",
  "number",
  "instant",
  CALENDAR_DATE,
  TRACKING_DAY,
  "boolean",
  LIST_TAKE,
]

/**
 * What a value taken as one of Alan's tracked days is tested against.
 *
 * A day is given as a date and held as the name of that day's page, and `dayNameOf` is the rule
 * that says what the name is. Binding through it is what keeps a query reaching a day through a row
 * standing beside it answering the same rows on either side of the migration, without the query
 * itself stating how a day is spelled.
 */
function boundAs(type: string, one: string): string {
  return type === TRACKING_DAY ? dayNameOf(one) : one
}

const SLOT_SAYS: Readonly<Record<string, string>> = {
  is: "is",
  in: "in",
  notIn: "not-in",
  has: "has",
  contains: "contains",
  atOrAfter: "at-or-after",
  before: "before",
}

const LIST_SLOTS: readonly string[] = ["in", "notIn", "contains"]

const NAMES = /^\$([A-Za-z][A-Za-z0-9_-]*)$/

function faultIn(type: string, one: string): string | null {
  if (type === "number") {
    return one.trim() !== "" && Number.isFinite(Number(one)) ? null : "is no number"
  }
  if (type === "instant") return Number.isFinite(Date.parse(one)) ? null : "is no instant"
  if (type === CALENDAR_DATE || type === TRACKING_DAY) {
    return /^\d{4}-\d{2}-\d{2}$/.test(one) ? null : "is no calendar date, which reads `YYYY-MM-DD`"
  }
  if (type === "boolean") {
    return one === "true" || one === "false" ? null : "is neither `true` nor `false`"
  }
  return one.trim() === "" ? "is blank" : null
}

function split(one: string): readonly string[] {
  return one.split(",").map((each) => each.trim())
}

function readTaken(
  name: string,
  type: string,
  held: string | readonly string[]
): readonly string[] | Refused {
  if (!TAKE_TYPES.includes(type)) {
    return {
      refused: `\`${name}\` is taken as \`${type}\`, which is no type an argument may be: ${TAKE_TYPES.join(", ")}`,
    }
  }
  const values = typeof held !== "string" ? [...held] : type === LIST_TAKE ? split(held) : [held]
  if (values.length === 0) return { refused: `\`${name}\` was given nothing` }
  if (type !== LIST_TAKE && values.length !== 1) {
    return {
      refused: `\`${name}\` is taken as \`${type}\`, which is one value, and ${values.length} were given`,
    }
  }
  for (const one of values) {
    const fault = faultIn(type === LIST_TAKE ? "text" : type, one)
    if (fault !== null) return { refused: `\`${name}\` was given \`${one}\`, which ${fault}` }
  }
  return values.map((one) => boundAs(type, one))
}

function untaken(name: string, key: string, slot: string, saying: string): string {
  return `\`${SLOT_SAYS[slot] ?? slot}\` on \`${key}\` names \`$${name}\`, which this query does not take; ${saying}`
}

function heldFor(
  query: PageQuery,
  given: Given,
  saying: string
): Map<string, readonly string[]> | Refused {
  const held = new Map<string, readonly string[]>()
  for (const [name, type] of Object.entries(query.takes ?? {})) {
    const supplied = given[name]
    if (supplied === undefined) {
      return {
        refused: `\`${name}\` is an argument this query takes and it was not given; ${saying}`,
      }
    }
    const read = readTaken(name, type, supplied)
    if (isRefused(read)) return read
    held.set(name, read)
  }
  return held
}

export function bind(query: PageQuery, given: Given): PageQuery | Refused {
  const unreadable = query.unreadable ?? []
  if (unreadable.length > 0) {
    return { refused: `${unreadable.join(" — and ")} — ${UNREAD_SAYS}` }
  }
  const names = Object.keys(query.takes ?? {})
  const saying =
    names.length === 0
      ? "it takes no arguments"
      : `it takes ${names.map((one) => `\`${one}\``).join(", ")}`
  for (const name of Object.keys(given)) {
    if (!names.includes(name)) {
      return { refused: `\`${name}\` was given, which this query does not take; ${saying}` }
    }
  }
  const held = heldFor(query, given, saying)
  if (isRefused(held)) return held
  const named = new Set<string>()
  const where: Test[] = []
  for (const test of query.where ?? []) {
    const bound: Record<string, unknown> = {}
    for (const [slot, value] of Object.entries(test)) {
      const settled = slotted(test.key, slot, value, held, named, saying)
      if (isRefused(settled)) return settled
      bound[slot] = settled.value
    }
    where.push(bound as unknown as Test)
  }
  const unnamed = names.filter((one) => !named.has(one))
  if (unnamed.length > 0) {
    return {
      refused: `this query takes ${unnamed.map((one) => `\`${one}\``).join(", ")} and names ${unnamed.length === 1 ? "it" : "them"} in no test, so what was given would change nothing`,
    }
  }
  return where.length === 0 ? query : { ...query, where }
}

interface Settled {
  readonly value: unknown
}

function slotted(
  key: string,
  slot: string,
  value: unknown,
  held: ReadonlyMap<string, readonly string[]>,
  named: Set<string>,
  saying: string
): Settled | Refused {
  if (slot === "key") return { value }
  if (LIST_SLOTS.includes(slot)) {
    const out: string[] = []
    for (const one of value as readonly string[]) {
      const match = NAMES.exec(one)
      if (match === null) {
        out.push(one)
        continue
      }
      const name = match[1] as string
      const values = held.get(name)
      if (values === undefined) return { refused: untaken(name, key, slot, saying) }
      named.add(name)
      out.push(...values)
    }
    return { value: out }
  }
  if (typeof value !== "string") return { value }
  const match = NAMES.exec(value)
  if (match === null) return { value }
  const name = match[1] as string
  const values = held.get(name)
  if (values === undefined) return { refused: untaken(name, key, slot, saying) }
  if (values.length !== 1) {
    return {
      refused: `\`${SLOT_SAYS[slot] ?? slot}\` on \`${key}\` holds one value and \`${name}\` was given ${values.length}`,
    }
  }
  named.add(name)
  return { value: values[0] }
}
