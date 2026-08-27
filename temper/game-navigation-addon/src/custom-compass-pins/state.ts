import { FOV } from "./constants"
import type { CompassPinLayout } from "./types"

export const pinLayouts = new LuaTable<AnyNotNil, CompassPinLayout>()

export const state = {
  distanceCoefficient: 1,
  defaultFOV: FOV,
}
