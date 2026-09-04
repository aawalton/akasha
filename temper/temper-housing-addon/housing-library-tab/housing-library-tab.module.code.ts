import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-extra"
import "@akasha/temper-eso-types/eso-interface-extra-2"
import "@akasha/temper-eso-types/eso-objects-01"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"
import type { LibraryEntry } from "../housing-types/housing-types.module.code.ts"

interface LibDataCurrent {
  currentData: LibraryEntry[] | undefined
}
function asLibDataCurrent(value: unknown): LibDataCurrent {
  return value as LibDataCurrent
}

interface LibraryPanel {
  scrollPanel: Control
}
function asLibraryPanel(value: unknown): LibraryPanel {
  return value as LibraryPanel
}

interface LibraryEntryRow {
  backDrop?: BackdropControl
  name?: LabelControl
  house?: LabelControl
  category?: LabelControl
  noteTexture?: TextureControl
  noteButton?: LabelControl
  portButton?: ButtonControl
}
function asLibraryEntryRow(value: unknown): LibraryEntryRow {
  return value as LibraryEntryRow
}

interface VirtualButtonFactory {
  CreateControlFromVirtual: (
    this: VirtualButtonFactory,
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ) => ButtonControl
}
function asVirtualButtonFactory(value: unknown): VirtualButtonFactory {
  return value as VirtualButtonFactory
}

function asString(value: unknown): string {
  return value as string
}

interface FiveArgEdge {
  SetEdgeColor: (
    this: FiveArgEdge,
    r: number,
    g: number,
    b: number,
    a: number,
    inner: number
  ) => void
}
function asFiveArgEdge(value: unknown): FiveArgEdge {
  return value as FiveArgEdge
}

function getFilteredLibraryData(this: void): LibraryEntry[] {
  const retVal: LibraryEntry[] = []
  const entries = portToFriend.libData.GetLibraryData()
  if (portToFriend.addonState.selectedLibraryFilter === portToFriend.constants.FILTER_ID_NONE) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry === undefined) {
        continue
      }
      retVal[i] = entry
    }
  } else {
    let currentIndex = 0
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry === undefined) {
        continue
      }
      const categories = entry.category
      for (let j = 0; j < categories.length; j++) {
        if (categories[j] === portToFriend.addonState.selectedLibraryFilter) {
          retVal[currentIndex] = entry
          currentIndex = currentIndex + 1
          break
        }
      }
    }
  }
  return portToFriend.SortFilteredLibraryData(retVal)
}
portToFriend.GetFilteredLibraryData = getFilteredLibraryData

function sortFilteredLibraryData(this: void, data: LibraryEntry[]): LibraryEntry[] {
  const retVal: LibraryEntry[] = []
  for (let i = 0; i < data.length; i++) {
    const entry = data[i]
    if (entry === undefined) {
      continue
    }
    retVal[i] = entry
  }
  if (portToFriend.addonState.selectedLibrarySort === portToFriend.constants.LIBRARY_SORT_ID_NONE) {
  } else if (
    portToFriend.addonState.selectedLibrarySort === portToFriend.constants.LIBRARY_SORT_ID_NAME
  ) {
    if (data.length > 1) {
      let itemCount = retVal.length
      let hasChanged: boolean
      do {
        hasChanged = false
        itemCount = itemCount - 1
        for (let i = 0; i < itemCount; i++) {
          const a = retVal[i]
          const b = retVal[i + 1]
          if (a === undefined || b === undefined) {
            continue
          }
          if (a.name > b.name) {
            retVal[i] = b
            retVal[i + 1] = a
            hasChanged = true
          } else if (a.name === b.name) {
            const houseA = portToFriend.HOUSES[a.houseId]
            const houseB = portToFriend.HOUSES[b.houseId]
            if (houseA !== undefined && houseB !== undefined && houseA > houseB) {
              retVal[i] = b
              retVal[i + 1] = a
              hasChanged = true
            }
          }
        }
      } while (hasChanged !== false)
    }
  } else {
    if (data.length > 1) {
      let itemCount = retVal.length
      let hasChanged: boolean
      do {
        hasChanged = false
        itemCount = itemCount - 1
        for (let i = 0; i < itemCount; i++) {
          const a = retVal[i]
          const b = retVal[i + 1]
          if (a === undefined || b === undefined) {
            continue
          }
          const houseA = portToFriend.HOUSES[a.houseId]
          const houseB = portToFriend.HOUSES[b.houseId]
          if (houseA !== undefined && houseB !== undefined && houseA > houseB) {
            retVal[i] = b
            retVal[i + 1] = a
            hasChanged = true
          } else if (houseA === houseB) {
            if (a.name > b.name) {
              retVal[i] = b
              retVal[i + 1] = a
              hasChanged = true
            }
          }
        }
      } while (hasChanged !== false)
    }
  }
  return retVal
}
portToFriend.SortFilteredLibraryData = sortFilteredLibraryData

