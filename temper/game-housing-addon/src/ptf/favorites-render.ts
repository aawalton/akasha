import { PortToFriend } from "./state"
import type { Favorite } from "./types"

interface HousePanel {
  scrollPanel: Control
}
function asHousePanel(value: unknown): HousePanel {
  return value as HousePanel
}

interface FavoriteRow {
  backDrop?: BackdropControl
  name?: LabelControl
  house?: LabelControl
  VCButton?: ButtonControl
  portButton?: ButtonControl
  removeButton?: ButtonControl
}
function asFavoriteRow(value: unknown): FavoriteRow {
  return value as FavoriteRow
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

interface SavedFavorites {
  favorites: Favorite[] | undefined
}
function asSavedFavorites(value: unknown): SavedFavorites {
  return value as SavedFavorites
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

function CreateFavorites(this: void): undefined {
  const savedVars = asSavedFavorites(PortToFriend.savedVars)
  if (savedVars.favorites !== undefined) {
    PortToFriend.SortFriends()
    const favorites = savedVars.favorites
    const house = asHousePanel(PortToFriend.controls.house)
    const color = PortToFriend.config.color
    const headerFont = PortToFriend.config.fonts.header

    for (let i = 0; i < favorites.length; i++) {
      const favorite = favorites[i]
      if (favorite === undefined) {
        continue
      }
      if (PortToFriend.controls.favorites[i] === undefined) {
        PortToFriend.controls.favorites[i] = {}
      }
      const row = asFavoriteRow(PortToFriend.controls.favorites[i])

      if (row.backDrop === undefined) {
        row.backDrop = WINDOW_MANAGER.CreateControl(undefined, house.scrollPanel, CT_BACKDROP)
      }
      const backDrop = row.backDrop
      backDrop.SetDimensions(PortToFriend.config.size.width - 30, 25)
      backDrop.SetHidden(false)
      backDrop.ClearAnchors()
      backDrop.SetAnchor(TOPLEFT, house.scrollPanel, TOPLEFT, 5, 25 * i + 15)
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
      nameLabel.SetDimensions(220, 25)
      nameLabel.SetHidden(false)
      nameLabel.ClearAnchors()
      nameLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 0, 0)
      nameLabel.SetText(favorite.name)
      nameLabel.SetFont(headerFont)
      nameLabel.SetColor(color.default.R, color.default.G, color.default.B)
      nameLabel.SetMouseEnabled(true)
      nameLabel.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdOnMouseEnter(i)
      })
      nameLabel.SetHandler("OnMouseExit", () => {
        PortToFriend.BdOnMouseExit(i)
      })

      if (row.house === undefined) {
        row.house = WINDOW_MANAGER.CreateControl(undefined, backDrop, CT_LABEL)
      }
      const houseLabel = row.house
      houseLabel.SetDimensions(265, 25)
      houseLabel.SetHidden(false)
      houseLabel.ClearAnchors()
      houseLabel.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 215, 0)
      houseLabel.SetText(asString(PortToFriend.HOUSES[favorite.houseId]))
      houseLabel.SetFont(headerFont)
      houseLabel.SetColor(color.default.R, color.default.G, color.default.B)
      houseLabel.SetMouseEnabled(true)
      houseLabel.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdOnMouseEnter(i)
      })
      houseLabel.SetHandler("OnMouseExit", () => {
        PortToFriend.BdOnMouseExit(i)
      })

      PortToFriend.CreateFavoriteCombobox(i, 60, 25, 480, 0, backDrop, favorite.id)

      if (row.VCButton === undefined) {
        row.VCButton = asVirtualButtonFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          backDrop,
          "ZO_DefaultButton"
        )
      }
      const vcButton = row.VCButton
      vcButton.SetHidden(false)
      vcButton.ClearAnchors()
      vcButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 540, 0)
      vcButton.SetDimensions(50, 25)
      vcButton.SetText(asString(PortToFriend.constants.BUTTON_VC))
      vcButton.SetClickSound("Click")
      vcButton.SetHandler("OnClicked", () => {
        PortToFriend.FavoriteToVC(i)
      })
      vcButton.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdOnMouseEnter(i)
      })
      vcButton.SetHandler("OnMouseExit", () => {
        PortToFriend.BdOnMouseExit(i)
      })

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
      portButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 580, 0)
      portButton.SetDimensions(90, 25)
      portButton.SetText(asString(PortToFriend.constants.BUTTON_PORT))
      portButton.SetClickSound("Click")
      portButton.SetHandler("OnClicked", () => {
        PortToFriend.PortToFavorite(i)
      })
      portButton.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdOnMouseEnter(i)
      })
      portButton.SetHandler("OnMouseExit", () => {
        PortToFriend.BdOnMouseExit(i)
      })

      if (row.removeButton === undefined) {
        row.removeButton = asVirtualButtonFactory(WINDOW_MANAGER).CreateControlFromVirtual(
          undefined,
          backDrop,
          "ZO_DefaultButton"
        )
      }
      const removeButton = row.removeButton
      removeButton.SetHidden(false)
      removeButton.ClearAnchors()
      removeButton.SetAnchor(TOPLEFT, backDrop, TOPLEFT, 670, 0)
      removeButton.SetDimensions(90, 25)
      removeButton.SetText(asString(PortToFriend.constants.BUTTON_REMOVE))
      removeButton.SetClickSound("Click")
      removeButton.SetHandler("OnClicked", () => {
        PortToFriend.RemoveFavorite(i)
      })
      removeButton.SetHandler("OnMouseEnter", () => {
        PortToFriend.BdOnMouseEnter(i)
      })
      removeButton.SetHandler("OnMouseExit", () => {
        PortToFriend.BdOnMouseExit(i)
      })
    }
    house.scrollPanel.SetDimensions(PortToFriend.config.size.width - 10, favorites.length * 25 + 15)
    PortToFriend.ClearFavoriteControls(favorites.length)
  } else {
    PortToFriend.ClearFavoriteControls(0)
  }
  PortToFriend.AdjustSliderSize()
}
PortToFriend.CreateFavorites = CreateFavorites
