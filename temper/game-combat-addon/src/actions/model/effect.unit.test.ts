import { expect, test } from "bun:test"
import { buildEffect, normalizeUnitTag } from "./effect"
import { LEVEL_LOW_THRESHOLD, LEVEL_TAIL } from "./model-constants"
import type { Ability } from "./types"

function ability(overrides: Partial<Ability> = {}): Ability {
  return {
    id: 1,
    name: "Test",
    showName: "Test",
    icon: "/esoui/art/icons/ability_foo_001.dds",
    description: "",
    type: 1,
    ...overrides,
  }
}

test("normalizeUnitTag keeps 'player' verbatim", () => {
  expect(normalizeUnitTag("player")).toBe("player")
})

test("normalizeUnitTag keeps 'playerpet' verbatim", () => {
  expect(normalizeUnitTag("playerpet")).toBe("playerpet")
})

test("normalizeUnitTag collapses non-player tags to 'others'", () => {
  expect(normalizeUnitTag("reticleover")).toBe("others")
  expect(normalizeUnitTag("group1")).toBe("others")
})

test("buildEffect computes duration as endTime - startTime", () => {
  const e = buildEffect({
    ability: ability(),
    unitTag: "player",
    unitId: 7,
    startTime: 1000,
    endTime: 6000,
  })
  expect(e.duration).toBe(5000)
})

test("buildEffect clamps an inverted window to zero duration", () => {
  const e = buildEffect({
    ability: ability(),
    unitTag: "player",
    unitId: 7,
    startTime: 6000,
    endTime: 1000,
  })
  expect(e.duration).toBe(0)
})

test("buildEffect normalizes the unit tag", () => {
  const e = buildEffect({
    ability: ability(),
    unitTag: "reticleover",
    unitId: 7,
    startTime: 0,
    endTime: 1000,
  })
  expect(e.unitTag).toBe("others")
})

test("buildEffect defaults level to LEVEL_TAIL with levelIsLow true", () => {
  const e = buildEffect({
    ability: ability(),
    unitTag: "player",
    unitId: 7,
    startTime: 0,
    endTime: 1000,
  })
  expect(e.level).toBe(LEVEL_TAIL)
  expect(e.levelIsLow).toBe(LEVEL_TAIL >= LEVEL_LOW_THRESHOLD)
  expect(e.levelIsLow).toBe(true)
})

test("buildEffect defaults stackCount, flags, and optional fields", () => {
  const e = buildEffect({
    ability: ability(),
    unitTag: "player",
    unitId: 7,
    startTime: 0,
    endTime: 1000,
  })
  expect(e.stackCount).toBe(0)
  expect(e.ignored).toBe(false)
  expect(e.ignorableDebuff).toBe(false)
  expect(e.activated).toBe(false)
  expect(e.isCrux).toBe(false)
  expect(e.tickRate).toBeUndefined()
  expect(e.combatEventId).toBeUndefined()
})

test("buildEffect carries explicit stackCount, tickRate, and combatEventId", () => {
  const e = buildEffect({
    ability: ability(),
    unitTag: "player",
    unitId: 7,
    startTime: 0,
    endTime: 1000,
    stackCount: 3,
    tickRate: 500,
    combatEventId: 42,
  })
  expect(e.stackCount).toBe(3)
  expect(e.tickRate).toBe(500)
  expect(e.combatEventId).toBe(42)
})

test("buildEffect sets isCrux for an Arcanist crux texture", () => {
  const e = buildEffect({
    ability: ability({ icon: "/esoui/art/icons/ability_arcanist_crux.dds" }),
    unitTag: "player",
    unitId: 7,
    startTime: 0,
    endTime: 1000,
  })
  expect(e.isCrux).toBe(true)
})
