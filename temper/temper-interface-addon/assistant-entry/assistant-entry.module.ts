import type { Module } from "@akasha/code-system/module"

export const assistantEntry = {
  id: "01a060e7-1bec-7cd5-876c-cef3639abf2a",
  pageTypeSlug: "module",
  slug: "assistant-entry",
  definition: "what the assistant keybinds do as the game loads them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Keybind names are made again whenever a collectible changes.",
    },
  ],
} as const satisfies Module
