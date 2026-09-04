import type { Module } from "@akasha/code-system/module"

export const keybinderKeybindEvents = {
  id: "01a06381-67c1-7e9d-98cb-1b00a62bc68f",
  pageTypeSlug: "module",
  slug: "keybinder-keybind-events",
  definition: "the game announcing a key bound or cleared, written back into what the add-on holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change is recorded only while the key-bind window is open.",
    },
    {
      invariantKind: "departure",
      statement: "The add-on synchronises on the frame after the game announces the bindings.",
    },
  ],
} as const satisfies Module
