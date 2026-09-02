/**
 * Temper Companion Skill Slots (Generated)
 *
 * The 6 companion skill-bar slots -- active-1 .. active-5 plus the
 * single ultimate -- sourced from the universal pages table (page type:
 * temper-companion-skill-slot). Companions have one skill bar with 5
 * active skills and 1 ultimate; no bar swap.
 *
 * Each entry's `id` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * `TEMPER_COMPANION_SKILL_SLOTS["active-1"]` is well-typed and feeds
 * the `companionSkillSlots` lookup in @temper/game-companions-core.
 *
 * DO NOT EDIT -- regenerate with: ops temper addon-data generate
 */

import type { CompanionSkillSlotTemplate } from "@akasha/temper-companions-core/companion-skill-slots"

export const TEMPER_COMPANION_SKILL_SLOTS = {
  "active-1": { id: "active-1", name: "Active 1" },
  "active-2": { id: "active-2", name: "Active 2" },
  "active-3": { id: "active-3", name: "Active 3" },
  "active-4": { id: "active-4", name: "Active 4" },
  "active-5": { id: "active-5", name: "Active 5" },
  "ultimate": { id: "ultimate", name: "Ultimate" },
} as const satisfies Record<string, CompanionSkillSlotTemplate>
