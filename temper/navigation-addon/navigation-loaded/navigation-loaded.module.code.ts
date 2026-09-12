import { initDestinations } from "akasha/temper/navigation-addon/modules/destinations-start/destinations-start.module.code.ts"
import { initMapPins } from "akasha/temper/navigation-addon/modules/map-pins-start/map-pins-start.module.code.ts"
import { initVotansMiniMap } from "akasha/temper/navigation-addon/modules/minimap-start/minimap-start.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  initMapPins()
  initDestinations()
  initVotansMiniMap()
  return undefined
}
