import {
  asNumberArray,
  asNumberArrayOpt,
  asPresent,
} from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asIdNumRecordOpt,
  asLibSetsCopyDialogData,
  asLibSetsSearchRowDataOpt,
  asParamStringMap,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"

const lib = LibSets

const tos = tostring
const zoite = ZO_IsTableEmpty
const zocstrfor = ZO_CachedStrFormat

const clientLang = lib.clientLang
const getLocalizedText = lib.GetLocalizedText
const libSets_GetDropZonesBySetId = lib.GetDropZonesBySetId
const libSets_GetZoneName = lib.GetZoneName
const libSets_OpenMapOfZoneId = lib.openMapOfZoneId
const libSets_GetWayshrineIds = lib.GetWayshrineIds
const libSets_ShowWayshrineNodeIdOnMap = lib.showWayshrineNodeIdOnMap
const libSets_OpenSetItemCollectionBookForItemLink = lib.OpenSetItemCollectionBookForItemLink
const checkLSM = lib.CheckLSM

import { getSharedSearchUIClass } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"
import {
  addOtherAddonsContextMenuEntries,
  checkAndGetWayshrineName,
} from "../lib-sets-search-ui-shared-helpers/lib-sets-search-ui-shared-helpers.module.code.ts"
import {
  dropZoneAndWayshrinesStr,
  dropZonesStr,
  favoriteIconWithNameTexts,
  searchUI,
  wayshrinesStr,
} from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const sharedClass = getSharedSearchUIClass()

const possibleSetSearchFavoriteCategories = lib.possibleSetSearchFavoriteCategories

const favoriteIconTexts = searchUI.favoriteIconTexts

