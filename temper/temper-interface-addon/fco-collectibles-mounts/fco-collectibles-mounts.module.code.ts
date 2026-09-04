import {
  getAllMountCollectibleIds,
  isAnyMountAFavoriteAtThisCategory,
  setExcludedMountIdsState,
} from "../fco-collectibles/fco-collectibles.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

function changeMountFavorites(
  this: void,
  doAdd: boolean,
  categoryId: number | undefined
): undefined {
  const excludedMountCollectionIds = STATE.settingsVars.settings.excludedMountCollectionIdsEntries

  const mountsCollectibleIds = getAllMountCollectibleIds(true, categoryId)
  if (mountsCollectibleIds === undefined || NonContiguousCount(mountsCollectibleIds) === 0) {
    return
  }

  for (const [collectibleId, collectibleData] of pairs(mountsCollectibleIds)) {
    if (collectibleId !== undefined && collectibleId !== 0) {
      if (
        categoryId === undefined ||
        (categoryId !== undefined && categoryId === collectibleData.categoryId)
      ) {
        if (collectibleData.isUnlocked && collectibleData.isFavoritable) {
          let setCollectibleNow = false
          const isFavorite = collectibleData.isFavorite
          if (
            doAdd === true &&
            !isFavorite &&
            excludedMountCollectionIds[collectibleId] === undefined
          ) {
            setCollectibleNow = true
          } else if (doAdd === false && isFavorite === true) {
            setCollectibleNow = true
          }
          if (setCollectibleNow === true) {
            SetOrClearCollectibleUserFlag(
              collectibleData.collectibleId,
              COLLECTIBLE_USER_FLAG_FAVORITE,
              doAdd
            )
          }
        }
      }
    }
  }
}

const colorRed = ZO_ColorDef.New(1, 0, 0, 1)
const FAVORITES_EXCLUDED_LIST_STATUS_ICON = "/esoui/art/buttons/cancel_down.dds"
const favoritesExcludedListStatusIconText = zo_iconTextFormatNoSpace(
  FAVORITES_EXCLUDED_LIST_STATUS_ICON,
  24,
  24,
  "excluded list",
  true
)

interface CollectibleTileKeyboard {
  statusMultiIcon?: StatusIconControl
  collectibleData: CollectibleData
  GetActorCategory: (this: CollectibleTileKeyboard) => number
}

function isCollectibleTileKeyboard(this: void, x: unknown): x is CollectibleTileKeyboard {
  return type(x) === "table"
}

function isLayoutPlatformData(this: void, x: unknown): x is { collectibleId: number } {
  return type(x) === "table"
}

function isStatusIconControl(this: void, x: Control | StatusIconControl): x is StatusIconControl {
  return "ClearIcons" in x
}

function updateCollectibleStatusTexture(
  this: void,
  control: Control | undefined,
  clearStatus: boolean,
  collectibleData: CollectibleData,
  selfVar: CollectibleTileKeyboard
): undefined {
  if (control === undefined) {
    return
  }
  const statusCtrl = control.GetNamedChild<StatusIconControl>("Status") ?? control
  if (!isStatusIconControl(statusCtrl)) {
    return
  }

  statusCtrl.ClearIcons()
  const actorCategory = selfVar.GetActorCategory()
  if (
    collectibleData.IsActive(actorCategory) &&
    !collectibleData.ShouldSuppressActiveState(actorCategory)
  ) {
    statusCtrl.AddIcon(ZO_CHECK_ICON)

    if (collectibleData.WouldBeHidden(actorCategory)) {
      statusCtrl.AddIcon("EsoUI/Art/Inventory/inventory_icon_hiddenBy.dds")
    }
  }
  if (collectibleData.IsNew()) {
    statusCtrl.AddIcon(ZO_KEYBOARD_NEW_ICON)
  }
  if (!clearStatus) {
    statusCtrl.AddIcon(FAVORITES_EXCLUDED_LIST_STATUS_ICON, colorRed)
  }
  statusCtrl.Show()
}

