import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonDependencyCycle = {
  id: "01a06297-7f6a-7306-9a6f-acca84ccb4b8",
  pageTypeSlug: "module",
  slug: "addon-dependency-cycle",
  definition: "the cycles in what a game add-on declares it loads after",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A cycle the search reaches more than once is reported once.",
    },
    {
      invariantKind: "constraint",
      statement: "A cycle is named from its alphabetically first member.",
    },
    {
      invariantKind: "constraint",
      statement: "An edge to an add-on outside the roster is no edge.",
    },
  ],
} as const satisfies Module
