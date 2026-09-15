import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const escapeRegExp = {
  id: "01a08ddd-31b1-78ff-9e8a-a1d35a2b4530",
  type: "page-type/module",
  slug: "escape-reg-exp",
  definition: "a literal escaped so a regular expression matches that literal and nothing else",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every character a pattern would act on is escaped rather than only some.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds a pattern.",
    },
  ],
} as const satisfies Module
