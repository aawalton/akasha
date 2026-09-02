import type { Corpus, Record_ } from "./read-corpus.ts"
import { type Entry, type Kind, type Ledger, LEDGERS } from "./ledger.ts"

export type Fault = {
  kind: string
  where: string
  key: string
  detail: string
}

export type IdMap = Readonly<Record<string, string>>

export type Verdict = {
  faults: Fault[]
  valuesChecked: number
  recordsChecked: number
}

const SLUG_PREFIX = "day-"

function shape(value: unknown): string {
  if (value === null) return "null"
  if (value instanceof Date) return "Date"
  if (Array.isArray(value)) return "array"
  return typeof value
}

function render(value: unknown): string {
  if (value === null) return "null"
  if (value instanceof Date) return "Date"
  if (Array.isArray(value)) return `array(${value.length})`
  if (typeof value === "string") return `${typeof value}(${value.length} chars)`
  return typeof value
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && a.getTime() === b.getTime()
  }
  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false
    return a.every((one, index) => deepEqual(one, b[index]))
  }
  if (a === null || b === null) return false
  if (typeof a === "object" && typeof b === "object") {
    const ak = Object.keys(a as object).sort()
    const bk = Object.keys(b as object).sort()
    if (ak.length !== bk.length || ak.some((k, i) => k !== bk[i])) return false
    return ak.every((k) =>
      deepEqual((a as Record<string, unknown>)[k], (b as Record<string, unknown>)[k]),
    )
  }
  return false
}

function calendarDate(value: unknown): string | null {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  return null
}

function instant(value: unknown): number | null {
  if (value instanceof Date) return value.getTime()
  if (typeof value !== "string") return null
  if (!/(Z|[+-]\d{2}:?\d{2})$/.test(value)) return null
  const time = Date.parse(value)
  return Number.isNaN(time) ? null : time
}

function numeric(value: unknown): number | null {
  if (typeof value === "number") return value
  if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
    return Number(value)
  }
  return null
}

function compareValue(
  key: string,
  entry: Entry,
  before: unknown,
  after: unknown,
  idMap: IdMap,
  where: string,
): Fault | null {
  const fault = (kind: string, detail: string): Fault => ({ kind, where, key, detail })
  switch (entry.policy) {
    case "exact":
      if (shape(before) !== shape(after)) {
        return fault("type-changed", `${render(before)} became ${render(after)}`)
      }
      if (!deepEqual(before, after)) return fault("value-changed", "same type, different value")
      return null
    case "reminted-id":
    case "reminted-reference": {
      if (typeof before !== "string" || typeof after !== "string") {
        return fault("type-changed", `${render(before)} became ${render(after)}`)
      }
      const expected = idMap[before]
      if (expected === undefined) {
        if (before === after) return null
        return fault("id-map-missing", "identity changed with no entry in the supplied id map")
      }
      if (expected !== after) return fault("id-map-broken", "identity is not what the id map says")
      return null
    }
    case "slug-prefixed": {
      if (typeof before !== "string" || typeof after !== "string") {
        return fault("type-changed", `${render(before)} became ${render(after)}`)
      }
      if (after === `${SLUG_PREFIX}${before}`) return null
      return fault("slug-not-prefixed", `expected the ${SLUG_PREFIX} prefix and the old slug intact`)
    }
    case "calendar-date": {
      const a = calendarDate(before)
      const b = calendarDate(after)
      if (a === null) return fault("unreadable-source-date", `${render(before)} is no calendar date`)
      if (b === null) return fault("unreadable-target-date", `${render(after)} is no calendar date`)
      if (a !== b) return fault("value-changed", "a different calendar day")
      return null
    }
    case "instant": {
      const a = instant(before)
      const b = instant(after)
      if (a === null) return fault("unzoned-source-instant", `${render(before)} names no instant`)
      if (b === null) {
        return fault("unzoned-target-instant", `${render(after)} names no instant, so its zone is a guess`)
      }
      if (a !== b) return fault("value-changed", `a different instant, off by ${b - a} ms`)
      return null
    }
    case "declared-number-from-text": {
      const a = numeric(before)
      const b = numeric(after)
      if (a === null) return fault("not-a-number", `${render(before)} does not read as a number`)
      if (b === null) return fault("not-a-number", `${render(after)} does not read as a number`)
      if (a !== b) return fault("value-changed", `${a === 0 ? "" : ""}numerically different`)
      return null
    }
    case "declared-text-from-number": {
      const a = numeric(before)
      const b = numeric(after)
      if (a === null || b === null) return fault("not-a-number", "one side does not read as a number")
      if (typeof after !== "string") return fault("type-changed", "target is not text")
      if (a !== b) return fault("value-changed", "numerically different")
      return null
    }
  }
}

