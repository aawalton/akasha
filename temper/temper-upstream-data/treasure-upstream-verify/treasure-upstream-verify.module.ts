import type { Module } from "@akasha/code-system/module"

export const treasureUpstreamVerify = {
  id: "01a06282-dfc3-7860-9a09-26dd6febe9a4",
  pageTypeSlug: "module",
  slug: "treasure-upstream-verify",
  definition: "the ruling on whether the ported LibTreasure data still matches upstream",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pins table is ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "The book ids table is ruled on.",
    },
    {
      invariantKind: "departure",
      statement: "The icons table is ruled on.",
    },
    {
      invariantKind: "constraint",
      statement: "A table is carried out of Lua before that table is walked.",
    },
    {
      invariantKind: "departure",
      statement: "The upstream data file is loaded as a chunk.",
    },
    {
      invariantKind: "departure",
      statement: "The chunk is handed a line binding the local pins table to a reachable name.",
    },
    {
      invariantKind: "departure",
      statement: "The item ids the pins imply are counted against the upstream item table.",
    },
    {
      invariantKind: "departure",
      statement: "The textures the pins imply are counted against the upstream texture table.",
    },
    {
      invariantKind: "departure",
      statement: "A count is reported as a count rather than as a leaf comparison.",
    },
    {
      invariantKind: "departure",
      statement: "The Lua machine is closed once the ruling settles.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a ported file.",
    },
  ],
} as const satisfies Module
