import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointPublicDungeons = {
  id: "01a06108-2ff9-767b-92d7-7dbd5671e738",
  type: "page-type/module",
  slug: "skill-point-public-dungeons",
  definition: "the skill point each public dungeon hands a character for its group event",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A public dungeon's label is the title of its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The public dungeons are in the order their pages give, as the sources are.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.657Z",
  updatedAt: "2026-09-25T12:58:26.000Z",
} as const satisfies Module
