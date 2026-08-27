import { holder, type VotansMiniMap } from "../holder"
import { installDimensionRounding } from "./tweaks-dimensions"
import {
  installDeferRefreshes,
  installRefreshCustomPins,
  installUpdatePinsForMapSizeChange,
} from "./tweaks-pin-managers"
import {
  installRefreshAllPOIs,
  installRefreshLocations,
  installRefreshWayshrines,
} from "./tweaks-refresh-pins"
import type { WayshrineCell } from "./tweaks-shared"

holder.InitTweaks = function (this: VotansMiniMap): undefined {
  const wayshrineCell: WayshrineCell = { node: undefined }

  installRefreshAllPOIs()
  installRefreshWayshrines(this, wayshrineCell)
  installRefreshLocations()
  installDeferRefreshes()
  installRefreshCustomPins(wayshrineCell)
  installUpdatePinsForMapSizeChange()
  installDimensionRounding()

  return undefined
}