export function buildFavoriteMountsContextMenu(this: void): undefined {
  if (STATE.settingsVars.settings.favoriteMountsContextMenu !== true) {
    return
  }

  if (COLLECTIBLE_MOUNT_TILES_HOOKED) {
    return
  }

  ZO_PostHook(
    ZO_CollectibleTile_Keyboard,
    "LayoutPlatform",
    (selfVar: unknown, data: unknown): undefined => {
      if (STATE.settingsVars.settings.favoriteMountsContextMenu !== true) {
        return undefined
      }
      if (!isCollectibleTileKeyboard(selfVar) || !isLayoutPlatformData(data)) {
        return undefined
      }
      const tileSelf = selfVar
      const collectibleData = ZO_COLLECTIBLE_DATA_MANAGER.GetCollectibleDataById(data.collectibleId)
      if (collectibleData.IsUnlocked()) {
        const categoryId = collectibleData.GetCategoryId()
        const categoryData =
          categoryId !== undefined
            ? ZO_COLLECTIBLE_DATA_MANAGER.collectibleCategoryIdToDataMap[categoryId]
            : undefined
        if (categoryData !== undefined) {
          const selectableCategoryTypes = categoryData.GetCollectibleCategoryTypesInCategory()
          if (selectableCategoryTypes[COLLECTIBLE_CATEGORY_TYPE_MOUNT] === true) {
            const statusMultiIcon = tileSelf.statusMultiIcon
            if (statusMultiIcon === undefined) {
              return undefined
            }

            const excludedMountCollectionIds =
              STATE.settingsVars.settings.excludedMountCollectionIdsEntries
            const collectibleId = collectibleData.collectibleId
            const clearStatus = excludedMountCollectionIds[collectibleId] === undefined
            updateCollectibleStatusTexture(statusMultiIcon, clearStatus, collectibleData, tileSelf)
          }
        }
      }
      return undefined
    }
  )

  ZO_PostHook(ZO_CollectibleTile_Keyboard, "AddMenuOptions", (selfVar: unknown): undefined => {
    if (STATE.settingsVars.settings.favoriteMountsContextMenu !== true) {
      return undefined
    }
    if (!ZO_CollectibleDataManager.HasAnyUnlockedMounts()) {
      return undefined
    }
    if (!isCollectibleTileKeyboard(selfVar)) {
      return undefined
    }
    const tileSelf = selfVar
    const mocCtrl = GetMenuOwner() ?? moc()

    const excludedMountCollectionIds = STATE.settingsVars.settings.excludedMountCollectionIdsEntries

    const collectibleData = tileSelf.collectibleData
    const collectibleId = collectibleData.collectibleId
    const collectibleName = zo_strformat(SI_UNIT_NAME, collectibleData.GetName())
    const categoryName = zo_strformat(SI_UNIT_NAME, collectibleData.GetCategoryName())
    const categoryId = collectibleData.GetCategoryId()
    const isFavorite = collectibleData.IsFavorite()

    if (
      collectibleData.GetCategoryType() === COLLECTIBLE_CATEGORY_TYPE_MOUNT &&
      collectibleData.IsUnlocked()
    ) {
      AddCustomMenuItem(
        "[FCOChangeStuff] Mount favorites",
        (): undefined => {},
        MENU_ADD_OPTION_HEADER
      )
      AddCustomMenuItem(
        "|c00FF00Add|r category '" + categoryName + "' to favorites",
        (): undefined => {
          changeMountFavorites(true, categoryId)
        }
      )
      AddCustomMenuItem("|c00FF00Add all|r mounts to favorites", (): undefined => {
        changeMountFavorites(true, undefined)
      })
      if (ZO_CollectibleDataManager.HasAnyFavoriteMounts()) {
        AddCustomMenuItem("-", (): undefined => {})
        const anyFavoriteAtThisCategory =
          isFavorite === true || isAnyMountAFavoriteAtThisCategory(categoryId)
        if (anyFavoriteAtThisCategory) {
          AddCustomMenuItem(
            "[|cFF0000Remove|r category '" + categoryName + "' from favorites",
            (): undefined => {
              changeMountFavorites(false, categoryId)
            }
          )
        }
        AddCustomMenuItem("|cFF0000Remove all|r mounts from favorites", (): undefined => {
          changeMountFavorites(false, undefined)
        })
      }
      AddCustomMenuItem(
        "Mount favorites |cFF0000" + favoritesExcludedListStatusIconText + "|r",
        (): undefined => {},
        MENU_ADD_OPTION_HEADER
      )
      if (excludedMountCollectionIds[collectibleId] === undefined) {
        AddCustomMenuItem(">|c00FF00Add|r mount to list", (): undefined => {
          if (isFavorite === true) {
            SetOrClearCollectibleUserFlag(collectibleId, COLLECTIBLE_USER_FLAG_FAVORITE, false)
          }
          excludedMountCollectionIds[collectibleId] = collectibleName
          updateCollectibleStatusTexture(mocCtrl, false, collectibleData, tileSelf)
        })
      } else {
        AddCustomMenuItem("<|cFF0000Remove|r mount from list", (): undefined => {
          excludedMountCollectionIds[collectibleId] = undefined
          updateCollectibleStatusTexture(mocCtrl, true, collectibleData, tileSelf)
        })
      }
      if (NonContiguousCount(excludedMountCollectionIds) > 0) {
        AddCustomMenuItem("<|cFF0000Remove all|r mounts from list", (): undefined => {
          STATE.settingsVars.settings.excludedMountCollectionIdsEntries = {}
          updateCollectibleStatusTexture(mocCtrl, true, collectibleData, tileSelf)
          COLLECTIONS_BOOK.UpdateCollectionVisualLayer()
        })
      }
      ShowMenu()
    }
    return undefined
  })
  COLLECTIBLE_MOUNT_TILES_HOOKED = true
}

let COLLECTIBLE_MOUNT_TILES_HOOKED = false

export function favoriteMountChanges(this: void): undefined {
  setExcludedMountIdsState()
  buildFavoriteMountsContextMenu()
}
