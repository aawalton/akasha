import { STATE } from "../fco-state/fco-state.module.code.ts"

function isSmithingPanel(this: void, value: unknown): value is SmithingPanelWithImprovement {
  return typeof value === "object" && value !== undefined
}

function isRecord(this: void, value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== undefined
}

function readNumberField(
  this: void,
  source: Record<string, unknown>,
  key: string
): number | undefined {
  const value = source[key]
  return typeof value === "number" ? value : undefined
}

export function smithingImproveTrySet100PercentChance(this: void): undefined {
  if (STATE.settingsVars.settings.improvementWith100Percent !== true) {
    return
  }
  const gamePadMode = IsInGamepadPreferredMode()
  const smithingPanelRaw: unknown = gamePadMode ? SMITHING_GAMEPAD : SMITHING
  if (!isSmithingPanel(smithingPanelRaw)) {
    return
  }
  const smithingPanel = smithingPanelRaw
  if (
    smithingPanel.improvementPanel === undefined ||
    smithingPanel.improvementPanel.OnSlotChanged === undefined
  ) {
    return
  }
  const imprPanel = smithingPanel.improvementPanel
  const origImprovementFunc = imprPanel.OnSlotChanged
  if (origImprovementFunc === undefined) {
    return
  }

  imprPanel.OnSlotChanged = (...args: unknown[]): unknown => {
    const origRetVar = origImprovementFunc(...args)
    const settings = STATE.settingsVars.settings
    if (settings.improvementWith100Percent === true) {
      const hasItem = imprPanel.improvementSlot.HasItem()
      if (hasItem) {
        const row = imprPanel.GetRowForSelection()
        if (row !== undefined && row !== false) {
          const max = imprPanel.FindMaxBoostersToApply()
          if (max !== undefined) {
            const isInGamePadMode = IsInGamepadPreferredMode()
            if (isInGamePadMode) {
              zo_callLater(() => {
                imprPanel.spinner.Activate()
                imprPanel.spinner.SetValue(max)
              }, 50)
            } else {
              imprPanel.spinner.SetValue(max)
            }
          }
        }
      }
    }
    return origRetVar
  }
}

function isItemBlockedForImprovement(
  this: void,
  bagId: number | undefined,
  slotIndex: number | undefined
): boolean {
  if (bagId === undefined || slotIndex === undefined) {
    return false
  }
  const settings = STATE.settingsVars.settings
  const blockedQuality = settings.improvementBlockQuality
  if (blockedQuality === -1) {
    return false
  }
  if (settings.improvementBlockQualityExceptionShiftKey === true && IsShiftKeyDown() === true) {
    return false
  }

  const currentQuality = GetItemFunctionalQuality(bagId, slotIndex)
  const newQualityAfterImprovement = currentQuality + 1
  if (newQualityAfterImprovement > ITEM_QUALITY_LEGENDARY) {
    return false
  }
  if (newQualityAfterImprovement >= blockedQuality) {
    const itemLink = GetItemLink(bagId, slotIndex)
    if (itemLink !== undefined && itemLink !== "") {
      const qualityChoices = STATE.settingsVars.settings.qualityChoices
      const blockedQualityName =
        qualityChoices !== undefined ? qualityChoices[blockedQuality] : undefined
      const alertMsg = `[${STATE.addonVars.addonNameMenuDisplay}]Improvement of ${itemLink} blocked! Allowed qualities must be < ${blockedQualityName}`
      ZO_Alert(UI_ALERT_CATEGORY_ERROR, SOUNDS.NEGATIVE_CLICK, alertMsg)
    }
    const smithingPanel: unknown = SMITHING
    if (isSmithingPanel(smithingPanel) && smithingPanel.improvementPanel !== undefined) {
      smithingPanel.improvementPanel.ClearSelections()
    }
    return true
  }
  return false
}

let SMITHING_IMPROVE_DIALOG_HOOKED = false
export function smithingImproveBlockImprovement(this: void): undefined {
  const settings = STATE.settingsVars.settings

  const blockedQuality = settings.improvementBlockQuality
  if (blockedQuality === -1) {
    return
  }

  if (!SMITHING_IMPROVE_DIALOG_HOOKED) {
    if (ZO_Dialogs_ShowPlatformDialog !== undefined) {
      ZO_PreHook("ZO_Dialogs_ShowPlatformDialog", (...args: unknown[]): unknown => {
        const dialogName = typeof args[0] === "string" ? args[0] : undefined
        const itemDataRaw = args[1]
        const itemData = isRecord(itemDataRaw) ? itemDataRaw : undefined
        const improveDialogNames: Record<string, boolean> = {
          CONFIRM_IMPROVE_ITEM: true,
          CONFIRM_IMPROVE_LOCKED_ITEM: true,
          GAMEPAD_CONFIRM_IMPROVE_LOCKED_ITEM: true,
        }
        const improveDialogName =
          dialogName !== undefined ? (improveDialogNames[dialogName] ?? false) : false
        if (!improveDialogName) {
          return false
        }
        if (itemData !== undefined) {
          const bagId = readNumberField(itemData, "bagId")
          const slotIndex = readNumberField(itemData, "slotIndex")
          if (bagId !== undefined && slotIndex !== undefined) {
            return isItemBlockedForImprovement(bagId, slotIndex)
          }
        }
        return false
      })
      SMITHING_IMPROVE_DIALOG_HOOKED = true
    }
    if (ImproveSmithingItem !== undefined) {
      ZO_PreHook("ImproveSmithingItem", (...args: unknown[]): unknown => {
        if (!isRecord(args)) {
          return false
        }
        const bagId = readNumberField(args, "bagId")
        const slotIndex = readNumberField(args, "slotIndex")
        if (bagId === undefined || slotIndex === undefined) {
          return false
        }
        return isItemBlockedForImprovement(bagId, slotIndex)
      })
      SMITHING_IMPROVE_DIALOG_HOOKED = true
    }
  }
}
