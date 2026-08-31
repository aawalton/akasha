import { existsSync } from "node:fs"
import { initiativesDrawn } from "../../akasha/editor-extension/work-initiatives/work-initiatives.module.code.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { pageTextOf } from "./seat-page-values.ts"

const KEY = "initiative"

export const INITIATIVE_SLUG_KEY = "initiative-slug"

export interface InitiativeRecord {
  readonly value: string
}

export interface InitiativePlace {
  readonly relPath: string
  readonly pageTypeSlug: string
}

// An initiative is a page standing in akasha, found through the index rather than by walking, and a
// slug is unique among the pages of its page type. So a slug reaches one initiative or none, and
// there is no spelling to take apart and no ambiguity to refuse.

export function initiativesIn(root: string): ReadonlyMap<string, string> {
  return new Map(initiativesDrawn(root).map((one) => [one.slug, one.path]))
}

export function initiativeStemOf(bare: string, root: string): string | null {
  return initiativesIn(root).has(bare) ? bare : null
}

export function initiativePlaceOf(bare: string, root: string): InitiativePlace | null {
  const at = initiativesIn(root).get(bare)
  if (at === undefined || !existsSync(`${root}/${at}`)) return null
  return { relPath: at, pageTypeSlug: KEY }
}

export function initiativeOf(agent: string, roots: Roots = resolveRoots()): InitiativeRecord | null {
  const bare = pageTextOf(agent, INITIATIVE_SLUG_KEY)
  if (bare === null) return null
  return { value: initiativeStemOf(bare, rootFor(roots, AKASHA)) ?? bare }
}

function placeOf(found: ReadonlyMap<string, string>): string {
  const [first] = found.values()
  const cut = first === undefined ? -1 : first.lastIndexOf("/")
  return first === undefined || cut === -1 ? AKASHA : first.slice(0, cut)
}

export function refuseInitiative(slug: string, root: string): readonly string[] {
  const found = initiativesIn(root)
  if (found.has(slug)) return []
  const known = [...found.keys()]
  return [
    `initiative: nothing under ${placeOf(found)}/ is named \`${slug}\`, so the seat would name no ` +
      `initiative at all. There: ${known.length === 0 ? "nothing yet" : known.sort().join(", ")}`,
  ]
}

export function initiativeLine(record: InitiativeRecord | null): string {
  return `  ${KEY.padEnd(8)} ${record === null ? "— none stated" : record.value}`
}
