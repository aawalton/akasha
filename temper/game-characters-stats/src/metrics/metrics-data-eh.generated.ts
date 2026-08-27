/**
 * Metrics Data: e–h (effective-healing through hemorrhaging)
 *
 * THIS FILE IS AUTO-GENERATED. Do not edit manually.
 * Run: bun run generate-metrics
 *
 * Partial METRICS_DATA partition. Merged in metrics.ts.
 */

import type { MetricId } from "@temper/shared-formula-framework/metric-ids.generated"
import { effectiveHealingMetric } from "./data/effective-healing-metric"
import { effectiveHealingSpellMetric } from "./data/effective-healing-spell-metric"
import { effectiveHealingWeaponMetric } from "./data/effective-healing-weapon-metric"
import { effectiveHealthMetric } from "./data/effective-health-metric"
import { effectiveHealthPhysicalMetric } from "./data/effective-health-physical-metric"
import { effectiveHealthSpellMetric } from "./data/effective-health-spell-metric"
import { effectivePowerMetric } from "./data/effective-power-metric"
import { effectivePowerSpellMetric } from "./data/effective-power-spell-metric"
import { effectivePowerWeaponMetric } from "./data/effective-power-weapon-metric"
import { experienceGainMetric } from "./data/experience-gain-metric"
import { fearDurationMetric } from "./data/fear-duration-metric"
import { goldGainMetric } from "./data/gold-gain-metric"
import { haBowMetric } from "./data/ha-bow-metric"
import { haDualWieldMetric } from "./data/ha-dual-wield-metric"
import { haFlameSpellDamageMetric } from "./data/ha-flame-spell-damage-metric"
import { haFlameStaffMetric } from "./data/ha-flame-staff-metric"
import { haFlameWeaponDamageMetric } from "./data/ha-flame-weapon-damage-metric"
import { haFrostSpellDamageMetric } from "./data/ha-frost-spell-damage-metric"
import { haFrostStaffMetric } from "./data/ha-frost-staff-metric"
import { haFrostWeaponDamageMetric } from "./data/ha-frost-weapon-damage-metric"
import { haMagicSpellDamageMetric } from "./data/ha-magic-spell-damage-metric"
import { haMagicWeaponDamageMetric } from "./data/ha-magic-weapon-damage-metric"
import { haOneHandMetric } from "./data/ha-one-hand-metric"
import { haOverloadMetric } from "./data/ha-overload-metric"
import { haPhysicalSpellDamageMetric } from "./data/ha-physical-spell-damage-metric"
import { haPhysicalWeaponDamageMetric } from "./data/ha-physical-weapon-damage-metric"
import { haRestorationMetric } from "./data/ha-restoration-metric"
import { haRestore1hsMetric } from "./data/ha-restore-1hs-metric"
import { haRestore2hMetric } from "./data/ha-restore-2h-metric"
import { haRestoreBowMetric } from "./data/ha-restore-bow-metric"
import { haRestoreDwMetric } from "./data/ha-restore-dw-metric"
import { haRestoreFireFrostStaffMetric } from "./data/ha-restore-fire-frost-staff-metric"
import { haRestoreRestStaffMetric } from "./data/ha-restore-rest-staff-metric"
import { haRestoreShockStaffMetric } from "./data/ha-restore-shock-staff-metric"
import { haRestoreUnarmedMetric } from "./data/ha-restore-unarmed-metric"
import { haRestoreWerewolfMetric } from "./data/ha-restore-werewolf-metric"
import { haShockSpellDamageMetric } from "./data/ha-shock-spell-damage-metric"
import { haShockStaffMetric } from "./data/ha-shock-staff-metric"
import { haShockWeaponDamageMetric } from "./data/ha-shock-weapon-damage-metric"
import { haSpeedMetric } from "./data/ha-speed-metric"
import { haTwoHandMetric } from "./data/ha-two-hand-metric"
import { haUnarmedMetric } from "./data/ha-unarmed-metric"
import { haWerewolfMetric } from "./data/ha-werewolf-metric"
import { healingCriticalBonusMetric } from "./data/healing-critical-bonus-metric"
import { healingCriticalBonusSpellMetric } from "./data/healing-critical-bonus-spell-metric"
import { healingCriticalBonusWeaponMetric } from "./data/healing-critical-bonus-weapon-metric"
import { healingDoneAoeMetric } from "./data/healing-done-aoe-metric"
import { healingDoneBaseMetric } from "./data/healing-done-base-metric"
import { healingDoneDirectMetric } from "./data/healing-done-direct-metric"
import { healingDoneDotMetric } from "./data/healing-done-dot-metric"
import { healingDoneSingleTargetMetric } from "./data/healing-done-single-target-metric"
import { healingEffectivePowerBaseMetric } from "./data/healing-effective-power-base-metric"
import { healingEffectiveSelfPowerMetric } from "./data/healing-effective-self-power-metric"
import { healingReceivedBaseMetric } from "./data/healing-received-base-metric"
import { healingReductionBaseMetric } from "./data/healing-reduction-base-metric"
import { healingTakenBaseMetric } from "./data/healing-taken-base-metric"
import { healingTotalMetric } from "./data/healing-total-metric"
import { healthAbilityCostMetric } from "./data/health-ability-cost-metric"
import { healthMaximumMetric } from "./data/health-maximum-metric"
import { healthRecoveryIdleMetric } from "./data/health-recovery-idle-metric"
import { healthRecoveryMetric } from "./data/health-recovery-metric"
import { healthRestoreMetric } from "./data/health-restore-metric"
import { hemorrhagingDamageMetric } from "./data/hemorrhaging-damage-metric"
import type { MetricTemplate } from "./metric-template"

