import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const classifyItemNodeIds = {
  id: "01a060e4-b745-7028-bea7-10714af9a632",
  type: "page-type/module",
  slug: "classify-item-node-ids",
  definition: "the branch an item belongs under, given as branch identities rather than names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The roots are handed in, so the addon and a server each hand the tree they hold.",
    },
  ],
} as const satisfies Module
