import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonKeybindsBootstrap = {
  id: "01a0605a-0518-7c9d-94e2-4a1ec6390fe3",
  type: "module",
  slug: "addon-keybinds-bootstrap",
  definition: "the library put on the globals and the wait for the game's keybinding screen",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second load returns without touching the library already in place.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keyboard keybinding manager is preferred over the shared keybinding manager.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A missing keybinding manager is an error rather than a quiet return.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The wait is dropped before being set up again.",
    },
  ],
} as const satisfies Module
