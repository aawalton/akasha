import type { PageType } from "@akasha/pages/page-type"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.ts"

export type TemperCompanionEquipmentQuality = TemperCompanionThing

export const temperCompanionEquipmentQuality = {
  id: "01a05fcd-aed0-75bf-9fe4-d95291c165fb",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-equipment-quality",
  definition: "a grade a piece of companion equipment comes at",
  pluralSlug: "temper-companion-equipment-qualities",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "boolean-property/available", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
} as const satisfies PageType
