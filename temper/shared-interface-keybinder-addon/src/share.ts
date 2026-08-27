import { bindKeyToAction, unbindAllKeysFromAction } from "./binding-fns"
import {
  type ActionRef,
  compareBinding,
  hasBinding,
  keybindingsOfActionName,
  keybindList,
} from "./binding-utils"
import { asVkScrollData } from "./casts"
import { ADDON_NAME, DEFAULT_GLOBAL_ACTION_NAME, KEYBIND_DATA_TYPE } from "./constants"
import { state } from "./state"

const SYNC_IDENTIFIER = "TEMPER_VOTANS_SYNCKEYBINDINGS"

export function createBindingList(this: void): undefined {
  const masterList: Record<string, VkBind[] | undefined> = {}
  state.masterList = masterList
  for (let layerIndex = 1; layerIndex <= GetNumActionLayers(); layerIndex++) {
    const [, numCategories] = GetActionLayerInfo(layerIndex)
    for (let categoryIndex = 1; categoryIndex <= numCategories; categoryIndex++) {
      const [, numActions] = GetActionLayerCategoryInfo(layerIndex, categoryIndex)
      for (let actionIndex = 1; actionIndex <= numActions; actionIndex++) {
        const [actionName] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
        masterList[actionName] = keybindingsOfActionName(layerIndex, categoryIndex, actionIndex)
      }
    }
  }
}

export function firstRun(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED)
  const globalKeybindings = state.account.Keybindings
  for (let layerIndex = 1; layerIndex <= GetNumActionLayers(); layerIndex++) {
    const [, numCategories] = GetActionLayerInfo(layerIndex)
    for (let categoryIndex = 1; categoryIndex <= numCategories; categoryIndex++) {
      const [, numActions] = GetActionLayerCategoryInfo(layerIndex, categoryIndex)
      for (let actionIndex = 1; actionIndex <= numActions; actionIndex++) {
        const [actionName] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
        if (DEFAULT_GLOBAL_ACTION_NAME[actionName] === true) {
          globalKeybindings[actionName] = keybindingsOfActionName(
            layerIndex,
            categoryIndex,
            actionIndex
          )
        }
      }
    }
  }
  state.bindingsSyncronized = true
}

function doSync(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(SYNC_IDENTIFIER)
  const globalKeybindings = state.account.Keybindings
  const current: ActionRef = { layerIndex: 0, categoryIndex: 0, actionIndex: 0 }

  const checkSync = (): undefined => {
    const [actionName, , isHidden] = GetActionInfo(
      current.layerIndex,
      current.categoryIndex,
      current.actionIndex
    )
    const target = globalKeybindings[actionName]
    if (!isHidden && target !== undefined) {
      if (!compareBinding(target, current)) {
        unbindAllKeysFromAction(current.layerIndex, current.categoryIndex, current.actionIndex)
        for (let bindingIndex = 1; bindingIndex <= target.length; bindingIndex++) {
          const bind = target[bindingIndex - 1]
          if (bind !== undefined && bind.keyCode !== 0) {
            bindKeyToAction(
              current.layerIndex,
              current.categoryIndex,
              current.actionIndex,
              bindingIndex,
              bind.keyCode,
              bind.mod1,
              bind.mod2,
              bind.mod3,
              bind.mod4
            )
          }
        }
      }
    }
  }

  for (let layerIndex = 1; layerIndex <= GetNumActionLayers(); layerIndex++) {
    current.layerIndex = layerIndex
    const [, numCategories] = GetActionLayerInfo(layerIndex)
    for (let categoryIndex = 1; categoryIndex <= numCategories; categoryIndex++) {
      current.categoryIndex = categoryIndex
      const [, numActions] = GetActionLayerCategoryInfo(layerIndex, categoryIndex)
      for (let actionIndex = 1; actionIndex <= numActions; actionIndex++) {
        current.actionIndex = actionIndex
        checkSync()
      }
    }
  }
  state.bindingsSyncronized = true
}

export function syncKeybindings(this: void): undefined {
  EVENT_MANAGER.UnregisterForUpdate(SYNC_IDENTIFIER)
  EVENT_MANAGER.RegisterForUpdate(SYNC_IDENTIFIER, 0, doSync)
}

function allShared(
  this: void,
  accountList: Record<string, VkBind[] | undefined>,
  visibleActions: string[]
): boolean {
  for (const actionName of visibleActions) {
    if (accountList[actionName] === undefined) {
      return false
    }
  }
  return true
}

export function toggleShareState(this: void): undefined {
  const list = asVkScrollData(ZO_ScrollList_GetDataList(keybindList.list))
  const visibleActions: string[] = []
  for (const entry of list) {
    if (entry.typeId >= KEYBIND_DATA_TYPE) {
      const data = entry.data.GetDataSource()
      if (hasBinding(data)) {
        visibleActions.push(data.actionName)
      }
    }
  }

  if (visibleActions.length === 0) {
    return
  }

  const accountList = state.account.Keybindings
  if (allShared(accountList, visibleActions)) {
    for (const actionName of visibleActions) {
      accountList[actionName] = undefined
    }
  } else {
    const masterList = state.masterList
    for (const entry of list) {
      if (entry.typeId >= KEYBIND_DATA_TYPE) {
        const bind = entry.data.GetDataSource()
        if (hasBinding(bind) || DEFAULT_GLOBAL_ACTION_NAME[bind.actionName] === true) {
          const snapshot = keybindingsOfActionName(
            bind.layerIndex,
            bind.categoryIndex,
            bind.actionIndex
          )
          masterList[bind.actionName] = snapshot
          accountList[bind.actionName] = snapshot
        }
      }
    }
  }
  keybindList.RefreshVisible()
}
