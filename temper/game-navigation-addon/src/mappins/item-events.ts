import { CustomPins } from "./custom-pins-config"
import { AchievementItems } from "./data/achievement-items-data"
import { type NumberMap } from "./data/data-types"
import { AncestralTombRubbing } from "./data/generated/ancestral-tomb-rubbing-data.generated"
import { ChronoglerTablet } from "./data/generated/chronogler-tablet-data.generated"
import { Instruments } from "./data/generated/instruments-data.generated"
import { MiningSampleCollector } from "./data/generated/mining-sample-collector-data.generated"
import { MuralMenderFragments } from "./data/generated/mural-mender-fragments-data.generated"
import { PiecesOfHistory } from "./data/generated/pieces-of-history-data.generated"
import { PrecursorItems } from "./data/generated/precursor-items-data.generated"
import { RelicsOfSummerset } from "./data/generated/relics-of-summerset-data.generated"
import { WrothgarRelics } from "./data/generated/wrothgar-relics-data.generated"
import { getPinTypeId } from "./state"

const ancestralTombRubbing: NumberMap = AncestralTombRubbing
const wrothgarRelics: NumberMap = WrothgarRelics
const relicsOfSummerset: NumberMap = RelicsOfSummerset
const precursorItems: NumberMap = PrecursorItems
const chronoglerTablet: NumberMap = ChronoglerTablet
const muralMenderFragments: NumberMap = MuralMenderFragments
const piecesOfHistory: NumberMap = PiecesOfHistory
const instruments: NumberMap = Instruments
const miningSampleCollector: NumberMap = MiningSampleCollector

function mark(this: void, achId: number, index: number): undefined {
  const inner = AchievementItems[achId]
  if (inner !== undefined) inner[index] = true
}

function refreshCompass(this: void, n: number): undefined {
  const pin = CustomPins[n]
  if (pin === undefined) return
  if (COMPASS_PINS !== undefined) COMPASS_PINS.RefreshPins(pin.name)
}

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
    mark(1712, ancestral)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(51))
    refreshCompass(51)
  } else if (wrothgar !== undefined) {
    mark(1250, wrothgar)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(47))
    refreshCompass(47)
  } else if (summerset !== undefined) {
    mark(2099, summerset)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(53))
    refreshCompass(53)
  } else if (precursor !== undefined) {
    mark(1958, precursor)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(56))
    refreshCompass(56)
  } else if (chronogler !== undefined) {
    mark(2320, chronogler)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(57))
    refreshCompass(57)
  } else if (mural !== undefined) {
    mark(2463, mural)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(63))
    refreshCompass(63)
  } else if (history !== undefined) {
    mark(2534, history)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(64))
    refreshCompass(64)
  } else if (instrument !== undefined) {
    mark(2669, instrument)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(68))
    refreshCompass(68)
  } else if (mining !== undefined) {
    mark(2759, mining)
    ZO_WorldMap_RefreshCustomPinsOfType(getPinTypeId(69))
    refreshCompass(69)
  }
}
