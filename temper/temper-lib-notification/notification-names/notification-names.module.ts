import type { Module } from "@akasha/code-system/module"

export const notificationNames = {
  id: "01a0605a-0516-74bf-b0cd-cd67f0cacaba",
  pageTypeSlug: "module",
  slug: "notification-names",
  definition: "the two global names the game reads this library from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A second load is refused on the plural name.",
    },
    {
      invariantKind: "stopgap",
      statement: "The singular name is kept for older addons asking by that name.",
    },
  ],
} as const satisfies Module
