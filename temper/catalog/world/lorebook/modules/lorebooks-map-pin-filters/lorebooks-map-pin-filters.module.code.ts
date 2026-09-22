import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  PINS_BOOKSHELF,
  PINS_COLLECTED,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  filterDefault,
  filterValue,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-filter-flags/lorebooks-filter-flags.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

export function addMapPinFilterOptions(this: void, optionsTable: unknown[]): undefined {
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_UNKNOWN),
    tooltip: GetString(LBOOKS_UNKNOWN_DESC),
    getFunc: (): boolean => filterValue(PINS_UNKNOWN),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_UNKNOWN] = shown
      MAP_PINS.SetEnabled(PINS_UNKNOWN, shown)
    },
    default: filterDefault(PINS_UNKNOWN),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_COLLECTED),
    tooltip: GetString(LBOOKS_COLLECTED_DESC),
    getFunc: (): boolean => filterValue(PINS_COLLECTED),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_COLLECTED] = shown
      MAP_PINS.SetEnabled(PINS_COLLECTED, shown)
    },
    default: filterDefault(PINS_COLLECTED),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_EIDETIC),
    tooltip: GetString(LBOOKS_EIDETIC_DESC),
    getFunc: (): boolean => filterValue(PINS_EIDETIC),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_EIDETIC] = shown
      MAP_PINS.SetEnabled(PINS_EIDETIC, shown)
    },
    default: filterDefault(PINS_EIDETIC),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_EIDETIC_COLLECTED),
    tooltip: GetString(LBOOKS_EIDETIC_COLLECTED_DESC),
    getFunc: (): boolean => filterValue(PINS_EIDETIC_COLLECTED),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_EIDETIC_COLLECTED] = shown
      MAP_PINS.SetEnabled(PINS_EIDETIC_COLLECTED, shown)
    },
    default: filterDefault(PINS_EIDETIC_COLLECTED),
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_BOOKSHELF_NAME),
    tooltip: GetString(LBOOKS_BOOKSHELF_DESC),
    getFunc: (): boolean => filterValue(PINS_BOOKSHELF),
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().filters[PINS_BOOKSHELF] = shown
      MAP_PINS.SetEnabled(PINS_BOOKSHELF, shown)
    },
    default: filterDefault(PINS_BOOKSHELF),
  } satisfies LamCheckboxData
}
