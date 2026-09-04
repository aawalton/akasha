import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const batchConfig = {
  id: "01a06071-0c77-7e96-8044-2bad3e05b280",
  pageTypeSlug: "module",
  slug: "batch-config",
  definition: "how many entries a collector reads at once, and how long it waits after each batch",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A batch reads a hundred entries.",
    },
    {
      invariantKind: "departure",
      statement: "The next batch begins a hundred milliseconds later.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the game.",
    },
  ],
} as const satisfies Module
