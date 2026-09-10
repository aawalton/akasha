import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { ScriptType } from "../properties/script-type.text-property.ts"
import type { TierAchievements } from "../properties/tier-achievements.page-property-entry.ts"
import type { ZoneSlugs } from "../properties/zone-slugs.text-property.ts"

export type TemperScribingSource = TemperCatalogThing & {
  displayOrder: DisplayOrder
  scriptType: ScriptType
  tierAchievements: TierAchievements
  zoneSlugs: ZoneSlugs
}
