import { personasStanding } from "./akasha-personas.ts"
import type { CommsRule } from "./decide-wake-match.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"

export interface PersonaTarget {
  readonly id: string
  readonly slug: string
  readonly wakeSources: readonly CommsRule[]
}

// A persona carries no wake sources. None of the forty-two ever declared any, and the
// page she stands on now states no such property, so this is what the cast says rather
// than what could not be read.
const NONE: readonly CommsRule[] = []

export async function listPersonaTargets(): Promise<readonly PersonaTarget[]> {
  const root = rootFor(resolveRoots(), AKASHA)
  return personasStanding(root).map((one) => ({
    id: one.id,
    slug: one.slug,
    wakeSources: NONE,
  }))
}

export async function listPersonaWakeSources(): Promise<ReadonlyMap<string, readonly CommsRule[]>> {
  const entries = (await listPersonaTargets())
    .filter((one) => one.wakeSources.length > 0)
    .map((one): readonly [string, readonly CommsRule[]] => [one.slug, one.wakeSources])
  return new Map(entries)
}

export async function listPersonaSlugs(): Promise<readonly string[]> {
  return (await listPersonaTargets()).map((one) => one.slug)
}
