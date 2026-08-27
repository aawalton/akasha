import { keybindList } from "./binding-utils"
import { ADDON_NAME } from "./constants"
import { KEYBIND_MANAGER } from "./keybind-manager"
import { hookKeybindsScrollList } from "./scroll-list"
import { setupControl } from "./search-box"
import { createBindingList, firstRun, syncKeybindings, toggleShareState } from "./share"
import { resetBindingSyncState, state } from "./state"
import { getUiString } from "./ui-strings"

function isKeybindingsEmpty(this: void, t: Record<string, VkBind[] | undefined>): boolean {
  for (const _key in t) {
    return false
  }
  return true
}

export function handleControlsPageOpened(this: void): undefined {
  KEYBINDINGS_FRAGMENT.RegisterCallback("StateChange", (_oldState: number, newState: number) => {
    if (newState === SCENE_FRAGMENT_SHOWING) {
      if (state.isDirty) {
        KEYBIND_MANAGER.RefreshList()
        state.isDirty = false
      }
      keybindList.SetLockedForUpdates(false)
      createBindingList()
      state.editMode = true
    } else if (newState === SCENE_FRAGMENT_HIDING) {
      keybindList.SetLockedForUpdates(true)
      resetBindingSyncState()
    }
  })
}

export function keepBindButtonEnabled(this: void): undefined {
  const bindButton = BIND_KEY_DIALOG.control.bindButton
  const orgEnabled = bindButton.SetEnabled
  bindButton.SetEnabled = function (this: VkBindButton, _enabled: boolean): undefined {
    orgEnabled.call(this, true)
  }
}

export function initialize(this: void): undefined {
  handleControlsPageOpened()
  if (isKeybindingsEmpty(state.account.Keybindings)) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED, () => {
      firstRun()
    })
  } else if (IsUnitInCombat("player")) {
    EVENT_MANAGER.RegisterForEvent<[boolean]>(
      ADDON_NAME,
      EVENT_PLAYER_COMBAT_STATE,
      (_eventCode, inCombat) => {
        if (!inCombat) {
          EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_PLAYER_COMBAT_STATE)
          syncKeybindings()
        }
      }
    )
  } else {
    syncKeybindings()
  }

  const control = WINDOW_MANAGER.CreateControlFromVirtual<VkKeybindButtonControl>(
    "$(parent)KeybinderToggle",
    ZO_Keybindings,
    "ZO_DialogButton"
  )
  control.SetAnchor(TOPLEFT, ZO_KeybindingsLoadGamepadDefaults, TOPRIGHT, 15, 0)
  control.nameLabel.SetDimensionConstraints(0, 0, 200, 0)
  ZO_KeybindButtonTemplate_Setup(
    control,
    "TEMPER_KEYBINDER_TOGGLE",
    () => {
      toggleShareState()
    },
    getUiString("TOGGLE")
  )

  setupControl()
  hookKeybindsScrollList()

  const limitWidth = (keybindButton: VkKeybindButtonControl | undefined): undefined => {
    if (keybindButton === undefined) {
      return
    }
    keybindButton.nameLabel.SetDimensionConstraints(0, 0, 200, 0)
  }
  limitWidth(ZO_KeybindingsLoadKeyboardDefaults)
  limitWidth(ZO_KeybindingsLoadGamepadDefaults)

  KEYBINDINGS_FRAGMENT.RegisterCallback("StateChange", (_oldState: number, newState: number) => {
    if (newState === SCENE_FRAGMENT_HIDING) {
      RemoveActionLayerByName("KeybindWindow")
    }
  })

  keepBindButtonEnabled()
}
