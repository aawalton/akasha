import { expect, test } from "bun:test"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import {
  withWornLevels,
  wornLevelsOf,
} from "akasha/temper/player/character/stat/modules/worn-item-levels/worn-item-levels.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const LEVEL_ONE_SASH = "|H0:item:43548:30:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const LEVEL_TWENTY_SIX_SASH = "|H0:item:43548:20:26:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const CHAMPION_SASH = "|H0:item:43548:308:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const GLYPHED_SASH = "|H0:item:215596:370:50:68343:312:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const UNPLACED_SASH = "|H0:item:43548:200:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const WEARING_NOTHING =
  "ATQHgAAAAABgAAf__AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALG0AAAAAAAAAKAAAAAAAAyA"

test("a link below level fifty gives its character level", () => {
  expect(wornLevelsOf({ slot: 6, link: LEVEL_ONE_SASH }).level).toBe(1)
  expect(wornLevelsOf({ slot: 6, link: LEVEL_TWENTY_SIX_SASH }).level).toBe(26)
})

test("a link at level fifty gives the champion level its subtype was seen at", () => {
  expect(wornLevelsOf({ slot: 6, link: CHAMPION_SASH }).level).toBe("CP150")
  expect(wornLevelsOf({ slot: 6, link: GLYPHED_SASH }).level).toBe("CP160")
})

test("a link at level fifty whose subtype no reading has placed gives no level", () => {
  expect(wornLevelsOf({ slot: 6, link: UNPLACED_SASH }).level).toBeUndefined()
})

test("the level and champion points a reading says the piece requires give its level", () => {
  const piece = { slot: 6, link: CHAMPION_SASH, requiredLevel: 50, requiredChampionPoints: 150 }
  expect(wornLevelsOf(piece).level).toBe("CP150")
  expect(wornLevelsOf({ ...piece, requiredChampionPoints: 0, requiredLevel: 36 }).level).toBe(36)
})

test("a link's glyph level is taken where the piece has a glyph", () => {
  expect(wornLevelsOf({ slot: 6, link: GLYPHED_SASH }).enchantmentLevel).toBe(50)
  expect(wornLevelsOf({ slot: 6, link: LEVEL_ONE_SASH }).enchantmentLevel).toBeUndefined()
})

test("a worn piece's level fills the build's piece in that slot", () => {
  const bare = decodeBuild(buildHash(WEARING_NOTHING))
  if (bare === null) throw new Error("the bare build decodes")
  const worn = withWornLevels(bare, [{ slot: 6, link: LEVEL_ONE_SASH }])
  expect(worn.equipment.armor.waist.data?.level).toBe(1)
  expect(worn.equipment.armor.head.data?.level).toBeUndefined()
})
