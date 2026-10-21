import { expect, test } from "bun:test"
import { decodeBuild, encodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { base64urlToBytes } from "akasha/temper/player/character/build/build-hash/modules/build-hash-base64url/build-hash-base64url.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const SAVED_AT_MINOR_TEN =
  "ATQKcorAAIBihYxC4RtACFvVaACLWe25EWs9tyItZ7bkRaz23Ii1ntuQgvVbchBeq25CDYetyIGj1W3LgAAAAAAAALZgAAAAAabgoggETopRJwCsRgYIEiAbg0DYBoCQziTVCiZUGwAZJxPggDhHBDhChCRAQGRGZGJARAZGpGBGRmIAREBkAAhmRGB0ZGB0REyEZkZABFBERFRmRERkda7GfKakWJMrHky5pcybOz6NOrXtn0KNKnU8VVkdWvNnj65egYskLRE2RunaRKmTv1CmCqhK46wwcNkjYEqWBGAYQKGMmg4gSbOChYwaOHkCJI6TjAAZBvDJJ4A"

function savedBuild(): CharacterState {
  const build = decodeBuild(buildHash(SAVED_AT_MINOR_TEN))
  if (build === null) throw new Error("the saved hash reads as no build")
  return build
}

test("a hash saved before minor fourteen reads no class mastery", () => {
  expect(base64urlToBytes(SAVED_AT_MINOR_TEN)?.[2]).toBe(10)
  expect(savedBuild().masteries).toBeUndefined()
})

test("the class masteries a build chooses survive a build written and read back", () => {
  const chosen = { ...savedBuild(), masteries: ["an-eye-for-exploitation", "above-and-beyond"] }
  const read = decodeBuild(encodeBuild(chosen))
  expect(read).toEqual(chosen)
  expect(read?.passives).toEqual(savedBuild().passives)
})

test("a build choosing no class mastery is written and read back stating none", () => {
  const build = savedBuild()
  const read = decodeBuild(encodeBuild(build))
  expect(read).toEqual(build)
  expect(read?.masteries).toBeUndefined()
})

test("a class mastery the catalogue does not hold is refused rather than written", () => {
  expect(() => encodeBuild({ ...savedBuild(), masteries: ["no-such-mastery"] })).toThrow()
})
