import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const esoBaseGameStringIds = {
  id: "01a06372-72ff-7026-81c6-4b3dcc1fde65",
  pageTypeSlug: "module",
  slug: "eso-base-game-string-ids",
  definition: "every string id the base game provides, gathered from the runs holding them",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A string id absent here is a string id the base game does not provide.",
    },
    {
      invariantKind: "constraint",
      statement: "This census states the clone version the census was read from.",
    },
    {
      invariantKind: "constraint",
      statement: "This census states the command that reads the census again.",
    },
    {
      invariantKind: "departure",
      statement: "The runs holding the ids are divided only to keep each file under the ceiling.",
    },
  ],
} as const satisfies Module
