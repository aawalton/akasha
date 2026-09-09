import type {
  LibNotificationProviderClass,
  LibNotificationProviderInstance,
  NotificationData,
  NotificationManager,
} from "../notification-types/notification-types.module.code.ts"

const NOTIFICATION_PROVIDER = ZO_NotificationProvider.Subclass<LibNotificationProviderClass>()

NOTIFICATION_PROVIDER.New = function (
  this: void,
  self: LibNotificationProviderClass,
  notificationManager: NotificationManager
): LibNotificationProviderInstance {
  const provider = ZO_NotificationProvider.New<LibNotificationProviderInstance>(
    self,
    notificationManager
  )
  table.insert(notificationManager.providers, provider)
  return provider
}

NOTIFICATION_PROVIDER.BuildNotificationList = function (
  this: LibNotificationProviderInstance
): undefined {
  ZO_ClearNumericallyIndexedTable(this.list)

  const notifications = this.providerLinkTable.notifications
  this.list = ZO_DeepTableCopy(notifications)
}

const KEYBOARD_PROVIDER = NOTIFICATION_PROVIDER.Subclass<LibNotificationProviderClass>()

KEYBOARD_PROVIDER.New = function (
  this: void,
  self: LibNotificationProviderClass,
  notificationManager: NotificationManager
): LibNotificationProviderInstance {
  return NOTIFICATION_PROVIDER.New(self, notificationManager)
}

KEYBOARD_PROVIDER.Accept = function (
  this: LibNotificationProviderInstance,
  data: NotificationData
): undefined {
  if (data.keyboardAcceptCallback !== undefined) {
    data.keyboardAcceptCallback(data)
  }
}

KEYBOARD_PROVIDER.Decline = function (
  this: LibNotificationProviderInstance,
  data: NotificationData,
  _button?: unknown,
  _openedFromKeybind?: unknown
): undefined {
  const callback = data.keyboardDeclineCallback ?? data.keybaordDeclineCallback
  if (callback !== undefined) {
    callback(data)
  }
}

const GAMEPAD_PROVIDER = NOTIFICATION_PROVIDER.Subclass<LibNotificationProviderClass>()

GAMEPAD_PROVIDER.New = function (
  this: void,
  self: LibNotificationProviderClass,
  notificationManager: NotificationManager
): LibNotificationProviderInstance {
  return NOTIFICATION_PROVIDER.New(self, notificationManager)
}

GAMEPAD_PROVIDER.Accept = function (
  this: LibNotificationProviderInstance,
  data: NotificationData
): undefined {
  if (data.gamepadAcceptCallback !== undefined) {
    data.gamepadAcceptCallback(data)
  }
}

GAMEPAD_PROVIDER.Decline = function (
  this: LibNotificationProviderInstance,
  data: NotificationData,
  _button?: unknown,
  _openedFromKeybind?: unknown
): undefined {
  if (data.gamepadDeclineCallback !== undefined) {
    data.gamepadDeclineCallback(data)
  }
}

export { GAMEPAD_PROVIDER, KEYBOARD_PROVIDER }
