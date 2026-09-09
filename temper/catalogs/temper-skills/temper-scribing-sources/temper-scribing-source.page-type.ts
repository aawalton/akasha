import type { PageType } from "@akasha/pages/page-type"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { ScriptType } from "../properties/script-type.text-property.ts"
import type { TierAchievements } from "../properties/tier-achievements.page-property-entry.ts"
import type { ZoneSlugs } from "../properties/zone-slugs.text-property.ts"

export type TemperScribingSource = TemperCatalogThing & {
  scriptType: ScriptType
  tierAchievements: TierAchievements
  zoneSlugs: ZoneSlugs
}

export const temperScribingSource = {
  id: "01a05fca-cb8a-71bc-bb97-a0f1bb3ac4fb",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-scribing-source",
  definition: "a run of content the scripts are earned from",
  pluralSlug: "temper-scribing-sources",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/achievement-id",
    "page-property-entry/tier-achievements",
    "text-property/script-type",
    "text-property/zone-slugs",
  ],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/script-type", required: true, many: false },
    { pageProperty: "page-property-entry/tier-achievements", required: true, many: false },
    { pageProperty: "text-property/zone-slugs", required: true, many: true, maxCount: null },
  ],
} as const satisfies PageType
