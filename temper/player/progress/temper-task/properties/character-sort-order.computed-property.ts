import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const characterSortOrder = {
  id: "01a06959-98a7-75a1-b25b-ef19416fec86",
  type: "page-type/computed-property",
  slug: "character-sort-order",
  propertySlug: "character-sort-order",
  definition: "the place the character a task falls to takes in Alan's own order",
  holds: "number",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "This value is read off the character the task names rather than stated on that task.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The character read is the one the task names as effective.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task falling to no character has no sort order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The order read is the character's display order, which Alan sets by hand rather than the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import takes the addon's order only for a character stating no display order.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
