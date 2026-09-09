import type { Module } from "@akasha/code/module"

export const minedItemRows = {
  id: "01a0640f-8510-7325-9208-0be4870d37e6",
  pageTypeSlug: "module",
  slug: "mined-item-rows",
  definition: "a mined item read out of a stored row and written back into one",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the row does not have reads as empty rather than as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A set bonus that will not parse is passed over rather than raised.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no readable set bonus has no set bonus rather than an empty list.",
    },
    {
      invariantKind: "departure",
      statement: "An instant that cannot be read writes as empty rather than as the epoch.",
    },
  ],
} as const satisfies Module
