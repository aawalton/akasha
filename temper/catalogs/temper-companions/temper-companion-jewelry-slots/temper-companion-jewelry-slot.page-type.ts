import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperCompanionJewelrySlot = {
  id: "01a05fcd-aecf-75d4-9252-0fa9f6ad750b",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-jewelry-slot",
  definition: "a place a companion wears one piece of jewelry",
  pluralSlug: "temper-companion-jewelry-slots",
  extends: ["page-type/temper-companion-thing"],
  parts: ["text-property/slot-category"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/equip-type", required: true, many: false },
    { pageProperty: "text-property/slot-category", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
