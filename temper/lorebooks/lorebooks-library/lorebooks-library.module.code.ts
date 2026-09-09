import { fireCallbacks } from "../lorebooks-callbacks/lorebooks-callbacks.module.code.ts"
import {
  CALLBACK_MOTIF_CHECKBOX_CHANGED,
  LORE_LIBRARY_CRAFTING,
  LORE_LIBRARY_EIDETIC,
} from "../lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  loreBooksGetNewLoreBookInfo,
  loreBooksGetNewLoreCollectionInfo,
} from "../lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import {
  filterScrollList,
  getHirelingMessageCollection,
  type HirelingCollectionData,
} from "../lorebooks-library-filter/lorebooks-library-filter.module.code.ts"
import {
  onMouseEnter,
  onMouseExit,
  onRowMouseUp,
} from "../lorebooks-library-rows/lorebooks-library-rows.module.code.ts"
import { REPORT_STATE } from "../lorebooks-report-state/lorebooks-report-state.module.code.ts"
import {
  isReportShown,
  showLoreLibraryCopyReport,
  showLoreLibraryReport,
  switchLoreLibraryReportMode,
} from "../lorebooks-reports/lorebooks-reports.module.code.ts"

interface CollectionNodeData {
  categoryIndex: number
  collectionIndex: number
  name: string
  description: string
  numKnownBooks: number
  totalBooks: number
  collectionId: number
}

interface CategoryData {
  categoryIndex: number
  name: string
  numCollections: number
  lbcollections?: CollectionNodeData[]
}

type SelfWithControl = { control: Control }
type HookedControl = { lbhooked?: boolean }
type RowFields = { categoryIndex: number; collectionIndex: number; bookIndex: number }
type StringRecord = Record<string, unknown>
type UnknownArgsVoidFn = (...args: unknown[]) => void
type UnknownArgsUnknownFn = (...args: unknown[]) => unknown
function asSelfWithControl(value: unknown): SelfWithControl {
  return value as SelfWithControl
}
function asHookedControl(value: unknown): HookedControl {
  return value as HookedControl
}
function asRowFields(value: unknown): RowFields {
  return value as RowFields
}
function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}
function asControl(value: unknown): Control {
  return value as Control
}
function asUnknownArgsVoidFn(value: unknown): UnknownArgsVoidFn {
  return value as UnknownArgsVoidFn
}
function asUnknownArgsUnknownFn(value: unknown): UnknownArgsUnknownFn {
  return value as UnknownArgsUnknownFn
}

function onSearchTextChanged(this: void, self: EditControl): undefined {
  ZO_EditDefaultText_OnTextChanged(self)

  const search = self.GetText()
  LORE_LIBRARY.search = search

  LORE_LIBRARY.navigationTree.ClearSelectedNode()
  LORE_LIBRARY.BuildCategoryList()
}

function nameSorter(this: void, left: { name: string }, right: { name: string }): boolean {
  return left.name < right.name
}

export function isFoundInLoreLibrary(search: string, data: CollectionNodeData): boolean {
  const [nameMatch] = string.find(string.lower(data.name), search)
  if (nameMatch !== undefined) {
    return true
  }
  for (const bookIndex of $range(1, data.totalBooks)) {
    const [title] = loreBooksGetNewLoreBookInfo(data.categoryIndex, data.collectionIndex, bookIndex)
    const [titleMatch] = string.find(string.lower(title), search)
    if (titleMatch !== undefined) {
      return true
    }
  }
  return false
}

