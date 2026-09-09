import {
  asGamepadFilterInfo,
  asGrayscaleFn,
  asHookPin,
  asLmpMapPin,
} from "../map-pins-casts/map-pins-casts.module.code.ts"
import { initDebug } from "../map-pins-debug/map-pins-debug.module.code.ts"
import { LIB } from "../map-pins-lib/map-pins-lib.module.code.ts"
import { isEnabled, setEnabled } from "../pin-state/pin-state.module.code.ts"

function fixupPool(
  pool: WorldMapFilterControlPool | undefined,
  resolveScrollChild: (this: void) => Control | undefined,
  getControl: Control | undefined,
  setControl: Control | undefined,
  panelControl: Control | undefined
): undefined {
  if (pool === undefined) {
    return
  }

  const scrollChild = resolveScrollChild()
  pool.parent = scrollChild
  for (const [, control] of pairs(pool.m_Active)) {
    if (scrollChild !== undefined) {
      control.SetParent(scrollChild)
    }
  }

  if (getControl !== undefined && setControl !== undefined) {
    const [, point, anchorControl, relPoint, x, y] = getControl.GetAnchor(0)
    if (anchorControl === panelControl) {
      setControl.SetAnchor(point, scrollChild, relPoint, x, y)
    }
  }
}

function onLoad(this: void, _eventCode: number, addonName: string): undefined {
  const [found] = string.find(addonName, "^ZO")
  if (found !== undefined) {
    return
  }
  EVENT_MANAGER.UnregisterForEvent(LIB.name, EVENT_ADD_ON_LOADED)
  CALLBACK_MANAGER.FireCallbacks("WorldMapFiltersReady")

  const pvePanel = WORLD_MAP_FILTERS.pvePanel
  const pveScroll = (): Control | undefined =>
    ZO_WorldMapFiltersPvEContainerScrollChild ??
    WINDOW_MANAGER.CreateControlFromVirtual(
      "ZO_WorldMapFiltersPvEContainer",
      ZO_WorldMapFiltersPvE,
      "ZO_ScrollContainer"
    ).GetNamedChild("ScrollChild")
  fixupPool(
    pvePanel?.checkBoxPool,
    pveScroll,
    ZO_WorldMapFiltersPvECheckBox1,
    ZO_WorldMapFiltersPvECheckBox1,
    pvePanel?.control
  )
  fixupPool(
    pvePanel?.comboBoxPool,
    pveScroll,
    ZO_WorldMapFiltersPvEComboBox1,
    ZO_WorldMapFiltersPvEComboBox1,
    pvePanel?.control
  )
  if (ZO_WorldMapFiltersPvEContainer != null) {
    ZO_WorldMapFiltersPvEContainer.SetAnchorFill()
  }

  const pvpPanel = WORLD_MAP_FILTERS.pvpPanel
  const pvpScroll = (): Control | undefined =>
    ZO_WorldMapFiltersPvPContainerScrollChild ??
    WINDOW_MANAGER.CreateControlFromVirtual(
      "ZO_WorldMapFiltersPvPContainer",
      ZO_WorldMapFiltersPvP,
      "ZO_ScrollContainer"
    ).GetNamedChild("ScrollChild")
  fixupPool(
    pvpPanel?.checkBoxPool,
    pvpScroll,
    ZO_WorldMapFiltersPvPCheckBox1,
    ZO_WorldMapFiltersPvPCheckBox1,
    pvpPanel?.control
  )
  fixupPool(
    pvpPanel?.comboBoxPool,
    pvpScroll,
    ZO_WorldMapFiltersPvPComboBox1,
    ZO_WorldMapFiltersPvPComboBox1,
    pvpPanel?.control
  )
  if (ZO_WorldMapFiltersPvPContainer != null) {
    ZO_WorldMapFiltersPvPContainer.SetAnchorFill()
  }

  const imperialPvPPanel = WORLD_MAP_FILTERS.imperialPvPPanel
  const imperialScroll = (): Control | undefined =>
    ZO_WorldMapFiltersImperialPvPContainerScrollChild ??
    WINDOW_MANAGER.CreateControlFromVirtual(
      "ZO_WorldMapFiltersImperialPvPContainer",
      ZO_WorldMapFiltersImperialPvP,
      "ZO_ScrollContainer"
    ).GetNamedChild("ScrollChild")
  fixupPool(
    imperialPvPPanel?.checkBoxPool,
    imperialScroll,
    ZO_WorldMapFiltersImperialPvPCheckBox1,
    ZO_WorldMapFiltersImperialPvPCheckBox1,
    imperialPvPPanel?.control
  )
  fixupPool(
    imperialPvPPanel?.comboBoxPool,
    imperialScroll,
    ZO_WorldMapFiltersImperialPvPComboBox1,
    ZO_WorldMapFiltersPvPComboBox1,
    imperialPvPPanel?.control
  )
  if (ZO_WorldMapFiltersImperialPvPContainer != null) {
    ZO_WorldMapFiltersImperialPvPContainer.SetAnchorFill()
  }

  const battlegroundPanel = WORLD_MAP_FILTERS.battlegroundPanel
  const battlegroundScroll = (): Control | undefined =>
    ZO_WorldMapFiltersBattlegroundContainerScrollChild ??
    WINDOW_MANAGER.CreateControlFromVirtual(
      "ZO_WorldMapFiltersBattlegroundContainer",
      ZO_WorldMapFiltersBattleground,
      "ZO_ScrollContainer"
    ).GetNamedChild("ScrollChild")
  fixupPool(
    battlegroundPanel?.checkBoxPool,
    battlegroundScroll,
    ZO_WorldMapFiltersBattlegroundCheckBox1,
    ZO_WorldMapFiltersBattlegroundCheckBox1,
    battlegroundPanel?.control
  )
  fixupPool(
    battlegroundPanel?.comboBoxPool,
    battlegroundScroll,
    ZO_WorldMapFiltersBattlegroundComboBox1,
    ZO_WorldMapFiltersPvPComboBox1,
    battlegroundPanel?.control
  )
  if (ZO_WorldMapFiltersBattlegroundContainer != null) {
    ZO_WorldMapFiltersBattlegroundContainer.SetAnchorFill()
  }

  CALLBACK_MANAGER.FireCallbacks("PostHooksForWorldMapFilters")
}

