import { initDestinations } from "./destinations/init"
import { initMapPins } from "./mappins/init"
import { initVotansMiniMap } from "./votans-minimap/init"

export function OnAddOnLoaded(this: void): undefined {
  initMapPins()
  initDestinations()
  initVotansMiniMap()
  return undefined
}
