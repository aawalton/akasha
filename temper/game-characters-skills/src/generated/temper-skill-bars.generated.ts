/**
 * Temper Skill Bars (Generated)
 *
 * Two skill bars (primary and backup) available to players, sourced
 * from the universal pages table (page type: temper-skill-bar).
 *
 * Each entry's `id` is the stable codec-facing identifier
 * ("primary-skill-bar" / "backup-skill-bar") and the same string is
 * used as the record key, so `TEMPER_SKILL_BARS["primary-skill-bar"]`
 * is well-typed and feeds the `SkillBarId` union and the
 * `skillBars.data` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SkillBarTemplate } from "../skill-bars-data"

export const TEMPER_SKILL_BARS = {
  "primary-skill-bar": { id: "primary-skill-bar", name: "Primary Bar" },
  "backup-skill-bar": { id: "backup-skill-bar", name: "Backup Bar" },
} as const satisfies Record<string, SkillBarTemplate>
