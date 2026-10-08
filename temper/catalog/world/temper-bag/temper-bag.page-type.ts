import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperBag = {
  id: "01a0e24c-a62b-7473-a612-79f29879a028",
  type: "page-type/page-type",
  slug: "temper-bag",
  definition: "a part of a character's or companion's holdings that an item sits in",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bag is titled as the game's own screens name it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bag is no location type, so the addon's location order never lists a bag.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-27T09:57:49.227Z",
  updatedAt: "2026-09-27T09:57:53.000Z",
} as const satisfies PageType
