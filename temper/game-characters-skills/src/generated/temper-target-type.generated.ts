/**
 * Temper Target Types (Generated)
 *
 * Seven target-type kinds — self, enemy, ally, self-and-ally,
 * self-or-ally, lowest-health-ally, ground — sourced from the universal
 * pages table (page type: temper-target-type).
 *
 * Each entry's `id` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * `TEMPER_TARGET_TYPES["self"]` is well-typed and feeds the
 * `targetTypes` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { TargetTypeTemplate } from "../target-type-data"

export const TEMPER_TARGET_TYPES = {
  "self": { id: "self", name: "Self" },
  "enemy": { id: "enemy", name: "Enemy" },
  "ally": { id: "ally", name: "Ally" },
  "self-and-ally": { id: "self-and-ally", name: "Self + Ally" },
  "self-or-ally": { id: "self-or-ally", name: "Self / Ally" },
  "lowest-health-ally": { id: "lowest-health-ally", name: "Lowest Health Ally" },
  "ground": { id: "ground", name: "Ground" },
} as const satisfies Record<string, TargetTypeTemplate>
