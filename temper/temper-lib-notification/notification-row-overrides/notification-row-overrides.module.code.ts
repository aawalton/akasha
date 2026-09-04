import { asTextureControl } from "../notification-casts/notification-casts.module.code.ts"
import type {
  NotificationData,
  NotificationRowControl,
  TextureFn,
} from "../notification-types/notification-types.module.code.ts"

function setupBaseRow(
  this: ZoKeyboardNotificationManager,
  control: NotificationRowControl,
  data: NotificationData
): undefined {
  ZO_SortFilterList.SetupRow(this.sortFilterList, control, data)

  const notificationType = data.notificationType
  let texture = data.texture ?? ZO_KEYBOARD_NOTIFICATION_ICONS[notificationType]
  const headingText =
    data.heading ??
    zo_strformat(
      SI_NOTIFICATIONS_TYPE_FORMATTER,
      GetString("SI_NOTIFICATIONTYPE", notificationType)
    )

  control.notificationType = notificationType
  control.index = data.index

  if (data.acceptText === undefined) {
    data.acceptText = control.acceptText
  }

  if (data.declineText === undefined) {
    data.declineText = control.declineText
  }

  control.data = data

  if (type(texture) === "function") {
    texture = (texture as TextureFn)(data)
  }
  asTextureControl(GetControl(control, "Icon")).SetTexture(texture as string)
  const typeLabel = GetControl(control, "Type") as LabelControl
  typeLabel.SetText(headingText)
}

function addDataEntry(
  this: ZoGamepadNotificationManager,
  dataType: number,
  data: NotificationData,
  isHeader?: boolean
): undefined {
  let texture = data.texture ?? ZO_GAMEPAD_NOTIFICATION_ICONS[data.notificationType]
  const headingText =
    data.heading ??
    zo_strformat(
      SI_NOTIFICATIONS_TYPE_FORMATTER,
      GetString("SI_NOTIFICATIONTYPE", data.notificationType)
    )

  if (type(texture) === "function") {
    texture = (texture as TextureFn)(data)
  }
  const entryData = ZO_GamepadEntryData.New(data.shortDisplayText, texture as string)
  entryData.data = data
  entryData.SetIconTintOnSelection(true)
  entryData.SetIconDisabledTintOnSelection(true)

  if (isHeader === true) {
    entryData.SetHeader(headingText)
    this.list.AddEntryWithHeader(ZO_NOTIFICATION_TYPE_TO_GAMEPAD_TEMPLATE[dataType], entryData)
  } else {
    this.list.AddEntry(ZO_NOTIFICATION_TYPE_TO_GAMEPAD_TEMPLATE[dataType], entryData)
  }
}

export function installOverrides(this: void): undefined {
  if (NOTIFICATIONS !== undefined) {
    NOTIFICATIONS.SetupBaseRow = setupBaseRow
  }

  GAMEPAD_NOTIFICATIONS.AddDataEntry = addDataEntry
}
