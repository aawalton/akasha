import { asComboBoxBaseClass } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastMDropdownObjectIsOwnedByComboBoxThisVoidCombo } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastRecordNumberRecordStringUnknown,
  asLsmCastRecordStringString,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
  asLsmCastRecordStringUnknownUndefined2,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidContextMenuObject } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asString } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  getContextMenu,
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const ENTRY_TYPE_DEFAULTS = asLsmCastRecordStringUnknown(entryTypeConstants.defaults)
const entryTypeDefaultsHighlights = asLsmCastRecordStringUnknown(ENTRY_TYPE_DEFAULTS.highlights)

const subTableConstants = asLsmCastRecordStringString(
  asLsmCastRecordStringUnknown(constants.data).subtables
)
const ST_LSM_DATA_SUBTABLE = asString(subTableConstants.LSM_DATA_SUBTABLE)
const ST_LSM_DATA_SUBTABLE_ORIGINAL_DATA = asString(
  subTableConstants.LSM_DATA_SUBTABLE_ORIGINAL_DATA
)

const libUtil = lib.Util
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(libUtil.getContextMenuReference)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

comboBox_base.GetHighlightTemplate = function (
  this: ComboBoxBase,
  control: Control | undefined
): unknown {
  const controlData =
    control !== undefined
      ? asLsmCastRecordStringUnknownUndefined2(asLsmCastRecordStringUnknown(control).m_data)
      : undefined
  const highlightTemplate =
    (control && controlData?.m_highlightTemplate) || this.m_highlightTemplate || undefined
  return highlightTemplate
}

comboBox_base.GetHighlightTemplateData = function (
  this: ComboBoxBase,
  control: Control,
  _m_data: unknown,
  isSubMenu: unknown,
  _isContextMenu: unknown
): Record<string, unknown> | undefined {
  setContextMenu(getContextMenuReference())
  const controlTbl = asLsmCastRecordStringUnknown(control)
  const entryType = asLsmCastNumberUndefined(controlTbl.typeId)

  if (entryType === undefined) {
    return
  }

  const appliedHighlightTemplate = this.GetHighlightTemplate(control)
  const appliedHighlightTemplateCopy = appliedHighlightTemplate
  const xmlRowHighlightTemplates = asLsmCastRecordNumberRecordStringUnknown(
    this.XMLRowHighlightTemplates
  )
  const highlightTemplateData = asLsmCastRecordStringUnknown(
    (xmlRowHighlightTemplates[entryType] !== undefined &&
      ZO_ShallowTableCopy(xmlRowHighlightTemplates[entryType])) ||
      appliedHighlightTemplateCopy ||
      ZO_ShallowTableCopy(entryTypeDefaultsHighlights.defaultHighlightTemplateData)
  )
  highlightTemplateData.overwriteHighlightTemplate =
    highlightTemplateData.overwriteHighlightTemplate || false

  const options = asLsmCastRecordStringUnknownUndefined(this.GetOptions())
  const data = getControlData(control)

  if (data) {
    const lsmSub = asLsmCastRecordStringUnknownUndefined(data[ST_LSM_DATA_SUBTABLE])
    const origSub =
      lsmSub && asLsmCastRecordStringUnknownUndefined(lsmSub[ST_LSM_DATA_SUBTABLE_ORIGINAL_DATA])
    const origData = lsmSub && origSub && asLsmCastRecordStringUnknownUndefined(origSub.data)
    if (origData) {
      if (origData.m_highlightTemplate || origData.m_highlightColor) {
        const origHighlightTemplateData: Record<string, unknown> = {}
        origHighlightTemplateData.template = origData.m_highlightTemplate
        origHighlightTemplateData.color =
          origData.m_highlightColor || entryTypeDefaultsHighlights.defaultHighlightColor

        origHighlightTemplateData.overwriteHighlightTemplate = true

        return origHighlightTemplateData
      }
    }
  }

  if (isSubMenu && controlTbl.closeOnSelect) {
    if (options && !options.useDefaultHighlightForSubmenuWithCallback) {
      highlightTemplateData.template =
        (highlightTemplateData.templateSubMenuWithCallback !== undefined &&
          highlightTemplateData.templateSubMenuWithCallback) ||
        appliedHighlightTemplateCopy ||
        asLsmCastRecordStringUnknown(
          ZO_ShallowTableCopy(
            entryTypeDefaultsHighlights.defaultHighlightTemplateDataEntryHavingSubMenuWithCallback
          )
        ).template
    }
  } else {
    const isContextMenuAndHighlightContextMenuOpeningControl =
      (options !== undefined && options.highlightContextMenuOpeningControl === true) ||
      this.highlightContextMenuOpeningControl === true
    if (isContextMenuAndHighlightContextMenuOpeningControl) {
      const comboBox = controlTbl.m_owner
      const gotRightClickCallback =
        (data !== undefined &&
          comboBox !== undefined &&
          (data.contextMenuCallback !== undefined || data.rightClickCallback !== undefined) &&
          true) ||
        false
      const gContextMenu = getContextMenu()
      const isOwnedByContextMenuComboBox =
        asLsmCastMDropdownObjectIsOwnedByComboBoxThisVoidCombo(
          gContextMenu
        ).m_dropdownObject.IsOwnedByComboBox(comboBox)

      if (gotRightClickCallback && !isOwnedByContextMenuComboBox) {
        highlightTemplateData.template =
          (highlightTemplateData.templateContextMenuOpeningControl !== undefined &&
            highlightTemplateData.templateContextMenuOpeningControl) ||
          appliedHighlightTemplateCopy ||
          asLsmCastRecordStringUnknown(
            ZO_ShallowTableCopy(
              entryTypeDefaultsHighlights.defaultHighlightTemplateDataEntryContextMenuOpeningControl
            )
          ).template
        highlightTemplateData.overwriteHighlightTemplate = true
      }
    }
  }
  return highlightTemplateData
}

comboBox_base.UpdateHighlightTemplate = function (
  this: ComboBoxBase,
  control: Control,
  data: unknown,
  isSubMenu: unknown,
  isContextMenu: unknown
): undefined {
  isContextMenu = isContextMenu || this.isContextMenu
  const highlightTemplateData = this.GetHighlightTemplateData(
    control,
    data,
    isSubMenu,
    isContextMenu
  )
  const highlightTemplate = highlightTemplateData?.template || undefined
  const controlData = asLsmCastRecordStringUnknownUndefined2(
    asLsmCastRecordStringUnknown(control).m_data
  )
  if (controlData) {
    if (highlightTemplateData === undefined) {
      controlData.m_highlightTemplate = undefined
      controlData.m_highlightColor = undefined
    } else if (
      highlightTemplateData.overwriteHighlightTemplate === true ||
      !controlData.m_highlightTemplate
    ) {
      controlData.m_highlightTemplate = highlightTemplate
      controlData.m_highlightColor = highlightTemplateData.color
    }
  }
}
