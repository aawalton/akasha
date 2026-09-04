import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Recipes = "jsonl"

export const recipes = {
  id: "01a0626e-c112-752c-87ea-5aac4c49e0ee",
  pageTypeSlug: "page-property-entry",
  slug: "recipes",
  propertySlug: "recipes",
  definition: "the recipes a list covers, one recipe to a line",
  properties: [
    { pagePropertySlug: "recipe-item-id", required: true, many: false },
    { pagePropertySlug: "recipe-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A recipe here is one a player learns from an item the game names.",
    },
    {
      invariantKind: "departure",
      statement: "The recipes of one list are kept in the order the game hands the recipes over.",
    },
  ],
} as const satisfies PagePropertyEntry
