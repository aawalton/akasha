import { TREASURE_PINS_00 } from "../treasure-pins-data-00/treasure-pins-data-00.module.code.ts"
import { TREASURE_PINS_01 } from "../treasure-pins-data-01/treasure-pins-data-01.module.code.ts"
import { TREASURE_PINS_02 } from "../treasure-pins-data-02/treasure-pins-data-02.module.code.ts"
import { TREASURE_PINS_03 } from "../treasure-pins-data-03/treasure-pins-data-03.module.code.ts"
import type { AllData } from "../treasure-types/treasure-types.module.code.ts"

export const ALL_DATA: AllData = {
  ...TREASURE_PINS_00,
  ...TREASURE_PINS_01,
  ...TREASURE_PINS_02,
  ...TREASURE_PINS_03,
}
