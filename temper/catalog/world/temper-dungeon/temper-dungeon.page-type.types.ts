import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DungeonQuestId } from "akasha/temper/catalog/world/temper-dungeon/properties/dungeon-quest-id.number-property.types.ts"
import type { QuestGiver } from "akasha/temper/catalog/world/temper-dungeon/properties/quest-giver.relation-property.types.ts"
import type { RotationPosition } from "akasha/temper/catalog/world/temper-dungeon/properties/rotation-position.number-property.types.ts"
import type { SoloDifficulty } from "akasha/temper/catalog/world/temper-dungeon/properties/solo-difficulty.text-property.types.ts"
import type { ZoneKey } from "akasha/temper/catalog/world/temper-public-dungeon/properties/zone-key.text-property.types.ts"
import type { EsoZoneId } from "akasha/temper/catalog/world/zone/properties/eso-zone-id.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperDungeon = TemperCatalogThing & {
  key: Key
  questGiver: QuestGiver
  rotationPosition: RotationPosition
  soloDifficulty: SoloDifficulty
  esoZoneId?: EsoZoneId
  zoneKey?: ZoneKey
  questId?: DungeonQuestId
}
