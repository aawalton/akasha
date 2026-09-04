import type { Module } from "@akasha/code-system/module"

export const companionQolInteractionState = {
  id: "01a0611d-84c9-773b-b409-f70118da30cb",
  pageTypeSlug: "module",
  slug: "companion-qol-interaction-state",
  definition: "when a companion was dismissed for an interaction and whether to bring it back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A companion dismissed by the player is told apart from one dismissed for an interaction.",
    },
  ],
} as const satisfies Module
