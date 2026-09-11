export interface PanelCallbacks {
  RegisterCallback: (callbackName: string, callback: (this: void, ...args: never[]) => void) => void
  UnregisterCallback: (
    callbackName: string,
    callback?: (this: void, ...args: never[]) => void
  ) => void
}

export function whenPanelControlsCreated(
  this: void,
  callbacks: PanelCallbacks,
  panel: unknown,
  run: (this: void) => undefined
): undefined {
  const created = (made: unknown): undefined => {
    if (made === panel) {
      run()
      callbacks.UnregisterCallback("LAM-PanelControlsCreated", created)
    }
  }
  callbacks.RegisterCallback("LAM-PanelControlsCreated", created)
}
