import { VISIBILITY_VERSION_BASELINE } from "../hud-addon-visibility-version/hud-addon-visibility-version.module.code.ts"

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
  schemaVersion: VISIBILITY_VERSION_BASELINE,
  session: { startTime: 0 },
  componentVisibility: {},
}

export interface TemperCommand {
  name: string
  description: string
  addon: string
  handler?: (this: void, args: string) => undefined
}
