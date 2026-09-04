import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import {
  ARMOR_SLOTS,
  captureCompanionBuild,
  encodeCompanionBuild,
  JEWELRY_SLOTS,
  SKILL_SLOT_INDICES,
  WEAPON_SLOTS,
} from "../companions-codec/companions-codec.module.code.ts"
import { ADDON_NAME } from "../companions-constants/companions-constants.module.code.ts"
import {
  formatArmorSlot,
  formatJewelrySlot,
  formatWeaponSlot,
  getQualityColorForSlot,
} from "../companions-equipment-formatters/companions-equipment-formatters.module.code.ts"
import { ALL_COMPANION_IDS } from "../companions-id-map/companions-id-map.module.code.ts"
import {
  ensureCompanionEntry,
  getSavedVariables,
  type SavedCompanionBuild,
  type SavedCompanionEquipmentSlot,
} from "../companions-saved-variables/companions-saved-variables.module.code.ts"
export const DROPDOWN_HEIGHT = 30
export const DROPDOWN_WIDTH = 200
export const DROPDOWN_BOTTOM_MARGIN = 12
export const COMPANION_DROPDOWN_LEFT = 170

export function getCleanCompanionName(companionId: number): string {
  return zo_strformat("<<1>>", GetCompanionName(companionId))
}

export let selectedId: number | undefined
export let SYNCING = false

export const DROPDOWN_INSTANCES: ComboBox[] = []

export function createCompanionDropdown(parent: Control): Control {
  const container = WINDOW_MANAGER.CreateControlFromVirtual(
    `${ADDON_NAME}_CompDropdown${DROPDOWN_INSTANCES.length}`,
    parent,
    "ZO_ComboBox"
  )
  container.SetDimensions(DROPDOWN_WIDTH, DROPDOWN_HEIGHT)
  container.SetAnchor(TOPLEFT, parent, TOPLEFT, COMPANION_DROPDOWN_LEFT, 0)

  const comboBox = ZO_ComboBox_ObjectFromContainer(container)

  for (const companionId of ALL_COMPANION_IDS) {
    const name = getCleanCompanionName(companionId)
    const entry = comboBox.CreateItemEntry(name, function (this: void): undefined {
      setSelectedCompanionId(companionId)
    })
    comboBox.AddItem(entry)
  }

  if (selectedId !== undefined) {
    syncComboBoxToCompanionId(comboBox, selectedId)
  }

  DROPDOWN_INSTANCES.push(comboBox)
  return container
}

export function syncComboBoxToCompanionId(comboBox: ComboBox, companionId: number): undefined {
  SYNCING = true
  const name = getCleanCompanionName(companionId)
  const items = comboBox.GetItems()
  for (const item of items) {
    if (item.name === name) {
      comboBox.SelectItem(item)
      break
    }
  }
  SYNCING = false
}

export function setSelectedCompanionId(companionId: number): undefined {
  if (SYNCING) return

  selectedId = companionId

  getSavedVariables().selectedCompanionId = companionId

  for (const comboBox of DROPDOWN_INSTANCES) {
    syncComboBoxToCompanionId(comboBox, companionId)
  }

  TemperCharacters.TabManager.RefreshActivePanel()
}

export function getSelectedCompanionId(): number | undefined {
  return selectedId
}

export function getSavedCompanionBuild(companionId: number): SavedCompanionBuild | undefined {
  const savedVars = getSavedVariables()
  return savedVars.companions[companionId]?.build
}

export function isSelectedCompanionActive(): boolean {
  if (selectedId === undefined) return false
  if (!HasActiveCompanion()) return false
  return GetActiveCompanionDefId() === selectedId
}

export function captureAndSaveActiveCompanionBuild(): undefined {
  if (!HasActiveCompanion()) return

  const companionId = GetActiveCompanionDefId()
  const build = captureCompanionBuild()
  if (!build) return

  const hash = encodeCompanionBuild(build)

  const armor: SavedCompanionEquipmentSlot[] = []
  for (const slot of ARMOR_SLOTS) {
    const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
    const isEmpty = itemLink === ""
    armor.push({
      displayText: formatArmorSlot(slot),
      qualityColor: getQualityColorForSlot(slot),
      isEmpty,
    })
  }

  const jewelry: SavedCompanionEquipmentSlot[] = []
  for (const slot of JEWELRY_SLOTS) {
    const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
    const isEmpty = itemLink === ""
    jewelry.push({
      displayText: formatJewelrySlot(slot),
      qualityColor: getQualityColorForSlot(slot),
      isEmpty,
    })
  }

  const weapons: SavedCompanionEquipmentSlot[] = []
  for (const slot of WEAPON_SLOTS) {
    const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
    const isEmpty = itemLink === ""
    weapons.push({
      displayText: formatWeaponSlot(slot),
      qualityColor: getQualityColorForSlot(slot),
      isEmpty,
    })
  }

  const mainHandWeaponType = GetItemWeaponType(BAG_COMPANION_WORN, EQUIP_SLOT_MAIN_HAND)

  const skillAbilityIds: number[] = []
  for (const slotIndex of SKILL_SLOT_INDICES) {
    skillAbilityIds.push(GetSlotBoundId(slotIndex, HOTBAR_CATEGORY_COMPANION))
  }

  const savedBuild: SavedCompanionBuild = {
    hash,
    companionId,
    armor,
    jewelry,
    weapons,
    mainHandWeaponType,
    skillAbilityIds,
  }

  ensureCompanionEntry(companionId).build = savedBuild

  CALLBACK_MANAGER.FireCallbacks("Temper_CompanionBuildCaptured", hash, companionId)
}

export function restoreSelectedCompanionId(): undefined {
  const restored = getSavedVariables().selectedCompanionId
  if (restored !== undefined) {
    selectedId = restored
    for (const comboBox of DROPDOWN_INSTANCES) {
      syncComboBoxToCompanionId(comboBox, restored)
    }
  }
}