sharedClass.ShowRowContextMenu = function (
  this: LibSetsSearchUISharedObject,
  rowControl: SearchUIControl
) {
  if (!checkLSM()) {
    return
  }

  const data = asLibSetsSearchRowDataOpt(rowControl.data)
  if (data === undefined) {
    return
  }
  const setId = data.setId
  const owningWindow = rowControl.GetOwningWindow()

  const setName = zocstrfor("<<1>>", data.name)
  const setTypeName = data.setTypeName
  const setTypeTexture = data.setTypeTexture
  const searchEntryText = getLocalizedText("setCollectionsSearchItemLink", clientLang, setName)
  const searchEntryTextWithTexture =
    setTypeTexture !== undefined && setTypeTexture !== ""
      ? setTypeTexture + searchEntryText
      : searchEntryText
  const setNameWithSetId = `${setName} [${tos(setId)}]`

  ClearCustomScrollableMenu()

  AddCustomScrollableMenuHeader(setNameWithSetId)
  AddCustomScrollableMenuEntry(
    setTypeTexture !== undefined && setTypeTexture !== "" && setTypeName !== undefined
      ? setTypeTexture + setTypeName
      : (setTypeName ?? ""),
    () => {},
    LSM_ENTRY_TYPE_NORMAL,
    undefined,
    { enabled: false }
  )

  AddCustomScrollableMenuEntry(getLocalizedText("linkToChat"), () => {
    this.ItemLinkToChat(data)
  })

  AddCustomScrollableMenuHeader(getLocalizedText("tooltips"))

  const popupTooltipSubmenu: LSMSubmenuEntry[] = [
    {
      label: getLocalizedText("auto"),
      callback: () => {
        const settings = lib.svData
        if (settings !== undefined) {
          settings.setSearchPopupTooltipPosition = -1
        }
        this.ShowItemLinkPopupTooltip(owningWindow, data)
      },
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      buttonGroup: 2,
      checked: () => lib.svData?.setSearchPopupTooltipPosition === -1,
    },
    {
      label: "-",
      callback: () => {},
    },
    {
      label: getLocalizedText("left"),
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      buttonGroup: 2,
      checked: () => lib.svData?.setSearchPopupTooltipPosition === LEFT,
      callback: () => {
        const settings = lib.svData
        if (settings !== undefined) {
          settings.setSearchPopupTooltipPosition = LEFT
        }
        this.ShowItemLinkPopupTooltip(owningWindow, data)
      },
    },
    {
      label: getLocalizedText("right"),
      entryType: LSM_ENTRY_TYPE_RADIOBUTTON,
      buttonGroup: 2,
      checked: () => lib.svData?.setSearchPopupTooltipPosition === RIGHT,
      callback: () => {
        const settings = lib.svData
        if (settings !== undefined) {
          settings.setSearchPopupTooltipPosition = RIGHT
        }
        this.ShowItemLinkPopupTooltip(owningWindow, data)
      },
    },
  ]
  AddCustomScrollableMenuEntry(getLocalizedText("popupTooltip"), () => {
    this.ShowItemLinkPopupTooltip(owningWindow, data)
  })
  AddCustomScrollableSubMenuEntry(getLocalizedText("popupTooltipPosition"), popupTooltipSubmenu)

  if (setId !== undefined) {
    let wasFavoriteHeaderAdded = false
    let removeAllFavoritesAdded = false
    const favoriteCategoriesToAddSubmenuEntries: LSMSubmenuEntry[] = []
    for (const [, favoriteCategoryData] of ipairs(possibleSetSearchFavoriteCategories)) {
      const favoriteCategory = favoriteCategoryData.category
      if (!wasFavoriteHeaderAdded) {
        AddCustomScrollableMenuHeader(asPresent(favoriteIconWithNameTexts[favoriteCategory]))
        wasFavoriteHeaderAdded = true
      }
      if (this.IsSetIdInFavorites(setId, favoriteCategory)) {
        if (!removeAllFavoritesAdded) {
          removeAllFavoritesAdded = true
          AddCustomScrollableMenuEntry(
            `${GetString(SI_COLLECTIBLE_ACTION_REMOVE_FAVORITE)} - ${GetString(SI_HOUSINGFURNITUREBOUNDFILTER0)}`,
            () => {
              this.RemoveSetIdFromAllFavorites(rowControl, setId)
            }
          )
        }
        AddCustomScrollableMenuEntry(
          `${asPresent(favoriteIconTexts[favoriteCategory])} ${GetString(SI_COLLECTIBLE_ACTION_REMOVE_FAVORITE)} '${zo_strformat("<<C:1>>", favoriteCategory)}'`,
          () => {
            this.RemoveSetIdFromFavorites(rowControl, setId, favoriteCategory)
          }
        )
      } else {
        const subMenuEntry: LSMSubmenuEntry = {
          label:
            asPresent(favoriteIconTexts[favoriteCategory]) +
            zo_strformat("<<C:1>>", favoriteCategory),
          callback: () => {
            this.AddSetIdToFavorites(rowControl, setId, favoriteCategory)
          },
        }
        favoriteCategoriesToAddSubmenuEntries.push(subMenuEntry)
      }
    }
    if (!zoite(favoriteCategoriesToAddSubmenuEntries)) {
      AddCustomScrollableSubMenuEntry(
        GetString(SI_COLLECTIBLE_ACTION_ADD_FAVORITE),
        favoriteCategoriesToAddSubmenuEntries
      )
    }

    const setDropZones = asIdNumRecordOpt(libSets_GetDropZonesBySetId(setId))
    const zoneIdSubmenuEntries: LSMSubmenuEntry[] = []
    if (!zoite(setDropZones ?? {})) {
      const alreadyAddedZoneIds: { [zoneId: number]: boolean } = {}
      const zoneIds = asNumberArray(data.zoneIds ?? [])
      for (const [, zoneId] of ipairs(zoneIds)) {
        if (zoneId !== -1 && alreadyAddedZoneIds[zoneId] !== true) {
          const zoneName = libSets_GetZoneName(zoneId)
          const subMenuEntry: LSMSubmenuEntry = {
            label: zoneName,
            callback: () => {
              libSets_OpenMapOfZoneId(zoneId)
            },
          }
          zoneIdSubmenuEntries.push(subMenuEntry)
          alreadyAddedZoneIds[zoneId] = true
        }
      }
    }

    const wayshrinesSubmenuEntries: LSMSubmenuEntry[] = []
    const [setWayshrines] = libSets_GetWayshrineIds(setId)
    const setWayshrinesTab = asNumberArrayOpt(setWayshrines)
    if (!zoite(setWayshrinesTab ?? {})) {
      checkAndGetWayshrineName(setWayshrinesTab)

      const alreadyAddedWayshrines: { [wsIndex: number]: boolean } = {}
      for (const [, wayshrineNodeIndex] of ipairs(asPresent(setWayshrinesTab))) {
        if (wayshrineNodeIndex > 0 && alreadyAddedWayshrines[wayshrineNodeIndex] !== true) {
          const [wsKnown, wsName] = GetFastTravelNodeInfo(wayshrineNodeIndex)
          let wayshrineName = ZO_CachedStrFormat("<<C:1>>", wsName)
          if (wsKnown !== true) {
            wayshrineName = `${wayshrineName} <|cFF0000${GetString(SI_INPUT_LANGUAGE_UNKNOWN)}|r>`
          }
          const subMenuEntry: LSMSubmenuEntry = {
            label: wayshrineName,
            callback: () => {
              libSets_ShowWayshrineNodeIdOnMap(wayshrineNodeIndex)
            },
          }
          wayshrinesSubmenuEntries.push(subMenuEntry)
          alreadyAddedWayshrines[wayshrineNodeIndex] = true
        }
      }
    }

    const gotDropZones = !zoite(zoneIdSubmenuEntries)
    const gotWayshrines = !zoite(wayshrinesSubmenuEntries)
    if (gotDropZones || gotWayshrines) {
      AddCustomScrollableMenuHeader(dropZoneAndWayshrinesStr)
      if (gotDropZones) {
        AddCustomScrollableSubMenuEntry(dropZonesStr, zoneIdSubmenuEntries)
      }
      if (gotWayshrines) {
        AddCustomScrollableSubMenuEntry(wayshrinesStr, wayshrinesSubmenuEntries)
      }
    }

    if (data.setDataText !== undefined) {
      const getSetTextForCopyDialog = (withTextures: boolean): undefined => {
        const copyDialog = lib.CopyDialog
        let setNameForDialog = data.name
        if (data.setTypeTexture !== undefined) {
          setNameForDialog = `${data.setTypeTexture} ${setNameForDialog}`
        }
        const textParams = asParamStringMap({ 1: setNameForDialog })
        copyDialog.Show(
          asLibSetsCopyDialogData({
            text: withTextures ? data.setDataText : data.setDataTextClean,
            setData: data,
          }),
          asParamStringMap({ titleParams: textParams })
        )
      }

      AddCustomScrollableMenuHeader(getLocalizedText("setInfos"))
      AddCustomScrollableMenuEntry(getLocalizedText("showAsText"), () => {
        getSetTextForCopyDialog(false)
      })
      AddCustomScrollableMenuEntry(getLocalizedText("showAsTextWithIcons"), () => {
        getSetTextForCopyDialog(true)
      })
    }

    if (data.itemLink !== undefined) {
      const setType = data.setType
      const isCraftedSet = setType === LIBSETS_SETTYPE_CRAFTED

      if (!isCraftedSet) {
        AddCustomScrollableMenuHeader(getLocalizedText("headerItemLinks"))

        AddCustomScrollableMenuEntry(searchEntryTextWithTexture, () => {
          if (data.itemLink !== undefined) {
            libSets_OpenSetItemCollectionBookForItemLink(data.itemLink)
          }
        })
      }
    }

    addOtherAddonsContextMenuEntries(rowControl, setId)
  }
  ShowCustomScrollableMenu(rowControl, { visibleRowsDropdown: 18 })
}
