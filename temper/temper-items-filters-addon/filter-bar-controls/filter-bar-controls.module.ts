import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const filterBarControls = {
  id: "01a0614b-6736-7575-aaa0-1766a1adf1a8",
  pageTypeSlug: "module",
  slug: "filter-bar-controls",
  definition: "one drawn editor per filter editor kind, laid out left to right",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An editor builder returns the x offset the next control starts at.",
    },
    {
      invariantKind: "departure",
      statement: "An emptied editor clears its filter rather than setting an empty value.",
    },
    {
      invariantKind: "departure",
      statement: "A dropdown carries an entry meaning the filter is off.",
    },
    {
      invariantKind: "departure",
      statement:
        "An editor registers a reset with the bar context so the clear button can reach that reset.",
    },
    {
      invariantKind: "departure",
      statement:
        "A control name is built from the filter id with every non-word character replaced.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here places a row within the panel.",
    },
  ],
} as const satisfies Module
