import { asNumberOpt, asString } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asLangRecordOpt,
  asLibSlots,
  asSafeReturnApiTableFn,
  asSetIdItemIdMap,
  asStrRecordEntryOpt,
} from "../lib-sets-core-casts/lib-sets-core-casts.module.code.ts"
import {
  asSetIdLangStringMapEntryOpt,
  asSetIdToStrRecordEntryOpt,
} from "../lib-sets-core-casts-tables/lib-sets-core-casts-tables.module.code.ts"

const lib = LibSets

const libSlots = asLibSlots(lib)
const safeReturnAPItable = asSafeReturnApiTableFn(libSlots["_safeReturnAPItable"])

const zostc = ZO_ShallowTableCopy

const WAS_SET_ID_PROCESSED_FOR_SET_INFO_IN_TOTAL: { [setId: number]: boolean } = {}

type SetInfoTable = { [key: string]: unknown }

function getSetInfo(
  this: void,
  setId: number | undefined,
  noItemIds?: boolean,
  lang?: string
): SetInfoTable | undefined {
  if (setId === undefined) {
    return undefined
  }
  const checkIfSetsAreLoadedProperly = lib.checkIfSetsAreLoadedProperly
  if (!checkIfSetsAreLoadedProperly(setId)) {
    return undefined
  }
  const noItemIdsResolved = noItemIds ?? false
  const isNoESOSet = lib.IsNoESOSet
  const isNonEsoSetId = isNoESOSet(setId)
  let setInfoTable: SetInfoTable | undefined
  let itemIds: { [itemId: number]: number } | undefined
  let setNames: { [lang: string]: string } | undefined
  let langToUse: string | undefined
  let setNamesEmpty = true
  let gotSetItemIds = false
  let gotSetNames = false
  let gotSetDropMechanicNames = false

  let returnTab: SetInfoTable

  const tooltipSetDataWithoutItemIdsCached = asSetIdToStrRecordEntryOpt(
    lib.tooltipSetDataWithoutItemIdsCached
  )

  const onlyOneLanguage = lang !== undefined
  if (onlyOneLanguage === true) {
    if (noItemIdsResolved === true) {
      const cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang =
        tooltipSetDataWithoutItemIdsCached[setId]
      if (
        cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang !== undefined &&
        !ZO_IsTableEmpty(cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang)
      ) {
        return cachedTooltipsSetDataWithoutItemIdsAndOnlyOneLang
      }
    }
    langToUse = lib.LangAllowedCheck(lang)
  }

  const preloaded = lib.setDataPreloaded
  const noSetIdSets = lib.noSetIdSets
  const setInfo = lib.setInfo
  let preloadedSetItemIdsTableKey = LIBSETS_TABLEKEY_SETITEMIDS
  let preloadedSetNamesTableKey = LIBSETS_TABLEKEY_SETNAMES
  if (isNonEsoSetId === true) {
    setInfoTable = noSetIdSets[setId]
    preloadedSetItemIdsTableKey = LIBSETS_TABLEKEY_SETITEMIDS_NO_SETID
    preloadedSetNamesTableKey = LIBSETS_TABLEKEY_SETNAMES_NO_SETID
  } else {
    if (setInfo[setId] === undefined) {
      return undefined
    }
    setInfoTable = setInfo[setId]
  }
  if (setInfoTable === undefined) {
    return undefined
  }
  setInfoTable["setId"] = setId

  if (!WAS_SET_ID_PROCESSED_FOR_SET_INFO_IN_TOTAL[setId]) {
    if (!noItemIdsResolved) {
      if (setInfoTable[LIBSETS_TABLEKEY_SETITEMIDS] === undefined) {
        if (isNonEsoSetId === true) {
          const preloadedItemIds = asSetIdItemIdMap(preloaded[preloadedSetItemIdsTableKey])
          itemIds = preloadedItemIds[setId]
        } else {
          const decompressSetIdItemIds = lib.DecompressSetIdItemIds
          itemIds = decompressSetIdItemIds(setId)
        }
        if (!ZO_IsTableEmpty(itemIds)) {
          setInfoTable[LIBSETS_TABLEKEY_SETITEMIDS] = itemIds
          gotSetItemIds = true
        }
      }
    } else {
      gotSetItemIds = false
    }

    if (
      setInfoTable[LIBSETS_TABLEKEY_DROPMECHANIC_NAMES] === undefined ||
      setInfoTable[LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES] === undefined
    ) {
      let gotSetDropMechanicData = false
      let gotSetDropMechanicLocationData = false

      const getDropMechanicAndDropLocationNames = lib.GetDropMechanicAndDropLocationNames
      const [dropMechanicNamesRaw, dropMechanicDropLocationNamesRaw] =
        getDropMechanicAndDropLocationNames(setId, langToUse, setInfoTable)
      const dropMechanicNamesTable = asLangRecordOpt(dropMechanicNamesRaw)
      const dropMechanicDropLocationNamesTable = asLangRecordOpt(dropMechanicDropLocationNamesRaw)
      if (!ZO_IsTableEmpty(dropMechanicNamesTable)) {
        setInfoTable[LIBSETS_TABLEKEY_DROPMECHANIC_NAMES] = dropMechanicNamesTable
        gotSetDropMechanicData = true
      }
      if (!ZO_IsTableEmpty(dropMechanicDropLocationNamesTable)) {
        setInfoTable[LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES] =
          dropMechanicDropLocationNamesTable
        gotSetDropMechanicLocationData = true
      }
      if (gotSetDropMechanicData === true && gotSetDropMechanicLocationData === true) {
        gotSetDropMechanicNames = true
      }
    } else {
      gotSetDropMechanicNames = true
    }

    if (onlyOneLanguage === true) {
      const preloadedSetNames = asSetIdLangStringMapEntryOpt(preloaded[preloadedSetNamesTableKey])
      const setNamesOfSetId = preloadedSetNames[setId]
      const setNameInLang =
        setNamesOfSetId !== undefined ? setNamesOfSetId[asString(langToUse)] : undefined
      if (setNameInLang !== undefined) {
        setNames = {
          [asString(langToUse)]: setNameInLang,
        }
      }
    } else {
      const preloadedSetNames = asSetIdLangStringMapEntryOpt(preloaded[preloadedSetNamesTableKey])
      setNames = preloadedSetNames[setId]
    }

    setNamesEmpty = ZO_IsTableEmpty(setNames)
    if (!setNamesEmpty) {
      if (!onlyOneLanguage) {
        setInfoTable[LIBSETS_TABLEKEY_SETNAMES] = setNames
        gotSetNames = true
      }
    }

    if (gotSetItemIds === true && gotSetDropMechanicNames === true && gotSetNames === true) {
      WAS_SET_ID_PROCESSED_FOR_SET_INFO_IN_TOTAL[setId] = true
    }
  }

  if (setInfoTable["isCurrentDLC"] === undefined) {
    const dlcId = asNumberOpt(setInfoTable["dlcId"])
    const isCurrentDLC =
      asNumberOpt(DLC_ITERATION_END) !== undefined &&
      dlcId !== undefined &&
      dlcId >= DLC_ITERATION_END
    setInfoTable["isCurrentDLC"] = isCurrentDLC
  }

  returnTab = zostc(setInfoTable)

  if (noItemIdsResolved === true) {
    returnTab[LIBSETS_TABLEKEY_SETITEMIDS] = undefined
  }

  if (!setNamesEmpty && onlyOneLanguage === true) {
    returnTab[LIBSETS_TABLEKEY_SETNAMES] = setNames
    if (noItemIdsResolved === true) {
      tooltipSetDataWithoutItemIdsCached[setId] = returnTab
    }
  }

  return asStrRecordEntryOpt(safeReturnAPItable(returnTab))
}
lib.GetSetInfo = getSetInfo
