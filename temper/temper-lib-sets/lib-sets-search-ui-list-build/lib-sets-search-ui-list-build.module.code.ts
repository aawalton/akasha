import {
  asNumber,
  asNumberArrayOpt,
  asPresent,
  asTyped,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLangStringRecord,
  asSetInfoMap,
  asStringOptArray,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"

const lib = LibSets

const tcon = table.concat
const zif = zo_iconFormat

const clientLang = lib.clientLang
const fallbackLang = lib.fallbackLang
const isClientLangEqualToFallbackLang = clientLang === fallbackLang

const libSets_GetSetBonuses = lib.GetSetBonuses
const buildSetTypeInfo = lib.buildSetTypeInfo
const buildSetDataText = lib.BuildSetDataText
const libSets_GetSetFirstItemId = lib.GetSetFirstItemId
const getArmorTypeTexture = lib.GetArmorTypeTexture
const getWeaponTypeTexture = lib.GetWeaponTypeTexture
const getEquipSlotTexture = lib.GetEquipSlotTexture

const POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_UNSORTED =
  lib.possibleSetSearchFavoriteCategoriesUnsorted

const MAX_DROP_LOCATION_ROWS_SHOWN = 5

type SetDataWithNames = LibSetsSearchRowData & {
  setNames?: { [lang: string]: string | undefined }
}
function asSetDataWithNames(value: unknown): SetDataWithNames {
  return value as SetDataWithNames
}

type SearchRowDataRecord = LibSetsSearchRowData & { [key: string]: unknown }
function asSearchRowDataRecord(value: unknown): SearchRowDataRecord {
  return value as SearchRowDataRecord
}

const preloadedSetNames = asLangStringRecord(
  lib.setDataPreloaded[asPresent(LIBSETS_TABLEKEY_SETNAMES)]
)

import { getSearchUIListClass } from "../lib-sets-search-ui-list-class/lib-sets-search-ui-list-class.module.code.ts"
import { searchUI } from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const listClass = getSearchUIListClass()

listClass.CreateEntryForSet = function (
  this: LibSetsSearchUIList,
  setId: number,
  setDataIn: { [key: string]: unknown }
): LibSetsSearchRowData | undefined {
  const parentObject = this._parentObject
  const setData = asSetDataWithNames(setDataIn)
  const settings = lib.svData
  const setSearchShowSetNamesInEnglishToo = settings?.setSearchShowSetNamesInEnglishToo

  let itemId: number | undefined
  let nameColumnValueClean: string | undefined
  const setNames = asPresent(setData.setNames)
  if (!isClientLangEqualToFallbackLang) {
    nameColumnValueClean = setNames[clientLang] ?? setNames[fallbackLang]
  } else {
    nameColumnValueClean = setNames[clientLang]
  }
  if (setSearchShowSetNamesInEnglishToo === true && !isClientLangEqualToFallbackLang) {
    const setNameFallback = setNames[fallbackLang] ?? preloadedSetNames[fallbackLang]
    if (setNameFallback !== undefined && nameColumnValueClean !== undefined) {
      nameColumnValueClean = `${nameColumnValueClean} / ${setNameFallback}`
    }
  }
  const nameColumnValue = nameColumnValueClean

  let isFavoriteColumnText: string | undefined
  for (const [setSearchFavoriteCategory] of pairs(
    POSSIBLE_SET_SEARCH_FAVORITE_CATEGORIES_UNSORTED
  )) {
    if (isFavoriteColumnText === undefined) {
      const isFavorite = parentObject.IsSetIdInFavorites(setId, tostring(setSearchFavoriteCategory))
      if (isFavorite === true) {
        isFavoriteColumnText = tostring(setSearchFavoriteCategory)
      }
    }
  }
  isFavoriteColumnText = isFavoriteColumnText ?? ""

  const [setTypeName, setTypeTexture] = buildSetTypeInfo(setData, true)

  if (this.isAnyItemIdRelevantFilterActive === true) {
    const itemIds = asNumberArrayOpt(parentObject.GetItemIdsForSetIdRespectingFilters(setId, true))
    if (itemIds === undefined) {
      return undefined
    }
    itemId = itemIds[0]
  } else {
    itemId = libSets_GetSetFirstItemId(setId, undefined)
  }

  if (itemId === undefined) {
    return undefined
  }
  const itemLink = asPresent(lib.buildItemLink(itemId, 370))

  let armorOrWeaponTypeTexture: string | undefined
  let armorOrWeaponTypeText: string | undefined
  let equipSlotTexture: string | undefined
  let equipSlotText: string | undefined
  const equipType = GetItemLinkEquipType(itemLink)
  ;[equipSlotTexture, , equipSlotText] = getEquipSlotTexture(equipType)
  const [itemTypeRaw] = GetItemLinkItemType(itemLink)
  const itemType = asNumber(itemTypeRaw)
  let armorOrWeaponType: number = ITEMTYPE_NONE
  if (equipType === EQUIP_TYPE_NECK || equipType === EQUIP_TYPE_RING) {
    armorOrWeaponType = ITEMTYPE_NONE
    ;[armorOrWeaponTypeTexture, , armorOrWeaponTypeText] = getEquipSlotTexture(equipType)
  } else {
    if (itemType === ITEMTYPE_ARMOR) {
      armorOrWeaponType = GetItemLinkArmorType(itemLink)
      ;[armorOrWeaponTypeTexture, , armorOrWeaponTypeText] = getArmorTypeTexture(armorOrWeaponType)
    } else if (itemType === ITEMTYPE_WEAPON) {
      armorOrWeaponType = GetItemLinkWeaponType(itemLink)
      if (armorOrWeaponType === WEAPONTYPE_SHIELD && equipType === EQUIP_TYPE_OFF_HAND) {
        ;[armorOrWeaponTypeTexture, , armorOrWeaponTypeText] =
          getWeaponTypeTexture(armorOrWeaponType)
        equipSlotTexture = armorOrWeaponTypeTexture
        equipSlotText = armorOrWeaponTypeText
      } else {
        ;[armorOrWeaponTypeTexture, , armorOrWeaponTypeText] =
          getWeaponTypeTexture(armorOrWeaponType)
      }
    }
  }

  const [, , numBonuses] = GetItemLinkSetInfo(itemLink, false)
  let bonuses = numBonuses === 0 ? [] : setData.bonuses
  setData.numBonuses = numBonuses
  if (numBonuses > 0 && (bonuses === undefined || type(bonuses) === "number")) {
    setData.bonuses = libSets_GetSetBonuses(itemLink, numBonuses)
    bonuses = setData.bonuses
  }

  const [setDataText, setInfoParts, setDataTextClean] = buildSetDataText(setData, itemLink, false)

  let dropLocationText: string | undefined
  let dropLocationSort: string | undefined

  const dropMechanicTab = asNumberArrayOpt(setData.dropMechanic)
  if (!ZO_IsTableEmpty(dropMechanicTab ?? {})) {
    const overallTextsPerZone = setInfoParts.overallTextsPerZone
    if (overallTextsPerZone !== undefined && overallTextsPerZone.enabled === true) {
      const overallTextsPerZoneData = asStringOptArray(overallTextsPerZone.data)
      let shownZoneTexts = 0
      let omittedZoneTexts = 0
      for (let idx = 0; idx < overallTextsPerZoneData.length; idx += 1) {
        const zoneText = overallTextsPerZoneData[idx]
        if (zoneText === undefined) {
          continue
        }
        if (shownZoneTexts >= MAX_DROP_LOCATION_ROWS_SHOWN) {
          omittedZoneTexts += 1
          continue
        }
        dropLocationText =
          dropLocationText === undefined ? zoneText : `${dropLocationText}   ${zoneText}`
        shownZoneTexts += 1
      }
      if (omittedZoneTexts > 0) {
        dropLocationText = `${dropLocationText}   (+${tostring(omittedZoneTexts)})`
      }
    }

    const dropZoneIds = asNumberArrayOpt(setData[asPresent(LIBSETS_TABLEKEY_ZONEIDS)])
    if (dropZoneIds !== undefined && !ZO_IsTableEmpty(dropZoneIds)) {
      dropLocationSort = ""

      const dropZonesNonDuplicateKey: { [id: number]: boolean } = {}
      const dropZonesNonDuplicate: number[] = []
      for (const [, dropZoneId] of ipairs(dropZoneIds)) {
        if (dropZonesNonDuplicateKey[dropZoneId] !== true) {
          dropZonesNonDuplicateKey[dropZoneId] = true
          dropZonesNonDuplicate.push(dropZoneId)
        }
      }
      dropLocationSort = `${dropLocationSort}Z${tcon(dropZonesNonDuplicate, ";")}`

      const dropMechnicsNonDuplicateKey: { [id: number]: boolean } = {}
      const dropMechnicsNonDuplicate: number[] = []
      for (const [, dropMechanicId] of ipairs(asPresent(dropMechanicTab))) {
        if (dropMechnicsNonDuplicateKey[dropMechanicId] !== true) {
          dropMechnicsNonDuplicateKey[dropMechanicId] = true
          dropMechnicsNonDuplicate.push(dropMechanicId)
        }
      }
      dropLocationSort = `${dropLocationSort}M${tcon(dropMechnicsNonDuplicate, ",")}`
    }
  }

  const itemData = asSearchRowDataRecord({
    type: searchUI.searchTypeDefault,
  })

  itemData._LibSets_setData = setData

  zo_mixin(itemData, setData)

  itemData.itemLink = itemLink
  itemData.itemId = itemId

  itemData.setTypeName = setTypeName
  itemData.setTypeTexture = setTypeTexture !== undefined ? zif(setTypeTexture, 24, 24) : undefined

  itemData.name = asPresent(nameColumnValue)
  itemData.nameLower = string.lower(asPresent(nameColumnValueClean))
  itemData.nameClean = nameColumnValueClean

  itemData.isFavorite = isFavoriteColumnText

  itemData.armorOrWeaponType = armorOrWeaponType
  itemData.armorOrWeaponTypeText = armorOrWeaponTypeText
  itemData.armorOrWeaponTypeTexture =
    armorOrWeaponTypeTexture !== undefined ? zif(armorOrWeaponTypeTexture, 24, 24) : undefined
  itemData.equipSlot = equipType
  itemData.equipSlotText = equipSlotText
  itemData.equipSlotTexture =
    equipSlotTexture !== undefined ? zif(equipSlotTexture, 24, 24) : undefined

  itemData.dropLocationText = dropLocationText
  itemData.dropLocationSort = dropLocationSort

  itemData.setDataText = setDataText
  itemData.setDataTextClean = setDataTextClean
  itemData.setInfoParts = setInfoParts

  return itemData
}

listClass.BuildMasterList = function (this: LibSetsSearchUIList) {
  const setsData = asSetInfoMap(lib.setInfo)
  this.masterList = []

  const setsBaseList = this._parentObject.PreFilterMasterList(setsData)
  if (setsBaseList === undefined || ZO_IsTableEmpty(setsBaseList)) {
    return
  }

  const isAnyItemIdRelevantFilterActive = this._parentObject.IsAnyItemIdRelevantFilterActive()
  this.isAnyItemIdRelevantFilterActive = isAnyItemIdRelevantFilterActive
  if (isAnyItemIdRelevantFilterActive === true) {
    this._parentObject.itemIdRelevantFilterKeys = this._parentObject.GetItemIdRelevantFilterKeys()
  }

  for (const [setId, setData] of pairs(setsBaseList)) {
    const entry = this.CreateEntryForSet(setId, setData)
    if (entry !== undefined) {
      this.masterList.push(entry)
    }
  }
}

listClass.FilterScrollList = function (this: LibSetsSearchUIList) {
  const scrollData = asPresent(ZO_ScrollList_GetDataList<LibSetsSearchRowData>(this.list))
  ZO_ClearNumericallyIndexedTable(scrollData)

  const searchInput = this._parentObject.searchEditBoxControl.GetText()
  const searchIsEmpty = searchInput === ""

  const bonusSearchInput = this._parentObject.bonusSearchEditBoxControl.GetText()
  const bonusSearchIsEmpty = bonusSearchInput === ""

  for (let i = 1; i <= this.masterList.length; i += 1) {
    const data = asPresent(this.masterList[i - 1])

    let addItemToList = false

    if (searchIsEmpty || this._parentObject.CheckForMatch(data, searchInput)) {
      if (
        bonusSearchIsEmpty ||
        this._parentObject.SearchSetBonuses(data.bonuses, bonusSearchInput, data.setId)
      ) {
        addItemToList = true
      }
    }

    if (addItemToList) {
      scrollData.push(ZO_ScrollList_CreateDataEntry(searchUI.scrollListDataTypeDefault, data))
    }
  }

  this.UpdateCounter(scrollData)

  if (this.updateListColumnWith !== undefined) {
    this.SetHeaderAndColumnDimensionConstraints(undefined, false, false)
  }
}

listClass.SortScrollList = function (this: LibSetsSearchUIList) {
  this.BuildSortKeys()
  this.currentSortKey = asPresent(this.sortHeaderGroup.GetCurrentSortKey())
  this.currentSortOrder = asPresent(this.sortHeaderGroup.GetSortDirection())
  if (this.currentSortKey !== undefined && this.currentSortOrder !== undefined) {
    const scrollData = asPresent(ZO_ScrollList_GetDataList(this.list))
    const sortFn = this.sortFunction
    if (scrollData.length > 0 && sortFn !== undefined) {
      table.sort(asTyped<ZoScrollListDataEntry<never>[]>(scrollData), sortFn)
      this.RefreshVisible()
    }
  }
}
