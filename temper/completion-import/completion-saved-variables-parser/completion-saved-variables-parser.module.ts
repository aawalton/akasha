import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionSavedVariablesParser = {
  id: "01a060d7-c8cf-7aa1-a0b6-af0a0addf2ef",
  pageTypeSlug: "module",
  slug: "completion-saved-variables-parser",
  definition: "the addon's saved variables file turned into records of what is complete",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The saved table is read as `TemperCharacters_SavedVariables` or as `Temper_SavedVariables`.",
    },
    {
      invariantKind: "departure",
      statement: "Which companion a definition id names is asked of the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A companion the caller cannot name is counted as skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A character that will not read is counted as skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A lua key written as a number is kept as text.",
    },
    {
      invariantKind: "departure",
      statement: "Diagnostics come back alongside the records rather than reaching a log.",
    },
  ],
} as const satisfies Module
