import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPower = {
  id: "01a15f3c-8d87-7ff5-8f76-294a93a4d49c",
  type: "page-type/module",
  slug: "skill-power",
  definition: "the power a skill's damage reads, grown by what the build holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Damage reads a power that War Mage, Mighty and Wrathful Strikes add to before buffs grow it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "War Mage at 30 points adds 100 power to magical damage, and Mighty at 30 to martial damage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Wrathful Strikes slotted adds 205 power to damage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Major Brutality grows power 20%, Minor Brutality 10%, and Agility 2% a medium piece worn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The power grown that way is a whole number, as the stat sheet's power is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Slayer grows the power of every damage 3% a Fighters Guild skill on the bar, as Quick Cloak showed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Slayer's share is 1% a skill at rank 1, 2% at rank 2 and 3% at rank 3.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "Only 0 and 30 points of War Mage and Mighty have been read, so fewer than 30 add nothing.",
    },
  ],
  createdAt: "2026-10-21T16:12:46.342Z",
  updatedAt: "2026-10-21T16:12:46.342Z",
} as const satisfies Module
