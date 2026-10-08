import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterSkills = {
  id: "01a06187-b3a1-7211-9955-637919a983d5",
  type: "page-type/module",
  slug: "character-skills",
  definition: "every skill a character may slot, the scribed ones among them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The skills are the held skill catalogue's, read whenever they are asked for.",
    },
  ],
  createdAt: "2026-09-02T09:51:18.433Z",
  updatedAt: "2026-09-26T16:01:18.000Z",
} as const satisfies Module
