import type { PageType } from "@akasha/pages/page-type"

export const temperWeaponSlot = {
  id: "01a05fd1-d442-7dfe-a4bd-c74ac70298ff",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-weapon-slot",
  definition: "a hand or a bar a weapon is held in",
  pluralSlug: "temper-weapon-slots",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
