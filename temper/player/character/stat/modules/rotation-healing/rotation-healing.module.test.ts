import { expect, test } from "bun:test"
import {
  healingOverRotation,
  type RotationSkill,
} from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"

const NONE = { direct: 0, shield: 0, tick: 0, tickSeconds: 2, unread: [] }

const EMBERS: RotationSkill = {
  name: "Burning Embers",
  durationMs: 10_000,
  castMs: 0,
  cooldownMs: 0,
  healing: { ...NONE, direct: 4291, tick: 644 },
}

const LASH: RotationSkill = {
  name: "Flame Lash",
  durationMs: 0,
  castMs: 0,
  cooldownMs: 0,
  healing: { ...NONE, direct: 2514 },
}

const BRAWLER: RotationSkill = {
  name: "Brawler",
  durationMs: 6_000,
  castMs: 0,
  cooldownMs: 0,
  healing: { ...NONE, shield: 6381 },
}

test("a skill whose effect runs is cast again only once it runs out, and later ones fill between", () => {
  const healed = healingOverRotation([EMBERS, LASH], 10)
  expect(healed.skills).toEqual([
    { name: "Burning Embers", casts: 1, healing: 4291 + 5 * 644 },
    { name: "Flame Lash", casts: 9, healing: 9 * 2514 },
  ])
  expect(healed.healingPerSecond).toBe((4291 + 5 * 644 + 9 * 2514) / 10)
  expect(healed.lightAttacks).toBe(0)
})

test("a skill with no duration ahead in bar order is cast every time, so later skills never are", () => {
  const healed = healingOverRotation([LASH, EMBERS], 10)
  expect(healed.skills.map((one) => one.casts)).toEqual([10, 0])
})

test("where nothing can be cast, the global cooldown goes to a light attack", () => {
  const healed = healingOverRotation([BRAWLER], 12)
  expect(healed.skills).toEqual([{ name: "Brawler", casts: 2, healing: 2 * 6381 }])
  expect(healed.lightAttacks).toBe(10)
})

test("a tick past the end of the fight does not count", () => {
  const healed = healingOverRotation([EMBERS], 5)
  expect(healed.skills[0]?.healing).toBe(4291 + 2 * 644)
})
