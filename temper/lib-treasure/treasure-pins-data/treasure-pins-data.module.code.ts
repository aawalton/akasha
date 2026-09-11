import { TREASURE_PINS_00 } from "akasha/temper/lib-treasure/treasure-pins-data-00/treasure-pins-data-00.module.code.ts"
import { TREASURE_PINS_01 } from "akasha/temper/lib-treasure/treasure-pins-data-01/treasure-pins-data-01.module.code.ts"
import { TREASURE_PINS_02 } from "akasha/temper/lib-treasure/treasure-pins-data-02/treasure-pins-data-02.module.code.ts"
import { TREASURE_PINS_03 } from "akasha/temper/lib-treasure/treasure-pins-data-03/treasure-pins-data-03.module.code.ts"
import type { AllData } from "akasha/temper/lib-treasure/treasure-types/treasure-types.module.code.ts"

export const ALL_DATA: AllData = {
  ...TREASURE_PINS_00,
  ...TREASURE_PINS_01,
  ...TREASURE_PINS_02,
  ...TREASURE_PINS_03,
}
