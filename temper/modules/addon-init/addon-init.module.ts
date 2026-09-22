import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonInit = {
  id: "01a060ae-335f-75cf-867a-8b88bb3db05e",
  type: "page-type/module",
  slug: "addon-init",
  definition: "the callback the game runs once it has loaded the add-on that asked",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on begins its work once the game says that add-on has loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on hears the loading announcement once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The loading announcement has the name of whichever add-on loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An announcement naming another add-on is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The listener is dropped before the callback runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The listener sits under the namespace the caller names, or under the add-on's name.",
    },
  ],
} as const satisfies Module
