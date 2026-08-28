import { type Kind } from "./page-declared.ts"
import type { Property } from "../../page/property/property.ts"
import { type Backed, type Relation } from "./page-derive-shape.ts"
import { placeOf } from "../../page/page-types.ts"
import { isAddressable } from "../../repo/roots/roots.ts"


export interface Backing {
  readonly isFiled: (pageType: string) => boolean
  readonly isHeld: (pageType: string) => boolean
  readonly relations: (pageType: string) => readonly Relation[]
  readonly backed: () => readonly Backed[]
}

export function backingOver(
  kinds: ReadonlyMap<string, Kind>,
  declared: ReadonlyMap<string, ReadonlyMap<string, Property>>,
  carriers: ReadonlyMap<string, readonly Property[]>,
  chainOf: (kind: string) => readonly string[],
  fault: (why: string) => void
): Backing {
  const isFiled = (pageType: string): boolean => {
    const one = kinds.get(pageType)
    if (one === undefined) return false
    return one.filed.some((each) => each.repo !== null && isAddressable(each.repo))
  }

  const isHeld = (pageType: string): boolean => (carriers.get(pageType) ?? []).length > 0

  const relations = (pageType: string): readonly Relation[] => {
    const found = new Map<string, Relation>()
    for (const kind of chainOf(pageType))
      for (const [key, declaration] of declared.get(kind) ?? [])
        if (!found.has(key) && declaration.target !== null)
          found.set(key, { key, target: declaration.target, slugProperty: declaration.slugProperty })
    return [...found.values()]
  }

  const backed = (): readonly Backed[] => {
    const found: Backed[] = []
    for (const [slug, kind] of kinds) {
      const heldBy = (carriers.get(slug) ?? []).map((each) => `${each.on}.${each.name}`).sort()
      const filed = isFiled(slug)
      if (!filed && heldBy.length === 0) continue
      const namedFor =
        chainOf(slug)
          .map((each) => kinds.get(each)?.namedFor ?? null)
          .find((each) => each !== null) ?? null
      const homes = kind.filed.filter((each) => each.repo !== null)
      if (filed && homes.length > 1)
        fault(
          `\`${slug}\` states its files in ${homes.length} repositories, and what reads this names one`
        )
      const home = homes[0]
      found.push({
        slug,
        repo: filed && home !== undefined ? home.repo : null,
        glob: filed && home !== undefined ? (home.place ?? placeOf(slug)) : null,
        heldBy,
        namedFor,
      })
    }
    return found.sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0))
  }

  return { isFiled, isHeld, relations, backed }
}
