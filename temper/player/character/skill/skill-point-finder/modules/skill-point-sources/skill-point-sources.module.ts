import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointSources = {
  id: "01a060ec-5851-77ac-a8f1-6163b058a0b4",
  type: "page-type/module",
  slug: "skill-point-sources",
  definition: "every place in The Elder Scrolls Online hands a character a skill point",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A source is named by the identifier the game knows that source by.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts the skill points a character has earned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A public dungeon is read from its page rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A zone's id and quests are read from its skill point page rather than written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A group dungeon's zone and quest are read from its dungeon page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each general source's quests or achievement are rows on its skill point page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on reads these pages as it compiles.",
    },
  ],
} as const satisfies Module
