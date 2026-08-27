import type { SkyshardPin } from "./data/types"
import { skyshardsData } from "./data"

type MutableSkyshardsData = Record<string, Record<string, SkyshardPin[]>>

function asString(this: void, value: unknown): string {
  return value as string
}

function asMutableSkyshardsData(this: void, value: unknown): MutableSkyshardsData {
  return value as MutableSkyshardsData
}

function asSkyshardPin(this: void, value: unknown): SkyshardPin {
  return value as SkyshardPin
}

const skyshardsAchievementIDs: Record<number, boolean> = {
  [695]: true,
  [682]: true,
  [683]: true,
  [431]: true,
  [684]: true,
  [685]: true,
  [405]: true,
  [398]: true,
  [547]: true,
  [688]: true,
  [687]: true,
  [397]: true,
  [689]: true,
  [556]: true,
  [557]: true,
  [408]: true,
  [409]: true,
  [554]: true,
  [515]: true,
  [407]: true,
  [3672]: true,
  [1845]: true,
  [2857]: true,
  [2687]: true,
  [2982]: true,
  [1844]: true,
  [686]: true,
  [727]: true,
  [3140]: true,
  [3499]: true,
  [1342]: true,
  [1347]: true,
  [3270]: true,
  [2291]: true,
  [2461]: true,
  [4405]: true,
  [2562]: true,
  [1843]: true,
  [3949]: true,
  [1320]: true,
  [692]: true,
  [1160]: true,
}

type ConditionTable = Record<number, number | readonly number[]>

const skyshardsExplorationIDs: ConditionTable = {
  [2]: 964,
  [3]: 966,
  [4]: 965,
  [5]: 967,
  [6]: 968,
  [7]: 977,
  [8]: 979,
  [9]: 972,
  [10]: 971,
  [11]: 970,
  [12]: 974,
  [13]: 973,
  [14]: 766,
  [15]: 976,
  [16]: 978,
  [17]: 980,
  [18]: 975,
  [19]: 981,
  [20]: 981,
  [21]: 768,
  [22]: 975,
  [23]: 984,
  [25]: [986, 1126],
  [26]: 1169,
  [27]: 1323,
  [28]: 1359,
  [29]: 1428,
  [30]: 1866,
  [31]: 2018,
  [32]: 2010,
}

const skyshardsMainQuestIDs: ConditionTable = {
  [2]: 953,
  [3]: 955,
  [4]: 954,
  [5]: 956,
  [6]: 958,
  [7]: 944,
  [8]: 946,
  [9]: 950,
  [10]: 949,
  [11]: 948,
  [12]: 952,
  [13]: 951,
  [14]: 993,
  [15]: 943,
  [16]: 945,
  [17]: 947,
  [18]: 194,
  [19]: 415,
  [20]: 415,
  [21]: 525,
  [22]: 194,
  [23]: 957,
  [25]: 1143,
  [26]: 1175,
  [27]: 1260,
  [28]: 1363,
  [29]: 1444,
  [30]: 1852,
  [31]: 2064,
  [32]: 2194,
}

const skyshardsZoneQuestIDs: ConditionTable = {
  [2]: 34,
  [3]: 58,
  [4]: 57,
  [5]: 59,
  [6]: 60,
  [7]: 608,
  [8]: 611,
  [9]: 596,
  [10]: 595,
  [11]: 593,
  [12]: 603,
  [13]: 600,
  [14]: [758, 759, 760, 761, 762],
  [15]: 604,
  [16]: 610,
  [17]: 602,
  [18]: 194,
  [19]: 415,
  [20]: 415,
  [21]: 525,
  [22]: 194,
  [23]: 616,
  [25]: 1143,
  [26]: 1175,
  [27]: 1328,
  [28]: 1366,
  [29]: 1433,
  [30]: 1867,
  [31]: 2068,
  [32]: 2209,
}

export function getAchievementIDs(this: void): Record<number, boolean> {
  return skyshardsAchievementIDs
}

function areAllWayshrinesUnlocked(this: void): boolean {
  for (const nodeIndex of $range(1, GetNumFastTravelNodes())) {
    const [known, , , , , , poiType, isShownInCurrentMap] = GetFastTravelNodeInfo(nodeIndex)
    if (isShownInCurrentMap && poiType === POI_TYPE_WAYSHRINE && !known) {
      return false
    }
  }

  return true
}

export function getImmersiveModeCondition(
  this: void,
  mode: number,
  mapIndex: number
): number | readonly number[] | boolean | undefined {
  if (mode === 2) {
    return skyshardsMainQuestIDs[mapIndex]
  } else if (mode === 3) {
    return areAllWayshrinesUnlocked()
  } else if (mode === 4) {
    return skyshardsExplorationIDs[mapIndex]
  } else if (mode === 5) {
    return skyshardsZoneQuestIDs[mapIndex]
  }
  return undefined
}

export function getLocalData(
  this: void,
  zone: unknown,
  subzone: unknown
): readonly SkyshardPin[] | undefined {
  if (type(zone) === "string" && type(subzone) === "string") {
    const zoneTable = skyshardsData[asString(zone)]
    if (zoneTable != null) {
      const list = zoneTable[asString(subzone)]
      if (list != null) {
        return list
      }
    }
  }
  return undefined
}

export function setLocalData(
  this: void,
  zone: unknown,
  subzone: unknown,
  data: unknown
): undefined {
  if (type(zone) === "string" && type(subzone) === "string" && type(data) === "table") {
    const zoneKey = asString(zone)
    const subzoneKey = asString(subzone)
    const mutableData = asMutableSkyshardsData(skyshardsData)
    let zoneTable = mutableData[zoneKey]
    if (zoneTable == null) {
      zoneTable = {}
      mutableData[zoneKey] = zoneTable
    }
    let list = zoneTable[subzoneKey]
    if (list == null) {
      list = []
      zoneTable[subzoneKey] = list
    }
    list.push(asSkyshardPin(data))
  }
}
