import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointZoneSources = {
  id: "01a06108-2ffa-7ddc-a07c-2ee34cb56f5c",
  type: "page-type/module",
  slug: "skill-point-zone-sources",
  definition: "the skyshards and the quest skill points each zone of Tamriel holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the skill-point pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A zone is named by the two-letter key the game knows that zone by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story zone holds quest skill points and lies outside contested territory.",
    },
  ],
} as const satisfies Module
