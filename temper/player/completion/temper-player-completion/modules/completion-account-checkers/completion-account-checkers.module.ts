import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountCheckers = {
  id: "01a0640c-1e9b-77aa-9215-d1a1abde163f",
  type: "page-type/module",
  slug: "completion-account-checkers",
  definition: "what answers whether an account has finished each account-wide completion card",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An account card counting what any character has done needs every character's record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A checker is handed the account's record, every character's record and the catalogs.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing captured counts antiquity leads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card counted from every character is counted by the union its summary reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card no character was read for answers nothing rather than nought.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A card counted against a catalog answers nothing where no catalog was handed in.",
    },
  ],
} as const satisfies Module
