import { asGlobalTable, asPresent } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import { asLibSetsDlcEntryArray } from "../lib-sets-const-casts/lib-sets-const-casts.module.code.ts"

const lib = LibSets
const G = asGlobalTable(globalThis)

const strgmatch = string.gmatch
const zogcn = GetCollectibleName
const zogaci = GetAchievementCategoryInfo
const zocstrfor = ZO_CachedStrFormat

const checkIfPTSAPIVersionIsLive = lib.checkIfPTSAPIVersionIsLive

function gaci(this: void, topLevelIndex: number): string {
  const [name] = zogaci(topLevelIndex)
  return name
}

function gci(this: void, collectibleId: number): string {
  return zogcn(collectibleId)
}

G["DLC_TYPE_BASE_GAME"] = 0
const POSSIBLE_DLC_TYPES: { [index: number]: string } = {
  [1]: "DLC_TYPE_CHAPTER",
  [2]: "DLC_TYPE_DUNGEONS",
  [3]: "DLC_TYPE_ZONE",
  [4]: "DLC_TYPE_NORMAL_PATCH",
  [5]: "DLC_TYPE_SEASON_PART",
}
lib.possibleDlcTypes = POSSIBLE_DLC_TYPES
if (checkIfPTSAPIVersionIsLive()) {
}
for (const [dlcTypeId, dlcTypeName] of ipairs(POSSIBLE_DLC_TYPES)) {
  G[dlcTypeName] = dlcTypeId
}
let MAX_DLC_TYPES = 0
for (const [_k] of ipairs(POSSIBLE_DLC_TYPES)) {
  MAX_DLC_TYPES = MAX_DLC_TYPES + 1
}

const DLC_TYPE_ITERATION_BEGIN = DLC_TYPE_BASE_GAME
const DLC_TYPE_ITERATION_END = tonumber(G[asPresent(POSSIBLE_DLC_TYPES[MAX_DLC_TYPES])]) ?? 0
G["DLC_TYPE_ITERATION_BEGIN"] = DLC_TYPE_ITERATION_BEGIN
G["DLC_TYPE_ITERATION_END"] = DLC_TYPE_ITERATION_END
lib.allowedDLCTypes = {}
for (let i = DLC_TYPE_ITERATION_BEGIN; i <= DLC_TYPE_ITERATION_END; i++) {
  lib.allowedDLCTypes[i] = true
}

G["DLC_BASE_GAME"] = 0
const POSSIBLE_DLC_IDS: { [index: number]: string } = {
  [1]: "DLC_IMPERIAL_CITY",
  [2]: "DLC_ORSINIUM",
  [3]: "DLC_THIEVES_GUILD",
  [4]: "DLC_DARK_BROTHERHOOD",
  [5]: "DLC_SHADOWS_OF_THE_HIST",
  [6]: "DLC_MORROWIND",
  [7]: "DLC_HORNS_OF_THE_REACH",
  [8]: "DLC_CLOCKWORK_CITY",
  [9]: "DLC_DRAGON_BONES",
  [10]: "DLC_SUMMERSET",
  [11]: "DLC_WOLFHUNTER",
  [12]: "DLC_MURKMIRE",
  [13]: "DLC_WRATHSTONE",
  [14]: "DLC_ELSWEYR",
  [15]: "DLC_SCALEBREAKER",
  [16]: "DLC_DRAGONHOLD",
  [17]: "DLC_HARROWSTORM",
  [18]: "DLC_GREYMOOR",
  [19]: "DLC_STONETHORN",
  [20]: "DLC_MARKARTH",
  [21]: "DLC_FLAMES_OF_AMBITION",
  [22]: "DLC_BLACKWOOD",
  [23]: "DLC_WAKING_FLAME",
  [24]: "DLC_DEADLANDS",
  [25]: "DLC_ASCENDING_TIDE",
  [26]: "DLC_HIGH_ISLE",
  [27]: "DLC_LOST_DEPTHS",
  [28]: "DLC_FIRESONG",
  [29]: "DLC_SCRIBES_OF_FATE",
  [30]: "DLC_NECROM",
  [31]: "NO_DLC_UPDATE39",
  [32]: "NO_DLC_SECRET_OF_THE_TELVANNI",
  [33]: "DLC_SCIONS_OF_ITHELIA",
  [34]: "DLC_GOLD_ROAD",
  [35]: "NO_DLC_UPDATE43",
  [36]: "NO_DLC_UPDATE44",
  [37]: "DLC_FALLEN_BANNERS",
  [38]: "DLC_SEASONS_OF_THE_WORMCULT1",
  [39]: "DLC_FEAST_OF_SHADOWS",
  [40]: "DLC_SEASONS_OF_THE_WORMCULT2",
  [41]: "DLC_SEASON0",
}
lib.possibleDlcIds = POSSIBLE_DLC_IDS
if (checkIfPTSAPIVersionIsLive()) {
  let maxIdsForPush = 0
  for (const [k] of ipairs(POSSIBLE_DLC_IDS)) {
    maxIdsForPush = k
  }
  POSSIBLE_DLC_IDS[maxIdsForPush + 1] = "DLC_SEASON0_PART2"
}
for (const [dlcId, dlcName] of ipairs(POSSIBLE_DLC_IDS)) {
  G[dlcName] = dlcId
}
let MAX_DLC_ID = 0
for (const [_k] of ipairs(POSSIBLE_DLC_IDS)) {
  MAX_DLC_ID = MAX_DLC_ID + 1
}
G["DLC_ITERATION_BEGIN"] = DLC_BASE_GAME
const DLC_ITERATION_BEGIN = DLC_BASE_GAME
G["DLC_ITERATION_END"] = tonumber(G[asPresent(POSSIBLE_DLC_IDS[MAX_DLC_ID])]) ?? 0
const DLC_ITERATION_END = tonumber(G["DLC_ITERATION_END"]) ?? 0
lib.allowedDLCIds = {}
for (let i = DLC_ITERATION_BEGIN; i <= DLC_ITERATION_END; i++) {
  lib.allowedDLCIds[i] = true
}

