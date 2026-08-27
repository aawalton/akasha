// AUTO-GENERATED from upstream Destinations v30.06 data/DestinationsSharedData.lua via a one-time Lua-VM port — do not edit the data by hand.
// Frozen vendored snapshot: there is no in-tree regenerator. To refresh from a newer upstream, restore
// the port bootstrap (scripts/destinations/port-data.ts) from git history (deleted in 6b90f17dda) and re-port.
import { achDataStorePart1 } from "./shared-data-part-1-data.generated"
import { achDataStorePart2 } from "./shared-data-part-2-data.generated"
import { achDataStorePart3 } from "./shared-data-part-3-data.generated"
import { achDataStorePart4 } from "./shared-data-part-4-data.generated"
import { achDataStorePart5 } from "./shared-data-part-5-data.generated"
import { achDataStorePart6 } from "./shared-data-part-6-data.generated"
import { achDataStorePart7 } from "./shared-data-part-7-data.generated"
import { achDataStorePart8 } from "./shared-data-part-8-data.generated"
import { achDataStorePart9 } from "./shared-data-part-9-data.generated"

export const ACHDataIndex = {
  ID: 4,
  KEYCODE: 6,
  STATUS: 5,
  TYPE: 3,
  X: 1,
  Y: 2,
}
export const ACHDataStore = {
  ...achDataStorePart1,
  ...achDataStorePart2,
  ...achDataStorePart3,
  ...achDataStorePart4,
  ...achDataStorePart5,
  ...achDataStorePart6,
  ...achDataStorePart7,
  ...achDataStorePart8,
  ...achDataStorePart9,
}
export const DocksHighIsle = 1
export const Portals = 3
export const QOLDataStore = {
  [160]: [
    {
      pinName: "Bitterblade Stables",
      pinTitle: "Bitterblade Fine Steeds",
      pinsType: 2,
      x: 0.366354078,
      y: 0.2584021091,
    },
  ],
  [448]: [
    {
      pinName: "Portal to Eyevea",
      pinsType: 3,
      x: 0.6495081782341,
      y: 0.63021856546402,
    },
  ],
  [1940]: [
    {
      pinName: "Portal to Fargrave",
      pinsType: 3,
      x: 0.16614331305027,
      y: 0.48378404974937,
    },
  ],
  [2114]: [
    {
      pinName: "To All Flags Islet",
      pinsType: 1,
      x: 0.3763126432,
      y: 0.7147346735,
    },
    {
      pinName: "To Steadfast Manor",
      pinsType: 1,
      x: 0.3117929697,
      y: 0.6673734784,
    },
    {
      pinName: "To Dufort Shipyard",
      pinsType: 1,
      x: 0.6510598659,
      y: 0.4716517329,
    },
  ],
  [2214]: [
    {
      pinName: "To Dufort Shipyard",
      pinsType: 1,
      x: 0.2604621052,
      y: 0.5057994127,
    },
  ],
  [2343]: [
    {
      pinName: "Portal to Apocrypha",
      pinsType: 3,
      x: 0.6000816822052,
      y: 0.52468365430832,
    },
  ],
  [2514]: [
    {
      pinName: "Portal to The Scholarium",
      pinsType: 3,
      x: 0.3430613577,
      y: 0.8155988454,
    },
  ],
}
export const Stable = 2
