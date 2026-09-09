import type { PageType } from "@akasha/pages/page-type"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.ts"

export type TemperJewelryEnchant = TemperGearThing

export const temperJewelryEnchant = {
  id: "01a05fd1-d432-7bca-b936-c66974cf77aa",
  pageTypeSlug: "page-type",
  slug: "temper-jewelry-enchant",
  definition: "a glyph put on a piece of jewelry",
  pluralSlug: "temper-jewelry-enchants",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-enchant-constant-name", required: true, many: false },
  ],
} as const satisfies PageType
