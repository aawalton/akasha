import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deconstructScopeSelect = {
  id: "01a0636c-5d97-7c22-964b-407b1edd000a",
  type: "page-type/module",
  slug: "deconstruct-scope-select",
  definition: "the select naming whose items a deconstruct rule reaches",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Deconstruct modes are named from deconstruct mode pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.367Z",
  updatedAt: "2026-09-27T10:14:27.000Z",
} as const satisfies Module
