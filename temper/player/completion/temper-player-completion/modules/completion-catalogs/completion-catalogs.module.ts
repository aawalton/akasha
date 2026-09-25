import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCatalogs = {
  id: "01a0d970-252a-712c-b4a5-be5a1b09b1b3",
  type: "page-type/module",
  slug: "completion-catalogs",
  definition:
    "the catalogs a completion count is read against, shaped from the rows the store answers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Whoever asks the store for a catalog's rows hands them in here.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The store answers a page's declared keys under both spellings.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The store stamps an entry with an id the catalog types do not name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narrowing a row to the keys named makes the assertion true.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Narrowing a row keeps the row small.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a catalog row names is read back as a bare name.",
    },
  ],
} as const satisfies Module
