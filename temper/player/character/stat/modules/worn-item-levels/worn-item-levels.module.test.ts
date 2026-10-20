import { expect, test } from "bun:test"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { holdSetCatalogFromCheckout } from "akasha/temper/player/character/characters-equipment/modules/sets-all/sets-all.module.test-fixtures.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import {
  championLevelsOf,
  withWornLevels,
  wornLevelsOf,
} from "akasha/temper/player/character/stat/modules/worn-item-levels/worn-item-levels.module.code.ts"

holdSetCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const LEVEL_ONE_SASH = "|H0:item:43548:30:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const LEVEL_TWENTY_SIX_SASH = "|H0:item:43548:20:26:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const CP150_SASH = "|H0:item:43548:308:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const GLYPHED_CHEST = "|H0:item:215582:370:50:68343:312:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const UNPLACED_SASH = "|H0:item:43548:200:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const DISPUTED_SASH = "|H0:item:43548:201:50:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

const WEARING_NOTHING =
  "ATQHgAAAAABgAAf__AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALG0AAAAAAAAAKAAAAAAAAyA"

const LEVELS = championLevelsOf([
  { link: CP150_SASH, requiredLevel: 50, requiredCp: 150 },
  { link: GLYPHED_CHEST, requiredLevel: 50, requiredCp: 160 },
  { link: DISPUTED_SASH, requiredLevel: 50, requiredCp: 10 },
  { link: DISPUTED_SASH, requiredLevel: 50, requiredCp: 20 },
  { link: LEVEL_ONE_SASH, requiredLevel: 1, requiredCp: 0 },
])

test("a link below level fifty gives its character level", () => {
  expect(wornLevelsOf({ slot: 6, link: LEVEL_ONE_SASH }, LEVELS).level).toBe(1)
  expect(wornLevelsOf({ slot: 6, link: LEVEL_TWENTY_SIX_SASH }, LEVELS).level).toBe(26)
})

test("a link at level fifty gives the level the game's items place its subtype at", () => {
  expect(wornLevelsOf({ slot: 6, link: CP150_SASH }, LEVELS).level).toBe("CP150")
  expect(wornLevelsOf({ slot: 2, link: GLYPHED_CHEST }, LEVELS).level).toBe("CP160")
})

test("a subtype the game's items do not place, or place twice, gives no level and is marked", () => {
  expect(wornLevelsOf({ slot: 6, link: UNPLACED_SASH }, LEVELS)).toEqual({ unplaced: true })
  expect(wornLevelsOf({ slot: 6, link: DISPUTED_SASH }, LEVELS)).toEqual({ unplaced: true })
})

test("the level and champion points a reading says the piece requires give its level", () => {
  const piece = { slot: 6, link: UNPLACED_SASH, requiredLevel: 50, requiredChampionPoints: 150 }
  expect(wornLevelsOf(piece, LEVELS).level).toBe("CP150")
  expect(
    wornLevelsOf({ ...piece, requiredChampionPoints: 0, requiredLevel: 36 }, LEVELS).level
  ).toBe(36)
})

test("a link's glyph level is taken where the piece has a glyph", () => {
  expect(wornLevelsOf({ slot: 2, link: GLYPHED_CHEST }, LEVELS).enchantmentLevel).toBe(50)
  expect(wornLevelsOf({ slot: 6, link: LEVEL_ONE_SASH }, LEVELS).enchantmentLevel).toBeUndefined()
})

test("a worn piece's level fills the build's piece in that slot", () => {
  const bare = decodeBuild(buildHash(WEARING_NOTHING))
  if (bare === null) throw new Error("the bare build decodes")
  const worn = withWornLevels(bare, [{ slot: 6, link: LEVEL_ONE_SASH }], LEVELS)
  expect(worn.equipment.armor.waist.data?.level).toBe(1)
  expect(worn.equipment.armor.head.data?.level).toBeUndefined()
})
