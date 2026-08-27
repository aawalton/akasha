/**
 * Temper Special Effect Types (Generated)
 *
 * Ten special-effect kinds — block-all, reflect-all, heal-to-full,
 * become-invisible, dodge-next-attack, interrupt, ignore-resistance,
 * pull-to-caster, create-corpse, cleanse — sourced from the universal
 * pages table (page type: temper-special-effect-type).
 *
 * Each entry's `id` is the stable codec-facing identifier and the same
 * string is used as the record key, so
 * `TEMPER_SPECIAL_EFFECT_TYPES["block-all"]` is well-typed and feeds the
 * `specialEffectTypes` lookup in @temper/game-characters-skills.
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { SpecialEffectTypeTemplate } from "../special-effect-type-data"

export const TEMPER_SPECIAL_EFFECT_TYPES = {
  "block-all": { id: "block-all", name: "Block All" },
  "reflect-all": { id: "reflect-all", name: "Reflect Projectiles" },
  "heal-to-full": { id: "heal-to-full", name: "Full Heal" },
  "become-invisible": { id: "become-invisible", name: "Invisibility" },
  "dodge-next-attack": { id: "dodge-next-attack", name: "Dodge Next Attack" },
  "interrupt": { id: "interrupt", name: "Interrupt" },
  "ignore-resistance": { id: "ignore-resistance", name: "Ignore Resistance" },
  "pull-to-caster": { id: "pull-to-caster", name: "Pull to Caster" },
  "create-corpse": { id: "create-corpse", name: "Create Corpse" },
  "cleanse": { id: "cleanse", name: "Cleanse" },
} as const satisfies Record<string, SpecialEffectTypeTemplate>
