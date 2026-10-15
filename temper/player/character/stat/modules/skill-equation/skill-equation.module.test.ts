import { expect, test } from "bun:test"
import {
  equationOf,
  equationValue,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"

const STATS = {
  maxStat: 20000,
  maxPower: 5000,
  health: 40000,
  magicka: 18000,
  stamina: 20000,
  spellDamage: 5000,
  weaponDamage: 4000,
}

const at = (line: string) => equationValue(equationOf(line), STATS)

test("an equation on the higher stat and power sums its terms and constant", () => {
  const line =
    "<<2>> = 0.031026 MaxStat + 0.325426 MaxPower - 1.91657 (Ultimate, ratio = 10.49, Dmg, Flame)"
  expect(equationOf(line)?.placeholder).toBe(2)
  expect(equationOf(line)?.tags).toContain("Dmg")
  expect(at(line)).toBeCloseTo(0.031026 * 20000 + 0.325426 * 5000 - 1.91657)
})

test("an equation on max health is read", () => {
  expect(at("<<4>> = 0.206642 Health - 1.14018 (Health, Heal)")).toBeCloseTo(
    0.206642 * 40000 - 1.14018
  )
})

test("a constant with a unit is its number and scales off nothing", () => {
  expect(equationOf("<<3>> = 10 seconds (Constant)")?.scaled).toBe(false)
  expect(at("<<3>> = 10 seconds (Constant)")).toBe(10)
})

test("a constant naming no number, or a variable no stat here reads, reads as nothing", () => {
  expect(at("<<6>> = Burning (Constant)")).toBeUndefined()
  expect(at("<<1>> = 120 MediumArmor (Medium Armor)")).toBeUndefined()
})
