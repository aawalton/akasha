const MUNDUS_ESO_ID_TO_INDEX: Record<number, number> = {
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
export function getMundusIndex(esoMundusId: number): number {
  return MUNDUS_ESO_ID_TO_INDEX[esoMundusId] ?? 0
}
