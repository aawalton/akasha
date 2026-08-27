import {
  ICON_LIST_ZONEID,
  LBOOKS_IMMERSIVE_DISABLED,
  LBOOKS_IMMERSIVE_EXPLORATION,
  LBOOKS_IMMERSIVE_WAYSHRINES,
  LBOOKS_IMMERSIVE_ZONEMAINQUEST,
  LBOOKS_IMMERSIVE_ZONEQUESTS,
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  MISSING_TEXTURE,
  PIN_ICON_REAL,
  PIN_TEXTURES,
  PINS_COMPASS,
  PINS_COMPASS_BOOKSHELF,
  PINS_COMPASS_EIDETIC,
  PLACEHOLDER_TEXTURE,
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
  SHALIDOR_LOCATION_X,
  SHALIDOR_LOCATION_Y,
  SHALIDOR_ZONEID,
} from "./constants"
import {
  LoreBooks_GetBookshelfDataFromMapId,
  LoreBooks_GetEideticData,
  LoreBooks_GetImmersiveModeCondition,
  LoreBooks_GetLocalData,
  LoreBooks_GetNewLoreBookInfo,
} from "./data-accessors"
import { state } from "./runtime-state"
import { getSavedVariables } from "./saved-variables"

export interface ShalidorPinTag {
  readonly [SHALIDOR_LOCATION_X]: number
  readonly [SHALIDOR_LOCATION_Y]: number
  readonly [SHALIDOR_COLLECTIONINDEX]: number
  readonly [SHALIDOR_BOOKINDEX]: number
  readonly [SHALIDOR_ZONEID]?: number
  readonly ld?: readonly number[]
}

export interface BookshelfPinTag {
  z?: number
  pinName?: string
  texture?: string
}

export interface EideticPinTag {
  c?: number
  b?: number
  pm?: number
  q?: number
  d?: boolean
  ld?: number
}

export function asShalidorPinTag(pinTag: unknown): ShalidorPinTag {
  return pinTag as ShalidorPinTag
}

export function asBookshelfPinTag(pinTag: unknown): BookshelfPinTag {
  return pinTag as BookshelfPinTag
}

export function asEideticPinTag(pinTag: unknown): EideticPinTag {
  return pinTag as EideticPinTag
}

export function isTableValue(value: unknown): boolean {
  return type(value) === "table"
}

type ReadonlyNumberArray = readonly number[]

function asReadonlyNumberArray(value: unknown): ReadonlyNumberArray {
  return value as ReadonlyNumberArray
}

function asNumber(value: unknown): number {
  return value as number
}

function asBoolean(value: unknown): boolean {
  return value as boolean
}

export function getPinTextureBookshelf(this: void, mapPinObject: MapPin): string {
  const fallback = ICON_LIST_ZONEID[1261] ?? MISSING_TEXTURE
  if (!isTableValue(mapPinObject)) return fallback

  const pinTag = mapPinObject.m_PinTag
  if (!isTableValue(pinTag)) return fallback

  const tag = asBookshelfPinTag(pinTag)
  const zoneId = tag.z !== undefined ? GetParentZoneId(tag.z) : undefined
  return (zoneId !== undefined ? ICON_LIST_ZONEID[zoneId] : undefined) ?? fallback
}

export function getPinTexture(this: void, mapPinObject: MapPin): string {
  const pinTag = asShalidorPinTag(mapPinObject.m_PinTag)
  if (
    mapPinObject.m_PinTag === undefined ||
    pinTag[SHALIDOR_COLLECTIONINDEX] === undefined ||
    pinTag[SHALIDOR_BOOKINDEX] === undefined
  ) {
    return PLACEHOLDER_TEXTURE
  }

  const [, textureFromInfo, known] = LoreBooks_GetNewLoreBookInfo(
    LORE_LIBRARY_SHALIDOR,
    pinTag[SHALIDOR_COLLECTIONINDEX],
    pinTag[SHALIDOR_BOOKINDEX]
  )
  const textureType = getSavedVariables().pinTexture.type

  let texture = textureFromInfo
  if (texture === MISSING_TEXTURE) {
    texture = PLACEHOLDER_TEXTURE
  }

  if (textureType === PIN_ICON_REAL) return texture
  const pair = PIN_TEXTURES[textureType]
  return pair !== undefined ? pair[known ? 0 : 1] : PLACEHOLDER_TEXTURE
}

export function getPinTextureEidetic(this: void, mapPinObject: MapPin): string {
  const pinTag = asEideticPinTag(mapPinObject.m_PinTag)
  if (mapPinObject.m_PinTag === undefined || pinTag.c === undefined || pinTag.b === undefined) {
    return PLACEHOLDER_TEXTURE
  }

  const [, textureFromInfo, known] = LoreBooks_GetNewLoreBookInfo(
    LORE_LIBRARY_EIDETIC,
    pinTag.c,
    pinTag.b
  )
  const textureType = getSavedVariables().pinTextureEidetic

  let texture = textureFromInfo
  if (texture === MISSING_TEXTURE) {
    texture = PLACEHOLDER_TEXTURE
  }

  if (textureType === PIN_ICON_REAL) return texture
  const pair = PIN_TEXTURES[textureType]
  return pair !== undefined ? pair[known ? 0 : 1] : PLACEHOLDER_TEXTURE
}

