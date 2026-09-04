import { races } from "@akasha/temper-races/races"
export function generateRaceMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  for (const [i, id] of races.ids.entries()) {
    const race = races.data[id]
    if (race === undefined) continue
    if (race.esoRaceId === 0) continue
    indexEntries.push(`  [${race.esoRaceId}]: ${i}, // ${race.name}`)
    temperIdEntries.push(`  [${race.esoRaceId}]: "${race.id}", // ${race.name}`)
  }

  return `\
/**
 * Character Race Mappings (Generated)
 *
 * Maps ESO race IDs to temper indices and string IDs.
 * Source: engine/character/races-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const RACE_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const RACE_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getRaceIndex(esoRaceId: number): number {
  return RACE_ESO_ID_TO_INDEX[esoRaceId] ?? 0
}

export function getRaceTemperId(esoRaceId: number): string {
  return RACE_ESO_ID_TO_TEMPER_ID[esoRaceId] ?? "no-race"
}
`
}
