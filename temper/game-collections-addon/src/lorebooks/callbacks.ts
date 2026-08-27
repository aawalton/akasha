const callbackObject = ZO_CallbackObject.New()

export function registerCallback(
  eventName: string,
  callback: (this: void, ...args: unknown[]) => void
): undefined {
  callbackObject.RegisterCallback(eventName, callback)
}

export function unregisterCallback(
  eventName: string,
  callback: (this: void, ...args: unknown[]) => void
): undefined {
  callbackObject.UnregisterCallback(eventName, callback)
}

export function fireCallbacks(eventName: string, ...args: unknown[]): undefined {
  callbackObject.FireCallbacks(eventName, ...args)
}
