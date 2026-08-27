/**
 * Mundus Mappings (Generated)
 *
 * Maps ESO mundus IDs to temper indices and string IDs.
 * Source: engine/character/mundus-source.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const MUNDUS_ESO_ID_TO_INDEX: Record<number, number> = {
  [13979]: 1, // The Apprentice
  [13982]: 2, // The Atronach
  [13976]: 3, // The Lady
  [13981]: 4, // The Lover
  [13978]: 5, // The Lord
  [13943]: 6, // The Mage
  [13980]: 7, // The Ritual
  [13974]: 8, // The Serpent
  [13984]: 9, // The Shadow
  [13977]: 10, // The Steed
  [13975]: 11, // The Thief
  [13985]: 12, // The Tower
  [13940]: 13, // The Warrior
}

export const MUNDUS_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [13979]: "the-apprentice", // The Apprentice
  [13982]: "the-atronach", // The Atronach
  [13976]: "the-lady", // The Lady
  [13981]: "the-lover", // The Lover
  [13978]: "the-lord", // The Lord
  [13943]: "the-mage", // The Mage
  [13980]: "the-ritual", // The Ritual
  [13974]: "the-serpent", // The Serpent
  [13984]: "the-shadow", // The Shadow
  [13977]: "the-steed", // The Steed
  [13975]: "the-thief", // The Thief
  [13985]: "the-tower", // The Tower
  [13940]: "the-warrior", // The Warrior
}

export function getMundusIndex(esoMundusId: number): number {
  return MUNDUS_ESO_ID_TO_INDEX[esoMundusId] ?? 0
}

export function getMundusTemperId(esoMundusId: number): string {
  return MUNDUS_ESO_ID_TO_TEMPER_ID[esoMundusId] ?? "no-mundus"
}
