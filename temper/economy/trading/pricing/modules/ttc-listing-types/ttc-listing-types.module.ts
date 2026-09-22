import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ttcListingTypes = {
  id: "01a0609b-e59e-76a0-b95d-824e1ed2c729",
  type: "page-type/module",
  slug: "ttc-listing-types",
  definition: "the shape of a search of Tamriel Trade Centre listings and of its answer",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A search asks for one page of listings at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field name here keeps Tamriel Trade Centre's spelling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing older than the age the search names is left out.",
    },
  ],
} as const satisfies Module
