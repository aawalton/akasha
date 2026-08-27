import { buildDerivedData } from "./build-data"
import { LIB_NAME } from "./constants"
import { icons } from "./icons"
import type { LibTreasureTable } from "./types"

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

export const lib: LibTreasureTable = {
  name: LIB_NAME,
  version: getAddonVersion(),
  data: buildDerivedData(),
  icons,
}