lib.dlcAndChapterCollectibleIds = {
  [DLC_BASE_GAME]: {
    collectibleId: -1,
    achievementCategoryId: -1,
    type: DLC_TYPE_BASE_GAME,
    releaseDate: 1396569600,
  },
  [DLC_IMPERIAL_CITY]: { collectibleId: 154, type: DLC_TYPE_CHAPTER, releaseDate: 1440979200 },
  [DLC_ORSINIUM]: { collectibleId: 215, type: DLC_TYPE_CHAPTER, releaseDate: 1446422400 },
  [DLC_THIEVES_GUILD]: { collectibleId: 254, type: DLC_TYPE_ZONE, releaseDate: 1457308800 },
  [DLC_DARK_BROTHERHOOD]: { collectibleId: 306, type: DLC_TYPE_ZONE, releaseDate: 1464652800 },
  [DLC_SHADOWS_OF_THE_HIST]: {
    name: "Shadows of the Hist",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1470009600,
  },
  [DLC_MORROWIND]: { collectibleId: 593, type: DLC_TYPE_ZONE, releaseDate: 1496620800 },
  [DLC_HORNS_OF_THE_REACH]: {
    name: "Horns of the Reach",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1502668800,
  },
  [DLC_CLOCKWORK_CITY]: { collectibleId: 1240, type: DLC_TYPE_ZONE, releaseDate: 1508716800 },
  [DLC_DRAGON_BONES]: { name: "Dragon Bones", type: DLC_TYPE_DUNGEONS, releaseDate: 1518393600 },
  [DLC_SUMMERSET]: { collectibleId: 5107, type: DLC_TYPE_ZONE, releaseDate: 1528156800 },
  [DLC_WOLFHUNTER]: { name: "Wolfhunter", type: DLC_TYPE_DUNGEONS, releaseDate: 1534118400 },
  [DLC_MURKMIRE]: { collectibleId: 5755, type: DLC_TYPE_ZONE, releaseDate: 1540166400 },
  [DLC_WRATHSTONE]: { name: "Wrathstone", type: DLC_TYPE_DUNGEONS, releaseDate: 1551052800 },
  [DLC_ELSWEYR]: { collectibleId: 5843, type: DLC_TYPE_CHAPTER, releaseDate: 1558310400 },
  [DLC_SCALEBREAKER]: { name: "Scalebreaker", type: DLC_TYPE_DUNGEONS, releaseDate: 1565568000 },
  [DLC_DRAGONHOLD]: { collectibleId: 6920, type: DLC_TYPE_ZONE, releaseDate: 1571616000 },
  [DLC_HARROWSTORM]: { name: "Harrowstorm", type: DLC_TYPE_DUNGEONS, releaseDate: 1582502400 },
  [DLC_GREYMOOR]: { collectibleId: 7466, type: DLC_TYPE_CHAPTER, releaseDate: 1590451200 },
  [DLC_STONETHORN]: { name: "Stonethorn", type: DLC_TYPE_DUNGEONS, releaseDate: 1598227200 },
  [DLC_MARKARTH]: { collectibleId: 8388, type: DLC_TYPE_ZONE, releaseDate: 1604275200 },
  [DLC_FLAMES_OF_AMBITION]: {
    name: "Flames of Ambition",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1615161600,
  },
  [DLC_BLACKWOOD]: { collectibleId: 8659, type: DLC_TYPE_CHAPTER, releaseDate: 1622505600 },
  [DLC_WAKING_FLAME]: { name: "Waking Flame", type: DLC_TYPE_DUNGEONS, releaseDate: 1635724800 },
  [DLC_DEADLANDS]: { collectibleId: 9365, type: DLC_TYPE_ZONE, releaseDate: 1635724800 },
  [DLC_ASCENDING_TIDE]: {
    name: "Ascending Tide",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1647216000,
  },
  [DLC_HIGH_ISLE]: { collectibleId: 10053, type: DLC_TYPE_CHAPTER, releaseDate: 1654473600 },
  [DLC_LOST_DEPTHS]: { name: "Lost Depths", type: DLC_TYPE_DUNGEONS, releaseDate: 1661126400 },
  [DLC_FIRESONG]: { collectibleId: 10660, type: DLC_TYPE_DUNGEONS, releaseDate: 1667260800 },
  [DLC_SCRIBES_OF_FATE]: {
    name: "Scribes of Fate",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1678662000,
  },
  [DLC_NECROM]: { collectibleId: 10475, type: DLC_TYPE_CHAPTER, releaseDate: 1685916000 },
  [NO_DLC_UPDATE39]: { name: "Update 39", type: DLC_TYPE_NORMAL_PATCH, releaseDate: 1692604800 },
  [NO_DLC_SECRET_OF_THE_TELVANNI]: {
    name: "Update 40: Secret of the Telvanni",
    type: DLC_TYPE_NORMAL_PATCH,
    releaseDate: 1698663600,
  },
  [DLC_SCIONS_OF_ITHELIA]: {
    name: "Scions of Ithelia",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1709294400,
  },
  [DLC_GOLD_ROAD]: { collectibleId: 11871, type: DLC_TYPE_CHAPTER, releaseDate: 1717365600 },
  [NO_DLC_UPDATE43]: { name: "Update 43", type: DLC_TYPE_NORMAL_PATCH, releaseDate: 1724068800 },
  [NO_DLC_UPDATE44]: { name: "Update 44", type: DLC_TYPE_NORMAL_PATCH, releaseDate: 1730116800 },
  [DLC_FALLEN_BANNERS]: {
    name: "Fallen Banners",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1741608000,
  },
  [DLC_SEASONS_OF_THE_WORMCULT1]: {
    name: "Seasons of the Wormcult 1",
    type: DLC_TYPE_SEASON_PART,
    releaseDate: 1748865600,
  },
  [DLC_FEAST_OF_SHADOWS]: {
    name: "Feast of Shadows",
    type: DLC_TYPE_DUNGEONS,
    releaseDate: 1755511200,
  },
  [DLC_SEASONS_OF_THE_WORMCULT2]: {
    name: "Seasons of the Wormcult 2",
    type: DLC_TYPE_SEASON_PART,
    releaseDate: 1760702400,
  },
  [DLC_SEASON0]: { name: "Season 0", type: DLC_TYPE_SEASON_PART, releaseDate: 1773057600 },
}
if (checkIfPTSAPIVersionIsLive()) {
  lib.dlcAndChapterCollectibleIds[DLC_SEASON0_PART2] = {
    name: "Season 0, Part 2",
    type: DLC_TYPE_SEASON_PART,
    releaseDate: 1780898400,
  }
}

