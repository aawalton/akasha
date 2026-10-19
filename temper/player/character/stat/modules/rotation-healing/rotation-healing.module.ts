import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rotationHealing = {
  id: "01a13c1f-1abb-7f13-9091-5df53ed127a3",
  type: "page-type/module",
  slug: "rotation-healing",
  definition: "the healing per second a character gives itself over a fight cast by a neutral rule",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each global cooldown casts the first skill in bar order whose effect has run out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill whose effect has no duration has always run out, so it can always be cast.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill whose effect has no duration comes after every skill whose effect has one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where no skill can be cast, the global cooldown goes to a full heavy attack that heals none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heavy attack takes one global cooldown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A light or heavy attack lands in the tick its global cooldown starts in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The front bar's skills come before the back bar's, and swapping bars costs nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fight starts with no Ultimate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A light attack is woven into each global cooldown a skill or the ultimate is cast in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Ultimate builds 3 a second from the start, whichever attack fills the global cooldown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill giving Heroism adds the Ultimate its tooltip says while the Heroism lasts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ultimate stops building at 500.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The ultimate is cast in the first global cooldown it is affordable, before any skill.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ultimate cast heals its cost times the healing each point spent gives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shield counts as healing its whole strength, as if it were all absorbed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's effect runs for the longer of the game's duration and its tooltip's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick counts only where it falls inside the fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cast's direct damage is its hit and each wave that falls inside the fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each heal and hit is kept in the one-second tick it falls in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A shield is kept in every tick until the seconds its tooltip states run out, and at least one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tick falling at the fight's last instant is kept in the last tick.",
    },
  ],
  createdAt: "2026-10-14T20:33:53.850Z",
  updatedAt: "2026-10-19T18:47:33.952Z",
} as const satisfies Module
