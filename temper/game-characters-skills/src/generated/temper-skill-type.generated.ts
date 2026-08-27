/**
 * Temper Skill Types (Generated)
 *
 * Three skill ability types in ESO — active, ultimate, passive — sourced
 * from the universal pages table (page type: temper-skill-type).
 *
 * Each entry's `id` is the stable codec-facing identifier ("active" /
 * "ultimate" / "passive") and the same string is used as the record key,
 * so `TEMPER_SKILL_TYPES["active"]` is well-typed and feeds the
 * `SkillTypeId` union exported by @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SkillTypeTemplate } from "../skill-types-data"

export const TEMPER_SKILL_TYPES = {
  "active": { id: "active", name: "Active", description: "Regular ability with cooldown or resource cost" },
  "ultimate": { id: "ultimate", name: "Ultimate", description: "High-cost ability that requires Ultimate resource" },
  "passive": { id: "passive", name: "Passive", description: "Passive ability that provides permanent bonuses" },
} as const satisfies Record<string, SkillTypeTemplate>
