import { markAchievementItem } from "akasha/temper/navigation-addon/map-pins-achievement-items/map-pins-achievement-items.module.code.ts"
import { ANCESTRAL_TOMB_RUBBING } from "akasha/temper/navigation-addon/map-pins-ancestral-tomb-rubbing/map-pins-ancestral-tomb-rubbing.module.code.ts"
import { CHRONOGLER_TABLET } from "akasha/temper/navigation-addon/map-pins-chronogler-tablet/map-pins-chronogler-tablet.module.code.ts"
import { refreshCompass } from "akasha/temper/navigation-addon/map-pins-compass-pins/map-pins-compass-pins.module.code.ts"
import type { NumberMap } from "akasha/temper/navigation-addon/map-pins-data-types/map-pins-data-types.module.code.ts"
import { INSTRUMENTS } from "akasha/temper/navigation-addon/map-pins-instruments/map-pins-instruments.module.code.ts"
import { MINING_SAMPLE_COLLECTOR } from "akasha/temper/navigation-addon/map-pins-mining-sample-collector/map-pins-mining-sample-collector.module.code.ts"
import { MURAL_MENDER_FRAGMENTS } from "akasha/temper/navigation-addon/map-pins-mural-mender-fragments/map-pins-mural-mender-fragments.module.code.ts"
import { PIECES_OF_HISTORY } from "akasha/temper/navigation-addon/map-pins-pieces-of-history/map-pins-pieces-of-history.module.code.ts"
import { PRECURSOR_ITEMS } from "akasha/temper/navigation-addon/map-pins-precursor-items/map-pins-precursor-items.module.code.ts"
import { RELICS_OF_SUMMERSET } from "akasha/temper/navigation-addon/map-pins-relics-of-summerset/map-pins-relics-of-summerset.module.code.ts"
import { getPinTypeId } from "akasha/temper/navigation-addon/map-pins-state/map-pins-state.module.code.ts"
import { WROTHGAR_RELICS } from "akasha/temper/navigation-addon/map-pins-wrothgar-relics/map-pins-wrothgar-relics.module.code.ts"

const ancestralTombRubbing: NumberMap = ANCESTRAL_TOMB_RUBBING
const wrothgarRelics: NumberMap = WROTHGAR_RELICS
const relicsOfSummerset: NumberMap = RELICS_OF_SUMMERSET
const precursorItems: NumberMap = PRECURSOR_ITEMS
const chronoglerTablet: NumberMap = CHRONOGLER_TABLET
const muralMenderFragments: NumberMap = MURAL_MENDER_FRAGMENTS
const piecesOfHistory: NumberMap = PIECES_OF_HISTORY
const instruments: NumberMap = INSTRUMENTS
const miningSampleCollector: NumberMap = MINING_SAMPLE_COLLECTOR

export function onLootReceived(
  this: void,
  _eventCode: number,
  _receivedBy: string,
  _itemName: string,
  _quantity: number,
  _itemSound: number,
  lootType: number,
  _lootedBySelf: boolean,
  _isPickpocketLoot: boolean,
  _questItemIcon: unknown,
  itemId: number
): undefined {
  if (lootType !== LOOT_TYPE_ITEM && lootType !== LOOT_TYPE_QUEST_ITEM) return
  const ancestral = ancestralTombRubbing[itemId]
  const wrothgar = wrothgarRelics[itemId]
  const summerset = relicsOfSummerset[itemId]
  const precursor = precursorItems[itemId]
  const chronogler = chronoglerTablet[itemId]
  const mural = muralMenderFragments[itemId]
  const history = piecesOfHistory[itemId]
  const instrument = instruments[itemId]
  const mining = miningSampleCollector[itemId]
  if (ancestral !== undefined) {
    markAchievementItem(1712, ancestral)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(51))
    refreshCompass(51)
  } else if (wrothgar !== undefined) {
    markAchievementItem(1250, wrothgar)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(47))
    refreshCompass(47)
  } else if (summerset !== undefined) {
    markAchievementItem(2099, summerset)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(53))
    refreshCompass(53)
  } else if (precursor !== undefined) {
    markAchievementItem(1958, precursor)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(56))
    refreshCompass(56)
  } else if (chronogler !== undefined) {
    markAchievementItem(2320, chronogler)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(57))
    refreshCompass(57)
  } else if (mural !== undefined) {
    markAchievementItem(2463, mural)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(63))
    refreshCompass(63)
  } else if (history !== undefined) {
    markAchievementItem(2534, history)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(64))
    refreshCompass(64)
  } else if (instrument !== undefined) {
    markAchievementItem(2669, instrument)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(68))
    refreshCompass(68)
  } else if (mining !== undefined) {
    markAchievementItem(2759, mining)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(69))
    refreshCompass(69)
  }
}
