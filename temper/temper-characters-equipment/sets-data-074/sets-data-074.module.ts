import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setsData074 = {
  id: "01a061a3-6215-7716-8266-fc862ef429aa",
  pageTypeSlug: "module",
  slug: "sets-data-074",
  definition:
    "part 074 of the gear set table, perfected-test-of-resolve through perfected-virulent-shot",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
    {
      invariantKind: "gap",
      statement: "A set moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
