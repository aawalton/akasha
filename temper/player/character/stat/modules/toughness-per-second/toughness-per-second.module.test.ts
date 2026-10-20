import { expect, test } from "bun:test"
import {
  damageLeft,
  meanArmorShare,
  meanDamageTaken,
  physicalShareOf,
  spellShareOf,
  type Toughness,
  toughnessPerSecond,
} from "akasha/temper/player/character/stat/modules/toughness-per-second/toughness-per-second.module.code.ts"

const PLAIN: Toughness = {
  healthMaximum: 20000,
  physicalShare: 0,
  spellShare: 0,
  damageTakenMartial: 0,
  damageTakenMagical: 0,
}

test("armor takes off its rating over 66,000, up to half", () => {
  expect(physicalShareOf(13200)).toBe(0.2)
  expect(spellShareOf(33000)).toBe(0.5)
  expect(spellShareOf(66000)).toBe(0.5)
})

test("20,000 health with half the damage taken away takes a 40,000 hit", () => {
  const halved = { ...PLAIN, damageTakenMartial: -0.5, damageTakenMagical: -0.5 }
  expect(toughnessPerSecond(halved, [{ healing: 0, shield: 0 }])).toBe(40000)
})

test("damage left is the mean of what martial and magical attacks leave", () => {
  const toughness = {
    ...PLAIN,
    physicalShare: 0.2,
    spellShare: 0.4,
    damageTakenMartial: -0.1,
    damageTakenMagical: -0.3,
  }
  expect(damageLeft(toughness)).toBeCloseTo((0.8 * 0.9 + 0.6 * 0.7) / 2)
  expect(meanArmorShare(toughness)).toBeCloseTo(0.3)
  expect(meanDamageTaken(toughness)).toBeCloseTo(-0.2)
})

test("a reduction to one type of attack leaves the other type's damage whole", () => {
  const martialOnly = { ...PLAIN, damageTakenMartial: -0.02 }
  expect(damageLeft(martialOnly)).toBeCloseTo((0.98 + 1) / 2)
})

test("each tick's killing hit is max health, shields up and healing landing, over damage left", () => {
  const toughness = {
    healthMaximum: 30000,
    physicalShare: 0.5,
    spellShare: 0.5,
    damageTakenMartial: -0.2,
    damageTakenMagical: -0.2,
  }
  const ticks = [
    { healing: 2000, shield: 0 },
    { healing: 0, shield: 10000 },
  ]
  expect(toughnessPerSecond(toughness, ticks)).toBeCloseTo((80000 + 100000) / 2)
})

test("a fight of no ticks gives no toughness", () => {
  expect(toughnessPerSecond(PLAIN, [])).toBe(0)
})
