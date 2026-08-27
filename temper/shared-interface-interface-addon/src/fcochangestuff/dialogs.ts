import { state } from "./state"

interface TradingHouseCancelListing {
  cancelListingDialog: {
    listingIndex: number | undefined
  }
}

function asTradingHouseCancelListing(this: void, value: unknown): TradingHouseCancelListing {
  return value as TradingHouseCancelListing
}

let dialogOnShowHooked = false

function loadDialogOnShowHook(this: void): undefined {
  if (!dialogOnShowHooked) {
    ZO_PreHook("ZO_Dialogs_ShowDialog", (dialogName: unknown) => {
      if (dialogName !== undefined) {
        const suppressDialog = state.settingsVars.settings.suppressDialog
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
    dialogOnShowHooked = true
  }
}

export function tradingHouseDialogChanges(this: void): undefined {}

export function dialogsChanges(this: void): undefined {
  loadDialogOnShowHook()
}
