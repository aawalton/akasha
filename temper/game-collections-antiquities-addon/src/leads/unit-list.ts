import { requireNumericKey } from "@temper/shared-narrow"
import {
  DROPDOWN_MAJOR_ACTIONABLE,
  DROPDOWN_MAJOR_ALL,
  DROPDOWN_MAJOR_CANFIND,
  DROPDOWN_MAJOR_CANSCRY,
  DROPDOWN_MAJOR_GROUPDUNGEONS,
  DROPDOWN_MAJOR_LATESTDLC,
  DROPDOWN_MAJOR_MISSINGCODEX,
  DROPDOWN_MAJOR_NEVERDUGOUT,
  DROPDOWN_SETTYPE_ALL,
  DROPDOWN_SETTYPE_MULTIPART,
  DROPDOWN_SETTYPE_NOOBVIOUS,
  DROPDOWN_ZONE_ALL,
  DROPDOWN_ZONE_CURRENT,
  DROPDOWN_ZONE_LATESTDLC,
  DROPDOWN_ZONE_NODLC,
  dropdownData,
  FURNISHING,
  isSet,
  MOTIF_CHAPTER,
  TREASURE,
} from "./constants"
import {
  BLUE_TEXT_HEX,
  DEFAULT_TEXT_RGBA,
  GOLD_TEXT_HEX,
  GREEN_TEXT_HEX,
  ORANGE_TEXT_HEX,
  PURPLE_TEXT_HEX,
  RED_TEXT_HEX,
  YELLOW_TEXT_HEX,
} from "./data/colors"
import { GROUP_DUNGEON_ANTIQUITY_IDS } from "./data/group-dungeons"
import {
  FAKE_ZONE_IDS,
  LATEST_DLC_FIRST_ANTIQUITY_ID,
  ZONE_IDS,
  ZONE_TYPE_CHAPTER,
  ZONE_TYPES,
} from "./data/zones"
import { getDropdownChoice } from "./saved-variables"

const [defaultR, defaultG, defaultB, defaultA] = DEFAULT_TEXT_RGBA
const DEFAULT_TEXT = ZO_ColorDef.New(defaultR, defaultG, defaultB, defaultA)
const GREEN_TEXT = ZO_ColorDef.New(GREEN_TEXT_HEX)
const BLUE_TEXT = ZO_ColorDef.New(BLUE_TEXT_HEX)
const PURPLE_TEXT = ZO_ColorDef.New(PURPLE_TEXT_HEX)
const GOLD_TEXT = ZO_ColorDef.New(GOLD_TEXT_HEX)
const ORANGE_TEXT = ZO_ColorDef.New(ORANGE_TEXT_HEX)
const YELLOW_TEXT = ZO_ColorDef.New(YELLOW_TEXT_HEX)
const RED_TEXT = ZO_ColorDef.New(RED_TEXT_HEX)

declare global {
  var TemperLeadsMainWindow: TopLevelWindow
}

export interface UnitData {
  Lead: string
  Zone: string
  ZoneId: number
  Location: string
  Diff: number
  Lore: number
  Dug: number
  Set: string
  SetId: number
  Expiration: number
  SetQuality: number
  HaveLead: boolean
  Repeatable: boolean
  Aid: number
}

type LeadsColor = ZoColorDef

interface RowLabel extends LabelControl {
  normalColor?: LeadsColor
}

export interface UnitRowControl extends Control {
  data?: UnitData
  Lead?: RowLabel
  Zone?: RowLabel
  Location?: RowLabel
  Diff?: RowLabel
  Lore?: RowLabel
  Dug?: RowLabel
  Set?: RowLabel
  Expiration?: RowLabel
}

export interface UnitList {
  list: Control
  masterList: UnitData[]
  currentSortKey: string
  currentSortOrder: boolean
  sortFunction: (
    this: void,
    listEntry1: ZoScrollListDataEntry<UnitData>,
    listEntry2: ZoScrollListDataEntry<UnitData>
  ) => boolean
  sortHeaderGroup: ZoSortHeaderGroup
  Initialize: (this: UnitList, control: Control) => void
  BuildMasterList: (this: UnitList) => void
  FilterScrollList: (this: UnitList) => void
  SortScrollList: (this: UnitList) => void
  SetupUnitRow: (this: UnitList, control: UnitRowControl, data: UnitData) => void
  Refresh: (this: UnitList) => void
  RefreshData: (this: UnitList) => void
  Row_OnMouseEnter: (this: UnitList, row: Control) => void
  Row_OnMouseExit: (this: UnitList, row: Control) => void
}

interface UnitListClass extends UnitList, ZoSortFilterListSubclass {
  defaults: Record<string, unknown>
  SORT_KEYS: Record<string, ZoSortKeyConfig>
  New: (this: UnitListClass) => UnitList
}

