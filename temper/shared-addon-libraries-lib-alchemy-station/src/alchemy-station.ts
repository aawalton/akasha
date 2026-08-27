import { asLib } from "./casts"
import type { AlchemyDescriptor, LasTabData, Lib } from "./types"

export const lib: Lib = asLib({})

interface MenuBarButtonData {
  activeTabText: number | string
  categoryName: number | string
  descriptor: AlchemyDescriptor
  normal?: string
  pressed?: string
  highlight?: string
  disabled?: string
  callback: (this: void, data: MenuBarButtonData) => void
}

function hideOtherTabs(descriptor: AlchemyDescriptor): undefined {
  for (const [otherDescriptor, tabData] of pairs(lib.tabs)) {
    const child = tabData.control
    if (child !== undefined) {
      child.SetHidden(otherDescriptor !== descriptor)
    }
  }
}

function initStationButton(): undefined {
  let oldmode = ALCHEMY.mode
  SecurePostHook(
    ALCHEMY,
    "SetMode",
    function (this: void, self: AlchemyStation, mode: AlchemyDescriptor): undefined {
      hideOtherTabs(mode)
      const tabData = lib.tabs[mode]
      if (tabData !== undefined) {
        const slotContainer = self.control.GetNamedChild("SlotContainer")
        if (slotContainer !== undefined) {
          slotContainer.SetHidden(false)
        }
        if (oldmode !== mode) {
          if (tabData.callback !== undefined) {
            tabData.callback(tabData)
          }
          oldmode = mode
        }
      }
    }
  )
}

lib.Init = function (this: Lib): undefined {
  if (lib.content === undefined) {
    lib.tabs = {}
    const content = WINDOW_MANAGER.CreateControl("$(parent)Content", ZO_AlchemyTopLevel, CT_CONTROL)
    content.SetExcludeFromResizeToFitExtents(true)
    content.SetWidth(568)
    content.SetAnchor(TOPLEFT, ZO_SharedRightPanelBackground, TOPLEFT, 0, 67)
    content.SetAnchor(BOTTOMLEFT, ZO_SharedRightPanelBackground, BOTTOMLEFT, 0, -30)
    lib.content = content

    initStationButton()
  }
}

lib.AddTab = function (this: Lib, tabData: LasTabData): Control {
  const name = tabData.name
  const control = WINDOW_MANAGER.CreateControl(
    `$(grandparent)${tabData.descriptor}`,
    lib.content,
    CT_CONTROL
  )
  control.SetAnchorFill()
  tabData.control = control

  const creationData: MenuBarButtonData = {
    activeTabText: name,
    categoryName: name,
    descriptor: tabData.descriptor,
    normal: tabData.normal,
    pressed: tabData.pressed,
    highlight: tabData.highlight,
    disabled: tabData.disabled,
    callback: function (this: void, data: MenuBarButtonData): undefined {
      lib.SetText(GetString(name))
      ALCHEMY.SetMode(data.descriptor)
    },
  }
  ZO_MenuBar_AddButton(ALCHEMY.modeBar, creationData)
  lib.tabs[tabData.descriptor] = tabData
  return control
}

lib.SelectTab = function (this: Lib, descriptor: AlchemyDescriptor): boolean {
  return ZO_MenuBar_SelectDescriptor(ALCHEMY.modeBar, descriptor, false)
}

lib.GetSelectedTab = function (this: Lib): AlchemyDescriptor {
  return ZO_MenuBar_GetSelectedDescriptor(ALCHEMY.modeBar)
}

lib.SetText = function (this: Lib, text: string): undefined {
  ALCHEMY.modeBarLabel.SetText(text)
}
