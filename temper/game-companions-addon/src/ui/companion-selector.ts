import {
  ARMOR_SLOTS,
  captureCompanionBuild,
  encodeCompanionBuild,
  JEWELRY_SLOTS,
  SKILL_SLOT_INDICES,
  WEAPON_SLOTS,
} from "../codec/companion-codec"
import { ADDON_NAME } from "../constants"
import { ALL_COMPANION_IDS } from "../generated/companion-mappings.generated"
import {
  ensureCompanionEntry,
  getSavedVariables,
  type SavedCompanionBuild,
  type SavedCompanionEquipmentSlot,
} from "../saved-variables"
import {
  FormatArmorSlot,
  FormatJewelrySlot,
  FormatWeaponSlot,
  GetQualityColorForSlot,
} from "./companion-equipment-formatters"
export const DROPDOWN_HEIGHT = 30
export const DROPDOWN_WIDTH = 200
export const DROPDOWN_BOTTOM_MARGIN = 12
export const COMPANION_DROPDOWN_LEFT = 170

export function getCleanCompanionName(companionId: number): string {
  return zo_strformat("<<1>>", GetCompanionName(companionId))
}

export let selectedId: number | undefined
export let syncing = false

export const dropdownInstances: ComboBox[] = []

export function CreateCompanionDropdown(parent: Control): Control {
  const container = WINDOW_MANAGER.CreateControlFromVirtual(
    `${ADDON_NAME}_CompDropdown${dropdownInstances.length}`,
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

  dropdownInstances.push(comboBox)
  return container
}

export function syncComboBoxToCompanionId(comboBox: ComboBox, companionId: number): undefined {
  syncing = true
  const name = getCleanCompanionName(companionId)
  const items = comboBox.GetItems()
  for (const item of items) {
    if (item.name === name) {
      comboBox.SelectItem(item)
      break
    }
  }
  syncing = false
}

export function setSelectedCompanionId(companionId: number): undefined {
  if (syncing) return

  selectedId = companionId

  getSavedVariables().selectedCompanionId = companionId

  for (const comboBox of dropdownInstances) {
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
      displayText: FormatArmorSlot(slot),
      qualityColor: GetQualityColorForSlot(slot),
      isEmpty,
    })
  }

  const jewelry: SavedCompanionEquipmentSlot[] = []
  for (const slot of JEWELRY_SLOTS) {
    const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
    const isEmpty = itemLink === ""
    jewelry.push({
      displayText: FormatJewelrySlot(slot),
      qualityColor: GetQualityColorForSlot(slot),
      isEmpty,
    })
  }

  const weapons: SavedCompanionEquipmentSlot[] = []
  for (const slot of WEAPON_SLOTS) {
    const itemLink = GetItemLink(BAG_COMPANION_WORN, slot, LINK_STYLE_DEFAULT)
    const isEmpty = itemLink === ""
    weapons.push({
      displayText: FormatWeaponSlot(slot),
      qualityColor: GetQualityColorForSlot(slot),
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
    for (const comboBox of dropdownInstances) {
      syncComboBoxToCompanionId(comboBox, restored)
    }
  }
}
