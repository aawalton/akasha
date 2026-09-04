import {
  alertTextThrottling,
  bossAlertTextsHook,
  craftingResultAlertsHook,
  hookPlaySound,
  repairAlertsHook,
  screenshotAlertHook,
} from "../quiet-alerts/quiet-alerts.module.code.ts"
import {
  dontShowLoreDiscoveries,
  dontShowSkillProgression,
  enlightenedAlertHook,
  hookAvAMessages,
  hookGroupZoneMessages,
} from "../quiet-announcements/quiet-announcements.module.code.ts"
import {
  disableChatMinimize,
  dontRotateGameCamera,
} from "../quiet-camera/quiet-camera.module.code.ts"
import { hookCraftBagNotifications } from "../quiet-craft-bag/quiet-craft-bag.module.code.ts"
import {
  deleteEmptyMailHook,
  hookBindAlerts,
  hookDisbandDialog,
  hookFenceDialog,
  hookImproveDialog,
  hookLargeGroupDialog,
  hookMarketAnnouncement,
  noPortToLeader,
} from "../quiet-dialogs/quiet-dialogs.module.code.ts"
import { hookGuildNewApplicationsNotifications } from "../quiet-guild-applications/quiet-guild-applications.module.code.ts"
import {
  hookGuildInvitesNotifications,
  hookPlayerToPlayerGuildInvite,
} from "../quiet-guild-invites/quiet-guild-invites.module.code.ts"
import { hookMotDNotifications } from "../quiet-guild-motd/quiet-guild-motd.module.code.ts"
import { guildRosterAlertsHook } from "../quiet-guild-roster/quiet-guild-roster.module.code.ts"
import { handleLuaErrorEvent } from "../quiet-lua-errors/quiet-lua-errors.module.code.ts"
import { removePinsFromMaps } from "../quiet-map-pins/quiet-map-pins.module.code.ts"
import { hookRaidNotifications } from "../quiet-raid-leaderboard/quiet-raid-leaderboard.module.code.ts"
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
} from "../quiet-world/quiet-world.module.code.ts"
import "../quiet-camera-keybind/quiet-camera-keybind.module.code.ts"
import { initializeSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { buildSettingsMenu } from "../quiet-settings-menu/quiet-settings-menu.module.code.ts"

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

  NOTIFICATIONS?.RefreshNotificationList()
}
