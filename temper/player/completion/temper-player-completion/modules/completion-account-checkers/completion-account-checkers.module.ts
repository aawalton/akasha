import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountCheckers = {
  id: "01a0640c-1e9b-77aa-9215-d1a1abde163f",
  type: "page-type/module",
  slug: "completion-account-checkers",
  definition: "what answers whether an account has finished each account-wide completion card",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An account card counting what any character has done needs every character's record.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A checker is handed the account's record and no character's record.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Nothing captured counts antiquity leads.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "The account quests, recipes, traits, points of interest and zone completion cards have a checker.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "The account skill scribing, lore library and antiquity lead cards have a checker.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "The account achievements, antiquity lore, collectibles and Tales of Tribute cards have a checker.",
    },
  ],
} as const satisfies Module
