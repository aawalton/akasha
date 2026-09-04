import type { Module } from "@akasha/code-system/module"

export const assistantBindings = {
  id: "01a060e7-1bec-71bf-a376-11634f9d6337",
  pageTypeSlug: "module",
  slug: "assistant-bindings",
  definition: "how a keybind name is made for each assistant the player has unlocked",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A keybind name is made only for an assistant already unlocked.",
    },
    {
      invariantKind: "departure",
      statement: "A name already carrying text is left alone.",
    },
  ],
} as const satisfies Module
