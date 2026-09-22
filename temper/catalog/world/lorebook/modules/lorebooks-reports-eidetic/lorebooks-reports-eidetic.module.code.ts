import { LORE_LIBRARY_EIDETIC } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-constants/lorebooks-constants.module.code.ts"
import {
  loreBooksGetEideticData,
  loreBooksGetNewEideticData,
  loreBooksGetNewLoreBookInfo,
  loreBooksGetNewLoreCollectionInfo,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-data-accessors/lorebooks-data-accessors.module.code.ts"
import { REPORT_STATE } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-report-state/lorebooks-report-state.module.code.ts"
import { STATE } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-runtime-state/lorebooks-runtime-state.module.code.ts"
import type { EideticBookZoneEntry } from "akasha/temper/catalog/world/lorebook/modules/lorebooks-types/lorebooks-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-controls/lorebooks-controls.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lore-library/eso-lore-library.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

function allowEideticReport(): boolean {
  return (
    LORE_LIBRARY.eideticPossibleCollected - (LORE_LIBRARY.eideticCurrentlyCollected ?? 0) <= 225
  )
}

export function buildEideticReportPerMap(lastObject: number): undefined {
  const eideticHeaderText = GetControl<LabelControl>(
    TemperWorldLoreBooksReport,
    "EideticHeaderText"
  )
  if (eideticHeaderText === undefined) return
  eideticHeaderText.ClearAnchors()

  eideticHeaderText.SetAnchor(
    TOPLEFT,
    TemperWorldLoreBooksReportContainerScrollChild,
    TOPLEFT,
    4,
    lastObject
  )

  if (allowEideticReport()) {
    eideticHeaderText.SetText(GetString(SI_TEMPER_LOREBOOKS_RE_FEW_BOOKS_MISSING))
    REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${GetString(SI_TEMPER_LOREBOOKS_RE_FEW_BOOKS_MISSING)}`

    const eideticData: Record<number, EideticBookZoneEntry[]> = {}
    const eideticSeen: Record<string, boolean> = {}
    let yCollectionIndex = lastObject + 48

    for (const mapIndex of $range(1, GetNumMaps())) {
      eideticData[mapIndex] = []
      const mapId = GetMapIdByIndex(mapIndex)
      STATE.eideticBooks = loreBooksGetEideticData(mapId, mapId)

      const eideticBooks = STATE.eideticBooks
      if (eideticBooks !== undefined) {
        for (const bookData of eideticBooks) {
          const [, , known] = loreBooksGetNewLoreBookInfo(
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
          TemperWorldLoreBooksReportContainerScrollChild,
          `EideticBooksInMap${mapIndex}`
        )
        let eideticMapName = GetControl<LabelControl>(
          TemperWorldLoreBooksReportContainerScrollChild,
          `EideticMapName${mapIndex}`
        )
        let eideticReportForMap = GetControl<LabelControl>(
          TemperWorldLoreBooksReportContainerScrollChild,
          `EideticReportForMap${mapIndex}`
        )

        if (eideticMapName === undefined) {
          eideticBooksInMap = CreateControlFromVirtual<LabelControl>(
            "$(parent)EideticBooksInMap",
            TemperWorldLoreBooksReportContainerScrollChild,
            "TemperWorldLoreBooks_EideticBooksInMap_Template",
            mapIndex
          )
          eideticMapName = CreateControlFromVirtual<LabelControl>(
            "$(parent)EideticMapName",
            TemperWorldLoreBooksReportContainerScrollChild,
            "TemperWorldLoreBooks_EideticMapName_Template",
            mapIndex
          )
          eideticReportForMap = CreateControlFromVirtual<LabelControl>(
            "$(parent)EideticReportForMap",
            TemperWorldLoreBooksReportContainerScrollChild,
            "TemperWorldLoreBooks_EideticReportForMap_Template",
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
            TemperWorldLoreBooksReportContainerScrollChild,
            TOPLEFT,
            0,
            yCollectionIndex
          )
          eideticMapName.SetAnchor(
            TOPLEFT,
            TemperWorldLoreBooksReportContainerScrollChild,
            TOPLEFT,
            25,
            yCollectionIndex
          )
          eideticReportForMap.SetAnchor(
            TOPLEFT,
            TemperWorldLoreBooksReportContainerScrollChild,
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
            const [bookName] = loreBooksGetNewLoreBookInfo(
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
          REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${zo_strformat(
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
    eideticHeaderText.SetText(GetString(SI_TEMPER_LOREBOOKS_RE_THREESHOLD_ERROR))
    REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${GetString(SI_TEMPER_LOREBOOKS_RE_THREESHOLD_ERROR)}`
  }
}

export function buildEideticReportPerCollection(lastObject: number): undefined {
  const eideticHeaderText = GetControl<LabelControl>(
    TemperWorldLoreBooksReport,
    "EideticHeaderText"
  )
  if (eideticHeaderText === undefined) return
  eideticHeaderText.ClearAnchors()

  eideticHeaderText.SetAnchor(
    TOPLEFT,
    TemperWorldLoreBooksReportContainerScrollChild,
    TOPLEFT,
    4,
    lastObject
  )

  if (allowEideticReport()) {
    eideticHeaderText.SetText(GetString(SI_TEMPER_LOREBOOKS_RE_FEW_BOOKS_MISSING))
    REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${GetString(SI_TEMPER_LOREBOOKS_RE_FEW_BOOKS_MISSING)}`

    let totalBooks = 0
    const eideticData: Record<number, Record<number, string>> = {}
    let yCollectionIndex = lastObject + 48

    const [, numCollections] = GetLoreCategoryInfo(LORE_LIBRARY_EIDETIC)

    for (const collectionIndex of $range(1, numCollections)) {
      eideticData[collectionIndex] = {}

      const [collectionName, , , totalBooksInCollection, hidden] =
        loreBooksGetNewLoreCollectionInfo(LORE_LIBRARY_EIDETIC, collectionIndex)

      if (!hidden) {
        for (const bookIndex of $range(1, totalBooksInCollection)) {
          const [bookName, , known] = loreBooksGetNewLoreBookInfo(
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
            TemperWorldLoreBooksReportContainerScrollChild,
            `EideticBooksInCollection${collectionIndex}`
          )
          let eideticCollectionName = GetControl<LabelControl>(
            TemperWorldLoreBooksReportContainerScrollChild,
            `EideticCollectionName${collectionIndex}`
          )
          let eideticReportForCollection = GetControl<LabelControl>(
            TemperWorldLoreBooksReportContainerScrollChild,
            `EideticReportForCollection${collectionIndex}`
          )

          if (eideticCollectionName === undefined) {
            eideticBooksInCollection = CreateControlFromVirtual<LabelControl>(
              "$(parent)EideticBooksInCollection",
              TemperWorldLoreBooksReportContainerScrollChild,
              "TemperWorldLoreBooks_EideticBooksInCollection_Template",
              collectionIndex
            )
            eideticCollectionName = CreateControlFromVirtual<LabelControl>(
              "$(parent)EideticCollectionName",
              TemperWorldLoreBooksReportContainerScrollChild,
              "TemperWorldLoreBooks_EideticCollectionName_Template",
              collectionIndex
            )
            eideticReportForCollection = CreateControlFromVirtual<LabelControl>(
              "$(parent)EideticReportForCollection",
              TemperWorldLoreBooksReportContainerScrollChild,
              "TemperWorldLoreBooks_EideticReportForCollection_Template",
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
              TemperWorldLoreBooksReportContainerScrollChild,
              TOPLEFT,
              0,
              yCollectionIndex
            )
            eideticCollectionName.SetAnchor(
              TOPLEFT,
              TemperWorldLoreBooksReportContainerScrollChild,
              TOPLEFT,
              25,
              yCollectionIndex
            )
            eideticReportForCollection.SetAnchor(
              TOPLEFT,
              TemperWorldLoreBooksReportContainerScrollChild,
              TOPLEFT,
              50,
              yCollectionIndex + 24
            )

            eideticBooksInCollection.SetText(missingInCollection)
            eideticCollectionName.SetText(collectionName)

            for (const [bookIndex, bookName] of pairs(eideticData[collectionIndex])) {
              let bookLocation = ""
              const bookData = loreBooksGetNewEideticData(
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

            REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${zo_strformat(
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
    eideticHeaderText.SetText(GetString(SI_TEMPER_LOREBOOKS_RE_THREESHOLD_ERROR))
    REPORT_STATE.copyReport = `${REPORT_STATE.copyReport}\n\n${GetString(SI_TEMPER_LOREBOOKS_RE_THREESHOLD_ERROR)}`
  }
}
