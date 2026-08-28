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

export type Reads = (named: string) => Held

const heldFrom = (worked: Worked): Held => {
  if (worked.kind === "absent") return null
  if (worked.kind === "text") return worked.text
  if (worked.kind === "date") return worked.date
  if (worked.kind === "list") return worked.items.map((item) => heldFrom(item) as string)
  if (worked.kind === "number") return String(worked.number)
  if (worked.kind === "boolean") return String(worked.boolean)
  return new Date(worked.instant).toISOString()
}

export function formulasOver(
  declared: ReadonlyMap<string, ReadonlyMap<string, Property>>,
  chainOf: (kind: string) => readonly string[],
  note: (why: string) => void
): (kind: string, key: string, declaration: Property, reads: Reads) => Held {
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
