import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const temperThing = {
  id: "01a05fb0-3ce8-72d1-bc97-7c0f7f1810b3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-thing",
  definition: "anything temper keeps a page for",
  pluralSlug: "temper-things",
  extends: ["page-type/page"],
  owner: "account-page",
  parts: [
    "number-property/display-order",
    "text-property/account-page",
    "text-property/category",
    "text-property/category-id",
    "text-property/companion-id",
    "text-property/eso-character-id",
    "text-property/icon",
    "text-property/key",
    "text-property/parent",
    "text-property/zone-name",
  ],
  properties: [
    { pageProperty: "text-property/key", required: false, many: false },
    { pageProperty: "text-property/icon", required: false, many: false },
    { pageProperty: "number-property/display-order", required: false, many: false },
    { pageProperty: "text-property/account-page", required: false, many: false },
    { pageProperty: "text-property/category-id", required: false, many: false },
    { pageProperty: "text-property/category", required: false, many: false },
    { pageProperty: "text-property/companion-id", required: false, many: false },
    { pageProperty: "text-property/eso-character-id", required: false, many: false },
    { pageProperty: "text-property/parent", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every page type temper carries extends temper-thing or a page type extending temper-thing.",
    },
  ],
  types: "ts",
} as const satisfies PageType
