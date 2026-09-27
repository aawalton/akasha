import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperPlanPhrase = {
  id: "01a0e2b7-0935-79bb-989a-a83c365f06f7",
  type: "page-type/page-type",
  slug: "temper-plan-phrase",
  definition: "a piece of wording a management plan shows around the things it names",
  extends: ["page-type/temper-thing"],
  properties: [
    { pageProperty: "text-property/key", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The title is the wording a plan shows, on the web and in a plan run alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step the game names is titled with the game's own spelling.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
