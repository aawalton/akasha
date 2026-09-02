/**
 * Companion Metrics Module - Centralized exports for all companion metrics
 *
 * THIS FILE IS AUTO-GENERATED. Do not edit manually.
 * Run: bun run generate-companion-metrics
 *
 * This file imports all companion metric definitions and builds the metrics
 * data structure directly from named exports.
 */

import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { RatingSurplusInfo } from "@akasha/temper-formula-framework/rating-chance"
import type { SourceCategoryId } from "@akasha/temper-formula-framework/source-category"
import type { CompanionMetricId } from "@akasha/temper-companions-core/companion-metric-ids"
import type { CompanionMetricTemplate } from "@akasha/temper-companions-core/companion-metric-template"

// Re-export types that are imported from this module

// =============================================================================
// Import all companion metric definitions
// =============================================================================

import { companionAbilityCooldownMetric } from "./metrics/data/companion-ability-cooldown-metric"
import { companionArmorMetric } from "./metrics/data/companion-armor-metric"
import { companionBreakFreeCooldownMetric } from "./metrics/data/companion-break-free-cooldown-metric"
import { companionBuffDurationMetric } from "./metrics/data/companion-buff-duration-metric"
import { companionCriticalChanceMetric } from "./metrics/data/companion-critical-chance-metric"
import { companionCriticalDamageMetric } from "./metrics/data/companion-critical-damage-metric"
import { companionCriticalHealingMetric } from "./metrics/data/companion-critical-healing-metric"
import { companionDamageBlockedMetric } from "./metrics/data/companion-damage-blocked-metric"
import { companionDamageDoneMetric } from "./metrics/data/companion-damage-done-metric"
import { companionDamageTakenMetric } from "./metrics/data/companion-damage-taken-metric"
import { companionDpsAoeMetric } from "./metrics/data/companion-dps-aoe-metric"
import { companionDpsDirectMetric } from "./metrics/data/companion-dps-direct-metric"
import { companionDpsDotMetric } from "./metrics/data/companion-dps-dot-metric"
import { companionDpsSingleTargetMetric } from "./metrics/data/companion-dps-single-target-metric"
import { companionDpsTotalMetric } from "./metrics/data/companion-dps-total-metric"
import { companionEffectiveDamageMetric } from "./metrics/data/companion-effective-damage-metric"
import { companionEffectiveHealingMetric } from "./metrics/data/companion-effective-healing-metric"
import { companionEffectiveToughnessMetric } from "./metrics/data/companion-effective-toughness-metric"
import { companionHealingDoneMetric } from "./metrics/data/companion-healing-done-metric"
import { companionHealingReceivedMetric } from "./metrics/data/companion-healing-received-metric"
import { companionHealthMaximumMetric } from "./metrics/data/companion-health-maximum-metric"
import { companionHealthRecoveryMetric } from "./metrics/data/companion-health-recovery-metric"
import { companionHpsDirectMetric } from "./metrics/data/companion-hps-direct-metric"
import { companionHpsHotMetric } from "./metrics/data/companion-hps-hot-metric"
import { companionHpsShieldMetric } from "./metrics/data/companion-hps-shield-metric"
import { companionHpsTotalMetric } from "./metrics/data/companion-hps-total-metric"
import { companionPenetrationMetric } from "./metrics/data/companion-penetration-metric"
import { companionRollDodgeCooldownMetric } from "./metrics/data/companion-roll-dodge-cooldown-metric"
import { companionScoreMetric } from "./metrics/data/companion-score-metric"
import { companionSpsAllyMetric } from "./metrics/data/companion-sps-ally-metric"
import { companionSpsSelfMetric } from "./metrics/data/companion-sps-self-metric"
import { companionSpsTotalMetric } from "./metrics/data/companion-sps-total-metric"
import { companionSupportDpsMetric } from "./metrics/data/companion-support-dps-metric"
import { companionSupportScoreMetric } from "./metrics/data/companion-support-score-metric"
import { companionSupportTpsMetric } from "./metrics/data/companion-support-tps-metric"
import { companionTargetArmorMetric } from "./metrics/data/companion-target-armor-metric"
import { companionTargetRemainingArmorMetric } from "./metrics/data/companion-target-remaining-armor-metric"
import { companionTooltipWeaponDamageMetric } from "./metrics/data/companion-tooltip-weapon-damage-metric"
import { companionTooltipWeaponHealingMetric } from "./metrics/data/companion-tooltip-weapon-healing-metric"
import { companionTpsBuffMetric } from "./metrics/data/companion-tps-buff-metric"
import { companionTpsSelfHpsMetric } from "./metrics/data/companion-tps-self-hps-metric"
import { companionTpsShieldMetric } from "./metrics/data/companion-tps-shield-metric"
import { companionTpsTotalMetric } from "./metrics/data/companion-tps-total-metric"
import { companionUltimateGenerationMetric } from "./metrics/data/companion-ultimate-generation-metric"
import { companionWeaponDamageMetric } from "./metrics/data/companion-weapon-damage-metric"

