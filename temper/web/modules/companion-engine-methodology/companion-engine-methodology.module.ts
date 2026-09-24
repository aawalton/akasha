import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionEngineMethodology = {
  id: "01a06432-b190-7883-b581-bac22dc2de71",
  type: "page-type/module",
  slug: "companion-engine-methodology",
  definition: "the panels saying how the companion engine works out what it recommends",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each panel is a section of the methodology's site document.",
    },
  ],
} as const satisfies Module
