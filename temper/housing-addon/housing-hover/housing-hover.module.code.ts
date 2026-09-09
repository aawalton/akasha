import "@akasha/temper-eso-types/eso-objects-01"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface BackdropEntry {
  backDrop: BackdropControl
}

function asBackdropEntry(value: unknown): BackdropEntry {
  return value as BackdropEntry
}

function bdOnMouseEnter(this: void, index: number): undefined {
  const favorites = portToFriend.controls.favorites
  if (favorites !== undefined && index !== undefined && favorites[index] !== undefined) {
    const line = portToFriend.config.color.backDropLine
    const entry = asBackdropEntry(favorites[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
portToFriend.BdOnMouseEnter = bdOnMouseEnter

function bdOnMouseExit(this: void, index: number): undefined {
  const favorites = portToFriend.controls.favorites
  if (favorites !== undefined && index !== undefined && favorites[index] !== undefined) {
    const line = portToFriend.config.color.backDropLine
    const entry = asBackdropEntry(favorites[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
portToFriend.BdOnMouseExit = bdOnMouseExit

function bdLibraryEntryOnMouseEnter(this: void, index: number): undefined {
  const libraryEntries = portToFriend.controls.libraryEntries
  if (libraryEntries !== undefined && index !== undefined && libraryEntries[index] !== undefined) {
    const line = portToFriend.config.color.backDropLine
    const entry = asBackdropEntry(libraryEntries[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
portToFriend.BdLibraryEntryOnMouseEnter = bdLibraryEntryOnMouseEnter

function bdLibraryEntryOnMouseExit(this: void, index: number): undefined {
  const libraryEntries = portToFriend.controls.libraryEntries
  if (libraryEntries !== undefined && index !== undefined && libraryEntries[index] !== undefined) {
    const line = portToFriend.config.color.backDropLine
    const entry = asBackdropEntry(libraryEntries[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
portToFriend.BdLibraryEntryOnMouseExit = bdLibraryEntryOnMouseExit

function bdMyHousesOnMouseEnter(this: void, index: number): undefined {
  const purchasedHouses = portToFriend.controls.purchasedHouses
  if (
    purchasedHouses !== undefined &&
    index !== undefined &&
    purchasedHouses[index] !== undefined
  ) {
    const line = portToFriend.config.color.backDropLine
    const entry = asBackdropEntry(purchasedHouses[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, line.A)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
portToFriend.BdMyHousesOnMouseEnter = bdMyHousesOnMouseEnter

function bdMyHousesOnMouseExit(this: void, index: number): undefined {
  const purchasedHouses = portToFriend.controls.purchasedHouses
  if (
    purchasedHouses !== undefined &&
    index !== undefined &&
    purchasedHouses[index] !== undefined
  ) {
    const line = portToFriend.config.color.backDropLine
    const entry = asBackdropEntry(purchasedHouses[index])
    entry.backDrop.SetCenterColor(line.R, line.G, line.B, 0.0)
    entry.backDrop.SetEdgeColor(line.R, line.G, line.B, 0.0)
  }
}
portToFriend.BdMyHousesOnMouseExit = bdMyHousesOnMouseExit
