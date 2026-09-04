import type { Module } from "@akasha/code-system/module"

export const libSetsCoreItemidDecompress = {
  id: "01a061fc-ceea-731b-8df7-55b760383102",
  pageTypeSlug: "module",
  slug: "lib-sets-core-itemid-decompress",
  definition: "the item ids of a set expanded from the compressed form they are stored in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A compressed entry is either a plain item id or a string of a first id and an offset.",
    },
    {
      invariantKind: "constraint",
      statement: "A set's expanded item ids are cached when first asked for.",
    },
  ],
} as const satisfies Module
