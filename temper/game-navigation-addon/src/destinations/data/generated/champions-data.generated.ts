// AUTO-GENERATED from upstream Destinations v30.06 data/DestinationsChampions.lua via a one-time Lua-VM port — do not edit the data by hand.
// Frozen vendored snapshot: there is no in-tree regenerator. To refresh from a newer upstream, restore
// the port bootstrap (scripts/destinations/port-data.ts) from git history (deleted in 6b90f17dda) and re-port.
import { championTableStorePart1 } from "./champions-data-part-1-data.generated"
import { championTableStorePart2 } from "./champions-data-part-2-data.generated"
import { championTableStorePart3 } from "./champions-data-part-3-data.generated"

export const ChampionTableIndex = {
  ACH: 3,
  IDX: 4,
  X: 1,
  Y: 2,
}
export const ChampionTableStore = {
  ...championTableStorePart1,
  ...championTableStorePart2,
  ...championTableStorePart3,
}
