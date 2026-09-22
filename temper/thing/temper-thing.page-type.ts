import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperThing = {
  id: "01a05fb0-3ce8-72d1-bc97-7c0f7f1810b3",
  type: "page-type/page-type",
  slug: "temper-thing",
  definition: "anything temper gives a page",
  extends: ["page-type/page"],
  owner: "text-property/account-page",
  parts: [
    "number-property/display-order",
    "text-property/account-page",
    "relation-property/companion-id",
    "text-property/eso-character-id",
    "text-property/icon",
    "text-property/key",
    "text-property/zone-name",
    "text-property/category",
  ],
  properties: [
    { pageProperty: "text-property/key", required: false, many: false },
    { pageProperty: "text-property/icon", required: false, many: false },
    { pageProperty: "number-property/display-order", required: false, many: false },
    { pageProperty: "text-property/account-page", required: false, many: false },
    { pageProperty: "relation-property/companion-id", required: false, many: false },
    { pageProperty: "text-property/eso-character-id", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every page type temper carries extends temper-thing or a page type extending temper-thing.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
