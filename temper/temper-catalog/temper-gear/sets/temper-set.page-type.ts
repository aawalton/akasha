import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperSet = {
  id: "01a05fd1-d441-7c97-bedf-3316d7b4361a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-set",
  definition: "a run of pieces giving more the more of them are worn",
  pluralSlug: "temper-sets",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/bonus-count",
    "number-property/eso-set-id",
    "page-property-entry/bonuses",
    "page-property-entry/icons",
    "record-property/bonus-effects",
    "text-property/bonus-status",
    "text-property/icon-slot",
    "text-property/set-class-id",
    "text-property/valid-pieces",
  ],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/eso-set-id", required: true, many: false },
    { pageProperty: "text-property/subcategory-id", required: true, many: false },
    { pageProperty: "page-property-entry/bonuses", required: true, many: false },
    { pageProperty: "page-property-entry/icons", required: true, many: false },
    { pageProperty: "text-property/valid-pieces", required: true, many: true, maxCount: null },
    { pageProperty: "text-property/set-class-id", required: false, many: false },
  ],
  types: "ts",
} as const satisfies PageType
