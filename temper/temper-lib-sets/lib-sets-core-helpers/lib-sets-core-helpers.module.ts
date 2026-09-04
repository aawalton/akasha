import type { Module } from "@akasha/code-system/module"

export const libSetsCoreHelpers = {
  id: "01a061fc-cee9-7baa-81aa-c052ca2349fa",
  pageTypeSlug: "module",
  slug: "lib-sets-core-helpers",
  definition:
    "the small conversions shared across this library, from language choice to guarded chat input",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A table handed back to a caller is a shallow copy rather than the library's own table.",
    },
  ],
} as const satisfies Module
