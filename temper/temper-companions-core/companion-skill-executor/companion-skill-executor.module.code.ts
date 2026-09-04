import { companionSkills } from "../companion-skills/companion-skills.module.code.ts"
import { evaluateCondition } from "../condition-evaluator/condition-evaluator.module.code.ts"
import type {
  HealthSamples,
  RotationState,
  SkillState,
} from "../rotation-types/rotation-types.module.code.ts"
import {
  COMPANION_GCD_DURATION,
  ULTIMATE_GENERATION_WINDOW_DURATION,
} from "../rotation-types/rotation-types.module.code.ts"

function isSkillAvailable(state: RotationState, skillState: SkillState): boolean {
  if (state.currentTime < state.castEndsAt) {
    return false
  }

  if (state.currentTime < state.globalCooldownEndsAt) {
    return false
  }

  if (state.currentTime < skillState.cooldownEndsAt) {
    return false
  }

  if (skillState.ultimateCost > 0 && state.ultimateAmount < skillState.ultimateCost) {
    return false
  }

  return true
}

export function activateSkill(
  state: RotationState,
  ss: SkillState,
  abilityCooldownMod: number,
  buffDurationMod: number,
  weaponPower: number
): undefined {
  const skillId = ss.skillId
  const skill = companionSkills.data[skillId]
  const { castTime } = ss

  const effectiveCooldown = ss.baseCooldown * (1 + abilityCooldownMod)

  if (castTime > 0) {
    state.castEndsAt = state.currentTime + castTime
  }

  const gcdStartTime = castTime > 0 ? state.castEndsAt : state.currentTime
  state.globalCooldownEndsAt = gcdStartTime + COMPANION_GCD_DURATION

  ss.cooldownEndsAt = state.currentTime + effectiveCooldown
  ss.usageCount++

  if (ss.baseEffectDuration > 0) {
    const effectDuration = ss.baseEffectDuration * (1 + buffDurationMod)
    const effectStartTime = castTime > 0 ? state.castEndsAt : state.currentTime
    const newEffectEndsAt = effectStartTime + effectDuration
    const oldEffectEndsAt = ss.effectEndsAt ?? 0

    if (oldEffectEndsAt > effectStartTime) {
      ss.effectActiveTime += Math.max(0, newEffectEndsAt - oldEffectEndsAt)
    } else {
      ss.effectActiveTime += effectDuration
    }

    ss.effectEndsAt = newEffectEndsAt
  }

  if (ss.ultimateCost > 0) {
    state.ultimateAmount -= ss.ultimateCost
  }

  if (skill) {
    for (const effect of skill.effects) {
      if (effect.type === "light-attack-heal") {
        const effectStartTime = castTime > 0 ? state.castEndsAt : state.currentTime
        const healsSelf = (["self", "self-and-ally", "self-or-ally"] as const).includes(
          effect.target.type
        )
        const effectiveDuration = effect.duration * (1 + buffDurationMod)
        const healPerHit =
          effect.formula.type === "metric-scaling" ? effect.formula.coefficient * weaponPower : 0
        state.lightAttackHealBuffs = [
          ...state.lightAttackHealBuffs,
          {
            skillId,
            healPerHit,
            expiresAt: effectStartTime + effectiveDuration,
            maxTargets: effect.target.maxTargets ?? 1,
            healsSelf,
          },
        ]
      }

      if (effect.type === "apply-buff" && "buff" in effect) {
        const effectStartTime = castTime > 0 ? state.castEndsAt : state.currentTime
        const effectiveDuration = effect.buff.duration * (1 + buffDurationMod)
        if (effect.buff.buff === "light-attack-damage" && effect.buff.value != null) {
          state.lightAttackDamageBuffs = [
            ...state.lightAttackDamageBuffs,
            {
              value: effect.buff.value,
              expiresAt: effectStartTime + effectiveDuration,
            },
          ]
        } else if (effect.buff.buff === "next-attack-damage" && effect.buff.value != null) {
          state.nextAttackDamageBuffs = [
            ...state.nextAttackDamageBuffs,
            {
              value: effect.buff.value,
              expiresAt: effectStartTime + effectiveDuration,
            },
          ]
        }
      }

      if (effect.type === "cooldown-reduction") {
        for (const [targetSkillId, targetState] of state.skillStates) {
          if (effect.scope === "other" && targetSkillId === skillId) continue

          if (effect.value === "reset") {
            targetState.cooldownEndsAt = state.currentTime
          } else {
            targetState.cooldownEndsAt = Math.max(
              state.currentTime,
              targetState.cooldownEndsAt - effect.value
            )
          }
        }
      }

      if (effect.type === "ultimate-generation") {
        state.ultimateAmount += effect.value
      }
    }

    if (ss.healType === "heals-ally") {
      state.ultimateWindowExpiresAt = state.currentTime + ULTIMATE_GENERATION_WINDOW_DURATION
    } else if (
      ss.healType === "heals-self-only" &&
      state.ultimateWindowExpiresAt > state.currentTime
    ) {
      state.ultimateWindowExpiresAt = state.currentTime + ULTIMATE_GENERATION_WINDOW_DURATION
    }
  }

  state.totalActivations++
}

export function selectNextSkill(
  state: RotationState,
  skillStates: readonly SkillState[],
  healthSamples: HealthSamples
): SkillState | null {
  for (const ss of skillStates) {
    if (!isSkillAvailable(state, ss)) {
      continue
    }

    if (ss.castConditions.length > 0) {
      let conditionsMet = true
      for (const condition of ss.castConditions) {
        if (!evaluateCondition(condition, healthSamples)) {
          conditionsMet = false
          break
        }
      }
      if (!conditionsMet) continue
    }

    return ss
  }

  return null
}
