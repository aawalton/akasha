import { STATE } from "../fco-state/fco-state.module.code.ts"
import { addButton } from "../fco-utils/fco-utils.module.code.ts"

const SM = SCENE_MANAGER
const WM = WINDOW_MANAGER

const notifications = NOTIFICATIONS as ZoKeyboardNotificationManager
let notificationsUI: Control | undefined = notifications.sortFilterList?.control
let notificationsList: NotificationsList | undefined = notifications.sortFilterList?.list
let notificationsMassHandlingContextMenuButton: Control | undefined

const LSM_CONTEXT_MENU_MASS_HANDLING_NOTIFICATIONS_DEFAULT_OPTIONS = {
  visibleRowsDropdown: 20,
  visibleRowsSubmenu: 15,
  minDropdownWidth: 200,
  sortEntries: false,
  enableFilter: true,
  headerCollapsible: true,
}

function areAnyNotificationsInTheList(this: void): boolean {
  return (notifications.totalNumNotifications as number) > 0
}

const NOTIFICATION_DELAY = 50
let NOTIFICATION_OVERALL_DELAY = 0

function delayedNotificationChange(
  this: void,
  acceptOrDecline: boolean,
  provider: NotificationProvider,
  notificationData: unknown
): undefined {
  if (acceptOrDecline === true) {
    zo_callLater(function (this: void) {
      provider.Accept?.(notificationData)
    }, NOTIFICATION_OVERALL_DELAY)
  } else {
    zo_callLater(function (this: void) {
      provider.Decline?.(notificationData)
    }, NOTIFICATION_OVERALL_DELAY)
  }
  NOTIFICATION_OVERALL_DELAY = NOTIFICATION_OVERALL_DELAY + NOTIFICATION_DELAY
}

function markAllNotificationsAsAcceptedOrDeclined(this: void, doAcceptAll: boolean): undefined {
  NOTIFICATION_OVERALL_DELAY = 0
  if (!areAnyNotificationsInTheList()) {
    return
  }
  notificationsList = notificationsList ?? notifications.sortFilterList?.list
  if (notificationsList === undefined) {
    return
  }

  for (const data of notificationsList.data) {
    const dataType = data.TypeId
    const dataEntryData = data.data
    if (dataEntryData !== undefined) {
      if (dataType !== NOTIFICATIONS_LFG_READY_CHECK_DATA) {
        const provider = dataEntryData.provider
        if (
          provider !== undefined &&
          ((doAcceptAll && provider.Accept !== undefined) ||
            (!doAcceptAll && provider.Decline !== undefined))
        ) {
          delayedNotificationChange(doAcceptAll, provider, dataEntryData)
        }
      }
    }
  }
}

function showMassHandlingNotificationsContextMenu(this: void): undefined {
  ClearCustomScrollableMenu()
  if (notificationsMassHandlingContextMenuButton === undefined) {
    return
  }
  AddCustomScrollableMenuEntry("Accept all notifications", function (this: void) {
    markAllNotificationsAsAcceptedOrDeclined(true)
  })
  AddCustomScrollableMenuDivider()
  AddCustomScrollableMenuEntry("Decline all notifications", function (this: void) {
    markAllNotificationsAsAcceptedOrDeclined(false)
  })

  ShowCustomScrollableMenu(
    notificationsMassHandlingContextMenuButton,
    LSM_CONTEXT_MENU_MASS_HANDLING_NOTIFICATIONS_DEFAULT_OPTIONS
  )
}

export function addMassHandlingNotificationsButton(this: void): undefined {
  const addMassHandlingNotificationsButtonSetting =
    STATE.settingsVars.settings.addMassHandlingNotificationsButton
  if (
    addMassHandlingNotificationsButtonSetting !== true ||
    notificationsMassHandlingContextMenuButton !== undefined
  ) {
    return
  }

  notificationsUI = notificationsUI ?? notifications.sortFilterList?.control
  if (notificationsUI === undefined) {
    return
  }

  const buttonDataAllNotificationsReadetings = {
    buttonName: "FCOCS_NotificationsMarkAllAsReadButton",
    parentControl: notificationsUI,
    tooltip: `${STATE.addonVars.addonNameMenuDisplay} Mass-change notifications`,
    callback: function (this: void) {
      showMassHandlingNotificationsContextMenu()
    },
    visible: function (this: void): boolean {
      return areAnyNotificationsInTheList()
    },
    width: 40,
    height: 40,
    normal: "/esoui/art/chatwindow/chat_options_up.dds",
    pressed: "/esoui/art/chatwindow/chat_options_down.dds",
    highlight: "/esoui/art/chatwindow/chat_options_over.dds",
    disabled: "/esoui/art/chatwindow/chat_options_disabled.dds",
  }
  notificationsMassHandlingContextMenuButton = addButton(
    TOPRIGHT,
    notificationsUI,
    TOPRIGHT,
    -70,
    -40,
    buttonDataAllNotificationsReadetings
  )
}

