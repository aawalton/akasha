import { asVotansMiniMap } from "../minimap-casts/minimap-casts.module.code.ts"
import type {
  AccountSettings,
  PlayerSettings,
} from "../minimap-saved-variables/minimap-saved-variables.module.code.ts"
import type {
  ColorDef,
  LooseTable,
  MiniMapControl,
} from "../minimap-view-types/minimap-view-types.module.code.ts"

export const ZONE_ALERT_MODE = {
  Always: "ALWAYS",
  MiniMapHidden: "MINIMAPHIDDEN",
  Never: "NEVER",
} as const

export const COMPASS_MODE = {
  Untouched: "UNTOUCHED",
  Hidden: "HIDDEN",
  Shown: "SHOWN",
} as const

export const FONT_FACES: Record<string, [string, number] | string> = {
  MEDIUM_FONT: ["$(MEDIUM_FONT)", 1],
  BOLD_FONT: ["$(BOLD_FONT)", 1],
  CHAT_FONT: ["$(CHAT_FONT)", 1],
  GAMEPAD_LIGHT_FONT: ["$(GAMEPAD_LIGHT_FONT)", 1.3],
  GAMEPAD_MEDIUM_FONT: ["$(GAMEPAD_MEDIUM_FONT)", 1.3],
  GAMEPAD_BOLD_FONT: ["$(GAMEPAD_BOLD_FONT)", 1.3],
  ANTIQUE_FONT: ["$(ANTIQUE_FONT)", 1],
  HANDWRITTEN_FONT: ["$(HANDWRITTEN_FONT)", 0.95],
  STONE_TABLET_FONT: ["$(STONE_TABLET_FONT)", 0.9],
}

export interface FrameStyleData {
  value: string
  setup: (this: void, ...args: unknown[]) => unknown
  reset?: (this: void, ...args: unknown[]) => unknown
}
export interface FrameStyleItem {
  name: string
  data: FrameStyleData
}

export interface FontSizeData {
  size: number
  offsetY: number
}
export interface FontSizeItem {
  name: string
  data: FontSizeData
}

export interface VotansMiniMap {
  name: string
  zoneAlertMode: typeof ZONE_ALERT_MODE
  compassMode: typeof COMPASS_MODE
  fontFaces: Record<string, [string, number] | string>

  isSpecialZoom: boolean
  specialZoom: number
  isMounted: boolean
  zoomMode: string
  accountDefaults: AccountSettings
  account: AccountSettings
  defaults: PlayerSettings
  player: PlayerSettings
  mapVars?: LooseTable
  titleColor?: ColorDef
  pinManager?: LooseTable
  panZoom?: LooseTable

  modeData?: LooseTable
  background?: MiniMapControl
  clockRealTime?: MiniMapControl
  clockInGame?: MiniMapControl
  cameraAngleLeft?: Control
  cameraAngleRight?: Control
  cameraAngleRad?: number
  cameraAngle?: number
  scale?: number
  limitedScale?: number
  lastTitleFont?: string
  wasMapAdded?: boolean
  settingsScene?: LooseTable
  pinScales?: Record<string, number>

  GetCurrentZoom: (this: VotansMiniMap) => number
  SetCurrentZoom: (this: VotansMiniMap, zoom: number) => void
  InitTweaks: (this: VotansMiniMap) => void
  InitRequiredModifications: (this: VotansMiniMap) => void
  InitCameraAngle: (this: VotansMiniMap) => void
  InitMiniMap: (this: VotansMiniMap) => void
  CalculateScale: (this: VotansMiniMap, pinType: number) => number
  ShowClock: (this: void) => void
  RestorePosition: (this: VotansMiniMap) => void
  StartFollowPlayer: (this: VotansMiniMap) => void
  StopFollowPlayer: (this: VotansMiniMap) => void
  UpdateVisibility: (this: VotansMiniMap) => void
  SetMapHeader: (this: VotansMiniMap) => void
  GoMiniMapMode: (this: VotansMiniMap, skipWorldMapUpdate?: boolean) => void
  GoWorldMapMode: (this: VotansMiniMap, skipPanToPlayer?: boolean) => void
  UpdateBorder: (this: VotansMiniMap) => void
  UpdateCompass: (this: VotansMiniMap) => void
  UpdateDrawLevel: (this: VotansMiniMap) => void
  Initialize: (this: VotansMiniMap) => void
  ToggleShowMap: (this: VotansMiniMap) => void
  ToggleShowHUD: (this: VotansMiniMap) => void
  ToggleShowCombat: (this: VotansMiniMap) => void
  ToggleShowSiege: (this: VotansMiniMap) => void
  ToggleShowInHousing: (this: VotansMiniMap) => void
  ToogleZoom: (this: VotansMiniMap, enabled: boolean, zoom?: number) => void
  StepZoom: (this: VotansMiniMap, add: boolean) => void
  ToggleFixedOffset: (this: VotansMiniMap) => void

  GetFontSizeBySizeName: (
    this: VotansMiniMap,
    sizeName: string | number
  ) => FontSizeItem | undefined
  GetStyleByName: (this: VotansMiniMap, name: string) => FrameStyleItem | undefined
  AddBorderStyle: (
    this: VotansMiniMap,
    name: string,
    displayText: string,
    setupFunction: (this: void, ...args: unknown[]) => unknown,
    resetFunction: ((this: void, ...args: unknown[]) => unknown) | undefined
  ) => void
  AddFont: (this: VotansMiniMap, font: string, displayText: string) => void
  AddFontSize: (this: VotansMiniMap, fontSize: number, displayText: string, offsetY: number) => void
  InitMapSettings: (this: VotansMiniMap) => void
  InitSettings: (this: VotansMiniMap) => void
  InitPinSizes: (this: VotansMiniMap) => void
}

export const holder: VotansMiniMap = asVotansMiniMap({
  name: "TemperVotansMiniMap",
  zoneAlertMode: ZONE_ALERT_MODE,
  compassMode: COMPASS_MODE,
  fontFaces: FONT_FACES,
  isSpecialZoom: false,
  specialZoom: 1,
  isMounted: false,
  zoomMode: "zoom",
})
