export type Kerning = {
  readonly firsts: ReadonlyMap<number, number>
  readonly seconds: ReadonlyMap<number, number>
  readonly pairs: ReadonlyMap<number, ReadonlyMap<number, number>>
}

export const UNKERNED: Kerning = { firsts: new Map(), seconds: new Map(), pairs: new Map() }

const SHORT = 2

const TAG_LENGTH = 4

const KERN = "kern"

const FEATURES_AT = 6

const LOOKUPS_AT = 8

const FEATURE_RECORD = 6

const FEATURE_OFFSET_AT = 4

const COUNT_AT = 2

const LIST_FROM = 4

const SUBTABLES_AT = 4

const SUBTABLES_FROM = 6

const PAIRED = 2

const EXTENDED = 9

const EXTENSION_AT = 4

const COVERAGE_AT = 2

const FIRST_VALUE_AT = 4

const SECOND_VALUE_AT = 6

const PAIR_SETS_AT = 8

const PAIR_SETS_FROM = 10

const FIRST_CLASSES_AT = 8

const SECOND_CLASSES_AT = 10

const FIRST_CLASS_COUNT_AT = 12

const SECOND_CLASS_COUNT_AT = 14

const CLASS_RECORDS_FROM = 16

const RANGE = 6

const RANGE_END_AT = 2

const RANGE_VALUE_AT = 4

const LISTED = 1

const RANGED = 2

const X_ADVANCE = 4

const BEFORE_ADVANCE = 3

type PairTable = {
  readonly covered: ReadonlyMap<number, number>
  readonly adjusting: (first: number, covering: number, second: number) => number | undefined
}

export function tagAt(view: DataView, at: number): string {
  return Array.from({ length: TAG_LENGTH }, (_, letter) =>
    String.fromCharCode(view.getUint8(at + letter))
  ).join("")
}

function bitsIn(flags: number): number {
  let count = 0
  for (let left = flags; left > 0; left >>= 1) count += left & 1
  return count
}

function advanceIn(view: DataView, at: number, format: number): number {
  if ((format & X_ADVANCE) === 0) return 0
  return view.getInt16(at + SHORT * bitsIn(format & BEFORE_ADVANCE))
}

function rangedInto(view: DataView, at: number, into: Map<number, number>, counted: boolean) {
  for (let one = 0; one < view.getUint16(at + COUNT_AT); one += 1) {
    const range = at + LIST_FROM + one * RANGE
    const start = view.getUint16(range)
    const value = view.getUint16(range + RANGE_VALUE_AT)
    for (let glyph = start; glyph <= view.getUint16(range + RANGE_END_AT); glyph += 1) {
      into.set(glyph, counted ? value + glyph - start : value)
    }
  }
}

function coverageIn(view: DataView, at: number): ReadonlyMap<number, number> {
  const found = new Map<number, number>()
  if (view.getUint16(at) === RANGED) rangedInto(view, at, found, true)
  else {
    for (let one = 0; one < view.getUint16(at + COUNT_AT); one += 1) {
      found.set(view.getUint16(at + LIST_FROM + one * SHORT), one)
    }
  }
  return found
}

function classesIn(view: DataView, at: number): ReadonlyMap<number, number> {
  const found = new Map<number, number>()
  if (view.getUint16(at) === RANGED) rangedInto(view, at, found, false)
  else if (view.getUint16(at) === LISTED) {
    const start = view.getUint16(at + SHORT)
    for (let one = 0; one < view.getUint16(at + LIST_FROM); one += 1) {
      found.set(start + one, view.getUint16(at + RANGE + one * SHORT))
    }
  }
  return found
}

function pairSetsIn(view: DataView, at: number, record: number, format: number) {
  const sets = new Map<number, ReadonlyMap<number, number>>()
  for (let one = 0; one < view.getUint16(at + PAIR_SETS_AT); one += 1) {
    const set = at + view.getUint16(at + PAIR_SETS_FROM + one * SHORT)
    const found = new Map<number, number>()
    for (let pair = 0; pair < view.getUint16(set); pair += 1) {
      const held = set + SHORT + pair * (SHORT + record)
      found.set(view.getUint16(held), advanceIn(view, held + SHORT, format))
    }
    sets.set(one, found)
  }
  return sets
}

function pairTableIn(view: DataView, at: number): PairTable | null {
  const covered = coverageIn(view, at + view.getUint16(at + COVERAGE_AT))
  const format = view.getUint16(at + FIRST_VALUE_AT)
  const record = SHORT * (bitsIn(format) + bitsIn(view.getUint16(at + SECOND_VALUE_AT)))
  if (view.getUint16(at) === LISTED) {
    const sets = pairSetsIn(view, at, record, format)
    return { covered, adjusting: (_, covering, second) => sets.get(covering)?.get(second) }
  }
  if (view.getUint16(at) !== RANGED) return null
  const firsts = classesIn(view, at + view.getUint16(at + FIRST_CLASSES_AT))
  const seconds = classesIn(view, at + view.getUint16(at + SECOND_CLASSES_AT))
  const firstCount = view.getUint16(at + FIRST_CLASS_COUNT_AT)
  const secondCount = view.getUint16(at + SECOND_CLASS_COUNT_AT)
  return {
    covered,
    adjusting: (first, _, second) => {
      const one = firsts.get(first) ?? 0
      const two = seconds.get(second) ?? 0
      if (one >= firstCount || two >= secondCount) return undefined
      return advanceIn(view, at + CLASS_RECORDS_FROM + (one * secondCount + two) * record, format)
    },
  }
}

