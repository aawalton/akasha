import type { HideMechanism } from "@temper/shared-interface-hud-scene-catalog/schema"

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