function showPosition(this: void): undefined {
  const [x, y, zone, subzone, mapName] = LIB.MyPosition()
  d(string.format('["%s"]["%s"] = { %0.5f, %0.5f } -- %s', zone, subzone, x, y, mapName))
}

function listPins(this: void): undefined {
  const customPins = LIB.pinManager.customPins
  for (const [pinId, pinLayout] of pairs(customPins)) {
    df("pinId: %d - pinName: %s", pinId, pinLayout?.pinTypeString)
  }
}

function onWorldMapFiltersReady(this: void): undefined {
  if (GAMEPAD_WORLD_MAP_FILTERS === undefined) {
    return
  }

  const panelToKeyFields = new LuaTable<GamepadFilterPanel, string>()
  panelToKeyFields.set(GAMEPAD_WORLD_MAP_FILTERS.pvePanel, "pve")
  panelToKeyFields.set(GAMEPAD_WORLD_MAP_FILTERS.pvpPanel, "pvp")
  panelToKeyFields.set(GAMEPAD_WORLD_MAP_FILTERS.imperialPvPPanel, "imperialPvP")
  panelToKeyFields.set(GAMEPAD_WORLD_MAP_FILTERS.battlegroundPanel, "battleground")
  LIB.panelToKeyFields_Gamepad = panelToKeyFields

  const panelsByKey: Record<string, GamepadFilterPanel> = {}
  LIB.gamepadPanelsByKey = panelsByKey
  for (const [panel, key] of panelToKeyFields) {
    panelsByKey[key] = panel

    if (panel.control != null) {
      panel.gamepadMapFiltersInfo = panel.gamepadMapFiltersInfo ?? []
      if (panel.list == null) {
        const listControl = panel.control.GetNamedChild("List")
        if (listControl != null) {
          const list = ZO_GamepadVerticalParametricScrollList.New(listControl)
          panel.list = list
          list.SetAlignToScreenCenter(true)
          list.SetOnSelectedDataChangedCallback((): undefined => {
            if (
              GAMEPAD_WORLD_MAP_FILTERS !== undefined &&
              GAMEPAD_WORLD_MAP_FILTERS.SelectKeybind !== undefined
            ) {
              GAMEPAD_WORLD_MAP_FILTERS.SelectKeybind()
            }
          })
          list.AddDataTemplate(
            "ZO_GamepadWorldMapFilterCheckboxOptionTemplate",
            ZO_GamepadCheckboxOptionTemplate_Setup,
            ZO_GamepadMenuEntryTemplateParametricListFunction
          )
          list.AddDataTemplateWithHeader(
            "ZO_GamepadWorldMapFilterComboBoxTemplate",
            (...args: unknown[]): undefined => {
              panel.SetupDropDown(...args)
            },
            ZO_GamepadMenuEntryTemplateParametricListFunction,
            undefined,
            "ZO_GamepadMenuEntryHeaderTemplate"
          )
        }
      }
    }
  }
}

