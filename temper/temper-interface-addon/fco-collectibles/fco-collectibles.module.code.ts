import { STATE } from "../fco-state/fco-state.module.code.ts"

const LOCKED_MOUNT_NAME_COLOR_PREFIX = "|cFF0000"
const LOCKED_MOUNT_NAME_COLOR_SUFFIX = "|r"

export interface MountCollectibleEntry {
  categoryId: number
  collectibleId: number
  name: string
  isUnlocked: boolean
  isFavoritable: boolean
  isFavorite: boolean
}

function collectMountCategoryIds(this: void, categoryId: number | undefined): number[] {
  const mountCategories: number[] = []
  if (categoryId !== undefined) {
    const categoryData = ZO_COLLECTIBLE_DATA_MANAGER.collectibleCategoryIdToDataMap[categoryId]
    if (categoryData !== undefined) {
      const selectableCategoryTypes = categoryData.GetCollectibleCategoryTypesInCategory()
      if (selectableCategoryTypes[COLLECTIBLE_CATEGORY_TYPE_MOUNT] === true) {
        mountCategories[mountCategories.length] = categoryId
      }
    }
  } else {
    for (const [catId, categoryData] of pairs(
      ZO_COLLECTIBLE_DATA_MANAGER.collectibleCategoryIdToDataMap
    )) {
      if (categoryData !== undefined) {
        const selectableCategoryTypes = categoryData.GetCollectibleCategoryTypesInCategory()
        if (selectableCategoryTypes[COLLECTIBLE_CATEGORY_TYPE_MOUNT] === true) {
          mountCategories[mountCategories.length] = catId
        }
      }
    }
  }
  return mountCategories
}

export function getAllMountCollectibleIds(
  this: void,
  onlyUnlocked: boolean,
  categoryId: number | undefined
): Record<number, MountCollectibleEntry> | undefined {
  const mountCollectibleIds: Record<number, MountCollectibleEntry> = {}

  const mountCategories = collectMountCategoryIds(categoryId)
  if (mountCategories.length === 0) {
    return undefined
  }

  for (const mountCategoryId of mountCategories) {
    const collectiblesData = ZO_COLLECTIBLE_DATA_MANAGER.GetCategoryDataById(mountCategoryId)
    if (collectiblesData !== undefined && collectiblesData.orderedCollectibles !== undefined) {
      for (const collectibleData of collectiblesData.orderedCollectibles) {
        const collectibleId = collectibleData.collectibleId
        if (collectibleId !== undefined && collectibleId !== 0) {
          if (collectibleData.GetCategoryType() === COLLECTIBLE_CATEGORY_TYPE_MOUNT) {
            const isFavoritable = collectibleData.IsFavoritable()
            const isUnlocked = collectibleData.IsUnlocked()
            if (!onlyUnlocked || (onlyUnlocked === true && isUnlocked === true)) {
              mountCollectibleIds[collectibleId] = {
                categoryId: mountCategoryId,
                collectibleId,
                name: zo_strformat(SI_UNIT_NAME, collectibleData.GetName()),
                isUnlocked,
                isFavoritable,
                isFavorite: collectibleData.IsFavorite(),
              }
            }
          }
        }
      }
    }
  }

  return mountCollectibleIds
}

export function isAnyMountAFavoriteAtThisCategory(this: void, categoryId: number): boolean {
  const categoryData = ZO_COLLECTIBLE_DATA_MANAGER.collectibleCategoryIdToDataMap[categoryId]
  if (categoryData !== undefined) {
    const selectableCategoryTypes = categoryData.GetCollectibleCategoryTypesInCategory()
    if (selectableCategoryTypes[COLLECTIBLE_CATEGORY_TYPE_MOUNT] === true) {
      const orderedCollectibles = categoryData.orderedCollectibles
      if (orderedCollectibles !== undefined && !ZO_IsTableEmpty(orderedCollectibles)) {
        for (const [, collectibleData] of ipairs(orderedCollectibles)) {
          if (collectibleData.collectibleId !== undefined) {
            if (collectibleData.IsUnlocked() === true && collectibleData.IsFavorite()) {
              return true
            }
          }
        }
      }
    }
  }
  return false
}

