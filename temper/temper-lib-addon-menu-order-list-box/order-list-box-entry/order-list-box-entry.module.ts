import type { Module } from "@akasha/code-system/module"

export const orderListBoxEntry = {
  id: "01a06207-bdf3-79e2-9e63-14aa5448d6e1",
  pageTypeSlug: "module",
  slug: "order-list-box-entry",
  definition: "the module a bundle of this addon is gathered from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A module no import chain from here reaches is left out of the bundle.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is declared here.",
    },
  ],
} as const satisfies Module
