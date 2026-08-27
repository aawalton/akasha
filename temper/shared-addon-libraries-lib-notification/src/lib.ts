import { libNotificationGamepadProvider, libNotificationKeyboardProvider } from "./providers"
import type { Lib, LibNotificationProviderInstance, ProviderLinkTable } from "./types"

function createProvider(this: void): ProviderLinkTable {
  let keyboardProvider: LibNotificationProviderInstance | undefined
  if (NOTIFICATIONS !== undefined) {
    keyboardProvider = libNotificationKeyboardProvider.New(
      libNotificationKeyboardProvider,
      NOTIFICATIONS
    )
  }
  const gamepadProvider = libNotificationGamepadProvider.New(
    libNotificationGamepadProvider,
    GAMEPAD_NOTIFICATIONS
  )

  const provider: ProviderLinkTable = {
    notifications: [],
    keyboardProvider,
    gamepadProvider,
    UpdateNotifications: (): undefined => {
      if (keyboardProvider !== undefined) {
        keyboardProvider.pushUpdateCallback()
      }
      gamepadProvider.pushUpdateCallback()
    },
  }
  if (keyboardProvider !== undefined) {
    keyboardProvider.providerLinkTable = provider
  }
  gamepadProvider.providerLinkTable = provider

  return provider
}

export const lib: Lib = {
  CreateProvider: createProvider,
}
