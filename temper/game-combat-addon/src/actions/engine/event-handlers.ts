import { getGallopEffect } from "../model/action"
import type { Action } from "../model/types"
import { saveAction } from "./action-store"
import { removeAction, state } from "./registries"
import { getActiveHotbarCategory } from "./slots"

export function onActionUpdateCooldowns(now: number): undefined {
  const [remain, duration] = GetSlotCooldownInfo(
    GetCurrentQuickslot(),
    HOTBAR_CATEGORY_QUICKSLOT_WHEEL
  )
  if (remain > 1000 && duration > 1000 && duration - remain < 100) {
    state.lastQuickslotTime = now
  }
  return undefined
}

export function onPlayerActivated(): undefined {
  const ticked: number[] = []
  for (const action of state.idActionMap.values()) {
    if (action.tickEffect !== undefined) {
      ticked.push(action.ability.id)
    }
  }

  const toggledIds = new Set<number>()
  const hotbarCategory = getActiveHotbarCategory()
  for (let slotNum = 3; slotNum <= 8; slotNum++) {
    if (IsSlotToggled(slotNum, hotbarCategory)) {
      let abilityId = GetSlotBoundId(slotNum, hotbarCategory)
      if (GetSlotType(slotNum, hotbarCategory) === ACTION_TYPE_CRAFTED_ABILITY) {
        abilityId = GetAbilityIdForCraftedAbilityId(abilityId)
      }
      toggledIds.add(abilityId)
    }
  }

  for (const abilityId of ticked) {
    if (!toggledIds.has(abilityId)) {
      const action = state.idActionMap.get(abilityId)
      if (action !== undefined) {
        removeAction(action)
      }
    }
  }
  return undefined
}

export function onMountedStateChanged(mounted: boolean, now: number): undefined {
  const gallopAction = state.gallopAction
  if (mounted && gallopAction !== undefined) {
    const gallopEffect = getGallopEffect(gallopAction)
    if (gallopEffect !== undefined && gallopEffect.endTime > now) {
      saveAction(gallopAction)
      state.gallopAction = undefined
    }
  }
  return undefined
}
