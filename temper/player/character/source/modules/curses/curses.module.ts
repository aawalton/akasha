import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const curses = {
  id: "01a060ea-ac61-790f-9c2c-5f742647198c",
  type: "page-type/module",
  slug: "curses",
  definition: "the curse a character has, vampire or werewolf or neither",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Curses are read from their temper-curse pages, in the order of their hash places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The curse pages are held wherever the skill catalogue is held.",
    },
  ],
} as const satisfies Module
