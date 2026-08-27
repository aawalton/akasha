import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCompanionSkillLine } from "./temper-companion-skill-line.ts"

const NO_LINE = Page({
  id: "00000000-0000-0000-0000-00000000c001",
  title: "No Skill Line",
  key: "no-skill-line",
  companionId: "all",
  category: "weapon",
  displayOrder: 0,
})

const EMBER_CLASS = Page({
  id: "00000000-0000-0000-0000-00000000c002",
  title: "Ember",
  key: "companion-ember",
  companionId: "ember",
  category: "class",
  displayOrder: 1,
})

const BOW = Page({
  id: "00000000-0000-0000-0000-00000000c003",
  title: "Bow",
  key: "weapon-bow",
  companionId: "all",
  category: "weapon",
  displayOrder: 2,
})

const FIGHTERS = Page({
  id: "00000000-0000-0000-0000-00000000c004",
  title: "Fighters Guild",
  key: "guild-fighters",
  companionId: "all",
  category: "guild",
  displayOrder: 3,
})

const LIGHT_ARMOR = Page({
  id: "00000000-0000-0000-0000-00000000c005",
  title: "Light Armor",
  key: "armor-light",
  companionId: "all",
  category: "armor",
  displayOrder: 4,
})

describe("generateTemperCompanionSkillLine", () => {
  test("emits skill lines sorted by displayOrder regardless of input order", () => {
    const out = generateTemperCompanionSkillLine([FIGHTERS, BOW, NO_LINE, LIGHT_ARMOR, EMBER_CLASS])
    const idxNoLine = out.indexOf('"no-skill-line"')
    const idxEmber = out.indexOf('"companion-ember"')
    const idxBow = out.indexOf('"weapon-bow"')
    const idxFighters = out.indexOf('"guild-fighters"')
    const idxLight = out.indexOf('"armor-light"')
    expect(idxNoLine).toBeGreaterThan(-1)
    expect(idxEmber).toBeGreaterThan(idxNoLine)
    expect(idxBow).toBeGreaterThan(idxEmber)
    expect(idxFighters).toBeGreaterThan(idxBow)
    expect(idxLight).toBeGreaterThan(idxFighters)
  })

  test("emits each row with id/companionId/category as const literals", () => {
    const out = generateTemperCompanionSkillLine([NO_LINE, EMBER_CLASS, FIGHTERS, LIGHT_ARMOR])
    expect(out).toContain('id: "no-skill-line" as const')
    expect(out).toContain('companionId: "all" as const')
    expect(out).toContain('category: "weapon" as const')
    expect(out).toContain('id: "companion-ember" as const')
    expect(out).toContain('companionId: "ember" as const')
    expect(out).toContain('category: "class" as const')
    expect(out).toContain('category: "guild" as const')
    expect(out).toContain('category: "armor" as const')
  })

  test("preserves the human-readable name in the `name:` field", () => {
    const out = generateTemperCompanionSkillLine([NO_LINE, EMBER_CLASS, BOW])
    expect(out).toContain('name: "No Skill Line"')
    expect(out).toContain('name: "Ember"')
    expect(out).toContain('name: "Bow"')
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c006",
      title: null,
      key: "broken",
      companionId: "all",
      category: "weapon",
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionSkillLine([broken])).toThrow(/null title/)
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c007",
      title: "Bad",
      companionId: "all",
      category: "weapon",
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionSkillLine([broken])).toThrow()
  })

  test("throws when category is not one of the four enum values", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c008",
      title: "Bad",
      key: "bad",
      companionId: "all",
      category: "not-a-category",
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionSkillLine([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c009",
      title: "Duplicate",
      key: "dup",
      companionId: "all",
      category: "weapon",
      displayOrder: 0,
    })
    expect(() => generateTemperCompanionSkillLine([NO_LINE, dup])).toThrow(/duplicate displayOrder/)
  })
})
