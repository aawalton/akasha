const CALLBACK_OBJECT = ZO_CallbackObject.New()

export function registerCallback(
  eventName: string,
  callback: (this: void, ...args: unknown[]) => void
): undefined {
  CALLBACK_OBJECT.RegisterCallback(eventName, callback)
}

export function unregisterCallback(
  eventName: string,
  callback: (this: void, ...args: unknown[]) => void
): undefined {
  CALLBACK_OBJECT.UnregisterCallback(eventName, callback)
}

export function fireCallbacks(eventName: string, ...args: unknown[]): undefined {
  CALLBACK_OBJECT.FireCallbacks(eventName, ...args)
}