export const METRICS_DATA_EH: Partial<Record<MetricId, MetricTemplate>> = {
  [effectiveHealingMetric.id]: effectiveHealingMetric,
  [effectiveHealingSpellMetric.id]: effectiveHealingSpellMetric,
  [effectiveHealingWeaponMetric.id]: effectiveHealingWeaponMetric,
  [effectiveHealthMetric.id]: effectiveHealthMetric,
  [effectiveHealthPhysicalMetric.id]: effectiveHealthPhysicalMetric,
  [effectiveHealthSpellMetric.id]: effectiveHealthSpellMetric,
  [effectivePowerMetric.id]: effectivePowerMetric,
  [effectivePowerSpellMetric.id]: effectivePowerSpellMetric,
  [effectivePowerWeaponMetric.id]: effectivePowerWeaponMetric,
  [experienceGainMetric.id]: experienceGainMetric,
  [fearDurationMetric.id]: fearDurationMetric,
  [goldGainMetric.id]: goldGainMetric,
  [haBowMetric.id]: haBowMetric,
  [haDualWieldMetric.id]: haDualWieldMetric,
  [haFlameSpellDamageMetric.id]: haFlameSpellDamageMetric,
  [haFlameStaffMetric.id]: haFlameStaffMetric,
  [haFlameWeaponDamageMetric.id]: haFlameWeaponDamageMetric,
  [haFrostSpellDamageMetric.id]: haFrostSpellDamageMetric,
  [haFrostStaffMetric.id]: haFrostStaffMetric,
  [haFrostWeaponDamageMetric.id]: haFrostWeaponDamageMetric,
  [haMagicSpellDamageMetric.id]: haMagicSpellDamageMetric,
  [haMagicWeaponDamageMetric.id]: haMagicWeaponDamageMetric,
  [haOneHandMetric.id]: haOneHandMetric,
  [haOverloadMetric.id]: haOverloadMetric,
  [haPhysicalSpellDamageMetric.id]: haPhysicalSpellDamageMetric,
  [haPhysicalWeaponDamageMetric.id]: haPhysicalWeaponDamageMetric,
  [haRestorationMetric.id]: haRestorationMetric,
  [haRestore1hsMetric.id]: haRestore1hsMetric,
  [haRestore2hMetric.id]: haRestore2hMetric,
  [haRestoreBowMetric.id]: haRestoreBowMetric,
  [haRestoreDwMetric.id]: haRestoreDwMetric,
  [haRestoreFireFrostStaffMetric.id]: haRestoreFireFrostStaffMetric,
  [haRestoreRestStaffMetric.id]: haRestoreRestStaffMetric,
  [haRestoreShockStaffMetric.id]: haRestoreShockStaffMetric,
  [haRestoreUnarmedMetric.id]: haRestoreUnarmedMetric,
  [haRestoreWerewolfMetric.id]: haRestoreWerewolfMetric,
  [haShockSpellDamageMetric.id]: haShockSpellDamageMetric,
  [haShockStaffMetric.id]: haShockStaffMetric,
  [haShockWeaponDamageMetric.id]: haShockWeaponDamageMetric,
  [haSpeedMetric.id]: haSpeedMetric,
  [haTwoHandMetric.id]: haTwoHandMetric,
  [haUnarmedMetric.id]: haUnarmedMetric,
  [haWerewolfMetric.id]: haWerewolfMetric,
  [healingCriticalBonusMetric.id]: healingCriticalBonusMetric,
  [healingCriticalBonusSpellMetric.id]: healingCriticalBonusSpellMetric,
  [healingCriticalBonusWeaponMetric.id]: healingCriticalBonusWeaponMetric,
  [healingDoneAoeMetric.id]: healingDoneAoeMetric,
  [healingDoneBaseMetric.id]: healingDoneBaseMetric,
  [healingDoneDirectMetric.id]: healingDoneDirectMetric,
  [healingDoneDotMetric.id]: healingDoneDotMetric,
  [healingDoneSingleTargetMetric.id]: healingDoneSingleTargetMetric,
  [healingEffectivePowerBaseMetric.id]: healingEffectivePowerBaseMetric,
  [healingEffectiveSelfPowerMetric.id]: healingEffectiveSelfPowerMetric,
  [healingReceivedBaseMetric.id]: healingReceivedBaseMetric,
  [healingReductionBaseMetric.id]: healingReductionBaseMetric,
  [healingTakenBaseMetric.id]: healingTakenBaseMetric,
  [healingTotalMetric.id]: healingTotalMetric,
  [healthAbilityCostMetric.id]: healthAbilityCostMetric,
  [healthMaximumMetric.id]: healthMaximumMetric,
  [healthRecoveryIdleMetric.id]: healthRecoveryIdleMetric,
  [healthRecoveryMetric.id]: healthRecoveryMetric,
  [healthRestoreMetric.id]: healthRestoreMetric,
  [hemorrhagingDamageMetric.id]: hemorrhagingDamageMetric,
}
