import {
  MAP_DATA_INTERNAL,
  MAP_DATA_STATE,
} from "akasha/temper/addon/pages/world/map-data/modules/map-data-public-api/map-data-public-api.module.code.ts"
import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  loreBooksGetNewLoreBookInfo,
  loreBooksGetNewLoreCollectionInfo,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import {
  BOOK_LOCALIZATION,
  BOOK_SHELF_LOCALIZATION,
  BOOK_STACK_LOCALIZATION,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-locales/lorebooks-locales.module.code.ts"
import { STATE } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"
import { insertChatText } from "akasha/temper/modules/chat-entry-text/chat-entry-text.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"

function asObject(value: unknown): object {
  return value as object
}

export function createEideticLorebookLocation(): undefined {
  SetMapToPlayerLocation()
  CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  MAP_DATA_INTERNAL.UpdateMapInfo()
  const [zone] = MAP_PINS.GetZoneAndSubzone(true, false, true)
  let outText = GetString(LBOOKS_LBPOS_ERROR)
  const zoneId = MAP_DATA_STATE.zoneId
  const worldX = MAP_DATA_STATE.worldX
  const worldY = MAP_DATA_STATE.worldY
  const worldZ = MAP_DATA_STATE.worldZ
  const x = MAP_DATA_STATE.normalizedX
  const y = MAP_DATA_STATE.normalizedY
  const xpos = MAP_DATA_STATE.globalX
  const ypos = MAP_DATA_STATE.globalY
  const mapId = MAP_DATA_STATE.mapId
  const parentZoneMapId = MAP_DATA_STATE.parentZoneMapId
  const isDungeon = MAP_DATA_STATE.isDungeon
  let bookName = ""
  let categoryIndex = 0
  let collectionIndex: number | string = ""
  let bookIndex: number | string = ""

  const reticleName = MAP_DATA_STATE.reticleInteractionName
  let isBookshelf = false
  if (reticleName != null && !isBookshelf) {
    isBookshelf = reticleName === BOOK_SHELF_LOCALIZATION[STATE.currentBookshelfLocale]
  }
  if (reticleName != null && !isBookshelf) {
    isBookshelf = reticleName === BOOK_STACK_LOCALIZATION[STATE.currentBookshelfLocale]
  }
  if (reticleName != null && !isBookshelf) {
    isBookshelf = reticleName === BOOK_LOCALIZATION[STATE.currentBookshelfLocale]
  }

  if (STATE.currentOpenBook != null) {
    bookName = STATE.currentOpenBook
  }

  if (STATE.shownBookId == null) {
    d(GetString(LBOOKS_LBPOS_OPEN_BOOK))
    return
  }

  const [resolvedCategory, resolvedCollection, resolvedBook] = GetLoreBookIndicesFromBookId(
    STATE.shownBookId
  )
  categoryIndex = resolvedCategory ?? 0
  if (resolvedCollection != null) collectionIndex = resolvedCollection
  if (resolvedBook != null) bookIndex = resolvedBook

  if (collectionIndex != null && bookIndex != null) {
    if (typeof collectionIndex === "number" && typeof bookIndex === "number") {
      loreBooksGetNewLoreBookInfo(LORE_LIBRARY_EIDETIC, collectionIndex, bookIndex)
    }
  }

  const numericCollection = typeof collectionIndex === "number" ? collectionIndex : 0
  const [collectionName] = loreBooksGetNewLoreCollectionInfo(categoryIndex, numericCollection)

  if (categoryIndex === LORE_LIBRARY_SHALIDOR) {
    outText = string.format(
      "[%d] = { %ds, %ds, %d, %s, %s, moreInfo }, -- %s, %s",
      mapId,
      worldX,
      worldY,
      worldZ,
      tostring(collectionIndex),
      tostring(bookIndex),
      bookName,
      zone
    )
  } else if (categoryIndex === LORE_LIBRARY_EIDETIC) {
    const cnf = '"cn"'
    const nf = '"n"'
    const ef = '"e"'
    const dfField = '"d"'
    const mdf = '"pm"'
    const smf = '"sm"'
    const pxf = '"px"'
    const pyf = '"py"'
    const xf = '"x"'
    const yf = '"y"'
    const pnxf = '"pnx"'
    const pnyf = '"pny"'
    const mf = '"m"'
    const zf = '"z"'
    if (isDungeon === true) {
      outText = string.format(
        "[%d] = { [%s] = %s, [%s] = %s, [%s] = { [1] = { [%s] = %.10f, [%s] = %.10f, [%s] = %d, [%s] = %s, }, }, }, { [%s] = %d, [%s] = %.10f, [%s] = %.10f }, -- %s",
        STATE.shownBookId,
        cnf,
        '"' + collectionName + '"',
        nf,
        '"' + bookName + '"',
        ef,
        pxf,
        xpos,
        pyf,
        ypos,
        mdf,
        mapId,
        dfField,
        tostring(isDungeon),
        smf,
        mapId,
        pnxf,
        x,
        pnyf,
        y,
        zone
      )
    } else {
      outText = string.format(
        "[%d] = { [%s] = %s, [%s] = %s, [%s] = { [1] = { [%s] = %.10f, [%s] = %.10f, [%s] = %d, }, }, }, { [%s] = %d, [%s] = %.10f, [%s] = %.10f }, -- %s",
        STATE.shownBookId,
        cnf,
        '"' + collectionName + '"',
        nf,
        '"' + bookName + '"',
        ef,
        pxf,
        xpos,
        pyf,
        ypos,
        mdf,
        mapId,
        smf,
        mapId,
        pnxf,
        x,
        pnyf,
        y,
        zone
      )
    }
    if (isBookshelf) {
      outText = string.format(
        "[%d] = { [%s] = { [%d] = 1, }, }, [%d] = { { [%s] = %.10f, [%s] = %.10f, [%s] = %d, }, },  -- Bookshelf: %s, %s",
        STATE.shownBookId,
        mf,
        parentZoneMapId,
        mapId,
        xf,
        x,
        yf,
        y,
        zf,
        zoneId,
        bookName,
        zone
      )
    }
  }
  insertChatText(outText)
}

export function createFakeEideticLorebookLocation(): undefined {
  MAP_DATA_INTERNAL.UpdateMapInfo()
  const [zone] = MAP_PINS.GetZoneAndSubzone(true, false, true)
  const x = MAP_DATA_STATE.normalizedX
  const y = MAP_DATA_STATE.normalizedY
  const xpos = MAP_DATA_STATE.globalX
  const ypos = MAP_DATA_STATE.globalY
  const mapId = MAP_DATA_STATE.mapId

  const ef = '"e"'
  const mdf = '"pm"'
  const smf = '"sm"'
  const pxf = '"px"'
  const pyf = '"py"'
  const fpf = '"fp"'
  const pnxf = '"pnx"'
  const pnyf = '"pny"'
  const shownBookId = "fake"
  const bookName = "fake Eidetic Memory location"
  const outText = string.format(
    "[%s] = { [%s] = { [1] = { [%s] = %.10f, [%s] = %.10f, [%s] = %d, [%s] = true, }, }, }, { [%s] = %d, [%s] = %.10f, [%s] = %.10f }, -- %s, %s",
    shownBookId,
    ef,
    pxf,
    xpos,
    pyf,
    ypos,
    mdf,
    mapId,
    fpf,
    smf,
    mapId,
    pnxf,
    x,
    pnyf,
    y,
    bookName,
    zone
  )
  insertChatText(outText)
}

export function createFakeLorebookPin(): undefined {
  MAP_DATA_INTERNAL.UpdateMapInfo()
  const [zone] = MAP_PINS.GetZoneAndSubzone(true, false, true)
  const x = MAP_DATA_STATE.normalizedX
  const y = MAP_DATA_STATE.normalizedY
  const mapId = MAP_DATA_STATE.mapId

  const bookName = "fake Shalidor's Library location"
  const outText = string.format(
    "[%s] = { %.10f, %.10f, 0, 0, moreinfo }, -- %s, %s",
    mapId,
    x,
    y,
    bookName,
    zone
  )
  insertChatText(outText)
}

function isEmptyOrNil(t: unknown): boolean {
  if (t == null || t === "") {
    return true
  }
  return type(t) === "table" ? ZO_IsTableEmpty(asObject(t)) : false
}

function isIn(searchValue: unknown, searchTable: Record<string | number, unknown>): boolean {
  if (isEmptyOrNil(searchValue)) {
    return false
  }
  for (const [, v] of pairs(searchTable)) {
    if (searchValue === v) {
      return true
    }
    if (typeof searchValue === "string" && typeof v === "string") {
      const [found] = string.find(string.lower(v), string.lower(searchValue))
      if (found != null) {
        return true
      }
    }
  }
  return false
}

export { isEmptyOrNil, isIn }
