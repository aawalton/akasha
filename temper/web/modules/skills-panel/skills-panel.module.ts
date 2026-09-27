import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillsPanel = {
  id: "01a0642c-5baf-76da-97a7-2f5fa510dec7",
  type: "page-type/module",
  slug: "skills-panel",
  definition: "the panel with a character's skills",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skill lines a build's gear opens are worked out again whenever the gear tables are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
