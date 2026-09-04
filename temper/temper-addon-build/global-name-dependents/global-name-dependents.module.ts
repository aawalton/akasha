import type { Module } from "@akasha/code-system/module"

export const globalNameDependents = {
  id: "01a06038-2cc1-77dd-90fd-2e476aa73f6c",
  pageTypeSlug: "module",
  slug: "global-name-dependents",
  definition: "everything reading an addon global, and whether the global may be renamed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A global written to and never read is safe to rename.",
    },
    {
      invariantKind: "departure",
      statement: "A read is found in TypeScript by parsing rather than by matching text.",
    },
    {
      invariantKind: "departure",
      statement: "A read in XML is found by matching text.",
    },
    {
      invariantKind: "departure",
      statement: "A name handed to a control registration binds the game to that name.",
    },
    {
      invariantKind: "departure",
      statement: "A registration argument is followed back through module constants.",
    },
    {
      invariantKind: "departure",
      statement: "A constant bound to two different strings is followed nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A comment in XML holds no read.",
    },
    {
      invariantKind: "departure",
      statement: "Dependents are answered in a settled order.",
    },
  ],
} as const satisfies Module
