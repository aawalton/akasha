import { dropdown } from "@akasha/temper-settings-panel/dropdown"
import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import {
  ADDON_VERSION,
  ADDON_WEBSITE,
  buildDefaults,
  PIN_TEXTURES,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_UNKNOWN,
} from "../skyshards-constants/skyshards-constants.module.code.ts"
import { getDb, getMainworldColor } from "../skyshards-pc-state/skyshards-pc-state.module.code.ts"

const LAM = LibAddonMenu2

const OPTIONS_PANEL_ID = "TemperSkyShards_OptionsPanel"

const PIN_TEXTURES_LIST: Record<number, string> = {
  [1]: "Default icons (Garkin)",
  [2]: "Alternative icons (Garkin)",
  [3]: "Esohead's icons (Mitsarugi)",
  [4]: "Glowing icons (Rushmik)",
  [5]: "Realistic icons (Heidra)",
}

function unknownTexture(this: void, index: number): string {
  return PIN_TEXTURES.unknown[index] ?? ""
}

function collectedTexture(this: void, index: number): string {
  return PIN_TEXTURES.collected[index] ?? ""
}

function textureName(this: void, index: number): string {
  return PIN_TEXTURES_LIST[index] ?? ""
}

let unknownIcon: TextureControl | undefined
let collectedIcon: TextureControl | undefined

function createAllIconPreviews(this: void): undefined {
  const db = getDb()
  const host = previewSkyshardPinTexture

  const unknown = WINDOW_MANAGER.CreateControl(undefined, host, CT_TEXTURE)
  unknown.SetAnchor(RIGHT, host.dropdown.GetControl(), LEFT, -40, 0)
  unknown.SetTexture(unknownTexture(db.pinTexture.type))
  unknown.SetDimensions(db.pinTexture.size, db.pinTexture.size)
  unknownIcon = unknown

  const collected = WINDOW_MANAGER.CreateControl(undefined, host, CT_TEXTURE)
  collected.SetAnchor(RIGHT, host.dropdown.GetControl(), LEFT, -5, 0)
  collected.SetTexture(collectedTexture(db.pinTexture.type))
  collected.SetDimensions(db.pinTexture.size, db.pinTexture.size)
  collectedIcon = collected
}

function buildImmersiveChoices(this: void): readonly string[] {
  return [
    GetString(SKYS_IMMERSIVE_CHOICE1),
    GetString(SKYS_IMMERSIVE_CHOICE2),
    GetString(SKYS_IMMERSIVE_CHOICE3),
    GetString(SKYS_IMMERSIVE_CHOICE4),
    GetString(SKYS_IMMERSIVE_CHOICE5),
  ]
}

function pinControlsDisabled(this: void): boolean {
  const db = getDb()
  return !(db.filters[PINS_UNKNOWN] || db.filters[PINS_COLLECTED])
}

function filterEnabled(this: void, key: string): boolean {
  return getDb().filters[key] ?? false
}

function defaultFilter(this: void, key: string): boolean {
  return buildDefaults().filters[key] ?? false
}