export function buildCategoryList(this: void, self: LoreLibraryObject): boolean {
  const control = asSelfWithControl(self).control
  if (control.IsHidden()) {
    self.dirty = true
    return true
  }

  self.totalCurrentlyCollected = 0
  self.totalPossibleCollected = 0
  self.motifsCurrentlyCollected = 0
  self.motifsPossibleCollected = 0
  self.shalidorCurrentlyCollected = 0
  self.shalidorPossibleCollected = 0
  self.eideticCurrentlyCollected = 0
  self.eideticPossibleCollected = 0

  self.navigationTree.Reset()

  const lbcategories: CategoryData[] = []

  for (const categoryIndex of $range(1, GetNumLoreCategories())) {
    const [categoryName, numCollections] = GetLoreCategoryInfo(categoryIndex)
    for (const collectionIndex of $range(1, numCollections)) {
      const [collectionName, , , , hidden] = loreBooksGetNewLoreCollectionInfo(
        categoryIndex,
        collectionIndex
      )
      if (collectionName !== undefined && collectionName !== "" && !hidden) {
        lbcategories[lbcategories.length] = {
          categoryIndex,
          name: categoryName,
          numCollections,
        }
        break
      }
    }
  }

  table.sort(lbcategories, nameSorter)
  let firstNode: unknown
  let collectionNodeToSelect: unknown
  for (const categoryData of lbcategories) {
    const parent = self.navigationTree.AddNode("ZO_LabelHeader", categoryData)

    const categoryIndex = categoryData.categoryIndex
    const numCollections = categoryData.numCollections

    categoryData.lbcollections = []

    for (const collectionIndex of $range(1, numCollections)) {
      const [collectionName, description, numKnownBooks, totalBooks, , , collectionId] =
        loreBooksGetNewLoreCollectionInfo(categoryIndex, collectionIndex)
      if (collectionName !== undefined && collectionName !== "") {
        categoryData.lbcollections[categoryData.lbcollections.length] = {
          categoryIndex,
          collectionIndex,
          name: collectionName,
          description,
          numKnownBooks,
          totalBooks,
          collectionId,
        }
        self.totalCurrentlyCollected = self.totalCurrentlyCollected + numKnownBooks
        self.totalPossibleCollected = self.totalPossibleCollected + totalBooks

        if (categoryIndex === LORE_LIBRARY_CRAFTING) {
          self.motifsCurrentlyCollected = self.motifsCurrentlyCollected + numKnownBooks
          self.motifsPossibleCollected = self.motifsPossibleCollected + totalBooks
        } else if (categoryIndex === LORE_LIBRARY_EIDETIC) {
          self.eideticCurrentlyCollected = self.eideticCurrentlyCollected + numKnownBooks
          self.eideticPossibleCollected = self.eideticPossibleCollected + totalBooks
        }
      }
    }

    table.sort(categoryData.lbcollections, nameSorter)

    const search = string.lower(LORE_LIBRARY.search)

    for (const collectionData of categoryData.lbcollections) {
      const node = self.navigationTree.AddNode(
        "ZO_LoreLibraryNavigationEntry",
        collectionData,
        parent
      )
      if (firstNode === undefined) {
        firstNode = node
      }
      if (search !== "" && string.len(search) >= 2) {
        if (isFoundInLoreLibrary(search, collectionData)) {
          collectionNodeToSelect = node
        }
      } else if (
        self.collectionIdToSelect !== undefined &&
        self.collectionIdToSelect === collectionData.collectionId
      ) {
        collectionNodeToSelect = node
      }
    }
  }
  if (collectionNodeToSelect === undefined) {
    collectionNodeToSelect = firstNode
  }

  self.navigationTree.Commit(collectionNodeToSelect, true)
  self.RefreshCollectedInfo()

  KEYBIND_STRIP.UpdateKeybindButtonGroup(self.keybindStripDescriptor)

  self.collectionIdToSelect = undefined
  self.dirty = false

  return true
}

export function buildBookListPostHook(): undefined {
  const dataType = LORE_LIBRARY.list.list.dataTypes[1]
  if (dataType === undefined) return
  const orgCallback = dataType.setupCallback
  dataType.setupCallback = (control: Control, data: unknown): undefined => {
    orgCallback(control, data)
    const hookedControl = asHookedControl(control)
    if (hookedControl.lbhooked !== true) {
      hookedControl.lbhooked = true
      control.SetHandler("OnMouseUp", asUnknownArgsVoidFn(onRowMouseUp))
      control.SetHandler("OnMouseEnter", (...args: unknown[]): undefined => {
        const rowControl = asControl(args[0])
        const fields = asRowFields(rowControl)
        onMouseEnter(rowControl, fields.categoryIndex, fields.collectionIndex, fields.bookIndex)
      })
      control.SetHandler("OnMouseExit", (...args: unknown[]): undefined => {
        onMouseExit(asControl(args[0]))
      })
      control.GetNamedChild("Text")?.SetMouseEnabled(false)
    }
  }
}

export function isMotifButtonChecked(control: Control): boolean {
  return ZO_CheckButton_IsChecked(control)
}

