import { LORE_LIBRARY_SHALIDOR } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import { loreBooksGetNewLoreCollectionInfo } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import { REPORT_STATE } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-report-state/lorebooks-report-state.module.code.ts"
import {
  buildEideticReportPerCollection,
  buildEideticReportPerMap,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-reports-eidetic/lorebooks-reports-eidetic.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-controls/lorebooks-controls.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export function showLoreLibraryReport(forceHide?: boolean): undefined {
  TemperWorldLoreBooksCopyReport.SetHidden(true)
  if (forceHide === true) {
    REPORT_STATE.reportShown = false
    TemperWorldLoreBooksReport.SetHidden(forceHide)
  } else {
    if (ZO_LoreLibrary.IsHidden()) {
      TemperWorldLoreBooksReport.SetHidden(true)
      ZO_LoreLibrary.SetHidden(false)
      REPORT_STATE.reportShown = false
    } else {
      TemperWorldLoreBooksReport.SetHidden(false)
      ZO_LoreLibrary.SetHidden(true)
      REPORT_STATE.reportShown = true
    }
  }

  if (REPORT_STATE.loreLibraryReportKeybind !== undefined) {
    KEYBIND_STRIP.UpdateKeybindButtonGroup(REPORT_STATE.loreLibraryReportKeybind)
  }
}

export function showLoreLibraryCopyReport(): undefined {
  TemperWorldLoreBooksReport.SetHidden(true)

  const edit =
    TemperWorldLoreBooksCopyReport.GetNamedChild("Content")?.GetNamedChild<EditControl>("Edit")
  if (edit !== undefined) {
    edit.SelectAll()
    edit.TakeFocus()
    edit.SetTopLineIndex(1)
  }

  TemperWorldLoreBooksCopyReport.SetHidden(false)
}

export function isReportShown(this: void): boolean {
  return REPORT_STATE.reportShown
}

interface ShalidorCollectionReportData {
  name: string
  numKnownBooks: number
  totalBooks: number
}

function displayCollectionsReport(
  collectionsData: Record<number, ShalidorCollectionReportData>
): number {
  let yCollectionIndex = 48

  const sortable: ShalidorCollectionReportData[] = []
  for (const [, data] of pairs(collectionsData)) {
    sortable.push(data)
  }
  table.sort(sortable, (a, b) => a.totalBooks - a.numKnownBooks < b.totalBooks - b.numKnownBooks)

  let lastObject = 0
  for (const collectionIndex of $range(1, sortable.length)) {
    const data = sortable[collectionIndex - 1]
    if (data === undefined) continue

    let shalidorCollectionName = GetControl<LabelControl>(
      TemperWorldLoreBooksReportContainerScrollChild,
      `CollectionName${collectionIndex}`
    )
    let shalidorCollectionValue = GetControl<LabelControl>(
      TemperWorldLoreBooksReportContainerScrollChild,
      `CollectionValue${collectionIndex}`
    )

    if (data.numKnownBooks !== data.totalBooks) {
      if (shalidorCollectionName === undefined) {
        shalidorCollectionName = CreateControlFromVirtual<LabelControl>(
          "$(parent)CollectionName",
          TemperWorldLoreBooksReportContainerScrollChild,
          "TemperWorldLoreBooks_ShaliCollectionName_Template",
          collectionIndex
        )
        shalidorCollectionValue = CreateControlFromVirtual<LabelControl>(
          "$(parent)CollectionValue",
          TemperWorldLoreBooksReportContainerScrollChild,
          "TemperWorldLoreBooks_ShaliCollectionValue_Template",
          collectionIndex
        )
      }

      if (shalidorCollectionName !== undefined && shalidorCollectionValue !== undefined) {
        shalidorCollectionValue.SetAnchor(
          TOPLEFT,
          TemperWorldLoreBooksReportContainerScrollChild,
          TOPLEFT,
          20,
          yCollectionIndex
        )
        shalidorCollectionName.SetAnchor(
          TOPLEFT,
          TemperWorldLoreBooksReportContainerScrollChild,
          TOPLEFT,
          70,
          yCollectionIndex
        )

        yCollectionIndex = yCollectionIndex + 32

        shalidorCollectionName.SetText(data.name)
        shalidorCollectionValue.SetText(
          zo_strformat("<<1>>/<<2>>", data.numKnownBooks, data.totalBooks)
        )

        REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${data.name} :\n${zo_strformat(
          "<<1>>/<<2>>",
          data.numKnownBooks,
          data.totalBooks
        )}`
        lastObject = yCollectionIndex
      }
    } else if (shalidorCollectionName !== undefined && shalidorCollectionValue !== undefined) {
      shalidorCollectionName.SetHidden(true)
      shalidorCollectionValue.SetHidden(true)
    }
  }

  return lastObject + 10
}

function buildShalidorReport(): number {
  const pointsForRankMax = 1380

  let totalKnown = 0
  let points = 0
  let booksInShalidor = 0

  const collectionsData: Record<number, ShalidorCollectionReportData> = {}
  const [, numCollections] = GetLoreCategoryInfo(LORE_LIBRARY_SHALIDOR)
  for (const collectionIndex of $range(1, numCollections)) {
    const [collectionName, , numKnownBooks, totalBooks, hidden] = loreBooksGetNewLoreCollectionInfo(
      LORE_LIBRARY_SHALIDOR,
      collectionIndex
    )
    if (!hidden) {
      totalKnown = totalKnown + numKnownBooks
      booksInShalidor = booksInShalidor + totalBooks
      points = points + numKnownBooks * 5
      collectionsData[collectionIndex] = {
        name: collectionName,
        numKnownBooks,
        totalBooks,
      }
      if (numKnownBooks === totalBooks) {
        points = points + 20
      }
    }
  }

  const shalidorHeaderText = GetControl<LabelControl>(
    TemperWorldLoreBooksReport,
    "ShalidorHeaderText"
  )
  let lastObject = 52

  if (points < pointsForRankMax) {
    REPORT_STATE.copyReport = GetString(SI_TEMPER_LOREBOOKS_RS_FEW_BOOKS_MISSING)
    shalidorHeaderText?.SetText(REPORT_STATE.copyReport)
    lastObject = displayCollectionsReport(collectionsData)
  } else if (totalKnown < booksInShalidor) {
    REPORT_STATE.copyReport = GetString(SI_TEMPER_LOREBOOKS_RS_MDONE_BOOKS_MISSING)
    shalidorHeaderText?.SetText(REPORT_STATE.copyReport)
    lastObject = displayCollectionsReport(collectionsData)
  } else {
    REPORT_STATE.copyReport = GetString(SI_TEMPER_LOREBOOKS_RS_GOT_ALL_BOOKS)
    shalidorHeaderText?.SetText(REPORT_STATE.copyReport)
  }

  return lastObject
}

function buildEideticReport(lastObject: number): undefined {
  if (REPORT_STATE.eideticModeAsked === 2) {
    buildEideticReportPerCollection(lastObject)
  } else {
    buildEideticReportPerMap(lastObject)
  }
}

function hidePreviousReport(): undefined {
  for (const childIndex of $range(
    1,
    TemperWorldLoreBooksReportContainerScrollChild.GetNumChildren()
  )) {
    const childObject = TemperWorldLoreBooksReportContainerScrollChild.GetChild(childIndex)
    if (childObject !== undefined) {
      const childName = childObject.GetName()
      const [foundEidetic] = string.find(childName, "Eidetic")
      if (
        childName !== "TemperWorldLoreBooksReportEideticHeaderText" &&
        foundEidetic !== undefined
      ) {
        childObject.SetHidden(true)
      }
    }
  }
}

function buildLoreBookSummary(): undefined {
  hidePreviousReport()

  const lastObject = buildShalidorReport()

  buildEideticReport(lastObject)

  const edit =
    TemperWorldLoreBooksCopyReport.GetNamedChild("Content")?.GetNamedChild<EditControl>("Edit")
  edit?.SetText(REPORT_STATE.copyReport)
}

export function switchLoreLibraryReportMode(this: void): undefined {
  if (REPORT_STATE.eideticModeAsked === undefined || REPORT_STATE.eideticModeAsked === 1) {
    REPORT_STATE.eideticModeAsked = 2
  } else {
    REPORT_STATE.eideticModeAsked = 1
  }

  buildLoreBookSummary()
}