const TemperLeadsUnitList = ZO_SortFilterList.Subclass<UnitListClass>()
TemperLeadsUnitList.defaults = {}
TemperLeadsUnitList.SORT_KEYS = {
  Lead: {},
  Zone: { tiebreaker: "Lead" },
  Location: { tiebreaker: "Lead" },
  Diff: { tiebreaker: "Lead" },
  Lore: { tiebreaker: "Lead" },
  Dug: { tiebreaker: "Lead" },
  Set: { tiebreaker: "Lead" },
  Expiration: { tiebreaker: "Lead" },
}

let units: Record<number, UnitData> = {}
let setsMinFound: Record<number, number> = {}

export function getUnits(): Record<number, UnitData> {
  return units
}

export function setUnits(next: Record<number, UnitData>): undefined {
  units = next
}

export function getSetsMinFound(): Record<number, number> {
  return setsMinFound
}

export function setSetsMinFound(next: Record<number, number>): undefined {
  setsMinFound = next
}

function isFinishedNonRepeatable(data: UnitData): boolean {
  return !data.Repeatable && data.Dug === 1
}

function isOverCollectedSet(data: UnitData): boolean {
  if (data.SetId <= 0) {
    return false
  }
  const minFound = setsMinFound[data.SetId]
  return minFound !== undefined && data.Dug > minFound
}

function getColorCode(intValue: number): LeadsColor {
  if (intValue === 1) {
    return GREEN_TEXT
  }
  if (intValue === 2) {
    return BLUE_TEXT
  }
  if (intValue === 3) {
    return PURPLE_TEXT
  }
  if (intValue === 4) {
    return GOLD_TEXT
  }
  if (intValue === 5) {
    return ORANGE_TEXT
  }
  return DEFAULT_TEXT
}

function getScrollData(list: Control): ZoScrollListDataEntry<UnitData>[] {
  const scrollData = ZO_ScrollList_GetDataList<UnitData>(list)
  if (scrollData === undefined) {
    throw new Error("TemperLeads scroll data list missing")
  }
  return scrollData
}

function getRowLabel(control: UnitRowControl, suffix: string): RowLabel {
  const label = GetControl<RowLabel>(control, suffix)
  if (label === undefined) {
    throw new Error(string.format("TemperLeads row label missing: %s", suffix))
  }
  return label
}

function formatExpiration(leadTimeLeft: number): string {
  const days = math.floor(leadTimeLeft / 86400)
  const hours = math.floor((leadTimeLeft - days * 86400) / 3600)
  const minutes = math.floor((leadTimeLeft - days * 86400 - hours * 3600) / 60)
  return string.format("%dd %dh %dm", days, hours, minutes)
}

function colorizeExpiration(leadTimeLeft: number): LeadsColor {
  if (leadTimeLeft < 3600) {
    return RED_TEXT
  }
  if (leadTimeLeft < 86400) {
    return ORANGE_TEXT
  }
  if (leadTimeLeft < 604800) {
    return YELLOW_TEXT
  }
  return GREEN_TEXT
}

TemperLeadsUnitList.New = function (this: UnitListClass): UnitList {
  return ZO_SortFilterList.New<UnitList>(this, TemperLeadsMainWindow)
}

TemperLeadsUnitList.Initialize = function (this: UnitList, control: Control) {
  ZO_SortFilterList.Initialize(this, control)
  this.sortHeaderGroup.SelectHeaderByKey("Lead")
  this.masterList = []
  ZO_ScrollList_AddDataType<UnitData, UnitRowControl>(
    this.list,
    1,
    "TemperLeadsUnitRow",
    30,
    (rowControl, data) => {
      this.SetupUnitRow(rowControl, data)
    }
  )
  ZO_ScrollList_EnableHighlight(this.list, "ZO_ThinListHighlight")
  this.sortFunction = (listEntry1, listEntry2) =>
    ZO_TableOrderingFunction(
      listEntry1.data,
      listEntry2.data,
      this.currentSortKey,
      TemperLeadsUnitList.SORT_KEYS,
      this.currentSortOrder
    )
  this.RefreshData()
}

TemperLeadsUnitList.BuildMasterList = function (this: UnitList) {
  this.masterList = []
  for (const [key, data] of Object.entries(getUnits())) {
    data.Aid = requireNumericKey(key, "units key")
    this.masterList.push(data)
  }
}

