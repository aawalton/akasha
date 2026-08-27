import {
  ADDON_NAME,
  ADDON_VERSION,
  FALLBACK_MAX_TIME,
  SPAWNTIME_DEFAULT,
  SPAWNTIME_MOLAG,
} from "./constants"

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
  protocol: IctBroadcastProtocol | undefined
  handler: IctBroadcastHandler | undefined

  updateTimers: (this: void) => undefined
  saveTimers: (this: void) => undefined
  restoreTimers: (this: void) => undefined
  resetTimers: (this: void) => undefined
  startTimer: (this: void, district: string, spawntime: number, share: boolean) => undefined
  markDistrict: (this: void, districtId: number) => undefined
  getDistrictID: (this: void, district: string) => number
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
  HandleClickEvent: (
    this: void,
    rawLink: string,
    mouseButton: number,
    linkText: string,
    linkStyle: number,
    linkType: string,
    data: string
  ) => boolean | undefined
  ShareCode: (this: void, code: number | undefined) => undefined

  disableMapMouseWheelZoom: (this: void) => undefined
  disableMapZoomSlider: (this: void, disabled: boolean) => undefined
  onMapOpen: (this: void) => undefined
  onTableMove: (this: void) => undefined
  restoreUIPosition: (this: void) => undefined

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
