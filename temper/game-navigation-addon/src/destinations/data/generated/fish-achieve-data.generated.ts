// AUTO-GENERATED from upstream Destinations v30.06 data/DestinationsFishAchieve.lua via a one-time Lua-VM port — do not edit the data by hand.
// Frozen vendored snapshot: there is no in-tree regenerator. To refresh from a newer upstream, restore
// the port bootstrap (scripts/destinations/port-data.ts) from git history (deleted in 6b90f17dda) and re-port.
import { fishLocationsStorePart1 } from "./fish-achieve-data-part-1-data.generated"
import { fishLocationsStorePart2 } from "./fish-achieve-data-part-2-data.generated"

export const FishLocationsIndex = {
  FISHNUMBER: 1,
  LOCATION: 2,
}
export const FishLocationsStore = {
  ...fishLocationsStorePart1,
  ...fishLocationsStorePart2,
}
