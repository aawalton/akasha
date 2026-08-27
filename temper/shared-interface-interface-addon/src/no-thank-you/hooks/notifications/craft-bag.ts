import { getSavedVariables } from "../../saved-variables"
import type { ListProviderSelf } from "./notification-provider"

export function hookCraftBagNotifications(this: void): undefined {
  const SV = getSavedVariables()
  function buildNotificationListHook(this: void, self: ListProviderSelf): boolean | undefined {
    if (SV.craftBag) {
      ZO_ClearNumericallyIndexedTable(self.list)
      return true
    }
    return undefined
  }
  ZO_PreHook(ZO_CraftBagAutoTransferProvider, "BuildNotificationList", buildNotificationListHook)
}
