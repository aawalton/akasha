import { describe, expect, test } from "bun:test"
import { Page } from "../page.ts"
import { generateTemperDungeons } from "./temper-dungeons.ts"

const GIVER = "00000000-0000-0000-0000-0000000000b1"

const giver = Page({
  id: GIVER,
  title: "Maj al-Ragath",
  slug: "maj-al-ragath",
  epoch: "2026-02-21",
  cycleLength: 2,
})

const dungeon = (key: string, position: number) =>
  Page({
    id: `00000000-0000-0000-0000-00000000c${position}00`,
    title: `Dungeon ${key}`,
    key,
    soloDifficulty: "easy",
    questGiver: "maj-al-ragath",
    rotationPosition: position,
  })

describe("generateTemperDungeons — a dungeon naming its quest giver", () => {
  test("finds the giver by the slug a file names it with, rather than by a uuid", () => {
    const out = generateTemperDungeons([dungeon("A", 0), dungeon("B", 1)], [giver])
    expect(out).toContain(`questGiverId: ${JSON.stringify(GIVER)}`)
    expect(out).not.toContain('questGiverId: "maj-al-ragath"')
  })

  test("emits the giver's cycle length as a number, which is what the addon's type states", () => {
    const out = generateTemperDungeons([dungeon("A", 0), dungeon("B", 1)], [giver])
    expect(out).toContain("cycleLength: 2")
  })

  test("refuses a dungeon naming a giver nothing declares, rather than emitting a dangling id", () => {
    const orphan = Page({
      id: "00000000-0000-0000-0000-00000000cf00",
      title: "Orphan",
      key: "OR",
      soloDifficulty: "easy",
      questGiver: "nobody-at-all",
      rotationPosition: 0,
    })
    expect(() =>
      generateTemperDungeons([dungeon("A", 0), dungeon("B", 1), orphan], [giver])
    ).toThrow("nobody-at-all")
  })

  test("refuses a quest giver with no slug, there being nothing for a dungeon to name it by", () => {
    const nameless = Page({
      id: "00000000-0000-0000-0000-0000000000b2",
      title: "Nameless",
      epoch: "2026-02-21",
      cycleLength: 1,
    })
    expect(() => generateTemperDungeons([dungeon("A", 0)], [nameless])).toThrow("no slug")
  })
})
