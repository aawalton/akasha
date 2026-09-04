import {
  PINS_COMPASS,
  PINS_COMPASS_BOOKSHELF,
  PINS_COMPASS_EIDETIC,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  filterDefault,
  filterValue,
} from "../lorebooks-filter-flags/lorebooks-filter-flags.module.code.ts"
import {
  DEFAULTS,
  getSavedVariables,
} from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"

export function compassLayout(this: void, key: string): CompassPinLayout {
  return COMPASS_PINS.pinLayouts[key] ?? {}
}

export function addCompassPinOptions(this: void, optionsTable: unknown[]): undefined {
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_COMPASS_UNKNOWN),
    tooltip: GetString(LBOOKS_COMPASS_UNKNOWN_DESC),
    getFunc: (): boolean => filterValue(PINS_COMPASS),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_COMPASS] = shown
      COMPASS_PINS.RefreshPins(PINS_COMPASS)
    },
    default: filterDefault(PINS_COMPASS),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_COMPASS_EIDETIC),
    tooltip: GetString(LBOOKS_COMPASS_EIDETIC_DESC),
    getFunc: (): boolean => filterValue(PINS_COMPASS_EIDETIC),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_COMPASS_EIDETIC] = shown
      COMPASS_PINS.RefreshPins(PINS_COMPASS_EIDETIC)
    },
    default: filterDefault(PINS_COMPASS_EIDETIC),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_COMPASS_BOOKSHELF_NAME),
    tooltip: GetString(LBOOKS_COMPASS_BOOKSHELF_DESC),
    getFunc: (): boolean => filterValue(PINS_COMPASS_BOOKSHELF),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_COMPASS_BOOKSHELF] = shown
      COMPASS_PINS.RefreshPins(PINS_COMPASS_BOOKSHELF)
    },
    default: filterDefault(PINS_COMPASS_BOOKSHELF),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "slider",
    name: GetString(LBOOKS_COMPASS_DIST),
    tooltip: GetString(LBOOKS_COMPASS_DIST_DESC),
    min: 1,
    max: 100,
    step: 1,
    getFunc: (): number => getSavedVariables().compassMaxDistance * 1000,
    setFunc: (maxDistance: number): undefined => {
      getSavedVariables().compassMaxDistance = maxDistance / 1000
      compassLayout(PINS_COMPASS).maxDistance = maxDistance / 1000
      COMPASS_PINS.RefreshPins(PINS_COMPASS)
      compassLayout(PINS_COMPASS_EIDETIC).maxDistance = maxDistance / 1000
      COMPASS_PINS.RefreshPins(PINS_COMPASS_EIDETIC)
      compassLayout(PINS_COMPASS_BOOKSHELF).maxDistance = maxDistance / 1000
      COMPASS_PINS.RefreshPins(PINS_COMPASS_BOOKSHELF)
    },
    disabled: (): boolean => {
      const filters = getSavedVariables().filters
      return !(
        filters[PINS_COMPASS] ||
        filters[PINS_COMPASS_EIDETIC] ||
        filters[PINS_COMPASS_BOOKSHELF]
      )
    },
    default: DEFAULTS.compassMaxDistance * 1000,
  } satisfies LamSliderData
}
