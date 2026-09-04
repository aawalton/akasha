import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ttcListingTypes = {
  id: "01a0609b-e59e-76a0-b95d-824e1ed2c729",
  pageTypeSlug: "module",
  slug: "ttc-listing-types",
  definition: "the shape a search of Tamriel Trade Centre listings asks for and answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A search asks for one page of listings at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A field name here keeps Tamriel Trade Centre's spelling.",
    },
    {
      invariantKind: "departure",
      statement: "A listing older than the age the search names is left out.",
    },
  ],
} as const satisfies Module
