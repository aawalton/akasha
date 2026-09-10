import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCompanionQuestActionability = {
  id: "01a06121-f0d1-7a40-bb2f-7378186e50e0",
  pageTypeSlug: "module",
  slug: "completion-companion-quest-actionability",
  definition: "the next companion quest a player can take right now",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Companions are gone through in the order of their names.",
    },
    {
      invariantKind: "constraint",
      statement: "A quest asking more rapport than a companion holds is not yet takeable.",
    },
  ],
} as const satisfies Module
