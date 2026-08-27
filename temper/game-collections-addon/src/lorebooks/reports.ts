import { LORE_LIBRARY_SHALIDOR } from "./constants"
import { LoreBooks_GetNewLoreCollectionInfo } from "./data-accessors"
import { reportState } from "./report-state"
import { buildEideticReportPerCollection, buildEideticReportPerMap } from "./reports-eidetic"

export function showLoreLibraryReport(forceHide?: boolean): undefined {
  LoreBooksCopyReport.SetHidden(true)
  if (forceHide === true) {
    reportState.reportShown = false
    LoreBooksReport.SetHidden(forceHide)
  } else {
    if (ZO_LoreLibrary.IsHidden()) {
      LoreBooksReport.SetHidden(true)
      ZO_LoreLibrary.SetHidden(false)
      reportState.reportShown = false
    } else {
      LoreBooksReport.SetHidden(false)
      ZO_LoreLibrary.SetHidden(true)
      reportState.reportShown = true
    }
  }

  if (reportState.loreLibraryReportKeybind !== undefined) {
    KEYBIND_STRIP.UpdateKeybindButtonGroup(reportState.loreLibraryReportKeybind)
  }
}

export function showLoreLibraryCopyReport(): undefined {
  LoreBooksReport.SetHidden(true)

  const edit = LoreBooksCopyReport.GetNamedChild("Content")?.GetNamedChild<EditControl>("Edit")
  if (edit !== undefined) {
    edit.SelectAll()
    edit.TakeFocus()
    edit.SetTopLineIndex(1)
  }

  LoreBooksCopyReport.SetHidden(false)
}

export function isReportShown(this: void): boolean {
  return reportState.reportShown
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
      LoreBooksReportContainerScrollChild,
      `CollectionName${collectionIndex}`
    )
    let shalidorCollectionValue = GetControl<LabelControl>(
      LoreBooksReportContainerScrollChild,
      `CollectionValue${collectionIndex}`
    )

    if (data.numKnownBooks !== data.totalBooks) {
      if (shalidorCollectionName === undefined) {
        shalidorCollectionName = CreateControlFromVirtual<LabelControl>(
          "$(parent)CollectionName",
          LoreBooksReportContainerScrollChild,
          "Lorebook_ShaliCollectionName_Template",
          collectionIndex
        )
        shalidorCollectionValue = CreateControlFromVirtual<LabelControl>(
          "$(parent)CollectionValue",
          LoreBooksReportContainerScrollChild,
          "Lorebook_ShaliCollectionValue_Template",
          collectionIndex
        )
      }

      if (shalidorCollectionName !== undefined && shalidorCollectionValue !== undefined) {
        shalidorCollectionValue.SetAnchor(
          TOPLEFT,
          LoreBooksReportContainerScrollChild,
          TOPLEFT,
          20,
          yCollectionIndex
        )
        shalidorCollectionName.SetAnchor(
          TOPLEFT,
          LoreBooksReportContainerScrollChild,
          TOPLEFT,
          70,
          yCollectionIndex
        )

        yCollectionIndex = yCollectionIndex + 32

        shalidorCollectionName.SetText(data.name)
        shalidorCollectionValue.SetText(
          zo_strformat("<<1>>/<<2>>", data.numKnownBooks, data.totalBooks)
        )

        reportState.copyReport = `${reportState.copyReport}\n\n${data.name} :\n${zo_strformat(
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

export function buildShalidorReport(): number {
  const POINTS_FOR_RANK_MAX = 1380

  let totalKnown = 0
  let points = 0
  let booksInShalidor = 0

  const collectionsData: Record<number, ShalidorCollectionReportData> = {}
  const [, numCollections] = GetLoreCategoryInfo(LORE_LIBRARY_SHALIDOR)
  for (const collectionIndex of $range(1, numCollections)) {
    const [collectionName, , numKnownBooks, totalBooks, hidden] =
      LoreBooks_GetNewLoreCollectionInfo(LORE_LIBRARY_SHALIDOR, collectionIndex)
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

  const shalidorHeaderText = GetControl<LabelControl>(LoreBooksReport, "ShalidorHeaderText")
  let lastObject = 52

  if (points < POINTS_FOR_RANK_MAX) {
    reportState.copyReport = GetString(LBOOKS_RS_FEW_BOOKS_MISSING)
    shalidorHeaderText?.SetText(reportState.copyReport)
    lastObject = displayCollectionsReport(collectionsData)
  } else if (totalKnown < booksInShalidor) {
    reportState.copyReport = GetString(LBOOKS_RS_MDONE_BOOKS_MISSING)
    shalidorHeaderText?.SetText(reportState.copyReport)
    lastObject = displayCollectionsReport(collectionsData)
  } else {
    reportState.copyReport = GetString(LBOOKS_RS_GOT_ALL_BOOKS)
    shalidorHeaderText?.SetText(reportState.copyReport)
  }

  return lastObject
}

export function buildEideticReport(lastObject: number): undefined {
  if (reportState.eideticModeAsked === 2) {
    buildEideticReportPerCollection(lastObject)
  } else {
    buildEideticReportPerMap(lastObject)
  }
}

export function hidePreviousReport(): undefined {
  for (const childIndex of $range(1, LoreBooksReportContainerScrollChild.GetNumChildren())) {
    const childObject = LoreBooksReportContainerScrollChild.GetChild(childIndex)
    if (childObject !== undefined) {
      const childName = childObject.GetName()
      const [foundEidetic] = string.find(childName, "Eidetic")
      if (childName !== "LoreBooksReportEideticHeaderText" && foundEidetic !== undefined) {
        childObject.SetHidden(true)
      }
    }
  }
}

export function buildLoreBookSummary(): undefined {
  hidePreviousReport()

  const lastObject = buildShalidorReport()

  buildEideticReport(lastObject)

  const edit = LoreBooksCopyReport.GetNamedChild("Content")?.GetNamedChild<EditControl>("Edit")
  edit?.SetText(reportState.copyReport)
}

export function switchLoreLibraryReportMode(this: void): undefined {
  if (reportState.eideticModeAsked === undefined || reportState.eideticModeAsked === 1) {
    reportState.eideticModeAsked = 2
  } else {
    reportState.eideticModeAsked = 1
  }

  buildLoreBookSummary()
}