function compareRecord(
  ledger: Ledger,
  before: Record_,
  after: Record_,
  idMap: IdMap,
  verdict: Verdict,
  newDayIdByDate: Map<string, string>,
): void {
  const where = `${before.kind} ${before.day}#${before.ordinal + 1}`
  const keys = new Set([...before.fields.keys(), ...after.fields.keys()])
  for (const key of [...keys].sort()) {
    const entry = ledger[key]
    if (entry === undefined) {
      verdict.faults.push({
        kind: "key-unledgered",
        where,
        key,
        detail: "no comparison policy is declared for this key, so it cannot be judged",
      })
      continue
    }
    const hasBefore = before.fields.has(key)
    const hasAfter = after.fields.has(key)
    if (!hasBefore && !hasAfter) continue
    if (hasBefore && !hasAfter) {
      verdict.faults.push({
        kind: "key-vanished",
        where,
        key,
        detail: `carried ${render(before.fields.get(key))} and now carries nothing`,
      })
      continue
    }
    if (!hasBefore && hasAfter) {
      if (entry.mintedConstant !== undefined) {
        const minted = after.fields.get(key)
        if (entry.mintedConstant === "" ? typeof minted === "string" && minted.length > 0 : minted === entry.mintedConstant) continue
        verdict.faults.push({
          kind: "minted-value-wrong",
          where,
          key,
          detail: entry.mintedConstant === ""
            ? "a migrated row must carry a non-empty value here"
            : `the ledger mints this as ${entry.mintedConstant}`,
        })
        continue
      }
      if (entry.mintedWhenAbsent !== undefined) {
        const minted = after.fields.get(key)
        const expected =
          entry.mintedWhenAbsent === "day-slug"
            ? `${SLUG_PREFIX}${before.day}`
            : newDayIdByDate.get(before.day)
        if (expected !== undefined && minted === expected) continue
        verdict.faults.push({
          kind: "minted-value-wrong",
          where,
          key,
          detail:
            entry.mintedWhenAbsent === "day-slug"
              ? `the ledger mints this from the date and expected ${SLUG_PREFIX}${before.day}`
              : `the ledger mints this as a reference to the ${before.day} page and it is not that`,
        })
        continue
      }
      verdict.faults.push({
        kind: "key-invented",
        where,
        key,
        detail: `carried nothing and now carries ${render(after.fields.get(key))}`,
      })
      continue
    }
    verdict.valuesChecked += 1
    const fault = compareValue(
      key,
      entry,
      before.fields.get(key),
      after.fields.get(key),
      idMap,
      where,
    )
    if (fault !== null) verdict.faults.push(fault)
  }
  verdict.recordsChecked += 1
}

function requireRequiredKeys(ledger: Ledger, record: Record_, verdict: Verdict): void {
  for (const [key, entry] of Object.entries(ledger)) {
    if (entry.optional) continue
    if (record.fields.has(key)) continue
    verdict.faults.push({
      kind: "required-key-absent",
      where: `${record.kind} ${record.day}#${record.ordinal + 1}`,
      key,
      detail: "the ledger says this key is on every record and this record has none",
    })
  }
}

