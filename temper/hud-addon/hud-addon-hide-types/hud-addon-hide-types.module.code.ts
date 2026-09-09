import type { HideMechanism } from "akasha/temper/hud-components/hud-component-record/hud-component-record.module.code.ts"

export interface HideRegistration {
  id: string
  resolve: (this: void) => unknown
  reason: string
}

export interface HidePlanEntry {
  id: string
  reason: string
  hidden: boolean
  mechanism: HideMechanism
}
