import { COMPASS_PINS } from "akasha/temper/addon/pages/world/navigation/modules/compass-pins-global/compass-pins-global.module.code.ts"
import {
  LORE_LIBRARY_CRAFTING,
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  PINS_BOOKSHELF,
  PINS_COLLECTED,
  PINS_COMPASS,
  PINS_COMPASS_BOOKSHELF,
  PINS_COMPASS_EIDETIC,
  PINS_EIDETIC,
  PINS_EIDETIC_COLLECTED,
  PINS_UNKNOWN,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import { STATE } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"
import "akasha/temper/addon/type/custom-compass-pins/custom-compass-pins.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-map-pins/lib-map-pins.type-declaration.d.ts"

export function onShowBook(
  this: void,
  _eventCode: number,
  bookTitle: string,
  _body: string,
  _medium: number,
  _showTitle: boolean,
  bookId: number
): undefined {
  STATE.lastReadBook = bookTitle
  STATE.currentOpenBook = bookTitle
  STATE.shownBookId = bookId
}

export function onHideBook(this: void, _eventCode: number): undefined {
  STATE.currentOpenBook = undefined
  STATE.shownBookId = undefined
}

export function onBookLearned(
  this: void,
  _eventCode: number,
  categoryIndex: number,
  collectionIndex: number,
  _bookIndex: number,
  _guildIndex: number,
  _isMaxRank: boolean
): undefined {
  const cacheKey = `${categoryIndex}:${collectionIndex}`
  STATE.collectionInfoCache[cacheKey] = undefined

  if (categoryIndex !== LORE_LIBRARY_CRAFTING) {
    if (categoryIndex === LORE_LIBRARY_SHALIDOR) {
      LibMapPins.RefreshPins(PINS_UNKNOWN)
      LibMapPins.RefreshPins(PINS_COLLECTED)
      COMPASS_PINS.RefreshPins(PINS_COMPASS)
    } else if (categoryIndex === LORE_LIBRARY_EIDETIC) {
      LibMapPins.RefreshPins(PINS_EIDETIC)
      LibMapPins.RefreshPins(PINS_EIDETIC_COLLECTED)
      LibMapPins.RefreshPins(PINS_BOOKSHELF)
      COMPASS_PINS.RefreshPins(PINS_COMPASS_EIDETIC)
      COMPASS_PINS.RefreshPins(PINS_COMPASS_BOOKSHELF)
    }
  }
}
