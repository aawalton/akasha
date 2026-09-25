import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import { dropdown } from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import { whenPanelControlsCreated } from "akasha/temper/addon/shared/settings-panel/modules/panel-controls-created/panel-controls-created.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import {
  ADDON_VERSION,
  buildDefaults,
  PIN_TEXTURES,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_UNKNOWN,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import {
  getDb,
  getMainworldColor,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-state/skyshards-pc-state.module.code.ts"
import { spaceOf } from "akasha/temper/window/modules/window-spacing/window-spacing.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/catalog/world/skyshard/skyshards-controls/skyshards-controls.type-declaration.d.ts"
import "akasha/temper/catalog/world/skyshard/skyshards-string-ids/skyshards-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const LAM = TemperAddonMenu

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

  const collected = WINDOW_MANAGER.CreateControl(undefined, host, CT_TEXTURE)
  collected.SetAnchor(RIGHT, host.dropdown.GetControl(), LEFT, -spaceOf("1"), 0)
  collected.SetTexture(collectedTexture(db.pinTexture.type))
  collected.SetDimensions(db.pinTexture.size, db.pinTexture.size)
  collectedIcon = collected

  const unknown = WINDOW_MANAGER.CreateControl(undefined, host, CT_TEXTURE)
  unknown.SetAnchor(RIGHT, collected, LEFT, -spaceOf("1"), 0)
  unknown.SetTexture(unknownTexture(db.pinTexture.type))
  unknown.SetDimensions(db.pinTexture.size, db.pinTexture.size)
  unknownIcon = unknown
}

function buildImmersiveChoices(this: void): readonly string[] {
  return [
    GetString(SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE1),
    GetString(SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE2),
    GetString(SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE3),
    GetString(SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE4),
    GetString(SI_TEMPER_SKYSHARDS_IMMERSIVE_CHOICE5),
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
        name: GetString(SI_TEMPER_SKYSHARDS_PIN_TEXTURE),
        tooltip: GetString(SI_TEMPER_SKYSHARDS_PIN_TEXTURE_DESC),
        choices: [textureName(1), textureName(2), textureName(3), textureName(4), textureName(5)],
        get: () => db.pinTexture.type - 1,
        set: (index) => {
          const type = index + 1
          db.pinTexture.type = type
          MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "texture", unknownTexture(type))
          MAP_PINS.SetLayoutKey(PINS_COLLECTED, "texture", collectedTexture(type))
          unknownIcon?.SetTexture(unknownTexture(type))
          collectedIcon?.SetTexture(collectedTexture(type))
          MAP_PINS.RefreshPins(PINS_UNKNOWN)
          MAP_PINS.RefreshPins(PINS_COLLECTED)
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
      name: GetString(SI_TEMPER_SKYSHARDS_PIN_SIZE),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_PIN_SIZE_DESC),
      min: 20,
      max: 70,
      getFunc: () => db.pinTexture.size,
      setFunc: (size) => {
        db.pinTexture.size = size
        unknownIcon?.SetDimensions(size, size)
        collectedIcon?.SetDimensions(size, size)
        MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "size", size)
        MAP_PINS.SetLayoutKey(PINS_COLLECTED, "size", size)
        MAP_PINS.RefreshPins(PINS_UNKNOWN)
        MAP_PINS.RefreshPins(PINS_COLLECTED)
      },
      disabled: pinControlsDisabled,
      default: defaults.pinTexture.size,
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_SKYSHARDS_PIN_LAYER),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_PIN_LAYER_DESC),
      min: 10,
      max: 200,
      step: 5,
      getFunc: () => db.pinTexture.level,
      setFunc: (level) => {
        db.pinTexture.level = level
        MAP_PINS.SetLayoutKey(PINS_UNKNOWN, "level", level)
        MAP_PINS.SetLayoutKey(PINS_COLLECTED, "level", level)
        MAP_PINS.RefreshPins(PINS_UNKNOWN)
        MAP_PINS.RefreshPins(PINS_COLLECTED)
      },
      disabled: pinControlsDisabled,
      default: defaults.pinTexture.level,
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_SKYSHARDS_UNKNOWN),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_UNKNOWN_DESC),
      getFunc: () => filterEnabled(PINS_UNKNOWN),
      setFunc: (state) => {
        db.filters[PINS_UNKNOWN] = state
        MAP_PINS.SetEnabled(PINS_UNKNOWN, state)
      },
      default: defaultFilter(PINS_UNKNOWN),
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_SKYSHARDS_COLLECTED),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_COLLECTED_DESC),
      getFunc: () => filterEnabled(PINS_COLLECTED),
      setFunc: (state) => {
        db.filters[PINS_COLLECTED] = state
        MAP_PINS.SetEnabled(PINS_COLLECTED, state)
      },
      default: defaultFilter(PINS_COLLECTED),
    },
    {
      type: "checkbox",
      name: GetString(SI_TEMPER_SKYSHARDS_COMPASS_UNKNOWN),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_COMPASS_UNKNOWN_DESC),
      getFunc: () => filterEnabled(PINS_COMPASS),
      setFunc: (state) => {
        db.filters[PINS_COMPASS] = state
        COMPASS_PINS.RefreshPins(PINS_COMPASS)
      },
      default: defaultFilter(PINS_COMPASS),
    },
    {
      type: "slider",
      name: GetString(SI_TEMPER_SKYSHARDS_COMPASS_DIST),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_COMPASS_DIST_DESC),
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
      name: GetString(SI_TEMPER_SKYSHARDS_MAINWORLD),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_MAINWORLD_DESC),
      getFunc: () => {
        return getMainworldColor().UnpackRGBA()
      },
      setFunc: (r, g, b, a) => {
        const color = getMainworldColor()
        color.SetRGBA(r, g, b, a ?? 1)
        db.mainworldSkyshards = color.ToHex()
        MAP_PINS.RefreshPins()
        COMPASS_PINS.RefreshPins(PINS_COMPASS)
      },
      default: ZO_SELECTED_TEXT,
    },
    dropdown({
      name: GetString(SI_TEMPER_SKYSHARDS_IMMERSIVE),
      tooltip: GetString(SI_TEMPER_SKYSHARDS_IMMERSIVE_DESC),
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
    name: GetString(SI_TEMPER_SKYSHARDS_TITLE),
    displayName: "|cFFFFB0" + GetString(SI_TEMPER_SKYSHARDS_TITLE) + "|r",
    version: ADDON_VERSION,
    slashCommand: "/skyshards",
    registerForRefresh: true,
    registerForDefaults: false,
  }
  const settingsPanel = registerPanel(LAM, OPTIONS_PANEL_ID, panelData, buildOptionsTable())

  whenPanelControlsCreated(CALLBACK_MANAGER, settingsPanel, createAllIconPreviews)
}
