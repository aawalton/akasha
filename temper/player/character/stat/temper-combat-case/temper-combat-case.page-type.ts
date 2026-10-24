import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperCombatCase = {
  id: "01a15f6b-eb31-7dc8-a07b-3684b7c044cc",
  type: "page-type/page-type",
  slug: "temper-combat-case",
  definition:
    "the hits a build landed in fights, as the game logged them, held for the combat formulas to match",
  extends: ["page-type/temper-thing"],
  parts: ["file-property/verified-hits", "file-property/pinned-reading"],
  properties: [
    { pageProperty: "file-property/verified-hits", required: true, many: false },
    { pageProperty: "file-property/pinned-reading", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is the hits of one character's fights under one build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hit is named by its fight, its moment in that fight, its ability and its target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hit's number is what the game logged it dealing, with its overflow added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case is read from a build whose every reading agrees on the tooltip its formula takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned hit is one a combat formula matched when the case was pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case holds its own copy of the reading it was pinned from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A case's readings agreeing is how many readings of its build agreed at its pinning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hit no combat formula matched is kept as unexplained rather than pinned.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "Every pinned hit of every case is the number its combat formula gives.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-21T17:04:30.512Z",
  updatedAt: "2026-10-24T21:37:40.723Z",
} as const satisfies PageType
