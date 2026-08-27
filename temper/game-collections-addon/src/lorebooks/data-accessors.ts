import {
  LBOOKS_IMMERSIVE_EXPLORATION,
  LBOOKS_IMMERSIVE_WAYSHRINES,
  LBOOKS_IMMERSIVE_ZONEMAINQUEST,
  LBOOKS_IMMERSIVE_ZONEQUESTS,
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  MISSING_TITLE,
  PLACEHOLDER_TEXTURE,
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
  SHALIDOR_LOCATION_X,
  SHALIDOR_LOCATION_Y,
} from "./constants"
import { bookshelfData as bookshelfDataRaw } from "./data/bookshelf-data"
import { bookData as bookDataRaw } from "./data/eidetic-book-data"
import { libraryData as libraryDataRaw } from "./data/eidetic-library-data"
import {
  lorebooksExplorationIDs as explorationIdsRaw,
  lorebooksMainQuestIDs as mainQuestIdsRaw,
  lorebooksZoneQuestIDs as zoneQuestIdsRaw,
} from "./data/shalidor-achievements-data"
import { lorebooksData as lorebooksDataRaw } from "./data/shalidor-locations-data"
import { state } from "./runtime-state"
import type {
  AchievementIdTable,
  BookshelfEntry,
  EideticBook,
  EideticBookTable,
  EideticBookZoneEntry,
  EideticLibraryTable,
  ShalidorDataTable,
  ShalidorMapData,
  ShalidorPinEntry,
} from "./types"

type BookshelfEntryMap = Record<number, readonly BookshelfEntry[]>
type EideticBookZoneEntries = EideticBookZoneEntry[]

function asEideticBookTable(value: unknown): EideticBookTable {
  return value as EideticBookTable
}

function asBookshelfEntryMap(value: unknown): BookshelfEntryMap {
  return value as BookshelfEntryMap
}

function asAchievementIdTable(value: unknown): AchievementIdTable {
  return value as AchievementIdTable
}

function asEideticLibraryTable(value: unknown): EideticLibraryTable {
  return value as EideticLibraryTable
}

function asShalidorDataTable(value: unknown): ShalidorDataTable {
  return value as ShalidorDataTable
}

function asEideticBookZoneEntries(value: unknown): EideticBookZoneEntries {
  return value as EideticBookZoneEntries
}

const bookData = asEideticBookTable(bookDataRaw)
const bookshelfData = asBookshelfEntryMap(bookshelfDataRaw)
const explorationIds = asAchievementIdTable(explorationIdsRaw)
const mainQuestIds = asAchievementIdTable(mainQuestIdsRaw)
const zoneQuestIds = asAchievementIdTable(zoneQuestIdsRaw)
const libraryData = asEideticLibraryTable(libraryDataRaw)
const lorebooksData = asShalidorDataTable(lorebooksDataRaw)

export function LoreBooks_GetBookData(): EideticBookTable {
  return bookData
}

export function LoreBooks_GetNewEideticDataFromBookId(bookId: number): EideticBook {
  if (bookData[bookId] === undefined) {
    bookData[bookId] = { k: bookId }
  }
  return bookData[bookId]
}

export function LoreBooks_GetNewEideticData(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): EideticBook {
  const [, , , bookId] = LoreBooks_GetNewLoreBookInfo(categoryIndex, collectionIndex, bookIndex)
  return LoreBooks_GetNewEideticDataFromBookId(bookId)
}

const eideticDataCache: Record<number, EideticBookZoneEntry[]> = {}
const eideticDataCacheOrder: number[] = []
const EIDETIC_DATA_CACHE_LIMIT = 3

function touchEideticCacheOrder(mapId: number): undefined {
  for (const i of $range(1, eideticDataCacheOrder.length)) {
    if (eideticDataCacheOrder[i - 1] === mapId) {
      eideticDataCacheOrder.splice(i - 1, 1)
      break
    }
  }
  eideticDataCacheOrder.unshift(mapId)

  if (eideticDataCacheOrder.length > EIDETIC_DATA_CACHE_LIMIT) {
    const oldestMapId = eideticDataCacheOrder.pop()
    if (oldestMapId !== undefined) {
      eideticDataCache[oldestMapId] = asEideticBookZoneEntries(undefined)
    }
  }
}

