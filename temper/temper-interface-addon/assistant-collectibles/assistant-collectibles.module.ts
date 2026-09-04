import type { Module } from "@akasha/code-system/module"

export const assistantCollectibles = {
  id: "01a060e7-1beb-7c7c-8f92-e0f5d84c2110",
  pageTypeSlug: "module",
  slug: "assistant-collectibles",
  definition: "the collectible ids of every personal assistant the player may summon",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "An assistant collectible id is the game's own.",
    },
    {
      invariantKind: "departure",
      statement: "Each id is copied rather than worked out.",
    },
  ],
} as const satisfies Module
