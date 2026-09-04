import { CHAMPION_TABLE_STORE_00 } from "../destinations-champions-data-00/destinations-champions-data-00.module.code.ts"
import { CHAMPION_TABLE_STORE_01 } from "../destinations-champions-data-01/destinations-champions-data-01.module.code.ts"
import { CHAMPION_TABLE_STORE_02 } from "../destinations-champions-data-02/destinations-champions-data-02.module.code.ts"
import { CHAMPION_TABLE_STORE_03 } from "../destinations-champions-data-03/destinations-champions-data-03.module.code.ts"

export const CHAMPION_TABLE_STORE = {
  ...CHAMPION_TABLE_STORE_00,
  ...CHAMPION_TABLE_STORE_01,
  ...CHAMPION_TABLE_STORE_02,
  ...CHAMPION_TABLE_STORE_03,
}
export const CHAMPION_TABLE_INDEX = {
  ACH: 3,
  IDX: 4,
  X: 1,
  Y: 2,
}
