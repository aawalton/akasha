import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useCompanionSetTarget = {
  id: "01a0642f-8c3c-7327-a586-7f38b3e81460",
  type: "page-type/module",
  slug: "use-companion-set-target",
  definition: "how a companion's target is set",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The companions offered are worked out again whenever the companion catalogue is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
