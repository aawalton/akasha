/**
 * Character Class Mappings (Generated)
 *
 * Maps ESO class IDs to temper indices and string IDs.
 * Source: engine/character/classes-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const CLASS_ESO_ID_TO_INDEX: Record<number, number> = {
  [117]: 0, // Arcanist
  [1]: 1, // Dragonknight
  [5]: 2, // Necromancer
  [3]: 3, // Nightblade
  [2]: 5, // Sorcerer
  [6]: 6, // Templar
  [4]: 7, // Warden
}

export const CLASS_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [117]: "arcanist", // Arcanist
  [1]: "dragonknight", // Dragonknight
  [5]: "necromancer", // Necromancer
  [3]: "nightblade", // Nightblade
  [2]: "sorcerer", // Sorcerer
  [6]: "templar", // Templar
  [4]: "warden", // Warden
}

export function getClassIndex(esoClassId: number): number {
  return CLASS_ESO_ID_TO_INDEX[esoClassId] ?? 0
}

export function getClassTemperId(esoClassId: number): string {
  return CLASS_ESO_ID_TO_TEMPER_ID[esoClassId] ?? "no-class"
}