// =============================================================================
// Companion Categories
// =============================================================================

export const COMPANION_CATEGORIES: SourceCategoryId[] = [
  "companion-base",
  "companion-armor",
  "companion-weapons",
  "companion-jewelry",
  "companion-skills",
]

// =============================================================================
// Build Data File from Imports
// =============================================================================

const COMPANION_METRICS_DATA: Record<CompanionMetricId, CompanionMetricTemplate> = {
  [companionAbilityCooldownMetric.id]: companionAbilityCooldownMetric,
  [companionArmorMetric.id]: companionArmorMetric,
  [companionBreakFreeCooldownMetric.id]: companionBreakFreeCooldownMetric,
  [companionBuffDurationMetric.id]: companionBuffDurationMetric,
  [companionCriticalChanceMetric.id]: companionCriticalChanceMetric,
  [companionCriticalDamageMetric.id]: companionCriticalDamageMetric,
  [companionCriticalHealingMetric.id]: companionCriticalHealingMetric,
  [companionDamageBlockedMetric.id]: companionDamageBlockedMetric,
  [companionDamageDoneMetric.id]: companionDamageDoneMetric,
  [companionDamageTakenMetric.id]: companionDamageTakenMetric,
  [companionDpsAoeMetric.id]: companionDpsAoeMetric,
  [companionDpsDirectMetric.id]: companionDpsDirectMetric,
  [companionDpsDotMetric.id]: companionDpsDotMetric,
  [companionDpsSingleTargetMetric.id]: companionDpsSingleTargetMetric,
  [companionDpsTotalMetric.id]: companionDpsTotalMetric,
  [companionEffectiveDamageMetric.id]: companionEffectiveDamageMetric,
  [companionEffectiveHealingMetric.id]: companionEffectiveHealingMetric,
  [companionEffectiveToughnessMetric.id]: companionEffectiveToughnessMetric,
  [companionHealingDoneMetric.id]: companionHealingDoneMetric,
  [companionHealingReceivedMetric.id]: companionHealingReceivedMetric,
  [companionHealthMaximumMetric.id]: companionHealthMaximumMetric,
  [companionHealthRecoveryMetric.id]: companionHealthRecoveryMetric,
  [companionHpsDirectMetric.id]: companionHpsDirectMetric,
  [companionHpsHotMetric.id]: companionHpsHotMetric,
  [companionHpsShieldMetric.id]: companionHpsShieldMetric,
  [companionHpsTotalMetric.id]: companionHpsTotalMetric,
  [companionPenetrationMetric.id]: companionPenetrationMetric,
  [companionRollDodgeCooldownMetric.id]: companionRollDodgeCooldownMetric,
  [companionScoreMetric.id]: companionScoreMetric,
  [companionSpsAllyMetric.id]: companionSpsAllyMetric,
  [companionSpsSelfMetric.id]: companionSpsSelfMetric,
  [companionSpsTotalMetric.id]: companionSpsTotalMetric,
  [companionSupportDpsMetric.id]: companionSupportDpsMetric,
  [companionSupportScoreMetric.id]: companionSupportScoreMetric,
  [companionSupportTpsMetric.id]: companionSupportTpsMetric,
  [companionTargetArmorMetric.id]: companionTargetArmorMetric,
  [companionTargetRemainingArmorMetric.id]: companionTargetRemainingArmorMetric,
  [companionTooltipWeaponDamageMetric.id]: companionTooltipWeaponDamageMetric,
  [companionTooltipWeaponHealingMetric.id]: companionTooltipWeaponHealingMetric,
  [companionTpsBuffMetric.id]: companionTpsBuffMetric,
  [companionTpsSelfHpsMetric.id]: companionTpsSelfHpsMetric,
  [companionTpsShieldMetric.id]: companionTpsShieldMetric,
  [companionTpsTotalMetric.id]: companionTpsTotalMetric,
  [companionUltimateGenerationMetric.id]: companionUltimateGenerationMetric,
  [companionWeaponDamageMetric.id]: companionWeaponDamageMetric,
}

// =============================================================================
// Data File Export
// =============================================================================

export const companionMetrics = createDataFile<CompanionMetricTemplate>()(COMPANION_METRICS_DATA)

// =============================================================================
// Derived Types
// =============================================================================

type CompanionMetric = CompanionMetricTemplate & { id: CompanionMetricId }

export type CompanionMetricValue = CompanionMetric & { value: number; surplus?: RatingSurplusInfo }

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get the display name for a companion metric.
 */
export function getCompanionMetricName(metricId: CompanionMetricId): string {
  return COMPANION_METRICS_DATA[metricId].name
}
