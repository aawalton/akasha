import {
  holder,
  type VotansMiniMap,
} from "akasha/temper/navigation-addon/minimap-holder/minimap-holder.module.code.ts"
import { installDimensionRounding } from "akasha/temper/navigation-addon/minimap-tweaks-dimensions/minimap-tweaks-dimensions.module.code.ts"
import {
  installDeferRefreshes,
  installRefreshCustomPins,
  installUpdatePinsForMapSizeChange,
} from "akasha/temper/navigation-addon/minimap-tweaks-pin-managers/minimap-tweaks-pin-managers.module.code.ts"
import {
  installRefreshAllPOIs,
  installRefreshLocations,
  installRefreshWayshrines,
} from "akasha/temper/navigation-addon/minimap-tweaks-refresh-pins/minimap-tweaks-refresh-pins.module.code.ts"
import type { WayshrineCell } from "akasha/temper/navigation-addon/minimap-tweaks-shared/minimap-tweaks-shared.module.code.ts"

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
