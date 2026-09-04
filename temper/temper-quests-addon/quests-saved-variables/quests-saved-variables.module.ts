import type { Module } from "@akasha/code-system/module"

export const questsSavedVariables = {
  id: "01a0635f-391c-721c-be7d-e4fb741328a6",
  pageTypeSlug: "module",
  slug: "quests-saved-variables",
  definition: "what the addon keeps between sessions, and how the old addon's settings arrive",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The settings are shared by every character on one account.",
    },
    {
      invariantKind: "departure",
      statement: "Settings the character addon held are carried over once.",
    },
    {
      invariantKind: "departure",
      statement: "The carry is marked done before the carry is attempted.",
    },
    {
      invariantKind: "departure",
      statement: "Only a setting turned away from its default is carried over.",
    },
    {
      invariantKind: "departure",
      statement: "A read before the game has loaded the addon is refused.",
    },
    {
      invariantKind: "constraint",
      statement: "The game writes saved variables only as the client shuts down.",
    },
  ],
} as const satisfies Module
