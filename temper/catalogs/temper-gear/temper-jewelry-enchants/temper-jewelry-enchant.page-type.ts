import type { PageType } from "@akasha/pages/page-type"

export const temperJewelryEnchant = {
  id: "01a05fd1-d432-7bca-b936-c66974cf77aa",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-jewelry-enchant",
  definition: "a glyph put on a piece of jewelry",
  pluralSlug: "temper-jewelry-enchants",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-enchant-constant-name", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
