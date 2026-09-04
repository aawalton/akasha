import type { Module } from "@akasha/code-system/module"

export const housingMyHouses = {
  id: "01a06128-d5d0-7837-b130-e565c12035cb",
  pageTypeSlug: "module",
  slug: "housing-my-houses",
  definition: "drawing a row for each house this account has bought",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A bought house may be ported to inside or at the front door.",
    },
  ],
} as const satisfies Module
