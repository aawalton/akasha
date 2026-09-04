import "@akasha/temper-eso-types/eso-extra"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"
import { asVcControls } from "../housing-visit-cards-view/housing-visit-cards-view.module.code.ts"

function vcBdOnMouseEnter(this: void, index: number): undefined {
  const vc = asVcControls(portToFriend.controls.vc)
  const entry = vc.cardEntry !== undefined ? vc.cardEntry[index - 1] : undefined
  if (
    index !== undefined &&
    index > 0 &&
    portToFriend.controls.vc !== undefined &&
    vc.cardEntry !== undefined &&
    entry !== undefined &&
    entry.backdrop !== undefined
  ) {
    const backdrop = entry.backdrop
    const color = portToFriend.config.color
    if (index !== portToFriend.addonState.selectedVisitCard) {
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
    portToFriend.addonState.highlightedVisitCard = index
  }
}
portToFriend.VCBdOnMouseEnter = vcBdOnMouseEnter

function vcBdOnMouseExit(this: void, index: number): undefined {
  const vc = asVcControls(portToFriend.controls.vc)
  const entry = vc.cardEntry !== undefined ? vc.cardEntry[index - 1] : undefined
  if (
    index !== undefined &&
    index > 0 &&
    portToFriend.controls.vc !== undefined &&
    vc.cardEntry !== undefined &&
    entry !== undefined &&
    entry.backdrop !== undefined
  ) {
    const backdrop = entry.backdrop
    const color = portToFriend.config.color
    if (index !== portToFriend.addonState.selectedVisitCard) {
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
    portToFriend.addonState.highlightedVisitCard = undefined
  }
}
portToFriend.VCBdOnMouseExit = vcBdOnMouseExit

function vcBdOnClick(this: void, index: number): undefined {
  if (index !== undefined && tonumber(index) !== undefined) {
    if (portToFriend.savedVars === undefined) {
      return
    }
    const vc = asVcControls(portToFriend.controls.vc)
    const card = portToFriend.savedVars.vc.receivedCards[index - 1]
    if (card === undefined) {
      return
    }
    vc.nameLabel.SetText((portToFriend.constants.VC_PLAYER ?? "") + card.name)
    vc.houseLabel.SetText(
      (portToFriend.constants.VC_HOUSE ?? "") + portToFriend.HOUSES[card.houseId]
    )
    portToFriend.addonState.selectedVisitCard = index
    if (portToFriend.controls.vc !== undefined && vc.cardEntry !== undefined) {
      for (let i = 1; i <= vc.cardEntry.length; i = i + 1) {
        portToFriend.VCBdOnMouseExit(i)
      }
    }
    portToFriend.VCBdOnMouseEnter(index)
    vc.addFavoriteButton.SetEnabled(true)
    vc.vcButton.SetEnabled(true)
    vc.portButton.SetEnabled(true)
    vc.removeButton.SetEnabled(true)
  }
}
portToFriend.VCBdOnClick = vcBdOnClick

function vcAddFavorite(this: void): undefined {
  if (
    portToFriend.addonState.selectedVisitCard !== undefined &&
    portToFriend.addonState.selectedVisitCard > 0 &&
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined &&
    portToFriend.addonState.selectedVisitCard <= portToFriend.savedVars.vc.receivedCards.length
  ) {
    const card =
      portToFriend.savedVars.vc.receivedCards[portToFriend.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    portToFriend.AddFavorite(name, houseId)
  }
}
portToFriend.VCAddFavorite = vcAddFavorite

function vcSendVC(this: void): undefined {
  if (
    portToFriend.addonState.selectedVisitCard !== undefined &&
    portToFriend.addonState.selectedVisitCard > 0 &&
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined &&
    portToFriend.addonState.selectedVisitCard <= portToFriend.savedVars.vc.receivedCards.length
  ) {
    const card =
      portToFriend.savedVars.vc.receivedCards[portToFriend.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    if (name !== undefined && houseId !== undefined) {
      portToFriend.SendVisitCardOf(name, houseId, portToFriend.constants.sendBasicComment)
    }
  }
}
portToFriend.VCSendVC = vcSendVC

function vcPort(this: void): undefined {
  if (
    portToFriend.addonState.selectedVisitCard !== undefined &&
    portToFriend.addonState.selectedVisitCard > 0 &&
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined &&
    portToFriend.addonState.selectedVisitCard <= portToFriend.savedVars.vc.receivedCards.length
  ) {
    const card =
      portToFriend.savedVars.vc.receivedCards[portToFriend.addonState.selectedVisitCard - 1]
    if (card === undefined) {
      return
    }
    const name = card.name
    const houseId = card.houseId
    if (name !== undefined && houseId !== undefined) {
      const numericHouseId = tonumber(houseId)
      if (numericHouseId !== undefined) {
        portToFriend.JumpToHouse(zo_strtrim(name), numericHouseId)
      }
      if (portToFriend.savedVars.port_mode === portToFriend.constants.PORT_MODE_ON_CLICK) {
        portToFriend.CloseWindow()
      }
    }
  }
}
portToFriend.VCPort = vcPort

function vcRemoveVC(this: void): undefined {
  if (
    portToFriend.addonState.selectedVisitCard !== undefined &&
    portToFriend.addonState.selectedVisitCard > 0 &&
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined &&
    portToFriend.addonState.selectedVisitCard <= portToFriend.savedVars.vc.receivedCards.length
  ) {
    const vc = asVcControls(portToFriend.controls.vc)
    portToFriend.savedVars.vc.receivedCards.splice(portToFriend.addonState.selectedVisitCard - 1, 1)
    portToFriend.addonState.taintedVisitCards = true
    portToFriend.addonState.selectedVisitCard = -1
    vc.nameLabel.SetText(portToFriend.constants.VC_PLAYER ?? "")
    vc.houseLabel.SetText(portToFriend.constants.VC_HOUSE ?? "")
    vc.addFavoriteButton.SetEnabled(false)
    vc.vcButton.SetEnabled(false)
    vc.portButton.SetEnabled(false)
    vc.removeButton.SetEnabled(false)
    portToFriend.UpdateVisitCardList()
  }
}
portToFriend.VCRemoveVC = vcRemoveVC
