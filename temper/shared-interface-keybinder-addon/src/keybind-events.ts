import { normalizeModifiers } from "./binding-utils"
import { ADDON_NAME } from "./constants"
import { syncKeybindings } from "./share"
import { state } from "./state"

export function handleBindingsLoaded(this: void): undefined {
  if (state.bindingsSyncronized) {
    syncKeybindings()
    state.isDirty = false
  } else {
    state.isDirty = true
  }
}

export function handleBindingCleared(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number
): undefined {
  state.isDirty = true
  if (state.editMode) {
    const bind: VkBind = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }
    const [actionName, , isHidden] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
    const ml = state.masterList[actionName]
    if (!isHidden && ml !== undefined) {
      ml[bindingIndex - 1] = bind
      const acc = state.account.Keybindings[actionName]
      if (acc !== undefined) {
        acc[bindingIndex - 1] = bind
      }
    }
  }
}

export function handleBindingSet(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number
): undefined {
  state.isDirty = true
  if (state.editMode) {
    const [actionName] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
    const [keyCode, m1, m2, m3, m4] = GetActionBindingInfo(
      layerIndex,
      categoryIndex,
      actionIndex,
      bindingIndex
    )
    const [mod1, mod2, mod3, mod4] = normalizeModifiers(m1, m2, m3, m4)
    const bind: VkBind = { keyCode, mod1, mod2, mod3, mod4 }
    const ml = state.masterList[actionName]
    if (ml !== undefined) {
      ml[bindingIndex - 1] = bind
      const acc = state.account.Keybindings[actionName]
      if (acc !== undefined) {
        acc[bindingIndex - 1] = bind
      }
    }
  }
}

export function registerBindingEvents(this: void): undefined {
  EVENT_MANAGER.RegisterForEvent<[number, number, number, number]>(
    ADDON_NAME,
    EVENT_KEYBINDING_SET,
    (_eventCode, layerIndex, categoryIndex, actionIndex, bindingIndex) => {
      handleBindingSet(layerIndex, categoryIndex, actionIndex, bindingIndex)
    }
  )
  EVENT_MANAGER.RegisterForEvent<[number, number, number, number]>(
    ADDON_NAME,
    EVENT_KEYBINDING_CLEARED,
    (_eventCode, layerIndex, categoryIndex, actionIndex, bindingIndex) => {
      handleBindingCleared(layerIndex, categoryIndex, actionIndex, bindingIndex)
    }
  )
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_KEYBINDINGS_LOADED, () => {
    EVENT_MANAGER.UnregisterForUpdate(ADDON_NAME)
    EVENT_MANAGER.RegisterForUpdate(ADDON_NAME, 0, () => {
      EVENT_MANAGER.UnregisterForUpdate(ADDON_NAME)
      handleBindingsLoaded()
    })
  })
}
