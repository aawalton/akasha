import { expect, test } from "bun:test"
import {
  type RotationBar,
  reavingBlowsShareOf,
  rotationReading,
} from "akasha/temper/player/character/stat/modules/rotation-reading/rotation-reading.module.code.ts"

const NO_STATS = { magickaMaximum: 0, staminaMaximum: 0, powerWeapon: 0, powerSpell: 0 }

const LASH = {
  slot: 3,
  name: "Flame Lash",
  description:
    "Lash an enemy with flame, dealing |cffffff100|r Flame Damage and healing for |cffffff2514|r Health.",
  durationMs: 0,
  castMs: 0,
  cooldownMs: 0,
}

const BAR: RotationBar = {
  skills: [LASH],
  classPassives: [],
  enchants: [],
  weaponStyle: undefined,
  weaponStats: NO_STATS,
  multipliers: undefined,
}

test("Reaving Blows heals the percent of the damage its text names", () => {
  expect(
    reavingBlowsShareOf("When you deal direct damage you heal for 7% of the damage done")
  ).toBeCloseTo(0.07)
  expect(reavingBlowsShareOf("Increases your damage done.")).toBe(0)
})

test("a skill cast every second heals and hits that much each second of the fight", () => {
  const reading = rotationReading([BAR], 0)
  expect(reading.fightSeconds).toBe(600)
  expect(reading.healingLandedPerSecond).toBe(2514)
  expect(reading.damagePerSecond).toBe(100)
  expect(reading.toughnessPerSecond).toBe(2514)
})

test("a bar with no multipliers leaves the other bar's to count alone", () => {
  const strong = {
    ...BAR,
    multipliers: { healing: 2, damage: 1.5, healthMaximum: 1000, armorShare: 0, damageTaken: 0 },
  }
  const reading = rotationReading([strong, BAR], 0)
  expect(reading.multipliers.healing).toBe(2)
  expect(reading.damagePerSecond).toBe(150)
})

test("Reaving Blows heals its share of each hit, scaled as healing is", () => {
  const reading = rotationReading([BAR], 0.1)
  expect(reading.reavingBlowsHealing).toBeCloseTo(600 * 10)
  expect(reading.healingLandedPerSecond).toBeCloseTo(2514 + 10)
})
