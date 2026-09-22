import { getTreasureIcons } from "akasha/temper/addon/pages/world/collections/modules/treasure-api/treasure-api.module.code.ts"
import {
  type LamDropdownData,
  valueDropdown,
} from "akasha/temper/addon/shared/settings-panel/modules/dropdown/dropdown.module.code.ts"
import {
  header,
  type LamHeaderData,
} from "akasha/temper/addon/shared/settings-panel/modules/header/header.module.code.ts"
import { registerPanel } from "akasha/temper/addon/shared/settings-panel/modules/register-panel/register-panel.module.code.ts"
import {
  ADDON_DISPLAY_NAME,
  ADDON_NAME,
  getAddonAuthor,
  getAddonVersion,
  LOST_TREASURE_MARK_OPTIONS_ALL,
  LOST_TREASURE_MARK_OPTIONS_INVENTORY,
  LOST_TREASURE_MARK_OPTIONS_USING,
  LOST_TREASURE_PIN_TYPE_DATA,
  type MarkOption,
} from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-constants/lost-treasure-constants.module.code.ts"
import {
  disableDebug,
  enableDebug,
  getDebugState,
} from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-debug/lost-treasure-debug.module.code.ts"
import { createLogger } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-logger/lost-treasure-logger.module.code.ts"
import { markOnUsingClear } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-mark-on-using/lost-treasure-mark-on-using.module.code.ts"
import * as lostTreasure from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-opened-map/lost-treasure-opened-map.module.code.ts"
import * as pins from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-pins/lost-treasure-pins.module.code.ts"
import {
  getDefaults,
  getSavedVars,
} from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/catalog/world/lost-treasure/lost-treasure-string-ids/lost-treasure-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"

const logger = createLogger("settings")

type LamControl = LamHeaderData | LamDropdownData | Record<string, unknown>
type LamControlList = LamControlData[]

function asLamPanelData(value: unknown): LamPanelData {
  return value as LamPanelData
}

function asLamControlList(value: unknown): LamControlList {
  return value as LamControlList
}

const MARK_OPTIONS: {
  labels: string[]
  values: MarkOption[]
  tooltips: string[]
} = {
  labels: [
    GetString(SI_TEMPER_LOSTTREASURE_MARK_MAP_MENU_OPTION1),
    GetString(SI_TEMPER_LOSTTREASURE_MARK_MAP_MENU_OPTION2),
    GetString(SI_TEMPER_LOSTTREASURE_MARK_MAP_MENU_OPTION3),
  ],
  values: [
    LOST_TREASURE_MARK_OPTIONS_USING,
    LOST_TREASURE_MARK_OPTIONS_INVENTORY,
    LOST_TREASURE_MARK_OPTIONS_ALL,
  ],
  tooltips: [
    GetString(SI_TEMPER_LOSTTREASURE_MARK_OPTION1_TT),
    GetString(SI_TEMPER_LOSTTREASURE_MARK_OPTION2_TT),
    GetString(SI_TEMPER_LOSTTREASURE_MARK_OPTION3_TT),
  ],
}

const MINIMAP_SIZES: { labels: string[]; values: number[] } = {
  labels: [
    GetString(SI_GUILDSIZEATTRIBUTEVALUE1),
    GetString(SI_GUILDSIZEATTRIBUTEVALUE2),
    GetString(SI_GUILDSIZEATTRIBUTEVALUE3),
    GetString(SI_GUILDSIZEATTRIBUTEVALUE4),
  ],
  values: [200, 300, 400, 500],
}

