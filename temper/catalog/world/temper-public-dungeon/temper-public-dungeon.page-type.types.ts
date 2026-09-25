import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { EsoAchievementId } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/properties/eso-achievement-id.number-property.types.ts"
import type { ZoneKey } from "akasha/temper/catalog/world/temper-public-dungeon/properties/zone-key.text-property.types.ts"
import type { EsoZoneId } from "akasha/temper/catalog/world/zone/properties/eso-zone-id.number-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperPublicDungeon = TemperCatalogThing & {
  key: Key
  esoZoneId: EsoZoneId
  zoneKey: ZoneKey
  esoAchievementId: EsoAchievementId
  displayOrder: DisplayOrder
}
