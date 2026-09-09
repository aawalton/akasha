import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"
import type { VisitCard } from "../housing-types/housing-types.module.code.ts"
import {
  asControl,
  asVcBackdropControl,
  asVcControls,
  asVcEntryButton,
} from "../housing-visit-cards-view/housing-visit-cards-view.module.code.ts"

const wm = WINDOW_MANAGER

type VcIndex = number
function asVcIndex(value: number | undefined): VcIndex {
  return value as VcIndex
}

function sortVisitCards(this: void): undefined {
  if (
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    const cards = portToFriend.savedVars.vc.receivedCards
    let itemCount = cards.length
    let hasChanged = false
    do {
      hasChanged = false
      itemCount = itemCount - 1
      for (let i = 0; i < itemCount; i = i + 1) {
        const current = cards[i]
        const next = cards[i + 1]
        if (current === undefined || next === undefined) {
          continue
        }
        if (current.name > next.name) {
          cards[i] = next
          cards[i + 1] = current
          hasChanged = true
        } else if (current.name === next.name) {
          const currentHouse = portToFriend.HOUSES[current.houseId]
          const nextHouse = portToFriend.HOUSES[next.houseId]
          if (currentHouse !== undefined && nextHouse !== undefined && currentHouse > nextHouse) {
            cards[i] = next
            cards[i + 1] = current
            hasChanged = true
          }
        }
      }
    } while (hasChanged !== false)
    return undefined
  }
  return undefined
}
portToFriend.SortVisitCards = sortVisitCards

function refreshVisitCards(this: void): undefined {
  if (
    portToFriend.controls.vc !== undefined &&
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    const vc = asVcControls(portToFriend.controls.vc)
    const receivedCards = portToFriend.savedVars.vc.receivedCards
    if (vc.cardEntry === undefined) {
      vc.cardEntry = []
    }
    const cardEntry = vc.cardEntry
    const color = portToFriend.config.color
    const scrollPanel = asControl(vc.scrollPanel)
    for (let i = 0; i < receivedCards.length; i = i + 1) {
      const cardNumber = i + 1
      if (cardEntry[i] === undefined) {
        const backdrop = asVcBackdropControl(wm.CreateControl(undefined, scrollPanel, CT_BACKDROP))
        const backdropControl = asControl(backdrop)
        cardEntry[i] = {
          backdrop,
          name: asVcEntryButton(wm.CreateControl(undefined, backdropControl, CT_BUTTON)),
          house: asVcEntryButton(wm.CreateControl(undefined, backdropControl, CT_BUTTON)),
        }
      }
      const entry = cardEntry[i]
      const card = receivedCards[i]
      if (entry === undefined || card === undefined) {
        continue
      }
      const houseName = portToFriend.HOUSES[card.houseId] ?? ""
      const backdropControl = asControl(entry.backdrop)

      entry.backdrop.SetDimensions(portToFriend.config.size.width - 30, 25)
      entry.backdrop.SetHidden(false)
      entry.backdrop.ClearAnchors()
      entry.backdrop.SetAnchor(TOPLEFT, scrollPanel, TOPLEFT, 5, 25 * i)
      if (cardNumber !== portToFriend.addonState.selectedVisitCard) {
        entry.backdrop.SetCenterColor(
          color.backDropLine.R,
          color.backDropLine.G,
          color.backDropLine.B,
          0.0
        )
        entry.backdrop.SetEdgeColor(
          color.backDropLine.R,
          color.backDropLine.G,
          color.backDropLine.B,
          0.0,
          0
        )
      } else {
        entry.backdrop.SetCenterColor(
          color.selectedVisitCardColor.R,
          color.selectedVisitCardColor.G,
          color.selectedVisitCardColor.B,
          color.selectedVisitCardColor.A
        )
        entry.backdrop.SetEdgeColor(
          color.selectedVisitCardColor.R,
          color.selectedVisitCardColor.G,
          color.selectedVisitCardColor.B,
          0.0
        )
      }
      entry.backdrop.SetAlpha(1)

      entry.name.SetDimensions(240, 25)
      entry.name.SetHidden(false)
      entry.name.ClearAnchors()
      entry.name.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 0, 0)
      entry.name.SetText(card.name)
      entry.name.SetFont(portToFriend.config.fonts.header)
      entry.name.SetMouseEnabled(true)
      entry.name.SetHandler("OnMouseEnter", () => {
        portToFriend.VCBdOnMouseEnter(cardNumber)
      })
      entry.name.SetHandler("OnMouseExit", () => {
        portToFriend.VCBdOnMouseExit(cardNumber)
      })
      entry.name.SetHandler("OnClicked", () => {
        portToFriend.VCBdOnClick(cardNumber)
      })
      entry.name.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      entry.name.SetNormalFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.name.SetPressedFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.name.SetMouseOverFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )

      entry.house.SetDimensions(500, 25)
      entry.house.SetHidden(false)
      entry.house.ClearAnchors()
      entry.house.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 215, 0)
      entry.house.SetText(houseName)
      entry.house.SetFont(portToFriend.config.fonts.header)
      entry.house.SetMouseEnabled(true)
      entry.house.SetHandler("OnMouseEnter", () => {
        portToFriend.VCBdOnMouseEnter(cardNumber)
      })
      entry.house.SetHandler("OnMouseExit", () => {
        portToFriend.VCBdOnMouseExit(cardNumber)
      })
      entry.house.SetHandler("OnClicked", () => {
        portToFriend.VCBdOnClick(cardNumber)
      })
      entry.house.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
      entry.house.SetNormalFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.house.SetPressedFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
      entry.house.SetMouseOverFontColor(
        color.visitCardFontColor.R,
        color.visitCardFontColor.G,
        color.visitCardFontColor.B,
        color.visitCardFontColor.A
      )
    }
    for (let i = receivedCards.length; i < cardEntry.length; i = i + 1) {
      const entry = cardEntry[i]
      if (entry !== undefined) {
        const backdropControl = asControl(entry.backdrop)
        entry.backdrop.SetHidden(true)
        entry.backdrop.SetDimensions(0, 0)
        entry.backdrop.ClearAnchors()
        entry.backdrop.SetAnchor(TOPLEFT, scrollPanel, TOPLEFT, 0, 0)

        entry.name.SetHidden(true)
        entry.name.SetDimensions(0, 0)
        entry.name.ClearAnchors()
        entry.name.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 0, 0)

        entry.house.SetHidden(true)
        entry.house.SetDimensions(0, 0)
        entry.house.ClearAnchors()
        entry.house.SetAnchor(TOPLEFT, backdropControl, TOPLEFT, 0, 0)
      }
    }
    vc.scrollPanel.SetDimensions(portToFriend.config.size.width - 10, receivedCards.length * 25)
    portToFriend.VCBdOnMouseEnter(asVcIndex(portToFriend.addonState.highlightedVisitCard))
  } else {
  }
  portToFriend.AdjustVCSliderSize()
}
portToFriend.RefreshVisitCards = refreshVisitCards

