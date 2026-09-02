/**
 * Metrics Data: i–p (inspiration through power-weapon)
 *
 * THIS FILE IS AUTO-GENERATED. Do not edit manually.
 * Run: bun run generate-metrics
 *
 * Partial METRICS_DATA partition. Merged in metrics.ts.
 */

import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import { inspirationGainMetric } from "./data/inspiration-gain-metric"
import { laBowMetric } from "./data/la-bow-metric"
import { laDualWieldMetric } from "./data/la-dual-wield-metric"
import { laFlameSpellDamageMetric } from "./data/la-flame-spell-damage-metric"
import { laFlameStaffMetric } from "./data/la-flame-staff-metric"
import { laFlameWeaponDamageMetric } from "./data/la-flame-weapon-damage-metric"
import { laFrostSpellDamageMetric } from "./data/la-frost-spell-damage-metric"
import { laFrostStaffMetric } from "./data/la-frost-staff-metric"
import { laFrostWeaponDamageMetric } from "./data/la-frost-weapon-damage-metric"
import { laMagicSpellDamageMetric } from "./data/la-magic-spell-damage-metric"
import { laMagicWeaponDamageMetric } from "./data/la-magic-weapon-damage-metric"
import { laMeleeSpeedMetric } from "./data/la-melee-speed-metric"
import { laOneHandMetric } from "./data/la-one-hand-metric"
import { laOverloadMetric } from "./data/la-overload-metric"
import { laPhysicalSpellDamageMetric } from "./data/la-physical-spell-damage-metric"
import { laPhysicalWeaponDamageMetric } from "./data/la-physical-weapon-damage-metric"
import { laRestorationStaffMetric } from "./data/la-restoration-staff-metric"
import { laShockSpellDamageMetric } from "./data/la-shock-spell-damage-metric"
import { laShockStaffMetric } from "./data/la-shock-staff-metric"
import { laShockWeaponDamageMetric } from "./data/la-shock-weapon-damage-metric"
import { laSpeedMetric } from "./data/la-speed-metric"
import { laTwoHandMetric } from "./data/la-two-hand-metric"
import { laUnarmedMetric } from "./data/la-unarmed-metric"
import { laWerewolfMetric } from "./data/la-werewolf-metric"
import { magicalAbilityStatusChanceMetric } from "./data/magical-ability-status-chance-metric"
import { magicalAoeStatusChanceMetric } from "./data/magical-aoe-status-chance-metric"
import { magicalAoedotStatusChanceMetric } from "./data/magical-aoedot-status-chance-metric"
import { magicalDotStatusChanceMetric } from "./data/magical-dot-status-chance-metric"
import { magicalEnchantStatusChanceMetric } from "./data/magical-enchant-status-chance-metric"
import { magickaAbilityCostMetric } from "./data/magicka-ability-cost-metric"
import { magickaMaximumMetric } from "./data/magicka-maximum-metric"
import { magickaRecoveryIdleMetric } from "./data/magicka-recovery-idle-metric"
import { magickaRecoveryMetric } from "./data/magicka-recovery-metric"
import { magickaRestoreMetric } from "./data/magicka-restore-metric"
import { martialAbilityStatusChanceMetric } from "./data/martial-ability-status-chance-metric"
import { martialAoeStatusChanceMetric } from "./data/martial-aoe-status-chance-metric"
import { martialAoedotStatusChanceMetric } from "./data/martial-aoedot-status-chance-metric"
import { martialDotStatusChanceMetric } from "./data/martial-dot-status-chance-metric"
import { martialEnchantStatusChanceMetric } from "./data/martial-enchant-status-chance-metric"
import { mountStaminaMaximumMetric } from "./data/mount-stamina-maximum-metric"
import { mountStaminaRegenCombatMetric } from "./data/mount-stamina-regen-combat-metric"
import { mountStaminaRegenMovingMetric } from "./data/mount-stamina-regen-moving-metric"
import { mountedRunSpeedMetric } from "./data/mounted-run-speed-metric"
import { mountedSpeedMetric } from "./data/mounted-speed-metric"
import { mountedWalkSpeedMetric } from "./data/mounted-walk-speed-metric"
import { movementRunSpeedMetric } from "./data/movement-run-speed-metric"
import { movementSneakPenaltyMetric } from "./data/movement-sneak-penalty-metric"
import { movementSneakSpeedMetric } from "./data/movement-sneak-speed-metric"
import { movementSpeedMetric } from "./data/movement-speed-metric"
import { movementSprintSpeedMetric } from "./data/movement-sprint-speed-metric"
import { movementSwimSpeedMetric } from "./data/movement-swim-speed-metric"
import { movementWalkSpeedMetric } from "./data/movement-walk-speed-metric"
import { overchargedDamageMetric } from "./data/overcharged-damage-metric"
import { overloadDamageMetric } from "./data/overload-damage-metric"
import { penetrationMetric } from "./data/penetration-metric"
import { penetrationPhysicalMetric } from "./data/penetration-physical-metric"
import { penetrationSpellMetric } from "./data/penetration-spell-metric"
import { playerEffectiveLevelMetric } from "./data/player-effective-level-metric"
import { poisonedDamageMetric } from "./data/poisoned-damage-metric"
import { poisonedDurationMetric } from "./data/poisoned-duration-metric"
import { potionCooldownMetric } from "./data/potion-cooldown-metric"
import { potionDurationMetric } from "./data/potion-duration-metric"
import { powerMetric } from "./data/power-metric"
import { powerSpellMetric } from "./data/power-spell-metric"
import { powerWeaponMetric } from "./data/power-weapon-metric"
import type { MetricTemplate } from "./metric-template"

