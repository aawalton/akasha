export type TextureFn = (this: void, data: NotificationData) => string

export interface NotificationData {
  notificationType: number
  texture?: string | TextureFn
  heading?: string
  index?: number
  shortDisplayText?: string
  acceptText?: unknown
  declineText?: unknown
  keyboardAcceptCallback?: (this: void, data: NotificationData) => void
  keyboardDeclineCallback?: (this: void, data: NotificationData) => void
  keybaordDeclineCallback?: (this: void, data: NotificationData) => void
  gamepadAcceptCallback?: (this: void, data: NotificationData) => void
  gamepadDeclineCallback?: (this: void, data: NotificationData) => void
  [key: string]: unknown
}

export interface NotificationRowControl extends Control {
  notificationType?: number
  index?: number
  acceptText?: unknown
  declineText?: unknown
  data?: NotificationData
  [key: string]: unknown
}

export interface NotificationManager {
  providers: object[]
  [key: string]: unknown
}

export interface LibNotificationProviderInstance {
  list: NotificationData[]
  providerLinkTable: ProviderLinkTable
  pushUpdateCallback: (this: LibNotificationProviderInstance) => void
  [key: string]: unknown
}

export interface LibNotificationProviderClass {
  Subclass: <T = LibNotificationProviderClass>(this: LibNotificationProviderClass) => T
  New: (
    this: void,
    self: LibNotificationProviderClass,
    notificationManager: NotificationManager
  ) => LibNotificationProviderInstance
  BuildNotificationList: (this: LibNotificationProviderInstance) => undefined
  Accept: (this: LibNotificationProviderInstance, data: NotificationData) => undefined
  Decline: (
    this: LibNotificationProviderInstance,
    data: NotificationData,
    button?: unknown,
    openedFromKeybind?: unknown
  ) => undefined
  [key: string]: unknown
}

export interface ProviderLinkTable {
  notifications: NotificationData[]
  keyboardProvider: LibNotificationProviderInstance | undefined
  gamepadProvider: LibNotificationProviderInstance
  UpdateNotifications: (this: void) => void
}

export interface Lib {
  CreateProvider: (this: void) => ProviderLinkTable
}
