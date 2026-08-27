import { PortToFriend } from "./state"
import type { VisitCard } from "./types"
import { asControl, asVcBackdropControl, asVcControls, asVcEntryButton } from "./visit-cards-view"

const wm = WINDOW_MANAGER

type VcIndex = number
function asVcIndex(value: number | undefined): VcIndex {
  return value as VcIndex
}

function SortVisitCards(this: void): undefined {
  if (
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    const cards = PortToFriend.savedVars.vc.receivedCards
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
          const currentHouse = PortToFriend.HOUSES[current.houseId]
          const nextHouse = PortToFriend.HOUSES[next.houseId]
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
PortToFriend.SortVisitCards = SortVisitCards

function RefreshVisitCards(this: void): undefined {
  if (
    PortToFriend.controls.vc !== undefined &&
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    const vc = asVcControls(PortToFriend.controls.vc)
    const receivedCards = PortToFriend.savedVars.vc.receivedCards
    if (vc.cardEntry === undefined) {
      vc.cardEntry = []
    }
    const cardEntry = vc.cardEntry
    const color = PortToFriend.config.color
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
      const houseName = PortToFriend.HOUSES[card.houseId] ?? ""
      const backdropControl = asControl(entry.backdrop)

      entry.backdrop.SetDimensions(PortToFriend.config.size.width - 30, 25)
      entry.backdrop.SetHidden(false)
      entry.backdrop.ClearAnchors()
      entry.backdrop.SetAnchor(TOPLEFT, scrollPanel, TOPLEFT, 5, 25 * i)
      if (cardNumber !== PortToFriend.addonState.selectedVisitCard) {
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
      entry.name.SetFont(PortToFriend.config.fonts.header)
      entry.name.SetMouseEnabled(true)
      entry.name.SetHandler("OnMouseEnter", () => {
        PortToFriend.VCBdOnMouseEnter(cardNumber)
      })
      entry.name.SetHandler("OnMouseExit", () => {
        PortToFriend.VCBdOnMouseExit(cardNumber)
      })
      entry.name.SetHandler("OnClicked", () => {
        PortToFriend.VCBdOnClick(cardNumber)
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
      entry.house.SetFont(PortToFriend.config.fonts.header)
      entry.house.SetMouseEnabled(true)
      entry.house.SetHandler("OnMouseEnter", () => {
        PortToFriend.VCBdOnMouseEnter(cardNumber)
      })
      entry.house.SetHandler("OnMouseExit", () => {
        PortToFriend.VCBdOnMouseExit(cardNumber)
      })
      entry.house.SetHandler("OnClicked", () => {
        PortToFriend.VCBdOnClick(cardNumber)
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
    vc.scrollPanel.SetDimensions(PortToFriend.config.size.width - 10, receivedCards.length * 25)
    PortToFriend.VCBdOnMouseEnter(asVcIndex(PortToFriend.addonState.highlightedVisitCard))
  } else {
  }
  PortToFriend.AdjustVCSliderSize()
}
PortToFriend.RefreshVisitCards = RefreshVisitCards

function AdjustVCSliderSize(this: void): undefined {
  if (PortToFriend.savedVars === undefined) {
    return
  }
  const vc = asVcControls(PortToFriend.controls.vc)
  const totalSize = 25 * PortToFriend.savedVars.vc.receivedCards.length + 40
  const screenSize =
    PortToFriend.config.vc.size.height -
    PortToFriend.config.vc.size.headerHeightOffset -
    PortToFriend.config.vc.size.headerHeight -
    PortToFriend.config.vc.size.gap -
    95

  if (totalSize <= screenSize) {
    if (PortToFriend.addonState.isVCScrollable === true) {
      vc.slider.SetValue(0)
    }
    vc.slider.SetHidden(true)
    PortToFriend.addonState.isVCScrollable = false
  } else {
    vc.slider.SetHidden(false)
    PortToFriend.addonState.isVCScrollable = true
  }
}
PortToFriend.AdjustVCSliderSize = AdjustVCSliderSize

function UpdateVisitCardList(this: void): undefined {
  if (PortToFriend.controls.vc !== undefined) {
    if (PortToFriend.addonState.taintedVisitCards === true) {
      let selectedEntry: VisitCard | undefined
      if (
        PortToFriend.addonState.selectedVisitCard > 0 &&
        PortToFriend.savedVars !== undefined &&
        PortToFriend.savedVars.vc !== undefined &&
        PortToFriend.savedVars.vc.receivedCards !== undefined
      ) {
        selectedEntry =
          PortToFriend.savedVars.vc.receivedCards[PortToFriend.addonState.selectedVisitCard - 1]
      }
      PortToFriend.SortVisitCards()
      if (selectedEntry !== undefined && PortToFriend.savedVars !== undefined) {
        for (let i = 0; i < PortToFriend.savedVars.vc.receivedCards.length; i = i + 1) {
          if (PortToFriend.savedVars.vc.receivedCards[i] === selectedEntry) {
            PortToFriend.addonState.selectedVisitCard = i + 1
            break
          }
        }
      }
      PortToFriend.RefreshVisitCards()
      PortToFriend.addonState.taintedVisitCards = false
    }
  }
}
PortToFriend.UpdateVisitCardList = UpdateVisitCardList

function VCPanelOnMouseWheel(this: void, _control: Control, delta: number): undefined {
  const vc = asVcControls(PortToFriend.controls.vc)
  if (
    vc.slider.IsHidden() === false &&
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    let size = 100 / PortToFriend.savedVars.vc.receivedCards.length
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
PortToFriend.VCPanelOnMouseWheel = VCPanelOnMouseWheel

function VCAdjustSlider(this: void): undefined {
  if (
    PortToFriend.savedVars !== undefined &&
    PortToFriend.savedVars.vc.receivedCards !== undefined
  ) {
    const vc = asVcControls(PortToFriend.controls.vc)
    let size =
      25 * PortToFriend.savedVars.vc.receivedCards.length +
      10 -
      (PortToFriend.config.size.height -
        PortToFriend.config.size.headerHeightOffset -
        PortToFriend.config.size.headerHeight -
        PortToFriend.config.size.gap -
        95)
    if (size < 0) {
      size = 0
    }

    const slide = (size / 100) * vc.slider.GetValue()

    vc.scrollPanel.SetSimpleAnchor(vc.scrollControl, 0, -slide)
  } else {
  }
}
PortToFriend.VCAdjustSlider = VCAdjustSlider
