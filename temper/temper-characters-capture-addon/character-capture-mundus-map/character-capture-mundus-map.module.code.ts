export const MUNDUS_ESO_ID_TO_INDEX: Record<number, number> = {
  [13979]: 1,
  [13982]: 2,
  [13976]: 3,
  [13981]: 4,
  [13978]: 5,
  [13943]: 6,
  [13980]: 7,
  [13974]: 8,
  [13984]: 9,
  [13977]: 10,
  [13975]: 11,
  [13985]: 12,
  [13940]: 13,
}
export const MUNDUS_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
  [13979]: "the-apprentice",
  [13982]: "the-atronach",
  [13976]: "the-lady",
  [13981]: "the-lover",
  [13978]: "the-lord",
  [13943]: "the-mage",
  [13980]: "the-ritual",
  [13974]: "the-serpent",
  [13984]: "the-shadow",
  [13977]: "the-steed",
  [13975]: "the-thief",
  [13985]: "the-tower",
  [13940]: "the-warrior",
}
export function getMundusIndex(esoMundusId: number): number {
  return MUNDUS_ESO_ID_TO_INDEX[esoMundusId] ?? 0
}
export function getMundusTemperId(esoMundusId: number): string {
  return MUNDUS_ESO_ID_TO_TEMPER_ID[esoMundusId] ?? "no-mundus"
}
