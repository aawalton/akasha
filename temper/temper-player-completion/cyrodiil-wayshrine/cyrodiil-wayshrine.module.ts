import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const cyrodiilWayshrine = {
  id: "01a06108-2ff6-7cb8-bd42-e8fcd8be535a",
  pageTypeSlug: "module",
  slug: "cyrodiil-wayshrine",
  definition: "whether a point of interest is a wayshrine of Cyrodiil",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Cyrodiil's wayshrines are left out of what a character is measured on.",
    },
  ],
} as const satisfies Module
