import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-13"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/lua-language-extensions"
import { requireAt } from "@akasha/utils/narrow/require-at"
import { GREEN } from "akasha/design/tokens/semantic-color/semantic-color.module.code.ts"
import {
  TEXT_PRIMARY,
  TEXT_TERTIARY,
} from "akasha/design/tokens/text-color/text-color.module.code.ts"
import {
  applyBuild,
  equipUpgrades,
} from "../companions-apply-build/companions-apply-build.module.code.ts"
import {
  ARMOR_SLOTS,
  type CompanionBuildData,
  captureCompanionBuild,
  JEWELRY_SLOTS,
  WEAPON_SLOTS,
} from "../companions-codec/companions-codec.module.code.ts"
import { decodeCompanionBuild } from "../companions-decoder/companions-decoder.module.code.ts"
import { SLOT_NAMES } from "../companions-display-names/companions-display-names.module.code.ts"
import {
  describeMismatch,
  EQUIPMENT_SLOT_COUNT,
  type EquipmentSlotGroup,
  evaluateEquipmentMatch,
  type SlotMismatch,
} from "../companions-equipment-match/companions-equipment-match.module.code.ts"
import { scanForUpgrades } from "../companions-scan-upgrades/companions-scan-upgrades.module.code.ts"
import {
  captureAndSaveActiveCompanionBuild,
  getSavedCompanionBuild,
} from "../companions-selector/companions-selector.module.code.ts"
import {
  type SummaryRow,
  summaryState,
} from "../companions-summary-panel/companions-summary-panel.module.code.ts"
import { getTargetBuildHash } from "../companions-target-build-input/companions-target-build-input.module.code.ts"

export const COLOR_GREEN = GREEN
export const COLOR_GOLD: [number, number, number] = [0.98, 0.86, 0.24]
export const COLOR_ORANGE_RED: [number, number, number] = [0.9, 0.35, 0.15]

export function setGrayDash(label: LabelControl): undefined {
  label.SetText("-")
  label.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
}

export function clearApplyLabel(row: SummaryRow): undefined {
  row.applyLabel.SetText("")
  row.applyLabel.SetHandler("OnMouseUp", undefined)
  row.applyLabel.SetHandler("OnMouseEnter", undefined)
  row.applyLabel.SetHandler("OnMouseExit", undefined)
}

export function getMatchColor(matched: number, total: number): readonly [number, number, number] {
  if (matched === total) return COLOR_GREEN
  if (matched >= total * 0.5) return COLOR_GOLD
  return COLOR_ORANGE_RED
}

export function getCurrentBuildData(companionId: number): CompanionBuildData | undefined {
  if (HasActiveCompanion() && GetActiveCompanionDefId() === companionId) {
    const build = captureCompanionBuild()
    if (build !== null) return build
  }

  const saved = getSavedCompanionBuild(companionId)
  if (saved !== undefined) {
    return decodeCompanionBuild(saved.hash)
  }

  return undefined
}

const SLOT_GROUP_EQUIP_SLOTS: Record<EquipmentSlotGroup, number[]> = {
  armor: ARMOR_SLOTS,
  jewelry: JEWELRY_SLOTS,
  weapons: WEAPON_SLOTS,
}

export function getMismatchSlotName(mismatch: SlotMismatch): string {
  const equipSlot = SLOT_GROUP_EQUIP_SLOTS[mismatch.group][mismatch.indexInGroup]
  if (equipSlot === undefined) return "Unknown"
  return SLOT_NAMES[equipSlot] ?? "Unknown"
}

export function clearEquipTooltip(row: SummaryRow): undefined {
  row.equipLabel.SetHandler("OnMouseEnter", undefined)
  row.equipLabel.SetHandler("OnMouseExit", undefined)
}

export function countMatchingSkills(
  current: CompanionBuildData,
  optimal: CompanionBuildData
): number {
  let matches = 0
  for (let i = 0; i < 6; i++) {
    if (current.skills[i] === optimal.skills[i]) {
      matches++
    }
  }
  return matches
}

