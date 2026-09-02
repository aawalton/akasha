import { TEXT_SECONDARY, TEXT_TERTIARY } from "@akasha/design-tokens/text-color"
import { requireAt } from "@akasha/utils-narrow/require-at"
import {
  ARMOR_SLOTS,
  type CompanionBuildData,
  JEWELRY_SLOTS,
  WEAPON_SLOTS,
} from "../codec/companion-codec"
import { decodeCompanionBuild } from "../codec/companion-decoder"
import {
  formatArmorFromIndices,
  formatJewelryFromIndices,
  formatWeaponFromIndices,
  getQualityColorFromIndex,
  isWeaponIndexTwoHanded,
} from "../mappings/reverse-mappings"
import type { SavedCompanionBuild } from "../saved-variables"
import { type SlotUpgrade, scanForUpgrades, type UpgradeScanResult } from "../scan-upgrades"
import {
  FormatArmorSlot,
  FormatJewelrySlot,
  FormatWeaponSlot,
  GetQualityColorForSlot,
} from "./companion-equipment-formatters"
import {
  CreateEquipRowsForSection,
  type EquipmentRow,
  TWO_HANDED_TYPES,
} from "./companion-equipment-rows"
import {
  CreateCompanionDropdown,
  captureAndSaveActiveCompanionBuild,
  DROPDOWN_BOTTOM_MARGIN,
  DROPDOWN_HEIGHT,
  getCleanCompanionName,
  getSavedCompanionBuild,
  getSelectedCompanionId,
  isSelectedCompanionActive,
} from "./companion-selector"
import { SLOT_NAMES } from "./display-names"
import { getTargetBuildHash } from "./target-build-input"
export interface EquipmentPanelState {
  panel: Control
  noCompanionLabel: LabelControl
  dataContainer: Control
  armorRows: EquipmentRow[]
  jewelryRows: EquipmentRow[]
  weaponRows: EquipmentRow[]
  lastUpgradeScan: UpgradeScanResult | undefined
}

export let equipState: EquipmentPanelState | undefined

export function CreateCompanionEquipmentPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  CreateCompanionDropdown(panel)
  const contentTop = DROPDOWN_HEIGHT + DROPDOWN_BOTTOM_MARGIN

  const noCompanionLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
  noCompanionLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop + 20)
  noCompanionLabel.SetDimensions(400, 40)
  noCompanionLabel.SetFont("ZoFontGame")
  noCompanionLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
  noCompanionLabel.SetText("Summon a companion to view build details")
  noCompanionLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
  noCompanionLabel.SetHidden(true)

  const dataContainer = WINDOW_MANAGER.CreateControl(undefined, panel, CT_CONTROL)
  dataContainer.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, contentTop)
  dataContainer.SetAnchor(BOTTOMRIGHT, panel, BOTTOMRIGHT, 0, 0)
  dataContainer.SetHidden(true)

  let offsetY = 0

  const [armorRows, afterArmor] = CreateEquipRowsForSection(
    dataContainer,
    offsetY,
    "Armor",
    ARMOR_SLOTS
  )
  offsetY = afterArmor

  const [jewelryRows, afterJewelry] = CreateEquipRowsForSection(
    dataContainer,
    offsetY,
    "Jewelry",
    JEWELRY_SLOTS
  )
  offsetY = afterJewelry

  const [weaponRows] = CreateEquipRowsForSection(dataContainer, offsetY, "Weapons", WEAPON_SLOTS)

  equipState = {
    panel,
    noCompanionLabel,
    dataContainer,
    armorRows,
    jewelryRows,
    weaponRows,
    lastUpgradeScan: undefined,
  }

  return panel
}

export function setUpgradeRowIcons(
  rows: EquipmentRow[],
  upgrades: (SlotUpgrade | undefined)[]
): undefined {
  for (let i = 0; i < rows.length; i++) {
    const row = requireAt(rows, i, "rows")
    const upgrade = upgrades[i]
    if (upgrade !== undefined) {
      row.upgradeIcon.SetHidden(false)
      row.upgradeIcon.SetHandler("OnMouseUp", () => {
        RequestEquipItem(BAG_BACKPACK, upgrade.bagSlot, BAG_COMPANION_WORN, upgrade.equipSlot)
        zo_callLater(() => {
          captureAndSaveActiveCompanionBuild()
          TemperCharacters.TabManager.RefreshActivePanel()
        }, 500)
      })
      row.upgradeIcon.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.upgradeIcon, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, "Click to equip upgrade")
      })
      row.upgradeIcon.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      row.upgradeIcon.SetHidden(true)
      row.upgradeIcon.SetHandler("OnMouseUp", undefined)
      row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
      row.upgradeIcon.SetHandler("OnMouseExit", undefined)
    }
  }
}

export function refreshUpgradeIndicators(companionId: number): undefined {
  if (!equipState) return

  const hash = getTargetBuildHash(companionId)
  if (hash === undefined) {
    hideUpgradeIndicators()
    return
  }

  const result = scanForUpgrades(companionId, hash)
  equipState.lastUpgradeScan = result

  if (result === undefined) {
    hideUpgradeIndicators()
    return
  }

  setUpgradeRowIcons(equipState.armorRows, result.armorUpgrades)
  setUpgradeRowIcons(equipState.jewelryRows, result.jewelryUpgrades)
  setUpgradeRowIcons(equipState.weaponRows, result.weaponUpgrades)
}

