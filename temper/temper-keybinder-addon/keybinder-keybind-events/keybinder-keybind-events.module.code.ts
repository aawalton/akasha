import { normalizeModifiers } from "../keybinder-binding-utils/keybinder-binding-utils.module.code.ts"
import { ADDON_NAME } from "../keybinder-constants/keybinder-constants.module.code.ts"
import { syncKeybindings } from "../keybinder-share/keybinder-share.module.code.ts"
import { KEYBINDER_STATE } from "../keybinder-state/keybinder-state.module.code.ts"

export function handleBindingsLoaded(this: void): undefined {
  if (KEYBINDER_STATE.bindingsSynchronised) {
    syncKeybindings()
    KEYBINDER_STATE.isDirty = false
  } else {
    KEYBINDER_STATE.isDirty = true
  }
}

export function handleBindingCleared(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number
): undefined {
  KEYBINDER_STATE.isDirty = true
  if (KEYBINDER_STATE.editMode) {
    const bind: VkBind = { keyCode: 0, mod1: 0, mod2: 0, mod3: 0, mod4: 0 }
    const [actionName, , isHidden] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
    const ml = KEYBINDER_STATE.masterList[actionName]
    if (!isHidden && ml !== undefined) {
      ml[bindingIndex - 1] = bind
      const acc = KEYBINDER_STATE.account.Keybindings[actionName]
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
  KEYBINDER_STATE.isDirty = true
  if (KEYBINDER_STATE.editMode) {
    const [actionName] = GetActionInfo(layerIndex, categoryIndex, actionIndex)
    const [keyCode, m1, m2, m3, m4] = GetActionBindingInfo(
      layerIndex,
      categoryIndex,
      actionIndex,
      bindingIndex
    )
    const [mod1, mod2, mod3, mod4] = normalizeModifiers(m1, m2, m3, m4)
    const bind: VkBind = { keyCode, mod1, mod2, mod3, mod4 }
    const ml = KEYBINDER_STATE.masterList[actionName]
    if (ml !== undefined) {
      ml[bindingIndex - 1] = bind
      const acc = KEYBINDER_STATE.account.Keybindings[actionName]
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
