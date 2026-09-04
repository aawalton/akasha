import type { Module } from "@akasha/code-system/module"

export const keybinderKeybindManager = {
  id: "01a06381-67c1-7ac7-b142-56557c9b3a13",
  pageTypeSlug: "module",
  slug: "keybinder-keybind-manager",
  definition: "the game's key-bind manager, taken from whichever of its two names is there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keyboard manager is preferred over the plain one.",
    },
    {
      invariantKind: "constraint",
      statement: "A client offering neither name cannot run this add-on.",
    },
  ],
} as const satisfies Module
