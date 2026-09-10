import type { PageType } from "@akasha/pages/page-type"

export const temperArmorEnchant = {
  id: "01a05fd1-d42e-7a0a-9e97-561c71aeccd4",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-armor-enchant",
  definition: "a glyph put on a piece of armor",
  pluralSlug: "temper-armor-enchants",
  extends: ["page-type/temper-gear-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "text-property/eso-enchant-constant-name", required: true, many: false },
  ],
  types: "ts",
} as const satisfies PageType
