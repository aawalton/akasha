import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsData2 = {
  id: "01a061a8-9c64-7729-aae4-bba854813fa0",
  pageTypeSlug: "module",
  slug: "skyshards-data-2",
  definition: "one run of the zones of the skyshard table, gathered from the runs its maps sit in",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These zones are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
