import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPages6 = {
  id: "01a0d5ed-e0da-7ab6-a3ab-a298fade19a9",
  type: "page-type/module",
  slug: "skyshards-pages-6",
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
