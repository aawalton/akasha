import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { ScriptType } from "../../temper-skills/properties/script-type.text-property.ts"
import type { TierAchievements } from "../../temper-skills/properties/tier-achievements.page-property-entry.ts"
import type { ZoneSlugs } from "../../temper-skills/properties/zone-slugs.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperScribingSource = TemperCatalogThing & {
  displayOrder: DisplayOrder
  scriptType: ScriptType
  tierAchievements: TierAchievements
  zoneSlugs: ZoneSlugs
}
