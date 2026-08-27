import { LORE_LIBRARY_EIDETIC } from "./constants"
import {
  LoreBooks_GetEideticData,
  LoreBooks_GetNewEideticData,
  LoreBooks_GetNewLoreBookInfo,
  LoreBooks_GetNewLoreCollectionInfo,
} from "./data-accessors"
import { reportState } from "./report-state"
import { state } from "./runtime-state"
import type { EideticBookZoneEntry } from "./types"

export function allowEideticReport(): boolean {
  return (
    LORE_LIBRARY.eideticPossibleCollected - (LORE_LIBRARY.eideticCurrentlyCollected ?? 0) <= 225
  )
}

export function buildEideticReportPerMap(lastObject: number): undefined {
  const eideticHeaderText = GetControl<LabelControl>(LoreBooksReport, "EideticHeaderText")
  if (eideticHeaderText === undefined) return
  eideticHeaderText.ClearAnchors()

  eideticHeaderText.SetAnchor(TOPLEFT, LoreBooksReportContainerScrollChild, TOPLEFT, 4, lastObject)

  if (allowEideticReport()) {
    eideticHeaderText.SetText(GetString(LBOOKS_RE_FEW_BOOKS_MISSING))
    reportState.copyReport = `${reportState.copyReport}\n\n${GetString(LBOOKS_RE_FEW_BOOKS_MISSING)}`

    const eideticData: Record<number, EideticBookZoneEntry[]> = {}
    const eideticSeen: Record<string, boolean> = {}
    let yCollectionIndex = lastObject + 48

    for (const mapIndex of $range(1, GetNumMaps())) {
      eideticData[mapIndex] = []
      const mapId = GetMapIdByIndex(mapIndex)
      state.eideticBooks = LoreBooks_GetEideticData(mapId, mapId)

      const eideticBooks = state.eideticBooks
      if (eideticBooks !== undefined) {
        for (const bookData of eideticBooks) {
          const [, , known] = LoreBooks_GetNewLoreBookInfo(
            LORE_LIBRARY_EIDETIC,
            bookData.c ?? 0,
            bookData.b ?? 0
          )
          const seenKey = `${bookData.c ?? 0}-${bookData.b ?? 0}`
          if (!known && eideticSeen[seenKey] !== true) {
            eideticData[mapIndex].push(bookData)
            eideticSeen[seenKey] = true
          }
        }

        let eideticBooksInMap = GetControl<LabelControl>(
          LoreBooksReportContainerScrollChild,
          `EideticBooksInMap${mapIndex}`
        )
        let eideticMapName = GetControl<LabelControl>(
          LoreBooksReportContainerScrollChild,
          `EideticMapName${mapIndex}`
        )
        let eideticReportForMap = GetControl<LabelControl>(
          LoreBooksReportContainerScrollChild,
          `EideticReportForMap${mapIndex}`
        )

        if (eideticMapName === undefined) {
          eideticBooksInMap = CreateControlFromVirtual<LabelControl>(
            "$(parent)EideticBooksInMap",
            LoreBooksReportContainerScrollChild,
            "Lorebook_EideticBooksInMap_Template",
            mapIndex
          )
          eideticMapName = CreateControlFromVirtual<LabelControl>(
            "$(parent)EideticMapName",
            LoreBooksReportContainerScrollChild,
            "Lorebook_EideticMapName_Template",
            mapIndex
          )
          eideticReportForMap = CreateControlFromVirtual<LabelControl>(
            "$(parent)EideticReportForMap",
            LoreBooksReportContainerScrollChild,
            "Lorebook_EideticReportForMap_Template",
            mapIndex
          )
        } else {
          eideticBooksInMap?.SetHidden(false)
          eideticMapName.SetHidden(false)
          eideticReportForMap?.SetHidden(false)
        }

        const missingInMap = eideticData[mapIndex].length
        if (
          missingInMap > 0 &&
          eideticBooksInMap !== undefined &&
          eideticReportForMap !== undefined
        ) {
          eideticBooksInMap.SetAnchor(
            TOPLEFT,
            LoreBooksReportContainerScrollChild,
            TOPLEFT,
            0,
            yCollectionIndex
          )
          eideticMapName.SetAnchor(
            TOPLEFT,
            LoreBooksReportContainerScrollChild,
            TOPLEFT,
            25,
            yCollectionIndex
          )
          eideticReportForMap.SetAnchor(
            TOPLEFT,
            LoreBooksReportContainerScrollChild,
            TOPLEFT,
            50,
            yCollectionIndex + 24
          )

          eideticBooksInMap.SetText(missingInMap)
          eideticMapName.SetText(
            zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapNameByIndex(mapIndex))
          )

          let eideticReport = ""
          for (const data of eideticData[mapIndex]) {
            const [bookName] = LoreBooks_GetNewLoreBookInfo(
              LORE_LIBRARY_EIDETIC,
              data.c ?? 0,
              data.b ?? 0
            )
            eideticReport = zo_strjoin(" ; ", bookName, eideticReport)
          }

          if (string.len(eideticReport) > 0) {
            eideticReport = string.sub(eideticReport, 0, -3)
          }

          eideticReportForMap.SetText(eideticReport)
          reportState.copyReport = `${reportState.copyReport}\n\n${zo_strformat(
            "<<1>> (<<2>>):\n<<3>>",
            zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapNameByIndex(mapIndex)),
            missingInMap,
            eideticReport
          )}`

          eideticReportForMap.GetHeight()

          yCollectionIndex = yCollectionIndex + eideticReportForMap.GetHeight() + 32
        }
      }
    }
  } else {
    eideticHeaderText.SetText(GetString(LBOOKS_RE_THREESHOLD_ERROR))
    reportState.copyReport = `${reportState.copyReport}\n\n${GetString(LBOOKS_RE_THREESHOLD_ERROR)}`
  }
}

