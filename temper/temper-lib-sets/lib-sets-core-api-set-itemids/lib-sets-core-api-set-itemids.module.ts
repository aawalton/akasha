import type { Module } from "@akasha/code-system/module"

export const libSetsCoreApiSetItemids = {
  id: "01a06231-8f1d-7c99-9721-18a5a7b3181e",
  pageTypeSlug: "module",
  slug: "lib-sets-core-api-set-itemids",
  definition: "the item ids of a set, narrowed by equip, trait, armor, weapon or enchant type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "GetSetFirstItemId is the same function as GetSetItemId under another published key.",
    },
  ],
} as const satisfies Module
