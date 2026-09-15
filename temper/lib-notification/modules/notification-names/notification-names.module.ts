import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const notificationNames = {
  id: "01a0605a-0516-74bf-b0cd-cd67f0cacaba",
  type: "module",
  slug: "notification-names",
  definition: "the two global names the game reads this library from",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A second load is refused on the plural name.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The singular name is kept for older addons asking by that name.",
    },
  ],
} as const satisfies Module