function adjustVCSliderSize(this: void): undefined {
  if (portToFriend.savedVars === undefined) {
    return
  }
  const vc = asVcControls(portToFriend.controls.vc)
  const totalSize = 25 * portToFriend.savedVars.vc.receivedCards.length + 40
  const screenSize =
    portToFriend.config.vc.size.height -
    portToFriend.config.vc.size.headerHeightOffset -
    portToFriend.config.vc.size.headerHeight -
    portToFriend.config.vc.size.gap -
    95

  if (totalSize <= screenSize) {
    if (portToFriend.addonState.isVCScrollable === true) {
      vc.slider.SetValue(0)
    }
    vc.slider.SetHidden(true)
    portToFriend.addonState.isVCScrollable = false
  } else {
    vc.slider.SetHidden(false)
    portToFriend.addonState.isVCScrollable = true
  }
}
portToFriend.AdjustVCSliderSize = adjustVCSliderSize

function updateVisitCardList(this: void): undefined {
  if (portToFriend.controls.vc !== undefined) {
    if (portToFriend.addonState.taintedVisitCards === true) {
      let selectedEntry: VisitCard | undefined
      if (
        portToFriend.addonState.selectedVisitCard > 0 &&
        portToFriend.savedVars !== undefined &&
        portToFriend.savedVars.vc !== undefined &&
        portToFriend.savedVars.vc.receivedCards !== undefined
      ) {
        selectedEntry =
          portToFriend.savedVars.vc.receivedCards[portToFriend.addonState.selectedVisitCard - 1]
      }
      portToFriend.SortVisitCards()
      if (selectedEntry !== undefined && portToFriend.savedVars !== undefined) {
        for (let i = 0; i < portToFriend.savedVars.vc.receivedCards.length; i = i + 1) {
          if (portToFriend.savedVars.vc.receivedCards[i] === selectedEntry) {
            portToFriend.addonState.selectedVisitCard = i + 1
            break
          }
        }
      }
      portToFriend.RefreshVisitCards()
      portToFriend.addonState.taintedVisitCards = false
    }
  }
}
portToFriend.UpdateVisitCardList = updateVisitCardList

function vcPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const vc = asVcControls(portToFriend.controls.vc)
  if (
    vc.slider.IsHidden() === false &&
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    let size = 100 / portToFriend.savedVars.vc.receivedCards.length
    if (size < 1) {
      size = 1
    }
    let position = -delta * size * 2 + vc.slider.GetValue()

    if (position < 0) {
      position = 0
    }
    if (position > 100) {
      position = 100
    }
    vc.slider.SetValue(position)
  }
}
portToFriend.VCPanelOnMouseWheel = vcPanelOnMouseWheel

function vcAdjustSlider(this: void): undefined {
  if (
    portToFriend.savedVars !== undefined &&
    portToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    const vc = asVcControls(portToFriend.controls.vc)
    let size =
      25 * portToFriend.savedVars.vc.receivedCards.length +
      10 -
      (portToFriend.config.size.height -
        portToFriend.config.size.headerHeightOffset -
        portToFriend.config.size.headerHeight -
        portToFriend.config.size.gap -
        95)
    if (size < 0) {
      size = 0
    }

    const slide = (size / 100) * vc.slider.GetValue()

    vc.scrollPanel.SetSimpleAnchor(vc.scrollControl, 0, -slide)
  } else {
  }
}
portToFriend.VCAdjustSlider = vcAdjustSlider
