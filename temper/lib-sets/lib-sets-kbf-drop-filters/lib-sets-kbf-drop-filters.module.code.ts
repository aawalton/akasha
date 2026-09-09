import { asNumber } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import type { FilterBuildContext } from "../lib-sets-kbf-filter-context/lib-sets-kbf-filter-context.module.code.ts"
import { LSM_DEFAULT_COMBO_BOX_OPTIONS } from "../lib-sets-kbf-lsm-options/lib-sets-kbf-lsm-options.module.code.ts"
import { sortFilterComboBox } from "../lib-sets-kbf-sorting/lib-sets-kbf-sorting.module.code.ts"
import {
  defaultMultiSelectSelectedText,
  setupFilterDropdown,
} from "../lib-sets-search-ui-keyboard-filters-setup/lib-sets-search-ui-keyboard-filters-setup.module.code.ts"

const lib = LibSets
const zoitf = zo_iconTextFormat
const getLocalizedText = lib.GetLocalizedText
const getDropMechanicTexture = lib.GetDropMechanicTexture
const libSets_GetSpecialZoneNameById = lib.GetSpecialZoneNameById

export function buildDropZoneFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("dropZones")
  const dropZoneDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.dropZoneFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: true,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.dropZoneFiltersDropdown = dropZoneDropdown
  const dropZoneIds = lib.GetAllDropZones()
  if (dropZoneIds !== undefined) {
    for (const [dropZoneId, isValid] of pairs(dropZoneIds)) {
      if (isValid === true) {
        const dropZoneIdNum = asNumber(dropZoneId)
        let dropZoneName: string | undefined
        let zoneDesc: string | undefined
        let filterType: number
        if (dropZoneIdNum <= 0) {
          dropZoneName = libSets_GetSpecialZoneNameById(dropZoneIdNum)
          filterType = dropZoneIdNum
        } else {
          dropZoneName = zo_strformat(SI_UNIT_NAME, GetZoneNameById(dropZoneIdNum))
          zoneDesc = GetZoneDescriptionById(dropZoneIdNum)
          filterType = dropZoneIdNum
        }
        const entry = dropZoneDropdown.CreateItemEntry(dropZoneName ?? "")
        if (zoneDesc !== undefined && zoneDesc !== "") {
          entry.tooltipText = zoneDesc
        }
        entry.filterType = filterType
        dropZoneDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
      }
    }
    dropZoneDropdown.UpdateItems()
  }
}

export function buildDropMechanicFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("dropMechanic")
  const dropMechanicsDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.dropMechanicsFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: false,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.dropMechanicsFiltersDropdown = dropMechanicsDropdown
  for (const [dropMechanicId, isValid] of pairs(lib.allowedDropMechanics)) {
    if (isValid === true) {
      const [dropMechanicName, dropMechanicTooltip] = lib.GetDropMechanicName(
        asNumber(dropMechanicId)
      )
      let dropMechnicNameStr = dropMechanicName ?? ""
      const dropMechnicTexture = getDropMechanicTexture(asNumber(dropMechanicId))
      if (dropMechnicTexture !== undefined) {
        dropMechnicNameStr = zoitf(dropMechnicTexture, 24, 24, dropMechanicName ?? "", undefined)
      }
      const entry = dropMechanicsDropdown.CreateItemEntry(dropMechnicNameStr)
      if (dropMechanicTooltip !== undefined && dropMechanicTooltip !== "") {
        entry.tooltipText = dropMechanicTooltip
      }
      entry.filterType = asNumber(dropMechanicId)
      entry.nameClean = dropMechanicName
      dropMechanicsDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
    }
  }
  sortFilterComboBox(dropMechanicsDropdown, "nameClean")
}

export function buildDropLocationFilter(this: void, ctx: FilterBuildContext): undefined {
  const { self, filters, isLSMEnabled, onEnter, onExit } = ctx
  const filterTypeText = getLocalizedText("droppedBy")
  const dropLocationsDropdown = setupFilterDropdown({
    self,
    filters,
    control: self.dropLocationsFiltersControl,
    filterTypeText,
    multiSelectSelectedText: defaultMultiSelectSelectedText(filterTypeText),
    sortsItems: true,
    lsmOptions: LSM_DEFAULT_COMBO_BOX_OPTIONS,
    isLSMEnabled,
    onEnter,
    onExit,
  })
  self.dropLocationsFiltersDropdown = dropLocationsDropdown
  const dropLocationNamesInClientLang = lib.GetAllDropLocationNames()
  if (dropLocationNamesInClientLang !== undefined) {
    for (const [, dropLocationName] of pairs(dropLocationNamesInClientLang)) {
      if (dropLocationName !== undefined && dropLocationName !== "") {
        const entry = dropLocationsDropdown.CreateItemEntry(dropLocationName)
        entry.filterType = dropLocationName
        entry.nameClean = dropLocationName
        dropLocationsDropdown.AddItem(entry, ZO_COMBOBOX_SUPPRESS_UPDATE)
      }
    }
    sortFilterComboBox(dropLocationsDropdown, "nameClean")
  }
}
