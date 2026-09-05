import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CharacterSortOrder = number

export const characterSortOrder = {
  id: "01a06959-98a7-75a1-b25b-ef19416fec86",
  pageTypeSlug: "number-property",
  slug: "character-sort-order",
  propertySlug: "character-sort-order",
  definition: "the place the character a task falls to takes in Alan's own order",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This value is read off the character the task names rather than stated on it.",
    },
    {
      invariantKind: "departure",
      statement: "A task falling to no character has none.",
    },
    {
      invariantKind: "gap",
      statement: "A formula cannot yet read a property off the page a relation reaches.",
    },
    {
      invariantKind: "gap",
      statement: "No property gives a temper character the sort order this value reads.",
    },
  ],
} as const satisfies NumberProperty
