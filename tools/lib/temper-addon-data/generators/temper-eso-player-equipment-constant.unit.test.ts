import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperEsoPlayerEquipmentConstant } from "./temper-eso-player-equipment-constant.ts"

const weaponSword = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "Weapon Type Sword",
  key: "weapon-type:sword",
  constantFamily: "weapon-type",
  constantId: "sword",
  esoNum: 3,
  displayOrder: 3,
})

const weaponBow = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Weapon Type Bow",
  key: "weapon-type:bow",
  constantFamily: "weapon-type",
  constantId: "bow",
  esoNum: 8,
  displayOrder: 7,
})

const armorHeavy = Page({
  id: "00000000-0000-0000-0000-00000000c003",
  title: "Armor Type Heavy",
  key: "armor-type:heavy",
  constantFamily: "armor-type",
  constantId: "heavy",
  esoNum: 3,
  displayOrder: 3,
})

const armorShield = Page({
  id: "00000000-0000-0000-0000-00000000c004",
  title: "Armor Type Shield",
  key: "armor-type:shield",
  constantFamily: "armor-type",
  constantId: "shield",
  esoNum: 0,
  displayOrder: 4,
})

const qualityLegendary = Page({
  id: "00000000-0000-0000-0000-00000000c005",
  title: "Quality Legendary",
  key: "quality:legendary",
  constantFamily: "quality",
  constantId: "legendary",
  esoNum: 5,
  displayOrder: 4,
})

const qualityMythic = Page({
  id: "00000000-0000-0000-0000-00000000c006",
  title: "Quality Mythic",
  key: "quality:mythic",
  constantFamily: "quality",
  constantId: "mythic",
  esoNum: 5,
  displayOrder: 5,
})

const fullSeed = [weaponSword, weaponBow, armorHeavy, armorShield, qualityLegendary, qualityMythic]

describe("generateTemperEsoPlayerEquipmentConstant", () => {
  test("emits the three legacy facade exports", () => {
    const out = generateTemperEsoPlayerEquipmentConstant(fullSeed)
    expect(out).toContain("export const TEMPER_PLAYER_WEAPON_TYPE_TO_ESO = {")
    expect(out).toContain("export const TEMPER_PLAYER_ARMOR_TYPE_TO_ESO = {")
    expect(out).toContain("export const TEMPER_PLAYER_QUALITY_TO_ESO = {")
  })

  test("emits typed satisfies clauses for each family", () => {
    const out = generateTemperEsoPlayerEquipmentConstant(fullSeed)
    expect(out).toContain("satisfies Record<WeaponTypeId, number>")
    expect(out).toContain("satisfies Record<ArmorWeightId, number>")
    expect(out).toContain("satisfies Record<string, number>")
  })

  test("imports the literal-union types from the equipment package", () => {
    const out = generateTemperEsoPlayerEquipmentConstant(fullSeed)
    expect(out).toContain(
      'import type { ArmorWeightId } from "@temper/game-characters-equipment/armor/armor-weights-data"'
    )
    expect(out).toContain(
      'import type { WeaponTypeId } from "@temper/game-characters-equipment/weapons/weapon-types-data"'
    )
  })

  test("preserves the canonical eso numbers per family", () => {
    const out = generateTemperEsoPlayerEquipmentConstant(fullSeed)
    expect(out).toContain('"sword": 3')
    expect(out).toContain('"bow": 8')
    expect(out).toContain('"heavy": 3')
    expect(out).toContain('"shield": 0')
    expect(out).toContain('"legendary": 5')
    expect(out).toContain('"mythic": 5')
  })

  test("emits rows sorted by displayOrder regardless of input order", () => {
    const out = generateTemperEsoPlayerEquipmentConstant([
      qualityLegendary,
      weaponBow,
      armorShield,
      weaponSword,
      armorHeavy,
      qualityMythic,
    ])
    const idxSword = out.indexOf('"sword"')
    const idxBow = out.indexOf('"bow"')
    expect(idxSword).toBeGreaterThan(-1)
    expect(idxBow).toBeGreaterThan(idxSword)
    const idxHeavy = out.indexOf('"heavy"')
    const idxShield = out.indexOf('"shield"')
    expect(idxHeavy).toBeGreaterThan(-1)
    expect(idxShield).toBeGreaterThan(idxHeavy)
    const idxLeg = out.indexOf('"legendary"')
    const idxMyth = out.indexOf('"mythic"')
    expect(idxLeg).toBeGreaterThan(-1)
    expect(idxMyth).toBeGreaterThan(idxLeg)
  })

  test("throws on duplicate constantId within a family", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c099",
      title: "Weapon Type Sword (dup)",
      key: "weapon-type:sword",
      constantFamily: "weapon-type",
      constantId: "sword",
      esoNum: 99,
      displayOrder: 99,
    })
    expect(() =>
      generateTemperEsoPlayerEquipmentConstant([weaponSword, dup, armorHeavy, qualityLegendary])
    ).toThrow(/duplicate constantId/)
  })

  test("throws on duplicate displayOrder within a family", () => {
    const dupOrder = Page({
      id: "00000000-0000-0000-0000-00000000c100",
      title: "Weapon Type Axe",
      key: "weapon-type:axe",
      constantFamily: "weapon-type",
      constantId: "axe",
      esoNum: 1,
      displayOrder: 3,
    })
    expect(() =>
      generateTemperEsoPlayerEquipmentConstant([
        weaponSword,
        dupOrder,
        armorHeavy,
        qualityLegendary,
      ])
    ).toThrow(/duplicate displayOrder/)
  })

  test("throws when a family has no rows", () => {
    expect(() => generateTemperEsoPlayerEquipmentConstant([weaponSword, armorHeavy])).toThrow(
      /family quality has no rows/
    )
  })

  test("rejects unknown constantFamily", () => {
    const bad = Page({
      id: "00000000-0000-0000-0000-00000000c200",
      title: "Bogus",
      key: "bogus:thing",
      constantFamily: "bogus",
      constantId: "thing",
      esoNum: 0,
      displayOrder: 0,
    })
    expect(() => generateTemperEsoPlayerEquipmentConstant([bad])).toThrow()
  })
})
