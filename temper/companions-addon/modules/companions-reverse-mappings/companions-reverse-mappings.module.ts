import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsReverseMappings = {
  id: "01a0611d-84de-7793-b8b7-f25afebc6f2e",
  type: "page-type/module",
  slug: "companions-reverse-mappings",
  definition: "turning a codec index back into the game constant and the words a player reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An index outside the table reads back as the empty entry.",
    },
  ],
} as const satisfies Module
