import type { PageType } from "@akasha/pages/page-type"
import type { SlotType } from "../properties/slot-type.text-property.ts"
import type { TemperScribingThing } from "../temper-scribing-things/temper-scribing-thing.page-type.ts"

export type TemperScript = TemperScribingThing & {
  slotType: SlotType
}

export const temperScript = {
  id: "01a05fca-cb8d-7226-b1b1-e268930470a2",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-script",
  definition: "one of the writings a grimoire is filled in with",
  pluralSlug: "temper-scripts",
  extends: ["page-type/temper-scribing-thing"],
  parts: ["text-property/slot-type"],
  properties: [{ pageProperty: "text-property/slot-type", required: true, many: false }],
} as const satisfies PageType
