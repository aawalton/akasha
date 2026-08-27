/**
 * Temper Status Effect Types (Generated)
 *
 * Twelve status-effect kinds — stun, fear, immobilize, knockback,
 * knockup, off-balance, snare, burning, chilled, concussed, taunt,
 * invisible — sourced from the universal pages table (page type:
 * temper-status-effect-type).
 *
 * Each entry's `id` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * `TEMPER_STATUS_EFFECT_TYPES["stun"]` is well-typed and feeds the
 * `statusEffectTypes` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { StatusEffectTypeTemplate } from "../status-effect-type-data"

export const TEMPER_STATUS_EFFECT_TYPES = {
  "stun": { id: "stun", name: "Stun" },
  "fear": { id: "fear", name: "Fear" },
  "immobilize": { id: "immobilize", name: "Immobilize" },
  "knockback": { id: "knockback", name: "Knockback" },
  "knockup": { id: "knockup", name: "Knockup" },
  "off-balance": { id: "off-balance", name: "Off Balance" },
  "snare": { id: "snare", name: "Snare" },
  "burning": { id: "burning", name: "Burning" },
  "chilled": { id: "chilled", name: "Chilled" },
  "concussed": { id: "concussed", name: "Concussed" },
  "taunt": { id: "taunt", name: "Taunt" },
  "invisible": { id: "invisible", name: "Invisible" },
} as const satisfies Record<string, StatusEffectTypeTemplate>
