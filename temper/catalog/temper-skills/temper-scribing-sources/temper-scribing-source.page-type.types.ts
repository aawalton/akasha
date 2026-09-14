import type { ScriptType } from "akasha/temper/catalog/temper-skills/properties/script-type.text-property.types.ts"
import type { TierAchievements } from "akasha/temper/catalog/temper-skills/properties/tier-achievements.page-property-entry.types.ts"
import type { ZoneSlugs } from "akasha/temper/catalog/temper-skills/properties/zone-slugs.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperScribingSource = TemperCatalogThing & {
  displayOrder: DisplayOrder
  scriptType: ScriptType
  tierAchievements: TierAchievements
  zoneSlugs: ZoneSlugs
}
