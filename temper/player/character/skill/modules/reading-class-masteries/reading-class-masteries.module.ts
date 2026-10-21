import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readingClassMasteries = {
  id: "01a15ec0-6b3e-7dbf-a402-a757764e144e",
  type: "page-type/module",
  slug: "reading-class-masteries",
  definition: "the class masteries a reading's class passives name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class passive names the class mastery whose page states its ability.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Class passives keyed by place and class passives in a list are read alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The masteries are named in the hash place order of their pages.",
    },
  ],
  createdAt: "2026-10-21T13:57:11.102Z",
  updatedAt: "2026-10-21T13:57:11.102Z",
} as const satisfies Module
