let isQueued = false
const storedMessages: string[] = []

export function safePrint(this: void, message: string): undefined {
  if (IsPlayerActivated()) {
    CHAT_SYSTEM.AddMessage(message)
  } else {
    storedMessages.push(message)
    if (!isQueued) {
      isQueued = true
      EVENT_MANAGER.RegisterForEvent(
        "NOTY_Print",
        EVENT_PLAYER_ACTIVATED,
        function (this: void, event: number): undefined {
          EVENT_MANAGER.UnregisterForEvent("NOTY_Print", event)
          for (const message of storedMessages) {
            CHAT_SYSTEM.AddMessage(message)
          }
          ZO_ClearNumericallyIndexedTable(storedMessages)
          isQueued = false
        }
      )
    }
  }
}