TemperLeadsUnitList.FilterScrollList = function (this: UnitList) {
  const choiceMajor = getDropdownChoice()["Major"]
  const choiceZone = getDropdownChoice()["Zone"]
  const choiceSetType = getDropdownChoice()["SetType"]

  const passesMajor = (data: UnitData): boolean => {
    const choices = dropdownData.ChoicesMajor
    if (choiceMajor === choices[DROPDOWN_MAJOR_ALL]) {
      return true
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_ACTIONABLE]) {
      return !(isFinishedNonRepeatable(data) || isOverCollectedSet(data))
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_CANSCRY]) {
      return data.HaveLead
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_CANFIND]) {
      return !data.HaveLead && !isFinishedNonRepeatable(data) && !isOverCollectedSet(data)
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_MISSINGCODEX]) {
      return data.Lore > 0
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_NEVERDUGOUT]) {
      return data.Dug === 0
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_GROUPDUNGEONS]) {
      return GROUP_DUNGEON_ANTIQUITY_IDS[data.Aid] !== undefined
    }
    if (choiceMajor === choices[DROPDOWN_MAJOR_LATESTDLC]) {
      return data.Aid >= LATEST_DLC_FIRST_ANTIQUITY_ID && !isFinishedNonRepeatable(data)
    }
    return false
  }

  const fmtZone = (zoneId: number): string => ZO_CachedStrFormat("<<C:1>>", GetZoneNameById(zoneId))

  const passesZone = (data: UnitData): boolean => {
    const currentZoneIndex = GetCurrentMapZoneIndex()
    let currentZoneId = GetZoneId(currentZoneIndex)
    while (
      !(currentZoneId === ZONE_IDS.ARTAEUM || GetParentZoneId(currentZoneId) === currentZoneId)
    ) {
      currentZoneId = GetParentZoneId(currentZoneId)
    }
    if (currentZoneId === ZONE_IDS.WSKYRIMCAVERN) {
      currentZoneId = ZONE_IDS.WSKYRIM
    }
    if (currentZoneId === ZONE_IDS.THEREACHCAVERN) {
      currentZoneId = ZONE_IDS.THEREACH
    }

    const choices = dropdownData.ChoicesZone
    if (choiceZone === choices[DROPDOWN_ZONE_ALL]) {
      return true
    }
    if (choiceZone === choices[DROPDOWN_ZONE_CURRENT]) {
      if (data.ZoneId < FAKE_ZONE_IDS.ALLZONES) {
        return data.ZoneId === currentZoneId
      }
      if (data.ZoneId === FAKE_ZONE_IDS.ALLZONES || data.ZoneId === FAKE_ZONE_IDS.UNKNOWN) {
        return true
      }
      if (data.ZoneId === FAKE_ZONE_IDS.BGS) {
        return false
      }
      if (data.ZoneId === FAKE_ZONE_IDS.ARTAEUM_SUMMERSET) {
        return currentZoneId === ZONE_IDS.ARTAEUM || currentZoneId === ZONE_IDS.SUMMERSET
      }
      if (data.ZoneId === FAKE_ZONE_IDS.EASTMARCH_RIFT) {
        return currentZoneId === ZONE_IDS.EASTMARCH || currentZoneId === ZONE_IDS.RIFT
      }
      if (data.ZoneId === FAKE_ZONE_IDS.CYRODIIL_IMPERIALCITY) {
        return currentZoneId === ZONE_IDS.CYRODIIL || currentZoneId === ZONE_IDS.IMPERIALCITY
      }
      if (data.ZoneId === FAKE_ZONE_IDS.GALEN_HIGHISLE) {
        return choiceZone === fmtZone(ZONE_IDS.GALEN) || choiceZone === fmtZone(ZONE_IDS.HIGHISLE)
      }
      return false
    }
    if (choiceZone === choices[DROPDOWN_ZONE_NODLC]) {
      const test = ZONE_TYPES[data.ZoneId]
      return (
        test === undefined || test === ZONE_TYPE_CHAPTER || data.ZoneId >= FAKE_ZONE_IDS.ALLZONES
      )
    }
    if (choiceZone === choices[DROPDOWN_ZONE_LATESTDLC]) {
      return data.Aid >= LATEST_DLC_FIRST_ANTIQUITY_ID && !isFinishedNonRepeatable(data)
    }
    if (data.ZoneId < FAKE_ZONE_IDS.ALLZONES) {
      return data.Zone === choiceZone
    }
    if (data.ZoneId === FAKE_ZONE_IDS.ALLZONES || data.ZoneId === FAKE_ZONE_IDS.UNKNOWN) {
      return true
    }
    if (data.ZoneId === FAKE_ZONE_IDS.BGS) {
      return false
    }
    if (data.ZoneId === FAKE_ZONE_IDS.ARTAEUM_SUMMERSET) {
      return choiceZone === fmtZone(ZONE_IDS.ARTAEUM) || choiceZone === fmtZone(ZONE_IDS.SUMMERSET)
    }
    if (data.ZoneId === FAKE_ZONE_IDS.EASTMARCH_RIFT) {
      return choiceZone === fmtZone(ZONE_IDS.EASTMARCH) || choiceZone === fmtZone(ZONE_IDS.RIFT)
    }
    if (data.ZoneId === FAKE_ZONE_IDS.CYRODIIL_IMPERIALCITY) {
      return (
        choiceZone === fmtZone(ZONE_IDS.CYRODIIL) || choiceZone === fmtZone(ZONE_IDS.IMPERIALCITY)
      )
    }
    if (data.ZoneId === FAKE_ZONE_IDS.GALEN_HIGHISLE) {
      return choiceZone === fmtZone(ZONE_IDS.GALEN) || choiceZone === fmtZone(ZONE_IDS.HIGHISLE)
    }
    return false
  }

  const passesSetType = (data: UnitData): boolean => {
    const choices = dropdownData.ChoicesSetType
    if (choiceSetType === choices[DROPDOWN_SETTYPE_ALL]) {
      return true
    }
    if (choiceSetType === choices[DROPDOWN_SETTYPE_MULTIPART]) {
      return isSet[data.Set] === undefined
    }
    if (choiceSetType === choices[DROPDOWN_SETTYPE_NOOBVIOUS]) {
      if (choiceMajor === dropdownData.ChoicesMajor[DROPDOWN_MAJOR_CANSCRY]) {
        return !(data.Diff === 1 && data.Set === TREASURE)
      }
      return !(
        data.Set === MOTIF_CHAPTER ||
        (data.Diff < 4 && data.Set === TREASURE) ||
        (data.Diff < 2 && data.Set === FURNISHING)
      )
    }
    return data.Set === choiceSetType
  }

  const scrollData = getScrollData(this.list)
  ZO_ClearNumericallyIndexedTable(scrollData)
  for (const data of this.masterList) {
    if (passesMajor(data) && passesZone(data) && passesSetType(data)) {
      scrollData.push(ZO_ScrollList_CreateDataEntry(1, data))
    }
  }
}

