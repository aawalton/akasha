import type { Module } from "@akasha/code-system/module"

export const companionsCommands = {
  id: "01a0611d-84d1-76d7-bc57-493947e69afe",
  pageTypeSlug: "module",
  slug: "companions-commands",
  definition: "refreshing and clearing every companion's recorded data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Clearing takes the recorded data and leaves the target builds.",
    },
  ],
} as const satisfies Module
