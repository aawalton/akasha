import type { Module } from "@akasha/code-system/module"

export const knowledgeLccc = {
  id: "01a06212-55bf-7553-9a56-39e3fb6e47f6",
  pageTypeSlug: "module",
  slug: "knowledge-lccc",
  definition: "the common-code table this library publishes for whoever loads first",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name the game reads keeps its upstream spelling on the key rather than on the function.",
    },
  ],
} as const satisfies Module
