import { describe, expect, test } from "bun:test"
import {
  ASPECT_RUNE_BY_QUALITY,
  GLYPH_TYPES,
  LEVEL_TIERS,
  MASTER_WRIT_TIER_BY_MATERIAL_ID,
  selectMasterEnchantingRunes,
  selectPotencyRune,
  TA_ITEM_ID,
} from "./writ-crafting-glyph-table"

describe("GLYPH_TYPES table integrity", () => {
  test("every entry is a [glyphId, essenceRuneId, polarity] triple of valid values", () => {
    for (const entry of GLYPH_TYPES) {
      expect(entry.length).toBe(3)
      const [glyphId, runeId, polarity] = entry
      expect(glyphId).toBeGreaterThan(0)
      expect(runeId).toBeGreaterThan(0)
      expect(polarity === 1 || polarity === -1).toBe(true)
    }
  })

  test("no duplicate glyph item id", () => {
    const ids = GLYPH_TYPES.map(([glyphId]) => glyphId)
    expect(new Set(ids).size).toBe(ids.length)
  })

  test("each essence rune appears once additive (+1) and once subtractive (-1)", () => {
    const byRune = new Map<number, Set<number>>()
    for (const [, runeId, polarity] of GLYPH_TYPES) {
      const polarities = byRune.get(runeId) ?? new Set<number>()
      polarities.add(polarity)
      byRune.set(runeId, polarities)
    }
    for (const [, polarities] of byRune) {
      expect(polarities.has(1)).toBe(true)
      expect(polarities.has(-1)).toBe(true)
    }
  })

  test("retains the four originally-verified glyph mappings", () => {
    const contains = (g: number, r: number, p: number) =>
      GLYPH_TYPES.some(([gi, ri, pi]) => gi === g && ri === r && pi === p)
    expect(contains(26580, 45831, 1)).toBe(true)
    expect(contains(26582, 45832, 1)).toBe(true)
    expect(contains(26588, 45833, 1)).toBe(true)
    expect(contains(45886, 45848, -1)).toBe(true)
  })
})

describe("LEVEL_TIERS table integrity", () => {
  test("every entry is a [quality, level, additiveRuneId, subtractiveRuneId] quad", () => {
    for (const entry of LEVEL_TIERS) {
      expect(entry.length).toBe(4)
      for (const v of entry) expect(v).toBeGreaterThan(0)
    }
  })
})

describe("selectPotencyRune", () => {
  test("positive polarity picks the additive rune", () => {
    expect(selectPotencyRune(1, 111, 222)).toBe(111)
  })

  test("negative polarity picks the subtractive rune", () => {
    expect(selectPotencyRune(-1, 111, 222)).toBe(222)
  })
})

describe("TA_ITEM_ID", () => {
  test("is the white aspect rune used for all daily writs", () => {
    expect(TA_ITEM_ID).toBe(45850)
  })
})

describe("ASPECT_RUNE_BY_QUALITY", () => {
  test("maps every quality tier to its aspect rune id", () => {
    expect(ASPECT_RUNE_BY_QUALITY[1]).toBe(45850)
    expect(ASPECT_RUNE_BY_QUALITY[2]).toBe(45851)
    expect(ASPECT_RUNE_BY_QUALITY[3]).toBe(45852)
    expect(ASPECT_RUNE_BY_QUALITY[4]).toBe(45853)
    expect(ASPECT_RUNE_BY_QUALITY[5]).toBe(45854)
  })

  test("white tier aspect rune equals TA_ITEM_ID (daily-writ aspect)", () => {
    expect(ASPECT_RUNE_BY_QUALITY[1]).toBe(TA_ITEM_ID)
  })
})

describe("MASTER_WRIT_TIER_BY_MATERIAL_ID", () => {
  test("maps 207 → CP150 (q308) and 225 → CP160 (q366)", () => {
    expect(MASTER_WRIT_TIER_BY_MATERIAL_ID[207]).toBe(308)
    expect(MASTER_WRIT_TIER_BY_MATERIAL_ID[225]).toBe(366)
  })

  test("every mapped tier exists in LEVEL_TIERS (drift guard)", () => {
    for (const quality of Object.values(MASTER_WRIT_TIER_BY_MATERIAL_ID)) {
      expect(LEVEL_TIERS.some(([q]) => q === quality)).toBe(true)
    }
  })
})

