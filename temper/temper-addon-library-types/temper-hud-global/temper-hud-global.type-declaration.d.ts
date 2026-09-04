interface TemperHudCell {
  text: string
  color?: readonly [number, number, number]
  alpha?: number
}

interface TemperHudField {
  id: string
  order: number
  compute: (this: void) => TemperHudCell
}

interface TemperHudApi {
  registerField: (this: void, field: TemperHudField) => undefined
  refresh: (this: void) => undefined
  isReady: (this: void) => boolean
  registerHideableComponent: (
    this: void,
    id: string,
    resolve: (this: void) => unknown,
    reason: string
  ) => undefined
  setComponentHidden: (this: void, id: string, hidden: boolean) => undefined
  registerCommand: (
    this: void,
    command: {
      name: string
      description: string
      addon: string
      handler?: (this: void, args: string) => undefined
    }
  ) => undefined
}

declare var TemperHud: TemperHudApi | undefined
