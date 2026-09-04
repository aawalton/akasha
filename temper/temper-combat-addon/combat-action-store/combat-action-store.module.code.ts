import { matchesAbility } from "@akasha/temper-combat-addon/combat-action-matching"
import { removeAction, STATE } from "@akasha/temper-combat-addon/combat-action-queue"
import type { Action } from "@akasha/temper-combat-addon/combat-action-types"

function isSameLogicalSkill(prior: Action, incoming: Action, inCombat: boolean): boolean {
  if (prior.endTime !== 0 && prior.endTime < incoming.startTime) {
    return false
  }
  if (prior.ability.id === incoming.ability.id) {
    return true
  }
  for (const relatedId of prior.relatedAbilityList) {
    if (relatedId === incoming.ability.id) {
      return true
    }
  }
  for (const relatedId of incoming.relatedAbilityList) {
    if (relatedId === prior.ability.id) {
      return true
    }
  }
  if (matchesAbility(incoming.ability, prior.ability, false)) {
    return true
  }
  if (
    incoming.hotbarCategory === prior.hotbarCategory &&
    incoming.slotNum === prior.slotNum &&
    inCombat
  ) {
    return true
  }
  return false
}

export function getActionByNewAction(incoming: Action, inCombat: boolean): Action | undefined {
  for (const prior of STATE.idActionMap.values()) {
    if (!isSameLogicalSkill(prior, incoming, inCombat)) {
      continue
    }

    if (prior.flags.forArea && incoming.flags.forEnemy) {
      incoming.flags.forArea = true
      incoming.flags.forEnemy = false
    }
    if (!prior.flags.forEnemy && incoming.flags.forEnemy) {
      incoming.flags = prior.flags
    }

    if (prior.ability.id !== incoming.ability.id) {
      return prior
    }
    if (incoming.flags.forEnemy && !prior.fake) {
      let playerOnly = true
      for (const effect of prior.effectList) {
        if (effect.unitTag !== "player") {
          playerOnly = false
        }
      }
      return playerOnly ? prior : undefined
    }
    return prior
  }
  return undefined
}

export function saveAction(action: Action): undefined {
  STATE.lastEffectAction = action

  const sameName = getActionByNewAction(action, false)
  if (sameName !== undefined && sameName.sn !== action.sn) {
    removeAction(sameName)
  }

  const old = STATE.idActionMap.get(action.ability.id)
  if (old !== undefined && old.sn !== action.sn) {
    removeAction(old)
  }

  STATE.idActionMap.set(action.ability.id, action)
  STATE.snActionMap.set(action.sn, action)
  action.saved = true

  for (const effect of action.effectList) {
    STATE.timeActionMap.set(effect.startTime, action)
  }
  return undefined
}
