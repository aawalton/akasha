import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { Armor } from "../properties/armor.number-property.ts"

export type TemperTargetArmor = TemperCatalogThing & {
  armor: Armor
}

export const temperTargetArmor = {
  id: "01a05fc5-94d1-784f-81dd-52ce5bc412dd",
  pageTypeSlug: "page-type",
  slug: "temper-target-armor",
  definition: "a sort of enemy damage is worked out against",
  pluralSlug: "temper-target-armors",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: ["number-property/armor"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "armor", required: true, many: false },
  ],
} as const satisfies PageType
