import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skyshardsPart14 = {
  id: "01a061a8-9c67-7491-a9bb-70fe9794c3b4",
  pageTypeSlug: "module",
  slug: "skyshards-part-14",
  definition:
    "one run of the skyshard placement table, in the order the whole table names its maps",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "These records are one unbroken run of the whole table's order.",
    },
    {
      invariantKind: "departure",
      statement: "This run is the add-on's own source rather than anything akasha derives.",
    },
  ],
} as const satisfies Module
