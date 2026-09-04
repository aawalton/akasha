import type { Module } from "@akasha/code-system/module"

export const slashCommanderEntry = {
  id: "01a06066-8404-74f8-810a-0930b5a79f11",
  pageTypeSlug: "module",
  slug: "slash-commander-entry",
  definition: "the global the game reads the slash command library from once the addon loads",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle the transpiler writes starts here.",
    },
    {
      invariantKind: "departure",
      statement: "Every part of the library is loaded before the chat entry is hooked.",
    },
  ],
} as const satisfies Module