export function buildEideticReportPerCollection(lastObject: number): undefined {
  const eideticHeaderText = GetControl<LabelControl>(LoreBooksReport, "EideticHeaderText")
  if (eideticHeaderText === undefined) return
  eideticHeaderText.ClearAnchors()

  eideticHeaderText.SetAnchor(TOPLEFT, LoreBooksReportContainerScrollChild, TOPLEFT, 4, lastObject)

  if (allowEideticReport()) {
    eideticHeaderText.SetText(GetString(LBOOKS_RE_FEW_BOOKS_MISSING))
    reportState.copyReport = `${reportState.copyReport}\n\n${GetString(LBOOKS_RE_FEW_BOOKS_MISSING)}`

    let totalBooks = 0
    const eideticData: Record<number, Record<number, string>> = {}
    let yCollectionIndex = lastObject + 48

    const [, numCollections] = GetLoreCategoryInfo(LORE_LIBRARY_EIDETIC)

    for (const collectionIndex of $range(1, numCollections)) {
      eideticData[collectionIndex] = {}

      const [collectionName, , , totalBooksInCollection, hidden] =
        LoreBooks_GetNewLoreCollectionInfo(LORE_LIBRARY_EIDETIC, collectionIndex)

      if (!hidden) {
        for (const bookIndex of $range(1, totalBooksInCollection)) {
          const [bookName, , known] = LoreBooks_GetNewLoreBookInfo(
            LORE_LIBRARY_EIDETIC,
            collectionIndex,
            bookIndex
          )
          if (!known) {
            eideticData[collectionIndex][bookIndex] = bookName
          }
        }

        const missingInCollection = NonContiguousCount(eideticData[collectionIndex])
        if (missingInCollection > 0) {
          let eideticReport = ""

          let eideticBooksInCollection = GetControl<LabelControl>(
            LoreBooksReportContainerScrollChild,
            `EideticBooksInCollection${collectionIndex}`
          )
          let eideticCollectionName = GetControl<LabelControl>(
            LoreBooksReportContainerScrollChild,
            `EideticCollectionName${collectionIndex}`
          )
          let eideticReportForCollection = GetControl<LabelControl>(
            LoreBooksReportContainerScrollChild,
            `EideticReportForCollection${collectionIndex}`
          )

          if (eideticCollectionName === undefined) {
            eideticBooksInCollection = CreateControlFromVirtual<LabelControl>(
              "$(parent)EideticBooksInCollection",
              LoreBooksReportContainerScrollChild,
              "Lorebook_EideticBooksInCollection_Template",
              collectionIndex
            )
            eideticCollectionName = CreateControlFromVirtual<LabelControl>(
              "$(parent)EideticCollectionName",
              LoreBooksReportContainerScrollChild,
              "Lorebook_EideticCollectionName_Template",
              collectionIndex
            )
            eideticReportForCollection = CreateControlFromVirtual<LabelControl>(
              "$(parent)EideticReportForCollection",
              LoreBooksReportContainerScrollChild,
              "Lorebook_EideticReportForCollection_Template",
              collectionIndex
            )
          } else {
            eideticBooksInCollection?.SetHidden(false)
            eideticCollectionName.SetHidden(false)
            eideticReportForCollection?.SetHidden(false)
          }

          if (eideticBooksInCollection === undefined || eideticReportForCollection === undefined) {
          } else {
            eideticBooksInCollection.SetAnchor(
              TOPLEFT,
              LoreBooksReportContainerScrollChild,
              TOPLEFT,
              0,
              yCollectionIndex
            )
            eideticCollectionName.SetAnchor(
              TOPLEFT,
              LoreBooksReportContainerScrollChild,
              TOPLEFT,
              25,
              yCollectionIndex
            )
            eideticReportForCollection.SetAnchor(
              TOPLEFT,
              LoreBooksReportContainerScrollChild,
              TOPLEFT,
              50,
              yCollectionIndex + 24
            )

            eideticBooksInCollection.SetText(missingInCollection)
            eideticCollectionName.SetText(collectionName)

            for (const [bookIndex, bookName] of pairs(eideticData[collectionIndex])) {
              let bookLocation = ""
              const bookData = LoreBooks_GetNewEideticData(
                LORE_LIBRARY_EIDETIC,
                collectionIndex,
                bookIndex
              )
              if (bookData !== undefined) {
                if (bookData.r === true) {
                  bookLocation = "[B] "
                } else if (bookData.e !== undefined) {
                  const firstZone = bookData.e[0]
                  if (firstZone !== undefined) {
                    bookLocation = `[${zo_strformat(
                      SI_WINDOW_TITLE_WORLD_MAP,
                      GetMapNameById(firstZone.pm ?? 0)
                    )}] `
                  } else {
                    bookLocation = "[Q] "
                  }
                }
              }

              eideticReport = zo_strjoin("; ", `${bookLocation}${bookName}`, eideticReport)
            }

            if (string.len(eideticReport) > 0) {
              eideticReport = string.sub(eideticReport, 0, -3)
            }
            eideticReportForCollection.SetText(eideticReport)

            reportState.copyReport = `${reportState.copyReport}\n\n${zo_strformat(
              "<<1>> (<<2>>):\n<<3>>",
              collectionName,
              missingInCollection,
              eideticReport
            )}`

            eideticReportForCollection.GetHeight()

            yCollectionIndex = yCollectionIndex + eideticReportForCollection.GetHeight() + 32

            totalBooks = totalBooks + missingInCollection
          }
        }
      }
    }
  } else {
    eideticHeaderText.SetText(GetString(LBOOKS_RE_THREESHOLD_ERROR))
    reportState.copyReport = `${reportState.copyReport}\n\n${GetString(LBOOKS_RE_THREESHOLD_ERROR)}`
  }
}
