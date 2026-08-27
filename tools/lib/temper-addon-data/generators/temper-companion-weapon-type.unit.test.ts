import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionWeaponType } from "./temper-companion-weapon-type.ts"

const NO_TYPE = Page({
  id: "00000000-0000-0000-0000-00000000d001",
  title: "No Weapon",
  key: "no-type",
  isTwoHanded: false,
  isOffHandOnly: false,
  displayOrder: 0,
})

const SWORD = Page({
  id: "00000000-0000-0000-0000-00000000d002",
  title: "Sword",
  key: "sword",
  isTwoHanded: false,
  isOffHandOnly: false,
  displayOrder: 1,
})

const GREATSWORD = Page({
  id: "00000000-0000-0000-0000-00000000d003",
  title: "Greatsword",
  key: "greatsword",
  isTwoHanded: true,
  isOffHandOnly: false,
  displayOrder: 5,
})

const SHIELD = Page({
  id: "00000000-0000-0000-0000-00000000d004",
  title: "Shield",
  key: "shield",
  isTwoHanded: false,
  isOffHandOnly: true,
  displayOrder: 13,
})

describe("generateTemperCompanionWeaponType", () => {
  test("emits weapon types sorted by displayOrder regardless of input order", () => {
    const out = generateTemperCompanionWeaponType([SHIELD, GREATSWORD, NO_TYPE, SWORD])
    const idxNoType = out.indexOf('"no-type"')
    const idxSword = out.indexOf('"sword"')
    const idxGreatsword = out.indexOf('"greatsword"')
    const idxShield = out.indexOf('"shield"')
    expect(idxNoType).toBeGreaterThan(-1)
    expect(idxSword).toBeGreaterThan(idxNoType)
    expect(idxGreatsword).toBeGreaterThan(idxSword)
    expect(idxShield).toBeGreaterThan(idxGreatsword)
  })

  test("emits each row with id as const literal", () => {
    const out = generateTemperCompanionWeaponType([NO_TYPE, SWORD, GREATSWORD, SHIELD])
    expect(out).toContain('id: "no-type" as const')
    expect(out).toContain('id: "sword" as const')
    expect(out).toContain('id: "greatsword" as const')
    expect(out).toContain('id: "shield" as const')
  })

  test("emits human-readable name from row title", () => {
    const out = generateTemperCompanionWeaponType([NO_TYPE, SWORD, GREATSWORD])
    expect(out).toContain('name: "No Weapon"')
    expect(out).toContain('name: "Sword"')
    expect(out).toContain('name: "Greatsword"')
  })

  test("emits isTwoHanded boolean", () => {
    const out = generateTemperCompanionWeaponType([SWORD, GREATSWORD])
    expect(out).toContain("isTwoHanded: false")
    expect(out).toContain("isTwoHanded: true")
  })

  test("emits isOffHandOnly: true only when set, omits the field otherwise", () => {
    const out = generateTemperCompanionWeaponType([SWORD, SHIELD])
    expect(out).toContain("isOffHandOnly: true")
    const swordBlockStart = out.indexOf('"sword"')
    const swordBlockEnd = out.indexOf("},", swordBlockStart)
    const swordBlock = out.slice(swordBlockStart, swordBlockEnd)
    expect(swordBlock).not.toContain("isOffHandOnly")
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d005",
      title: null,
      key: "broken",
      isTwoHanded: false,
      isOffHandOnly: false,
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionWeaponType([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d006",
      title: "Bad",
      isTwoHanded: false,
      isOffHandOnly: false,
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionWeaponType([broken])).toThrow()
  })

  test("throws when isTwoHanded is not a boolean", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000d007",
      title: "Bad",
      key: "bad",
      isTwoHanded: "yes",
      isOffHandOnly: false,
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionWeaponType([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000d008",
      title: "Duplicate",
      key: "dup",
      isTwoHanded: false,
      isOffHandOnly: false,
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionWeaponType([NO_TYPE, dup])).toThrow(
      /duplicate displayOrder/
    )
  })
})
