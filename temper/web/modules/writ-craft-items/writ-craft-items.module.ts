import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const writCraftItems = {
  id: "01a0e251-237d-7628-8969-7f45fd10504c",
  type: "page-type/module",
  slug: "writ-craft-items",
  definition: "the craft toggles of daily and master writ automation, each titled by its craft",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A writ craft's toggle is labelled by its craft type page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the craft type pages are read there are no toggles.",
    },
  ],
} as const satisfies Module
