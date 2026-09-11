import type { ListProviderSelf } from "akasha/temper/interface-addon/quiet-list-provider/quiet-list-provider.module.code.ts"
import { getSavedVariables } from "akasha/temper/interface-addon/quiet-saved-variables/quiet-saved-variables.module.code.ts"

export function hookCraftBagNotifications(this: void): undefined {
  const savedVars = getSavedVariables()
  function buildNotificationListHook(this: void, self: ListProviderSelf): boolean | undefined {
    if (savedVars.craftBag) {
      ZO_ClearNumericallyIndexedTable(self.list)
      return true
    }
    return undefined
  }
  ZO_PreHook(ZO_CraftBagAutoTransferProvider, "BuildNotificationList", buildNotificationListHook)
}
