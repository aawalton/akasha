import type { PageType } from "@akasha/pages/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { Achievements } from "./properties/achievements.page-property-entry.ts"

export type TemperAchievementCategory = TemperPursuitThing & {
  achievements?: Achievements
}

export const temperAchievementCategory = {
  id: "01a06168-7245-7000-bc3b-b40339a88d31",
  pageTypeSlug: "page-type",
  slug: "temper-achievement-category",
  definition: "one heading the game files a player's achievements under",
  pluralSlug: "temper-achievement-categories",
  extends: ["page-type/temper-pursuit-thing"],
  parts: [
    "number-property/achievement-points",
    "number-property/eso-achievement-id",
    "number-property/total-steps",
    "page-property-entry/achievements",
  ],
  properties: [
    { pageProperty: "text-property/category", required: true, many: false },
    { pageProperty: "number-property/display-order", required: true, many: false },
    { pageProperty: "page-property-entry/achievements", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A heading stating a parent is a subcategory of the heading the parent names.",
    },
    {
      invariantKind: "departure",
      statement: "A heading has the achievements the game files directly under that heading.",
    },
    {
      invariantKind: "departure",
      statement: "The category tells apart the account tally from the character tally.",
    },
  ],
} as const satisfies PageType
