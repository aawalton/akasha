import type { PageType } from "@akasha/pages/page-type"

export const temperGearThing = {
  id: "01a05fcc-41ef-7386-84ed-43fb6534121e",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-gear-thing",
  definition: "anything a character wears, wields or brews",
  pluralSlug: "temper-gear-things",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
    "number-property/potion-seconds",
    "text-property/buff-id",
    "text-property/debuff-id",
    "text-property/essence-rune",
    "text-property/eso-enchant-constant-name",
    "text-property/glyph-name",
    "text-property/item-level",
    "text-property/valid-slots",
  ],
  properties: [
    { pageProperty: "text-property/glyph-name", required: false, many: false },
    { pageProperty: "text-property/essence-rune", required: false, many: false },
    { pageProperty: "text-property/eso-enchant-constant-name", required: false, many: false },
    { pageProperty: "text-property/valid-slots", required: false, many: true, maxCount: null },
    { pageProperty: "text-property/item-level", required: false, many: false },
    { pageProperty: "number-property/potion-seconds", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key two gear page types carry is declared here rather than in each page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which buff a drink grants is a field of the shared effect shape rather than a key here.",
    },
  ],
  types: "ts",
} as const satisfies PageType
