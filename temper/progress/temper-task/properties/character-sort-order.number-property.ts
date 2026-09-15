import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const characterSortOrder = {
  id: "01a06959-98a7-75a1-b25b-ef19416fec86",
  type: "page-type/number-property",
  slug: "character-sort-order",
  propertySlug: "character-sort-order",
  definition: "the place the character a task falls to takes in Alan's own order",
  max: null,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "This value is read off the character the task names rather than stated on that task.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A task falling to no character has no sort order.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A formula cannot yet read a property off the page a relation reaches.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "No property gives a temper character the sort order this value reads.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
