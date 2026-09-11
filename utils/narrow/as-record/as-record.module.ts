import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const asRecord = {
  id: "01a05c94-2bfb-7908-974d-2bd990ac9a56",
  pageTypeSlug: "module",
  type: "module",
  slug: "as-record",
  definition: "a value read as a record of unknown values, or nothing where it is not one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A list is no record.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing at all is no record.",
    },
    {
      invariantKind: "departure",
      statement: "A reader wanting a record either way reads an empty record here.",
    },
  ],
} as const satisfies Module
