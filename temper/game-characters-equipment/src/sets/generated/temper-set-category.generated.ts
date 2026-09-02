/**
 * Temper Set Categories (Generated)
 *
 * ESO equipment set categories / sources (Trial, Dungeon, Arena, ...)
 * sourced from the universal pages table (page type: temper-set-category).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SetCategoryTemplate } from "../set-categories-data"

/**
 * Keyed record. `SetCategoryId` is declared in
 * `@akasha/temper-equipment/set-category-ids`, and `setCategories` is
 * annotated against that union, so a key here the union does not name
 * is a type error rather than a silent widening.
 */
export const TEMPER_SET_CATEGORIES_BY_ID = {
  "none": { id: "none" as const, name: "No Set Category", displayOrder: 0 },
  "trial": { id: "trial" as const, name: "Trial", displayOrder: 1 },
  "dungeon": { id: "dungeon" as const, name: "Dungeon", displayOrder: 2 },
  "arena": { id: "arena" as const, name: "Arena", displayOrder: 3 },
  "overland": { id: "overland" as const, name: "Overland", displayOrder: 4 },
  "crafted": { id: "crafted" as const, name: "Crafted", displayOrder: 5 },
  "monster": { id: "monster" as const, name: "Monster", displayOrder: 6 },
  "mythic": { id: "mythic" as const, name: "Mythic", displayOrder: 7 },
  "pvp": { id: "pvp" as const, name: "PVP", displayOrder: 8 },
  "class": { id: "class" as const, name: "Class", displayOrder: 9 },
  "other": { id: "other" as const, name: "Other", displayOrder: 10 },
  "no-type": { id: "no-type" as const, name: "Unknown", displayOrder: 11 },
} as const satisfies Record<string, SetCategoryTemplate>