export function hideUpgradeIndicators(): undefined {
  if (!equipState) return
  equipState.lastUpgradeScan = undefined

  for (const row of equipState.armorRows) {
    row.upgradeIcon.SetHidden(true)
    row.upgradeIcon.SetHandler("OnMouseUp", undefined)
    row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
    row.upgradeIcon.SetHandler("OnMouseExit", undefined)
  }
  for (const row of equipState.jewelryRows) {
    row.upgradeIcon.SetHidden(true)
    row.upgradeIcon.SetHandler("OnMouseUp", undefined)
    row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
    row.upgradeIcon.SetHandler("OnMouseExit", undefined)
  }
  for (const row of equipState.weaponRows) {
    row.upgradeIcon.SetHidden(true)
    row.upgradeIcon.SetHandler("OnMouseUp", undefined)
    row.upgradeIcon.SetHandler("OnMouseEnter", undefined)
    row.upgradeIcon.SetHandler("OnMouseExit", undefined)
  }
}

export function hideOptimalColumn(): undefined {
  if (!equipState) return

  for (const row of equipState.armorRows) {
    row.optimalLabel.SetHidden(true)
  }
  for (const row of equipState.jewelryRows) {
    row.optimalLabel.SetHidden(true)
  }
  for (const row of equipState.weaponRows) {
    row.optimalLabel.SetHidden(true)
  }
}

