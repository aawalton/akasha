import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const equipTypeConstants = {
  id: "01a06127-6630-7b21-8870-15d879b8a41a",
  pageTypeSlug: "module",
  slug: "equip-type-constants",
  definition:
    "the equipment slot numbers the game client holds, each under the name the client spells it with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
  ],
} as const satisfies Module
