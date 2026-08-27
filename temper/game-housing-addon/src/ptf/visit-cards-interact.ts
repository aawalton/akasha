import { PortToFriend } from "./state"
import { asVcControls } from "./visit-cards-view"

function VCBdOnMouseEnter(this: void, index: number): undefined {
  const vc = asVcControls(PortToFriend.controls.vc)
  const entry = vc.cardEntry !== undefined ? vc.cardEntry[index - 1] : undefined
  if (
    index !== undefined &&
    index > 0 &&
    PortToFriend.controls.vc !== undefined &&
    vc.cardEntry !== undefined &&
    entry !== undefined &&
    entry.backdrop !== undefined
  ) {
    const backdrop = entry.backdrop
    const color = PortToFriend.config.color
    if (index !== PortToFriend.addonState.selectedVisitCard) {
      backdrop.SetCenterColor(
        color.backDropLine.R,
        color.backDropLine.G,
        color.backDropLine.B,
        color.backDropLine.A
      )
      backdrop.SetEdgeColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
    } else {
      backdrop.SetCenterColor(
        color.selectedVisitCardColorOnMouseOver.R,
        color.selectedVisitCardColorOnMouseOver.G,
        color.selectedVisitCardColorOnMouseOver.B,
        color.selectedVisitCardColorOnMouseOver.A
      )
      backdrop.SetEdgeColor(
        color.selectedVisitCardColorOnMouseOver.R,
        color.selectedVisitCardColorOnMouseOver.G,
        color.selectedVisitCardColorOnMouseOver.B,
        0.0
      )
    }
    PortToFriend.addonState.highlightedVisitCard = index
  }
}
PortToFriend.VCBdOnMouseEnter = VCBdOnMouseEnter

function VCBdOnMouseExit(this: void, index: number): undefined {
  const vc = asVcControls(PortToFriend.controls.vc)
  const entry = vc.cardEntry !== undefined ? vc.cardEntry[index - 1] : undefined
  if (
    index !== undefined &&
    index > 0 &&
    PortToFriend.controls.vc !== undefined &&
    vc.cardEntry !== undefined &&
    entry !== undefined &&
    entry.backdrop !== undefined
  ) {
    const backdrop = entry.backdrop
    const color = PortToFriend.config.color
    if (index !== PortToFriend.addonState.selectedVisitCard) {
      backdrop.SetCenterColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
      backdrop.SetEdgeColor(color.backDropLine.R, color.backDropLine.G, color.backDropLine.B, 0.0)
    } else {
      backdrop.SetCenterColor(
        color.selectedVisitCardColor.R,
        color.selectedVisitCardColor.G,
        color.selectedVisitCardColor.B,
        color.selectedVisitCardColor.A
      )
      backdrop.SetEdgeColor(
        color.selectedVisitCardColor.R,
        color.selectedVisitCardColor.G,
        color.selectedVisitCardColor.B,
        0.0
      )
    }
    PortToFriend.addonState.highlightedVisitCard = undefined
  }
}
PortToFriend.VCBdOnMouseExit = VCBdOnMouseExit

function VCBdOnClick(this: void, index: number): undefined {
  if (index !== undefined && tonumber(index) !== undefined) {
    if (PortToFriend.savedVars === undefined) {
      return
    }
    const vc = asVcControls(PortToFriend.controls.vc)
    const card = PortToFriend.savedVars.vc.receivedCards[index - 1]
    if (card === undefined) {
      return
    }
    vc.nameLabel.SetText((PortToFriend.constants.VC_PLAYER ?? "") + card.name)
    vc.houseLabel.SetText(
      (PortToFriend.constants.VC_HOUSE ?? "") + PortToFriend.HOUSES[card.houseId]
    )
    PortToFriend.addonState.selectedVisitCard = index
    if (PortToFriend.controls.vc !== undefined && vc.cardEntry !== undefined) {
      for (let i = 1; i <= vc.cardEntry.length; i = i + 1) {
        PortToFriend.VCBdOnMouseExit(i)
      }
    }
    PortToFriend.VCBdOnMouseEnter(index)
    vc.addFavoriteButton.SetEnabled(true)
    vc.vcButton.SetEnabled(true)
    vc.portButton.SetEnabled(true)
    vc.removeButton.SetEnabled(true)
  }
}
PortToFriend.VCBdOnClick = VCBdOnClick

function VCAddFavorite(this: void): undefined {
  if (
    PortToFriend.addonState.selectedVisitCard !== undefined &&
    PortToFriend.addonState.selectedVisitCard > 0 &&
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined &&
    PortToFriend.addonState.selectedVisitCard <= PortToFriend.savedVars.vc.receivedCards.length
  ) {
    const card =
      PortToFriend.savedVars.vc.receivedCards[PortToFriend.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    PortToFriend.AddFavorite(name, houseId)
  }
}
PortToFriend.VCAddFavorite = VCAddFavorite

function VCSendVC(this: void): undefined {
  if (
    PortToFriend.addonState.selectedVisitCard !== undefined &&
    PortToFriend.addonState.selectedVisitCard > 0 &&
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined &&
    PortToFriend.addonState.selectedVisitCard <= PortToFriend.savedVars.vc.receivedCards.length
  ) {
    const card =
      PortToFriend.savedVars.vc.receivedCards[PortToFriend.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    if (name !== undefined && houseId !== undefined) {
      PortToFriend.SendVisitCardOf(name, houseId, PortToFriend.constants.sendBasicComment)
    }
  }
}
PortToFriend.VCSendVC = VCSendVC

function VCPort(this: void): undefined {
  if (
    PortToFriend.addonState.selectedVisitCard !== undefined &&
    PortToFriend.addonState.selectedVisitCard > 0 &&
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined &&
    PortToFriend.addonState.selectedVisitCard <= PortToFriend.savedVars.vc.receivedCards.length
  ) {
    const card =
      PortToFriend.savedVars.vc.receivedCards[PortToFriend.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    if (name !== undefined && houseId !== undefined) {
      const numericHouseId = tonumber(houseId)
      if (numericHouseId !== undefined) {
        PortToFriend.JumpToHouse(zo_strtrim(name), numericHouseId)
      }
      if (PortToFriend.savedVars.port_mode === PortToFriend.constants.PORT_MODE_ON_CLICK) {
        PortToFriend.CloseWindow()
      }
    }
  }
}
PortToFriend.VCPort = VCPort

function VCRemoveVC(this: void): undefined {
  if (
    PortToFriend.addonState.selectedVisitCard !== undefined &&
    PortToFriend.addonState.selectedVisitCard > 0 &&
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined &&
    PortToFriend.addonState.selectedVisitCard <= PortToFriend.savedVars.vc.receivedCards.length
  ) {
    const vc = asVcControls(PortToFriend.controls.vc)
    PortToFriend.savedVars.vc.receivedCards.splice(PortToFriend.addonState.selectedVisitCard - 1, 1)
    PortToFriend.addonState.taintedVisitCards = true
    PortToFriend.addonState.selectedVisitCard = -1
    vc.nameLabel.SetText(PortToFriend.constants.VC_PLAYER ?? "")
    vc.houseLabel.SetText(PortToFriend.constants.VC_HOUSE ?? "")
    vc.addFavoriteButton.SetEnabled(false)
    vc.vcButton.SetEnabled(false)
    vc.portButton.SetEnabled(false)
    vc.removeButton.SetEnabled(false)
    PortToFriend.UpdateVisitCardList()
  }
}
PortToFriend.VCRemoveVC = VCRemoveVC
