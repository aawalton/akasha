import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryResetBadge = {
  id: "01a0636c-5d9b-778b-ad4c-ebc99c6f001d",
  type: "page-type/module",
  slug: "inventory-reset-badge",
  definition: "the badge saying a rule has been put back to its default",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Reset and Cancel buttons are web phrase pages; the caller words the dialog.",
    },
  ],
} as const satisfies Module
