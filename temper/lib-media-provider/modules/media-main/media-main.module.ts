import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mediaMain = {
  id: "01a06069-f8c4-7b14-aede-050c4b2d0c98",
  type: "page-type/module",
  slug: "media-main",
  definition: "the entry the game loads the library through",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is exported.",
    },
  ],
} as const satisfies Module
