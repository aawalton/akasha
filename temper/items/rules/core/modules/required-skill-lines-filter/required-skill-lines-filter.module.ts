import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const requiredSkillLinesFilter = {
  id: "01a06100-3bf8-70f7-9492-2892d8648322",
  type: "page-type/module",
  slug: "required-skill-lines-filter",
  definition: "the Required Skill Lines condition a rule may carry, as the rule editor offers it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter reads and writes the `requiredSkillLines` condition alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter is shown under its condition field page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule whose action is other than `stock` is offered no Required Skill Lines condition.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.440Z",
  updatedAt: "2026-09-27T10:08:48.000Z",
} as const satisfies Module
