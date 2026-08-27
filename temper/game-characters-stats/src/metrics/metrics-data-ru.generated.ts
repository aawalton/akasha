/**
 * Metrics Data: r–u (resistance through ultimate-restore)
 *
 * THIS FILE IS AUTO-GENERATED. Do not edit manually.
 * Run: bun run generate-metrics
 *
 * Partial METRICS_DATA partition. Merged in metrics.ts.
 */

import type { MetricId } from "@temper/shared-formula-framework/metric-ids.generated"
import { resistanceBleedMetric } from "./data/resistance-bleed-metric"
import { resistanceCriticalMetric } from "./data/resistance-critical-metric"
import { resistanceDiseaseMetric } from "./data/resistance-disease-metric"
import { resistanceEarthMetric } from "./data/resistance-earth-metric"
import { resistanceFlameMetric } from "./data/resistance-flame-metric"
import { resistanceFrostMetric } from "./data/resistance-frost-metric"
import { resistanceGenericMetric } from "./data/resistance-generic-metric"
import { resistanceMagicMetric } from "./data/resistance-magic-metric"
import { resistanceMetric } from "./data/resistance-metric"
import { resistanceOblivionMetric } from "./data/resistance-oblivion-metric"
import { resistancePhysicalMetric } from "./data/resistance-physical-metric"
import { resistancePoisonMetric } from "./data/resistance-poison-metric"
import { resistanceShockMetric } from "./data/resistance-shock-metric"
import { resistanceSpellMetric } from "./data/resistance-spell-metric"
import { resurrectSpeedMetric } from "./data/resurrect-speed-metric"
import { resurrectTimeMetric } from "./data/resurrect-time-metric"
import { sneakCostMetric } from "./data/sneak-cost-metric"
import { sneakRangeMetric } from "./data/sneak-range-metric"
import { staminaAbilityCostMetric } from "./data/stamina-ability-cost-metric"
import { staminaBlockCostMetric } from "./data/stamina-block-cost-metric"
import { staminaDodgeCostMetric } from "./data/stamina-dodge-cost-metric"
import { staminaMaximumMetric } from "./data/stamina-maximum-metric"
import { staminaNonCoreAbilityCostMetric } from "./data/stamina-non-core-ability-cost-metric"
import { staminaRecoveryIdleMetric } from "./data/stamina-recovery-idle-metric"
import { staminaRecoveryMetric } from "./data/stamina-recovery-metric"
import { staminaRestoreMetric } from "./data/stamina-restore-metric"
import { staminaSprintCostMetric } from "./data/stamina-sprint-cost-metric"
import { statusBleedSpellDamageMetric } from "./data/status-bleed-spell-damage-metric"
import { statusBleedWeaponDamageMetric } from "./data/status-bleed-weapon-damage-metric"
import { statusDiseaseSpellDamageMetric } from "./data/status-disease-spell-damage-metric"
import { statusDiseaseWeaponDamageMetric } from "./data/status-disease-weapon-damage-metric"
import { statusDurationMetric } from "./data/status-duration-metric"
import { statusEffectChanceMetric } from "./data/status-effect-chance-metric"
import { statusFlameSpellDamageMetric } from "./data/status-flame-spell-damage-metric"
import { statusFlameWeaponDamageMetric } from "./data/status-flame-weapon-damage-metric"
import { statusFrostSpellDamageMetric } from "./data/status-frost-spell-damage-metric"
import { statusFrostWeaponDamageMetric } from "./data/status-frost-weapon-damage-metric"
import { statusMagicSpellDamageMetric } from "./data/status-magic-spell-damage-metric"
import { statusMagicWeaponDamageMetric } from "./data/status-magic-weapon-damage-metric"
import { statusPhysicalSpellDamageMetric } from "./data/status-physical-spell-damage-metric"
import { statusPhysicalWeaponDamageMetric } from "./data/status-physical-weapon-damage-metric"
import { statusPoisonSpellDamageMetric } from "./data/status-poison-spell-damage-metric"
import { statusPoisonWeaponDamageMetric } from "./data/status-poison-weapon-damage-metric"
import { statusShockSpellDamageMetric } from "./data/status-shock-spell-damage-metric"
import { statusShockWeaponDamageMetric } from "./data/status-shock-weapon-damage-metric"
import { stealthDetectionMetric } from "./data/stealth-detection-metric"
import { sturdyMetric } from "./data/sturdy-metric"
import { sunderedDamageMetric } from "./data/sundered-damage-metric"
import { synergyEffectivenessMetric } from "./data/synergy-effectiveness-metric"
import { targetArmorMetric } from "./data/target-armor-metric"
import { targetAttackBonusMetric } from "./data/target-attack-bonus-metric"
import { targetCriticalDamageDoneMetric } from "./data/target-critical-damage-done-metric"
import { targetCriticalDamageMetric } from "./data/target-critical-damage-metric"
import { targetCriticalRatingMetric } from "./data/target-critical-rating-metric"
import { targetCriticalResistanceMetric } from "./data/target-critical-resistance-metric"
import { targetDamageDoneMetric } from "./data/target-damage-done-metric"
import { targetDamageTakenMetric } from "./data/target-damage-taken-metric"
import { targetDamageTakenPoisonMetric } from "./data/target-damage-taken-poison-metric"
import { targetDefenseBonusMetric } from "./data/target-defense-bonus-metric"
import { targetEffectiveLevelMetric } from "./data/target-effective-level-metric"
import { targetHealingReceivedMetric } from "./data/target-healing-received-metric"
import { targetHealthRecoveryMetric } from "./data/target-health-recovery-metric"
import { targetMagickaAbilityCostMetric } from "./data/target-magicka-ability-cost-metric"
import { targetPenetrationMetric } from "./data/target-penetration-metric"
import { targetPercentHealthMetric } from "./data/target-percent-health-metric"
import { targetPhysicalDebuffMetric } from "./data/target-physical-debuff-metric"
import { targetPowerMetric } from "./data/target-power-metric"
import { targetResistanceMetric } from "./data/target-resistance-metric"
import { targetResistancePhysicalMetric } from "./data/target-resistance-physical-metric"
import { targetResistanceSpellMetric } from "./data/target-resistance-spell-metric"
import { targetSpellDebuffMetric } from "./data/target-spell-debuff-metric"
import { targetSpellPowerMetric } from "./data/target-spell-power-metric"
import { targetStaminaAbilityCostMetric } from "./data/target-stamina-ability-cost-metric"
import { targetUltimateRestorationMetric } from "./data/target-ultimate-restoration-metric"
import { targetWeaponPowerMetric } from "./data/target-weapon-power-metric"
import { telVarGainMetric } from "./data/tel-var-gain-metric"
import { trainingMetric } from "./data/training-metric"
import { ultimateAbilityCostMetric } from "./data/ultimate-ability-cost-metric"
import { ultimateGenerationMetric } from "./data/ultimate-generation-metric"
import { ultimateRecoveryMetric } from "./data/ultimate-recovery-metric"
import { ultimateRestoreMetric } from "./data/ultimate-restore-metric"
import type { MetricTemplate } from "./metric-template"

