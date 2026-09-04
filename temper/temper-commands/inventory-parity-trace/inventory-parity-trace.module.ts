import type { Module } from "@akasha/code-system/module"

export const inventoryParityTrace = {
  id: "01a068e2-226f-7a3c-b3d4-e252ba74470d",
  pageTypeSlug: "module",
  slug: "inventory-parity-trace",
  definition: "the walk the addon recorded for the last item it explained",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The addon keeps one explained item at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A trace for another item is refused rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal says which item the addon does carry.",
    },
    {
      invariantKind: "departure",
      statement: "The account the trace sits under is found by walking.",
    },
  ],
} as const satisfies Module
