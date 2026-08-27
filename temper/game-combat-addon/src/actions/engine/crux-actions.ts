import { isCruxConsumerIcon } from "../model/crux"
import { saveAction } from "./action-store"
import { state } from "./registries"
import { buildActionFromSlot, getActiveHotbarCategory, readSlotAbility } from "./slots"

const FIRST_ABILITY_SLOT = 3
const LAST_ABILITY_SLOT = 8

const FAKE_ACTION_SN = -1

export function ensureCruxActions(now: number): undefined {
  const activeHotbar = getActiveHotbarCategory()
  const hotbars: number[] = [activeHotbar]
  for (const hotbar of [HOTBAR_CATEGORY_PRIMARY, HOTBAR_CATEGORY_BACKUP]) {
    if (hotbar !== activeHotbar) {
      hotbars.push(hotbar)
    }
  }

  for (const hotbarCategory of hotbars) {
    for (let slotNum = FIRST_ABILITY_SLOT; slotNum <= LAST_ABILITY_SLOT; slotNum++) {
      const ability = readSlotAbility(slotNum, hotbarCategory)
      if (ability === undefined) {
        continue
      }
      if (!isCruxConsumerIcon(ability.icon)) {
        continue
      }
      if (state.idActionMap.get(ability.id) !== undefined) {
        continue
      }
      const action = buildActionFromSlot(slotNum, hotbarCategory, FAKE_ACTION_SN, now)
      if (action === undefined) {
        continue
      }
      action.fake = true
      saveAction(action)
    }
  }
  return undefined
}
