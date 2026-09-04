import { companions } from "@akasha/temper-companions-core/companions"

export function generateCompanionMappings(): string {
  const entries: string[] = []
  for (const [i, id] of companions.ids.entries()) {
    const companion = companions.data[id]
    if (companion === undefined) continue
    if (companion.esoCompanionId === 0) continue
    entries.push(`  [${companion.esoCompanionId}]: ${i}, // ${companion.name}`)
  }

  const sortedByName = companions.list
    .filter((c) => c.esoCompanionId !== 0)
    .sort((a, b) => a.name.localeCompare(b.name))
  const defIdArray = sortedByName.map((c) => c.esoCompanionId).join(", ")

  return `\
/**
 * Companion Mappings (Generated)
 *
 * Maps ESO companion IDs to temper indices.
 * Source: engine/companions/companions-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const COMPANION_ID_TO_INDEX: Record<number, number> = {
${entries.join("\n")}
}

/** All ESO companion IDs, sorted alphabetically by name. */
export const ALL_COMPANION_IDS: number[] = [${defIdArray}]

export function getCompanionIndex(companionId: number): number {
  return COMPANION_ID_TO_INDEX[companionId] ?? 0
}
`
}
