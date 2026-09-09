import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lostTreasureGlobal = {
  id: "01a06141-8005-7878-9128-a7d186911cfd",
  pageTypeSlug: "module",
  slug: "lost-treasure-global",
  definition: "the three calls this add-on's own markup makes back into it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This global is the add-on's own name rather than a name the game owns.",
    },
  ],
} as const satisfies Module
