import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scribingGrimoires = {
  id: "01a0617c-86c1-7ff1-9fbb-5185c2f3eb4d",
  type: "page-type/module",
  slug: "scribing-grimoires",
  definition: "every scribing grimoire an Elder Scrolls Online character may learn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is a view over the grimoire pages the skill catalogue holds.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An entry's place in this table is the hash place its page states.",
    },
  ],
} as const satisfies Module
