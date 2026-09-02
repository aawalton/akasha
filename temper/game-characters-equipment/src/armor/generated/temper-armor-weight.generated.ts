/**
 * Temper Armor Weights (Generated)
 *
 * ESO armor weight classes — 4 body-armor weights (no-weight / light /
 * medium / heavy) plus Shield, sourced from the universal pages table
 * (page type: temper-armor-weight).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { ArmorWeightTemplate } from "../armor-weights-data"

/**
 * Keyed record. `ArmorWeightId` is declared in
 * `@akasha/temper-equipment/armor-weight-ids`, and `armorWeights` is
 * annotated against that union, so a key here the union does not name
 * is a type error rather than a silent widening.
 */
export const TEMPER_ARMOR_WEIGHTS_BY_ID = {
  "heavy": { id: "heavy" as const, name: "Heavy", baseValue: 346.5, skillLineId: "armor-heavy-armor" as const, isStandard: true },
  "light": { id: "light" as const, name: "Light", baseValue: 174.5, skillLineId: "armor-light-armor" as const, isStandard: true },
  "medium": { id: "medium" as const, name: "Medium", baseValue: 260.5, skillLineId: "armor-medium-armor" as const, isStandard: true },
  "no-weight": { id: "no-weight" as const, name: "No Weight", baseValue: 0, skillLineId: "no-skill-line" as const, isStandard: true },
  "shield": { id: "shield" as const, name: "Shield", baseValue: 1720, skillLineId: "weapon-one-hand-and-shield" as const, isStandard: false },
} as const satisfies Record<string, ArmorWeightTemplate>

/**
 * Standard body-armor weights only (excludes shield). Emitted as a
 * separate object literal so callers preserve narrow literal-union ids
 * without needing a runtime filter cast.
 */
export const STANDARD_TEMPER_ARMOR_WEIGHTS_BY_ID = {
  "heavy": { id: "heavy" as const, name: "Heavy", baseValue: 346.5, skillLineId: "armor-heavy-armor" as const, isStandard: true },
  "light": { id: "light" as const, name: "Light", baseValue: 174.5, skillLineId: "armor-light-armor" as const, isStandard: true },
  "medium": { id: "medium" as const, name: "Medium", baseValue: 260.5, skillLineId: "armor-medium-armor" as const, isStandard: true },
  "no-weight": { id: "no-weight" as const, name: "No Weight", baseValue: 0, skillLineId: "no-skill-line" as const, isStandard: true },
} as const satisfies Record<string, ArmorWeightTemplate>