export let excludedMountIdsShifterBoxControl: ShifterBox | undefined = undefined

const EXCLUDED_MOUNT_IDS_LIB_SHIFTER_BOX_SETTINGS: LibShifterBoxCustomSettings = {
  leftList: {
    title: "Available mounts",
  },
  rightList: {
    title: "Excluded mounts",
    buttonTemplates: {
      moveButton: {
        normalTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_up.dds",
        mouseOverTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_over.dds",
        pressedTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_down.dds",
        disabledTexture: "/esoui/art/inventory/inventory_tabicon_craftbag_disabled.dds",
        anchors: {
          1: [BOTTOMRIGHT, "$(parent)List", BOTTOMLEFT, -2, 0],
        },
        dimensions: { x: 20, y: 20 },
      },
      moveAllButton: {
        normalTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        mouseOverTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        pressedTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        disabledTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        anchors: {
          1: [BOTTOM, "$(parent)Button", TOP, 0, -2],
        },
        dimensions: { x: 20, y: 20 },
      },
      searchButton: {
        normalTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        mouseOverTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        pressedTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        disabledTexture: "/esoui/art/inventory/inventory_trait_not_researched_icon.dds",
        anchors: {
          1: [RIGHT, "$(parent)", RIGHT, -60, 0],
        },
        dimensions: { x: 60, y: 60 },
      },
    },
  },
  search: {
    enabled: true,
  },
}

const EXCLUDED_MOUNT_IDS_LIB_SHIFTER_BOX_STYLE_WIDTH = 600
const EXCLUDED_MOUNT_IDS_LIB_SHIFTER_BOX_STYLE_HEIGHT = 200

export function setExcludedMountIdsState(
  this: void
): [Record<number, string>, Record<number, string | undefined>] | [undefined] {
  const leftListMountIdsWithoutExcludedOnes: Record<number, string> = {}
  const settings = STATE.settingsVars.settings
  const excludedMountIdsFromSV = settings.excludedMountCollectionIdsEntries
  const mountsCollectibleIds = getAllMountCollectibleIds(false, undefined)

  if (mountsCollectibleIds === undefined || NonContiguousCount(mountsCollectibleIds) === 0) {
    return [undefined]
  }

  for (const [k, v] of pairs(mountsCollectibleIds)) {
    if (excludedMountIdsFromSV[k] === undefined) {
      let mountName = v.name
      if (!v.isUnlocked) {
        mountName = LOCKED_MOUNT_NAME_COLOR_PREFIX + mountName + LOCKED_MOUNT_NAME_COLOR_SUFFIX
      }
      leftListMountIdsWithoutExcludedOnes[k] = mountName
    } else {
      const mountName = zo_strformat(SI_UNIT_NAME, GetCollectibleName(k))
      if (!v.isUnlocked) {
        excludedMountIdsFromSV[k] =
          LOCKED_MOUNT_NAME_COLOR_PREFIX + mountName + LOCKED_MOUNT_NAME_COLOR_SUFFIX
      } else {
        excludedMountIdsFromSV[k] = mountName
      }
    }
  }
  return [leftListMountIdsWithoutExcludedOnes, excludedMountIdsFromSV]
}

export function updateExcludedMountIdsLibShifterBoxEntries(
  this: void,
  shifterBox: ShifterBox | undefined
): undefined {
  if (shifterBox === undefined) {
    return
  }
  const [leftListMountIdsWithoutExcludedOnes, excludedMountIdsFromSV] = setExcludedMountIdsState()

  shifterBox.ClearLeftList()
  if (leftListMountIdsWithoutExcludedOnes !== undefined) {
    shifterBox.AddEntriesToLeftList(leftListMountIdsWithoutExcludedOnes)
  }

  shifterBox.ClearRightList()
  if (excludedMountIdsFromSV !== undefined) {
    shifterBox.AddEntriesToRightList(excludedMountIdsFromSV)
  }
}

