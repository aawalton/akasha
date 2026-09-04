import type { Module } from "@akasha/code-system/module"

export const addonKeybindsCasts = {
  id: "01a0605a-051b-7355-a78a-16ba2dc843c5",
  pageTypeSlug: "module",
  slug: "addon-keybinds-casts",
  definition: "what a value out of the game's untyped keybinding tables is read as",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
