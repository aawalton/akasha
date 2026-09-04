import type { Module } from "@akasha/code-system/module"

export const keybinderBindingFns = {
  id: "01a06381-67c1-70be-89d4-23608f21260c",
  pageTypeSlug: "module",
  slug: "keybinder-binding-fns",
  definition: "binding and unbinding a key, through the secure call where the game protects it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A protected call is made through the secure wrapper rather than directly.",
    },
    {
      invariantKind: "departure",
      statement: "A call the game keeps private is not made.",
    },
    {
      invariantKind: "departure",
      statement: "The add-on does nothing where neither way of binding is open to the add-on.",
    },
  ],
} as const satisfies Module
