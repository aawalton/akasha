/**
 * A page property's `expression:`, worked out in the formula language.
 *
 * WHAT THE LANGUAGE MEANS IS NOT HERE. `pages-system/formula/` reads a formula, types it and runs
 * it; this file is only what the deriver needs to hand it: the shape it is checked against, and the
 * values it is run over.
 *
 * THE VALUES COME FROM THE DERIVER, never from a page. A formula names keys, and each is resolved
 * by the same `valueOf` every other key goes through, so a formula reaches a relation, a `from:`
 * path, a `back:` naming and a row exactly as the rest of the deriver does. That is what keeps the
 * recursion, the cycle guard and the walk bound in one place instead of two.
 */

import {
  checkFormula,
  runFormula,
  type Checked,
  type DeclaredType,
  type Shape,
  type Value as Worked,
} from "../../pages-system/formula/formula.ts"
import { heldBy, valuedAs } from "../../pages-system/store/held.ts"
import type { Property } from "../../page/property/property.ts"
import { EXPRESSION } from "./page-declared.ts"
import type { Held } from "./page-file-values.ts"

/** What one key the formula names holds, worked out by whoever asked for the formula. */
export type Reads = (named: string) => Held

/**
 * What a formula answers, carried back as the deriver's `Held`.
 *
 * A NUMBER COMES BACK AS ITS DIGITS, which is what the evaluator this replaced carried back: it
 * ended `String(value)`. Everything downstream reads a derived value as a `Held`: a reduction
 * summing it, a `from:` path stepping through it, a query comparing it. Handing those a raw number
 * instead answers absent where a number was meant.
 *
 * AN INSTANT COMES BACK ISO 8601, which is the spelling the query layer already compares instants
 * in and writes `now` as. Its milliseconds since 1970 would be read back by `valuedAs` as absent,
 * so a formula reading another formula`s instant would answer nothing.
 */
const heldFrom = (worked: Worked): Held => {
  if (worked.kind === "absent") return null
  if (worked.kind === "text") return worked.text
  if (worked.kind === "date") return worked.date
  if (worked.kind === "list") return worked.items.map((item) => heldFrom(item) as string)
  if (worked.kind === "number") return String(worked.number)
  if (worked.kind === "boolean") return String(worked.boolean)
  return new Date(worked.instant).toISOString()
}

/**
 * Work out the formula filling one key, over one page's values.
 *
 * The shapes and the checked formulas are held for the length of the deriver that asked for this,
 * both being of a page type rather than of a page, and a walk reaching them once per page.
 */
export function formulasOver(
  declared: ReadonlyMap<string, ReadonlyMap<string, Property>>,
  chainOf: (kind: string) => readonly string[],
  note: (why: string) => void
): (kind: string, key: string, declaration: Property, reads: Reads) => Held {
  // A STATED TYPE THE LANGUAGE CANNOT HOLD REACHES NO KEY HERE, so a formula naming one is refused
  // where it is checked, rather than handed a value it could go on to compare.
  const shapes = new Map<string, Shape>()
  const shapeOf = (kind: string): Shape => {
    const had = shapes.get(kind)
    if (had !== undefined) return had
    const made: Record<string, DeclaredType> = {}
    for (const one of chainOf(kind))
      for (const [key, declaration] of declared.get(one) ?? []) {
        if (key in made) continue
        if (declaration.type === "") continue
        const type = heldBy(declaration.type)
        if (type === null) continue
        made[key] = type
      }
    shapes.set(kind, made)
    return made
  }

  // CHECKED ONCE PER PAGE TYPE AND KEY, NEVER ONCE PER PAGE. Checking reads the formula's text and
  // types it, and the walk reaches it once for every page the type has.
  const held = new Map<string, Checked | null>()
  const checkedFor = (kind: string, key: string, declaration: Property): Checked | null => {
    const mark = `${kind} ${key}`
    const had = held.get(mark)
    if (had !== undefined) return had
    const read = checkFormula(declaration.expression as string, shapeOf(kind))
    if (!read.ok) {
      note(`\`${declaration.slug}\` states an \`${EXPRESSION}\` this evaluator refuses: ${read.message}`)
      held.set(mark, null)
      return null
    }
    held.set(mark, read)
    return read
  }

  return (kind, key, declaration, reads) => {
    const one = checkedFor(kind, key, declaration)
    if (one === null) return null
    const shape = shapeOf(kind)
    const properties: Record<string, Worked> = {}
    for (const named of one.reads) {
      const type = shape[named]
      if (type === undefined) continue
      properties[named] = valuedAs(reads(named), type)
    }
    return heldFrom(runFormula(one, { now: Date.now(), properties }))
  }
}
