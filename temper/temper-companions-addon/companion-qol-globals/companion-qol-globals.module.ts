import type { Module } from "@akasha/code-system/module"

export const companionQolGlobals = {
  id: "01a0611d-84c7-7d9e-8f94-55dee6f9ebf2",
  pageTypeSlug: "module",
  slug: "companion-qol-globals",
  definition: "the one name the quality-of-life code hangs off the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The quality-of-life holder answers to the name its own add-on used.",
    },
  ],
} as const satisfies Module
