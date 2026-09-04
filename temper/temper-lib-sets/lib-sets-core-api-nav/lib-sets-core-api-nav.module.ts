import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiNav = {
  id: "01a061fc-ceed-790c-89ab-adf54c99f601",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-nav",
  definition: "the world map opened on a zone or panned to a wayshrine",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The item link builder every other module calls is published from this module.",
    },
  ],
} as const satisfies Module
