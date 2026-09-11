import type { QuestGiver } from "akasha/temper/catalog/temper-world/properties/quest-giver.relation-property.types.ts"
import type { RotationPosition } from "akasha/temper/catalog/temper-world/properties/rotation-position.number-property.types.ts"
import type { SoloDifficulty } from "akasha/temper/catalog/temper-world/properties/solo-difficulty.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperDungeon = TemperCatalogThing & {
  key: Key
  questGiver: QuestGiver
  rotationPosition: RotationPosition
  soloDifficulty: SoloDifficulty
}
