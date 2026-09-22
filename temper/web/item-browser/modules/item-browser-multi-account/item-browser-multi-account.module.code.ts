import { requireNumericKey } from "akasha/temper/addon/shared/narrow/modules/require-numeric-key/require-numeric-key.module.code.ts"
import {
  ADDON_NAME,
  PLEDGE_FILTER_ID,
} from "akasha/temper/web/item-browser/modules/item-browser-constants/item-browser-constants.module.code.ts"
import "akasha/temper/addon/type/temper-helpers-global/temper-helpers-global.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-multi-account-sets/lib-multi-account-sets.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-undaunted-pledges/lib-undaunted-pledges.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-event-manager/eso-event-manager.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-events/eso-events.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"

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
    selectedServer = TemperHelpers.GetServerName()
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
