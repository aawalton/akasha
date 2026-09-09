import { bugReportRequestOpenUrl } from "../lost-treasure-bug-report/lost-treasure-bug-report.module.code.ts"
import { ADDON_DISPLAY_NAME } from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"
import { getSavedVars } from "../lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import type { PinData } from "../lost-treasure-types/lost-treasure-types.module.code.ts"

const logger = createLogger("notifications")

type NotificationEntryList = NotificationEntry[]

function asNotificationEntryList(value: unknown): NotificationEntryList {
  return value as NotificationEntryList
}

interface NotificationCallbackData {
  notificationId: number
  data: PinData
}

interface NotificationEntry {
  data: PinData
  dataType: number
  secsSinceRequest: number
  note: string
  message: string
  heading: string
  texture: string
  shortDisplayText: string
  controlsOwnSounds: boolean
  keyboardAcceptCallback: (this: void, data: NotificationCallbackData) => undefined
  keyboardDeclineCallback: (this: void, data: NotificationCallbackData) => undefined
  gamepadAcceptCallback: (this: void, data: NotificationCallbackData) => undefined
  gamepadDeclineCallback: (this: void, data: NotificationCallbackData) => undefined
}

const SUPPORTED_LANGUAGES: Record<string, true | undefined> = ZO_CreateSetFromArguments(
  "en",
  "de",
  "fr"
)
const language = GetCVar("language.2")

const HOLDER: { provider: LibNotificationProvider | undefined } = { provider: undefined }

function getProvider(this: void): LibNotificationProvider {
  if (HOLDER.provider === undefined) {
    throw new Error("TemperLostTreasure notifications provider accessed before initialization")
  }
  return HOLDER.provider
}

function getEntries(this: void): NotificationEntry[] {
  return asNotificationEntryList(getProvider().notifications)
}

function isLanguageSupported(this: void): boolean {
  return SUPPORTED_LANGUAGES[language] === true
}

function accept(this: void, data: NotificationCallbackData): undefined {
  removeNotification(data)
  bugReportRequestOpenUrl(data.data)
}

function decline(this: void, data: NotificationCallbackData): undefined {
  removeNotification(data)
}

export function deleteAllNotificationsInDatabase(this: void): undefined {
  const db = getSavedVars()
  const [firstKey] = next(db.notifications)
  if (firstKey !== undefined) {
    ZO_ClearTable(db.notifications)
    logger.Debug("All notifications have been removed")
  }
}

function saveAllNotifications(this: void): undefined {
  const db = getSavedVars()
  ZO_ClearTable(db.notifications)
  for (const [, layoutData] of ipairs(getEntries())) {
    db.notifications.push(layoutData.data)
  }
  deleteAllNotificationsInDatabase()
}

function restoreAllNotifications(this: void): undefined {
  const db = getSavedVars()
  for (const [, layoutData] of ipairs(db.notifications)) {
    notificationsAdd(layoutData)
  }
  deleteAllNotificationsInDatabase()
}

function removeNotification(this: void, data: NotificationCallbackData): undefined {
  const provider = getProvider()
  table.remove(provider.notifications, data.notificationId)
  provider.UpdateNotifications()
}

function addNotification(this: void, notification: NotificationEntry): undefined {
  const provider = getProvider()
  const providerNotifications = getEntries()

  let addNotificationFlag = true
  const itemId = notification.data.itemId
  const [firstKey] = next(providerNotifications)
  if (firstKey !== undefined) {
    for (const [, layoutData] of ipairs(providerNotifications)) {
      if (layoutData.data.itemId === itemId) {
        addNotificationFlag = false
        break
      }
    }
  }

  if (addNotificationFlag) {
    provider.notifications.push(notification)
    provider.UpdateNotifications()
    logger.Debug("New notification has been added for itemId %d", itemId)
  } else {
    logger.Debug("Notification itemId already exist")
  }
}

export function notificationsAdd(this: void, pinData: PinData): undefined {
  if (!isLanguageSupported()) {
    logger.Debug('Tried to add pin, but the language "%s" is not supported', language)
    return
  }

  const notification: NotificationEntry = {
    data: pinData,
    dataType: NOTIFICATIONS_REQUEST_DATA,
    secsSinceRequest: ZO_NormalizeSecondsSince(0),
    note: GetString(SI_LOST_TREASURE_NOTIFICATION_NOTE),
    message: GetString(SI_LOST_TREASURE_NOTIFICATION_MESSAGE),
    heading: ADDON_DISPLAY_NAME,
    texture: pinData.texture,
    shortDisplayText: ADDON_DISPLAY_NAME,
    controlsOwnSounds: false,
    keyboardAcceptCallback: (data) => accept(data),
    keyboardDeclineCallback: (data) => decline(data),
    gamepadAcceptCallback: (data) => accept(data),
    gamepadDeclineCallback: (data) => decline(data),
  }
  addNotification(notification)
}

export function initializeNotifications(this: void): undefined {
  HOLDER.provider = LibNotifications.CreateProvider()

  restoreAllNotifications()

  EVENT_MANAGER.RegisterForEvent(
    ADDON_DISPLAY_NAME,
    EVENT_PLAYER_DEACTIVATED,
    function (this: void): undefined {
      saveAllNotifications()
    }
  )

  logger.Debug("initialized")
}