export function initializeSettings(this: void): undefined {
  const db = getSavedVars()
  const defaults = getDefaults()
  const icons = getTreasureIcons()

  const panelData = {
    type: "panel",
    name: ADDON_NAME,
    displayName: ADDON_DISPLAY_NAME,
    author: getAddonAuthor(),
    version: tostring(getAddonVersion()),
    registerForRefresh: true,
    registerForDefaults: true,
  }

  const menu: LamControl[] = []

  function addSetting(this: void, data: LamControl): undefined {
    menu.push(data)
  }

  addSetting(db.GetLibAddonMenuAccountCheckbox())

  addSetting({
    type: "checkbox",
    name: SI_TEMPER_LOSTTREASURE_DEBUG,
    tooltip: SI_TEMPER_LOSTTREASURE_DEBUG_TT,
    getFunc: () => getDebugState(),
    setFunc: (value: boolean) => {
      if (value) {
        enableDebug()
      } else {
        disableDebug()
      }
    },
    default: false,
  })

  for (const [pinType] of pairs(db.pinTypes)) {
    addSetting(header(LOST_TREASURE_PIN_TYPE_DATA[pinType].name))
    addSetting({
      type: "checkbox",
      name: SI_QUEST_JOURNAL_SHOW_ON_MAP,
      tooltip: SI_TEMPER_LOSTTREASURE_SHOW_ON_MAP_TT,
      getFunc: () => db.pinTypes[pinType].showOnMap,
      setFunc: (value: boolean) => {
        db.pinTypes[pinType].showOnMap = value
        pins.setMapPinState(pinType, value)
      },
      default: defaults.pinTypes[pinType].showOnMap,
    })
    addSetting({
      type: "checkbox",
      name: SI_TEMPER_LOSTTREASURE_SHOW_ON_COMPASS,
      tooltip: SI_TEMPER_LOSTTREASURE_SHOW_ON_COMPASS_TT,
      getFunc: () => db.pinTypes[pinType].showOnCompass,
      setFunc: (value: boolean) => {
        db.pinTypes[pinType].showOnCompass = value
        pins.refreshCompassPinsFromPinType(pinType)
      },
      default: defaults.pinTypes[pinType].showOnCompass,
    })
    addSetting({
      type: "iconpicker",
      name: SI_GUILD_RANK_ICONS_DIALOG_HEADER,
      tooltip: SI_TEMPER_LOSTTREASURE_PIN_ICON_TT,
      choices: icons,
      getFunc: () => db.pinTypes[pinType].texture,
      setFunc: (value: string) => {
        db.pinTypes[pinType].texture = value
        pins.setLayoutKey(pinType, "texture", value)
        pins.setCompassPinTypeTexture(pinType, value)
        pins.refreshAllPinsFromPinType(pinType)
      },
      disabled: () => !db.pinTypes[pinType].showOnMap && !db.pinTypes[pinType].showOnCompass,
      default: defaults.pinTypes[pinType].texture,
    })
    addSetting({
      type: "slider",
      name: SI_TEMPER_LOSTTREASURE_PIN_SIZE,
      tooltip: SI_TEMPER_LOSTTREASURE_PIN_SIZE_TT,
      min: 12,
      max: 48,
      step: 2,
      decimals: 0,
      clampInput: true,
      readOnly: true,
      getFunc: () => db.pinTypes[pinType].size,
      setFunc: (value: number) => {
        db.pinTypes[pinType].size = value
        pins.setLayoutKey(pinType, "size", value)
        pins.refreshAllPinsFromPinType(pinType)
      },
      disabled: () => !db.pinTypes[pinType].showOnMap,
      default: defaults.pinTypes[pinType].size,
    })
    addSetting(
      valueDropdown<MarkOption>({
        name: GetString(SI_TEMPER_LOSTTREASURE_MARK_OPTION),
        tooltip: GetString(SI_TEMPER_LOSTTREASURE_MARK_OPTION_TT),
        choices: MARK_OPTIONS.labels,
        values: MARK_OPTIONS.values,
        choicesTooltips: MARK_OPTIONS.tooltips,
        get: () => db.pinTypes[pinType].markOption,
        set: (value) => {
          db.pinTypes[pinType].markOption = value
          markOnUsingClear()
          pins.refreshAllPinsFromPinType(pinType)
        },
        disabled: () => !db.pinTypes[pinType].showOnMap && !db.pinTypes[pinType].showOnCompass,
        default: defaults.pinTypes[pinType].markOption,
      })
    )
    addSetting({
      type: "slider",
      name: SI_TEMPER_LOSTTREASURE_PIN_LEVEL,
      tooltip: SI_TEMPER_LOSTTREASURE_PIN_LEVEL_TT,
      min: 0,
      max: 250,
      step: 1,
      decimals: 0,
      readOnly: true,
      getFunc: () => db.pinTypes[pinType].pinLevel,
      setFunc: (value: number) => {
        db.pinTypes[pinType].pinLevel = value
        pins.setLayoutKey(pinType, "level", value)
        pins.refreshAllPinsFromPinType(pinType)
      },
      disabled: () => !db.pinTypes[pinType].showOnMap,
      default: defaults.pinTypes[pinType].pinLevel,
    })
    addSetting({
      type: "slider",
      name: SI_TEMPER_LOSTTREASURE_MARKER_DELAY,
      tooltip: SI_TEMPER_LOSTTREASURE_MARKER_DELAY_TT,
      min: 0,
      max: 60,
      step: 1,
      decimals: 0,
      readOnly: true,
      getFunc: () => db.pinTypes[pinType].deletionDelay,
      setFunc: (value: number) => {
        db.pinTypes[pinType].deletionDelay = value
      },
      disabled: () => !db.pinTypes[pinType].showOnMap && !db.pinTypes[pinType].showOnCompass,
      default: defaults.pinTypes[pinType].deletionDelay,
    })
  }

  addSetting(header(GetString(SI_TEMPER_LOSTTREASURE_SHOW_MINIMAP_HEADER)))
  addSetting({
    type: "checkbox",
    name: SI_TEMPER_LOSTTREASURE_SHOW_MINIMAP,
    tooltip: SI_TEMPER_LOSTTREASURE_SHOW_MINIMAP_TT,
    getFunc: () => db.miniMap.enabled,
    setFunc: (value: boolean) => {
      db.miniMap.enabled = value
    },
    default: defaults.miniMap.enabled,
  })
  addSetting(
    valueDropdown<number>({
      name: GetString(SI_TEMPER_LOSTTREASURE_SHOW_MINIMAP_SIZE),
      choices: MINIMAP_SIZES.labels,
      values: MINIMAP_SIZES.values,
      get: () => db.miniMap.size,
      set: (value) => {
        db.miniMap.size = value
        lostTreasure.setMiniMapAnchor()
      },
      disabled: () => !db.miniMap.enabled,
      default: defaults.miniMap.size,
    })
  )
  addSetting({
    type: "slider",
    name: SI_TEMPER_LOSTTREASURE_SHOW_MINIMAP_DELAY,
    tooltip: SI_TEMPER_LOSTTREASURE_SHOW_MINIMAP_DELAY_TT,
    min: 0,
    max: 60,
    step: 1,
    decimals: 0,
    readOnly: true,
    getFunc: () => db.miniMap.deletionDelay,
    setFunc: (value: number) => {
      db.miniMap.deletionDelay = value
    },
    default: defaults.miniMap.deletionDelay,
  })

  const globalPanelName = ADDON_NAME + "LAMSettings"
  registerPanel(TemperAddonMenu, globalPanelName, asLamPanelData(panelData), asLamControlList(menu))

  logger.Debug("initialized")
}
