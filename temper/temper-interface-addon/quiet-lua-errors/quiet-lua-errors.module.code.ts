import { getSavedVariables } from "../quiet-saved-variables/quiet-saved-variables.module.code.ts"
import { STRINGS } from "../quiet-strings/quiet-strings.module.code.ts"

interface LuaErrorNotificationData {
  notificationId: number
}

export function handleLuaErrorEvent(this: void): undefined {
  const savedVars = getSavedVariables()

  if (savedVars.luaError >= 1) {
    EVENT_MANAGER.UnregisterForEvent("ErrorFrame", EVENT_LUA_ERROR)

    const seenBugs: Record<string, boolean | undefined> = {}

    function onLuaError(this: void, _eventCode: number, errString: string): undefined {
      if (savedVars.luaError === 1) {
        const libNotifications = LibNotifications
        const provider = libNotifications.CreateProvider()

        const removeNotification = function (
          this: void,
          data: LuaErrorNotificationData
        ): undefined {
          table.remove(provider.notifications, data.notificationId)
          provider.UpdateNotifications()
        }

        if (seenBugs[errString] !== true) {
          const msg = {
            dataType: NOTIFICATIONS_REQUEST_DATA,
            secsSinceRequest: ZO_NormalizeSecondsSince(0),
            message: STRINGS.NOTYOU_LUAERR_MESSAGE,
            note: errString,
            heading: STRINGS.NOTYOU_LUAERR_HEADING,
            texture: "/esoui/art/miscellaneous/eso_icon_warning.dds",
            shortDisplayText: STRINGS.NOTYOU_LUAERR_SHORT,
            controlsOwnSounds: true,
            keyboardAcceptCallback: function (
              this: void,
              data: LuaErrorNotificationData
            ): undefined {
              ZO_ERROR_FRAME.OnUIError(errString)
              removeNotification(data)
            },
            keybaordDeclineCallback: removeNotification,
            gamepadAcceptCallback: function (
              this: void,
              data: LuaErrorNotificationData
            ): undefined {
              ZO_ERROR_FRAME.OnUIError(errString)
              removeNotification(data)
            },
            gamepadDeclineCallback: removeNotification,
            data: { errString: errString },
          }

          table.insert(provider.notifications, msg)
          provider.UpdateNotifications()
          seenBugs[errString] = true
        }
      } else if (savedVars.luaError === 2) {
        if (seenBugs[errString] !== true) {
          d(errString)
          seenBugs[errString] = true
        }
      }
    }

    EVENT_MANAGER.RegisterForEvent("LUA_ERROR", EVENT_LUA_ERROR, onLuaError)
  }
}