function cleanDLCTimeStamp(
  this: void,
  releaseDateTimestamp: number | undefined,
  withoutColon?: boolean
): LuaMultiReturn<[string, string]> {
  let releaseDateStr: string | undefined
  let onlyDateWithoutTimeStr: string | undefined
  if (
    releaseDateTimestamp !== undefined &&
    type(releaseDateTimestamp) === "number" &&
    releaseDateTimestamp >= 0 &&
    releaseDateTimestamp <= 2147483647
  ) {
    releaseDateStr = os.date("%c", releaseDateTimestamp)
    const [foundSpace] = string.find(releaseDateStr, " ", 1, true)
    if (foundSpace !== undefined) {
      for (const [param] of strgmatch(releaseDateStr, "([^%s]+)%s*")) {
        if (param !== undefined && param !== "") {
          onlyDateWithoutTimeStr = param
          break
        }
      }
    } else {
      onlyDateWithoutTimeStr = releaseDateStr
    }
  }

  if (releaseDateStr === undefined) {
    releaseDateStr = ""
  }
  if (onlyDateWithoutTimeStr === undefined) {
    onlyDateWithoutTimeStr = ""
  }
  if (withoutColon !== true && onlyDateWithoutTimeStr !== "") {
    onlyDateWithoutTimeStr = onlyDateWithoutTimeStr + ": "
  }
  return $multi(releaseDateStr, onlyDateWithoutTimeStr)
}
lib.CleanDLCTimeStamp = cleanDLCTimeStamp

