import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { QuestGiver } from "../properties/quest-giver.relation-property.ts"
import type { RotationPosition } from "../properties/rotation-position.number-property.ts"
import type { SoloDifficulty } from "../properties/solo-difficulty.text-property.ts"

export type TemperDungeon = TemperCatalogThing & {
  key: Key
  questGiver: QuestGiver
  rotationPosition: RotationPosition
  soloDifficulty: SoloDifficulty
}
