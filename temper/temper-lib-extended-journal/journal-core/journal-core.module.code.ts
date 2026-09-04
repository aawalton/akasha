import type { TabData } from "../journal-shape/journal-shape.module.code.ts"
import { Internal, Public } from "../journal-state/journal-state.module.code.ts"

const Controls = Internal.controls

Public.Used = false

Public.Show = (descriptor?: string, toggle?: boolean): undefined => {
  Internal.LazyInitialize(descriptor)

  let toggleLocal = toggle
  if (descriptor !== undefined && descriptor !== ZO_MenuBar_GetSelectedDescriptor(Controls.menu)) {
    ZO_MenuBar_SelectDescriptor(Controls.menu, descriptor, true)
    toggleLocal = false
  }

  if (!SCENE_MANAGER.IsShowing(Internal.SCENE_NAME)) {
    SCENE_MANAGER.Push(Internal.SCENE_NAME)
    if (
      Controls.mainMenu !== undefined &&
      ZO_MenuBar_GetSelectedDescriptor(Controls.mainMenu) !== Internal.name
    ) {
      ZO_MenuBar_SelectDescriptor(Controls.mainMenu, Internal.name, true)
    }
    if (Internal.FixMainMenuCategory !== undefined) {
      Internal.FixMainMenuCategory()
    }
  } else if (toggleLocal === true) {
    SCENE_MANAGER.ShowBaseScene()
  }
}

Public.RegisterTab = (descriptor: string, tabData: TabData): undefined => {
  tabData.descriptor = descriptor
  Internal.tabs[descriptor] = tabData

  if (tabData.title !== undefined) {
    const parts = [Internal.GetString(tabData.title)]
    if (tabData.subtitle !== undefined) {
      parts.push(Internal.GetString(tabData.subtitle))
    }
    tabData.name = table.concat(parts, ": ")
  }

  const binding = tabData.binding
  if (binding !== undefined && type(binding) === "string") {
    ZO_CreateStringId("SI_BINDING_NAME_" + binding, Internal.GetString(tabData.name))
  }

  const slashCommands = tabData.slashCommands
  if (slashCommands !== undefined && type(slashCommands) === "table") {
    const showTab = (): undefined => {
      Public.Show(descriptor)
    }
    for (const command of slashCommands) {
      if (SLASH_COMMANDS[command] === undefined) {
        SLASH_COMMANDS[command] = showTab
      }
    }
  }
}

Public.GetActiveTab = (): string | undefined => {
  const activeTab = Internal.activeTab
  return activeTab !== undefined ? activeTab.descriptor : undefined
}

Public.IsTabActive = (descriptor: string): boolean => descriptor === Public.GetActiveTab()

Public.GetFrame = (): Control => Controls.frame

Public.InvokeSettings = (): undefined => {
  if (Internal.settingsVisible) {
    const activeTab = Internal.activeTab
    if (
      LibAddonMenu2 !== undefined &&
      activeTab !== undefined &&
      activeTab.settingsPanel !== undefined
    ) {
      LibAddonMenu2.OpenToPanel(activeTab.settingsPanel)
    }
  }
}

Public.SetAlternateMode = (
  callbackMain?: (this: void) => void,
  callbackList?: (this: void, listControl: Control) => void
): undefined => {
  Internal.altMode = callbackMain
  Internal.altModeList = callbackList
}
