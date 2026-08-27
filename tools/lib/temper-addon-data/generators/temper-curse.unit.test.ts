import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperCurse } from "./temper-curse.ts"

const CURSE_NO = "00000000-0000-0000-0000-00000000c001"
const CURSE_VAMP = "00000000-0000-0000-0000-00000000c002"
const CURSE_WERE = "00000000-0000-0000-0000-00000000c003"

const noCurse = Page({
  id: CURSE_NO,
  title: "No Curse",
  curseId: "no-curse",
  displayOrder: 0,
  esoCurseIds: [],
})

const vampire = Page({
  id: CURSE_VAMP,
  title: "Vampire",
  curseId: "vampire",
  displayOrder: 1,
  esoCurseIds: [40359],
})

const werewolf = Page({
  id: CURSE_WERE,
  title: "Werewolf",
  curseId: "werewolf",
  displayOrder: 2,
  esoCurseIds: [35658, 32455],
})

describe("generateTemperCurse", () => {
  test("emits curses sorted by displayOrder regardless of input order", () => {
    const out = generateTemperCurse([werewolf, noCurse, vampire])
    const idxNo = out.indexOf('"no-curse"')
    const idxVamp = out.indexOf('"vampire"')
    const idxWere = out.indexOf('"werewolf"')
    expect(idxNo).toBeGreaterThan(-1)
    expect(idxVamp).toBeGreaterThan(idxNo)
    expect(idxWere).toBeGreaterThan(idxVamp)
  })

  test("emits each curse's esoCurseIds verbatim", () => {
    const out = generateTemperCurse([noCurse, vampire, werewolf])
    expect(out).toContain("esoCurseIds: []")
    expect(out).toContain("esoCurseIds: [40359]")
    expect(out).toContain("esoCurseIds: [35658, 32455]")
  })

  test("throws when curseId is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c004",
      title: "Broken",
      displayOrder: 0,
      esoCurseIds: [],
    })
    expect(() => generateTemperCurse([broken])).toThrow()
  })

  test("throws when title is null", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c005",
      title: null,
      curseId: "no-curse",
      displayOrder: 0,
      esoCurseIds: [],
    })
    expect(() => generateTemperCurse([broken])).toThrow(/null title/)
  })

  test("throws when displayOrder is missing", () => {
    const broken = Page({
      id: "00000000-0000-0000-0000-00000000c006",
      title: "Bad",
      curseId: "no-curse",
      esoCurseIds: [],
    })
    expect(() => generateTemperCurse([broken])).toThrow()
  })

  test("throws on duplicate displayOrder", () => {
    const dup = Page({
      id: "00000000-0000-0000-0000-00000000c007",
      title: "Duplicate",
      curseId: "vampire",
      displayOrder: 0,
      esoCurseIds: [],
    })
    expect(() => generateTemperCurse([noCurse, dup])).toThrow(/duplicate displayOrder/)
  })
})
