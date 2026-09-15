import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fcoInventory = {
  id: "01a06115-1aca-79a6-bd65-384d31995db8",
  type: "module",
  slug: "fco-inventory",
  definition: "the inventory window behaviour the interface tweaks change",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No shared guard could name the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
