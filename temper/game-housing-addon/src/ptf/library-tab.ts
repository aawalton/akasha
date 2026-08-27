import { PortToFriend } from "./state"
import type { LibraryEntry } from "./types"

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

function GetFilteredLibraryData(this: void): LibraryEntry[] {
  const retVal: LibraryEntry[] = []
  const entries = PortToFriend.libData.GetLibraryData()
  if (PortToFriend.addonState.selectedLibraryFilter === PortToFriend.constants.FILTER_ID_NONE) {
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
        if (categories[j] === PortToFriend.addonState.selectedLibraryFilter) {
          retVal[currentIndex] = entry
          currentIndex = currentIndex + 1
          break
        }
      }
    }
  }
  return PortToFriend.SortFilteredLibraryData(retVal)
}
PortToFriend.GetFilteredLibraryData = GetFilteredLibraryData

function SortFilteredLibraryData(this: void, data: LibraryEntry[]): LibraryEntry[] {
  const retVal: LibraryEntry[] = []
  for (let i = 0; i < data.length; i++) {
    const entry = data[i]
    if (entry === undefined) {
      continue
    }
    retVal[i] = entry
  }
  if (PortToFriend.addonState.selectedLibrarySort === PortToFriend.constants.LIBRARY_SORT_ID_NONE) {
  } else if (
    PortToFriend.addonState.selectedLibrarySort === PortToFriend.constants.LIBRARY_SORT_ID_NAME
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
            const houseA = PortToFriend.HOUSES[a.houseId]
            const houseB = PortToFriend.HOUSES[b.houseId]
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
          const houseA = PortToFriend.HOUSES[a.houseId]
          const houseB = PortToFriend.HOUSES[b.houseId]
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
PortToFriend.SortFilteredLibraryData = SortFilteredLibraryData

function GetCategoryString(this: void, categories: number[]): string {
  let retVal = ""
  const categoryList = PortToFriend.CreateCategoryFilterList()
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
PortToFriend.GetCategoryString = GetCategoryString

function LibraryEntryNoteOnMouseEnter(this: void, index: number, control: Control): undefined {
  const entries = PortToFriend.GetFilteredLibraryData()
  const entry = entries[index]
  if (entry !== undefined && entry.description !== undefined) {
    const description = entry.description
    InitializeTooltip(InformationTooltip, control, BOTTOM, 0, 0)
    SetTooltipText(InformationTooltip, description)
  }
}
PortToFriend.LibraryEntryNoteOnMouseEnter = LibraryEntryNoteOnMouseEnter

function LibraryEntryNoteOnMouseExit(this: void, _index: number): undefined {
  ClearTooltip(InformationTooltip)
}
PortToFriend.LibraryEntryNoteOnMouseExit = LibraryEntryNoteOnMouseExit

function CreateLibraryEntries(this: void): undefined {
  const libData = asLibDataCurrent(PortToFriend.libData)
  if (libData.currentData !== undefined) {
    const entries = PortToFriend.GetFilteredLibraryData()
    const library = asLibraryPanel(PortToFriend.controls.library)
    const color = PortToFriend.config.color
    const headerFont = PortToFriend.config.fonts.header

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i]
      if (entry === undefined) {
        continue
      }
      if (PortToFriend.controls.libraryEntries[i] === undefined) {
        PortToFriend.controls.libraryEntries[i] = {}
      }
      const row = asLibraryEntryRow(PortToFriend.controls.libraryEntries[i])

      if (row.backDrop === undefined) {
        row.backDrop = WINDOW_MANAGER.CreateControl(undefined, library.scrollPanel, CT_BACKDROP)
      }
      const backDrop = row.backDrop
      backDrop.SetDimensions(PortToFriend.config.size.width - 30, 25)
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
        PortToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      nameLabel.SetHandler("OnMouseExit", () => {
        PortToFriend.BdLibraryEntryOnMouseExit(i)
      })

      if (row.house === undefined) {
        row.house = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const houseLabel = row.house
      houseLabel.SetDimensions(270, 25)
      houseLabel.SetHidden(false)
      houseLabel.ClearAnchors()
      houseLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 215, 0)
      houseLabel.SetText(asString(PortToFriend.HOUSES[entry.houseId]))
      houseLabel.SetFont(headerFont)
      houseLabel.SetColor(color.default.R, color.default.G, color.default.B)
      houseLabel.SetMouseEnabled(true)
      houseLabel.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      houseLabel.SetHandler("OnMouseExit", () => {
        PortToFriend.BdLibraryEntryOnMouseExit(i)
      })

      if (row.category === undefined) {
        row.category = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const categoryLabel = row.category
      categoryLabel.SetDimensions(175, 25)
      categoryLabel.SetHidden(false)
      categoryLabel.ClearAnchors()
      categoryLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 490, 0)
      categoryLabel.SetText(PortToFriend.GetCategoryString(entry.category))
      categoryLabel.SetFont(headerFont)
      categoryLabel.SetColor(color.default.R, color.default.G, color.default.B)
      categoryLabel.SetMouseEnabled(true)
      categoryLabel.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      categoryLabel.SetHandler("OnMouseExit", () => {
        PortToFriend.BdLibraryEntryOnMouseExit(i)
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
        PortToFriend.BdLibraryEntryOnMouseEnter(i)
        PortToFriend.LibraryEntryNoteOnMouseEnter(i, noteButton)
      })
      noteButton.SetHandler("OnMouseExit", () => {
        PortToFriend.BdLibraryEntryOnMouseExit(i)
        PortToFriend.LibraryEntryNoteOnMouseExit(i)
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
      portButton.SetText(asString(PortToFriend.constants.BUTTON_PORT))
      portButton.SetClickSound("Click")
      portButton.SetHandler("OnClicked", () => {
        PortToFriend.PortToLibraryEntry(i)
      })
      portButton.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdLibraryEntryOnMouseEnter(i)
      })
      portButton.SetHandler("OnMouseExit", () => {
        PortToFriend.BdLibraryEntryOnMouseExit(i)
      })
    }

    library.scrollPanel.SetDimensions(PortToFriend.config.size.width - 10, entries.length * 25 + 15)
  } else {
  }
  PortToFriend.AdjustLibrarySliderSize()
}
PortToFriend.CreateLibraryEntries = CreateLibraryEntries
