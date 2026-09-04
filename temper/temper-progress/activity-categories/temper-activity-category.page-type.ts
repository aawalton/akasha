import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperProgressThing } from "../progress-things/temper-progress-thing.page-type.ts"
import type { BadgeVariant } from "./properties/badge-variant.text-property.ts"

export type TemperActivityCategory = TemperProgressThing & {
  badgeVariant: BadgeVariant
}

export const temperActivityCategory = {
  id: "01a05fc9-9a01-773d-b715-ed0cbfa91604",
  pageTypeSlug: "page-type",
  slug: "temper-activity-category",
  definition: "a sort of thing there is to do in the game",
  pluralSlug: "temper-activity-categories",
  extendsSlug: ["page-type/temper-progress-thing"],
  partSlugs: ["text-property/badge-variant"],
  properties: [
    { pagePropertySlug: "key", required: true, many: false },
    { pagePropertySlug: "badge-variant", required: true, many: false },
  ],
} as const satisfies PageType
