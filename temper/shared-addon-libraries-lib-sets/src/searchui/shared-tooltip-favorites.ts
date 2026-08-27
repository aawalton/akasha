import { asNumber, asNumberOpt, asPresent, asTyped } from "../casts"
import { asLibSetsSearchRowDataOpt } from "./casts"

const lib = LibSets

const CM = CALLBACK_MANAGER
const tos = tostring
const zoite = ZO_IsTableEmpty

const libPrefix = lib.prefix

const TT_Popup = PopupTooltip
const TT_Text = InformationTooltip

import { getSharedSearchUIClass } from "./shared-class"
import { MAJOR } from "./shared-state"

const sharedClass = getSharedSearchUIClass()

const possibleSetSearchFavoriteCategoriesUnsorted = lib.possibleSetSearchFavoriteCategoriesUnsorted

function asControl(this: void, control: SearchUIControl): Control {
  return asTyped<Control>(control)
}
function asTooltip(this: void, control: SearchUIControl): TooltipControl {
  return asTyped<TooltipControl>(control)
}

function getTooltipsPositionBasedOnSpaceLeft(
  this: void,
  control: SearchUIControl | undefined,
  TT_control: SearchUIControl | undefined
): LuaMultiReturn<[number, number, number, number, boolean] | [undefined]> {
  if (control === undefined || TT_control === undefined) {
    return $multi(undefined)
  }
  let anchor1: number
  let anchor2: number
  let offsetX: number
  const offsetY = 0

  const currentLeft = control.GetLeft()
  if (currentLeft < (TT_control.GetWidth() ?? 0)) {
    anchor1 = LEFT
    anchor2 = RIGHT
    offsetX = 25
  } else {
    anchor1 = RIGHT
    anchor2 = LEFT
    offsetX = -25
  }
  const shownLeftOfControl = anchor2 === LEFT
  return $multi(anchor1, offsetX, offsetY, anchor2, shownLeftOfControl)
}

function anchorAllTooltipsAutomatically(
  this: void,
  selfVar: LibSetsSearchUISharedObject,
  _rowControl: SearchUIControl,
  tooltipCtrl: SearchUIControl,
  anchorCtrlIn: SearchUIControl,
  itemLinkTooltipShownLeftOfControlIn: boolean | undefined
): LuaMultiReturn<
  [
    SearchUIControl,
    number,
    number | undefined,
    number | undefined,
    number | undefined,
    number | undefined,
    boolean | undefined,
  ]
> {
  let anchorCtrl = anchorCtrlIn
  let itemLinkTooltipShownLeftOfControl = itemLinkTooltipShownLeftOfControlIn
  const [anchor1, offsetX, offsetY, anchor2, showLeft] = getTooltipsPositionBasedOnSpaceLeft(
    selfVar.control,
    tooltipCtrl
  )
  let anchorTo = showLeft === true ? LEFT : RIGHT

  const itemLinkTooltipCtrl = selfVar.tooltipControl
  if (tooltipCtrl === itemLinkTooltipCtrl && itemLinkTooltipShownLeftOfControl === undefined) {
    itemLinkTooltipShownLeftOfControl = showLeft
  }

  if (itemLinkTooltipShownLeftOfControl !== undefined) {
    if (itemLinkTooltipShownLeftOfControl === true) {
      if (tooltipCtrl !== itemLinkTooltipCtrl) {
        const [, , , , showLeftOfItemlinkTooltip] = getTooltipsPositionBasedOnSpaceLeft(
          itemLinkTooltipCtrl,
          tooltipCtrl
        )
        anchorTo = showLeftOfItemlinkTooltip === true ? LEFT : RIGHT
        if (anchorTo === LEFT) {
          anchorCtrl = itemLinkTooltipCtrl
        }
      }
    } else {
      if (showLeft !== true) {
        anchorTo = RIGHT
        if (tooltipCtrl !== itemLinkTooltipCtrl) {
          anchorCtrl = itemLinkTooltipCtrl
        }
      }
    }
  }
  return $multi(anchorCtrl, anchorTo, anchor1, offsetX, offsetY, anchor2, showLeft)
}

sharedClass.ShowItemLinkTooltip = function (
  this: LibSetsSearchUISharedObject,
  rowControl: SearchUIControl,
  dataIn: LibSetsSearchRowData | undefined
): boolean | undefined {
  this.HideItemLinkTooltip()

  const TT_control = this.tooltipControl
  const data = dataIn ?? asLibSetsSearchRowDataOpt(TT_control.data)
  if (data === undefined || data.itemLink === undefined) {
    return undefined
  }
  const [anchorCtrl, , anchor1, offsetX, offsetY, anchor2, shownLeftOfControl] =
    anchorAllTooltipsAutomatically(this, rowControl, TT_control, this.control, undefined)

  InitializeTooltip(
    asTooltip(TT_control),
    asControl(anchorCtrl),
    asPresent(anchor1),
    offsetX,
    offsetY,
    anchor2
  )
  TT_control.SetLink(data.itemLink)

  this.tooltipControlTLC.BringWindowToTop()

  return shownLeftOfControl
}

