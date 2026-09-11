import { LIBRARY_DATA_00 } from "akasha/temper/lorebooks/lorebooks-library-data-00/lorebooks-library-data-00.module.code.ts"
import { LIBRARY_DATA_01 } from "akasha/temper/lorebooks/lorebooks-library-data-01/lorebooks-library-data-01.module.code.ts"
import { LIBRARY_DATA_02 } from "akasha/temper/lorebooks/lorebooks-library-data-02/lorebooks-library-data-02.module.code.ts"
import { LIBRARY_DATA_03 } from "akasha/temper/lorebooks/lorebooks-library-data-03/lorebooks-library-data-03.module.code.ts"
import { LIBRARY_DATA_04 } from "akasha/temper/lorebooks/lorebooks-library-data-04/lorebooks-library-data-04.module.code.ts"
import { LIBRARY_DATA_05 } from "akasha/temper/lorebooks/lorebooks-library-data-05/lorebooks-library-data-05.module.code.ts"
import type { EideticLibraryTable } from "akasha/temper/lorebooks/lorebooks-types/lorebooks-types.module.code.ts"

export const LIBRARY_DATA: EideticLibraryTable = {
  [1]: {
    ...LIBRARY_DATA_00,
  },
  [2]: {
    ...LIBRARY_DATA_01,
    ...LIBRARY_DATA_02,
    ...LIBRARY_DATA_03,
  },
  [3]: {
    ...LIBRARY_DATA_04,
    ...LIBRARY_DATA_05,
  },
}
