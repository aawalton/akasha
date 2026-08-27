interface TemperHudHideApi {
  registerHideableComponent: (
    this: void,
    id: string,
    resolve: (this: void) => unknown,
    reason: string
  ) => undefined
  setComponentHidden: (this: void, id: string, hidden: boolean) => undefined
}

declare var TemperHud: TemperHudHideApi | undefined
