import type { Module } from "@akasha/code-system/module"

export const minedRestorePotions = {
  id: "01a06369-1e85-7a7e-8572-17d2ceab1b11",
  pageTypeSlug: "module",
  slug: "mined-restore-potions",
  definition: "the potions restoring a resource at once, among the item sweep's rows",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The sweep's rows are an entry property of one mine page rather than a page type.",
    },
    {
      invariantKind: "absence",
      statement: "No page type carries the sweep's rows.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read from the files beside whichever page carries the rows.",
    },
    {
      invariantKind: "departure",
      statement: "The akasha page is looked beside before the markdown page is.",
    },
    {
      invariantKind: "departure",
      statement: "`partAt` answers for a `.ts` page alone.",
    },
    {
      invariantKind: "departure",
      statement: "A numbered part is read while the part before that part is there.",
    },
    {
      invariantKind: "departure",
      statement: "A line naming no restore is sieved out before the line is parsed.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose item id is no finite number is no restore potion.",
    },
    {
      invariantKind: "departure",
      statement: "A row restoring over time rather than at once is no restore potion.",
    },
    {
      invariantKind: "departure",
      statement: "No page carrying the rows is refused rather than answered as no potions.",
    },
  ],
} as const satisfies Module
