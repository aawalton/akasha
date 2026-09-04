export const REAGENT_TRAITS: Record<number, Record<number, number>> = {
  30148: { 3: -1, 11: -1, 1: 1, 21: -1 },
  30149: { 9: -1, 1: -1, 13: 1, 5: -1 },
  30151: { 1: -1, 3: -1, 5: -1, 19: -1 },
  30152: { 7: -1, 1: -1, 11: 1, 3: -1 },
  30153: { 15: 1, 23: 1, 21: -1, 19: 1 },
  30154: { 11: -1, 3: -1, 7: 1, 21: 1 },
  30155: { 5: -1, 13: -1, 1: 1, 23: -1 },
  30156: { 13: -1, 5: -1, 9: 1, 17: -1 },
  30157: { 5: 1, 13: 1, 1: -1, 23: 1 },
  30158: { 11: 1, 3: 1, 7: -1, 15: 1 },
  30159: { 17: 1, 23: -1, 21: 1, 19: 1 },
  30160: { 7: 1, 1: 1, 11: -1, 3: 1 },
  30161: { 3: 1, 11: 1, 1: -1, 21: 1 },
  30162: { 13: 1, 5: 1, 9: -1, 17: 1 },
  30163: { 9: 1, 1: 1, 13: -1, 5: 1 },
  30164: { 1: 1, 3: 1, 5: 1, 19: 1 },
  30165: { 1: -1, 15: -1, 17: -1, 21: -1 },
  30166: { 1: 1, 15: 1, 17: 1, 19: -1 },
  77581: { 9: -1, 17: -1, 21: 1, 29: 1 },
  77583: { 7: -1, 9: 1, 25: 1, 29: 1 },
  77584: { 23: -1, 21: -1, 27: 1, 29: -1 },
  77585: { 1: 1, 15: -1, 27: 1, 29: 1 },
  77587: { 5: -1, 25: -1, 27: -1, 29: 1 },
  77589: { 3: -1, 23: 1, 25: -1, 27: 1 },
  77590: { 1: -1, 25: 1, 27: -1, 29: -1 },
  77591: { 7: 1, 9: 1, 25: 1, 29: -1 },
  139019: { 27: 1, 23: 1, 29: 1, 25: 1 },
  139020: { 7: 1, 23: -1, 25: -1, 29: -1 },
  150669: { 31: -1, 3: -1, 5: 1, 21: 1 },
  150670: { 31: -1, 1: -1, 3: 1, 25: 1 },
  150671: { 3: 1, 17: -1, 31: 1, 23: 1 },
  150672: { 31: -1, 15: 1, 27: -1, 1: 1 },
  150731: { 27: 1, 5: 1, 31: 1, 29: -1 },
  150789: { 31: 1, 25: -1, 21: -1, 29: 1 },
}

export function determinePotionResult(
  r1: number,
  r2: number
): { effects: Record<number, number>; count: number } {
  const interim: Record<number, number> = {}
  const r1Traits = REAGENT_TRAITS[r1]
  const r2Traits = REAGENT_TRAITS[r2]

  if (r1Traits !== undefined) {
    for (const [effectId, parity] of Object.entries(r1Traits)) {
      const eid = Number(effectId)
      interim[eid] = (interim[eid] ?? 0) + parity
    }
  }
  if (r2Traits !== undefined) {
    for (const [effectId, parity] of Object.entries(r2Traits)) {
      const eid = Number(effectId)
      interim[eid] = (interim[eid] ?? 0) + parity
    }
  }

  const final: Record<number, number> = {}
  let count = 0
  for (const [effectId, total] of Object.entries(interim)) {
    const eid = Number(effectId)
    if (total > 1) {
      final[eid] = 1
      count++
    } else if (total < -1) {
      final[eid] = -1
      count++
    }
  }
  return { effects: final, count }
}

export function getReagentShortlist(effectId: number): Record<number, Record<number, number>> {
  const parity = effectId % 2 === 0 ? -1 : 1
  const baseEffect = effectId % 2 === 0 ? effectId - 1 : effectId

  const shortList: Record<number, Record<number, number>> = {}
  for (const [reagentIdStr, traits] of Object.entries(REAGENT_TRAITS)) {
    const reagentId = Number(reagentIdStr)
    for (const [eff, p] of Object.entries(traits)) {
      if (Number(eff) === baseEffect && p === parity) {
        shortList[reagentId] = traits
      }
    }
  }
  return shortList
}

export function solveReagentPairs(effectId: number): Array<[number, number]> {
  const shortList = getReagentShortlist(effectId)
  const parity = effectId % 2 === 0 ? -1 : 1
  const baseEffect = effectId % 2 === 0 ? effectId - 1 : effectId

  const pairs: Array<[number, number]> = []
  for (const [r1Str] of Object.entries(shortList)) {
    const r1 = Number(r1Str)
    for (const [r2Str] of Object.entries(shortList)) {
      const r2 = Number(r2Str)
      if (r1 === r2) continue

      const result = determinePotionResult(r1, r2)
      if (result.count === 1 && result.effects[baseEffect] === parity) {
        pairs.push([r1, r2])
      }
    }
  }
  return pairs
}
