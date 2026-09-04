import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsData3 = {
  id: "01a061a8-9c64-7084-a3ab-9f45e86c6e59",
  pageTypeSlug: "module",
  slug: "skyshards-data-3",
  definition: "one run of the zones of the skyshard table, gathered from the runs its maps sit in",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These zones are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
