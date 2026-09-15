import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const assistantCollectibles = {
  id: "01a060e7-1beb-7c7c-8f92-e0f5d84c2110",
  type: "module",
  slug: "assistant-collectibles",
  definition: "the collectible ids of every personal assistant the player may summon",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "An assistant collectible id is the game's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each id is copied rather than worked out.",
    },
  ],
} as const satisfies Module
