import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const reloadUi = {
  id: "01a090b2-4c81-73e4-85d7-24204ef52dcd",
  type: "module",
  slug: "reload-ui",
  definition: "the game asked to load its interface again with the player left where they are",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The interface is loaded again with the player still in the world.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is handed back, because the interface goes before the next line runs.",
    },
  ],
} as const satisfies Module
