import { expect, test } from "bun:test"
import {
  healingOverRotation,
  type RotationSkill,
} from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"

const NONE = { direct: 0, shield: 0, tick: 0, tickSeconds: 2, lastsSeconds: 0, unread: [] }

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
  expect(healed.lightAttacks).toBe(10)
  expect(healed.heavyAttacks).toBe(0)
})

test("a skill with no duration waits behind every skill with one, wherever it sits on the bar", () => {
  const healed = healingOverRotation([LASH, EMBERS], 10)
  expect(healed.skills).toEqual([
    { name: "Flame Lash", casts: 9, healing: 9 * 2514 },
    { name: "Burning Embers", casts: 1, healing: 4291 + 5 * 644 },
  ])
})

test("where nothing can be cast, the global cooldown goes to a heavy attack", () => {
  const healed = healingOverRotation([BRAWLER], 12)
  expect(healed.skills).toEqual([{ name: "Brawler", casts: 2, healing: 2 * 6381 }])
  expect(healed.heavyAttacks).toBe(10)
  expect(healed.lightAttacks).toBe(2)
})

test("a light attack is woven into each cast, and each attack falls in its cast's tick", () => {
  const healed = healingOverRotation([BRAWLER], 7, undefined, { light: 10, heavy: 100 })
  expect(healed.damageByTick).toEqual([10, 100, 100, 100, 100, 100, 10])
  expect(healed.directDamage).toBe(2 * 10 + 5 * 100)
})

test("a shield the game gives no duration runs as long as its tooltip says", () => {
  const brawler = { ...BRAWLER, durationMs: 0, healing: { ...BRAWLER.healing, lastsSeconds: 6 } }
  const healed = healingOverRotation([LASH, brawler], 12)
  expect(healed.skills.map((one) => one.casts)).toEqual([10, 2])
})

test("direct damage is each cast's hit and each wave that falls inside the fight", () => {
  const embers = { ...EMBERS, damage: { hit: 5555, wave: 0, waveSeconds: 0 } }
  const aura = {
    ...LASH,
    name: "Aura",
    durationMs: 20_000,
    damage: { hit: 0, wave: 9215, waveSeconds: 5 },
  }
  const healed = healingOverRotation([embers, aura], 12)
  expect(healed.directDamage).toBe(2 * 5555 + 2 * 9215)
})

test("Ultimate builds from nothing, and the ultimate is cast once it is affordable", () => {
  const ultimate = { name: "Standard of Might", cost: 150, healingPerPoint: 51 }
  const healed = healingOverRotation([LASH], 60, ultimate)
  expect(healed.ultimate).toEqual({
    name: "Standard of Might",
    casts: 1,
    gained: 180,
    healing: 150 * 51,
  })
  expect(healed.skills[0]?.casts).toBe(59)
  expect(healed.healingPerSecond).toBe((59 * 2514 + 150 * 51) / 60)
})

test("a skill giving Heroism adds its Ultimate while the Heroism lasts", () => {
  const keeper = {
    ...EMBERS,
    durationMs: 20_000,
    heroism: { ultimate: 1, everySeconds: 1.5, lastsSeconds: 15 },
  }
  const ultimate = { name: "Standard of Might", cost: 500, healingPerPoint: 0 }
  const healed = healingOverRotation([keeper, LASH], 10, ultimate)
  expect(healed.ultimate?.gained).toBeCloseTo(10 * 3 + 10 / 1.5)
})

test("each heal falls in its tick, and a shield counts in every tick it is up", () => {
  const healed = healingOverRotation([EMBERS, BRAWLER], 4)
  expect(healed.healingByTick).toEqual([4291, 0, 644, 644])
  expect(healed.shieldByTick).toEqual([0, 6381, 6381, 6381])
})

test("a shield stating its own seconds is up only that long, whatever the skill's duration", () => {
  const mantle = {
    ...BRAWLER,
    durationMs: 20_000,
    healing: { ...BRAWLER.healing, lastsSeconds: 2 },
  }
  expect(healingOverRotation([mantle], 4).shieldByTick).toEqual([6381, 6381, 0, 0])
})

test("direct damage falls in the tick of its hit or wave", () => {
  const aura = { ...LASH, durationMs: 20_000, damage: { hit: 100, wave: 7, waveSeconds: 2 } }
  expect(healingOverRotation([aura], 5).damageByTick).toEqual([100, 0, 7, 0, 7])
})

test("a tick past the end of the fight does not count", () => {
  const healed = healingOverRotation([EMBERS], 5)
  expect(healed.skills[0]?.healing).toBe(4291 + 2 * 644)
})
