import { valueDropdown } from "@akasha/temper-settings-panel/dropdown"
import { compassLayout } from "../lorebooks-compass-pins/lorebooks-compass-pins.module.code.ts"
import {
  LORE_LIBRARY_EIDETIC,
  PIN_ICON_ESOHEAD,
  PIN_ICON_REAL,
  PIN_ICON_SET1,
  PIN_ICON_SET2,
  PIN_TEXTURES,
  PINS_BOOKSHELF,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_COMPASS_EIDETIC,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  DEFAULTS,
  getSavedVariables,
} from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import {
  asControl,
  asIconControl,
  asLamPanelInternal,
  asRefreshableControl,
  type IconControl,
} from "../lorebooks-settings-types/lorebooks-settings-types.module.code.ts"

const LMP = LibMapPins

export function addPinAppearanceOptions(
  this: void,
  optionsTable: unknown[],
  getPanelControl: () => unknown
): undefined {
  const pinTexturesValues: readonly number[] = [
    PIN_ICON_REAL,
    PIN_ICON_SET1,
    PIN_ICON_SET2,
    PIN_ICON_ESOHEAD,
  ]
  const pinTexturesList: readonly string[] = [
    GetString(LBOOKS_PIN_TEXTURE1),
    GetString(LBOOKS_PIN_TEXTURE2),
    GetString(LBOOKS_PIN_TEXTURE3),
    GetString(LBOOKS_PIN_TEXTURE4),
  ]
  const pinTextures = PIN_TEXTURES
  const textureRow = (type: number): readonly [string, string] => pinTextures[type] ?? ["", ""]
  const collectedTexture = (type: number): string => textureRow(type)[0]
  const unknownTexture = (type: number): string => textureRow(type)[1]

  let unknownIcon: IconControl | undefined
  let collectedIcon: IconControl | undefined
  let unknownIconEidetic: IconControl | undefined
  let collectedIconEidetic: IconControl | undefined

  const createIcons = (panel: unknown): undefined => {
    if (panel === getPanelControl()) {
      const internalPanel = asLamPanelInternal(panel)
      const db = getSavedVariables()
      const textureHost = asRefreshableControl(internalPanel.controlsToRefresh[1])
      const eideticHost = asRefreshableControl(internalPanel.controlsToRefresh[3])

      unknownIcon = asIconControl(
        WINDOW_MANAGER.CreateControl(undefined, asControl(textureHost), CT_TEXTURE)
      )
      unknownIcon.SetAnchor(RIGHT, textureHost.combobox, LEFT, -10, 0)
      unknownIcon.SetTexture(unknownTexture(db.pinTexture.type))
      unknownIcon.SetDimensions(db.pinTexture.size, db.pinTexture.size)
      collectedIcon = asIconControl(
        WINDOW_MANAGER.CreateControl(undefined, asControl(textureHost), CT_TEXTURE)
      )
      collectedIcon.SetAnchor(RIGHT, unknownIcon, LEFT, -5, 0)
      collectedIcon.SetTexture(collectedTexture(db.pinTexture.type))
      collectedIcon.SetDimensions(db.pinTexture.size, db.pinTexture.size)
      collectedIcon.SetDesaturation(db.pinTexture.type === PIN_ICON_REAL ? 1 : 0)

      unknownIconEidetic = asIconControl(
        WINDOW_MANAGER.CreateControl(undefined, asControl(eideticHost), CT_TEXTURE)
      )
      unknownIconEidetic.SetAnchor(RIGHT, eideticHost.combobox, LEFT, -10, 0)
      unknownIconEidetic.SetTexture(unknownTexture(db.pinTextureEidetic))
      unknownIconEidetic.SetDimensions(db.pinTexture.size, db.pinTexture.size)
      collectedIconEidetic = asIconControl(
        WINDOW_MANAGER.CreateControl(undefined, asControl(eideticHost), CT_TEXTURE)
      )
      collectedIconEidetic.SetAnchor(RIGHT, unknownIconEidetic, LEFT, -5, 0)
      collectedIconEidetic.SetTexture(collectedTexture(db.pinTextureEidetic))
      collectedIconEidetic.SetDimensions(db.pinTexture.size, db.pinTexture.size)
      collectedIconEidetic.SetDesaturation(db.pinTextureEidetic === PIN_ICON_REAL ? 1 : 0)

      CALLBACK_MANAGER.UnregisterCallback("LAM-PanelControlsCreated", createIcons)
    }
  }
  CALLBACK_MANAGER.RegisterCallback("LAM-PanelControlsCreated", createIcons)

  const setLayoutKeyAndRefresh = (pin: string, key: string, value: unknown): undefined => {
    LMP.SetLayoutKey(pin, key, value)
    LMP.RefreshPins(pin)
  }

  optionsTable[optionsTable.length] = valueDropdown<number>({
    name: GetString(LBOOKS_PIN_TEXTURE),
    tooltip: GetString(LBOOKS_PIN_TEXTURE_DESC),
    choices: pinTexturesList,
    values: pinTexturesValues,
    get: (): number => getSavedVariables().pinTexture.type,
    set: (value: number): undefined => {
      getSavedVariables().pinTexture.type = value
      unknownIcon?.SetTexture(unknownTexture(value))
      collectedIcon?.SetDesaturation(value === DEFAULTS.pinTexture.type ? 1 : 0)
      collectedIcon?.SetTexture(collectedTexture(value))
      LMP.RefreshPins(PINS_UNKNOWN)
      LMP.RefreshPins(PINS_COLLECTED)
      compassLayout(PINS_COMPASS).texture = unknownTexture(value)
      COMPASS_PINS.RefreshPins(PINS_COMPASS)
    },
    default: DEFAULTS.pinTexture.type,
  })
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_PIN_GRAYSCALE),
    tooltip: GetString(LBOOKS_PIN_GRAYSCALE_DESC),
    getFunc: (): boolean => getSavedVariables().pinGrayscale,
    setFunc: (value: boolean): undefined => {
      getSavedVariables().pinGrayscale = value
    },
    disabled: (): boolean => getSavedVariables().pinTexture.type !== PIN_ICON_REAL,
    default: DEFAULTS.pinGrayscale,
  } satisfies LamCheckboxData
  const [eideticCategoryName] = GetLoreCategoryInfo(LORE_LIBRARY_EIDETIC)
  optionsTable[optionsTable.length] = valueDropdown<number>({
    name: zo_strformat(LBOOKS_PIN_TEXTURE_EIDETIC, eideticCategoryName),
    tooltip: GetString(LBOOKS_PIN_TEXTURE_DESC),
    choices: pinTexturesList,
    values: pinTexturesValues,
    get: (): number => getSavedVariables().pinTextureEidetic,
    set: (value: number): undefined => {
      getSavedVariables().pinTextureEidetic = value
      unknownIconEidetic?.SetTexture(unknownTexture(value))
      collectedIconEidetic?.SetDesaturation(value === DEFAULTS.pinTextureEidetic ? 1 : 0)
      collectedIconEidetic?.SetTexture(collectedTexture(value))
      LMP.RefreshPins(PINS_EIDETIC)
      LMP.RefreshPins(PINS_EIDETIC_COLLECTED)
      compassLayout(PINS_COMPASS_EIDETIC).texture = unknownTexture(value)
      COMPASS_PINS.RefreshPins(PINS_COMPASS_EIDETIC)
    },
    default: DEFAULTS.pinTextureEidetic,
  })
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_PIN_GRAYSCALE),
    tooltip: GetString(LBOOKS_PIN_GRAYSCALE_EIDETIC_DESC),
    getFunc: (): boolean => getSavedVariables().pinGrayscaleEidetic,
    setFunc: (value: boolean): undefined => {
      getSavedVariables().pinGrayscaleEidetic = value
    },
    disabled: (): boolean => getSavedVariables().pinTextureEidetic !== PIN_ICON_REAL,
    default: DEFAULTS.pinGrayscaleEidetic,
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "slider",
    name: GetString(LBOOKS_PIN_SIZE),
    tooltip: GetString(LBOOKS_PIN_SIZE_DESC),
    min: 10,
    max: 70,
    step: 1,
    getFunc: (): number => getSavedVariables().pinTexture.size,
    setFunc: (size: number): undefined => {
      getSavedVariables().pinTexture.size = size
      unknownIcon?.SetDimensions(size, size)
      collectedIcon?.SetDimensions(size, size)
      unknownIconEidetic?.SetDimensions(size, size)
      collectedIconEidetic?.SetDimensions(size, size)
      setLayoutKeyAndRefresh(PINS_UNKNOWN, "size", size)
      setLayoutKeyAndRefresh(PINS_COLLECTED, "size", size)
      setLayoutKeyAndRefresh(PINS_EIDETIC, "size", size)
      setLayoutKeyAndRefresh(PINS_EIDETIC_COLLECTED, "size", size)
    },
    disabled: (): boolean => {
      const filters = getSavedVariables().filters
      return !(
        filters[PINS_UNKNOWN] ||
        filters[PINS_COLLECTED] ||
        filters[PINS_EIDETIC] ||
        filters[PINS_EIDETIC_COLLECTED] ||
        filters[PINS_BOOKSHELF]
      )
    },
    default: DEFAULTS.pinTexture.size,
  } satisfies LamSliderData
  optionsTable[optionsTable.length] = {
    type: "slider",
    name: GetString(LBOOKS_PIN_LAYER),
    tooltip: GetString(LBOOKS_PIN_LAYER_DESC),
    min: 10,
    max: 200,
    step: 5,
    getFunc: (): number => getSavedVariables().pinTexture.level,
    setFunc: (level: number): undefined => {
      getSavedVariables().pinTexture.level = level
      setLayoutKeyAndRefresh(PINS_UNKNOWN, "level", level)
      setLayoutKeyAndRefresh(PINS_COLLECTED, "level", level)
      setLayoutKeyAndRefresh(PINS_EIDETIC, "level", level)
      setLayoutKeyAndRefresh(PINS_EIDETIC_COLLECTED, "level", level)
    },
    disabled: (): boolean => {
      const filters = getSavedVariables().filters
      return !(
        filters[PINS_UNKNOWN] ||
        filters[PINS_COLLECTED] ||
        filters[PINS_EIDETIC] ||
        filters[PINS_EIDETIC_COLLECTED] ||
        filters[PINS_BOOKSHELF]
      )
    },
    default: DEFAULTS.pinTexture.level,
  } satisfies LamSliderData
}
