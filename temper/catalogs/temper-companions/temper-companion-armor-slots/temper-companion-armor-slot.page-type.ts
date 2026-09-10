import type { PageType } from "@akasha/pages/page-type"

export const temperCompanionArmorSlot = {
  id: "01a05fcd-aece-70c8-8784-e3afaec07950",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-companion-armor-slot",
  definition: "a place a companion wears one piece of armor",
  pluralSlug: "temper-companion-armor-slots",
  extends: ["page-type/temper-companion-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/equip-type", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
