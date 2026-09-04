import { requireNumericKey } from "@akasha/temper-narrow/require-numeric-key"
import {
  ADDON_NAME,
  PLEDGE_FILTER_ID,
} from "../item-browser-constants/item-browser-constants.module.code.ts"

export type ValidatedLmas = LibMultiAccountSetsApi & {
  GetServerAndAccountList: (this: void, includeCurrent: boolean) => LmasServerEntry[]
}

function isModernLmas(api: LibMultiAccountSetsApi): api is ValidatedLmas {
  return api.GetServerAndAccountList !== undefined
}

const LMAS: ValidatedLmas | undefined =
  LibMultiAccountSets !== undefined && isModernLmas(LibMultiAccountSets)
    ? LibMultiAccountSets
    : undefined

const LUP = LibUndauntedPledges

export function getLmas(this: void): ValidatedLmas | undefined {
  return LMAS
}

export function hasUndauntedPledges(this: void): boolean {
  return LUP !== undefined
}

let selectedServer: string | undefined
let selectedAccount: string | undefined

export function getSelectedServer(this: void): string | undefined {
  return selectedServer
}

export function setSelectedServer(this: void, value: string | undefined): undefined {
  selectedServer = value
  return undefined
}

export function getSelectedAccount(this: void): string | undefined {
  return selectedAccount
}

export function setSelectedAccount(this: void, value: string | undefined): undefined {
  selectedAccount = value
  return undefined
}

export function initializeMultiAccount(this: void): undefined {
  if (LMAS !== undefined) {
    selectedServer = LibCodesCommonCode.GetServerName()
  }
  return undefined
}

export function countUnlockedSlots(this: void, setId: number): number {
  if (LMAS !== undefined) {
    return LMAS.GetNumItemSetCollectionSlotsUnlockedForAccountEx(
      selectedServer,
      selectedAccount,
      setId
    )
  }
  return GetNumItemSetCollectionSlotsUnlocked(setId)
}

export function getCurrencyCost(
  this: void,
  setId: number,
  currencyType: number
): number | undefined {
  if (LMAS !== undefined) {
    return LMAS.GetItemReconstructionCurrencyOptionCostForAccountEx(
      selectedServer,
      selectedAccount,
      setId,
      currencyType
    )
  }
  return GetItemReconstructionCurrencyOptionCost(setId, currencyType)
}

export function checkForPledge(
  this: void,
  zoneIds: { [zoneId: number]: boolean | undefined }
): boolean {
  if (LUP !== undefined) {
    for (const [key] of Object.entries(zoneIds)) {
      const zoneId = requireNumericKey(key, "pledge zoneId")
      if (LUP.IsPledge(zoneId, 0, selectedServer)) {
        return true
      }
    }
    return false
  }
  return true
}

export function getMaxFilterId(this: void): number {
  return PLEDGE_FILTER_ID + (LUP !== undefined ? 0 : -1)
}

export function registerCollectionCallbacks(this: void, refresh: (this: void) => void): undefined {
  if (LMAS !== undefined) {
    LMAS.RegisterForCallback(ADDON_NAME, LMAS.EVENT_COLLECTION_UPDATED, refresh)
  } else {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ITEM_SET_COLLECTIONS_UPDATED, refresh)
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ITEM_SET_COLLECTION_UPDATED, refresh)
  }
  return undefined
}