TemperLeadsUnitList.SortScrollList = function (this: UnitList) {
  const scrollData = getScrollData(this.list)
  table.sort(scrollData, this.sortFunction)
}

TemperLeadsUnitList.SetupUnitRow = function (
  this: UnitList,
  control: UnitRowControl,
  data: UnitData
) {
  control.data = data
  const lead = getRowLabel(control, "Lead")
  const zone = getRowLabel(control, "Zone")
  const location = getRowLabel(control, "Location")
  const diff = getRowLabel(control, "Diff")
  const lore = getRowLabel(control, "Lore")
  const dug = getRowLabel(control, "Dug")
  const set = getRowLabel(control, "Set")
  const expiration = getRowLabel(control, "Expiration")
  control.Lead = lead
  control.Zone = zone
  control.Location = location
  control.Diff = diff
  control.Lore = lore
  control.Dug = dug
  control.Set = set
  control.Expiration = expiration

  let formatBegin = ""
  let formatEnd = ""
  if (isFinishedNonRepeatable(data) || isOverCollectedSet(data)) {
    formatBegin = "|l0:1:0:-25%:2:000000|l"
    formatEnd = "|l"
  }
  lead.SetText(formatBegin + data.Lead + formatEnd)
  zone.SetText(formatBegin + data.Zone + formatEnd)
  location.SetText(formatBegin + data.Location + formatEnd)
  diff.SetText(tostring(data.Diff))
  lore.SetText(tostring(data.Lore))
  dug.SetText(tostring(data.Dug))
  set.SetText(formatBegin + data.Set + formatEnd)
  if (data.HaveLead) {
    expiration.SetText(formatExpiration(data.Expiration))
  } else {
    expiration.SetText("")
  }

  lead.normalColor = getColorCode(data.Diff)
  zone.normalColor = getColorCode(data.Diff)
  location.normalColor = getColorCode(data.Diff)
  diff.normalColor = getColorCode(data.Diff)
  lore.normalColor = getColorCode(data.Diff)
  dug.normalColor = getColorCode(data.Diff)
  set.normalColor = getColorCode(data.SetQuality)
  expiration.normalColor = colorizeExpiration(data.Expiration)

  ZO_SortFilterList.SetupRow(this, control, data)
}

TemperLeadsUnitList.Refresh = function (this: UnitList) {
  this.RefreshData()
}

let unitListInstance: UnitList | undefined

export function createUnitList(): UnitList {
  unitListInstance = TemperLeadsUnitList.New()
  return unitListInstance
}

export function getUnitList(): UnitList {
  if (unitListInstance === undefined) {
    throw new Error("TemperLeads unit list not initialized")
  }
  return unitListInstance
}
