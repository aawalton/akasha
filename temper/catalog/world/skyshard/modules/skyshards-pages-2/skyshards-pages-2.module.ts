import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPages2 = {
  id: "01a0d5ed-e0da-7d58-9d8a-38ffd3105c12",
  type: "page-type/module",
  slug: "skyshards-pages-2",
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
