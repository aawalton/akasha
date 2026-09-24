import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompletion = {
  id: "01a06363-f687-70fb-8023-b311dc463a1b",
  type: "page-type/module",
  slug: "use-completion",
  definition: "the completion a browser reads for a player",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A query not naming `completion` under `files` answers that file's ending rather than its body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion that is not an object reads here as no completion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player's characters and companions are found by the account page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row shape here says what the query answers rather than what the domain holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The character row and the companion row are declared together, as one query answers both.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The domain's own character row is a different shape, so neither row is shared.",
    },
  ],
} as const satisfies Module
