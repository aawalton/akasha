import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import { dropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import { header } from "akasha/temper/addon/shared/settings-panel/modules/header/header.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import {
  newColorDef,
  setTextureColor,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-colors/dungeon-champion-colors.module.code.ts"
import { DEFAULTS } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-defaults/dungeon-champion-defaults.module.code.ts"
import { getUiString } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-labels/dungeon-champion-labels.module.code.ts"
import {
  ADDON_VERSION,
  PINS_COLLECTED,
  PINS_COMPASS_KNOWN,
  PINS_COMPASS_UNKNOWN,
  PINS_UNKNOWN,
  SETTINGS_PANEL_ID,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-names/dungeon-champion-names.module.code.ts"
import {
  getPinTexturesList,
  PIN_TEXTURES,
} from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-pin-textures/dungeon-champion-pin-textures.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/world/dungeon-champion/modules/dungeon-champion-saved-vars/dungeon-champion-saved-vars.module.code.ts"
import { unpackRgba } from "akasha/temper/modules/unpack-color/unpack-color.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

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
      CALLBACK_MANAGER.UnregisterCallback("TemperAddonMenu-PanelControlsCreated", createIcons)
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
    CALLBACK_MANAGER.UnregisterCallback("TemperAddonMenu-PanelControlsCreated", createIcons)
    return undefined
  }
  CALLBACK_MANAGER.RegisterCallback("TemperAddonMenu-PanelControlsCreated", createIcons)

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
        MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "texture", PIN_TEXTURES.unknown[index])
        MAP_PINS.SetLayoutKey(PINS_COLLECTED, "texture", PIN_TEXTURES.collected[index])
        setCompassTexture(PINS_COMPASS_UNKNOWN, PIN_TEXTURES.unknown[index] ?? "")
        setCompassTexture(PINS_COMPASS_KNOWN, PIN_TEXTURES.collected[index] ?? "")
        if (unknownIcon !== undefined) unknownIcon.SetTexture(PIN_TEXTURES.unknown[index] ?? "")
        if (collectedIcon !== undefined) {
          collectedIcon.SetTexture(PIN_TEXTURES.collected[index] ?? "")
        }
        if (index === 2) {
          MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "tint", newColorDef(sv.incompleteColor))
          MAP_PINS.SetLayoutKey(PINS_COLLECTED, "tint", newColorDef(sv.completeColor))
          setTextureColor(unknownIcon, sv.incompleteColor)
          setTextureColor(collectedIcon, sv.completeColor)
        } else {
          MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "tint", undefined)
          MAP_PINS.SetLayoutKey(PINS_COLLECTED, "tint", undefined)
          setTextureColor(unknownIcon, [1, 1, 1, 1])
          setTextureColor(collectedIcon, [1, 1, 1, 1])
        }
        MAP_PINS.RefreshPins(PINS_UNKNOWN)
        MAP_PINS.RefreshPins(PINS_COLLECTED)
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
        MAP_PINS.SetLayoutKey(PINS_COLLECTED, "tint", ZO_ColorDef.New(r, g, b, a))
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
        MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "tint", ZO_ColorDef.New(r, g, b, a))
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
        MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "size", size)
        MAP_PINS.SetLayoutKey(PINS_COLLECTED, "size", size)
        MAP_PINS.RefreshPins(PINS_UNKNOWN)
        MAP_PINS.RefreshPins(PINS_COLLECTED)
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
        MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "level", level)
        MAP_PINS.SetLayoutKey(PINS_COLLECTED, "level", level)
        MAP_PINS.RefreshPins(PINS_UNKNOWN)
        MAP_PINS.RefreshPins(PINS_COLLECTED)
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
        MAP_PINS.SetEnabled(PINS_UNKNOWN, state)
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
        MAP_PINS.SetEnabled(PINS_COLLECTED, state)
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

  settingsPanel = registerPanel(TemperAddonMenu, SETTINGS_PANEL_ID, panelData, optionsTable)
  return undefined
}
