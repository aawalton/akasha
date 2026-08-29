import { SEAT_DIR, SUBAGENT_DIR } from "../../agent/places.ts"
import { type Roots } from "../../page/page.ts"
import { resolveRoots } from "../../repo/roots/roots.ts"

export interface Place {
  readonly repo: string
  readonly dir: string
}

const AKASHA_SEAT: Place = { repo: "akasha", dir: SEAT_DIR }

const AKASHA_SUBAGENT: Place = { repo: "akasha", dir: SUBAGENT_DIR }

export const SEAT_PLACES: readonly Place[] = [AKASHA_SEAT]

export const SUBAGENT_PLACES: readonly Place[] = [AKASHA_SUBAGENT]

export const SEAT_WRITE: Place = AKASHA_SEAT

export const SUBAGENT_WRITE: Place = AKASHA_SUBAGENT

export function rootOfPlace(place: Place, roots: Roots = resolveRoots()): string | null {
  const held = roots[place.repo]
  return typeof held === "string" ? held : null
}

export function dirOfPlace(place: Place, roots: Roots = resolveRoots()): string | null {
  const root = rootOfPlace(place, roots)
  return root === null ? null : `${root}/${place.dir}`
}

export function dirOfPlaceHeld(place: Place, roots: Roots = resolveRoots()): string {
  const dir = dirOfPlace(place, roots)
  if (dir === null) throw new Error(`no root is known for the \`${place.repo}\` repository`)
  return dir
}

export function dirsOfPlaces(
  places: readonly Place[],
  roots: Roots = resolveRoots()
): readonly string[] {
  const found: string[] = []
  for (const place of places) {
    const dir = dirOfPlace(place, roots)
    if (dir !== null) found.push(dir)
  }
  return found
}

export function placeHolding(
  absolute: string,
  places: readonly Place[],
  roots: Roots = resolveRoots()
): Place | null {
  for (const place of places) {
    const dir = dirOfPlace(place, roots)
    if (dir !== null && absolute.startsWith(`${dir}/`)) return place
  }
  return null
}

export function relPathOfPlaced(
  absolute: string,
  places: readonly Place[],
  roots: Roots = resolveRoots()
): string | null {
  const place = placeHolding(absolute, places, roots)
  if (place === null) return null
  const root = rootOfPlace(place, roots)
  return root === null ? null : absolute.slice(root.length + 1)
}