function buildOptionsTable(this: void): LamControlData[] {
  const db = getDb()
  const defaults = buildDefaults()
  const immersiveChoices = buildImmersiveChoices()

  const options: LamControlData[] = [
    {
      ...dropdown({
        name: GetString(SKYS_PIN_TEXTURE),
        tooltip: GetString(SKYS_PIN_TEXTURE_DESC),
        choices: [textureName(1), textureName(2), textureName(3), textureName(4), textureName(5)],
        get: () => db.pinTexture.type - 1,
        set: (index) => {
          const type = index + 1
          db.pinTexture.type = type
          LibMapPins.SetLayoutKey(PINS_UNKNOWN, "texture", unknownTexture(type))
          LibMapPins.SetLayoutKey(PINS_COLLECTED, "texture", collectedTexture(type))
          unknownIcon?.SetTexture(unknownTexture(type))
          collectedIcon?.SetTexture(collectedTexture(type))
          LibMapPins.RefreshPins(PINS_UNKNOWN)
          LibMapPins.RefreshPins(PINS_COLLECTED)
          const compassLayout = COMPASS_PINS.pinLayouts[PINS_COMPASS]
          if (compassLayout != null) {
            compassLayout.texture = unknownTexture(type)
          }
          COMPASS_PINS.RefreshPins(PINS_COMPASS)
        },
        defaultIndex: defaults.pinTexture.type - 1,
        disabled: pinControlsDisabled,
      }),
      reference: "previewSkyshardPinTexture",
    },
    {
      type: "slider",
      name: GetString(SKYS_PIN_SIZE),
      tooltip: GetString(SKYS_PIN_SIZE_DESC),
      min: 20,
      max: 70,
      getFunc: () => db.pinTexture.size,
      setFunc: (size) => {
        db.pinTexture.size = size
        unknownIcon?.SetDimensions(size, size)
        collectedIcon?.SetDimensions(size, size)
        LibMapPins.SetLayoutKey(PINS_UNKNOWN, "size", size)
        LibMapPins.SetLayoutKey(PINS_COLLECTED, "size", size)
        LibMapPins.RefreshPins(PINS_UNKNOWN)
        LibMapPins.RefreshPins(PINS_COLLECTED)
      },
      disabled: pinControlsDisabled,
      default: defaults.pinTexture.size,
    },
    {
      type: "slider",
      name: GetString(SKYS_PIN_LAYER),
      tooltip: GetString(SKYS_PIN_LAYER_DESC),
      min: 10,
      max: 200,
      step: 5,
      getFunc: () => db.pinTexture.level,
      setFunc: (level) => {
        db.pinTexture.level = level
        LibMapPins.SetLayoutKey(PINS_UNKNOWN, "level", level)
        LibMapPins.SetLayoutKey(PINS_COLLECTED, "level", level)
        LibMapPins.RefreshPins(PINS_UNKNOWN)
        LibMapPins.RefreshPins(PINS_COLLECTED)
      },
      disabled: pinControlsDisabled,
      default: defaults.pinTexture.level,
    },
    {
      type: "checkbox",
      name: GetString(SKYS_UNKNOWN),
      tooltip: GetString(SKYS_UNKNOWN_DESC),
      getFunc: () => filterEnabled(PINS_UNKNOWN),
      setFunc: (state) => {
        db.filters[PINS_UNKNOWN] = state
        LibMapPins.SetEnabled(PINS_UNKNOWN, state)
      },
      default: defaultFilter(PINS_UNKNOWN),
    },
    {
      type: "checkbox",
      name: GetString(SKYS_COLLECTED),
      tooltip: GetString(SKYS_COLLECTED_DESC),
      getFunc: () => filterEnabled(PINS_COLLECTED),
      setFunc: (state) => {
        db.filters[PINS_COLLECTED] = state
        LibMapPins.SetEnabled(PINS_COLLECTED, state)
      },
      default: defaultFilter(PINS_COLLECTED),
    },
    {
      type: "checkbox",
      name: GetString(SKYS_COMPASS_UNKNOWN),
      tooltip: GetString(SKYS_COMPASS_UNKNOWN_DESC),
      getFunc: () => filterEnabled(PINS_COMPASS),
      setFunc: (state) => {
        db.filters[PINS_COMPASS] = state
        COMPASS_PINS.RefreshPins(PINS_COMPASS)
      },
      default: defaultFilter(PINS_COMPASS),
    },
    {
      type: "slider",
      name: GetString(SKYS_COMPASS_DIST),
      tooltip: GetString(SKYS_COMPASS_DIST_DESC),
      min: 1,
      max: 100,
      getFunc: () => db.compassMaxDistance * 1000,
      setFunc: (maxDistance) => {
        db.compassMaxDistance = maxDistance / 1000
        const compassLayout = COMPASS_PINS.pinLayouts[PINS_COMPASS]
        if (compassLayout != null) {
          compassLayout.maxDistance = maxDistance / 1000
        }
        COMPASS_PINS.RefreshPins(PINS_COMPASS)
      },
      width: "full",
      disabled: () => !filterEnabled(PINS_COMPASS),
      default: defaults.compassMaxDistance * 1000,
    },
    {
      type: "colorpicker",
      name: GetString(SKYS_MAINWORLD),
      tooltip: GetString(SKYS_MAINWORLD_DESC),
      getFunc: () => {
        return getMainworldColor().UnpackRGBA()
      },
      setFunc: (r, g, b, a) => {
        const color = getMainworldColor()
        color.SetRGBA(r, g, b, a ?? 1)
        db.mainworldSkyshards = color.ToHex()
        LibMapPins.RefreshPins()
        COMPASS_PINS.RefreshPins(PINS_COMPASS)
      },
      default: ZO_SELECTED_TEXT,
    },
    dropdown({
      name: GetString(SKYS_IMMERSIVE),
      tooltip: GetString(SKYS_IMMERSIVE_DESC),
      choices: immersiveChoices,
      get: () => db.immersiveMode - 1,
      set: (index) => {
        db.immersiveMode = index + 1
      },
      defaultIndex: defaults.immersiveMode - 1,
    }),
  ]

  return options
}

export function createSettingsMenu(this: void): undefined {
  const panelData: LamPanelData = {
    type: "panel",
    name: GetString(SKYS_TITLE),
    displayName: "|cFFFFB0" + GetString(SKYS_TITLE) + "|r",
    version: ADDON_VERSION,
    slashCommand: "/skyshards",
    registerForRefresh: true,
    registerForDefaults: false,
    website: ADDON_WEBSITE,
  }
  const settingsPanel = registerPanel(LAM, OPTIONS_PANEL_ID, panelData, buildOptionsTable())

  const createIcons = (panel: unknown): undefined => {
    if (panel === settingsPanel) {
      createAllIconPreviews()
      CALLBACK_MANAGER.UnregisterCallback("LAM-PanelControlsCreated", createIcons)
    }
  }
  CALLBACK_MANAGER.RegisterCallback("LAM-PanelControlsCreated", createIcons)
}
