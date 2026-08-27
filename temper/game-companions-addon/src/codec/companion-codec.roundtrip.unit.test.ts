import { beforeAll, describe, expect, it } from "bun:test"

const ESO_ENUM_GLOBALS = [
  "EQUIP_SLOT_HEAD",
  "EQUIP_SLOT_SHOULDERS",
  "EQUIP_SLOT_CHEST",
  "EQUIP_SLOT_HAND",
  "EQUIP_SLOT_WAIST",
  "EQUIP_SLOT_LEGS",
  "EQUIP_SLOT_FEET",
  "EQUIP_SLOT_NECK",
  "EQUIP_SLOT_RING1",
  "EQUIP_SLOT_RING2",
  "EQUIP_SLOT_MAIN_HAND",
  "EQUIP_SLOT_OFF_HAND",
  "BAG_COMPANION_WORN",
  "LINK_STYLE_DEFAULT",
  "HOTBAR_CATEGORY_COMPANION",
  "ARMORTYPE_NONE",
  "ARMORTYPE_LIGHT",
  "ARMORTYPE_MEDIUM",
  "ARMORTYPE_HEAVY",
  "ITEM_DISPLAY_QUALITY_TRASH",
  "ITEM_DISPLAY_QUALITY_NORMAL",
  "ITEM_DISPLAY_QUALITY_MAGIC",
  "ITEM_DISPLAY_QUALITY_ARCANE",
  "ITEM_DISPLAY_QUALITY_ARTIFACT",
  "ITEM_DISPLAY_QUALITY_LEGENDARY",
  "ITEM_DISPLAY_QUALITY_MYTHIC_OVERRIDE",
  "ITEM_TRAIT_TYPE_NONE",
  "ITEM_TRAIT_TYPE_ARMOR_AGGRESSIVE",
  "ITEM_TRAIT_TYPE_ARMOR_AUGMENTED",
  "ITEM_TRAIT_TYPE_ARMOR_BOLSTERED",
  "ITEM_TRAIT_TYPE_ARMOR_FOCUSED",
  "ITEM_TRAIT_TYPE_ARMOR_PROLIFIC",
  "ITEM_TRAIT_TYPE_ARMOR_QUICKENED",
  "ITEM_TRAIT_TYPE_ARMOR_SHATTERING",
  "ITEM_TRAIT_TYPE_ARMOR_SOOTHING",
  "ITEM_TRAIT_TYPE_ARMOR_VIGOROUS",
  "ITEM_TRAIT_TYPE_JEWELRY_AGGRESSIVE",
  "ITEM_TRAIT_TYPE_JEWELRY_AUGMENTED",
  "ITEM_TRAIT_TYPE_JEWELRY_BOLSTERED",
  "ITEM_TRAIT_TYPE_JEWELRY_FOCUSED",
  "ITEM_TRAIT_TYPE_JEWELRY_PROLIFIC",
  "ITEM_TRAIT_TYPE_JEWELRY_QUICKENED",
  "ITEM_TRAIT_TYPE_JEWELRY_SHATTERING",
  "ITEM_TRAIT_TYPE_JEWELRY_SOOTHING",
  "ITEM_TRAIT_TYPE_JEWELRY_VIGOROUS",
  "ITEM_TRAIT_TYPE_WEAPON_AGGRESSIVE",
  "ITEM_TRAIT_TYPE_WEAPON_AUGMENTED",
  "ITEM_TRAIT_TYPE_WEAPON_BOLSTERED",
  "ITEM_TRAIT_TYPE_WEAPON_FOCUSED",
  "ITEM_TRAIT_TYPE_WEAPON_PROLIFIC",
  "ITEM_TRAIT_TYPE_WEAPON_QUICKENED",
  "ITEM_TRAIT_TYPE_WEAPON_SHATTERING",
  "ITEM_TRAIT_TYPE_WEAPON_SOOTHING",
  "ITEM_TRAIT_TYPE_WEAPON_VIGOROUS",
  "WEAPONTYPE_NONE",
  "WEAPONTYPE_AXE",
  "WEAPONTYPE_HAMMER",
  "WEAPONTYPE_SWORD",
  "WEAPONTYPE_DAGGER",
  "WEAPONTYPE_TWO_HANDED_SWORD",
  "WEAPONTYPE_TWO_HANDED_AXE",
  "WEAPONTYPE_TWO_HANDED_HAMMER",
  "WEAPONTYPE_BOW",
  "WEAPONTYPE_FIRE_STAFF",
  "WEAPONTYPE_FROST_STAFF",
  "WEAPONTYPE_LIGHTNING_STAFF",
  "WEAPONTYPE_HEALING_STAFF",
  "WEAPONTYPE_SHIELD",
] as const

type Encode = typeof import("./companion-codec").encodeCompanionBuild
type Decode = typeof import("./companion-decoder").decodeCompanionBuild
type Build = import("./companion-codec").CompanionBuildData

