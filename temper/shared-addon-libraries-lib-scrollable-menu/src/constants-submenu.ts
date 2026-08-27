import { asLsmCastRecordStringUnknown } from "./casts-2b"
import { asString } from "./casts-4"

import {
  colors,
  constants,
  LSM_ENTRY_TYPE_BUTTON,
  LSM_ENTRY_TYPE_CHECKBOX,
  LSM_ENTRY_TYPE_EDITBOX,
  LSM_ENTRY_TYPE_HEADER,
  LSM_ENTRY_TYPE_NORMAL,
  LSM_ENTRY_TYPE_RADIOBUTTON,
  LSM_ENTRY_TYPE_SLIDER,
  LSM_ENTRY_TYPE_SUBMENU,
} from "./constants-core"

const submenuClass_exposedVariables: Record<string, boolean> = {
  m_customEntryTemplateInfos: false,
  m_height: false,
  m_containerWidth: true,
  m_enableMultiSelect: true,
  m_font: true,
  m_highlightColor: true,
  m_maxNumSelections: true,
  m_multiSelectItemData: true,
  m_overrideMaxSelectionsErrorText: true,
  multiSelectionTextFormatter: true,
  noSelectionText: true,
  onSelectionBlockedCallback: true,
  m_normalColor: true,
  m_selectedItemText: false,
  m_selectedItemData: false,
  m_isDropdownVisible: false,
  m_sortedItems: false,
  horizontalAlignment: true,
  m_container: true,
  m_disabledColor: true,
  m_name: true,
  m_openDropdown: true,
  m_preshowDropdownFn: true,
  m_selectedColor: true,
  m_sortsItems: true,
  m_sortOrder: true,
  m_sortType: true,
  m_spacing: true,
  headerCollapsed: false,
  headerCollapsible: false,
  headerIcon: false,
  disableFadeGradient: true,
  headerFont: true,
  headerColor: true,
  highlightContextMenuOpeningControl: true,
  options: true,
  maxDropdownHeight: true,
  maxDropdownWidth: true,
  minDropdownWidth: true,
  m_highlightTemplate: true,
  narrateData: true,
  submenuArrowColor: true,
  submenuOpenToSide: true,
  multiSelectSubmenuSelectedArrowColor: true,
  useDefaultHighlightForSubmenuWithCallback: true,
  visibleRowsSubmenu: true,
  XMLRowTemplates: true,
  XMLRowHighlightTemplates: true,
}
asLsmCastRecordStringUnknown(constants.submenu).submenuClass_exposedVariables =
  submenuClass_exposedVariables

const submenuClass_exposedFunctions: Record<string, boolean> = {
  SelectItem: true,
  IsItemSelected: true,
}
asLsmCastRecordStringUnknown(constants.submenu).submenuClass_exposedFunctions =
  submenuClass_exposedFunctions

const searchFilter: Record<string, unknown> = {}
constants.searchFilter = searchFilter

const noEntriesResults: Record<string, unknown> = {
  entryType: LSM_ENTRY_TYPE_NORMAL,
  enabled: false,
  name: GetString(SI_SORT_FILTER_LIST_NO_RESULTS) + "    ",
  m_disabledColor: colors.DEFAULT_TEXT_DISABLED_COLOR,
  callback: function (this: void): undefined {
    d("no entries found!")
  },
  selectable: false,
  isNoEntriesResult: true,
}
searchFilter.noEntriesResults = noEntriesResults

const noEntriesSubmenuResults: Record<string, unknown> = {
  entryType: LSM_ENTRY_TYPE_NORMAL,
  enabled: false,
  name: GetString(SI_QUICKSLOTS_EMPTY) + "    ",
  m_disabledColor: colors.DEFAULT_TEXT_DISABLED_COLOR,
  callback: function (this: void): undefined {
    d("no submenu entries found!")
  },
  selectable: false,
  isNoEntriesResult: true,
}
searchFilter.noEntriesSubmenuResults = noEntriesSubmenuResults

const filteredEntryTypes: Record<number, boolean> = {
  [LSM_ENTRY_TYPE_NORMAL]: true,
  [LSM_ENTRY_TYPE_SUBMENU]: true,
  [LSM_ENTRY_TYPE_CHECKBOX]: true,
  [LSM_ENTRY_TYPE_HEADER]: true,
  [LSM_ENTRY_TYPE_BUTTON]: true,
  [LSM_ENTRY_TYPE_RADIOBUTTON]: true,
  [LSM_ENTRY_TYPE_EDITBOX]: true,
  [LSM_ENTRY_TYPE_SLIDER]: true,
}
searchFilter.filteredEntryTypes = filteredEntryTypes

const filteredEntryTypsChildsToSearch: Record<number, unknown> = {
  [LSM_ENTRY_TYPE_EDITBOX]: {
    [1]: {
      dataTable: "editBoxData",
      dataName: "_EditBoxCtrl",
      getFunc: "GetText",
      getFuncReturnType: "string",
    },
  },
  [LSM_ENTRY_TYPE_SLIDER]: {
    [1]: {
      dataTable: "sliderData",
      dataName: "_SliderCtrl",
      getFunc: "GetValue",
      getFuncReturnType: "number",
    },
  },
}
searchFilter.filteredEntryTypsChildsToSearch = filteredEntryTypsChildsToSearch

const filterNamesExempts: Record<string, boolean> = {
  [""]: true,
  [asString(noEntriesSubmenuResults.name)]: true,
}
searchFilter.filterNamesExempts = filterNamesExempts

const origSoundComboClicked = SOUNDS.COMBO_CLICK
const origSoundDefaultClicked = SOUNDS.DEFAULT_CLICK
const soundClickedSilenced = SOUNDS.NONE
const defaultClick = "DEFAULT_CLICK"
const comboClick = "COMBO_CLICK"
constants.sounds = {
  origSoundComboClicked,
  origSoundDefaultClicked,
  soundClickedSilenced,
  defaultClick,
  comboClick,
  entryTypeToSilenceSoundName: {
    [LSM_ENTRY_TYPE_NORMAL]: comboClick,
    [LSM_ENTRY_TYPE_CHECKBOX]: defaultClick,
    [LSM_ENTRY_TYPE_BUTTON]: defaultClick,
    [LSM_ENTRY_TYPE_RADIOBUTTON]: defaultClick,
  },
  entryTypeToOriginalSelectedSound: {
    [LSM_ENTRY_TYPE_NORMAL]: origSoundComboClicked,
    [LSM_ENTRY_TYPE_CHECKBOX]: origSoundDefaultClicked,
    [LSM_ENTRY_TYPE_BUTTON]: origSoundDefaultClicked,
    [LSM_ENTRY_TYPE_RADIOBUTTON]: origSoundDefaultClicked,
  },
}
