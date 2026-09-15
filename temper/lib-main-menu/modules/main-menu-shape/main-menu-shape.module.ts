import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mainMenuShape = {
  id: "01a0605b-c805-71c8-a662-3a04cfd1c00b",
  type: "page-type/module",
  slug: "main-menu-shape",
  definition: "the fields and the methods the published library object holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every method here takes the library object as its first argument.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here is code the game runs.",
    },
  ],
} as const satisfies Module