sharedClass.HideItemLinkTooltip = function (this: LibSetsSearchUISharedObject) {
  ClearTooltip(asTooltip(this.tooltipControl))
}

sharedClass.ShowItemLinkPopupTooltip = function (
  this: LibSetsSearchUISharedObject,
  parent: SearchUIControl,
  data: LibSetsSearchRowData | undefined
) {
  this.HideItemLinkPopupTooltip()
  if (data === undefined || data.itemLink === undefined) {
    return
  }

  const TT_control = TT_Popup
  let anchor1: number | undefined
  let anchor2: number | undefined
  let offsetX: number | undefined
  let offsetY: number | undefined

  const settings = lib.svData
  const setSearchPopupTooltipPosition =
    settings === undefined ? undefined : asNumberOpt(settings.setSearchPopupTooltipPosition)
  const auto = setSearchPopupTooltipPosition === -1

  if (!auto) {
    if (setSearchPopupTooltipPosition === LEFT) {
      anchor1 = RIGHT
      anchor2 = LEFT
      offsetX = -10
      offsetY = 0
    } else if (setSearchPopupTooltipPosition === RIGHT) {
      anchor1 = LEFT
      anchor2 = RIGHT
      offsetX = 10
      offsetY = 0
    } else {
      return
    }
  } else {
    ;[anchor1, offsetX, offsetY, anchor2] = getTooltipsPositionBasedOnSpaceLeft(
      this.control,
      asTyped<SearchUIControl>(TT_control)
    )
  }
  InitializeTooltip(TT_control, asControl(parent), asPresent(anchor1), offsetX, offsetY, anchor2)
  TT_control.SetLink(data.itemLink)
}

sharedClass.HideItemLinkPopupTooltip = function (this: LibSetsSearchUISharedObject) {
  ClearTooltip(TT_Popup)
}

sharedClass.ShowSetDropLocationTooltip = function (
  this: LibSetsSearchUISharedObject,
  rowControl: SearchUIControl,
  data: LibSetsSearchRowData | undefined,
  itemLinkTooltipShownLeftOfControl?: boolean
) {
  ZO_Tooltips_HideTextTooltip()
  const settings = lib.svData
  if (
    settings === undefined ||
    settings.showSetSearchDropLocationTooltip !== true ||
    data === undefined
  ) {
    return
  }
  const setDataText = data.setDataText
  if (setDataText === undefined || setDataText === "") {
    return
  }

  const setSearchDropLocationTooltipPos = asNumber(settings.setSearchDropLocationTooltipPos)
  const owningCtrl = rowControl.GetOwningWindow()
  let anchorCtrl = owningCtrl
  let anchorTo = RIGHT
  ;[anchorCtrl, anchorTo] = anchorAllTooltipsAutomatically(
    this,
    rowControl,
    asTyped<SearchUIControl>(TT_Text),
    anchorCtrl,
    itemLinkTooltipShownLeftOfControl
  )
  if (setSearchDropLocationTooltipPos !== -1) {
    anchorTo = setSearchDropLocationTooltipPos
    anchorCtrl = owningCtrl
  }

  const dropLocationText = `|cF0F0F0${data.name}|r\n\n${setDataText}`
  ZO_Tooltips_ShowTextTooltip(asControl(anchorCtrl), anchorTo, dropLocationText)
}

sharedClass.ItemLinkToChat = function (
  this: LibSetsSearchUISharedObject,
  data: LibSetsSearchRowData | undefined
) {
  if (data !== undefined && data.itemLink !== undefined) {
    d(`${libPrefix}SetId '${tos(data.setId)}': ${data.itemLink}`)
    lib.SafeStartChatInput(data.itemLink)
  }
}

type FavoritesSV = { [category: string]: { [setId: number]: boolean | undefined } | undefined }

type FavoritesSVOpt = FavoritesSV | undefined
function asFavoritesSVOpt(value: unknown): FavoritesSVOpt {
  return value as FavoritesSVOpt
}

function getFavoritesSV(this: void): FavoritesSV | undefined {
  const settings = lib.svData
  if (settings === undefined) {
    return undefined
  }
  return asFavoritesSVOpt(settings.setSearchFavorites)
}

sharedClass.GetAllFavoritesCategories = function (
  this: LibSetsSearchUISharedObject,
  setId: number | undefined
): string[] | undefined {
  let setSearchFavoriteCategoriesOfSetId: string[] | undefined
  const setSearchFavorites = getFavoritesSV()
  if (setSearchFavorites === undefined || setId === undefined) {
    return undefined
  }
  for (const [favoriteCategory, data] of pairs(setSearchFavorites)) {
    if (data !== undefined && data[setId] === true) {
      setSearchFavoriteCategoriesOfSetId = setSearchFavoriteCategoriesOfSetId ?? []
      setSearchFavoriteCategoriesOfSetId[setSearchFavoriteCategoriesOfSetId.length] =
        tos(favoriteCategory)
    }
  }
  return setSearchFavoriteCategoriesOfSetId
}

