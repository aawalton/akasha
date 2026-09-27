import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentMappings = {
  id: "01a060af-2560-781d-b1ae-002d5f3fc42b",
  type: "page-type/module",
  slug: "equipment-mappings",
  definition: "the small index each armour trait, weapon trait and quality is packed as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A game constant the tables do not name is packed as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index here is part of the wire format and never renumbered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality's index is the hash place its page states, compiled in from the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion trait, armor weight or weapon type's index is its page's hash place, compiled in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game constant each index answers to is the one its page states.",
    },
  ],
} as const satisfies Module