const dlcAndChapterCollectibleIds = lib.dlcAndChapterCollectibleIds
lib.DLCAndCHAPTERData = {}
lib.DLCAndCHAPTERDataOrdered = {}
lib.DLCandCHAPTERLookupdata = {}
lib.NONDLCData = {}
lib.NONDLCLookupdata = {}
const DLCandCHAPTERdata = lib.DLCAndCHAPTERData
const DLCAndCHAPTERDataOrdered = lib.DLCAndCHAPTERDataOrdered
const DLCandCHAPTERLookupdata = lib.DLCandCHAPTERLookupdata
const NONDLCData = lib.NONDLCData
const NONDLCLookupdata = lib.NONDLCLookupdata
DLCandCHAPTERdata[DLC_BASE_GAME] = "Elder Scrolls Online"
DLCandCHAPTERLookupdata[DLC_TYPE_BASE_GAME] = {
  [DLC_BASE_GAME]: DLCandCHAPTERdata[DLC_BASE_GAME],
}
DLCAndCHAPTERDataOrdered[1] = DLC_BASE_GAME

const DLC_STR_FORMAT_PATTERN = "<<C:1>>"
for (const [dlcId, dlcAndChapterData] of ipairs(
  asLibSetsDlcEntryArray(dlcAndChapterCollectibleIds)
)) {
  const collectibleId = dlcAndChapterData.collectibleId
  const achievementCategoryId = dlcAndChapterData.achievementCategoryId
  const dlcType = dlcAndChapterData.type
  if (dlcType !== undefined) {
    if (dlcType !== DLC_TYPE_NORMAL_PATCH) {
      let name: string | undefined
      if (collectibleId !== undefined && collectibleId !== -1) {
        name = zocstrfor(DLC_STR_FORMAT_PATTERN, gci(collectibleId))
      } else if (achievementCategoryId !== undefined && achievementCategoryId !== -1) {
        name = zocstrfor(DLC_STR_FORMAT_PATTERN, gaci(achievementCategoryId))
      }
      if (name === undefined) {
        name = dlcAndChapterData.name
        if (name === undefined) {
          if (dlcAndChapterData.releaseDate !== undefined) {
            const [, nameWithoutTime] = cleanDLCTimeStamp(dlcAndChapterData.releaseDate, true)
            name = nameWithoutTime
          } else {
            name = "n/a"
          }
        }
      }
      if (name !== undefined) {
        DLCandCHAPTERLookupdata[dlcType] = DLCandCHAPTERLookupdata[dlcType] ?? {}
        DLCandCHAPTERdata[dlcId] = name
        DLCandCHAPTERLookupdata[dlcType][dlcId] = name
        let orderedLen = 0
        for (const [k] of ipairs(DLCAndCHAPTERDataOrdered)) {
          orderedLen = k
        }
        DLCAndCHAPTERDataOrdered[orderedLen + 1] = dlcId
      }
    } else {
      NONDLCLookupdata[dlcType] = NONDLCLookupdata[dlcType] ?? {}
      const name = dlcAndChapterData.name ?? "n/a"
      NONDLCLookupdata[dlcType][dlcId] = name
      NONDLCData[dlcId] = name
    }
  }
}

function getDLCInfo(this: void, dlcId: number): LuaMultiReturn<[string, number | undefined]> {
  const dlcName = DLCandCHAPTERdata[dlcId] ?? NONDLCData[dlcId] ?? ""
  const dlcEntry = dlcAndChapterCollectibleIds[dlcId]
  const releaseDateTimeStamp = dlcEntry !== undefined ? dlcEntry.releaseDate : undefined
  return $multi(dlcName, releaseDateTimeStamp)
}
lib.GetDLCInfo = getDLCInfo