function getCategoryString(this: void, categories: number[]): string {
  let retVal = ""
  const categoryList = portToFriend.CreateCategoryFilterList()
  if (categories !== undefined) {
    for (let i = 0; i < categories.length; i++) {
      const categoryId = categories[i]
      if (categoryId === undefined) {
        continue
      }
      const label = categoryList[categoryId]
      if (i !== categories.length - 1) {
        if (label !== undefined) {
          retVal = retVal + label + ", "
        }
      } else {
        if (label !== undefined) {
          retVal = retVal + label
        }
      }
    }
  }
  return retVal
}
portToFriend.GetCategoryString = getCategoryString

function libraryEntryNoteOnMouseEnter(this: void, index: number, control: Control): undefined {
  const entries = portToFriend.GetFilteredLibraryData()
  const entry = entries[index]
  if (entry !== undefined && entry.description !== undefined) {
    const description = entry.description
    InitializeTooltip(InformationTooltip, control, BOTTOM, 0, 0)
    SetTooltipText(InformationTooltip, description)
  }
}
portToFriend.LibraryEntryNoteOnMouseEnter = libraryEntryNoteOnMouseEnter

function libraryEntryNoteOnMouseExit(this: void, _index: number): undefined {
  ClearTooltip(InformationTooltip)
}
portToFriend.LibraryEntryNoteOnMouseExit = libraryEntryNoteOnMouseExit

