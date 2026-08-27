/**
 * Temper Skill Line Categories (Generated)
 *
 * ESO skill-line category taxonomy sourced from the universal pages table
 * (page type: temper-skill-line-category).
 *
 * DO NOT EDIT — regenerate with the skill-line-categories generator.
 */

import { createDataFile } from "@shared/utils-narrow/create-data-file"
import type { SkillLineCategoryTemplate } from "../skill-line-categories"

const SKILL_LINE_CATEGORY_DATA = {
  "none": { id: "none" as const, name: "No Skill Line Category", displayOrder: 0 },
  "class": { id: "class" as const, name: "Class", displayOrder: 1 },
  "weapon": { id: "weapon" as const, name: "Weapon", displayOrder: 22 },
  "armor": { id: "armor" as const, name: "Armor", displayOrder: 28 },
  "world": { id: "world" as const, name: "World", displayOrder: 31 },
  "guild": { id: "guild" as const, name: "Guild", displayOrder: 37 },
  "alliance-war": { id: "alliance-war" as const, name: "Alliance War", displayOrder: 43 },
  "racial": { id: "racial" as const, name: "Racial", displayOrder: 46 },
  "craft": { id: "craft" as const, name: "Craft", displayOrder: 56 },
  "companion": { id: "companion" as const, name: "Companion", displayOrder: 63 },
} satisfies Record<string, SkillLineCategoryTemplate>

export const skillLineCategories = createDataFile<SkillLineCategoryTemplate>()(
  SKILL_LINE_CATEGORY_DATA
)
