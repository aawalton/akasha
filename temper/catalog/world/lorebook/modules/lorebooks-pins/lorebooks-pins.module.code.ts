import { MAP_DATA_STATE } from "akasha/temper/addon/pages/world/map-data/modules/map-data-public-api/map-data-public-api.module.code.ts"
import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import { isTable } from "akasha/temper/addon/shared/narrow/modules/is-table/is-table.module.code.ts"
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
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  loreBooksGetBookshelfDataFromMapId,
  loreBooksGetEideticData,
  loreBooksGetImmersiveModeCondition,
  loreBooksGetLocalData,
  loreBooksGetNewLoreBookInfo,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import { STATE } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"
import { getSavedVariables } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-map-pins/lib-map-pins.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"

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
  if (!isTable(mapPinObject)) return fallback

  const pinTag = mapPinObject.m_PinTag
  if (!isTable(pinTag)) return fallback

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

  const [, textureFromInfo, known] = loreBooksGetNewLoreBookInfo(
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

  const [, textureFromInfo, known] = loreBooksGetNewLoreBookInfo(
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

  const mapIndex = MAP_DATA_STATE.mapIndex

  if (mapIndex !== undefined) {
    if (db.immersiveMode === LBOOKS_IMMERSIVE_ZONEMAINQUEST) {
      const conditionData = loreBooksGetImmersiveModeCondition(db.immersiveMode, mapIndex)
      if (type(conditionData) === "table") {
        return allAchievementsCompleted(asReadonlyNumberArray(conditionData))
      } else {
        const [, , , , completed] = GetAchievementInfo(asNumber(conditionData))
        return completed
      }
    } else if (db.immersiveMode === LBOOKS_IMMERSIVE_WAYSHRINES) {
      if (mapIndex !== GetCyrodiilMapIndex()) {
        const conditionData = loreBooksGetImmersiveModeCondition(db.immersiveMode, mapIndex)
        return asBoolean(conditionData)
      }
    } else if (db.immersiveMode === LBOOKS_IMMERSIVE_EXPLORATION) {
      const conditionData = loreBooksGetImmersiveModeCondition(db.immersiveMode, mapIndex)
      if (type(conditionData) === "table") {
        return allAchievementsCompleted(asReadonlyNumberArray(conditionData))
      } else {
        const [, , , , completed] = GetAchievementInfo(asNumber(conditionData))
        return completed
      }
    } else if (db.immersiveMode === LBOOKS_IMMERSIVE_ZONEQUESTS) {
      const conditionData = loreBooksGetImmersiveModeCondition(db.immersiveMode, mapIndex)
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
  if (MAP_DATA_STATE.mapId === undefined || MAP_DATA_STATE.mapTexture === undefined) return
  if (
    MAP_DATA_STATE.mapTexture !== STATE.lastZoneShalidor ||
    MAP_DATA_STATE.mapId !== STATE.lastMapIpShalidor
  ) {
    STATE.lastZoneShalidor = MAP_DATA_STATE.mapTexture
    STATE.lastMapIpShalidor = MAP_DATA_STATE.mapId
    STATE.lorebooks = loreBooksGetLocalData(mapId)
    COMPASS_PINS.RefreshPins(PINS_COMPASS)
    return
  }
}

export function updateBookshelfLorebooksData(
  this: void,
  mapId: number,
  _zoneMapId: number
): undefined {
  if (MAP_DATA_STATE.mapId === undefined || MAP_DATA_STATE.mapTexture === undefined) return
  if (
    MAP_DATA_STATE.mapTexture !== STATE.lastZoneBookshelf ||
    MAP_DATA_STATE.mapId !== STATE.lastMapIpBookshelf
  ) {
    STATE.lastZoneBookshelf = MAP_DATA_STATE.mapTexture
    STATE.lastMapIpBookshelf = MAP_DATA_STATE.mapId
    STATE.bookshelves = loreBooksGetBookshelfDataFromMapId(mapId)
    COMPASS_PINS.RefreshPins(PINS_COMPASS_BOOKSHELF)
    return
  }
}

export function updateEideticLorebooksData(
  this: void,
  mapId: number,
  zoneMapId: number
): undefined {
  if (MAP_DATA_STATE.mapId === undefined || MAP_DATA_STATE.mapTexture === undefined) return
  if (
    MAP_DATA_STATE.mapTexture !== STATE.lastZoneEidetic ||
    MAP_DATA_STATE.mapId !== STATE.lastMapIpEidetic
  ) {
    STATE.lastZoneEidetic = MAP_DATA_STATE.mapTexture
    STATE.lastMapIpEidetic = MAP_DATA_STATE.mapId
    STATE.eideticBooks = loreBooksGetEideticData(mapId, zoneMapId)
    COMPASS_PINS.RefreshPins(PINS_COMPASS_EIDETIC)
    return
  }
}
