import { disableChatMinimize, dontRotateGameCamera } from "./camera"
import {
  alertTextThrottling,
  bossAlertTextsHook,
  craftingResultAlertsHook,
  hookPlaySound,
  repairAlertsHook,
  screenshotAlertHook,
} from "./hooks/alerts"
import {
  dontShowLoreDiscoveries,
  dontShowSkillProgression,
  enlightenedAlertHook,
  hookAvAMessages,
  hookGroupZoneMessages,
} from "./hooks/announcements"
import {
  deleteEmptyMailHook,
  hookBindAlerts,
  hookDisbandDialog,
  hookFenceDialog,
  hookImproveDialog,
  hookLargeGroupDialog,
  hookMarketAnnouncement,
  noPortToLeader,
} from "./hooks/dialogs"
import { removePinsFromMaps } from "./hooks/map-pins"
import { hookCraftBagNotifications } from "./hooks/notifications/craft-bag"
import { hookGuildNewApplicationsNotifications } from "./hooks/notifications/guild-applications"
import { hookGuildInvitesNotifications, hookPlayerToPlayerGuildInvite } from "./hooks/notifications/guild-invites"
import { hookMotDNotifications } from "./hooks/notifications/guild-motd"
import { guildRosterAlertsHook } from "./hooks/notifications/guild-roster-alerts"
import { handleLuaErrorEvent } from "./hooks/notifications/lua-errors"
import { hookRaidNotifications } from "./hooks/notifications/raid-leaderboard"
import {
  disableChatAutoComplete,
  dontInterruptHarvesting,
  dontReadBooks,
  hookFriendsMessages,
  hookReportItemFromInventory,
  hookReticleTake,
  noGuildLeave,
  noGuildLeavePreHook,
  noUniversalStones,
} from "./hooks/world"
import "./public-api"
import { initializeSavedVariables } from "./saved-variables"
import { buildSettingsMenu } from "./settings/menu"

export function initNoThankYou(this: void): undefined {
  initializeSavedVariables()

  hookAvAMessages()
  hookGroupZoneMessages()
  hookFriendsMessages()
  bossAlertTextsHook()
  screenshotAlertHook()
  enlightenedAlertHook()
  guildRosterAlertsHook()
  craftingResultAlertsHook()
  repairAlertsHook()
  alertTextThrottling()
  deleteEmptyMailHook()
  hookRaidNotifications()
  hookMotDNotifications()
  hookCraftBagNotifications()
  hookReticleTake()
  hookGuildInvitesNotifications()
  handleLuaErrorEvent()
  dontInterruptHarvesting()
  dontRotateGameCamera()
  hookFenceDialog()
  hookPlaySound()
  hookDisbandDialog()
  hookLargeGroupDialog()
  hookImproveDialog()
  hookMarketAnnouncement()
  hookPlayerToPlayerGuildInvite()
  dontReadBooks()
  dontShowLoreDiscoveries()
  dontShowSkillProgression()
  noUniversalStones()
  noGuildLeave()
  noGuildLeavePreHook()
  hookReportItemFromInventory()
  removePinsFromMaps()
  disableChatAutoComplete()
  disableChatMinimize()
  hookBindAlerts()
  noPortToLeader()
  hookGuildNewApplicationsNotifications()

  buildSettingsMenu()

  NOTIFICATIONS.RefreshNotificationList()
}
