/**
 * Character Race Mappings (Generated)
 *
 * Maps ESO race IDs to temper indices and string IDs.
 * Source: engine/character/races-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const RACE_ESO_ID_TO_INDEX: Record<number, number> = {
  [1]: 1, // Breton
  [2]: 2, // Redguard
  [3]: 3, // Orc
  [4]: 4, // Dark Elf
  [5]: 5, // Nord
  [6]: 6, // Argonian
  [7]: 7, // High Elf
  [8]: 8, // Wood Elf
  [9]: 9, // Khajiit
  [10]: 10, // Imperial
}

export const RACE_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [1]: "breton", // Breton
  [2]: "redguard", // Redguard
  [3]: "orc", // Orc
  [4]: "dunmer", // Dark Elf
  [5]: "nord", // Nord
  [6]: "argonian", // Argonian
  [7]: "altmer", // High Elf
  [8]: "bosmer", // Wood Elf
  [9]: "khajiit", // Khajiit
  [10]: "imperial", // Imperial
}

export function getRaceIndex(esoRaceId: number): number {
  return RACE_ESO_ID_TO_INDEX[esoRaceId] ?? 0
}

export function getRaceTemperId(esoRaceId: number): string {
  return RACE_ESO_ID_TO_TEMPER_ID[esoRaceId] ?? "no-race"
}
