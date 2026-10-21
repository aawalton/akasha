import { expect, test } from "bun:test"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import { extractClassMasteries } from "akasha/temper/player/character/stat/modules/extract-class-masteries/extract-class-masteries.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const SAVED_AT_MINOR_TEN =
  "ATQKcorAAIBihYxC4RtACFvVaACLWe25EWs9tyItZ7bkRaz23Ii1ntuQgvVbchBeq25CDYetyIGj1W3LgAAAAAAAALZgAAAAAabgoggETopRJwCsRgYIEiAbg0DYBoCQziTVCiZUGwAZJxPggDhHBDhChCRAQGRGZGJARAZGpGBGRmIAREBkAAhmRGB0ZGB0REyEZkZABFBERFRmRERkda7GfKakWJMrHky5pcybOz6NOrXtn0KNKnU8VVkdWvNnj65egYskLRE2RunaRKmTv1CmCqhK46wwcNkjYEqWBGAYQKGMmg4gSbOChYwaOHkCJI6TjAAZBvDJJ4A"

function choosing(masteries: readonly string[]): CharacterState {
  const build = decodeBuild(buildHash(SAVED_AT_MINOR_TEN))
  if (build === null) throw new Error("the saved hash reads as no build")
  return { ...build, masteries }
}

test("Above and Beyond chosen raises Critical Damage and Critical Healing by 25%", () => {
  const sources = extractClassMasteries(choosing(["above-and-beyond"]), {
    bar: "primary-weapon-bar",
  })
  expect(sources).toEqual([
    {
      id: "mastery-above-and-beyond",
      categoryId: "skills",
      effects: [
        { metricId: "critical-damage", effectType: "fractional-change", effectValue: 0.25 },
        { metricId: "healing-critical-bonus", effectType: "fractional-change", effectValue: 0.25 },
      ],
    },
  ])
})

test("a mastery whose effect is not modelled gives no effect source", () => {
  expect(extractClassMasteries(choosing(["an-eye-for-exploitation"]), {})).toEqual([])
})

test("a build stating no masteries gives no effect source", () => {
  const build = decodeBuild(buildHash(SAVED_AT_MINOR_TEN))
  if (build === null) throw new Error("the saved hash reads as no build")
  expect(build.masteries).toBeUndefined()
  expect(extractClassMasteries(build, {})).toEqual([])
})
