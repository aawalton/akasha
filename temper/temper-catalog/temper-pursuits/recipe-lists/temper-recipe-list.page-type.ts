import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { Recipes } from "./properties/recipes.page-property-entry.ts"

export type TemperRecipeList = TemperPursuitThing & {
  recipes: Recipes
}

export const temperRecipeList = {
  id: "01a0626e-c112-7de5-8901-fc3087a26629",
  pageTypeSlug: "page-type",
  slug: "temper-recipe-list",
  definition: "one list the game groups craftable recipes under",
  pluralSlug: "temper-recipe-lists",
  extendsSlug: ["page-type/temper-pursuit-thing"],
  partSlugs: [
    "number-property/recipe-item-id",
    "page-property-entry/recipes",
    "text-property/recipe-name",
  ],
  properties: [
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "page-property-entry/recipes", required: true, many: false },
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
} as const satisfies PageType
