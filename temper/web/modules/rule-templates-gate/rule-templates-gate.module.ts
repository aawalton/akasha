import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleTemplatesGate = {
  id: "01a0df76-d857-79fa-8d33-d445b335db72",
  type: "page-type/module",
  slug: "rule-templates-gate",
  definition: "what shows its content only once the rule templates are read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the templates are read the screen shows what it is handed instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The content is drawn again whenever the templates are read again.",
    },
  ],
  createdAt: "2026-09-26T20:45:02.935Z",
  updatedAt: "2026-09-27T08:56:53.000Z",
} as const satisfies Module
