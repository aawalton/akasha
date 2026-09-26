import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperTarget = {
  id: "01a0df56-c3dc-7c2d-a644-96687915fe2c",
  type: "page-type/page-type",
  slug: "temper-target",
  definition:
    "the practice target a build's damage is worked out against, and the stats it starts with",
  extends: ["page-type/temper-thing"],
  parts: ["record-property/source-effects"],
  properties: [
    {
      pageProperty: "record-property/source-effects",
      required: true,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target's title is the name its effect source shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build sets the target's armor and health over what the target states.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
