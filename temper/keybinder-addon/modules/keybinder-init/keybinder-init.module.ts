import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderInit = {
  id: "01a06381-67c1-7c76-96e7-07ef878b098c",
  type: "page-type/module",
  slug: "keybinder-init",
  definition: "the controls the add-on puts in the key-bind window and the events it waits on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An account with no shared bindings is filled from the defaults on first login.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Synchronising waits until the player is out of combat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bind button is held enabled so a bound key can be rebound.",
    },
  ],
} as const satisfies Module
