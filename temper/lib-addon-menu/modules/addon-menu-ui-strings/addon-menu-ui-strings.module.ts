import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuUiStrings = {
  id: "01a06100-0000-7000-8000-000000000011",
  type: "page-type/module",
  slug: "addon-menu-ui-strings",
  definition: "the English display strings of the library, written out as one table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No translation table exists for any other language.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The author label is composed from a game string rather than written out.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Each string is a plain field on one exported table.",
    },
  ],
} as const satisfies Module
