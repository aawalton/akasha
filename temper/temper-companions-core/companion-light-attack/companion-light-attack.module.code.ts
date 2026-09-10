import type {
  LightAttackHealBuff,
  RotationState,
} from "../rotation-types/rotation-types.module.code.ts"
import {
  COMPANION_LIGHT_ATTACK_GCD,
  ULTIMATE_GENERATION_WINDOW_DURATION,
} from "../rotation-types/rotation-types.module.code.ts"

export function calculateLightAttackDamage(
  weaponPower: number,
  tooltipDamageMult: number,
  isCrit: boolean,
  armorDamageMultiplier = 1
): number {
  let damage = 1.5 * weaponPower * tooltipDamageMult
  if (isCrit) {
    damage *= 1.5
  }
  damage *= armorDamageMultiplier
  return damage
}

function getActiveLightAttackHealBuffs(state: RotationState): readonly LightAttackHealBuff[] {
  const active = state.lightAttackHealBuffs.filter((b) => b.expiresAt > state.currentTime)
  state.lightAttackHealBuffs = active
  return active
}

export function activateLightAttack(
  state: RotationState,
  healingMult: number,
  targetCount: number
): undefined {
  state.globalCooldownEndsAt = state.currentTime + COMPANION_LIGHT_ATTACK_GCD

  state.ultimateWindowExpiresAt = state.currentTime + ULTIMATE_GENERATION_WINDOW_DURATION

  state.lightAttackDamageMultSum += getLightAttackDamageMult(state)
  state.lightAttackCount++
  state.totalActivations++

  const buffs = getActiveLightAttackHealBuffs(state)
  let strongest: LightAttackHealBuff | undefined
  for (const buff of buffs) {
    if (strongest === undefined || buff.healPerHit > strongest.healPerHit) strongest = buff
  }
  if (strongest !== undefined) {
    const healAmount = strongest.healPerHit * healingMult
    state.lightAttackDirectHealing += healAmount
    if (strongest.healsSelf) {
      state.lightAttackSelfHealing += healAmount
      if (strongest.maxTargets > 1) {
        state.lightAttackAllyHealing += healAmount * Math.min(targetCount, strongest.maxTargets - 1)
      }
    } else {
      state.lightAttackAllyHealing += healAmount
    }
  }
}

function getLightAttackDamageMult(state: RotationState): number {
  let mult = 1

  const activeDmg = state.lightAttackDamageBuffs.filter((b) => b.expiresAt > state.currentTime)
  for (const b of activeDmg) mult += b.value
  state.lightAttackDamageBuffs = activeDmg

  const activeNext = state.nextAttackDamageBuffs.filter((b) => b.expiresAt > state.currentTime)
  const first = activeNext[0]
  if (first !== undefined) {
    let bestValue = first.value
    let bestIdx = 0
    for (let i = 1; i < activeNext.length; i++) {
      const candidate = activeNext[i]
      if (candidate !== undefined && candidate.value > bestValue) {
        bestValue = candidate.value
        bestIdx = i
      }
    }
    mult += bestValue
    state.nextAttackDamageBuffs = [
      ...activeNext.slice(0, bestIdx),
      ...activeNext.slice(bestIdx + 1),
    ]
  } else {
    state.nextAttackDamageBuffs = activeNext
  }

  return mult
}
