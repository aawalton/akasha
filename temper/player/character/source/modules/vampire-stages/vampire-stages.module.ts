import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const vampireStages = {
  id: "01a060ea-ac65-780c-876f-8ff34a264cc4",
  type: "page-type/module",
  slug: "vampire-stages",
  definition: "the five stages of vampirism, each feeding a character more penalty",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Vampire stages are read from their pages, in the order of their hash places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stage's number is the display order its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The vampire stage pages are held wherever the skill catalogue is held.",
    },
  ],
} as const satisfies Module
