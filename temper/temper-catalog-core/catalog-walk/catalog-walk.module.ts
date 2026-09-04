import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const catalogWalk = {
  id: "01a06071-0c78-7ebb-b9aa-00dcb686b129",
  pageTypeSlug: "module",
  slug: "catalog-walk",
  definition:
    "collecting each catalog domain in turn, giving up on one that hangs, and saying what was missed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collector unfinished within its timeout is given up on.",
    },
    {
      invariantKind: "departure",
      statement: "A collector reporting completion having written nothing counts as a skip.",
    },
    {
      invariantKind: "departure",
      statement: "The walk is complete where nothing was skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A delay separates one domain's collection from the next.",
    },
  ],
} as const satisfies Module
