import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionOverrideRow = {
  id: "01a06108-2ff4-791d-9194-955da44a9b86",
  type: "page-type/module",
  slug: "completion-override-row",
  definition: "reading one stored override off an untyped row",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A row that is not an override reads as nothing rather than throwing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character a row names by an address is read as the slug in that address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The card a row names by an address is read as the card that page is.",
    },
  ],
} as const satisfies Module
