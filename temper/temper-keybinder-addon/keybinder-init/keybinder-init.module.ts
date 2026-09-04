import type { Module } from "@akasha/code-system/module"

export const keybinderInit = {
  id: "01a06381-67c1-7c76-96e7-07ef878b098c",
  pageTypeSlug: "module",
  slug: "keybinder-init",
  definition: "the controls the add-on puts in the key-bind window and the events it waits on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An account holding no shared bindings is filled from the defaults on first login.",
    },
    {
      invariantKind: "departure",
      statement: "Synchronising waits until the player is out of combat.",
    },
    {
      invariantKind: "departure",
      statement: "The bind button is held enabled so a bound key can be rebound.",
    },
  ],
} as const satisfies Module