let encodeCompanionBuild: Encode
let decodeCompanionBuild: Decode

beforeAll(async () => {
  Object.assign(globalThis, {
    BitAnd: (a: number, b: number) => (a & b) >>> 0,
    BitOr: (a: number, b: number) => (a | b) >>> 0,
    BitLShift: (a: number, b: number) => (a << b) >>> 0,
    BitRShift: (a: number, b: number) => a >>> b,
    string: { len: (s: string) => s.length },
  })
  Object.assign(globalThis, Object.fromEntries(ESO_ENUM_GLOBALS.map((name, i) => [name, i + 1])))
  encodeCompanionBuild = (await import("./companion-codec")).encodeCompanionBuild
  decodeCompanionBuild = (await import("./companion-decoder")).decodeCompanionBuild
})

const EMPTY_BUILD: Build = {
  companionIndex: 0,
  armor: Array.from({ length: 7 }, () => ({
    isEmpty: true,
    weightIndex: 0,
    traitIndex: 0,
    qualityIndex: 0,
  })),
  jewelry: Array.from({ length: 3 }, () => ({ isEmpty: true, traitIndex: 0, qualityIndex: 0 })),
  weapons: Array.from({ length: 2 }, () => ({
    isEmpty: true,
    typeIndex: 0,
    traitIndex: 0,
    qualityIndex: 0,
  })),
  skills: [0, 0, 0, 0, 0, 0],
  targetArmorIndex: 0,
  targetHealthIndex: 0,
}

const FULL_BUILD: Build = {
  companionIndex: 8,
  armor: [
    { isEmpty: false, weightIndex: 1, traitIndex: 2, qualityIndex: 3 },
    { isEmpty: true, weightIndex: 0, traitIndex: 0, qualityIndex: 0 },
    { isEmpty: false, weightIndex: 2, traitIndex: 9, qualityIndex: 5 },
    { isEmpty: false, weightIndex: 3, traitIndex: 4, qualityIndex: 1 },
    { isEmpty: true, weightIndex: 0, traitIndex: 0, qualityIndex: 0 },
    { isEmpty: false, weightIndex: 0, traitIndex: 7, qualityIndex: 2 },
    { isEmpty: false, weightIndex: 1, traitIndex: 3, qualityIndex: 4 },
  ],
  jewelry: [
    { isEmpty: false, traitIndex: 6, qualityIndex: 3 },
    { isEmpty: true, traitIndex: 0, qualityIndex: 0 },
    { isEmpty: false, traitIndex: 1, qualityIndex: 5 },
  ],
  weapons: [
    { isEmpty: false, typeIndex: 12, traitIndex: 8, qualityIndex: 3 },
    { isEmpty: false, typeIndex: 5, traitIndex: 2, qualityIndex: 4 },
  ],
  skills: [1, 42, 7, 121, 63, 100],
  targetArmorIndex: 1,
  targetHealthIndex: 1,
}

describe("addon companion codec — self round-trip", () => {
  it("round-trips an all-empty build", () => {
    expect(decodeCompanionBuild(encodeCompanionBuild(EMPTY_BUILD))).toEqual(EMPTY_BUILD)
  })

  it("round-trips a fully-populated build with distinct field indices", () => {
    expect(decodeCompanionBuild(encodeCompanionBuild(FULL_BUILD))).toEqual(FULL_BUILD)
  })

  it("produces a URL-safe base64url hash (no padding, no +/ chars)", () => {
    const hash = encodeCompanionBuild(FULL_BUILD)
    expect(hash).toMatch(/^[A-Za-z0-9_-]+$/)
  })

  it("returns undefined for an empty hash", () => {
    expect(decodeCompanionBuild("")).toBeUndefined()
  })
})

describe("addon companion codec — legacy v7 decode (per-side own-shape)", () => {
  const LEGACY_V7_FULL_HASH = "AjAHgFJOprQw6JwzhrIZSgFUH8v8kA"

  it("decodes a legacy v7 addon hash into the v8 build shape", () => {
    const decoded = decodeCompanionBuild(LEGACY_V7_FULL_HASH)
    expect(decoded).toBeDefined()
    if (!decoded) return

    expect(decoded.companionIndex).toBe(FULL_BUILD.companionIndex)
    expect(decoded.armor).toEqual(FULL_BUILD.armor)
    expect(decoded.jewelry).toEqual(FULL_BUILD.jewelry)
    expect(decoded.weapons).toEqual(FULL_BUILD.weapons)
    expect(decoded.skills).toEqual(FULL_BUILD.skills)
    expect(decoded.targetArmorIndex).toBe(1)
    expect(decoded.targetHealthIndex).toBe(0)
  })
})

describe("addon companion codec — byte-layout pin (known-answer)", () => {
  it("encodes FULL_BUILD to its pinned hash", () => {
    expect(encodeCompanionBuild(FULL_BUILD)).toBe("AjAIgk6mtDDonDOGshlKAVQfy_yY")
  })
})
