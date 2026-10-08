import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const classId = {
  id: "01a06070-82de-7689-94a1-27231e387939",
  type: "page-type/module",
  slug: "class-id",
  definition: "the name of every character class the game offers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are the class pages' slugs, as the class ids table holds them.",
    },
  ],
  createdAt: "2026-09-02T04:46:21.406Z",
  updatedAt: "2026-09-27T02:02:13.000Z",
} as const satisfies Module
