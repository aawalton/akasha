import type { ScriptType } from "akasha/temper/catalog/skill/temper-scribing-source/properties/script-type.text-property.types.ts"
import type { TierAchievements } from "akasha/temper/catalog/skill/temper-scribing-source/properties/tier-achievements.page-property-entry.types.ts"
import type { ZoneSlugs } from "akasha/temper/catalog/skill/temper-scribing-source/properties/zone-slugs.multi-relation-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"

export type TemperScribingSource = TemperCatalogThing & {
  displayOrder: DisplayOrder
  scriptType: ScriptType
  tierAchievements: TierAchievements
  zoneSlugs: ZoneSlugs
}
