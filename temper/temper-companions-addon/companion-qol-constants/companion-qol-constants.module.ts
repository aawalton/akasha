import type { Module } from "@akasha/code-system/module"

export const companionQolConstants = {
  id: "01a0611d-84c6-7e76-97f3-a24fa6b91e9a",
  pageTypeSlug: "module",
  slug: "companion-qol-constants",
  definition: "the settings the quality-of-life code starts out with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting absent from saved variables takes its value from here.",
    },
  ],
} as const satisfies Module
