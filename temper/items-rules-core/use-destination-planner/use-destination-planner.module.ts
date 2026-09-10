import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const useDestinationPlanner = {
  id: "01a060d9-44ce-70aa-bd37-68ba4f1e19d1",
  pageTypeSlug: "module",
  slug: "use-destination-planner",
  definition: "a whole batch of items worth learning shared out over the characters at once",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each item is settled in turn against the claims the earlier items made.",
    },
    {
      invariantKind: "departure",
      statement: "An item every character already knows is answered as an empty destination.",
    },
  ],
} as const satisfies Module
