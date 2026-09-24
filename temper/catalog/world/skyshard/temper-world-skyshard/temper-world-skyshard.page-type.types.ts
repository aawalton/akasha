import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { EsoAchievementId } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/eso-achievement-id.number-property.types.ts"
import type { MapPositions } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/map-positions.record-property.types.ts"
import type { ShardNumber } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/shard-number.number-property.types.ts"
import type { WorldZone } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/world-zone.relation-property.types.ts"

export type TemperWorldSkyshard = TemperCatalogThing & {
  esoAchievementId: EsoAchievementId
  shardNumber: ShardNumber
  worldZone: WorldZone
  mapPositions: MapPositions
}
