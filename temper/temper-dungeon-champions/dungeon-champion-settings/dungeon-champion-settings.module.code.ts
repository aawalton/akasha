import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import { header } from "@akasha/temper-settings-panel/header"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import {
  newColorDef,
  setTextureColor,
  unpackRgba,
} from "../dungeon-champion-colors/dungeon-champion-colors.module.code.ts"
import { DEFAULTS } from "../dungeon-champion-defaults/dungeon-champion-defaults.module.code.ts"
import { getUiString } from "../dungeon-champion-labels/dungeon-champion-labels.module.code.ts"
import {
  ADDON_VERSION,
  PINS_COLLECTED,
  PINS_COMPASS_KNOWN,
  PINS_COMPASS_UNKNOWN,
  PINS_UNKNOWN,
  SETTINGS_PANEL_ID,
} from "../dungeon-champion-names/dungeon-champion-names.module.code.ts"
import {
  getPinTexturesList,
  PIN_TEXTURES,
} from "../dungeon-champion-pin-textures/dungeon-champion-pin-textures.module.code.ts"
import { getSavedVariables } from "../dungeon-champion-saved-vars/dungeon-champion-saved-vars.module.code.ts"

interface LamDropdownWidget {
  GetControl: () => Control
}

interface LamRefreshControl extends Control {
  dropdown: LamDropdownWidget
}

interface DcsSettingsPanel extends Control {
  controlsToRefresh: LamRefreshControl[]
}

function setCompassTexture(pinType: string, texture: string): undefined {
  const layout = COMPASS_PINS.pinLayouts[pinType]
  if (layout !== undefined) {
    layout.texture = texture
  }
  return undefined
}

function setCompassMaxDistance(pinType: string, distance: number): undefined {
  const layout = COMPASS_PINS.pinLayouts[pinType]
  if (layout !== undefined) {
    layout.maxDistance = distance
  }
  return undefined
}

function neitherFilter(a: string, b: string): boolean {
  const filters = getSavedVariables().filters
  return !(filters[a] === true || filters[b] === true)
}

function asDcsSettingsPanel(value: unknown): DcsSettingsPanel {
  return value as DcsSettingsPanel
}