describe("selectMasterEnchantingRunes", () => {
  const CP150_ADDITIVE_POTENCY = 64509
  const CP150_SUBTRACTIVE_POTENCY = 64508
  const CP160_ADDITIVE_POTENCY = 68341
  const CP160_SUBTRACTIVE_POTENCY = 68340
  const SUPERB_WRIT = 207
  const TRULY_SUPERB_WRIT = 225

  test("top tier is CP160 'Truly Superb' (q366), CP150 'Superb' (q308) directly below (drift guard)", () => {
    const top = LEVEL_TIERS[LEVEL_TIERS.length - 1]
    expect(top?.[0]).toBe(366)
    expect(top?.[2]).toBe(CP160_ADDITIVE_POTENCY)
    expect(top?.[3]).toBe(CP160_SUBTRACTIVE_POTENCY)
    const cp150 = LEVEL_TIERS[LEVEL_TIERS.length - 2]
    expect(cp150?.[0]).toBe(308)
    expect(cp150?.[2]).toBe(CP150_ADDITIVE_POTENCY)
    expect(cp150?.[3]).toBe(CP150_SUBTRACTIVE_POTENCY)
  })

  test("Superb (CP150) writ selects the CP150 potency runes — never CP160 (#14208)", () => {
    expect(selectMasterEnchantingRunes(43570, 5, SUPERB_WRIT)?.potencyRuneId).toBe(
      CP150_SUBTRACTIVE_POTENCY
    )
    expect(selectMasterEnchantingRunes(26844, 5, SUPERB_WRIT)?.potencyRuneId).toBe(
      CP150_ADDITIVE_POTENCY
    )
  })

  test("Truly Superb (CP160) writ selects the CP160 potency runes — never CP150 (#13406)", () => {
    expect(selectMasterEnchantingRunes(43570, 5, TRULY_SUPERB_WRIT)?.potencyRuneId).toBe(
      CP160_SUBTRACTIVE_POTENCY
    )
    expect(selectMasterEnchantingRunes(26844, 5, TRULY_SUPERB_WRIT)?.potencyRuneId).toBe(
      CP160_ADDITIVE_POTENCY
    )
  })

  test("positive glyph at gold → additive tier potency + essence + gold aspect", () => {
    const runes = selectMasterEnchantingRunes(26580, 5, TRULY_SUPERB_WRIT)
    expect(runes).toEqual({
      potencyRuneId: CP160_ADDITIVE_POTENCY,
      essenceRuneId: 45831,
      aspectRuneId: 45854,
    })
  })

  test("negative glyph picks the subtractive potency rune of its tier", () => {
    const runes = selectMasterEnchantingRunes(43573, 5, TRULY_SUPERB_WRIT)
    expect(runes?.potencyRuneId).toBe(CP160_SUBTRACTIVE_POTENCY)
    expect(runes?.essenceRuneId).toBe(45831)
  })

  test("target quality selects the matching aspect rune", () => {
    expect(selectMasterEnchantingRunes(26582, 4, TRULY_SUPERB_WRIT)?.aspectRuneId).toBe(45853)
    expect(selectMasterEnchantingRunes(26582, 3, SUPERB_WRIT)?.aspectRuneId).toBe(45852)
  })

  test("unknown glyph item id → undefined (fail safe, never craft a guess)", () => {
    expect(selectMasterEnchantingRunes(999999, 5, TRULY_SUPERB_WRIT)).toBeUndefined()
  })

  test("unmapped target quality → undefined", () => {
    expect(selectMasterEnchantingRunes(26580, 0, TRULY_SUPERB_WRIT)).toBeUndefined()
    expect(selectMasterEnchantingRunes(26580, 6, TRULY_SUPERB_WRIT)).toBeUndefined()
  })

  test("unknown materialItemId (writ tier) → undefined (fail safe, never guess the tier)", () => {
    expect(selectMasterEnchantingRunes(26580, 5, 0)).toBeUndefined()
    expect(selectMasterEnchantingRunes(26580, 5, 999)).toBeUndefined()
  })
})
