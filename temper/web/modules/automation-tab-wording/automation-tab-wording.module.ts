import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationTabWording = {
  id: "01a0e2ac-36c6-745c-bb74-3c59f4bc19a2",
  type: "page-type/module",
  slug: "automation-tab-wording",
  definition: "the headings, toggle lists and info popovers of the settings automation tab",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
