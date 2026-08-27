import { getSavedVariables } from "../../saved-variables"
import type { ListProviderSelf } from "./notification-provider"

export function hookGuildNewApplicationsNotifications(this: void): undefined {
  const SV = getSavedVariables()
  function buildNotificationListHook(this: void, self: ListProviderSelf): boolean | undefined {
    if (SV.guildApps) {
      ZO_ClearNumericallyIndexedTable(self.list)
      return true
    }
    return undefined
  }
  ZO_PreHook(ZO_GuildNewApplicationsProvider, "BuildNotificationList", buildNotificationListHook)
}
