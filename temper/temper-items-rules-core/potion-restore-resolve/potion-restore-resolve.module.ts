import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const potionRestoreResolve = {
  id: "01a060d9-44cb-7685-bea5-8baa5a8a8943",
  pageTypeSlug: "module",
  slug: "potion-restore-resolve",
  definition: "which resources a potion restores, read off the item id or off the crafted effects",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A potion carrying crafted effects is known by those effects rather than by id.",
    },
    {
      invariantKind: "departure",
      statement: "A potion the game hands out is known by item id.",
    },
    {
      invariantKind: "departure",
      statement:
        "This code is written out from the alchemy and mined-item pages rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "The game addon and the web matcher read one table.",
    },
    {
      invariantKind: "absence",
      statement: "No bitwise arithmetic runs here.",
    },
  ],
} as const satisfies Module
