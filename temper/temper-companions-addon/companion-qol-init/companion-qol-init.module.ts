import type { Module } from "@akasha/code-system/module"

export const companionQolInit = {
  id: "01a0611d-84c8-7409-b365-635778e4701c",
  pageTypeSlug: "module",
  slug: "companion-qol-init",
  definition: "what the quality-of-life code does as the companion add-on loads it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The quality-of-life code loads after the companion panels are registered.",
    },
  ],
} as const satisfies Module
