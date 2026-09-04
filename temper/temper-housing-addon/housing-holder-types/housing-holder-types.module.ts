import type { Module } from "@akasha/code-system/module"

export const housingHolderTypes = {
  id: "01a06113-b7ce-7f67-beb7-a7a3ee79e25d",
  pageTypeSlug: "module",
  slug: "housing-holder-types",
  definition: "the shape of the one holder every housing module hangs a function on",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "stopgap",
      statement: "One holder typed in one place is how the ported add-on was written.",
    },
  ],
} as const satisfies Module
