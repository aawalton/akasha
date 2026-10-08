import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderStrings = {
  id: "01a060ec-584a-7f5b-b12f-d6e8a9b8eb2b",
  type: "page-type/module",
  slug: "skill-point-finder-strings",
  definition: "the wording the skill point window shows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A string is registered under an identifier the markup names.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.970Z",
  updatedAt: "2026-09-21T15:46:08.000Z",
} as const satisfies Module
