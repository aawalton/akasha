import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageTypeProps = {
  id: "01a05c6a-2bb4-735e-bfca-90ad75728a5e",
  pageTypeSlug: "module",
  slug: "page-type-props",
  definition: "the shape one property of a page type is declared in for the store",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property naming another page states what the property targets and what comes back.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here declares a property.",
    },
  ],
} as const satisfies Module
