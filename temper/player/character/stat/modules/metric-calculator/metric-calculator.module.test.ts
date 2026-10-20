import { expect, test } from "bun:test"
import type { ChampionPointId } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { holdMetricCatalogFromCheckout } from "akasha/temper/player/character/stat/modules/metrics/metrics.module.test-fixtures.ts"

holdSkillCatalogFromCheckout()
holdSetCatalogFromCheckout()
holdMetricCatalogFromCheckout()

const ERIN_SOLSTICE =
  "ATQINIAAAABiRRP__AAAAAAAAAAAAAAAAAAAAAAAAAIkAIAAAAAAAAAAAAgAABAAACAAAgBgAAAAAAAMAAAAQQAAAQAAMAAAAAADABAAAAEAAAAACAAAAAMyLEmVjyZZcybOz6NOrXtn0KNKnU8VQAAAANnj65egYskLRE2RunaRKmTv1CmCqhK46wAAAADYEqWBGAYQKGMmg4gSbOChYwaOHkCJI6TAAAZMsBBJrwyWc8TGCQGMKBCPNgusVrlMwxFzwSShEAPbzNrXtPNcPZQMgA"

const NONE = { slotted: [], passive: [] }

type Star = {
  readonly id: ChampionPointId
  readonly championSkillId: number
  readonly maxPoints: number
}

const ARCANE_SUPREMACY: Star = { id: "arcane-supremacy", championSkillId: 3, maxPoints: 50 }

const ELDRITCH_INSIGHT: Star = { id: "eldritch-insight", championSkillId: 99, maxPoints: 20 }

function withWarfare(
  slotted: readonly ChampionPointId[],
  passive: readonly ChampionPointId[]
): CharacterState {
  const build = decodeBuild(buildHash(ERIN_SOLSTICE))
  if (build === null) throw new Error("the Erin Solstice build does not decode")
  return { ...build, championPoints: { warfare: { slotted, passive }, fitness: NONE, craft: NONE } }
}

function magickaOf(
  build: CharacterState,
  stars: readonly { championSkillId: number; points: number; maxPoints: number }[]
): number {
  const { metrics } = calculateReadingStatsByBar(build, "primary-weapon-bar", [], stars)
  return metrics["magicka-maximum"]?.value ?? 0
}

function magickaGiven(star: Star, points: number, slotted: boolean): number {
  const spent = [{ championSkillId: star.championSkillId, points, maxPoints: star.maxPoints }]
  const build = withWarfare(slotted ? [star.id] : [], [star.id])
  return magickaOf(build, spent) - magickaOf(withWarfare([], []), [])
}

const ARCANE_SUPREMACY_SLOTTED: readonly (readonly [number, number])[] = [
  [1, 26],
  [10, 260],
  [20, 520],
  [30, 780],
  [40, 1040],
  [50, 1300],
]

for (const [points, magicka] of ARCANE_SUPREMACY_SLOTTED) {
  test(`Arcane Supremacy slotted with ${String(points)} points gives ${String(magicka)} max magicka`, () => {
    expect(magickaGiven(ARCANE_SUPREMACY, points, true)).toBe(magicka)
  })
}

test("Arcane Supremacy unslotted with 50 points gives no max magicka", () => {
  expect(magickaGiven(ARCANE_SUPREMACY, 50, false)).toBe(0)
})

const ELDRITCH_INSIGHT_SPENT: readonly (readonly [number, number])[] = [
  [1, 0],
  [10, 260],
  [20, 520],
]

function poolsOf(listed: readonly { abilityId: number; name: string }[]): readonly number[] {
  const build = withWarfare([], [])
  const { metrics } = calculateReadingStatsByBar(build, "primary-weapon-bar", listed, [])
  return [metrics["magicka-maximum"]?.value ?? 0, metrics["stamina-maximum"]?.value ?? 0]
}

test("Blood Magic raises only the higher of max magicka and max stamina", () => {
  const [magicka = 0, stamina = 0] = poolsOf([])
  const [magickaWith = 0, staminaWith = 0] = poolsOf([{ abilityId: 252508, name: "Blood Magic" }])
  const magickaHigher = magicka >= stamina
  expect(magickaWith > magicka).toBe(magickaHigher)
  expect(staminaWith > stamina).toBe(!magickaHigher)
})

for (const [points, magicka] of ELDRITCH_INSIGHT_SPENT) {
  test(`Eldritch Insight with ${String(points)} points gives ${String(magicka)} max magicka`, () => {
    expect(magickaGiven(ELDRITCH_INSIGHT, points, false)).toBe(magicka)
  })
}
