import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperEsoPlus = {
  id: "01a0df64-1044-741d-8fad-c665ba1d8093",
  type: "page-type/page-type",
  slug: "temper-eso-plus",
  definition: "whether an account holds an ESO Plus subscription, and what that adds",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/description", required: true, many: false },
    {
      pageProperty: "record-property/source-effects",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/hash-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ESO Plus page's title is the name its effect source shows.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An ESO Plus page's hash place is the index a build hash has for it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
