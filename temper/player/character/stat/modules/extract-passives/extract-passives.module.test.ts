import { expect, test } from "bun:test"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { extractPassives } from "akasha/temper/player/character/stat/modules/extract-passives/extract-passives.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const UNDAUNTED_METTLE = "undaunted-mettle"

const MAXIMA = ["health-maximum", "magicka-maximum", "stamina-maximum"]

const WORN_BY_WEIGHTS: Record<number, string> = {
  1: "ATQINIGgAABiRRPyLcW25f8AAAAAAAAAAAAAAAAAAAAAAAAAiQAgBAGAACAAAAACAACEAAAIgAiAGAAAEAACAwIAADJIAADAAAwgAAACAMAEAAAAcAAIAAYrAAAAFUrAAAAAAAAAAAA-AAyZYCCTXhks54mMEgMYUCEebBdYrXKZhiLngklCIAe3mbWvaea4eygZ",
  2: "ATQINIGgAABiRROBif2zjItxbbl_wAAAAAAAAAAAAAAAAAAAAAAAACJACAEAYAAIAAAAAIAAIQAAAiACIAYAAAQAAIDAgAAMkgAAMAADCAAAAIAwAQAAABwAAgABisAAAAVSsAAAAAAAAAAAD4ADJlgIJNeGSzniYwSAxhQIR5sF1itcpmGIueCSUIgB7eZta9p5rh7KBkA",
  3: "ATQINIGgAABiRROBif2zihYCWgAi3FtuX_AAAAAAAAAAAAAAAAAAAAAAAAAIkAIAQBgAAgAAAAAgAAhAAACIAIgBgAABAAAgMCAAAySAAAwAAMIAAAAgDABAAAAHAACAAGKwAAABVKwAAAAAAAAAAAPgAMmWAgk14ZLOeJjBIDGFAhHmwXWK1ymYYi54JJQiAHt5m1r2nmuHsoGQ",
}

function wearing(weights: number): CharacterState {
  const hash = WORN_BY_WEIGHTS[weights]
  if (hash === undefined) throw new Error(`no build wears ${String(weights)} armor weights`)
  const build = decodeBuild(buildHash(hash))
  if (build === null)
    throw new Error(`the build wearing ${String(weights)} weights does not decode`)
  return build
}

function mettleOn(build: CharacterState): Record<string, number> {
  const source = extractPassives(build, { bar: "primary-weapon-bar" }).find(
    (one) => one.id === `passive-${UNDAUNTED_METTLE}`
  )
  const summed: Record<string, number> = {}
  for (const effect of source?.effects ?? []) {
    if (!("effectType" in effect) || effect.effectType !== "fractional-change") continue
    summed[effect.metricId] = (summed[effect.metricId] ?? 0) + effect.effectValue
  }
  return summed
}

for (const rank of [1, 2]) {
  for (const weights of [1, 2, 3]) {
    test(`Undaunted Mettle at rank ${String(rank)} with ${String(weights)} armor weights raises each maximum by ${String(rank * weights)}%`, () => {
      const build = { ...wearing(weights), passiveRanks: { [UNDAUNTED_METTLE]: rank } }
      const summed = mettleOn(build)
      for (const metric of MAXIMA) {
        expect(summed[metric]).toBeCloseTo((rank * weights) / 100, 10)
      }
    })
  }
}

test("Undaunted Mettle with no rank stated is read at the rank its page states", () => {
  const summed = mettleOn(wearing(3))
  for (const metric of MAXIMA) {
    expect(summed[metric]).toBeCloseTo(0.06, 10)
  }
})
