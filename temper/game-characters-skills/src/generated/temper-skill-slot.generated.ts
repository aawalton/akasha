/**
 * Temper Skill Slots (Generated)
 *
 * Six skill slots per skill bar (5 active + 1 ultimate), sourced from
 * the universal pages table (page type: temper-skill-slot).
 *
 * Each entry's `id` is the stable codec-facing identifier
 * ("active-1"..."active-5" / "ultimate") and the same string is used as
 * the record key, so `TEMPER_SKILL_SLOTS["ultimate"]` is well-typed and
 * feeds the `SkillSlotId` union and the `skillSlots.data` lookup in
 * @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SkillSlotTemplate } from "../skill-slots-data"

export const TEMPER_SKILL_SLOTS = {
  "active-1": { id: "active-1", name: "Active 1" },
  "active-2": { id: "active-2", name: "Active 2" },
  "active-3": { id: "active-3", name: "Active 3" },
  "active-4": { id: "active-4", name: "Active 4" },
  "active-5": { id: "active-5", name: "Active 5" },
  "ultimate": { id: "ultimate", name: "Ultimate" },
} as const satisfies Record<string, SkillSlotTemplate>
