import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsPages9 = {
  id: "01a0d5ed-e0da-7d76-925d-617466e57e48",
  type: "page-type/module",
  slug: "skyshards-pages-9",
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
