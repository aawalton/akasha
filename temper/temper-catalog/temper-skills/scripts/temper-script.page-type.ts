import type { PageType } from "@akasha/pages-system/page-type"
import type { SlotType } from "../properties/slot-type.text-property.ts"
import type { TemperScribingThing } from "../scribing-things/temper-scribing-thing.page-type.ts"

export type TemperScript = TemperScribingThing & {
  slotType: SlotType
}

export const temperScript = {
  id: "01a05fca-cb8d-7226-b1b1-e268930470a2",
  pageTypeSlug: "page-type",
  slug: "temper-script",
  definition: "one of the writings a grimoire is filled in with",
  pluralSlug: "temper-scripts",
  extendsSlug: ["page-type/temper-scribing-thing"],
  partSlugs: ["text-property/slot-type"],
  properties: [{ pagePropertySlug: "slot-type", required: true, many: false }],
} as const satisfies PageType
