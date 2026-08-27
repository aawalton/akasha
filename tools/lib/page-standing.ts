import type { Frontmatter } from "../../page/frontmatter.ts"
import type { Property } from "../../page/property/property.ts"
import type { Held } from "../../page/property/stated.ts"

export interface Standing {
  readonly name: string
  readonly value: Held
  readonly stated: boolean
}

export function standingOn(fm: Frontmatter, properties: readonly Property[]): readonly Standing[] {
  const standing: Standing[] = []
  const already = new Set<string>()
  for (const name of fm.keys) {
    already.add(name)
    standing.push({ name, value: fm.fields.get(name) as Held, stated: true })
  }
  for (const property of properties) {
    if (property.default === null || property.computed) continue
    if (already.has(property.name)) continue
    already.add(property.name)
    standing.push({ name: property.name, value: property.default, stated: false })
  }
  return standing
}
