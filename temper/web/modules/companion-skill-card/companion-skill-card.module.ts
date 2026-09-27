import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillCard = {
  id: "01a0642f-8c32-7405-ac05-1f265b98bb0b",
  type: "page-type/module",
  slug: "companion-skill-card",
  definition: "the card drawing a companion skill",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cost names its resource as the resource page's title does.",
    },
  ],
} as const satisfies Module
