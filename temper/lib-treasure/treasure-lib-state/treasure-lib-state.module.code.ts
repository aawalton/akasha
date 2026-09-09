import { buildDerivedData } from "../treasure-build-data/treasure-build-data.module.code.ts"
import { LIB_NAME } from "../treasure-constants/treasure-constants.module.code.ts"
import { ICONS } from "../treasure-icons/treasure-icons.module.code.ts"
import type { LibTreasureTable } from "../treasure-types/treasure-types.module.code.ts"

function getAddonVersion(this: void): number | undefined {
  const addOnManager = GetAddOnManager()
  const numAddOns = addOnManager.GetNumAddOns()
  if (typeof numAddOns !== "number") return undefined
  for (let i = 1; i <= numAddOns; i += 1) {
    const [name] = addOnManager.GetAddOnInfo(i)
    if (name === LIB_NAME) {
      return addOnManager.GetAddOnVersion(i)
    }
  }
  return undefined
}

export const LIB: LibTreasureTable = {
  name: LIB_NAME,
  version: getAddonVersion(),
  data: buildDerivedData(),
  icons: ICONS,
}
