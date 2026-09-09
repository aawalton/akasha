export const GLYPH_TYPES: Array<[number, number, number]> = [
  [26580, 45831, 1],
  [43573, 45831, -1],
  [26582, 45832, 1],
  [45868, 45832, -1],
  [26588, 45833, 1],
  [45867, 45833, -1],
  [26581, 45834, 1],
  [45869, 45834, -1],
  [26583, 45835, 1],
  [45870, 45835, -1],
  [26589, 45836, 1],
  [45871, 45836, -1],
  [26587, 45837, 1],
  [26586, 45837, -1],
  [26848, 45838, 1],
  [26849, 45838, -1],
  [5365, 45839, 1],
  [5364, 45839, -1],
  [26844, 45840, 1],
  [43570, 45840, -1],
  [26841, 45841, 1],
  [26847, 45841, -1],
  [5366, 45842, 1],
  [26845, 45842, -1],
  [54484, 45843, 1],
  [26591, 45843, -1],
  [45874, 45846, 1],
  [45875, 45846, -1],
  [45883, 45847, 1],
  [45885, 45847, -1],
  [45884, 45848, 1],
  [45886, 45848, -1],
  [45872, 45849, 1],
  [45873, 45849, -1],
  [68343, 68342, 1],
  [68344, 68342, -1],
  [166047, 166045, 1],
  [166046, 166045, -1],
]

export const LEVEL_TIERS: Array<[number, number, number, number]> = [
  [20, 5, 45855, 45817],
  [20, 10, 45856, 45818],
  [20, 15, 45857, 45819],
  [20, 20, 45806, 45820],
  [20, 25, 45807, 45821],
  [20, 30, 45808, 45822],
  [20, 35, 45809, 45823],
  [20, 40, 45810, 45824],
  [20, 45, 45811, 45825],
  [125, 50, 45812, 45826],
  [127, 50, 45813, 45827],
  [129, 50, 45814, 45828],
  [131, 50, 45815, 45829],
  [272, 50, 45816, 45830],
  [308, 50, 64509, 64508],
  [366, 50, 68341, 68340],
]

export const TA_ITEM_ID = 45850

export const ASPECT_RUNE_BY_QUALITY: Record<number, number> = {
  1: TA_ITEM_ID,
  2: 45851,
  3: 45852,
  4: 45853,
  5: 45854,
}

export function selectPotencyRune(
  polarity: number,
  additiveRuneId: number,
  subtractiveRuneId: number
): number {
  return polarity > 0 ? additiveRuneId : subtractiveRuneId
}

export interface MasterEnchantingRunes {
  potencyRuneId: number
  essenceRuneId: number
  aspectRuneId: number
}

export const MASTER_WRIT_TIER_BY_MATERIAL_ID: Record<number, number> = {
  207: 308,
  225: 366,
}

export function selectMasterEnchantingRunes(
  glyphItemId: number,
  targetQuality: number,
  materialItemId: number
): MasterEnchantingRunes | undefined {
  let essenceRuneId = -1
  let polarity = 0
  for (const [gid, runeId, pol] of GLYPH_TYPES) {
    if (gid === glyphItemId) {
      essenceRuneId = runeId
      polarity = pol
      break
    }
  }
  if (essenceRuneId === -1) return undefined

  const aspectRuneId = ASPECT_RUNE_BY_QUALITY[targetQuality]
  if (aspectRuneId === undefined) return undefined

  const tierQuality = MASTER_WRIT_TIER_BY_MATERIAL_ID[materialItemId]
  if (tierQuality === undefined) return undefined
  let tier: [number, number, number, number] | undefined
  for (const row of LEVEL_TIERS) {
    if (row[0] === tierQuality) {
      tier = row
      break
    }
  }
  if (tier === undefined) return undefined
  const [, , additiveRuneId, subtractiveRuneId] = tier
  const potencyRuneId = selectPotencyRune(polarity, additiveRuneId, subtractiveRuneId)

  return { potencyRuneId, essenceRuneId, aspectRuneId }
}
