import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extractPureClassPassives = {
  id: "01a15e8d-bff9-713b-bfd3-4f051f4641be",
  type: "page-type/module",
  slug: "extract-pure-class-passives",
  definition:
    "the passives a character holding every skill line of its own class gets, as effect sources",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character holding every skill line of its own class holds that class's pure-class passives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pure-class passive needs no skill point and no passive bought in any line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Above and Beyond raises a pure Nightblade's Critical Damage and Critical Healing by 25%.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A class whose pure-class passives no reading has measured is granted none.",
    },
  ],
  createdAt: "2026-10-21T13:01:50.457Z",
  updatedAt: "2026-10-21T13:01:50.457Z",
} as const satisfies Module
