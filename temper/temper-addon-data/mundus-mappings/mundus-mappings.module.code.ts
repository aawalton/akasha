import { mundus } from "@akasha/temper-character-sources/mundus-source"
export function generateMundusMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of mundus.ids.entries()) {
    const m = mundus.data[id]
    if (m === undefined) continue
    if (m.esoMundusId === 0) continue
    indexEntries.push(`  [${m.esoMundusId}]: ${i}, // ${m.name}`)
    temperIdEntries.push(`  [${m.esoMundusId}]: "${m.id}", // ${m.name}`)
  }

  return `\
/**
 * Mundus Mappings (Generated)
 *
 * Maps ESO mundus IDs to temper indices and string IDs.
 * Source: engine/character/mundus-source.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const MUNDUS_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const MUNDUS_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getMundusIndex(esoMundusId: number): number {
  return MUNDUS_ESO_ID_TO_INDEX[esoMundusId] ?? 0
}

export function getMundusTemperId(esoMundusId: number): string {
  return MUNDUS_ESO_ID_TO_TEMPER_ID[esoMundusId] ?? "no-mundus"
}
`
}