export function isShaliPinGrayscale(this: void): boolean {
  const db = getSavedVariables()
  return db.pinTexture.type === PIN_ICON_REAL && db.pinGrayscale
}

export function isEideticPinGrayscale(this: void): boolean {
  const db = getSavedVariables()
  return db.pinTextureEidetic === PIN_ICON_REAL && db.pinGrayscaleEidetic
}

function allAchievementsCompleted(conditionData: readonly number[]): boolean {
  for (const [, achievementIndex] of ipairs(conditionData)) {
    const [, , , , completed] = GetAchievementInfo(achievementIndex)
    if (!completed) {
      return false
    }
  }
  return true
}

export function shouldDisplayLoreBooks(this: void): boolean {
  const db = getSavedVariables()

  if (db.immersiveMode === LBOOKS_IMMERSIVE_DISABLED) {
    return true
  }

  const mapIndex = LibMapData.mapIndex

  if (mapIndex !== undefined) {
    if (db.immersiveMode === LBOOKS_IMMERSIVE_ZONEMAINQUEST) {
      const conditionData = LoreBooks_GetImmersiveModeCondition(db.immersiveMode, mapIndex)
      if (type(conditionData) === "table") {
        return allAchievementsCompleted(asReadonlyNumberArray(conditionData))
      } else {
        const [, , , , completed] = GetAchievementInfo(asNumber(conditionData))
        return completed
      }
    } else if (db.immersiveMode === LBOOKS_IMMERSIVE_WAYSHRINES) {
      if (mapIndex !== GetCyrodiilMapIndex()) {
        const conditionData = LoreBooks_GetImmersiveModeCondition(db.immersiveMode, mapIndex)
        return asBoolean(conditionData)
      }
    } else if (db.immersiveMode === LBOOKS_IMMERSIVE_EXPLORATION) {
      const conditionData = LoreBooks_GetImmersiveModeCondition(db.immersiveMode, mapIndex)
      if (type(conditionData) === "table") {
        return allAchievementsCompleted(asReadonlyNumberArray(conditionData))
      } else {
        const [, , , , completed] = GetAchievementInfo(asNumber(conditionData))
        return completed
      }
    } else if (db.immersiveMode === LBOOKS_IMMERSIVE_ZONEQUESTS) {
      const conditionData = LoreBooks_GetImmersiveModeCondition(db.immersiveMode, mapIndex)
      if (type(conditionData) === "table") {
        return allAchievementsCompleted(asReadonlyNumberArray(conditionData))
      } else {
        const [, , , , completed] = GetAchievementInfo(asNumber(conditionData))
        return completed
      }
    }
  }

  return true
}

export function updateShalidorLorebooksData(
  this: void,
  mapId: number,
  _zoneMapId: number
): undefined {
  if (LibMapData.mapId === undefined || LibMapData.mapTexture === undefined) return
  if (
    LibMapData.mapTexture !== state.lastZoneShalidor ||
    LibMapData.mapId !== state.lastMapIpShalidor
  ) {
    state.lastZoneShalidor = LibMapData.mapTexture
    state.lastMapIpShalidor = LibMapData.mapId
    state.lorebooks = LoreBooks_GetLocalData(mapId)
    COMPASS_PINS.RefreshPins(PINS_COMPASS)
    return
  }
}

export function updateBookshelfLorebooksData(
  this: void,
  mapId: number,
  _zoneMapId: number
): undefined {
  if (LibMapData.mapId === undefined || LibMapData.mapTexture === undefined) return
  if (
    LibMapData.mapTexture !== state.lastZoneBookshelf ||
    LibMapData.mapId !== state.lastMapIpBookshelf
  ) {
    state.lastZoneBookshelf = LibMapData.mapTexture
    state.lastMapIpBookshelf = LibMapData.mapId
    state.bookshelves = LoreBooks_GetBookshelfDataFromMapId(mapId)
    COMPASS_PINS.RefreshPins(PINS_COMPASS_BOOKSHELF)
    return
  }
}

export function updateEideticLorebooksData(
  this: void,
  mapId: number,
  zoneMapId: number
): undefined {
  if (LibMapData.mapId === undefined || LibMapData.mapTexture === undefined) return
  if (
    LibMapData.mapTexture !== state.lastZoneEidetic ||
    LibMapData.mapId !== state.lastMapIpEidetic
  ) {
    state.lastZoneEidetic = LibMapData.mapTexture
    state.lastMapIpEidetic = LibMapData.mapId
    state.eideticBooks = LoreBooks_GetEideticData(mapId, zoneMapId)
    COMPASS_PINS.RefreshPins(PINS_COMPASS_EIDETIC)
    return
  }
}
