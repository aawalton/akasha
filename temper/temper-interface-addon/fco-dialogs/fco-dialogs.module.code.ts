import { STATE } from "../fco-state/fco-state.module.code.ts"

interface TradingHouseCancelListing {
  cancelListingDialog: {
    listingIndex: number | undefined
  }
}

function asTradingHouseCancelListing(this: void, value: unknown): TradingHouseCancelListing {
  return value as TradingHouseCancelListing
}

let DIALOG_ON_SHOW_HOOKED = false

function loadDialogOnShowHook(this: void): undefined {
  if (!DIALOG_ON_SHOW_HOOKED) {
    ZO_PreHook("ZO_Dialogs_ShowDialog", (dialogName: unknown) => {
      if (dialogName !== undefined) {
        const suppressDialog = STATE.settingsVars.settings.suppressDialog
        if (
          dialogName === "CONFIRM_TRADING_HOUSE_CANCEL_LISTING" &&
          suppressDialog[dialogName] === true
        ) {
          const tradingHouse = asTradingHouseCancelListing(TRADING_HOUSE)
          const listIndex = tradingHouse.cancelListingDialog.listingIndex
          if (listIndex !== undefined) {
            CancelTradingHouseListing(listIndex)
            tradingHouse.cancelListingDialog.listingIndex = undefined
            return true
          }
        }
      }
      return undefined
    })
    DIALOG_ON_SHOW_HOOKED = true
  }
}

export function tradingHouseDialogChanges(this: void): undefined {}

export function dialogsChanges(this: void): undefined {
  loadDialogOnShowHook()
}
