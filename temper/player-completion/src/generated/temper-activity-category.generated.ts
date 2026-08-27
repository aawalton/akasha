/**
 * Temper Activity Category (Generated)
 *
 * ESO activity-category catalog used by the completion UI's filter chips
 * and cross-domain lookup maps, sourced from the universal pages table
 * (page type: temper-activity-category).
 *
 * Each entry's `id` is the stable filter/lookup identifier
 * ("pvp" / "group-dungeons" / ...) and the same string is used as the
 * record key, so `TEMPER_ACTIVITY_CATEGORIES["group-dungeons"]` is
 * well-typed and feeds the `ActivityCategoryId` union and the
 * `activityCategories.data` lookup in @temper/player-completion.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ActivityCategoryTemplate } from "../activity-category-data"

export const TEMPER_ACTIVITY_CATEGORIES = {
  "arenas": { id: "arenas", name: "Arenas", badgeVariant: "orange" },
  "characters": { id: "characters", name: "Characters", badgeVariant: "blue" },
  "companions": { id: "companions", name: "Companions", badgeVariant: "blue" },
  "crafting": { id: "crafting", name: "Crafting", badgeVariant: "green" },
  "events": { id: "events", name: "Events", badgeVariant: "yellow" },
  "exploration": { id: "exploration", name: "Exploration", badgeVariant: "purple" },
  "group-dungeons": { id: "group-dungeons", name: "Group Dungeons", badgeVariant: "orange" },
  "housing": { id: "housing", name: "Housing", badgeVariant: "yellow" },
  "other": { id: "other", name: "Other", badgeVariant: "green" },
  "pvp": { id: "pvp", name: "PvP", badgeVariant: "red" },
  "quests": { id: "quests", name: "Quests", badgeVariant: "purple" },
  "trials": { id: "trials", name: "Trials", badgeVariant: "red" },
} as const satisfies Record<string, ActivityCategoryTemplate>
