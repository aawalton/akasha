import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatCase = {
  id: "01a15f6d-8dd5-7d8a-b7d5-94c75ecffd0b",
  type: "page-type/module",
  slug: "combat-case",
  definition: "a combat case's pinned hits held against what the combat formulas give",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  testReads: [
    "page-type/temper-combat-case",
    "page-type/temper-set",
    "page-type/temper-debuff-other",
    "page-type/temper-metric",
    "page-type/temper-metric-tree",
    "page-type/temper-account-character",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A hit is worked out from its case's tooltip, its case's build and its debuffs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case's direct damage done to monsters is what the stat pages give its build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hit's debuffs are named by the keys of the debuff pages stating them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned hit Temper no longer gives has drifted, and fails the test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unexplained hit Temper now gives is closed, and is named for pinning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is written as its file holds it, two spaces to a level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case fails where its pinned reading names a glyph other than the case's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case fails where its pinned reading is not the reading of its build it names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A case is judged against no reading in its character's readings.",
    },
  ],
  createdAt: "2026-10-21T17:06:17.684Z",
  updatedAt: "2026-10-24T21:37:40.723Z",
} as const satisfies Module
