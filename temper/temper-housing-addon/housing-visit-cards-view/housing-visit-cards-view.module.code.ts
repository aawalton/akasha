import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
export interface VcCardEntry {
  backdrop: VcBackdropControl
  name: VcEntryButton
  house: VcEntryButton
}

export interface VcBackdropControl {
  SetDimensions: (this: VcBackdropControl, width: number, height: number) => void
  SetHidden: (this: VcBackdropControl, hidden: boolean) => void
  ClearAnchors: (this: VcBackdropControl) => void
  SetAnchor: (
    this: VcBackdropControl,
    point: number,
    relativeTo?: Control,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number,
    constrains?: number
  ) => void
  SetCenterColor: (this: VcBackdropControl, r: number, g: number, b: number, a?: number) => void
  SetEdgeColor: (
    this: VcBackdropControl,
    r: number,
    g: number,
    b: number,
    a?: number,
    edgeSize?: number
  ) => void
  SetAlpha: (this: VcBackdropControl, alpha: number) => void
}

export interface VcEntryButton {
  SetDimensions: (this: VcEntryButton, width: number, height: number) => void
  SetHidden: (this: VcEntryButton, hidden: boolean) => void
  ClearAnchors: (this: VcEntryButton) => void
  SetAnchor: (
    this: VcEntryButton,
    point: number,
    relativeTo?: Control,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number,
    constrains?: number
  ) => void
  SetText: (this: VcEntryButton, text: string) => void
  SetFont: (this: VcEntryButton, font: string) => void
  SetMouseEnabled: (this: VcEntryButton, enabled: boolean) => void
  SetHandler: (this: VcEntryButton, event: string, handler: (this: void) => void) => void
  SetHorizontalAlignment: (this: VcEntryButton, alignment: number) => void
  SetNormalFontColor: (this: VcEntryButton, r: number, g: number, b: number, a?: number) => void
  SetPressedFontColor: (this: VcEntryButton, r: number, g: number, b: number, a?: number) => void
  SetMouseOverFontColor: (this: VcEntryButton, r: number, g: number, b: number, a?: number) => void
}

export interface VcLabelControl {
  SetText: (this: VcLabelControl, text: string) => void
}

export interface VcActionButton {
  SetEnabled: (this: VcActionButton, enabled: boolean) => void
}

export interface VcSliderControl {
  SetHidden: (this: VcSliderControl, hidden: boolean) => void
  IsHidden: (this: VcSliderControl) => boolean
  SetValue: (this: VcSliderControl, value: number) => void
  GetValue: (this: VcSliderControl) => number
}

export interface VcScrollPanelControl {
  SetDimensions: (this: VcScrollPanelControl, width: number, height: number) => void
  ClearAnchors: (this: VcScrollPanelControl) => void
  SetAnchor: (
    this: VcScrollPanelControl,
    point: number,
    relativeTo?: Control,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number
  ) => void
  SetSimpleAnchor: (
    this: VcScrollPanelControl,
    relativeTo: Control,
    offsetX: number,
    offsetY: number
  ) => void
}

export interface VcControls {
  cardEntry?: VcCardEntry[]
  scrollPanel: VcScrollPanelControl
  scrollControl: Control
  slider: VcSliderControl
  nameLabel: VcLabelControl
  houseLabel: VcLabelControl
  addFavoriteButton: VcActionButton
  vcButton: VcActionButton
  portButton: VcActionButton
  removeButton: VcActionButton
}

export function asVcControls(value: unknown): VcControls {
  return value as VcControls
}

export function asVcBackdropControl(value: unknown): VcBackdropControl {
  return value as VcBackdropControl
}

export function asVcEntryButton(value: unknown): VcEntryButton {
  return value as VcEntryButton
}

export function asControl(value: unknown): Control {
  return value as Control
}
