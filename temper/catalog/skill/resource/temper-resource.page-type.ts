import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperResource = {
  id: "01a0e2cf-29db-7f15-903a-a854167ea509",
  type: "page-type/page-type",
  slug: "temper-resource",
  definition: "a pool the game spends an ability's cost from",
  extends: ["page-type/temper-catalog-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource is titled as the game's combat mechanic names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource's key is the resource a skill's cost names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A resource's place is the game's combat mechanic flag.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