export function LoreBooks_GetEideticData(
  mapId: number | undefined,
  zMapId: number | undefined
): EideticBookZoneEntry[] {
  const eideticInZone: EideticBookZoneEntry[] = []
  if (mapId === undefined) return eideticInZone
  const cached = eideticDataCache[mapId]
  if (cached !== undefined) {
    touchEideticCacheOrder(mapId)
    return cached
  }

  const [, numCollections] = GetLoreCategoryInfo(LORE_LIBRARY_EIDETIC)

  for (const collectionIndex of $range(1, numCollections)) {
    const [, , , totalBooks] = LoreBooks_GetNewLoreCollectionInfo(
      LORE_LIBRARY_EIDETIC,
      collectionIndex
    )
    for (const bookIndex of $range(1, totalBooks)) {
      const eideticBookZoneData = LoreBooks_GetNewEideticData(
        LORE_LIBRARY_EIDETIC,
        collectionIndex,
        bookIndex
      )
      const [, , , bookId] = LoreBooks_GetNewLoreBookInfo(
        LORE_LIBRARY_EIDETIC,
        collectionIndex,
        bookIndex
      )
      const zones = eideticBookZoneData.e
      if (zones !== undefined) {
        for (const booksData of zones) {
          if (booksData.pm === mapId || booksData.zm === zMapId) {
            booksData.c = collectionIndex
            booksData.b = bookIndex
            booksData.k = bookId
            if (eideticBookZoneData.q !== undefined) {
              booksData.q = eideticBookZoneData.q
            }
            eideticInZone.push(booksData)
          }
        }
      }
    }
  }

  eideticDataCache[mapId] = eideticInZone
  touchEideticCacheOrder(mapId)
  return eideticInZone
}

function getNumKnownBooksInCollection(
  categoryIndex: number | undefined,
  collectionIndex: number | undefined,
  booksInCollection: number | undefined
): number {
  let numKnownBooks = 0
  if (
    categoryIndex !== undefined &&
    collectionIndex !== undefined &&
    booksInCollection !== undefined
  ) {
    for (const bookIndex of $range(1, booksInCollection)) {
      const [, , known] = LoreBooks_GetNewLoreBookInfo(categoryIndex, collectionIndex, bookIndex)
      if (known) {
        numKnownBooks = numKnownBooks + 1
      }
    }
  }
  return numKnownBooks
}

export function LoreBooks_GetMissingEideticBooks(): undefined {
  const categoryIndex = LORE_LIBRARY_EIDETIC
  const [, numCollections] = GetLoreCategoryInfo(categoryIndex)

  for (const collectionIndex of $range(1, numCollections)) {
    const [collectionName, , , totalBooks, hidden] = LoreBooks_GetNewLoreCollectionInfo(
      categoryIndex,
      collectionIndex
    )
    if (!hidden) {
      for (const bookIndex of $range(1, totalBooks)) {
        const [, , , bookId] = LoreBooks_GetNewLoreBookInfo(
          categoryIndex,
          collectionIndex,
          bookIndex
        )
        if (bookData[bookId] !== undefined && bookData[bookId].c === undefined) {
          df(
            "Book |H1:book:%s|h|h (#%d) is still Unknown. Collection %s (3/%d)",
            tostring(bookId),
            bookId,
            collectionName,
            collectionIndex
          )
        }
      }
    }
  }
}

export function LoreBooks_GetNewLoreBookInfo(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): LuaMultiReturn<[string, string, boolean, number]> {
  const [titleFromGame, icon, known, bookId] = GetLoreBookInfo(
    categoryIndex,
    collectionIndex,
    bookIndex
  )

  let title = titleFromGame
  if (title === undefined || title === "") {
    const fallback = bookData[bookId]
    const fallbackEn = fallback?.en
    if (fallback !== undefined && fallbackEn !== undefined) {
      title = fallbackEn
    } else {
      title = MISSING_TITLE
    }
  }

  return $multi(
    title,
    icon !== undefined && icon !== "" ? icon : PLACEHOLDER_TEXTURE,
    known,
    bookId
  )
}

function resolveLocalizedField(
  valueFromGame: string | undefined,
  fallback: string | undefined
): string | undefined {
  if (valueFromGame !== undefined && valueFromGame !== "") {
    return valueFromGame
  }
  if (fallback !== undefined && fallback !== "") {
    return fallback
  }
  return undefined
}

