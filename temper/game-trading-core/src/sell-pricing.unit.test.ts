import { describe, expect, it } from "bun:test"
import {
  getItemPriceKey,
  ITEMTYPE_ARMOR,
  ITEMTYPE_DRINK,
  ITEMTYPE_FOOD,
  ITEMTYPE_GLYPH_ARMOR,
  ITEMTYPE_GLYPH_JEWELRY,
  ITEMTYPE_GLYPH_WEAPON,
  ITEMTYPE_POISON,
  ITEMTYPE_POTION,
  ITEMTYPE_WEAPON,
  suggestSellPrice,
} from "./sell-pricing"

function buildLink(opts: {
  itemId: number
  subType?: number
  level?: number
  trait?: number
  potionData?: number
}): string {
  const fields = new Array<number>(21).fill(0)
  fields[0] = opts.itemId
  fields[1] = opts.subType ?? 0
  fields[2] = opts.level ?? 0
  fields[6] = opts.trait ?? 0
  fields[20] = opts.potionData ?? 0
  return `|H1:item:${fields.join(":")}|h|h`
}

describe("getItemPriceKey", () => {
  it("produces distinct keys for two glyphs differing only in data4 (subType/enchantId)", () => {
    const weakGlyph = buildLink({ itemId: 45831, subType: 10 })
    const strongGlyph = buildLink({ itemId: 45831, subType: 16 })

    const weakKey = getItemPriceKey({
      itemLink: weakGlyph,
      itemType: ITEMTYPE_GLYPH_WEAPON,
      hasDifferentQualities: true,
    })
    const strongKey = getItemPriceKey({
      itemLink: strongGlyph,
      itemType: ITEMTYPE_GLYPH_WEAPON,
      hasDifferentQualities: true,
    })

    expect(weakKey).toBe("45831,10")
    expect(strongKey).toBe("45831,16")
    expect(weakKey).not.toBe(strongKey)
  })

  it("produces identical keys for two weapons identical in all five keyed fields but differing in a non-keyed field", () => {
    const baseWeapon = buildLink({
      itemId: 16424,
      subType: 364,
      level: 50,
      trait: 7,
      potionData: 0,
    })
    const sameWeaponOtherField = buildLink({
      itemId: 16424,
      subType: 364,
      level: 50,
      trait: 7,
      potionData: 999,
    })

    const keyA = getItemPriceKey({
      itemLink: baseWeapon,
      itemType: ITEMTYPE_WEAPON,
      hasDifferentQualities: false,
    })
    const keyB = getItemPriceKey({
      itemLink: sameWeaponOtherField,
      itemType: ITEMTYPE_WEAPON,
      hasDifferentQualities: false,
    })

    expect(keyA).toBe("16424,364,7,50,50")
    expect(keyB).toBe(keyA)
  })

  it("keys armor on the same five-field scheme as weapons", () => {
    const armor = buildLink({ itemId: 54321, subType: 360, level: 50, trait: 2 })
    const key = getItemPriceKey({
      itemLink: armor,
      itemType: ITEMTYPE_ARMOR,
      hasDifferentQualities: false,
    })
    expect(key).toBe("54321,360,2,50,50")
  })

  it("keys potions/poisons on itemId,level,cp,data23", () => {
    const potion = buildLink({ itemId: 30148, level: 50, potionData: 84740 })
    const potionKey = getItemPriceKey({
      itemLink: potion,
      itemType: ITEMTYPE_POTION,
      hasDifferentQualities: false,
    })
    expect(potionKey).toBe("30148,50,50,84740")

    const poison = buildLink({ itemId: 79690, level: 0, potionData: 12345 })
    const poisonKey = getItemPriceKey({
      itemLink: poison,
      itemType: ITEMTYPE_POISON,
      hasDifferentQualities: false,
    })
    expect(poisonKey).toBe("79690,0,0,12345")
  })

  it("distinguishes two potions differing only in data23 (effect)", () => {
    const potionA = buildLink({ itemId: 30148, level: 50, potionData: 100 })
    const potionB = buildLink({ itemId: 30148, level: 50, potionData: 200 })
    const keyA = getItemPriceKey({
      itemLink: potionA,
      itemType: ITEMTYPE_POTION,
      hasDifferentQualities: false,
    })
    const keyB = getItemPriceKey({
      itemLink: potionB,
      itemType: ITEMTYPE_POTION,
      hasDifferentQualities: false,
    })
    expect(keyA).not.toBe(keyB)
  })

  it("keys food/drink glyphs on itemId,data4 (hasDifferentQualities branch)", () => {
    const food = buildLink({ itemId: 64711, subType: 5 })
    const foodKey = getItemPriceKey({
      itemLink: food,
      itemType: ITEMTYPE_FOOD,
      hasDifferentQualities: true,
    })
    expect(foodKey).toBe("64711,5")

    const drink = buildLink({ itemId: 64713, subType: 3 })
    expect(
      getItemPriceKey({
        itemLink: drink,
        itemType: ITEMTYPE_DRINK,
        hasDifferentQualities: true,
      })
    ).toBe("64713,3")

    const armorGlyph = buildLink({ itemId: 45852, subType: 12 })
    expect(
      getItemPriceKey({
        itemLink: armorGlyph,
        itemType: ITEMTYPE_GLYPH_ARMOR,
        hasDifferentQualities: true,
      })
    ).toBe("45852,12")

    const jewelryGlyph = buildLink({ itemId: 139388, subType: 8 })
    expect(
      getItemPriceKey({
        itemLink: jewelryGlyph,
        itemType: ITEMTYPE_GLYPH_JEWELRY,
        hasDifferentQualities: true,
      })
    ).toBe("139388,8")
  })

  it("returns the bare itemId for a generic item (no variation scheme)", () => {
    const trophy = buildLink({ itemId: 12345, subType: 1 })
    const key = getItemPriceKey({
      itemLink: trophy,
      itemType: 999,
      hasDifferentQualities: false,
    })
    expect(key).toBe("12345")
  })

  it("falls back to a stable key when the link cannot be parsed", () => {
    const key = getItemPriceKey({
      itemLink: "not-a-link",
      itemType: ITEMTYPE_WEAPON,
      hasDifferentQualities: false,
    })
    expect(typeof key).toBe("string")
    expect(key.length).toBeGreaterThan(0)
  })
})

