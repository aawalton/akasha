import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperVenue = {
  id: "01a0e0d4-8faf-7000-a663-56081a452c8e",
  type: "page-type/page-type",
  slug: "temper-venue",
  definition: "a place in the game a plan sends a player to act on items",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A venue is shown by its page's title wherever a plan names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order a plan visits venues in is the planner's, not the pages'.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
