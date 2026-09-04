import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const esoReset = {
  id: "01a0603b-d66a-7bf8-9657-cb2176247f1b",
  pageTypeSlug: "module",
  slug: "eso-reset",
  definition: "when the game's day last turned over, counted in whole seconds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day here turns over at six in the morning in New York.",
    },
    {
      invariantKind: "constraint",
      statement: "The saving-time rule of today is applied to every year.",
    },
    {
      invariantKind: "constraint",
      statement: "Lua compiled for the game reaches no Date and no clock of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Every instant here is a whole second rather than a millisecond.",
    },
  ],
} as const satisfies Module
