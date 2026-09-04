import type { Module } from "@akasha/code-system/module"

export const companionQolState = {
  id: "01a0611d-84cd-766a-94cc-4f86cd3cfe46",
  pageTypeSlug: "module",
  slug: "companion-qol-state",
  definition: "the one holder the companion quality-of-life code keeps its settings in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every quality-of-life module reads its settings from this one holder.",
    },
  ],
} as const satisfies Module
