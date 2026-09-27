import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionFilterCascades = {
  id: "01a0636c-5d96-7661-9fd2-10320c6d0000",
  type: "page-type/module",
  slug: "action-filter-cascades",
  definition: "the linked selects narrowing where a rule's action sends an item",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Destinations are named from venue and location type pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Deconstruct modes are named from deconstruct mode pages.",
    },
  ],
} as const satisfies Module
