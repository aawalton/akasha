import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterTargetSelect = {
  id: "01a0636c-5d97-74d0-b867-42b23aa30006",
  type: "page-type/module",
  slug: "character-target-select",
  definition: "the select naming which character a rule sends an item to",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every word the select shows is a web phrase page.",
    },
  ],
} as const satisfies Module
