import type { Module } from "@akasha/code-system/module"

export const companionQolCompass = {
  id: "01a0611d-84c5-7033-849d-5e422d08a22a",
  pageTypeSlug: "module",
  slug: "companion-qol-compass",
  definition: "turning the companion's compass pin off",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pin is faded by alpha rather than unregistered.",
    },
  ],
} as const satisfies Module
