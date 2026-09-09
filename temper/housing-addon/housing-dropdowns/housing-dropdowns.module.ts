import type { Module } from "@akasha/code/module"

export const housingDropdowns = {
  id: "01a06128-d5cb-78a7-84f1-5c476624efdc",
  pageTypeSlug: "module",
  slug: "housing-dropdowns",
  definition: "the drop-downs choosing a library filter, a library sort and a house sort",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The drop-down choices a player last made are kept in saved variables.",
    },
  ],
} as const satisfies Module