sharedClass.GetNextFavoritesCategory = function (
  this: LibSetsSearchUISharedObject,
  setId: number | undefined
): string | undefined {
  const setSearchFavorites = getFavoritesSV()
  if (setSearchFavorites === undefined || setId === undefined) {
    return undefined
  }
  for (const [favoriteCategory, data] of pairs(setSearchFavorites)) {
    if (data !== undefined && data[setId] === true) {
      return tos(favoriteCategory)
    }
  }
  return undefined
}

sharedClass.IsSetIdInFavorites = function (
  this: LibSetsSearchUISharedObject,
  setId: number | undefined,
  favoriteCategory: string | undefined
): boolean {
  if (favoriteCategory === undefined || setId === undefined) {
    return false
  }
  const setSearchFavorites = getFavoritesSV()
  if (setSearchFavorites === undefined) {
    return false
  }
  const category = setSearchFavorites[favoriteCategory]
  return category !== undefined && category[setId] === true
}

sharedClass.AddSetIdToFavorites = function (
  this: LibSetsSearchUISharedObject,
  rowControl: SearchUIControl,
  setId: number,
  favoriteCategory: string | undefined
) {
  if (this.IsSetIdInFavorites(setId, favoriteCategory)) {
    return
  }
  if (favoriteCategory === undefined) {
    return
  }
  if (possibleSetSearchFavoriteCategoriesUnsorted[favoriteCategory] === undefined) {
    return
  }
  const setSearchFavorites = getFavoritesSV()
  if (setSearchFavorites === undefined) {
    return
  }

  setSearchFavorites[favoriteCategory] = setSearchFavorites[favoriteCategory] ?? {}
  asPresent(setSearchFavorites[favoriteCategory])[setId] = true

  this.resultsList.AddFavorite(rowControl, favoriteCategory)
  CM.FireCallbacks(
    `${MAJOR}_SetSearchFavoriteCategoryAdded`,
    favoriteCategory,
    setId,
    possibleSetSearchFavoriteCategoriesUnsorted[favoriteCategory]
  )

  this.resultsList.RefreshData()
}

sharedClass.RemoveSetIdFromFavorites = function (
  this: LibSetsSearchUISharedObject,
  rowControl: SearchUIControl,
  setId: number,
  favoriteCategory: string
) {
  if (!this.IsSetIdInFavorites(setId, favoriteCategory)) {
    return
  }
  if (possibleSetSearchFavoriteCategoriesUnsorted[favoriteCategory] === undefined) {
    return
  }
  const setSearchFavorites = getFavoritesSV()
  if (setSearchFavorites === undefined) {
    return
  }

  let wasRemoved = false
  const category = setSearchFavorites[favoriteCategory]
  if (category !== undefined) {
    if (category[setId] !== undefined) {
      category[setId] = undefined
      wasRemoved = true
    }
  }
  if (wasRemoved) {
    this.resultsList.RemoveFavorite(rowControl, favoriteCategory)
    CM.FireCallbacks(
      `${MAJOR}_SetSearchFavoriteCategoryRemoved`,
      favoriteCategory,
      setId,
      possibleSetSearchFavoriteCategoriesUnsorted[favoriteCategory]
    )

    this.resultsList.RefreshData()
  }
}

sharedClass.RemoveSetIdFromAllFavorites = function (
  this: LibSetsSearchUISharedObject,
  rowControl: SearchUIControl,
  setId: number
) {
  const setSearchFavorites = getFavoritesSV()
  if (setSearchFavorites === undefined) {
    return
  }
  let wasRemoved = false
  for (const [favoriteCategoryKey, setIds] of pairs(setSearchFavorites)) {
    const favoriteCategory = tos(favoriteCategoryKey)
    if (setIds !== undefined) {
      for (const [setIdToCompare] of pairs(setIds)) {
        if (setIdToCompare === setId) {
          asPresent(setSearchFavorites[favoriteCategory])[setId] = undefined
          wasRemoved = true
          this.resultsList.RemoveFavorite(rowControl, favoriteCategory)
          CM.FireCallbacks(
            `${MAJOR}_SetSearchFavoriteCategoryRemoved`,
            favoriteCategory,
            setId,
            possibleSetSearchFavoriteCategoriesUnsorted[favoriteCategory]
          )
        }
      }
    }
  }
  if (wasRemoved) {
    this.resultsList.RefreshData()
  }
}

sharedClass.RemoveAllSetFavorites = function (
  this: LibSetsSearchUISharedObject,
  favoriteCategory: string
) {
  if (possibleSetSearchFavoriteCategoriesUnsorted[favoriteCategory] === undefined) {
    return
  }
  const setSearchFavorites = getFavoritesSV()
  if (setSearchFavorites === undefined) {
    return
  }
  const setFavorites = setSearchFavorites[favoriteCategory]
  if (zoite(setFavorites ?? {})) {
    return
  }

  setSearchFavorites[favoriteCategory] = {}
  CM.FireCallbacks(
    `${MAJOR}_SetSearchFavoriteCategoryRemoveAll`,
    favoriteCategory,
    possibleSetSearchFavoriteCategoriesUnsorted[favoriteCategory]
  )

  this.resultsList.RefreshData()
}
