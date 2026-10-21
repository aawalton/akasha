import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tooltipCase = {
  id: "01a15c22-e9f5-764d-965a-2b61686e7be6",
  type: "page-type/module",
  slug: "tooltip-case",
  definition: "a tooltip case's pinned numbers held against what the tooltip formulas give",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  testReads: [
    "page-type/temper-tooltip-case",
    "page-type/temper-skill",
    "page-type/temper-scribed-skill",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A skill's tooltip formulas are the equations its skill page keeps, by ability id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case's numbers are worked out from the stats and tooltip text it kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number is named by its skill's ability id and its placeholder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the numbers of a skill whose tooltip pairs with its equations are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Pinning a reading pins each number Temper gives exactly and keeps the rest as gaps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned number Temper no longer gives has drifted, and fails the test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A known gap Temper now gives is closed, and is named for pinning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is judged against the tooltip formulas in the test fixtures alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is written with its stats, pins and gaps in name order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the passives its build held, in name order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the champion stars its build had slotted, in name order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the count of medium armor pieces its build wore.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the types of the weapons its build held on its bar, in name order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps each skill's duration as the game gave it, in milliseconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case keeps the names of the buffs active when it was read, once each in name order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the stacks of each buff active with stacks, by the buff's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case keeps the points its character had in War Mage and in Mighty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case's formulas read its passives, its slotted stars and its weapons as one set held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case's formulas read its buffs, stacks, points and medium pieces as what was active.",
    },
  ],
  createdAt: "2026-10-21T01:45:54.419Z",
  updatedAt: "2026-10-21T04:58:01.221Z",
} as const satisfies Module
