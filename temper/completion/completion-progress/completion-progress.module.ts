import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const completionProgress = {
  id: "01a0607a-9cbc-7106-abcd-353786bf9f09",
  pageTypeSlug: "module",
  type: "module",
  slug: "completion-progress",
  definition: "how far along one part of the game a player is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A collectibles capture arriving keyed rather than listed is read as the values under those keys.",
    },
  ],
} as const satisfies Module
