import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const weaponTypesData = {
  id: "01a0616f-8e15-7014-9996-52aebc4519b8",
  type: "page-type/module",
  slug: "weapon-types-data",
  definition:
    "every weapon a character wields, with the power each carries and the hands each takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The weapon types are read from the weapon type pages in hash-place order.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A weapon's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon with no item level is worth what it is worth at CP160.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Legendary power runs straight from 217 at worth level 0 to 1335 at the top, for every type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A two-handed melee weapon has 1.177 times that power, before it is rounded down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A normal weapon has that power times the normal share, rounded down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A weapon above normal and below legendary is a normal one higher by armor's steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon scales as two-handed melee when its skill line is the two-handed line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon page naming no skill line is one-handed, its line set by the off hand.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.957Z",
  updatedAt: "2026-10-20T19:44:32.491Z",
} as const satisfies Module