export function rebuildLoreLibrary(): undefined {
  REPORT_STATE.loreLibraryReportKeybind = [
    {
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      name: GetString(LBOOKS_REPORT_KEYBIND_RPRT),
      keybind: "UI_SHORTCUT_SECONDARY",
      callback: showLoreLibraryReport,
    },
    {
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      name: GetString(LBOOKS_REPORT_KEYBIND_SWITCH),
      keybind: "UI_SHORTCUT_QUATERNARY",
      callback: switchLoreLibraryReportMode,
      visible: isReportShown,
    },
    {
      alignment: KEYBIND_STRIP_ALIGN_LEFT,
      name: GetString(LBOOKS_REPORT_KEYBIND_COPY),
      keybind: "UI_SHORTCUT_TERTIARY",
      callback: showLoreLibraryCopyReport,
      visible: isReportShown,
    },
  ]

  function onStateChanged(this: void, _oldState: number, newState: number): undefined {
    if (newState === SCENE_SHOWING) {
      if (REPORT_STATE.loreLibraryReportKeybind !== undefined) {
        KEYBIND_STRIP.AddKeybindButtonGroup(REPORT_STATE.loreLibraryReportKeybind)
      }
    } else if (newState === SCENE_HIDDEN) {
      if (REPORT_STATE.loreLibraryReportKeybind !== undefined) {
        KEYBIND_STRIP.RemoveKeybindButtonGroup(REPORT_STATE.loreLibraryReportKeybind)
      }
      showLoreLibraryReport(true)
    }
  }

  LORE_LIBRARY_SCENE.RegisterCallback("StateChange", onStateChanged)

  const lorebookResearch = WINDOW_MANAGER.CreateControlFromVirtual(
    "Lorebook_Research",
    ZO_LoreLibrary,
    "Lorebook_Research_Template"
  )
  const searchBox = GetControl<EditControl>(lorebookResearch, "Box")
  searchBox?.SetHandler("OnTextChanged", asUnknownArgsVoidFn(onSearchTextChanged))

  ZO_PreHook(
    asStringRecord(LORE_LIBRARY),
    "BuildCategoryList",
    asUnknownArgsUnknownFn((self: LoreLibraryObject) => buildCategoryList(self))
  )
  ZO_PreHook(
    asStringRecord(LORE_LIBRARY.list),
    "FilterScrollList",
    asUnknownArgsUnknownFn((self: LoreLibraryObject["list"]) => filterScrollList(self))
  )

  const origLoreLibraryBuildBookList = LORE_LIBRARY.BuildBookList
  LORE_LIBRARY.BuildBookList = function (this: LoreLibraryObject, ...args: unknown[]): undefined {
    origLoreLibraryBuildBookList.call(this, ...args)
    buildBookListPostHook()
  }

  const includeMotifsCheckbox = WINDOW_MANAGER.CreateControlFromVirtual(
    "$(parent)IncludeMotifs",
    LORE_LIBRARY.totalCollectedLabel,
    "ZO_CheckButton"
  )

  includeMotifsCheckbox.SetAnchor(LEFT, LORE_LIBRARY.totalCollectedLabel, RIGHT, 85, 0)

  ZO_CheckButton_SetLabelText(includeMotifsCheckbox, GetString(LBOOKS_INCLUDE_MOTIFS_CHECKBOX))
  ZO_CheckButton_SetToggleFunction(includeMotifsCheckbox, () => {
    LORE_LIBRARY.RefreshCollectedInfo()
    fireCallbacks(CALLBACK_MOTIF_CHECKBOX_CHANGED)
  })

  LORE_LIBRARY.RefreshCollectedInfo = function (
    this: LoreLibraryObject,
    library?: LoreLibraryObject
  ): undefined {
    const lib = library ?? this
    let currentlyCollected = lib.totalCurrentlyCollected
    let possibleCollected = lib.totalPossibleCollected

    if (!isMotifButtonChecked(includeMotifsCheckbox)) {
      currentlyCollected = currentlyCollected - lib.motifsCurrentlyCollected
      possibleCollected = possibleCollected - lib.motifsPossibleCollected
    }
    lib.totalCollectedLabel.SetText(
      zo_strformat(SI_LORE_LIBRARY_TOTAL_COLLECTED, currentlyCollected, possibleCollected)
    )
  }

  function addHirelingCorrespondenceSections(this: void): undefined {
    const parent = LORE_LIBRARY.navigationTree.AddNode("ZO_LabelHeader", {
      name: GetString(SI_LORE_LIBRARY_HIRELING_CORRESPONDENCE_HEADER),
    })
    for (const hirelingType of $range(HIRELING_TYPE_ITERATION_BEGIN, HIRELING_TYPE_ITERATION_END)) {
      const hirelings: HirelingCollectionData[] = []

      const hirelingCollection = getHirelingMessageCollection(hirelingType)
      if (hirelingCollection.totalBooks > 0) {
        hirelings.push(hirelingCollection)
      }

      for (const hirelingData of hirelings) {
        LORE_LIBRARY.navigationTree.AddNode("ZO_LoreLibraryNavigationEntry", hirelingData, parent)
      }
    }
  }

  const origBuildCategoryList = LORE_LIBRARY.BuildCategoryList
  LORE_LIBRARY.BuildCategoryList = function (
    this: LoreLibraryObject,
    ...args: unknown[]
  ): undefined {
    origBuildCategoryList.call(this, ...args)
    addHirelingCorrespondenceSections()
  }
}
