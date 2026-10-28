import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const houseNamesReading = {
  id: "01a18411-9106-76cc-8e4b-f348da579aa8",
  type: "page-type/module",
  slug: "house-names-reading",
  definition: "the name of each home the housing catalogue holds, by the home's collectible id",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A home's name is the catalogue's name for its collectible.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalogue row that will not read names no home rather than refusing.",
    },
  ],
  createdAt: "2026-10-28T19:51:46.182Z",
  updatedAt: "2026-10-28T19:51:46.182Z",
} as const satisfies Module
