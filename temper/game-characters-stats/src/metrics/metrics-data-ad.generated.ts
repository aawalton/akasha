/**
 * Metrics Data: a–d (alliance through divines)
 *
 * THIS FILE IS AUTO-GENERATED. Do not edit manually.
 * Run: bun run generate-metrics
 *
 * Partial METRICS_DATA partition. Merged in metrics.ts.
 */

import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { alliancePointsGainMetric } from "./data/alliance-points-gain-metric"
import { attackCritDamageSpellMetric } from "./data/attack-crit-damage-spell-metric"
import { attackCritDamageWeaponMetric } from "./data/attack-crit-damage-weapon-metric"
import { attackPhysicalMitigationMetric } from "./data/attack-physical-mitigation-metric"
import { attackPowerMetric } from "./data/attack-power-metric"
import { attackSpellMitigationMetric } from "./data/attack-spell-mitigation-metric"
import { bashCostMetric } from "./data/bash-cost-metric"
import { bashDamageMetric } from "./data/bash-damage-metric"
import { blockCostReductionMetric } from "./data/block-cost-reduction-metric"
import { blockMitigationMetric } from "./data/block-mitigation-metric"
import { blockSpeedMetric } from "./data/block-speed-metric"
import { bloodthirstyMetric } from "./data/bloodthirsty-metric"
import { bloodthirstySpellDamageMetric } from "./data/bloodthirsty-spell-damage-metric"
import { bloodthirstyWeaponDamageMetric } from "./data/bloodthirsty-weapon-damage-metric"
import { breakFreeCostMetric } from "./data/break-free-cost-metric"
import { breakFreeDurationMetric } from "./data/break-free-duration-metric"
import { burningDamageMetric } from "./data/burning-damage-metric"
import { chilledDamageMetric } from "./data/chilled-damage-metric"
import { concussionDamageMetric } from "./data/concussion-damage-metric"
import { constitutionMetric } from "./data/constitution-metric"
import { criticalDamageMetric } from "./data/critical-damage-metric"
import { criticalDamageSpellMetric } from "./data/critical-damage-spell-metric"
import { criticalDamageTakenMetric } from "./data/critical-damage-taken-metric"
import { criticalDamageWeaponMetric } from "./data/critical-damage-weapon-metric"
import { criticalRatingMetric } from "./data/critical-rating-metric"
import { criticalRatingSpellMetric } from "./data/critical-rating-spell-metric"
import { criticalRatingWeaponMetric } from "./data/critical-rating-weapon-metric"
import { damageDoneAoeMetric } from "./data/damage-done-aoe-metric"
import { damageDoneArenaMetric } from "./data/damage-done-arena-metric"
import { damageDoneBaseMetric } from "./data/damage-done-base-metric"
import { damageDoneBleedMetric } from "./data/damage-done-bleed-metric"
import { damageDoneBowMetric } from "./data/damage-done-bow-metric"
import { damageDoneChanneledMetric } from "./data/damage-done-channeled-metric"
import { damageDoneDirectMetric } from "./data/damage-done-direct-metric"
import { damageDoneDiseaseMetric } from "./data/damage-done-disease-metric"
import { damageDoneDotMetric } from "./data/damage-done-dot-metric"
import { damageDoneDungeonMetric } from "./data/damage-done-dungeon-metric"
import { damageDoneEarthMetric } from "./data/damage-done-earth-metric"
import { damageDoneFlameMetric } from "./data/damage-done-flame-metric"
import { damageDoneFrostMetric } from "./data/damage-done-frost-metric"
import { damageDoneGenericMetric } from "./data/damage-done-generic-metric"
import { damageDoneHeavyAttackMetric } from "./data/damage-done-heavy-attack-metric"
import { damageDoneMagicMetric } from "./data/damage-done-magic-metric"
import { damageDoneOblivionMetric } from "./data/damage-done-oblivion-metric"
import { damageDonePetMetric } from "./data/damage-done-pet-metric"
import { damageDonePhysicalMetric } from "./data/damage-done-physical-metric"
import { damageDonePlayersMetric } from "./data/damage-done-players-metric"
import { damageDonePoisonMetric } from "./data/damage-done-poison-metric"
import { damageDoneShockMetric } from "./data/damage-done-shock-metric"
import { damageDoneSingleTargetMetric } from "./data/damage-done-single-target-metric"
import { damageDoneStatusEffectMetric } from "./data/damage-done-status-effect-metric"
import { damageDoneTrialMetric } from "./data/damage-done-trial-metric"
import { damageShieldCostMetric } from "./data/damage-shield-cost-metric"
import { damageShieldMetric } from "./data/damage-shield-metric"
import { damageTakenArenaMetric } from "./data/damage-taken-arena-metric"
import { damageTakenDirectMetric } from "./data/damage-taken-direct-metric"
import { damageTakenDotMetric } from "./data/damage-taken-dot-metric"
import { damageTakenDungeonMetric } from "./data/damage-taken-dungeon-metric"
import { damageTakenFallMetric } from "./data/damage-taken-fall-metric"
import { damageTakenFromAreaMetric } from "./data/damage-taken-from-area-metric"
import { damageTakenHaMetric } from "./data/damage-taken-ha-metric"
import { damageTakenLaMetric } from "./data/damage-taken-la-metric"
import { damageTakenMetric } from "./data/damage-taken-metric"
import { damageTakenTrialMetric } from "./data/damage-taken-trial-metric"
import { defenseCritDmgMetric } from "./data/defense-crit-dmg-metric"
import { defensePhysicalAoeMitigationMetric } from "./data/defense-physical-aoe-mitigation-metric"
import { defensePhysicalDdMitigationMetric } from "./data/defense-physical-dd-mitigation-metric"
import { defensePhysicalMitigationMetric } from "./data/defense-physical-mitigation-metric"
import { defenseSpellAoeMitigationMetric } from "./data/defense-spell-aoe-mitigation-metric"
import { defenseSpellDdMitigationMetric } from "./data/defense-spell-dd-mitigation-metric"
import { defenseSpellMitigationMetric } from "./data/defense-spell-mitigation-metric"
import { diseaseDamageMetric } from "./data/disease-damage-metric"
import { divinesMetric } from "./data/divines-metric"
import type { MetricTemplate } from "./metric-template"

