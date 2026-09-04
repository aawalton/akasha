import type { Module } from "@akasha/code-system/module"

export const companionQolInteractionHandlers = {
  id: "01a0611d-84c8-77bb-90ec-9585304e04c6",
  pageTypeSlug: "module",
  slug: "companion-qol-interaction-handlers",
  definition: "the game events that dismiss and resummon a companion around an interaction",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Resummoning after fishing and after crouching each wait a delay a player sets.",
    },
  ],
} as const satisfies Module
