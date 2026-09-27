import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillDetailContent = {
  id: "01a06421-2520-7f84-8ad2-126a20fa0110",
  type: "page-type/module",
  slug: "companion-skill-detail-content",
  definition: "what a companion skill's own view draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost is worded by a web phrase page and names the resource page's title.",
    },
  ],
} as const satisfies Module
