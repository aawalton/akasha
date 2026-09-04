import {
  asEsoDialogDescriptor,
  asGlobalTable,
  asReopenSaveData,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import {
  LAM_DEFAULTS_DIALOG,
  LAM_RELOAD_DIALOG,
  LAM_SAVED_VARS_KEY,
} from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { controlsForReload, lam } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { LamControl } from "../addon-menu-types/addon-menu-types.module.code.ts"
import { L } from "../addon-menu-ui-strings/addon-menu-ui-strings.module.code.ts"
import { isSame, refreshReloadUIButton } from "../addon-menu-util/addon-menu-util.module.code.ts"

function getDefaultsDialog(this: void): EsoDialogDescriptor {
  let dialog = ESO_Dialogs[LAM_DEFAULTS_DIALOG]
  if (!dialog) {
    dialog = {
      canQueue: true,
      title: { text: SI_INTERFACE_OPTIONS_RESET_TO_DEFAULT_TOOLTIP },
      mainText: { text: SI_OPTIONS_RESET_PROMPT },
      buttons: [
        { text: SI_OPTIONS_RESET, callback: (): undefined => undefined },
        { text: SI_DIALOG_CANCEL },
      ],
    }
    ESO_Dialogs[LAM_DEFAULTS_DIALOG] = dialog
  }
  return asEsoDialogDescriptor(dialog)
}

function showDefaultsDialog(this: void, panel: LamControl): undefined {
  const dialog = getDefaultsDialog()
  const firstButton = dialog.buttons[0]
  if (firstButton !== undefined) {
    firstButton.callback = (): undefined => {
      panel.ForceDefaults?.()
      refreshReloadUIButton()
    }
  }
  ZO_Dialogs_ShowDialog(LAM_DEFAULTS_DIALOG)
}

export function discardChangesOnReloadControls(this: void): undefined {
  for (const reloadControl of controlsForReload) {
    const getFunc = reloadControl.data.getFunc
    const startValue = reloadControl.startValue ?? []
    if (getFunc !== undefined && !isSame(startValue, [getFunc()])) {
      reloadControl.UpdateValue?.(false, ...startValue)
    }
  }
  lam.requiresReload = false
  lam.applyButton?.SetHidden(true)
}

function storePanelForReopening(this: void): undefined {
  const saveData = asReopenSaveData(ZO_Ingame_SavedVariables[LAM_SAVED_VARS_KEY] ?? {})
  saveData.reopenPanel = lam.currentAddonPanel?.GetName()
  ZO_Ingame_SavedVariables[LAM_SAVED_VARS_KEY] = saveData
}

export function retrievePanelForReopening(this: void): LamControl | undefined {
  const raw = ZO_Ingame_SavedVariables[LAM_SAVED_VARS_KEY]
  if (raw !== undefined) {
    ZO_Ingame_SavedVariables[LAM_SAVED_VARS_KEY] = undefined
    const saveData = asReopenSaveData(raw)
    if (saveData.reopenPanel !== undefined) {
      return asGlobalTable(_G)[saveData.reopenPanel]
    }
  }
  return undefined
}

export function handleReloadUIPressed(this: void): undefined {
  storePanelForReopening()
  ReloadUI("ingame")
}

export function handleLoadDefaultsPressed(this: void): undefined {
  if (lam.currentAddonPanel !== undefined) {
    showDefaultsDialog(lam.currentAddonPanel)
  }
}

function getReloadDialog(this: void): undefined {
  if (!ESO_Dialogs[LAM_RELOAD_DIALOG]) {
    ESO_Dialogs[LAM_RELOAD_DIALOG] = {
      canQueue: true,
      title: { text: L.RELOAD_DIALOG_TITLE },
      mainText: { text: L.RELOAD_DIALOG_TEXT },
      buttons: [
        {
          text: L.RELOAD_DIALOG_RELOAD_BUTTON,
          callback: (): undefined => {
            ReloadUI("ingame")
          },
        },
        {
          text: L.RELOAD_DIALOG_DISCARD_BUTTON,
          callback: discardChangesOnReloadControls,
        },
      ],
      noChoiceCallback: discardChangesOnReloadControls,
    }
  }
}

export function showReloadDialogIfNeeded(this: void): undefined {
  if (lam.requiresReload) {
    getReloadDialog()
    ZO_Dialogs_ShowDialog(LAM_RELOAD_DIALOG)
  }
}
