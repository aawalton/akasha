import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { CraftTypeId } from "akasha/temper/player/character/temper-account/properties/craft-type-id.number-property.types.ts"
import type { CraftingLevel } from "akasha/temper/player/character/temper-account/properties/crafting-level.number-property.types.ts"
import type { EsoCharacterId } from "akasha/temper/thing/properties/eso-character-id.text-property.types.ts"

export type CraftingLevels = "jsonl"

export type CraftingLevelsRow = {
  id: Id
  esoCharacterId: EsoCharacterId
  craftTypeId: CraftTypeId
  craftingLevel: CraftingLevel
}