export const METRICS_DATA_IP: Partial<Record<MetricId, MetricTemplate>> = {
  [inspirationGainMetric.id]: inspirationGainMetric,
  [laBowMetric.id]: laBowMetric,
  [laDualWieldMetric.id]: laDualWieldMetric,
  [laFlameSpellDamageMetric.id]: laFlameSpellDamageMetric,
  [laFlameStaffMetric.id]: laFlameStaffMetric,
  [laFlameWeaponDamageMetric.id]: laFlameWeaponDamageMetric,
  [laFrostSpellDamageMetric.id]: laFrostSpellDamageMetric,
  [laFrostStaffMetric.id]: laFrostStaffMetric,
  [laFrostWeaponDamageMetric.id]: laFrostWeaponDamageMetric,
  [laMagicSpellDamageMetric.id]: laMagicSpellDamageMetric,
  [laMagicWeaponDamageMetric.id]: laMagicWeaponDamageMetric,
  [laMeleeSpeedMetric.id]: laMeleeSpeedMetric,
  [laOneHandMetric.id]: laOneHandMetric,
  [laOverloadMetric.id]: laOverloadMetric,
  [laPhysicalSpellDamageMetric.id]: laPhysicalSpellDamageMetric,
  [laPhysicalWeaponDamageMetric.id]: laPhysicalWeaponDamageMetric,
  [laRestorationStaffMetric.id]: laRestorationStaffMetric,
  [laShockSpellDamageMetric.id]: laShockSpellDamageMetric,
  [laShockStaffMetric.id]: laShockStaffMetric,
  [laShockWeaponDamageMetric.id]: laShockWeaponDamageMetric,
  [laSpeedMetric.id]: laSpeedMetric,
  [laTwoHandMetric.id]: laTwoHandMetric,
  [laUnarmedMetric.id]: laUnarmedMetric,
  [laWerewolfMetric.id]: laWerewolfMetric,
  [magicalAbilityStatusChanceMetric.id]: magicalAbilityStatusChanceMetric,
  [magicalAoeStatusChanceMetric.id]: magicalAoeStatusChanceMetric,
  [magicalAoedotStatusChanceMetric.id]: magicalAoedotStatusChanceMetric,
  [magicalDotStatusChanceMetric.id]: magicalDotStatusChanceMetric,
  [magicalEnchantStatusChanceMetric.id]: magicalEnchantStatusChanceMetric,
  [magickaAbilityCostMetric.id]: magickaAbilityCostMetric,
  [magickaMaximumMetric.id]: magickaMaximumMetric,
  [magickaRecoveryIdleMetric.id]: magickaRecoveryIdleMetric,
  [magickaRecoveryMetric.id]: magickaRecoveryMetric,
  [magickaRestoreMetric.id]: magickaRestoreMetric,
  [martialAbilityStatusChanceMetric.id]: martialAbilityStatusChanceMetric,
  [martialAoeStatusChanceMetric.id]: martialAoeStatusChanceMetric,
  [martialAoedotStatusChanceMetric.id]: martialAoedotStatusChanceMetric,
  [martialDotStatusChanceMetric.id]: martialDotStatusChanceMetric,
  [martialEnchantStatusChanceMetric.id]: martialEnchantStatusChanceMetric,
  [mountStaminaMaximumMetric.id]: mountStaminaMaximumMetric,
  [mountStaminaRegenCombatMetric.id]: mountStaminaRegenCombatMetric,
  [mountStaminaRegenMovingMetric.id]: mountStaminaRegenMovingMetric,
  [mountedRunSpeedMetric.id]: mountedRunSpeedMetric,
  [mountedSpeedMetric.id]: mountedSpeedMetric,
  [mountedWalkSpeedMetric.id]: mountedWalkSpeedMetric,
  [movementRunSpeedMetric.id]: movementRunSpeedMetric,
  [movementSneakPenaltyMetric.id]: movementSneakPenaltyMetric,
  [movementSneakSpeedMetric.id]: movementSneakSpeedMetric,
  [movementSpeedMetric.id]: movementSpeedMetric,
  [movementSprintSpeedMetric.id]: movementSprintSpeedMetric,
  [movementSwimSpeedMetric.id]: movementSwimSpeedMetric,
  [movementWalkSpeedMetric.id]: movementWalkSpeedMetric,
  [overchargedDamageMetric.id]: overchargedDamageMetric,
  [overloadDamageMetric.id]: overloadDamageMetric,
  [penetrationMetric.id]: penetrationMetric,
  [penetrationPhysicalMetric.id]: penetrationPhysicalMetric,
  [penetrationSpellMetric.id]: penetrationSpellMetric,
  [playerEffectiveLevelMetric.id]: playerEffectiveLevelMetric,
  [poisonedDamageMetric.id]: poisonedDamageMetric,
  [poisonedDurationMetric.id]: poisonedDurationMetric,
  [potionCooldownMetric.id]: potionCooldownMetric,
  [potionDurationMetric.id]: potionDurationMetric,
  [powerMetric.id]: powerMetric,
  [powerSpellMetric.id]: powerSpellMetric,
  [powerWeaponMetric.id]: powerWeaponMetric,
}
