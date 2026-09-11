import { FOV } from "akasha/temper/navigation-addon/compass-pins-constants/compass-pins-constants.module.code.ts"
import type { CompassPinLayout } from "akasha/temper/navigation-addon/compass-pins-types/compass-pins-types.module.code.ts"

export const pinLayouts = new LuaTable<AnyNotNil, CompassPinLayout>()

export const STATE = {
  distanceCoefficient: 1,
  defaultFOV: FOV,
}
