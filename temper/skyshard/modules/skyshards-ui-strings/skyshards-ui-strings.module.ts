import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsUiStrings = {
  id: "01a061a8-9c6d-78ec-a73e-8cbbac148296",
  type: "page-type/module",
  slug: "skyshards-ui-strings",
  definition: "the English text this add-on adds to the game's table of strings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The text here is English alone.",
    },
  ],
} as const satisfies Module