function myShifterBoxEventEntryMovedCallbackFunction(
  this: void,
  shifterBox: unknown,
  key: unknown,
  value: unknown,
  _categoryId: unknown,
  isDestListLeftList: unknown
): undefined {
  if (shifterBox === undefined || key === undefined) {
    return
  }
  const settings = STATE.settingsVars.settings
  if (settings.favoriteMountsContextMenu !== true) {
    return
  }
  const excludedMountCollectionIds = settings.excludedMountCollectionIdsEntries
  const collectibleId = tonumber(key)
  if (collectibleId === undefined) {
    return
  }
  if (isDestListLeftList === true) {
    excludedMountCollectionIds[collectibleId] = undefined
  } else {
    excludedMountCollectionIds[collectibleId] = tostring(value)
  }
}

function myShifterBoxEventEntryHighlightedCallbackFunction(
  this: void,
  _control: unknown,
  shifterBox: unknown,
  key: unknown
): undefined {
  if (shifterBox === undefined || key === undefined) {
    return
  }
  if (STATE.settingsVars.settings.favoriteMountsContextMenu !== true) {
    return
  }
}

function updateExcludedMountIdsShifterBox(this: void, parentCtrl: Control | undefined): undefined {
  const shifterBox = excludedMountIdsShifterBoxControl
  if (shifterBox === undefined || parentCtrl === undefined) {
    return
  }
  parentCtrl.SetResizeToFitDescendents(true)

  shifterBox.SetAnchor(TOPLEFT, parentCtrl, TOPLEFT, 0, 0)
  shifterBox.SetDimensions(
    EXCLUDED_MOUNT_IDS_LIB_SHIFTER_BOX_STYLE_WIDTH,
    EXCLUDED_MOUNT_IDS_LIB_SHIFTER_BOX_STYLE_HEIGHT
  )

  updateExcludedMountIdsLibShifterBoxEntries(shifterBox)
  updateExcludedMountIdsLibShifterBoxState(parentCtrl, shifterBox)

  shifterBox.RegisterCallback(
    LibShifterBox.EVENT_ENTRY_MOVED,
    myShifterBoxEventEntryMovedCallbackFunction
  )
  shifterBox.RegisterCallback(
    LibShifterBox.EVENT_ENTRY_HIGHLIGHTED,
    myShifterBoxEventEntryHighlightedCallbackFunction
  )
}

export function updateExcludedMountIdsLibShifterBoxState(
  this: void,
  parentCtrl: Control | undefined,
  excludedMountIdsShifterBox?: ShifterBox
): undefined {
  const shifterBox = excludedMountIdsShifterBox ?? excludedMountIdsShifterBoxControl
  if (parentCtrl === undefined || shifterBox === undefined) {
    return
  }
  const isExcludeMountIdsLSBEnabled = STATE.settingsVars.settings.favoriteMountsContextMenu === true
  parentCtrl.SetHidden(false)
  parentCtrl.SetMouseEnabled(isExcludeMountIdsLSBEnabled)
  shifterBox.SetHidden(false)
  shifterBox.SetEnabled(isExcludeMountIdsLSBEnabled)
}

export function buildExcludedMountIdsLibShifterBox(
  this: void,
  parentCtrl: Control | undefined
): undefined {
  if (parentCtrl === undefined) {
    return
  }
  const addonName = STATE.addonVars.addonName

  const excludedMountIdsShifterBox = LibShifterBox(
    addonName,
    "FCOCHANGESTUFF_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT_LSB",
    parentCtrl,
    EXCLUDED_MOUNT_IDS_LIB_SHIFTER_BOX_SETTINGS
  )
  excludedMountIdsShifterBoxControl = excludedMountIdsShifterBox
  updateExcludedMountIdsShifterBox(parentCtrl)
}

export function getExcludedMountIdsLibShifterBox(
  this: void,
  parentCtrl: Control | undefined
): ShifterBox | undefined {
  if (parentCtrl === undefined) {
    return undefined
  }
  updateExcludedMountIdsLibShifterBox(parentCtrl)
  return excludedMountIdsShifterBoxControl
}

export function updateExcludedMountIdsLibShifterBox(
  this: void,
  parentCtrl: Control | undefined
): undefined {
  if (parentCtrl === undefined) {
    return
  }
  if (excludedMountIdsShifterBoxControl === undefined) {
    buildExcludedMountIdsLibShifterBox(parentCtrl)
  } else {
    updateExcludedMountIdsShifterBox(parentCtrl)
  }
}