export function LoreBooks_GetNewLoreCollectionInfo(
  categoryIndex: number,
  collectionIndex: number
): LuaMultiReturn<[string, string, number, number, boolean, string, number]> {
  const cacheKey = `${categoryIndex}:${collectionIndex}`
  const cached = state.collectionInfoCache[cacheKey]
  if (cached !== undefined) {
    return $multi(cached[0], cached[1], cached[2], cached[3], cached[4], cached[5], cached[6])
  }

  const [
    nameFromGame,
    descFromGame,
    ,
    totalBooksFromGame,
    ,
    gamepadIconFromGame,
    collectionIdFromGame,
  ] = GetLoreCollectionInfo(categoryIndex, collectionIndex)
  const category = libraryData[categoryIndex]
  const data = category !== undefined ? category[collectionIndex] : undefined

  const name = resolveLocalizedField(nameFromGame, data?.n)
  const description = resolveLocalizedField(descFromGame, data?.d)
  let totalBooks = totalBooksFromGame
  if (
    (totalBooks === undefined || totalBooks === 0) &&
    data !== undefined &&
    data.t !== undefined
  ) {
    totalBooks = data.t
  }

  const hidden = false

  let gamepadIcon = gamepadIconFromGame
  if (
    (gamepadIcon === undefined || gamepadIcon === "") &&
    data !== undefined &&
    data.g !== undefined
  ) {
    gamepadIcon = data.g
  }

  let collectionId = collectionIdFromGame
  if (
    (collectionId === undefined || collectionId === 0) &&
    data !== undefined &&
    data.k !== undefined
  ) {
    collectionId = data.k
  }

  if (name === undefined || totalBooks === undefined) {
    return $multi("", "", 0, 0, true, "/esoui/art/icons/icon_missing.dds", 0)
  }

  const numKnownBooks = getNumKnownBooksInCollection(categoryIndex, collectionIndex, totalBooks)

  const result: readonly [string, string, number, number, boolean, string, number] = [
    name,
    description ?? "",
    numKnownBooks,
    totalBooks,
    hidden,
    gamepadIcon ?? "",
    collectionId ?? 0,
  ]

  state.collectionInfoCache[cacheKey] = result
  return $multi(result[0], result[1], result[2], result[3], result[4], result[5], result[6])
}

function areAllWayshrinesUnlocked(): boolean {
  for (const nodeIndex of $range(1, GetNumFastTravelNodes())) {
    const [known, , , , , , poiType, isShownInCurrentMap] = GetFastTravelNodeInfo(nodeIndex)
    if (isShownInCurrentMap && poiType === POI_TYPE_WAYSHRINE && !known) {
      return false
    }
  }
  return true
}

export function LoreBooks_GetImmersiveModeCondition(
  mode: number,
  mapIndex: number
): number | boolean | undefined {
  if (mode === LBOOKS_IMMERSIVE_ZONEMAINQUEST) {
    return mainQuestIds[mapIndex]
  } else if (mode === LBOOKS_IMMERSIVE_WAYSHRINES) {
    return areAllWayshrinesUnlocked()
  } else if (mode === LBOOKS_IMMERSIVE_EXPLORATION) {
    return explorationIds[mapIndex]
  } else if (mode === LBOOKS_IMMERSIVE_ZONEQUESTS) {
    return zoneQuestIds[mapIndex]
  }
  return undefined
}

export function LoreBooks_GetLocalData(mapId: number): ShalidorMapData | undefined {
  return lorebooksData[mapId]
}

export interface ShalidorBookHit {
  data: ShalidorPinEntry
  mapId: number
  locX: number
  locY: number
}

export function LoreBooks_GetDataOfBook(
  categoryIndex: number,
  collectionIndex: number | undefined,
  bookIndex: number | undefined
): ShalidorBookHit[] {
  const results: ShalidorBookHit[] = []
  if (categoryIndex === LORE_LIBRARY_SHALIDOR) {
    if (collectionIndex !== undefined && bookIndex !== undefined) {
      for (const [mapId, mapData] of pairs(lorebooksData)) {
        for (const bookEntry of mapData) {
          if (
            bookEntry[SHALIDOR_COLLECTIONINDEX] === collectionIndex &&
            bookEntry[SHALIDOR_BOOKINDEX] === bookIndex
          ) {
            results[results.length] = {
              data: bookEntry,
              mapId,
              locX: bookEntry[SHALIDOR_LOCATION_X],
              locY: bookEntry[SHALIDOR_LOCATION_Y],
            }
          }
        }
      }
    }
  }
  return results
}

export function LoreBooks_GetAllData(): ShalidorDataTable {
  return lorebooksData
}

export function LoreBooks_GetNewShalidorBookInfo(
  categoryIndex: number,
  collectionIndex: number,
  bookIndex: number
): LuaMultiReturn<[string, string, boolean, number]> {
  const [titleFromGame, icon, known, bookId] = GetLoreBookInfo(
    categoryIndex,
    collectionIndex,
    bookIndex
  )
  const title = titleFromGame !== undefined && titleFromGame !== "" ? titleFromGame : MISSING_TITLE
  return $multi(
    title,
    icon !== undefined && icon !== "" ? icon : PLACEHOLDER_TEXTURE,
    known,
    bookId
  )
}

export function LoreBooks_GetBookshelfDataFromMapId(
  mapId: number
): readonly BookshelfEntry[] | undefined {
  if (bookshelfData[mapId] === undefined) {
    return undefined
  }
  return bookshelfData[mapId]
}