export function refreshEquipmentOptimalColumn(decoded: CompanionBuildData): undefined {
  if (!equipState) return

  for (let i = 0; i < equipState.armorRows.length; i++) {
    const row = requireAt(equipState.armorRows, i, "armorRows")
    const slot = decoded.armor[i]
    if (slot !== undefined) {
      row.optimalLabel.SetText(
        formatArmorFromIndices(slot.isEmpty, slot.weightIndex, slot.traitIndex)
      )
      const [r, g, b] = getQualityColorFromIndex(slot.qualityIndex)
      row.optimalLabel.SetColor(r, g, b, 1)
    } else {
      row.optimalLabel.SetText("Empty")
      row.optimalLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
    row.optimalLabel.SetHidden(false)
  }

  for (let i = 0; i < equipState.jewelryRows.length; i++) {
    const row = requireAt(equipState.jewelryRows, i, "jewelryRows")
    const slot = decoded.jewelry[i]
    if (slot !== undefined) {
      row.optimalLabel.SetText(formatJewelryFromIndices(slot.isEmpty, slot.traitIndex))
      const [r, g, b] = getQualityColorFromIndex(slot.qualityIndex)
      row.optimalLabel.SetColor(r, g, b, 1)
    } else {
      row.optimalLabel.SetText("Empty")
      row.optimalLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
    row.optimalLabel.SetHidden(false)
  }

  const mainWeapon = decoded.weapons[0]
  const isTwoHanded = mainWeapon !== undefined && isWeaponIndexTwoHanded(mainWeapon.typeIndex)

  for (let i = 0; i < equipState.weaponRows.length; i++) {
    const row = requireAt(equipState.weaponRows, i, "weaponRows")
    const slot = decoded.weapons[i]
    const isOffHand = i === 1
    const hidden = isOffHand && isTwoHanded

    if (hidden) {
      row.optimalLabel.SetHidden(true)
    } else if (slot !== undefined) {
      row.optimalLabel.SetText(
        formatWeaponFromIndices(slot.isEmpty, slot.typeIndex, slot.traitIndex)
      )
      const [r, g, b] = getQualityColorFromIndex(slot.qualityIndex)
      row.optimalLabel.SetColor(r, g, b, 1)
      row.optimalLabel.SetHidden(false)
    } else {
      row.optimalLabel.SetText("Empty")
      row.optimalLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
      row.optimalLabel.SetHidden(false)
    }
  }
}

export function refreshEquipmentFromLive(): undefined {
  if (!equipState) return

  for (let i = 0; i < ARMOR_SLOTS.length; i++) {
    const slot = requireAt(ARMOR_SLOTS, i, "ARMOR_SLOTS")
    const row = requireAt(equipState.armorRows, i, "armorRows")
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.valueLabel.SetText(FormatArmorSlot(slot))
    const [r, g, b] = GetQualityColorForSlot(slot)
    row.valueLabel.SetColor(r, g, b, 1)
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
  }

  for (let i = 0; i < JEWELRY_SLOTS.length; i++) {
    const slot = requireAt(JEWELRY_SLOTS, i, "JEWELRY_SLOTS")
    const row = requireAt(equipState.jewelryRows, i, "jewelryRows")
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.valueLabel.SetText(FormatJewelrySlot(slot))
    const [r, g, b] = GetQualityColorForSlot(slot)
    row.valueLabel.SetColor(r, g, b, 1)
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
  }

  const mainHandType = GetItemWeaponType(BAG_COMPANION_WORN, EQUIP_SLOT_MAIN_HAND)
  const isTwoHanded = TWO_HANDED_TYPES[mainHandType] === true

  for (let i = 0; i < WEAPON_SLOTS.length; i++) {
    const slot = requireAt(WEAPON_SLOTS, i, "WEAPON_SLOTS")
    const row = requireAt(equipState.weaponRows, i, "weaponRows")
    const isOffHand = slot === EQUIP_SLOT_OFF_HAND
    const hidden = isOffHand && isTwoHanded

    row.slotLabel.SetHidden(hidden)
    row.valueLabel.SetHidden(hidden)

    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.valueLabel.SetText(FormatWeaponSlot(slot))
    const [r, g, b] = GetQualityColorForSlot(slot)
    row.valueLabel.SetColor(r, g, b, 1)
  }
}

export function refreshEquipmentFromSaved(saved: SavedCompanionBuild): undefined {
  if (!equipState) return

  for (let i = 0; i < ARMOR_SLOTS.length; i++) {
    const slot = requireAt(ARMOR_SLOTS, i, "ARMOR_SLOTS")
    const row = requireAt(equipState.armorRows, i, "armorRows")
    const savedSlot = saved.armor[i]
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
    if (savedSlot !== undefined) {
      row.valueLabel.SetText(savedSlot.displayText)
      const [r, g, b] = savedSlot.qualityColor
      row.valueLabel.SetColor(r, g, b, 1)
    } else {
      row.valueLabel.SetText("Empty")
      row.valueLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
  }

  for (let i = 0; i < JEWELRY_SLOTS.length; i++) {
    const slot = requireAt(JEWELRY_SLOTS, i, "JEWELRY_SLOTS")
    const row = requireAt(equipState.jewelryRows, i, "jewelryRows")
    const savedSlot = saved.jewelry[i]
    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    row.slotLabel.SetHidden(false)
    row.valueLabel.SetHidden(false)
    if (savedSlot !== undefined) {
      row.valueLabel.SetText(savedSlot.displayText)
      const [r, g, b] = savedSlot.qualityColor
      row.valueLabel.SetColor(r, g, b, 1)
    } else {
      row.valueLabel.SetText("Empty")
      row.valueLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
  }

  const isTwoHanded = TWO_HANDED_TYPES[saved.mainHandWeaponType] === true

  for (let i = 0; i < WEAPON_SLOTS.length; i++) {
    const slot = requireAt(WEAPON_SLOTS, i, "WEAPON_SLOTS")
    const row = requireAt(equipState.weaponRows, i, "weaponRows")
    const savedSlot = saved.weapons[i]
    const isOffHand = slot === EQUIP_SLOT_OFF_HAND
    const hidden = isOffHand && isTwoHanded

    row.slotLabel.SetHidden(hidden)
    row.valueLabel.SetHidden(hidden)

    row.slotLabel.SetText(SLOT_NAMES[slot] ?? "Unknown")
    if (savedSlot !== undefined) {
      row.valueLabel.SetText(savedSlot.displayText)
      const [r, g, b] = savedSlot.qualityColor
      row.valueLabel.SetColor(r, g, b, 1)
    } else {
      row.valueLabel.SetText("Empty")
      row.valueLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    }
  }
}

export function RefreshCompanionEquipmentPanel(): undefined {
  if (!equipState) return

  const selectedCompanionId = getSelectedCompanionId()

  if (selectedCompanionId === undefined) {
    equipState.noCompanionLabel.SetText("Select a companion from the dropdown")
    equipState.noCompanionLabel.SetHidden(false)
    equipState.dataContainer.SetHidden(true)
    return
  }

  if (isSelectedCompanionActive()) {
    equipState.noCompanionLabel.SetHidden(true)
    equipState.dataContainer.SetHidden(false)
    refreshEquipmentFromLive()
    refreshOptimalEquipmentColumn(selectedCompanionId)
    refreshUpgradeIndicators(selectedCompanionId)
    return
  }

  const saved = getSavedCompanionBuild(selectedCompanionId)
  if (saved) {
    equipState.noCompanionLabel.SetHidden(true)
    equipState.dataContainer.SetHidden(false)
    refreshEquipmentFromSaved(saved)
    refreshOptimalEquipmentColumn(selectedCompanionId)
    hideUpgradeIndicators()
    return
  }

  const companionName = getCleanCompanionName(selectedCompanionId)
  equipState.noCompanionLabel.SetText(`Summon ${companionName} to capture their build`)
  equipState.noCompanionLabel.SetHidden(false)
  equipState.dataContainer.SetHidden(true)
  hideUpgradeIndicators()
}

export function refreshOptimalEquipmentColumn(companionId: number): undefined {
  const hash = getTargetBuildHash(companionId)
  if (hash === undefined) {
    hideOptimalColumn()
    return
  }

  const decoded = decodeCompanionBuild(hash)
  if (decoded === undefined) {
    hideOptimalColumn()
    return
  }

  refreshEquipmentOptimalColumn(decoded)
}
