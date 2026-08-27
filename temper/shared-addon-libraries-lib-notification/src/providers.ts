import type {
  LibNotificationProviderClass,
  LibNotificationProviderInstance,
  NotificationData,
  NotificationManager,
} from "./types"

const libNotificationProvider = ZO_NotificationProvider.Subclass<LibNotificationProviderClass>()

libNotificationProvider.New = function (
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

libNotificationProvider.BuildNotificationList = function (
  this: LibNotificationProviderInstance
): undefined {
  ZO_ClearNumericallyIndexedTable(this.list)

  const notifications = this.providerLinkTable.notifications
  this.list = ZO_DeepTableCopy(notifications)
}

const libNotificationKeyboardProvider =
  libNotificationProvider.Subclass<LibNotificationProviderClass>()

libNotificationKeyboardProvider.New = function (
  this: void,
  self: LibNotificationProviderClass,
  notificationManager: NotificationManager
): LibNotificationProviderInstance {
  return libNotificationProvider.New(self, notificationManager)
}

libNotificationKeyboardProvider.Accept = function (
  this: LibNotificationProviderInstance,
  data: NotificationData
): undefined {
  if (data.keyboardAcceptCallback !== undefined) {
    data.keyboardAcceptCallback(data)
  }
}

libNotificationKeyboardProvider.Decline = function (
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

const libNotificationGamepadProvider =
  libNotificationProvider.Subclass<LibNotificationProviderClass>()

libNotificationGamepadProvider.New = function (
  this: void,
  self: LibNotificationProviderClass,
  notificationManager: NotificationManager
): LibNotificationProviderInstance {
  return libNotificationProvider.New(self, notificationManager)
}

libNotificationGamepadProvider.Accept = function (
  this: LibNotificationProviderInstance,
  data: NotificationData
): undefined {
  if (data.gamepadAcceptCallback !== undefined) {
    data.gamepadAcceptCallback(data)
  }
}

libNotificationGamepadProvider.Decline = function (
  this: LibNotificationProviderInstance,
  data: NotificationData,
  _button?: unknown,
  _openedFromKeybind?: unknown
): undefined {
  if (data.gamepadDeclineCallback !== undefined) {
    data.gamepadDeclineCallback(data)
  }
}

export { libNotificationGamepadProvider, libNotificationKeyboardProvider }
