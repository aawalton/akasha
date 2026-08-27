import { PortToFriend } from "./state"

interface BackdropEntry {
  backDrop: BackdropControl
}

function asBackdropEntry(value: unknown): BackdropEntry {
  return value as BackdropEntry
}

function BdOnMouseEnter(this: void, index: number): undefined {
  const favorites = PortToFriend.controls.favorites
  if (favorites !== undefined && index !== undefined && favorites[index] !== undefined) {
    const line = PortToFriend.config.color.backDropLine
    const entry = asBackdropEntry(favorites[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
PortToFriend.BdOnMouseEnter = BdOnMouseEnter

function BdOnMouseExit(this: void, index: number): undefined {
  const favorites = PortToFriend.controls.favorites
  if (favorites !== undefined && index !== undefined && favorites[index] !== undefined) {
    const line = PortToFriend.config.color.backDropLine
    const entry = asBackdropEntry(favorites[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
PortToFriend.BdOnMouseExit = BdOnMouseExit

function BdLibraryEntryOnMouseEnter(this: void, index: number): undefined {
  const libraryEntries = PortToFriend.controls.libraryEntries
  if (libraryEntries !== undefined && index !== undefined && libraryEntries[index] !== undefined) {
    const line = PortToFriend.config.color.backDropLine
    const entry = asBackdropEntry(libraryEntries[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
PortToFriend.BdLibraryEntryOnMouseEnter = BdLibraryEntryOnMouseEnter

function BdLibraryEntryOnMouseExit(this: void, index: number): undefined {
  const libraryEntries = PortToFriend.controls.libraryEntries
  if (libraryEntries !== undefined && index !== undefined && libraryEntries[index] !== undefined) {
    const line = PortToFriend.config.color.backDropLine
    const entry = asBackdropEntry(libraryEntries[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
PortToFriend.BdLibraryEntryOnMouseExit = BdLibraryEntryOnMouseExit

function BdMyHousesOnMouseEnter(this: void, index: number): undefined {
  const purchasedHouses = PortToFriend.controls.purchasedHouses
  if (
    purchasedHouses !== undefined &&
    index !== undefined &&
    purchasedHouses[index] !== undefined
  ) {
    const line = PortToFriend.config.color.backDropLine
    const entry = asBackdropEntry(purchasedHouses[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
PortToFriend.BdMyHousesOnMouseEnter = BdMyHousesOnMouseEnter

function BdMyHousesOnMouseExit(this: void, index: number): undefined {
  const purchasedHouses = PortToFriend.controls.purchasedHouses
  if (
    purchasedHouses !== undefined &&
    index !== undefined &&
    purchasedHouses[index] !== undefined
  ) {
    const line = PortToFriend.config.color.backDropLine
    const entry = asBackdropEntry(purchasedHouses[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
PortToFriend.BdMyHousesOnMouseExit = BdMyHousesOnMouseExit
