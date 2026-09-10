import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperCurse = {
  id: "01a05fc5-94d2-7b6d-ac6a-2a3a21b68f41",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-curse",
  definition: "a lasting affliction a character takes on",
  pluralSlug: "temper-curses",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-curse-ids"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    {
      pageProperty: "number-property/eso-curse-ids",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  types: "ts",
} as const satisfies PageType
