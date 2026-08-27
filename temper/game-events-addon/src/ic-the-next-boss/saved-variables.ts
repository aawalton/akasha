import { SAVED_VARIABLES_NAME } from "./constants"
import { ICT, type IctSavedVariables } from "./state"

const DEFAULTS: IctSavedVariables = {
  timetable: true,
  timetableTop: 0,
  timetableLeft: 0,
  eventtimers: false,
  maptimers: true,
  chatdebug: false,
  ccw_cw: false,
  saved_timers: {},
}

export function initializeSavedVariables(this: void): undefined {
  ICT.savedVariables = ZO_SavedVars.NewAccountWide<IctSavedVariables>(
    SAVED_VARIABLES_NAME,
    1,
    undefined,
    DEFAULTS
  )
  return undefined
}