function createLibraryEntries(this: void): undefined {
  const libData = asLibDataCurrent(portToFriend.libData)
  if (libData.currentData !== undefined) {
    const entries = portToFriend.GetFilteredLibraryData()
    const library = asLibraryPanel(portToFriend.controls.library)
    const color = portToFriend.config.color
    const headerFont = portToFriend.config.fonts.header

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry === undefined) {
        continue
      }
      if (portToFriend.controls.libraryEntries[i] === undefined) {
        portToFriend.controls.libraryEntries[i] = {}
      }
      const row = asLibraryEntryRow(portToFriend.controls.libraryEntries[i])

      if (row.backDrop === undefined) {
        row.backDrop = WINDOW_MANAGER.CreateControl(undefined, library.scrollPanel, CT_BACKDROP)
      }
      const backDrop = row.backDrop
      backDrop.SetDimensions(portToFriend.config.size.width - 30, 25)
      backDrop.SetHidden(false)
      backDrop.ClearAnchors()
      backDrop.SetAnchor(TOPLEFT, library.scrollPanel, TOPLEFT, 5, 25 * i + 15)
      backDrop.SetCenterColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
      asFiveArgEdge(backDrop).SetEdgeColor(
        color.backDropLine.R,
        color.backDropLine.G,
        color.backDropLine.B,
        0.0,
        0
      )
      backDrop.SetAlpha(1)

      if (row.name === undefined) {
        row.name = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const nameLabel = row.name
      nameLabel.SetDimensions(215, 25)
      nameLabel.SetHidden(false)
      nameLabel.ClearAnchors()
      nameLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 0, 0)
      nameLabel.SetText(entry.name)
      nameLabel.SetFont(headerFont)
      nameLabel.SetColor(color.default.R, color.default.G, color.default.B)
      nameLabel.SetMouseEnabled(true)
      nameLabel.SetHandler("OnMouseEnter", () => {
        portToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      nameLabel.SetHandler("OnMouseExit", () => {
        portToFriend.BdLibraryEntryOnMouseExit(i)
      })

      if (row.house === undefined) {
        row.house = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const houseLabel = row.house
      houseLabel.SetDimensions(270, 25)
      houseLabel.SetHidden(false)
      houseLabel.ClearAnchors()
      houseLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 215, 0)
      houseLabel.SetText(asString(portToFriend.HOUSES[entry.houseId]))
      houseLabel.SetFont(headerFont)
      houseLabel.SetColor(color.default.R, color.default.G, color.default.B)
      houseLabel.SetMouseEnabled(true)
      houseLabel.SetHandler("OnMouseEnter", () => {
        portToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      houseLabel.SetHandler("OnMouseExit", () => {
        portToFriend.BdLibraryEntryOnMouseExit(i)
      })

      if (row.category === undefined) {
        row.category = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const categoryLabel = row.category
      categoryLabel.SetDimensions(175, 25)
      categoryLabel.SetHidden(false)
      categoryLabel.ClearAnchors()
      categoryLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 490, 0)
      categoryLabel.SetText(portToFriend.GetCategoryString(entry.category))
      categoryLabel.SetFont(headerFont)
      categoryLabel.SetColor(color.default.R, color.default.G, color.default.B)
      categoryLabel.SetMouseEnabled(true)
      categoryLabel.SetHandler("OnMouseEnter", () => {
        portToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      categoryLabel.SetHandler("OnMouseExit", () => {
        portToFriend.BdLibraryEntryOnMouseExit(i)
      })

      if (row.noteTexture === undefined) {
        row.noteTexture = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_TEXTURE)
      }
      const noteTexture = row.noteTexture
      noteTexture.ClearAnchors()
      noteTexture.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 660, 0)
      noteTexture.SetDimensions(25, 25)
      noteTexture.SetTexture("EsoUI/Art/Contacts/social_note_up.dds")

      if (row.noteButton === undefined) {
        row.noteButton = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const noteButton = row.noteButton
      noteButton.SetMouseEnabled(true)
      noteButton.ClearAnchors()
      noteButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 660, 0)
      noteButton.SetDimensions(25, 25)
      noteButton.SetHandler("OnMouseEnter", () => {
        portToFriend.BdLibraryEntryOnMouseEnter(i)
        portToFriend.LibraryEntryNoteOnMouseEnter(i, noteButton)
      })
      noteButton.SetHandler("OnMouseExit", () => {
        portToFriend.BdLibraryEntryOnMouseExit(i)
        portToFriend.LibraryEntryNoteOnMouseExit(i)
      })

      if (entry.description !== undefined && zo_strtrim(entry.description) !== "") {
        categoryLabel.SetDimensions(175, 25)
        noteTexture.SetHidden(false)
        noteButton.SetHidden(false)
      } else {
        categoryLabel.SetDimensions(195, 25)
        noteTexture.SetHidden(true)
        noteButton.SetHidden(true)
      }

      if (row.portButton === undefined) {
        row.portButton = asVirtualButtonFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          backDrop,
          "ZO_DefaultButton"
        )
      }
      const portButton = row.portButton
      portButton.SetHidden(false)
      portButton.ClearAnchors()
      portButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 675, 0)
      portButton.SetDimensions(90, 25)
      portButton.SetText(asString(portToFriend.constants.BUTTON_PORT))
      portButton.SetClickSound("Click")
      portButton.SetHandler("OnClicked", () => {
        portToFriend.PortToLibraryEntry(i)
      })
      portButton.SetHandler("OnMouseEnter", () => {
        portToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      portButton.SetHandler("OnMouseExit", () => {
        portToFriend.BdLibraryEntryOnMouseExit(i)
      })
    }

    library.scrollPanel.SetDimensions(portToFriend.config.size.width - 10, entries.length * 25 + 15)
  } else {
  }
  portToFriend.AdjustLibrarySliderSize()
}
portToFriend.CreateLibraryEntries = createLibraryEntries
