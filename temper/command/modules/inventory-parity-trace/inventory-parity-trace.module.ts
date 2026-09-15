import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryParityTrace = {
  id: "01a068e2-226f-7a3c-b3d4-e252ba74470d",
  type: "module",
  slug: "inventory-parity-trace",
  definition: "the walk the addon recorded for the last item it explained",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The addon keeps one explained item at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A trace for another item is refused rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal says which item the addon does carry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The account the trace sits under is found by walking.",
    },
  ],
} as const satisfies Module
