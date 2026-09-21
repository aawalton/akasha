import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCompletionOverride = {
  id: "01a05fd0-3aa7-7efc-9f5f-080d0b9f5bd0",
  type: "page-type/page-type",
  slug: "temper-completion-override",
  definition:
    "a completion count set by hand where the game's own count would read as a gap that is not one",
  extends: ["page-type/temper-progress-thing"],
  parts: ["number-property/floor", "text-property/override-reason"],
  properties: [
    { pageProperty: "text-property/account-page", required: true, many: false },
    { pageProperty: "text-property/character", required: true, many: false },
    { pageProperty: "text-property/completion-card-id", required: true, many: false },
    {
      pageProperty: "text-property/completion-item-path",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/floor", required: true, many: false },
    { pageProperty: "text-property/override-reason", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A count the game reports above the floor is taken as the game reports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One override answers one item of one card for one character.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