describe("suggestSellPrice", () => {
  it("prefers the per-item last-sold price when present", () => {
    const result = suggestSellPrice({
      lastSoldPpu: 250,
      ttcMarketPpu: 180,
      vendorValue: 10,
    })
    expect(result).toEqual({ pricePerUnit: 250, source: "last-sold" })
  })

  it("falls through to TTC/market when last-sold is absent", () => {
    const result = suggestSellPrice({
      ttcMarketPpu: 180,
      vendorValue: 10,
    })
    expect(result).toEqual({ pricePerUnit: 180, source: "ttc" })
  })

  it("falls through to 3x vendor when both last-sold and TTC are absent", () => {
    const result = suggestSellPrice({ vendorValue: 10 })
    expect(result).toEqual({ pricePerUnit: 30, source: "vendor-multiple" })
  })

  it("treats a 0 last-sold as absent and falls through to TTC", () => {
    const result = suggestSellPrice({
      lastSoldPpu: 0,
      ttcMarketPpu: 180,
      vendorValue: 10,
    })
    expect(result).toEqual({ pricePerUnit: 180, source: "ttc" })
  })

  it("treats a 0 TTC as absent and falls through to 3x vendor", () => {
    const result = suggestSellPrice({
      lastSoldPpu: 0,
      ttcMarketPpu: 0,
      vendorValue: 12,
    })
    expect(result).toEqual({ pricePerUnit: 36, source: "vendor-multiple" })
  })

  it("treats undefined last-sold and TTC explicitly as absent", () => {
    const result = suggestSellPrice({
      lastSoldPpu: undefined,
      ttcMarketPpu: undefined,
      vendorValue: 5,
    })
    expect(result).toEqual({ pricePerUnit: 15, source: "vendor-multiple" })
  })

  it("is deterministic for a zero-vendor item with no signals", () => {
    const result = suggestSellPrice({ vendorValue: 0 })
    expect(result).toEqual({ pricePerUnit: 0, source: "vendor-multiple" })
  })
})
