import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lostTreasureMining = {
  id: "01a06141-8008-74f7-85b8-26c2c27317b9",
  pageTypeSlug: "module",
  slug: "lost-treasure-mining",
  definition: "gathering dig sites the add-on does not know yet",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "How long gathering runs is measured by the game's clock rather than by a Date.",
    },
  ],
} as const satisfies Module
