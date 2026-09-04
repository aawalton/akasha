import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dropdown = {
  id: "01a06053-3637-7cbf-af2a-2b25ec6eea55",
  pageTypeSlug: "module",
  slug: "dropdown",
  definition: "a choice among named options, described for the add-on menu library",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dropdown given no values of its own is set by the place a choice sits at.",
    },
    {
      invariantKind: "departure",
      statement: "A dropdown given values of its own is set by the value itself.",
    },
    {
      invariantKind: "constraint",
      statement: "A value outside the list handed in is ignored.",
    },
    {
      invariantKind: "departure",
      statement: "A place outside the list reads as the empty string.",
    },
  ],
} as const satisfies Module
