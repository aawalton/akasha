import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperAlliance = {
  id: "01a05fc4-7a8c-7403-bf1d-3fe777a61478",
  type: "page-type/page-type",
  slug: "temper-alliance",
  definition: "a faction the players of Tamriel are divided among",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-alliance-id"],
  properties: [
    { pageProperty: "number-property/eso-alliance-id", required: true, many: false },
    { pageProperty: "number-property/hash-place", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An alliance's hash place is the index a build hash has for it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  hashIndexed: ["hashPlace"],
} as const satisfies PageType
