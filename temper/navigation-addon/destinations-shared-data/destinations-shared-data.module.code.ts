import { ACH_DATA_STORE_00 } from "../destinations-shared-data-00/destinations-shared-data-00.module.code.ts"
import { ACH_DATA_STORE_01 } from "../destinations-shared-data-01/destinations-shared-data-01.module.code.ts"
import { ACH_DATA_STORE_02 } from "../destinations-shared-data-02/destinations-shared-data-02.module.code.ts"
import { ACH_DATA_STORE_03 } from "../destinations-shared-data-03/destinations-shared-data-03.module.code.ts"
import { ACH_DATA_STORE_04 } from "../destinations-shared-data-04/destinations-shared-data-04.module.code.ts"
import { ACH_DATA_STORE_05 } from "../destinations-shared-data-05/destinations-shared-data-05.module.code.ts"
import { ACH_DATA_STORE_06 } from "../destinations-shared-data-06/destinations-shared-data-06.module.code.ts"
import { ACH_DATA_STORE_07 } from "../destinations-shared-data-07/destinations-shared-data-07.module.code.ts"
import { ACH_DATA_STORE_08 } from "../destinations-shared-data-08/destinations-shared-data-08.module.code.ts"
import { ACH_DATA_STORE_09 } from "../destinations-shared-data-09/destinations-shared-data-09.module.code.ts"
import { ACH_DATA_STORE_10 } from "../destinations-shared-data-10/destinations-shared-data-10.module.code.ts"
import { ACH_DATA_STORE_11 } from "../destinations-shared-data-11/destinations-shared-data-11.module.code.ts"
import { ACH_DATA_STORE_12 } from "../destinations-shared-data-12/destinations-shared-data-12.module.code.ts"

export const ACH_DATA_STORE = {
  ...ACH_DATA_STORE_00,
  ...ACH_DATA_STORE_01,
  ...ACH_DATA_STORE_02,
  ...ACH_DATA_STORE_03,
  ...ACH_DATA_STORE_04,
  ...ACH_DATA_STORE_05,
  ...ACH_DATA_STORE_06,
  ...ACH_DATA_STORE_07,
  ...ACH_DATA_STORE_08,
  ...ACH_DATA_STORE_09,
  ...ACH_DATA_STORE_10,
  ...ACH_DATA_STORE_11,
  ...ACH_DATA_STORE_12,
}
export const ACH_DATA_INDEX = {
  ID: 4,
  KEYCODE: 6,
  STATUS: 5,
  TYPE: 3,
  X: 1,
  Y: 2,
}

export const DOCKS_HIGH_ISLE = 1
export const PORTALS = 3
export const QOL_DATA_STORE = {
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
export const STABLE = 2
