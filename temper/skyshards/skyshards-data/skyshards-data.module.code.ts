import { SKYSHARDS_DATA_1 } from "../skyshards-data-1/skyshards-data-1.module.code.ts"
import { SKYSHARDS_DATA_2 } from "../skyshards-data-2/skyshards-data-2.module.code.ts"
import { SKYSHARDS_DATA_3 } from "../skyshards-data-3/skyshards-data-3.module.code.ts"
import type { SkyshardsData } from "../skyshards-types/skyshards-types.module.code.ts"

export const SKYSHARDS_DATA: SkyshardsData = {
  ...SKYSHARDS_DATA_1,
  ...SKYSHARDS_DATA_2,
  ...SKYSHARDS_DATA_3,
}
