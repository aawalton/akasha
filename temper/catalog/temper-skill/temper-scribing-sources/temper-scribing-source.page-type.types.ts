import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { ScriptType } from "../properties/script-type.text-property.types.ts"
import type { TierAchievements } from "../properties/tier-achievements.page-property-entry.types.ts"
import type { ZoneSlugs } from "../properties/zone-slugs.text-property.types.ts"

export type TemperScribingSource = TemperCatalogThing & {
  displayOrder: DisplayOrder
  scriptType: ScriptType
  tierAchievements: TierAchievements
  zoneSlugs: ZoneSlugs
}
