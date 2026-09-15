import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const classSkillLines = {
  id: "01a0608a-c134-7c50-b351-4346bb0b63f1",
  type: "page-type/module",
  slug: "class-skill-lines",
  definition: "the twenty-one class skill lines, each naming the class that has it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill-line pages rather than by hand.",
    },
  ],
} as const satisfies Module