export const METRICS_DATA_AD: Partial<Record<MetricId, MetricTemplate>> = {
  [alliancePointsGainMetric.id]: alliancePointsGainMetric,
  [attackCritDamageSpellMetric.id]: attackCritDamageSpellMetric,
  [attackCritDamageWeaponMetric.id]: attackCritDamageWeaponMetric,
  [attackPhysicalMitigationMetric.id]: attackPhysicalMitigationMetric,
  [attackPowerMetric.id]: attackPowerMetric,
  [attackSpellMitigationMetric.id]: attackSpellMitigationMetric,
  [bashCostMetric.id]: bashCostMetric,
  [bashDamageMetric.id]: bashDamageMetric,
  [blockCostReductionMetric.id]: blockCostReductionMetric,
  [blockMitigationMetric.id]: blockMitigationMetric,
  [blockSpeedMetric.id]: blockSpeedMetric,
  [bloodthirstyMetric.id]: bloodthirstyMetric,
  [bloodthirstySpellDamageMetric.id]: bloodthirstySpellDamageMetric,
  [bloodthirstyWeaponDamageMetric.id]: bloodthirstyWeaponDamageMetric,
  [breakFreeCostMetric.id]: breakFreeCostMetric,
  [breakFreeDurationMetric.id]: breakFreeDurationMetric,
  [burningDamageMetric.id]: burningDamageMetric,
  [chilledDamageMetric.id]: chilledDamageMetric,
  [concussionDamageMetric.id]: concussionDamageMetric,
  [constitutionMetric.id]: constitutionMetric,
  [criticalDamageMetric.id]: criticalDamageMetric,
  [criticalDamageSpellMetric.id]: criticalDamageSpellMetric,
  [criticalDamageTakenMetric.id]: criticalDamageTakenMetric,
  [criticalDamageWeaponMetric.id]: criticalDamageWeaponMetric,
  [criticalRatingMetric.id]: criticalRatingMetric,
  [criticalRatingSpellMetric.id]: criticalRatingSpellMetric,
  [criticalRatingWeaponMetric.id]: criticalRatingWeaponMetric,
  [damageDoneAoeMetric.id]: damageDoneAoeMetric,
  [damageDoneArenaMetric.id]: damageDoneArenaMetric,
  [damageDoneBaseMetric.id]: damageDoneBaseMetric,
  [damageDoneBleedMetric.id]: damageDoneBleedMetric,
  [damageDoneBowMetric.id]: damageDoneBowMetric,
  [damageDoneChanneledMetric.id]: damageDoneChanneledMetric,
  [damageDoneDirectMetric.id]: damageDoneDirectMetric,
  [damageDoneDiseaseMetric.id]: damageDoneDiseaseMetric,
  [damageDoneDotMetric.id]: damageDoneDotMetric,
  [damageDoneDungeonMetric.id]: damageDoneDungeonMetric,
  [damageDoneEarthMetric.id]: damageDoneEarthMetric,
  [damageDoneFlameMetric.id]: damageDoneFlameMetric,
  [damageDoneFrostMetric.id]: damageDoneFrostMetric,
  [damageDoneGenericMetric.id]: damageDoneGenericMetric,
  [damageDoneHeavyAttackMetric.id]: damageDoneHeavyAttackMetric,
  [damageDoneMagicMetric.id]: damageDoneMagicMetric,
  [damageDoneOblivionMetric.id]: damageDoneOblivionMetric,
  [damageDonePetMetric.id]: damageDonePetMetric,
  [damageDonePhysicalMetric.id]: damageDonePhysicalMetric,
  [damageDonePlayersMetric.id]: damageDonePlayersMetric,
  [damageDonePoisonMetric.id]: damageDonePoisonMetric,
  [damageDoneShockMetric.id]: damageDoneShockMetric,
  [damageDoneSingleTargetMetric.id]: damageDoneSingleTargetMetric,
  [damageDoneStatusEffectMetric.id]: damageDoneStatusEffectMetric,
  [damageDoneTrialMetric.id]: damageDoneTrialMetric,
  [damageShieldCostMetric.id]: damageShieldCostMetric,
  [damageShieldMetric.id]: damageShieldMetric,
  [damageTakenArenaMetric.id]: damageTakenArenaMetric,
  [damageTakenDirectMetric.id]: damageTakenDirectMetric,
  [damageTakenDotMetric.id]: damageTakenDotMetric,
  [damageTakenDungeonMetric.id]: damageTakenDungeonMetric,
  [damageTakenFallMetric.id]: damageTakenFallMetric,
  [damageTakenFromAreaMetric.id]: damageTakenFromAreaMetric,
  [damageTakenHaMetric.id]: damageTakenHaMetric,
  [damageTakenLaMetric.id]: damageTakenLaMetric,
  [damageTakenMetric.id]: damageTakenMetric,
  [damageTakenTrialMetric.id]: damageTakenTrialMetric,
  [defenseCritDmgMetric.id]: defenseCritDmgMetric,
  [defensePhysicalAoeMitigationMetric.id]: defensePhysicalAoeMitigationMetric,
  [defensePhysicalDdMitigationMetric.id]: defensePhysicalDdMitigationMetric,
  [defensePhysicalMitigationMetric.id]: defensePhysicalMitigationMetric,
  [defenseSpellAoeMitigationMetric.id]: defenseSpellAoeMitigationMetric,
  [defenseSpellDdMitigationMetric.id]: defenseSpellDdMitigationMetric,
  [defenseSpellMitigationMetric.id]: defenseSpellMitigationMetric,
  [diseaseDamageMetric.id]: diseaseDamageMetric,
  [divinesMetric.id]: divinesMetric,
}
