import type { PageType } from "@akasha/pages/page-type"

export const temperRecipeList = {
  id: "01a0626e-c112-7de5-8901-fc3087a26629",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-recipe-list",
  definition: "one list the game groups craftable recipes under",
  pluralSlug: "temper-recipe-lists",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/recipe-item-id",
    "page-property-entry/recipes",
    "text-property/recipe-name",
  ],
  properties: [
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "page-property-entry/recipes", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A list is keyed by the name the game shows rather than by the index the game keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A name more than one list carries is made a slug by adding the game's index.",
    },
  ],
  types: "ts",
} as const satisfies PageType
