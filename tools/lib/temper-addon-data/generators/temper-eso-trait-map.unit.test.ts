import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperEsoTraitMap } from "./temper-eso-trait-map.ts"

const weaponNoTrait = Page({
  id: "00000000-0000-0000-0000-00000000c000",
  title: "Weapon No Trait",
  key: "weapon:no-trait",
  traitFamily: "weapon",
  traitId: "no-trait",
  esoTraitNum: 0,
  displayOrder: 0,
})

const weaponPowered = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "Weapon Powered",
  key: "weapon:powered",
  traitFamily: "weapon",
  traitId: "powered",
  esoTraitNum: 1,
  displayOrder: 1,
})

const weaponNirnhoned = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Weapon Nirnhoned",
  key: "weapon:nirnhoned",
  traitFamily: "weapon",
  traitId: "nirnhoned",
  esoTraitNum: 26,
  displayOrder: 11,
})

const armorDivines = Page({
  id: "00000000-0000-0000-0000-00000000c003",
  title: "Armor Divines",
  key: "armor:divines",
  traitFamily: "armor",
  traitId: "divines",
  esoTraitNum: 18,
  displayOrder: 8,
})

const armorSturdy = Page({
  id: "00000000-0000-0000-0000-00000000c004",
  title: "Armor Sturdy",
  key: "armor:sturdy",
  traitFamily: "armor",
  traitId: "sturdy",
  esoTraitNum: 11,
  displayOrder: 1,
})

const jewelryHarmony = Page({
  id: "00000000-0000-0000-0000-00000000c005",
  title: "Jewelry Harmony",
  key: "jewelry:harmony",
  traitFamily: "jewelry",
  traitId: "harmony",
  esoTraitNum: 29,
  displayOrder: 7,
})

const jewelryHealthy = Page({
  id: "00000000-0000-0000-0000-00000000c006",
  title: "Jewelry Healthy",
  key: "jewelry:healthy",
  traitFamily: "jewelry",
  traitId: "healthy",
  esoTraitNum: 21,
  displayOrder: 1,
})