export function addNotificationsButtons(this: void): undefined {
  addMassHandlingNotificationsButton()
}

let FCOC_SMAIN_MENU_BUTTON_WAS_ADDED = false

export function hideCrownStoreButtonInMainMenu(this: void, value?: boolean): undefined {
  const hidden = value ?? false
  if (ZO_MainMenuCategoryBarButton1 !== undefined) {
    ZO_MainMenuCategoryBarButton1.SetHidden(hidden)
  }
}

export function hideCrownStoreReminingCrownsInMainMenu(this: void, value?: boolean): undefined {
  const hidden = value ?? false
  if (ZO_MainMenuCategoryBarButton1RemainingCrowns !== undefined) {
    ZO_MainMenuCategoryBarButton1RemainingCrowns.SetHidden(hidden)
  }
}

export function hideCrownCratesButtonInMainMenu(this: void, value?: boolean): undefined {
  const hidden = value ?? false
  if (ZO_MainMenuCategoryBarButton2 !== undefined) {
    ZO_MainMenuCategoryBarButton2.SetHidden(hidden)
  }
}

export function hideCrownStoreMembershipInMainMenu(this: void, value?: boolean): undefined {
  const hidden = value ?? false
  if (ZO_MainMenuCategoryBarButton1Membership !== undefined) {
    ZO_MainMenuCategoryBarButton1Membership.SetHidden(hidden)
  }
}

export function hideDividerRightToCrownStuff(this: void): undefined {
  const settings = STATE.settingsVars.settings
  const value =
    settings.hideCrownStoreButtonInMainMenu === true &&
    settings.hideCrownStorePointsInMainMenu === true &&
    settings.hideCrownStoreMembershipInMainMenu === true &&
    settings.hideCrownCratesButtonInMainMenu === true
  ZO_MainMenuCategoryBarPaddingBar1.SetHidden(value)
}

export function hideStuff(this: void): undefined {
  const settings = STATE.settingsVars.settings
  hideCrownStoreButtonInMainMenu(settings.hideCrownStoreButtonInMainMenu === true)
  hideCrownStoreReminingCrownsInMainMenu(settings.hideCrownStorePointsInMainMenu === true)
  hideCrownStoreMembershipInMainMenu(settings.hideCrownStoreMembershipInMainMenu === true)
  hideCrownCratesButtonInMainMenu(settings.hideCrownCratesButtonInMainMenu === true)
  hideDividerRightToCrownStuff()
}

HUD_SCENE.RegisterCallback("StateChange", function (this: void, _oldState, newState) {
  if (newState === SCENE_HIDING) {
    hideStuff()
  }
})

function isLibAddonMenuHandle(this: void, value: unknown): value is LibAddonMenuHandle {
  return type(value) === "table"
}

export function openLAMAddonSettings(this: void): undefined {
  if (WM.IsSecureRenderModeEnabled()) {
    return
  }
  if (SM.IsShowing(GAME_MENU_SCENE)) {
    SM.ShowBaseScene()
  } else {
    const lam = STATE.LAM
    if (isLibAddonMenuHandle(lam) && lam.OpenToPanel !== undefined) {
      lam.OpenToPanel(lam.currentAddonPanel)
    }
  }
}

