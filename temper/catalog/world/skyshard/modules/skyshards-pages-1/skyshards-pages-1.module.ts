import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPages1 = {
  id: "01a0d5ed-e0d9-7fa5-bb4e-0c0115b770c2",
  type: "page-type/module",
  slug: "skyshards-pages-1",
  definition:
    "a run of the skyshard pages, in the order of their achievement and then their number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "These pages are one unbroken run of the order the whole set of skyshard pages has.",
    },
  ],
} as const satisfies Module
