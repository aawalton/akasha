const CLASS_ESO_ID_TO_INDEX: Record<number, number> = {
  [117]: 0,
  [1]: 1,
  [5]: 2,
  [3]: 3,
  [2]: 5,
  [6]: 6,
  [4]: 7,
}
const NO_CLASS_INDEX = 4

export function getClassIndex(esoClassId: number): number {
  return CLASS_ESO_ID_TO_INDEX[esoClassId] ?? NO_CLASS_INDEX
}
