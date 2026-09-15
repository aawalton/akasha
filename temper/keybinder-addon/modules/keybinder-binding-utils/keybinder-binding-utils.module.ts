import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keybinderBindingUtils = {
  id: "01a06381-67c1-7246-ad70-5a367ff2cd98",
  type: "page-type/module",
  slug: "keybinder-binding-utils",
  definition: "reading an action's keys out of the game and comparing them with a saved set",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A modifier is reduced to the one key that represents that modifier before comparison.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action is bound when a binding slot of that action has a key.",
    },
  ],
} as const satisfies Module
