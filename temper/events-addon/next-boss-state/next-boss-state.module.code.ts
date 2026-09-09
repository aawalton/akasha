import "@akasha/temper-eso-types/eso-api-3"
import "@akasha/temper-eso-types/eso-link-handler"
import "@akasha/temper-addon-library-types/lib-group-broadcast"

import {
  ADDON_NAME,
  ADDON_VERSION,
  FALLBACK_MAX_TIME,
  SPAWNTIME_DEFAULT,
  SPAWNTIME_MOLAG,
} from "../next-boss-constants/next-boss-constants.module.code.ts"

export interface IctUi {
  opened: boolean
  mapid: number
  timetable: SceneFragment
  maptimers: SceneFragment
  districts: Record<string, LabelControl>
}

export interface IctSavedVariables {
  timetable: boolean
  timetableTop: number
  timetableLeft: number
  eventtimers: boolean
  maptimers: boolean
  chatdebug: boolean
  ccw_cw: boolean
  saved_timers: Record<string, number>
}

export interface Ict {
  name: string
  version: string
  running: boolean
  spawntime: number
  spawntimeMolag: number
  fallbackMaxTime: number

  locations: Record<string, string>
  timetable: Record<string, number>
  datas: Record<number, number>
  nextcw: Record<number, number>
  nextccw: Record<number, number>
  fallbackTimes: Record<string, number>

  ui: IctUi
  savedVariables: IctSavedVariables
  protocol: GroupBroadcastProtocol | undefined
  handler: GroupBroadcastHandler | undefined

  updateTimers: (this: void) => undefined
  saveTimers: (this: void) => undefined
  restoreTimers: (this: void) => undefined
  resetTimers: (this: void) => undefined
  startTimer: (this: void, district: string, spawntime: number, share: boolean) => undefined
  markDistrict: (this: void, districtId: number) => undefined
  getDistrictId: (this: void, district: string) => number
  markDead: (this: void, districtStringId: number) => undefined
  unitDead: (this: void, unitName: string | undefined) => undefined
  secondsToClock: (this: void, sec: number) => string
  editSpawnTime: (this: void) => undefined
  switchDirection: (this: void) => undefined

  onMonsterDeath: (this: void, eventCode: number, unitTag: string, isDead: boolean) => undefined
  onMonsterReticle: (this: void, eventCode: number) => undefined
  onZoneChange: (this: void, eventCode: number, initial: boolean) => undefined
  enable: (this: void) => undefined
  disable: (this: void) => undefined
  showTimetable: (this: void) => undefined
  handleClickEvent: LinkHandlerCallback
  shareCode: (this: void, code: number | undefined) => undefined

  disableMapMouseWheelZoom: (this: void) => undefined
  disableMapZoomSlider: (this: void, disabled: boolean) => undefined
  onMapOpen: (this: void) => undefined
  onTableMove: (this: void) => undefined
  restoreUiPosition: (this: void) => undefined

  initializeSettingsMenu: (this: void) => undefined
}

function asIct(value: unknown): Ict {
  return value as Ict
}

export const ICT: Ict = asIct({
  name: ADDON_NAME,
  version: ADDON_VERSION,
  running: false,
  spawntime: SPAWNTIME_DEFAULT,
  spawntimeMolag: SPAWNTIME_MOLAG,
  fallbackMaxTime: FALLBACK_MAX_TIME,
  protocol: undefined,
  handler: undefined,
})