function kernLookupsIn(view: DataView, gpos: number): readonly number[] {
  const features = gpos + view.getUint16(gpos + FEATURES_AT)
  const lookups = gpos + view.getUint16(gpos + LOOKUPS_AT)
  const named = new Set<number>()
  for (let one = 0; one < view.getUint16(features); one += 1) {
    const record = features + SHORT + one * FEATURE_RECORD
    if (tagAt(view, record) !== KERN) continue
    const feature = features + view.getUint16(record + FEATURE_OFFSET_AT)
    for (let index = 0; index < view.getUint16(feature + COUNT_AT); index += 1) {
      named.add(view.getUint16(feature + LIST_FROM + index * SHORT))
    }
  }
  return [...named]
    .sort((one, two) => one - two)
    .map((index) => lookups + view.getUint16(lookups + SHORT + index * SHORT))
}

function pairTablesIn(view: DataView, lookup: number): readonly PairTable[] {
  const kind = view.getUint16(lookup)
  const found: PairTable[] = []
  for (let one = 0; one < view.getUint16(lookup + SUBTABLES_AT); one += 1) {
    const at = lookup + view.getUint16(lookup + SUBTABLES_FROM + one * SHORT)
    const extended = kind === EXTENDED && view.getUint16(at + SHORT) === PAIRED
    const paired = extended ? at + view.getUint32(at + EXTENSION_AT) : kind === PAIRED ? at : null
    const table = paired === null ? null : pairTableIn(view, paired)
    if (table !== null) found.push(table)
  }
  return found
}

function adjustedBy(tables: readonly PairTable[], first: number, second: number): number {
  for (const table of tables) {
    const covering = table.covered.get(first)
    const adjusted = covering === undefined ? undefined : table.adjusting(first, covering, second)
    if (adjusted !== undefined) return adjusted
  }
  return 0
}

function pairSumsIn(
  view: DataView,
  gpos: number,
  glyphs: readonly number[]
): ReadonlyMap<number, ReadonlyMap<number, number>> {
  const sums = new Map<number, Map<number, number>>()
  for (const lookup of kernLookupsIn(view, gpos)) {
    const tables = pairTablesIn(view, lookup)
    for (const first of glyphs) {
      const covering = tables.filter((table) => table.covered.has(first))
      if (covering.length === 0) continue
      const row = sums.get(first) ?? new Map<number, number>()
      for (const second of glyphs) {
        const adjusted = adjustedBy(covering, first, second)
        if (adjusted !== 0) row.set(second, (row.get(second) ?? 0) + adjusted)
      }
      sums.set(first, row)
    }
  }
  return sums
}

function classedBy<T>(keyed: ReadonlyMap<number, T>, keyOf: (held: T) => string) {
  const classes = new Map<string, number>()
  const found = new Map<number, number>()
  for (const [glyph, held] of keyed) {
    const key = keyOf(held)
    const known = classes.get(key) ?? classes.size + 1
    classes.set(key, known)
    found.set(glyph, known)
  }
  return found
}

function byCharacter(codes: ReadonlyMap<number, number>, of: ReadonlyMap<number, number>) {
  return new Map(
    [...codes].flatMap(([code, glyph]) => {
      const known = of.get(glyph)
      return known === undefined ? [] : [[code, known] as const]
    })
  )
}

export function kerningIn(
  view: DataView,
  gpos: number,
  codes: ReadonlyMap<number, number>
): Kerning {
  const sums = pairSumsIn(view, gpos, [...new Set(codes.values())])
  const rows = new Map<number, readonly (readonly [number, number])[]>()
  for (const [first, row] of sums) {
    const kept = [...row].filter(([, by]) => by !== 0).sort(([one], [two]) => one - two)
    if (kept.length > 0) rows.set(first, kept)
  }
  const firstOf = classedBy(rows, (row) => row.join(";"))
  const classRows = new Map([...rows].map(([first, row]) => [firstOf.get(first) ?? 0, row]))
  const columns = new Map<number, [number, number][]>()
  for (const [first, row] of [...classRows].sort(([one], [two]) => one - two)) {
    for (const [second, by] of row) {
      const column = columns.get(second) ?? []
      column.push([first, by])
      columns.set(second, column)
    }
  }
  const secondOf = classedBy(columns, (column) => column.join(";"))
  const pairs = new Map<number, Map<number, number>>()
  for (const [second, column] of columns) {
    for (const [first, by] of column) {
      const row = pairs.get(first) ?? new Map<number, number>()
      row.set(secondOf.get(second) ?? 0, by)
      pairs.set(first, row)
    }
  }
  return { firsts: byCharacter(codes, firstOf), seconds: byCharacter(codes, secondOf), pairs }
}