export function addAddonSettingsMainMenuButton(this: void): boolean | undefined {
  if (STATE.settingsVars.settings.showAddonSettingsMainMenuButton !== true) {
    return false
  }
  STATE.LMM2 = LibMainMenu2
  const lmm2 = LibMainMenu2
  if (lmm2 === undefined) {
    return
  }

  if (FCOC_SMAIN_MENU_BUTTON_WAS_ADDED !== true) {
    lmm2.Init()
    const descriptor = STATE.addonVars.addonName
    const categoryLayoutInfo: LibMainMenu2MenuItemData = {
      binding: "FCOCS_ADDON_SETTINGS_MENU",
      categoryName: SI_BINDING_NAME_FCOCS_ADDON_SETTINGS_MENU,
      callback: openLAMAddonSettings,
      visible: function (this: void): boolean {
        if (VOTANS_MENU_SETTINGS?.IsMenuButtonEnabled() === true) {
          return false
        }
        return true
      },
      normal: "esoui/art/charactercreate/rotate_right_up.dds",
      pressed: "esoui/art/charactercreate/rotate_right_down.dds",
      highlight: "esoui/art/charactercreate/rotate_right_over.dds",
      disabled: "esoui/art/charactercreate/rotate_right_disabled.dds",
    }
    lmm2.AddMenuItem(descriptor, categoryLayoutInfo)
    FCOC_SMAIN_MENU_BUTTON_WAS_ADDED = true
  }
}

interface SpinScene extends Scene {
  toRestore?: SceneFragment[] | boolean
}

function isSceneFragment(this: void, x: unknown): x is SceneFragment {
  return type(x) === "table"
}

let SPIN_SCENES: Record<string, SpinScene> = {}

export function fixPlayerSpinFragments(this: void, scene?: Scene): undefined {
  const targetScene = scene ?? HUD_SCENE
  if (targetScene.IsShowing()) {
    if (STATE.settingsVars.settings.spinStop === true) {
      for (const fragment of STATE.spinFragments) {
        if (!isSceneFragment(fragment)) {
          continue
        }
        const frag = fragment
        if (!targetScene.HasFragment(frag)) {
          targetScene.AddFragment(frag)
          targetScene.RemoveFragment(frag)
        }
      }
    }
  }
}

export function cameraSpinChanges(this: void): undefined {
  const settings = STATE.settingsVars.settings

  const blacklistedScenes: Record<string, boolean> = {
    market: true,
    crownCrateGamepad: true,
    crownCrateKeyboard: true,
    keyboard_housing_furniture_scene: true,
    gamepad_housing_furniture_scene: true,
    dyeStampConfirmationGamepad: true,
    dyeStampConfirmationKeyboard: true,
    outfitStylesBook: true,
    collectionsBook: false,
    stats: false,
    inventory: false,
  }
  const spinStopAtScenes = settings.spinStopAtScenes
  for (const [sceneNameToSpinStop, doSpinStop] of pairs(spinStopAtScenes)) {
    if (!doSpinStop && sceneNameToSpinStop !== "allOthers") {
      blacklistedScenes[sceneNameToSpinStop] = true
    }
  }

  const updateSpinScenes = (disableFragments: unknown): undefined => {
    for (const [, scene] of pairs(SPIN_SCENES)) {
      if (scene.toRestore !== undefined && typeof scene.toRestore !== "boolean") {
        for (const fragment of scene.toRestore) {
          scene.AddFragment(fragment)
        }
      }
    }
    SPIN_SCENES = {}
    if (disableFragments === true) {
      for (const [name, scene] of pairs(SM.scenes)) {
        if (blacklistedScenes[name] !== true) {
          let sceneToSave = true
          for (const fragmentToRemove of STATE.spinFragments) {
            if (!isSceneFragment(fragmentToRemove)) {
              continue
            }
            const frag = fragmentToRemove
            if (scene.HasFragment(frag)) {
              scene.RemoveFragment(frag)
              if (sceneToSave) {
                sceneToSave = false
                const spinScene: SpinScene = scene
                spinScene.toRestore = []
                SPIN_SCENES[name] = spinScene
              }
              const stored = SPIN_SCENES[name]
              if (
                stored !== undefined &&
                stored.toRestore !== undefined &&
                typeof stored.toRestore !== "boolean"
              ) {
                stored.toRestore[stored.toRestore.length] = frag
              }
            }
          }
        }
      }
    }
  }
  updateSpinScenes(settings.spinStop)
}

export function addMainMenuButtons(this: void): undefined {
  addAddonSettingsMainMenuButton()

  cameraSpinChanges()
}
