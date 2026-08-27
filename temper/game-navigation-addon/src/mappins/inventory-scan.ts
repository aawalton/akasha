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

export function scanInventory(this: void): undefined {
  for (const itemData of SHARED_INVENTORY.GenerateFullSlotData(undefined, BAG_BACKPACK)) {
    if (itemData !== undefined && itemData.itemType === ITEMTYPE_TROPHY) {
      const itemId = GetItemId(BAG_BACKPACK, itemData.slotIndex)
      const ancestral = ancestralTombRubbing[itemId]
      const wrothgar = wrothgarRelics[itemId]
      const summerset = relicsOfSummerset[itemId]
      const precursor = precursorItems[itemId]
      const chronogler = chronoglerTablet[itemId]
      const mural = muralMenderFragments[itemId]
      const history = piecesOfHistory[itemId]
      const instrument = instruments[itemId]
      const mining = miningSampleCollector[itemId]
      if (ancestral !== undefined) mark(1712, ancestral)
      else if (wrothgar !== undefined) mark(1250, wrothgar)
      else if (summerset !== undefined) mark(2099, summerset)
      else if (precursor !== undefined) mark(1958, precursor)
      else if (chronogler !== undefined) mark(2320, chronogler)
      else if (mural !== undefined) mark(2463, mural)
      else if (history !== undefined) mark(2534, history)
      else if (instrument !== undefined) mark(2669, instrument)
      else if (mining !== undefined) mark(2759, mining)
    }
  }
}
