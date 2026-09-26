import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"

holdCompanionCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const GARLIC_HAGFISH_HASH =
  "ATQHgAAAAAAf_4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXr164BatWrQBQoUKAAQQmQAA"
const CHEESE_PLATE_HASH =
  "ATQHgAAAAAAf_4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXr164BatWrQBQoUKAAgAGQAA"

export const GARLIC_HAGFISH_ITEM = 68235
export const CHEESE_PLATE_ITEM = 68236
export const TRI_RESTORATION_ITEM = 64710
export const SPELLCASTER_ELIXIR_ITEM = 112427

export const CHARACTERS = [
  { esoCharacterId: "111", targetBuildHash: GARLIC_HAGFISH_HASH },
  { esoCharacterId: "222", targetBuildHash: GARLIC_HAGFISH_HASH },
  { esoCharacterId: "333" },
  { esoCharacterId: "444", targetBuildHash: CHEESE_PLATE_HASH },
]
