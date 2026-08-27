import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperSetCategory } from "./temper-set-category.ts"

const NONE_ID = "00000000-0000-0000-0000-00000000c001"
const TRIAL_ID = "00000000-0000-0000-0000-00000000c002"
const DUNGEON_ID = "00000000-0000-0000-0000-00000000c003"

const noneRow = Page({
  id: NONE_ID,
  title: "No Set Category",
  key: "none",
  displayOrder: 0,
})

const trialRow = Page({
  id: TRIAL_ID,
  title: "Trial",
  key: "trial",
  displayOrder: 1,
})

const dungeonRow = Page({
  id: DUNGEON_ID,
  title: "Dungeon",
  key: "dungeon",
  displayOrder: 2,
})

describe("generateTemperSetCategory", () => {
  test("emits categories sorted by displayOrder regardless of input order", () => {
    const out = generateTemperSetCategory([dungeonRow, noneRow, trialRow])
    const idxNone = out.indexOf('"none"')
    const idxTrial = out.indexOf('"trial"')
    const idxDungeon = out.indexOf('"dungeon"')
    expect(idxNone).toBeGreaterThan(-1)
    expect(idxTrial).toBeGreaterThan(idxNone)
    expect(idxDungeon).toBeGreaterThan(idxTrial)
  })

  test("emits each category's displayOrder and name verbatim", () => {
    const out = generateTemperSetCategory([noneRow, trialRow, dungeonRow])
    expect(out).toContain(
      '"none": { id: "none" as const, name: "No Set Category", displayOrder: 0 }'
    )
    expect(out).toContain('"trial": { id: "trial" as const, name: "Trial", displayOrder: 1 }')
    expect(out).toContain('"dungeon": { id: "dungeon" as const, name: "Dungeon", displayOrder: 2 }')
  })

  test("emits the SetCategoryTemplate import + satisfies clause for typed consumer access", () => {
    const out = generateTemperSetCategory([noneRow])
    expect(out).toContain('import type { SetCategoryTemplate } from "../set-categories-data"')
    expect(out).toContain("satisfies Record<string, SetCategoryTemplate>")
    expect(out).toContain("export const TEMPER_SET_CATEGORIES_BY_ID")
  })

  test("throws when key is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c004",
      title: "Broken",
      displayOrder: 0,
    })
    expect(() => generateTemperSetCategory([broken])).toThrow()
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c005",
      title: null,
      key: "none",
      displayOrder: 0,
    })
    expect(() => generateTemperSetCategory([broken])).toThrow(/null title/)
  })

  test("throws when displayOrder is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c006",
      title: "Bad",
      key: "none",
    })
    expect(() => generateTemperSetCategory([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c007",
      title: "Duplicate",
      key: "trial",
      displayOrder: 0,
    })
    expect(() => generateTemperSetCategory([noneRow, dup])).toThrow(/duplicate displayOrder/)
  })
})