export function refreshCompanionSummaryPanel(): undefined {
  if (!summaryState) return

  for (let i = 0; i < summaryState.companionIds.length; i++) {
    const companionId = requireAt(summaryState.companionIds, i, "companionIds")
    const row = requireAt(summaryState.rows, i, "summaryState.rows")

    const hash = getTargetBuildHash(companionId)

    if (hash === undefined) {
      setGrayDash(row.equipLabel)
      clearEquipTooltip(row)
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
      setGrayDash(row.skillsLabel)
      setGrayDash(row.buildLabel)
      clearApplyLabel(row)
      continue
    }

    row.buildLabel.SetText("Target")
    row.buildLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)

    const currentBuild = getCurrentBuildData(companionId)
    if (currentBuild === undefined) {
      setGrayDash(row.equipLabel)
      clearEquipTooltip(row)
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
      setGrayDash(row.skillsLabel)
      continue
    }

    const optimalBuild = decodeCompanionBuild(hash)
    if (optimalBuild === undefined) {
      setGrayDash(row.equipLabel)
      clearEquipTooltip(row)
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
      setGrayDash(row.skillsLabel)
      continue
    }

    const equipMatch = evaluateEquipmentMatch(currentBuild, optimalBuild)
    const skillMatches = countMatchingSkills(currentBuild, optimalBuild)

    const [er, eg, eb] = getMatchColor(equipMatch.matchedCount, EQUIPMENT_SLOT_COUNT)
    row.equipLabel.SetText(`${equipMatch.matchedCount}/${EQUIPMENT_SLOT_COUNT}`)
    row.equipLabel.SetColor(er, eg, eb, 1)

    if (equipMatch.mismatches.length > 0) {
      const shortfallLines = equipMatch.mismatches.map((mismatch) =>
        describeMismatch(getMismatchSlotName(mismatch), mismatch.dimensions)
      )
      row.equipLabel.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.equipLabel, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, "Below target:")
        for (const line of shortfallLines) {
          SetTooltipText(InformationTooltip, line)
        }
      })
      row.equipLabel.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      clearEquipTooltip(row)
    }

    const [sr, sg, sb] = getMatchColor(skillMatches, 6)
    row.skillsLabel.SetText(`${skillMatches}/6`)
    row.skillsLabel.SetColor(sr, sg, sb, 1)

    const isActive = HasActiveCompanion() && GetActiveCompanionDefId() === companionId
    const upgradeScan = isActive ? scanForUpgrades(companionId, hash) : undefined
    if (upgradeScan !== undefined) {
      const count = upgradeScan.totalUpgradeCount
      row.upgradeLabel.SetText(`${count}`)
      row.upgradeLabel.SetColor(COLOR_GREEN[0], COLOR_GREEN[1], COLOR_GREEN[2], 1)
      row.upgradeLabel.SetHandler("OnMouseUp", () => {
        const freshScan = scanForUpgrades(companionId, hash)
        if (freshScan !== undefined) {
          equipUpgrades(freshScan)
          const totalDelay = freshScan.totalUpgradeCount * 200 + 500
          zo_callLater(() => {
            captureAndSaveActiveCompanionBuild()
            TemperCharacters.TabManager.RefreshActivePanel()
          }, totalDelay)
        }
      })
      row.upgradeLabel.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.upgradeLabel, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, `${count} upgrade(s) available. Click to equip.`)
      })
      row.upgradeLabel.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      setGrayDash(row.upgradeLabel)
      row.upgradeLabel.SetHandler("OnMouseUp", undefined)
      row.upgradeLabel.SetHandler("OnMouseEnter", undefined)
      row.upgradeLabel.SetHandler("OnMouseExit", undefined)
    }

    if (isActive) {
      row.applyLabel.SetText("Apply")
      row.applyLabel.SetColor(COLOR_GREEN[0], COLOR_GREEN[1], COLOR_GREEN[2], 1)
      row.applyLabel.SetHandler("OnMouseUp", () => {
        applyBuild(companionId, hash)
        zo_callLater(() => {
          captureAndSaveActiveCompanionBuild()
          TemperCharacters.TabManager.RefreshActivePanel()
        }, 1500)
      })
      row.applyLabel.SetHandler("OnMouseEnter", () => {
        InitializeTooltip(InformationTooltip, row.applyLabel, BOTTOM, 0, 0, TOP)
        SetTooltipText(InformationTooltip, "Apply target build")
      })
      row.applyLabel.SetHandler("OnMouseExit", () => {
        ClearTooltip(InformationTooltip)
      })
    } else {
      clearApplyLabel(row)
    }
  }
}
