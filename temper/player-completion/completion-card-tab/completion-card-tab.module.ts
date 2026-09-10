import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCardTab = {
  id: "01a06103-0618-76fd-8539-d368cdcf6cae",
  pageTypeSlug: "module",
  slug: "completion-card-tab",
  definition: "which of the three tabs of the completion window a card is shown under",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A card is answered for by its own identifier alone.",
    },
  ],
} as const satisfies Module
