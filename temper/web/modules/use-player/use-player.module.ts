import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const usePlayer = {
  id: "01a06354-4b4b-79cd-a3ce-5867c52ff199",
  type: "page-type/module",
  slug: "use-player",
  definition: "the signed-in player's row, read and written",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A player row is the account page whose key is the user id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write patches that account page and never creates one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Profile metadata a player never set has no key.",
    },
  ],
} as const satisfies Module
