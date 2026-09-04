import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonRegistry = {
  id: "01a06031-70e5-7414-8a53-3e7ea7823cbd",
  pageTypeSlug: "module",
  slug: "dungeon-registry",
  definition: "what is known of one group dungeon, and the label a key reads as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key no dungeon answers to reads back as itself.",
    },
  ],
} as const satisfies Module
