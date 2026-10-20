import { beforeAll, describe, expect, test } from "bun:test"
import {
  buildStandardSetBonusKeys,
  nonStandardSetBonuses,
  type SetBonusStep,
  setBonusKey,
} from "akasha/temper/web/item-browser/modules/item-browser-standard-set-bonuses/item-browser-standard-set-bonuses.module.code.ts"

function luaPatternToRegExp(pattern: string): RegExp {
  const source = pattern
    .replaceAll("%d", "\\d")
    .replaceAll("%s", "\\s")
    .replaceAll("%.", "\\.")
    .replaceAll("%%", "%")
  return new RegExp(source, "g")
}

beforeAll(() => {
  Object.assign(globalThis, {
    string: {
      gsub: (text: string, pattern: string, replacement: string): [string, number] => {
        let count = 0
        const replaced = text.replace(luaPatternToRegExp(pattern), () => {
          count++
          return replacement
        })
        return [replaced, count]
      },
      lower: (text: string): string => text.toLowerCase(),
    },
  })
})

function steps(...lines: [number, string][]): SetBonusStep[] {
  return lines.map(([numRequired, description]) => ({ numRequired, description }))
}

const ABYSSAL_BRACE = steps(
  [2, "Adds 1096 Maximum Stamina"],
  [3, "Adds 1096 Maximum Stamina"],
  [4, "Adds 1206 Maximum Health"],
  [5, "Adds 1710 Maximum Health"],
  [
    5,
    "While you are Bracing, you and group members within 12 meters of you gain Minor Evasion, reducing damage from area attacks by 10%.",
  ]
)

const ANSUULS_TORMENT = steps(
  [2, "Adds 657 Critical Chance"],
  [
    3,
    "Gain Minor Slayer at all times, increasing your damage done to Dungeon, Trial, and Arena Monsters by 5%.",
  ],
  [4, "Adds 1487 Offensive Penetration"],
  [
    5,
    "Increases your damage done against monsters by 7%. When you interrupt an enemy, you increase your damage done against monsters by an additional 7% for 10 seconds.",
  ]
)

const SELENE = steps(
  [1, "Adds 129 Weapon and Spell Damage"],
  [
    2,
    "When you deal Martial melee damage, you call upon a primal spirit that mauls the closest enemy in front of you after 1.3 seconds for 1702 Physical damage.",
  ]
)

describe("item-browser-standard-set-bonuses", () => {
  test("a key drops every number and the case", () => {
    expect(setBonusKey("Adds 1206 Maximum Health")).toBe("adds maximum health")
    expect(setBonusKey("Adds 4% Healing Taken")).toBe("adds healing taken")
    expect(setBonusKey("Adds Critical Resistance")).toBe("adds critical resistance")
  })

  test("a 2-, 3- or 4-piece line of a standard 5-piece set is standard at any value", () => {
    const keys = buildStandardSetBonusKeys([ABYSSAL_BRACE, ANSUULS_TORMENT])
    expect(
      nonStandardSetBonuses(keys, ["Adds 1206 Maximum Health", "Adds 1 Maximum Stamina"])
    ).toEqual([])
    expect(
      nonStandardSetBonuses(keys, [
        "Gain Minor Slayer at all times, increasing your damage done to Dungeon, Trial, and Arena Monsters by 5%.",
      ])
    ).toEqual([])
  })

  test("a standard line is standard on a set of any other kind", () => {
    const keys = buildStandardSetBonusKeys([ABYSSAL_BRACE, ANSUULS_TORMENT])
    expect(nonStandardSetBonuses(keys, ["Adds 1710 Maximum Health"])).toEqual([])
  })

  test("a 5-piece proc line is never standard", () => {
    const keys = buildStandardSetBonusKeys([ABYSSAL_BRACE, ANSUULS_TORMENT])
    const proc = ABYSSAL_BRACE[4]?.description ?? ""
    expect(nonStandardSetBonuses(keys, ["Adds 1206 Maximum Health", proc])).toEqual([proc])
  })

  test("a stat line naming more than the stat is not standard", () => {
    const keys = buildStandardSetBonusKeys([ABYSSAL_BRACE, ANSUULS_TORMENT])
    const line = "Adds 400 Maximum Health to your Class abilities."
    expect(nonStandardSetBonuses(keys, [line])).toEqual([line])
  })

  test("a set that is not a standard 5-piece set adds no standard line", () => {
    const keys = buildStandardSetBonusKeys([SELENE])
    expect(keys).toEqual({})
    const proc = SELENE[1]?.description ?? ""
    expect(nonStandardSetBonuses(keys, [proc])).toEqual([proc])
  })
})