export function createSettingsMenu(this: void): undefined {
  const sv = getSavedVariables()

  const panelData: LamPanelData = {
    type: "panel",
    name: getUiString("DCS_TITLE"),
    displayName: `|cFFFFB0${getUiString("DCS_TITLE")}|r`,
    version: ADDON_VERSION,
    slashCommand: "/dc",
    registerForRefresh: true,
    registerForDefaults: true,
  }
  let settingsPanel: Control

  let unknownIcon: TextureControl | undefined
  let collectedIcon: TextureControl | undefined

  const createIcons = (panel: unknown): undefined => {
    if (panel !== settingsPanel) return undefined
    const refreshable = asDcsSettingsPanel(settingsPanel).controlsToRefresh
    const iconHost = refreshable[0]
    const dropdownHost = refreshable[1]
    if (iconHost === undefined || dropdownHost === undefined) {
      CALLBACK_MANAGER.UnregisterCallback("LAM-PanelControlsCreated", createIcons)
      return undefined
    }

    unknownIcon = WINDOW_MANAGER.CreateControl(undefined, iconHost, CT_TEXTURE)
    unknownIcon.SetAnchor(RIGHT, dropdownHost.dropdown.GetControl(), LEFT, -10, 0)
    unknownIcon.SetTexture(PIN_TEXTURES.unknown[sv.pinTexture.type] ?? "")
    unknownIcon.SetDimensions(sv.pinTexture.size, sv.pinTexture.size)

    collectedIcon = WINDOW_MANAGER.CreateControl(undefined, dropdownHost, CT_TEXTURE)
    collectedIcon.SetAnchor(RIGHT, unknownIcon, LEFT, -5, 0)
    collectedIcon.SetTexture(PIN_TEXTURES.collected[sv.pinTexture.type] ?? "")
    collectedIcon.SetDimensions(sv.pinTexture.size, sv.pinTexture.size)

    if (sv.pinTexture.type === 2) {
      setTextureColor(unknownIcon, sv.incompleteColor)
      setTextureColor(collectedIcon, sv.completeColor)
    }
    CALLBACK_MANAGER.UnregisterCallback("LAM-PanelControlsCreated", createIcons)
    return undefined
  }
  CALLBACK_MANAGER.RegisterCallback("LAM-PanelControlsCreated", createIcons)

  const optionsTable: LamControlData[] = [
    header(getUiString("DCS_MAPPINS_HEADER")),
    dropdown({
      name: getUiString("DCS_PIN_TEXTURE"),
      tooltip: getUiString("DCS_PIN_TEXTURE_DESC"),
      choices: getPinTexturesList(),
      get: (): number => sv.pinTexture.type - 1,
      set: (selectedIndex: number): undefined => {
        const index = selectedIndex + 1
        sv.pinTexture.type = index
        LibMapPins.SetLayoutKey(PINS_UNKNOWN, "texture", PIN_TEXTURES.unknown[index])
        LibMapPins.SetLayoutKey(PINS_COLLECTED, "texture", PIN_TEXTURES.collected[index])
        setCompassTexture(PINS_COMPASS_UNKNOWN, PIN_TEXTURES.unknown[index] ?? "")
        setCompassTexture(PINS_COMPASS_KNOWN, PIN_TEXTURES.collected[index] ?? "")
        if (unknownIcon !== undefined) unknownIcon.SetTexture(PIN_TEXTURES.unknown[index] ?? "")
        if (collectedIcon !== undefined) {
          collectedIcon.SetTexture(PIN_TEXTURES.collected[index] ?? "")
        }
        if (index === 2) {
          LibMapPins.SetLayoutKey(PINS_UNKNOWN, "tint", newColorDef(sv.incompleteColor))
          LibMapPins.SetLayoutKey(PINS_COLLECTED, "tint", newColorDef(sv.completeColor))
          setTextureColor(unknownIcon, sv.incompleteColor)
          setTextureColor(collectedIcon, sv.completeColor)
        } else {
          LibMapPins.SetLayoutKey(PINS_UNKNOWN, "tint", undefined)
          LibMapPins.SetLayoutKey(PINS_COLLECTED, "tint", undefined)
          setTextureColor(unknownIcon, [1, 1, 1, 1])
          setTextureColor(collectedIcon, [1, 1, 1, 1])
        }
        LibMapPins.RefreshPins(PINS_UNKNOWN)
        LibMapPins.RefreshPins(PINS_COLLECTED)
        COMPASS_PINS.RefreshPins(PINS_COMPASS_UNKNOWN)
        COMPASS_PINS.RefreshPins(PINS_COMPASS_KNOWN)
        return undefined
      },
      disabled: (): boolean => neitherFilter(PINS_UNKNOWN, PINS_COLLECTED),
      defaultIndex: DEFAULTS.pinTexture.type - 1,
    }),
    {
      type: "colorpicker",
      name: getUiString("DCS_KNOWN_COL"),
      tooltip: getUiString("DCS_KNOWN_COL_TIP"),
      getFunc: () => {
        return unpackRgba(sv.completeColor)
      },
      setFunc: (r: number, g: number, b: number, a?: number): undefined => {
        sv.completeColor = [r, g, b, a ?? 1]
        LibMapPins.SetLayoutKey(PINS_COLLECTED, "tint", ZO_ColorDef.New(r, g, b, a))
        setTextureColor(collectedIcon, [r, g, b, a ?? 1])
        return undefined
      },
      disabled: (): boolean =>
        !(getSavedVariables().filters[PINS_COLLECTED] === true && sv.pinTexture.type === 2),
      default: {
        r: DEFAULTS.completeColor[0] ?? 0,
        g: DEFAULTS.completeColor[1] ?? 0,
        b: DEFAULTS.completeColor[2] ?? 0,
        a: DEFAULTS.completeColor[3] ?? 1,
      },
    },
    {
      type: "colorpicker",
      name: getUiString("DCS_UNKNOWN_COL"),
      tooltip: getUiString("DCS_UNKNOWN_COL_TIP"),
      getFunc: () => {
        return unpackRgba(sv.incompleteColor)
      },
      setFunc: (r: number, g: number, b: number, a?: number): undefined => {
        sv.incompleteColor = [r, g, b, a ?? 1]
        LibMapPins.SetLayoutKey(PINS_UNKNOWN, "tint", ZO_ColorDef.New(r, g, b, a))
        setTextureColor(unknownIcon, [r, g, b, a ?? 1])
        return undefined
      },
      disabled: (): boolean =>
        !(getSavedVariables().filters[PINS_UNKNOWN] === true && sv.pinTexture.type === 2),
      default: {
        r: DEFAULTS.incompleteColor[0] ?? 0,
        g: DEFAULTS.incompleteColor[1] ?? 0,
        b: DEFAULTS.incompleteColor[2] ?? 0,
        a: DEFAULTS.incompleteColor[3] ?? 1,
      },
    },
    {
      type: "slider",
      name: getUiString("DCS_PIN_SIZE"),
      tooltip: getUiString("DCS_PIN_SIZE_DESC"),
      min: 20,
      max: 70,
      getFunc: (): number => sv.pinTexture.size,
      setFunc: (size: number): undefined => {
        sv.pinTexture.size = size
        if (unknownIcon !== undefined) unknownIcon.SetDimensions(size, size)
        if (collectedIcon !== undefined) collectedIcon.SetDimensions(size, size)
        LibMapPins.SetLayoutKey(PINS_UNKNOWN, "size", size)
        LibMapPins.SetLayoutKey(PINS_COLLECTED, "size", size)
        LibMapPins.RefreshPins(PINS_UNKNOWN)
        LibMapPins.RefreshPins(PINS_COLLECTED)
        return undefined
      },
      disabled: (): boolean => neitherFilter(PINS_UNKNOWN, PINS_COLLECTED),
      default: DEFAULTS.pinTexture.size,
    },
    {
      type: "slider",
      name: getUiString("DCS_PIN_LAYER"),
      tooltip: getUiString("DCS_PIN_LAYER_DESC"),
      min: 10,
      max: 200,
      step: 5,
      getFunc: (): number => sv.pinTexture.level,
      setFunc: (level: number): undefined => {
        sv.pinTexture.level = level
        LibMapPins.SetLayoutKey(PINS_UNKNOWN, "level", level)
        LibMapPins.SetLayoutKey(PINS_COLLECTED, "level", level)
        LibMapPins.RefreshPins(PINS_UNKNOWN)
        LibMapPins.RefreshPins(PINS_COLLECTED)
        return undefined
      },
      disabled: (): boolean => neitherFilter(PINS_UNKNOWN, PINS_COLLECTED),
      default: DEFAULTS.pinTexture.level,
    },
    {
      type: "checkbox",
      name: getUiString("DCS_UNKNOWN"),
      tooltip: getUiString("DCS_UNKNOWN_DESC"),
      getFunc: (): boolean => sv.filters[PINS_UNKNOWN] === true,
      setFunc: (state: boolean): undefined => {
        sv.filters[PINS_UNKNOWN] = state
        LibMapPins.SetEnabled(PINS_UNKNOWN, state)
        return undefined
      },
      default: DEFAULTS.filters[PINS_UNKNOWN],
    },
    {
      type: "checkbox",
      name: getUiString("DCS_COLLECTED"),
      tooltip: getUiString("DCS_COLLECTED_DESC"),
      getFunc: (): boolean => sv.filters[PINS_COLLECTED] === true,
      setFunc: (state: boolean): undefined => {
        sv.filters[PINS_COLLECTED] = state
        LibMapPins.SetEnabled(PINS_COLLECTED, state)
        return undefined
      },
      default: DEFAULTS.filters[PINS_COLLECTED],
    },
    header(getUiString("DCS_COMPASS_HEADER")),
    {
      type: "checkbox",
      name: getUiString("DCS_COMPASS_KNOWN"),
      tooltip: getUiString("DCS_COMPASS_KNOWN_DESC"),
      getFunc: (): boolean => sv.filters[PINS_COMPASS_KNOWN] === true,
      setFunc: (state: boolean): undefined => {
        sv.filters[PINS_COMPASS_KNOWN] = state
        COMPASS_PINS.RefreshPins(PINS_COMPASS_KNOWN)
        return undefined
      },
      default: DEFAULTS.filters[PINS_COMPASS_KNOWN],
    },
    {
      type: "checkbox",
      name: getUiString("DCS_COMPASS_UNKNOWN"),
      tooltip: getUiString("DCS_COMPASS_UNKNOWN_DESC"),
      getFunc: (): boolean => sv.filters[PINS_COMPASS_UNKNOWN] === true,
      setFunc: (state: boolean): undefined => {
        sv.filters[PINS_COMPASS_UNKNOWN] = state
        COMPASS_PINS.RefreshPins(PINS_COMPASS_UNKNOWN)
        return undefined
      },
      default: DEFAULTS.filters[PINS_COMPASS_UNKNOWN],
    },
    {
      type: "slider",
      name: getUiString("DCS_COMPASS_DIST"),
      tooltip: getUiString("DCS_COMPASS_DIST_DESC"),
      min: 1,
      max: 100,
      getFunc: (): number => sv.compassMaxDistance * 1000,
      setFunc: (maxDistance: number): undefined => {
        sv.compassMaxDistance = maxDistance / 1000
        setCompassMaxDistance(PINS_COMPASS_KNOWN, maxDistance / 1000)
        COMPASS_PINS.RefreshPins(PINS_COMPASS_KNOWN)
        setCompassMaxDistance(PINS_COMPASS_UNKNOWN, maxDistance / 1000)
        COMPASS_PINS.RefreshPins(PINS_COMPASS_UNKNOWN)
        return undefined
      },
      disabled: (): boolean => neitherFilter(PINS_COMPASS_KNOWN, PINS_COMPASS_UNKNOWN),
      default: DEFAULTS.compassMaxDistance * 1000,
    },
  ]

  settingsPanel = registerPanel(LibAddonMenu2, SETTINGS_PANEL_ID, panelData, optionsTable)
  return undefined
}