export const METRICS_DATA_RU: Partial<Record<MetricId, MetricTemplate>> = {
  [resistanceBleedMetric.id]: resistanceBleedMetric,
  [resistanceCriticalMetric.id]: resistanceCriticalMetric,
  [resistanceDiseaseMetric.id]: resistanceDiseaseMetric,
  [resistanceEarthMetric.id]: resistanceEarthMetric,
  [resistanceFlameMetric.id]: resistanceFlameMetric,
  [resistanceFrostMetric.id]: resistanceFrostMetric,
  [resistanceGenericMetric.id]: resistanceGenericMetric,
  [resistanceMagicMetric.id]: resistanceMagicMetric,
  [resistanceMetric.id]: resistanceMetric,
  [resistanceOblivionMetric.id]: resistanceOblivionMetric,
  [resistancePhysicalMetric.id]: resistancePhysicalMetric,
  [resistancePoisonMetric.id]: resistancePoisonMetric,
  [resistanceShockMetric.id]: resistanceShockMetric,
  [resistanceSpellMetric.id]: resistanceSpellMetric,
  [resurrectSpeedMetric.id]: resurrectSpeedMetric,
  [resurrectTimeMetric.id]: resurrectTimeMetric,
  [sneakCostMetric.id]: sneakCostMetric,
  [sneakRangeMetric.id]: sneakRangeMetric,
  [staminaAbilityCostMetric.id]: staminaAbilityCostMetric,
  [staminaBlockCostMetric.id]: staminaBlockCostMetric,
  [staminaDodgeCostMetric.id]: staminaDodgeCostMetric,
  [staminaMaximumMetric.id]: staminaMaximumMetric,
  [staminaNonCoreAbilityCostMetric.id]: staminaNonCoreAbilityCostMetric,
  [staminaRecoveryIdleMetric.id]: staminaRecoveryIdleMetric,
  [staminaRecoveryMetric.id]: staminaRecoveryMetric,
  [staminaRestoreMetric.id]: staminaRestoreMetric,
  [staminaSprintCostMetric.id]: staminaSprintCostMetric,
  [statusBleedSpellDamageMetric.id]: statusBleedSpellDamageMetric,
  [statusBleedWeaponDamageMetric.id]: statusBleedWeaponDamageMetric,
  [statusDiseaseSpellDamageMetric.id]: statusDiseaseSpellDamageMetric,
  [statusDiseaseWeaponDamageMetric.id]: statusDiseaseWeaponDamageMetric,
  [statusDurationMetric.id]: statusDurationMetric,
  [statusEffectChanceMetric.id]: statusEffectChanceMetric,
  [statusFlameSpellDamageMetric.id]: statusFlameSpellDamageMetric,
  [statusFlameWeaponDamageMetric.id]: statusFlameWeaponDamageMetric,
  [statusFrostSpellDamageMetric.id]: statusFrostSpellDamageMetric,
  [statusFrostWeaponDamageMetric.id]: statusFrostWeaponDamageMetric,
  [statusMagicSpellDamageMetric.id]: statusMagicSpellDamageMetric,
  [statusMagicWeaponDamageMetric.id]: statusMagicWeaponDamageMetric,
  [statusPhysicalSpellDamageMetric.id]: statusPhysicalSpellDamageMetric,
  [statusPhysicalWeaponDamageMetric.id]: statusPhysicalWeaponDamageMetric,
  [statusPoisonSpellDamageMetric.id]: statusPoisonSpellDamageMetric,
  [statusPoisonWeaponDamageMetric.id]: statusPoisonWeaponDamageMetric,
  [statusShockSpellDamageMetric.id]: statusShockSpellDamageMetric,
  [statusShockWeaponDamageMetric.id]: statusShockWeaponDamageMetric,
  [stealthDetectionMetric.id]: stealthDetectionMetric,
  [sturdyMetric.id]: sturdyMetric,
  [sunderedDamageMetric.id]: sunderedDamageMetric,
  [synergyEffectivenessMetric.id]: synergyEffectivenessMetric,
  [targetArmorMetric.id]: targetArmorMetric,
  [targetAttackBonusMetric.id]: targetAttackBonusMetric,
  [targetCriticalDamageDoneMetric.id]: targetCriticalDamageDoneMetric,
  [targetCriticalDamageMetric.id]: targetCriticalDamageMetric,
  [targetCriticalRatingMetric.id]: targetCriticalRatingMetric,
  [targetCriticalResistanceMetric.id]: targetCriticalResistanceMetric,
  [targetDamageDoneMetric.id]: targetDamageDoneMetric,
  [targetDamageTakenMetric.id]: targetDamageTakenMetric,
  [targetDamageTakenPoisonMetric.id]: targetDamageTakenPoisonMetric,
  [targetDefenseBonusMetric.id]: targetDefenseBonusMetric,
  [targetEffectiveLevelMetric.id]: targetEffectiveLevelMetric,
  [targetHealingReceivedMetric.id]: targetHealingReceivedMetric,
  [targetHealthRecoveryMetric.id]: targetHealthRecoveryMetric,
  [targetMagickaAbilityCostMetric.id]: targetMagickaAbilityCostMetric,
  [targetPenetrationMetric.id]: targetPenetrationMetric,
  [targetPercentHealthMetric.id]: targetPercentHealthMetric,
  [targetPhysicalDebuffMetric.id]: targetPhysicalDebuffMetric,
  [targetPowerMetric.id]: targetPowerMetric,
  [targetResistanceMetric.id]: targetResistanceMetric,
  [targetResistancePhysicalMetric.id]: targetResistancePhysicalMetric,
  [targetResistanceSpellMetric.id]: targetResistanceSpellMetric,
  [targetSpellDebuffMetric.id]: targetSpellDebuffMetric,
  [targetSpellPowerMetric.id]: targetSpellPowerMetric,
  [targetStaminaAbilityCostMetric.id]: targetStaminaAbilityCostMetric,
  [targetUltimateRestorationMetric.id]: targetUltimateRestorationMetric,
  [targetWeaponPowerMetric.id]: targetWeaponPowerMetric,
  [telVarGainMetric.id]: telVarGainMetric,
  [trainingMetric.id]: trainingMetric,
  [ultimateAbilityCostMetric.id]: ultimateAbilityCostMetric,
  [ultimateGenerationMetric.id]: ultimateGenerationMetric,
  [ultimateRecoveryMetric.id]: ultimateRecoveryMetric,
  [ultimateRestoreMetric.id]: ultimateRestoreMetric,
}
