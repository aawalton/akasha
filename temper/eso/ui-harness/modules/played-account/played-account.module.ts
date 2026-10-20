import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedAccount = {
  id: "01a15a99-1fd7-765d-828d-cce221a24692",
  type: "page-type/module",
  slug: "played-account",
  definition: "the sandbox's Lua saying which account and character the player is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account is a key opening with `@` under a seeded file's default table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved variable's account-wide table is read under the first account by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Who the player is falls back to the harness only where the player's game answered nothing.",
    },
  ],
  createdAt: "2026-10-20T18:35:47.031Z",
  updatedAt: "2026-10-20T18:35:47.031Z",
} as const satisfies Module
