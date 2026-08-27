import { asAnyTable, asAnyTableMember, asMiniMapControl, asMiniMapPin, asNumber } from "../casts"
import { holder } from "../holder"
import { GetScene, NoOp, pins } from "./shared"

interface InitMiniMapState {
  orgUpdateSize: (this: void, ...args: unknown[]) => unknown
  scale: number
  limitedScale: number
  blacklistedPins: Record<number, boolean>
  lastZoom: number
  lastW: number
  lastH: number
  moveToPlayer: (this: void, ...args: unknown[]) => unknown
  asyncCallbacks: AnyAsyncTask | undefined
  runningCallbacks: boolean
}
export const state: InitMiniMapState = {
  orgUpdateSize: NoOp,
  scale: 1,
  limitedScale: 1,
  blacklistedPins: {},
  lastZoom: -1,
  lastW: -1,
  lastH: -1,
  moveToPlayer: ZO_WorldMap_PanToPlayer,
  asyncCallbacks: undefined,
  runningCallbacks: false,
}

holder.CalculateScale = function (this: typeof holder, pinType: number): number {
  return !state.blacklistedPins[pinType] ? state.scale : state.limitedScale
}

export function newUpdateSize(this: void, pin: AnyTable): unknown {
  const radius = pin.radius
  if (radius != null && asNumber(radius) > 0) {
    return state.orgUpdateSize(pin)
  }
  const pinType = asNumber(asMiniMapPin(pin).GetPinType())
  const singlePinData = asAnyTable(ZO_MapPin).PIN_DATA?.[pinType]
  if (singlePinData == null) {
    return state.orgUpdateSize(pin)
  }
  const orgSize = singlePinData.size ?? 20
  const orgMinSize = singlePinData.minSize
  const pinScale = holder.CalculateScale(pinType)
  singlePinData.size = asAnyTableMember(asNumber(orgSize) * pinScale)
  singlePinData.minSize = asAnyTableMember(
    orgMinSize != null ? asNumber(orgMinSize) * pinScale : undefined
  )
  state.orgUpdateSize(pin)
  singlePinData.size = asAnyTableMember(orgSize)
  singlePinData.minSize = asAnyTableMember(orgMinSize)
  return undefined
}

holder.ShowClock = function (this: void): undefined {
  const account = holder.account
  const clockRealTime = asMiniMapControl(holder.clockRealTime)
  const clockInGame = asMiniMapControl(holder.clockInGame)
  if (account.showRealTimeClock) {
    const [realTimeText] = FormatTimeSeconds(
      GetSecondsSinceMidnight(),
      TIME_FORMAT_STYLE_CLOCK_TIME,
      holder.account.timeFormat,
      TIME_FORMAT_DIRECTION_NONE
    )
    clockRealTime.SetText(realTimeText)
  } else {
    clockRealTime.SetText("")
  }

  if (account.showInGameClock) {
    const igSecondsPerDay = 20955
    const rlTimeStamp = GetTimeStamp()
    const inGameTime = ((rlTimeStamp % igSecondsPerDay) * 86400) / igSecondsPerDay
    const [inGameText] = FormatTimeSeconds(
      inGameTime,
      TIME_FORMAT_STYLE_CLOCK_TIME,
      holder.account.timeFormat,
      TIME_FORMAT_DIRECTION_NONE
    )
    clockInGame.SetText(inGameText)
  } else {
    clockInGame.SetText("")
  }
}

export function SaveMapPosition(this: void): undefined {
  const [cx, cy] = GuiRoot.GetCenter()
  let [x, y] = ZO_WorldMap.GetCenter()
  x = x - cx
  y = y - cy

  const sv = asAnyTable(holder.modeData)
  sv.x = asAnyTableMember(x)
  sv.y = asAnyTableMember(y)
  const [dw, dh] = ZO_WorldMap.GetDimensions()
  sv.width = asAnyTableMember(dw)
  sv.height = asAnyTableMember(dh)
  holder.account.x = x
  holder.account.y = y
  holder.account.width = dw
  holder.account.height = dh
}

export function ClearMouseoverText(this: void): undefined {
  ZO_WorldMap_OnHide()
  ZO_WorldMap_HandlePinExit()
  ZO_WorldMapTitle.SetText(SetMapTitleCurrentLocation())
}

function IsPresentlyShowingKeeps(this: void): boolean {
  return (
    GetMapFilterType() === MAP_FILTER_TYPE_AVA_CYRODIIL ||
    GetMapFilterType() === MAP_FILTER_TYPE_AVA_IMPERIAL
  )
}

export function SetMapTitle(
  this: void,
  zoneNameArg: string | undefined,
  subZoneName?: string
): string {
  let zoneName = zoneNameArg
  if (subZoneName != null && subZoneName.length > 0) {
    zoneName = subZoneName
  }
  if (zoneName == null || zoneName.length === 0) {
    zoneName = GetMapName()
    if (zoneName == null || zoneName.length === 0) {
      zoneName = GetZoneNameByIndex(asNumber(GetUnitZoneIndex("player")))
    }
  }
  if (holder.account.showFullTitle) {
    const dungeonDifficulty = ZO_WorldMap_GetMapDungeonDifficulty()
    const isInAvAMap = IsPresentlyShowingKeeps()
    if (isInAvAMap) {
      const campaignId = GetCurrentCampaignId()
      if (campaignId !== 0) {
        const campaignName = GetCampaignName(campaignId)
        zoneName = ZO_CachedStrFormat(
          SI_WINDOW_TITLE_WORLD_MAP_WITH_CAMPAIGN_NAME,
          zoneName,
          campaignName
        )
        return zoneName
      }
    } else if (dungeonDifficulty !== DUNGEON_DIFFICULTY_NONE) {
      zoneName = ZO_CachedStrFormat(
        SI_WINDOW_TITLE_WORLD_MAP_WITH_DUNGEON_DIFFICULTY,
        zoneName,
        GetString("SI_DUNGEONDIFFICULTY", dungeonDifficulty)
      )
      return zoneName
    }
  }
  zoneName = ZO_CachedStrFormat(SI_WINDOW_TITLE_WORLD_MAP, zoneName)
  return zoneName
}

export function SetMapTitleCurrentLocation(this: void): string {
  return SetMapTitle(GetPlayerLocationName(), GetPlayerActiveSubzoneName())
}

export { GetScene, NoOp, pins }
