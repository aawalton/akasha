import { expect, test } from "bun:test"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import {
  decodeBuild,
  ESO_VERSION_48,
  encodeBuild,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import {
  getAffixScriptId,
  getAllianceId,
  getArmorEnchantId,
  getArmorTraitId,
  getArmorWeightId,
  getChampionPointId,
  getClassId,
  getCurseId,
  getEsoPlusId,
  getFocusScriptId,
  getFoodOrDrinkId,
  getGrimoireId,
  getJewelryEnchantId,
  getJewelryTraitId,
  getMundusId,
  getPassiveSkillId,
  getPoisonId,
  getPotionId,
  getQualityId,
  getRaceId,
  getSetId,
  getSignatureScriptId,
  getSkillId,
  getSkillLineId,
  getVampireStageId,
  getWeaponEnchantId,
  getWeaponTraitId,
  getWeaponTypeId,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-indices/build-codec-indices.module.code.ts"
import {
  ESO_VERSION_52,
  encodeV52,
} from "akasha/temper/player/character/build/build-codec/modules/build-codec-v52/build-codec-v52.module.code.ts"
import { base64urlToBytes } from "akasha/temper/player/character/build/build-hash/modules/build-hash-base64url/build-hash-base64url.module.code.ts"
import { stampedWith } from "akasha/temper/player/character/build/build-hash/test-fixtures/build-hash-test-utils/build-hash-test-utils.test-fixture.code.ts"
import type { StandardArmorType } from "akasha/temper/catalog/gear/equipment/kind/modules/armor-types/armor-types.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"
import type {
  ArmorSlotItem,
  JewelrySlotItem,
  WeaponSlotItem,
} from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import {
  buildHash,
  buildId,
} from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const CHARACTER_BUILD_TYPE = 1

const RECORDED_MINOR_VERSION = 7

const CODEC_MINOR_VERSION = 12

const SAVED_BEFORE_RANKS =
  "ATQINIGgAABiRROBif2zihYCWgAi3FtuX_AAAAAAAAAAAAAAAAAAAAAAAAAIkAIAQBgAAgAAAAAgAAhAAACIAIgBgAABAAAgMCAAAySAAAwAAMIAAAAgDABAAAAHAACAAGKwAAABVKwAAAAAAAAAAAPgAMmWAgk14ZLOeJjBIDGFAhHmwXWK1ymYYi54JJQiAHt5m1r2nmuHsoGQ"

const RECORDED = [
  "ATQHgAAAAABgAAD__AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAK9evXHyJMqXMmzp9CjSp1KtZatWrR54-gQokaRKmTqFKpWsKFChQoAAggYQKGDiBIoWMGjh5AiSJgAAMgA",
  "ATQHgAAAAAAf_4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXr164BatWrQBQoUKAAAAGQAA",
]

function armorPiece(type: StandardArmorType, seed: number): ArmorSlotItem {
  return {
    itemType: "armor",
    data: {
      type,
      weight: getArmorWeightId(1 + (seed % 3)),
      trait: getArmorTraitId(1 + (seed % 5)),
      enchantment: getArmorEnchantId(1 + (seed % 4)),
      set: getSetId(40 + seed),
      quality: getQualityId(1 + (seed % 5)),
      enchantmentQuality: "fine",
      enchantmentSubtype: 367,
    },
  }
}

function withLevel(piece: ArmorSlotItem, level: ItemLevel): ArmorSlotItem {
  return piece.itemType === "armor" ? { itemType: "armor", data: { ...piece.data, level } } : piece
}

function jewelryPiece(type: "necklace" | "ring", seed: number): JewelrySlotItem {
  return {
    itemType: "jewelry",
    data: {
      type,
      trait: getJewelryTraitId(1 + (seed % 5)),
      enchantment: getJewelryEnchantId(1 + (seed % 5)),
      set: getSetId(90 + seed),
      quality: getQualityId(1 + (seed % 5)),
      enchantmentQuality: "superior",
    },
  }
}

function weaponPiece(seed: number): WeaponSlotItem {
  return {
    itemType: "weapon",
    data: {
      type: getWeaponTypeId(seed % 6),
      trait: getWeaponTraitId(1 + (seed % 5)),
      enchantment: getWeaponEnchantId(1 + (seed % 5)),
      poison: getPoisonId(0),
      set: getSetId(120 + seed),
      quality: getQualityId(1 + (seed % 5)),
      enchantmentQuality: "epic",
      level: seed % 2 === 0 ? "CP160" : 46,
    },
  }
}

function shieldPiece(seed: number): WeaponSlotItem {
  return {
    itemType: "shield",
    data: {
      type: "shield",
      weight: "shield",
      trait: getArmorTraitId(1 + (seed % 5)),
      enchantment: getArmorEnchantId(1 + (seed % 4)),
      set: getSetId(150 + seed),
      quality: getQualityId(4),
      enchantmentQuality: "legendary",
      enchantmentSubtype: 312,
    },
  }
}

function representativeBuild(): CharacterState {
  return {
    id: buildId(""),
    name: "",
    description: "",
    character: {
      name: "",
      roles: [],
      class: getClassId(3),
      race: getRaceId(6),
      alliance: getAllianceId(2),
      skillLineIds: [getSkillLineId(1), getSkillLineId(9), getSkillLineId(17)],
      attributes: { magicka: 64, health: 0, stamina: 40 },
      curseState: getCurseId(1),
      vampireStage: getVampireStageId(3),
      mundusStone: getMundusId(5),
    },
    equipment: {
      armor: {
        head: armorPiece("head", 0),
        shoulders: armorPiece("shoulders", 1),
        chest: armorPiece("chest", 2),
        hands: armorPiece("hands", 3),
        waist: armorPiece("waist", 4),
        legs: armorPiece("legs", 5),
        feet: armorPiece("feet", 6),
      },
      jewelry: {
        necklace: jewelryPiece("necklace", 0),
        "ring-1": jewelryPiece("ring", 1),
        "ring-2": jewelryPiece("ring", 2),
      },
      "primary-weapon-bar": { "main-hand": weaponPiece(1), "off-hand": weaponPiece(2) },
      "backup-weapon-bar": { "main-hand": weaponPiece(3), "off-hand": shieldPiece(4) },
    },
    skills: {
      "primary-skill-bar": {
        "active-1": getSkillId(100),
        "active-2": getSkillId(107),
        "active-3": getSkillId(114),
        "active-4": getSkillId(121),
        "active-5": getSkillId(128),
        ultimate: getSkillId(135),
      },
      "backup-skill-bar": {
        "active-1": getSkillId(300),
        "active-2": getSkillId(311),
        "active-3": getSkillId(322),
        "active-4": getSkillId(333),
        "active-5": getSkillId(344),
        ultimate: getSkillId(355),
      },
    },
    passives: [0, 5, 16, 99, 289].map(getPassiveSkillId),
    scribing: [
      {
        skillId: "scribed-wield-soul-bleed-damage",
        grimoireId: getGrimoireId(1),
        focusScriptId: getFocusScriptId(3),
        signatureScriptId: getSignatureScriptId(4),
        affixScriptId: getAffixScriptId(5),
      },
    ],
    championPoints: {
      warfare: {
        slotted: [1, 2, 3, 4].map(getChampionPointId),
        passive: [5, 6, 7].map(getChampionPointId),
      },
      fitness: {
        slotted: [8, 9, 10, 11].map(getChampionPointId),
        passive: [12, 13].map(getChampionPointId),
      },
      craft: {
        slotted: [14, 15, 16, 17].map(getChampionPointId),
        passive: [18].map(getChampionPointId),
      },
    },
    consumables: {
      foodOrDrink: getFoodOrDrinkId(4),
      potion: getPotionId(7),
      potion2: getPotionId(9),
    },
    target: { armor: "overland", health: 0.35, targetCount: 1 },
    account: { esoPlus: getEsoPlusId(1) },
  }
}

test("every recorded build hash is a character build written by update fifty-two", () => {
  for (const hash of RECORDED) {
    const bytes = base64urlToBytes(hash)
    expect(bytes).not.toBeNull()
    expect(bytes?.[0]).toBe(CHARACTER_BUILD_TYPE)
    expect(bytes?.[1]).toBe(ESO_VERSION_52)
    expect(bytes?.[2]).toBe(RECORDED_MINOR_VERSION)
  }
})

test("a recorded build hash read back, written again and read again is the build it was", () => {
  for (const hash of RECORDED) {
    const build = decodeBuild(buildHash(hash))
    expect(build).not.toBeNull()
    expect(decodeBuild(encodeBuild(build as CharacterState))).toEqual(build)
  }
})

test("a build carrying equipment, skills and champion points survives update fifty-two", () => {
  const build = representativeBuild()
  expect(decodeBuild(encodeBuild(build))).toEqual(build)
})

test("a scribed skill written and read back is the scribed skill it was", () => {
  const scribing: CharacterState["scribing"] = [
    {
      skillId: "scribed-wield-soul-magic-damage",
      grimoireId: "wield-soul",
      focusScriptId: "magic-damage",
      signatureScriptId: "lingering-torment",
      affixScriptId: "breach",
    },
    {
      skillId: "scribed-elemental-explosion-dispel",
      grimoireId: "elemental-explosion",
      focusScriptId: "dispel",
      signatureScriptId: "assassins-misery",
      affixScriptId: "off-balance",
    },
  ]
  const build = { ...representativeBuild(), scribing }
  expect(decodeBuild(encodeBuild(build))?.scribing).toEqual(scribing)
})

test("a hash the add-on saved reads each scribed skill its grimoire and focus script name", () => {
  const saved =
    "ATQH8MUAAIBghRP__AAABzbjELRPyWwR1wagAAAAQIA1BAAQBgAAkACAAEAAAhAAAycAIwBmEAZAAQgMCAASySBQIxEAMMAAAAgDAByAIQHAAAQwOcujXqNSLEnDKx5MsuZNnZ9GnVr2z6FGlTqeKqxtHZGzx9cvQMWSFoibI3TtIlTJ36hTBVQlcdYYOGyRsCVLAjAMIFDGTQcQJNnBQsYNHDyBEkdJgAgMhRBIGu1HmDA"
  expect(decodeBuild(buildHash(saved))?.scribing.map((scribed) => scribed.skillId)).toEqual([
    "scribed-wield-soul-magic-damage",
    "scribed-elemental-explosion-dispel",
  ])
})

test("the rank of each purchased passive survives a build written and read back", () => {
  const build = representativeBuild()
  const [first, second] = build.passives
  if (first === undefined || second === undefined) throw new Error("the build buys two passives")
  const ranked = { ...build, passiveRanks: { [first]: 1, [second]: 3 } }
  expect(decodeBuild(encodeBuild(ranked))?.passiveRanks).toEqual({ [first]: 1, [second]: 3 })
})

test("a passive written with no rank is read back with no rank", () => {
  const build = representativeBuild()
  expect(decodeBuild(encodeBuild(build))?.passiveRanks).toBeUndefined()
})

test("a hash the add-on saved before ranks were written reads a single-page passive with no rank", () => {
  const build = decodeBuild(buildHash(SAVED_BEFORE_RANKS))
  expect(build?.passives).toContain("undaunted-mettle")
  expect(build?.passiveRanks?.["undaunted-mettle"]).toBeUndefined()
})

const SAVED_WITH_A_RANK_ONE_PAGE =
  "ATQINIGgAABiRRP__VgAAAAAAAAAAAAAAAAAAAAAAAIkAIAQBgAAgAAAAAgAAhAAACIAIgBgAABAAAgMCAgAySAAAwAAMIAAAAgDABAAAAHAACAAGKwAAABVKwAAAAAAAAAAAPgAMmWAgk14ZLOeJjBIDGFAhHmwXWK1ymYYi54JJQiAHt5m1r2nmuHsoGQ"

const SAVED_WITH_A_PAGE_MANY_RANKS_SET =
  "ATQIVMUAAIBkRRMCU_lAANp_LckLmC25IXMFtyQuYLbkhcwW3JC5gtuQgUdrchBAq2cCCBVs4JhEx2gCIgmOtuUUYwnOLRMVTyekSVaToatMkAAgjUEABAGEACQAIAASAACEAADJwArAGYATkABCI0YABDJIFAjEQA0gAAACAMAHIAgQdUAADA4y6Neo1IsScMrHkyy5k2dn0adWvbPoUaVOp4qrG0dkbPH1y9AxZIWiJsjdO0iVMnfqFMFVCVx1hg4bJGwJUsCMAwgUMZNBxAk2cFCxg0cPIESR0nAUAyDjEgaw"

test("a rank page's bit before minor ten is read as its base page at that page's rank", () => {
  const build = decodeBuild(buildHash(SAVED_WITH_A_RANK_ONE_PAGE))
  expect(build?.passives).toContain("magicka-controller")
  expect(build?.passives).not.toContain("magicka-controller-40438")
  expect(build?.passiveRanks?.["magicka-controller"]).toBe(1)
})

test("a rank page's bit that more than one rank sets is read as its base page with no rank", () => {
  const build = decodeBuild(buildHash(SAVED_WITH_A_PAGE_MANY_RANKS_SET))
  expect(build?.passives).toContain("tough")
  expect(build?.passives).not.toContain("tough-50903")
  expect(build?.passiveRanks?.tough).toBeUndefined()
})

test("a hash the add-on saved before minor eleven reads its food or drink from six bits", () => {
  expect(decodeBuild(buildHash(SAVED_WITH_A_PAGE_MANY_RANKS_SET))?.consumables).toEqual({
    foodOrDrink: "dubious-camoran-throne",
    potion: "essence-of-potent-stamina",
    potion2: "no-potion",
  })
})

test("each piece's item level survives a build written and read back", () => {
  const build = representativeBuild()
  const armor = build.equipment.armor
  const leveled: CharacterState = {
    ...build,
    equipment: {
      ...build.equipment,
      armor: {
        ...armor,
        head: withLevel(armor.head, 1),
        waist: withLevel(armor.waist, 26),
        chest: withLevel(armor.chest, "CP10"),
        legs: withLevel(armor.legs, "CP150"),
        feet: withLevel(armor.feet, "CP160"),
      },
    },
  }
  const read = decodeBuild(encodeBuild(leveled))
  expect(read).toEqual(leveled)
  expect(read?.equipment.armor.head.data?.level).toBe(1)
  expect(read?.equipment.armor.legs.data?.level).toBe("CP150")
  expect(read?.equipment.armor.hands.data?.level).toBeUndefined()
})

test("a hash saved before minor twelve reads every piece with no level, which prices it at CP160", () => {
  for (const hash of [SAVED_WITH_A_PAGE_MANY_RANKS_SET, SAVED_WITH_A_RANK_ONE_PAGE, ...RECORDED]) {
    const equipment = decodeBuild(buildHash(hash))?.equipment
    expect(equipment).toBeDefined()
    const pieces = [
      ...Object.values(equipment?.armor ?? {}),
      ...Object.values(equipment?.jewelry ?? {}),
      ...Object.values(equipment?.["primary-weapon-bar"] ?? {}),
      ...Object.values(equipment?.["backup-weapon-bar"] ?? {}),
    ]
    for (const piece of pieces) expect(piece.data === null || !("level" in piece.data)).toBe(true)
  }
})

test("a build read from a rank page's bit is written and read back as that build", () => {
  const build = decodeBuild(buildHash(SAVED_WITH_A_RANK_ONE_PAGE))
  expect(build).not.toBeNull()
  expect(decodeBuild(encodeBuild(build as CharacterState))).toEqual(build)
})

test("the character writer stamps update fifty-two", () => {
  const bytes = encodeV52(representativeBuild())
  expect(bytes[0]).toBe(CHARACTER_BUILD_TYPE)
  expect(bytes[1]).toBe(ESO_VERSION_52)
  expect(bytes[2]).toBe(CODEC_MINOR_VERSION)
  expect(ESO_VERSION_52).toBe(52)
})

test("update forty-eight reads back a build laid out as the add-on lays one out", () => {
  const build = representativeBuild()
  const stamped = stampedWith(encodeV52(build), ESO_VERSION_48)
  expect(base64urlToBytes(stamped)?.[1]).toBe(ESO_VERSION_48)
  expect(ESO_VERSION_48).toBe(48)
  expect(decodeBuild(buildHash(stamped))).toEqual(build)
})
