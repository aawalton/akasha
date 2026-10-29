import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusDamage = {
  id: "01a18498-c660-7dfb-9f86-819f88c584c5",
  type: "page-type/module",
  slug: "status-damage",
  definition: "the damage a status effect deals, worked out from the equation its page states",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A status effect's damage is read by the skill-equation module, as a skill's is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The equation's terms are summed, and the sum is rounded once rather than each term.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The build's damage done for the equation's damage type, delivery and reach adds to its base.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That damage done multiplies the sum, and the damage is rounded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat is read as the calculation holds it, a fraction where it is one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build's status damage is worked out for each status effect the stat tree names.",
    },
  ],
  createdAt: "2026-10-28T22:19:27.199Z",
  updatedAt: "2026-10-29T17:55:59.411Z",
} as const satisfies Module
