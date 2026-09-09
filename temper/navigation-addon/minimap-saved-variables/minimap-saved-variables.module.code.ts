import { SAVED_VARIABLES_NAME } from "../minimap-names/minimap-names.module.code.ts"

export interface AccountSettings {
  enableTweaks: boolean
  enableMap: boolean
  zoom: number
  mountedZoom: number
  subZoneZoom: number
  dungeonZoom: number
  battlegroundZoom: number
  zoomOut: number
  zoomIn: number
  zoomToPlayer: boolean
  frameStyle: string
  borderAlpha: number
  titleFont: string
  titleFontSize: number
  titleColor: number[]
  showClock: boolean
  showRealTimeClock: boolean
  showInGameClock: boolean
  lockWindow: boolean
  showFullTitle: boolean
  showCameraAngle: boolean
  cameraAngle: number
  zoneAlertMode: string
  timeFormat: number
  debug: boolean
  asyncUpdate: boolean
  enableCompass: string
  showOnTop: boolean
  titleAtTop: boolean
  unitPinScaleLimit: number
  showHUD: boolean
  showLoot: boolean
  showMounted: boolean
  showCombat: boolean
  showSiege: boolean
  showInHousing: boolean
  fixedMaps: Record<string, [number, number]>
  showAllTravelNodes: boolean
  pinLevels?: Record<string, number>
  pinSizes?: Record<string, number>
  x?: number
  y?: number
  width?: number
  height?: number
  keepSquare?: boolean
  [key: string]: unknown
}

export interface PlayerSettings {
  showMap: boolean
}

export const SAVED_VARS_VERSION = 1
export const SAVED_VARS_GLOBAL = SAVED_VARIABLES_NAME