function onPostHooksForWorldMapFilters(this: void): undefined {
  const panelToKeyFields = LIB.panelToKeyFields_Gamepad
  if (panelToKeyFields === undefined) {
    return
  }

  for (const [panel, key] of panelToKeyFields) {
    const keyField = `${key}Key`
    ZO_PreHook(panel, "PostBuildControls", (): undefined => {
      const entries = panel.gamepadMapFiltersInfo
      if (entries !== undefined) {
        for (const entry of entries) {
          const info = asGamepadFilterInfo(entry)
          const pinTypeId = info.mapPinGroup
          const filter = LIB.filters[pinTypeId]

          if (filter) {
            const savedKey = filter[keyField]
            let isChecked: boolean | undefined
            if (
              filter.vars !== undefined &&
              savedKey != null &&
              filter.vars[savedKey as string] !== undefined
            ) {
              isChecked = filter.vars[savedKey as string]
            } else {
              isChecked = isEnabled(LIB, pinTypeId)
            }

            const checkBox = ZO_GamepadEntryData.New(info.name)
            checkBox.SetDataSource(info)
            checkBox.currentValue = isChecked === true

            setEnabled(LIB, pinTypeId, isChecked)

            panel.pinFilterCheckBoxes.push(checkBox)
            if (panel.list !== undefined) {
              panel.list.AddEntry("ZO_GamepadWorldMapFilterCheckboxOptionTemplate", checkBox)
            }
          }
        }
      }
      return undefined
    })
  }
}

export function installHooks(): undefined {
  CALLBACK_MANAGER.RegisterCallback("OnWorldMapChanged", LIB.OnMapChanged)

  ZO_PostHook(ZO_MapPin, "SetData", (pin: unknown, pinType: unknown): undefined => {
    const singlePinData = asLmpMapPin(ZO_MapPin).PIN_DATA[pinType as number]
    if (singlePinData) {
      const grayscale = singlePinData.grayscale
      if (grayscale != null) {
        let grayActive: boolean
        if (type(grayscale) === "function") {
          const result = asGrayscaleFn(grayscale)(pin)
          grayActive = result != null && result !== false
        } else {
          grayActive = grayscale === true
        }
        asHookPin(pin).backgroundControl?.SetDesaturation(grayActive ? 1 : 0)
      }
    }
  })

  ZO_PostHook(ZO_MapPin, "ClearData", (pin: unknown): undefined => {
    const hookPin = asHookPin(pin)
    if (hookPin.backgroundControl != null) {
      hookPin.backgroundControl.SetDesaturation(0)
    }
  })

  EVENT_MANAGER.RegisterForEvent(LIB.name, EVENT_ADD_ON_LOADED, onLoad)

  SLASH_COMMANDS["/lmploc"] = showPosition
  SLASH_COMMANDS["/lmppins"] = listPins
  SLASH_COMMANDS["/pinlist"] = listPins

  CALLBACK_MANAGER.RegisterCallback("WorldMapFiltersReady", onWorldMapFiltersReady)
  CALLBACK_MANAGER.RegisterCallback("PostHooksForWorldMapFilters", onPostHooksForWorldMapFilters)

  initDebug(LIB)
}
