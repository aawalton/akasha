import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsCommand = {
  id: "01a0611d-84d1-76d7-bc57-493947e69afe",
  type: "page-type/module",
  slug: "companions-command",
  definition: "refreshing and clearing every companion's recorded data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Clearing takes the recorded data and leaves the target builds.",
    },
  ],
} as const satisfies Module