function alignRows(kind: Kind, before: Record_[], after: Record_[], verdict: Verdict): [Record_, Record_][] {
  const pairs: [Record_, Record_][] = []
  const afterByKey = new Map<string, Record_>()
  for (const record of after) {
    const id = record.fields.get("id")
    const key = typeof id === "string" ? id : `${record.day}#${record.ordinal}`
    if (afterByKey.has(key)) {
      verdict.faults.push({
        kind: "duplicate-identity",
        where: `${kind} ${record.day}`,
        key: "id",
        detail: "two migrated rows carry one identity",
      })
    }
    afterByKey.set(key, record)
  }
  for (const record of before) {
    const id = record.fields.get("id")
    const key = typeof id === "string" ? id : `${record.day}#${record.ordinal}`
    const match = afterByKey.get(key)
    if (match === undefined) {
      verdict.faults.push({
        kind: "row-missing",
        where: `${kind} ${record.day}#${record.ordinal + 1}`,
        key: "-",
        detail: `${record.locator} has no counterpart in the migrated corpus`,
      })
      continue
    }
    afterByKey.delete(key)
    if (match.day !== record.day) {
      verdict.faults.push({
        kind: "row-changed-day",
        where: `${kind} ${record.day}#${record.ordinal + 1}`,
        key: "daily-tracking",
        detail: `the row now belongs to ${match.day}`,
      })
    }
    if (match.ordinal !== record.ordinal) {
      verdict.faults.push({
        kind: "row-order-changed",
        where: `${kind} ${record.day}#${record.ordinal + 1}`,
        key: "-",
        detail: `the row now sits at position ${match.ordinal + 1} within its day`,
      })
    }
    pairs.push([record, match])
  }
  for (const record of afterByKey.values()) {
    verdict.faults.push({
      kind: "row-invented",
      where: `${kind} ${record.day}#${record.ordinal + 1}`,
      key: "-",
      detail: `${record.locator} has no counterpart in the old corpus`,
    })
  }
  return pairs
}

export function checkIdMap(before: Corpus, idMap: IdMap, verdict: Verdict): void {
  const targets = new Map<string, string>()
  for (const [from, to] of Object.entries(idMap)) {
    if (targets.has(to)) {
      verdict.faults.push({
        kind: "id-map-not-injective",
        where: "id-map",
        key: from,
        detail: "two old identities are mapped onto one new identity",
      })
    }
    targets.set(to, from)
    if (to[14] !== "7") {
      verdict.faults.push({
        kind: "id-map-target-not-uuid-v7",
        where: "id-map",
        key: from,
        detail: "akasha mints page identities as uuid version 7",
      })
    }
  }
  for (const record of before.days.values()) {
    const id = record.fields.get("id")
    if (typeof id !== "string") continue
    if (id[14] === "7") continue
    if (idMap[id] === undefined) {
      verdict.faults.push({
        kind: "id-map-incomplete",
        where: `day ${record.day}`,
        key: "id",
        detail: "this day carries a uuid version 5 identity and the id map does not re-mint it",
      })
    }
  }
}

export function compareCorpora(before: Corpus, after: Corpus, idMap: IdMap): Verdict {
  const verdict: Verdict = { faults: [], valuesChecked: 0, recordsChecked: 0 }

  for (const corpus of [before, after]) {
    for (const fault of corpus.faults) {
      verdict.faults.push({
        kind: "read-fault",
        where: corpus === before ? "old corpus" : "migrated corpus",
        key: fault.locator,
        detail: fault.reason,
      })
    }
  }

  const newDayIdByDate = new Map<string, string>()
  for (const [day, record] of after.days) {
    const id = record.fields.get("id")
    if (typeof id === "string") newDayIdByDate.set(day, id)
  }

  checkIdMap(before, idMap, verdict)

  for (const [day, record] of before.days) {
    const match = after.days.get(day)
    if (match === undefined) {
      verdict.faults.push({
        kind: "day-missing",
        where: `day ${day}`,
        key: "-",
        detail: `${record.locator} has no counterpart in the migrated corpus`,
      })
      continue
    }
    requireRequiredKeys(LEDGERS.day, record, verdict)
    requireRequiredKeys(LEDGERS.day, match, verdict)
    compareRecord(LEDGERS.day, record, match, idMap, verdict, newDayIdByDate)
  }
  for (const [day, record] of after.days) {
    if (before.days.has(day)) continue
    verdict.faults.push({
      kind: "day-invented",
      where: `day ${day}`,
      key: "-",
      detail: `${record.locator} has no counterpart in the old corpus`,
    })
  }

  for (const [kind, oldRows, newRows] of [
    ["session", before.sessions, after.sessions],
    ["task", before.tasks, after.tasks],
  ] as [Kind, Record_[], Record_[]][]) {
    for (const [oldRow, newRow] of alignRows(kind, oldRows, newRows, verdict)) {
      requireRequiredKeys(LEDGERS[kind], oldRow, verdict)
      requireRequiredKeys(LEDGERS[kind], newRow, verdict)
      compareRecord(LEDGERS[kind], oldRow, newRow, idMap, verdict, newDayIdByDate)
    }
  }

  return verdict
}
