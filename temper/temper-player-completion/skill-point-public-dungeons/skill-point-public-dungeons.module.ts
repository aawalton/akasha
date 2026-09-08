import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointPublicDungeons = {
  id: "01a06108-2ff9-767b-92d7-7dbd5671e738",
  pageTypeSlug: "module",
  slug: "skill-point-public-dungeons",
  definition: "the one skill point each public dungeon hands a character for its group event",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No page holds a public dungeon.",
    },
    {
      invariantKind: "departure",
      statement: "A key here the skill point sources do not name is refused by the compiler.",
    },
    {
      invariantKind: "departure",
      statement: "A public dungeon the sources gain is refused here until it is given a label.",
    },
    {
      invariantKind: "departure",
      statement: "`EveryPublicDungeonIsLabelled` carries that second refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "Its default type argument is judged where it is declared rather than where it is read.",
    },
    {
      invariantKind: "constraint",
      statement: "Deleting that type takes the refusal away and nothing else fails.",
    },
    {
      invariantKind: "gap",
      statement:
        "The order these entries are written in is taken from the sources rather than by hand.",
    },
  ],
} as const satisfies Module
