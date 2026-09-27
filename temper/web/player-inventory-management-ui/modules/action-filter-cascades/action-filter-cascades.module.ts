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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Move To group's Any choice reads Any and that group's venue or location type title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other word the selects show is a web phrase page.",
    },
  ],
} as const satisfies Module
