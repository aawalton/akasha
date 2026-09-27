import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionTargetSelect = {
  id: "01a0636c-5d97-7235-ae2a-a0e6ccc00008",
  type: "page-type/module",
  slug: "companion-target-select",
  definition: "the select naming which companion a rule sends an item to",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every word the select shows is a web phrase page.",
    },
  ],
} as const satisfies Module
