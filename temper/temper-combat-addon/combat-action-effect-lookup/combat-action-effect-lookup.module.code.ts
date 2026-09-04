import { getNewest } from "@akasha/temper-combat-addon/combat-action-build"
import {
  matchesNewEffect,
  matchesOldEffect,
} from "@akasha/temper-combat-addon/combat-action-matching"
import { STATE } from "@akasha/temper-combat-addon/combat-action-queue"
import {
  buildActionFromSlot,
  getActiveHotbarCategory,
  getNow,
  readSlotAbility,
} from "@akasha/temper-combat-addon/combat-action-slots"
import type { Action, Effect } from "@akasha/temper-combat-addon/combat-action-types"

const LAST_EFFECT_ACTION_WINDOW_MS = 50

const FIRST_ABILITY_SLOT = 3
const LAST_ABILITY_SLOT = 8

const SCANNED_HOTBARS = [HOTBAR_CATEGORY_PRIMARY, HOTBAR_CATEGORY_BACKUP]

const MINOR_BUFF_ICON = "ability_buff_mi"

function findBarActionByNewEffect(effect: Effect): Action | undefined {
  const activeHotbar = getActiveHotbarCategory()
  const hotbars: number[] = [activeHotbar]
  for (const hotbar of SCANNED_HOTBARS) {
    if (hotbar !== activeHotbar) {
      hotbars.push(hotbar)
    }
  }

  for (const hotbarCategory of hotbars) {
    for (let slotNum = FIRST_ABILITY_SLOT; slotNum <= LAST_ABILITY_SLOT; slotNum++) {
      const slotAbility = readSlotAbility(slotNum, hotbarCategory)
      if (slotAbility === undefined) {
        continue
      }
      if (slotAbility.name.length > 0 && effect.ability.name === slotAbility.name) {
        const action = buildActionFromSlot(slotNum, hotbarCategory, -1, getNow())
        if (action === undefined) {
          continue
        }
        action.fake = true
        return action
      }
    }
  }
  return undefined
}

export function findActionByNewEffect(effect: Effect): Action | undefined {
  const notMatched = new Set<number>()

  const lastAction = STATE.lastAction
  if (lastAction?.flags.forGround === true) {
    if (!notMatched.has(lastAction.sn) && matchesNewEffect(lastAction, effect)) {
      return lastAction
    }
    notMatched.add(lastAction.sn)
  }

  const lastEffectAction = STATE.lastEffectAction
  if (
    lastEffectAction !== undefined &&
    lastEffectAction.lastEffectTime + LAST_EFFECT_ACTION_WINDOW_MS > effect.startTime
  ) {
    if (!notMatched.has(lastEffectAction.sn) && matchesNewEffect(lastEffectAction, effect)) {
      return lastEffectAction
    }
    notMatched.add(lastEffectAction.sn)
  }

  for (const action of STATE.actionQueue) {
    if (!notMatched.has(action.sn) && matchesNewEffect(action, effect)) {
      return action
    }
    notMatched.add(action.sn)
  }

  for (const action of STATE.idActionMap.values()) {
    if (!notMatched.has(action.sn) && matchesNewEffect(action, effect)) {
      return action
    }
    notMatched.add(action.sn)
  }

  if (!effect.ability.icon.includes(MINOR_BUFF_ICON)) {
    const action = findBarActionByNewEffect(effect)
    if (action !== undefined) {
      return action
    }
  }

  return undefined
}

export function findActionByOldEffect(effect: Effect): Action | undefined {
  for (const action of STATE.actionQueue) {
    if (matchesOldEffect(action, effect)) {
      return getNewest(action)
    }
  }
  for (const action of STATE.idActionMap.values()) {
    if (matchesOldEffect(action, effect)) {
      return action
    }
  }
  return undefined
}
