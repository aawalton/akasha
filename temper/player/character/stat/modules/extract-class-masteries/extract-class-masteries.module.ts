import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const extractClassMasteries = {
  id: "01a15ec5-b320-7f68-9184-0ea5bdb94a5f",
  type: "page-type/module",
  slug: "extract-class-masteries",
  definition: "the class masteries a build chooses, as effect sources",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class mastery's effects are the effects its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chosen class mastery whose page states no effect gives no effect source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class mastery counts whatever skill lines the build holds.",
    },
  ],
  createdAt: "2026-10-21T14:02:57.183Z",
  updatedAt: "2026-10-21T14:02:57.183Z",
} as const satisfies Module