describe("generateTemperEsoTraitMap", () => {
  test("emits three per-family forward-map exports", () => {
    const out = generateTemperEsoTraitMap([
      weaponNoTrait,
      weaponPowered,
      armorDivines,
      jewelryHarmony,
    ])
    expect(out).toContain("export const TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO = {")
    expect(out).toContain("export const TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO = {")
    expect(out).toContain("export const TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO = {")
  })

  test("routes each row to its family's record", () => {
    const out = generateTemperEsoTraitMap([weaponPowered, armorDivines, jewelryHarmony])
    const weaponSection =
      out.split("TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO")[1]?.split("} as const")[0] ?? ""
    const armorSection =
      out.split("TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO")[1]?.split("} as const")[0] ?? ""
    const jewelrySection =
      out.split("TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO")[1]?.split("} as const")[0] ?? ""
    expect(weaponSection).toContain('"powered": 1')
    expect(weaponSection).not.toContain('"divines"')
    expect(weaponSection).not.toContain('"harmony"')
    expect(armorSection).toContain('"divines": 18')
    expect(armorSection).not.toContain('"powered"')
    expect(armorSection).not.toContain('"harmony"')
    expect(jewelrySection).toContain('"harmony": 29')
    expect(jewelrySection).not.toContain('"powered"')
    expect(jewelrySection).not.toContain('"divines"')
  })

  test("emits no-trait rows with esoTraitNum 0 (facade's invertViaIds skips them at reverse-map build)", () => {
    const out = generateTemperEsoTraitMap([weaponNoTrait, weaponPowered])
    expect(out).toContain('"no-trait": 0')
    expect(out).toContain('"powered": 1')
  })

  test("sorts each family by displayOrder regardless of input order", () => {
    const out = generateTemperEsoTraitMap([
      jewelryHarmony,
      jewelryHealthy,
      armorDivines,
      armorSturdy,
      weaponNirnhoned,
      weaponNoTrait,
      weaponPowered,
    ])
    const weaponSection =
      out.split("TEMPER_PLAYER_WEAPON_TRAIT_TO_ESO")[1]?.split("} as const")[0] ?? ""
    const idxNo = weaponSection.indexOf('"no-trait"')
    const idxPow = weaponSection.indexOf('"powered"')
    const idxNirn = weaponSection.indexOf('"nirnhoned"')
    expect(idxNo).toBeGreaterThan(-1)
    expect(idxPow).toBeGreaterThan(idxNo)
    expect(idxNirn).toBeGreaterThan(idxPow)

    const armorSection =
      out.split("TEMPER_PLAYER_ARMOR_TRAIT_TO_ESO")[1]?.split("} as const")[0] ?? ""
    const idxSturdy = armorSection.indexOf('"sturdy"')
    const idxDivines = armorSection.indexOf('"divines"')
    expect(idxSturdy).toBeGreaterThan(-1)
    expect(idxDivines).toBeGreaterThan(idxSturdy)

    const jewelrySection =
      out.split("TEMPER_PLAYER_JEWELRY_TRAIT_TO_ESO")[1]?.split("} as const")[0] ?? ""
    const idxHealthy = jewelrySection.indexOf('"healthy"')
    const idxHarmony = jewelrySection.indexOf('"harmony"')
    expect(idxHealthy).toBeGreaterThan(-1)
    expect(idxHarmony).toBeGreaterThan(idxHealthy)
  })

  test("emits the per-family Record<*TraitId, number> satisfies annotation", () => {
    const out = generateTemperEsoTraitMap([weaponPowered, armorDivines, jewelryHarmony])
    expect(out).toContain("} as const satisfies Record<WeaponTraitId, number>")
    expect(out).toContain("} as const satisfies Record<ArmorTraitId, number>")
    expect(out).toContain("} as const satisfies Record<JewelryTraitId, number>")
  })

  test("imports the per-family TraitId types from the sibling facade files", () => {
    const out = generateTemperEsoTraitMap([weaponPowered])
    expect(out).toContain('import type { ArmorTraitId } from "../armor-traits-data"')
    expect(out).toContain('import type { JewelryTraitId } from "../jewelry-traits-data"')
    expect(out).toContain('import type { WeaponTraitId } from "../weapon-traits-data"')
  })

  test("throws on duplicate displayOrder within the same family", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c007",
      title: "Weapon Duplicate",
      key: "weapon:duplicate",
      traitFamily: "weapon",
      traitId: "duplicate",
      esoTraitNum: 99,
      displayOrder: 1,
    })
    expect(() => generateTemperEsoTraitMap([weaponPowered, dup])).toThrow(/duplicate displayOrder/)
  })

  test("allows the same displayOrder across different families", () => {
    const out = generateTemperEsoTraitMap([weaponPowered, armorSturdy])
    expect(out).toContain('"powered": 1')
    expect(out).toContain('"sturdy": 11')
  })

  test("throws on duplicate traitId within the same family", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c008",
      title: "Weapon Powered Duplicate",
      key: "weapon:powered-dup",
      traitFamily: "weapon",
      traitId: "powered",
      esoTraitNum: 99,
      displayOrder: 99,
    })
    expect(() => generateTemperEsoTraitMap([weaponPowered, dup])).toThrow(/duplicate traitId/)
  })

  test("throws when traitFamily is missing or invalid", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c009",
      title: "Broken",
      key: "broken:thing",
      traitId: "thing",
      esoTraitNum: 99,
      displayOrder: 99,
    })
    expect(() => generateTemperEsoTraitMap([broken])).toThrow()
  })

  test("throws when esoTraitNum is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c00a",
      title: "Broken",
      key: "weapon:broken",
      traitFamily: "weapon",
      traitId: "broken",
      displayOrder: 99,
    })
    expect(() => generateTemperEsoTraitMap([broken])).toThrow()
  })
})
