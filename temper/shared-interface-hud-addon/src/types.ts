import { VISIBILITY_SCHEMA_VERSION_BASELINE } from "./saved-variables-parse"

export interface HudCell {
  text: string
  color?: readonly [number, number, number]
  alpha?: number
}

export interface HudField {
  id: string
  order: number
  compute: (this: void) => HudCell
}

export interface HudSavedVariables {
  schemaVersion: number
  session: { startTime: number }
  componentVisibility: Record<string, boolean>
}

export const HUD_SAVED_VARIABLES_DEFAULTS: HudSavedVariables = {
  schemaVersion: VISIBILITY_SCHEMA_VERSION_BASELINE,
  session: { startTime: 0 },
  componentVisibility: {},
}

export interface TemperCommand {
  name: string
  description: string
  addon: string
  handler?: (this: void, args: string) => undefined
}

export interface TemperHudApi {
  registerField: (this: void, field: HudField) => undefined
  registerCommand: (this: void, command: TemperCommand) => undefined
  refresh: (this: void) => undefined
  isReady: (this: void) => boolean
  registerHideableComponent: (
    this: void,
    id: string,
    resolve: (this: void) => unknown,
    reason: string
  ) => undefined
  setComponentHidden: (this: void, id: string, hidden: boolean) => undefined
}
