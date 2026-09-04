import "@akasha/temper-eso-types/eso-ui"
export type ControlHandler = (this: void, ...args: unknown[]) => void
export function asControlHandler(value: unknown): ControlHandler {
  return value as ControlHandler
}

export interface ScrollableDropdown {
  SetSelected: (this: ScrollableDropdown, index: number) => void
}
export function asScrollableDropdown(value: unknown): ScrollableDropdown {
  return value as ScrollableDropdown
}

export type TreeNode = Record<string, unknown>
export function asTreeNode(value: unknown): TreeNode {
  return value as TreeNode
}

export function controlsTree(value: unknown): TreeNode {
  return asTreeNode(value)
}

export function asCtControl(value: number): CtControl {
  return value as CtControl
}

export function asControl(value: unknown): Control {
  return value as Control
}

export interface BackdropEdgeView {
  SetEdgeTexture: (
    this: BackdropEdgeView,
    edgeFile: string | undefined,
    edgeFileWidth: number,
    edgeFileHeight: number,
    insetX: number,
    insetY: number
  ) => void
}
export function asBackdropEdgeView(value: unknown): BackdropEdgeView {
  return value as BackdropEdgeView
}

export function asString(value: unknown): string {
  return value as string
}
export function asNumber(value: unknown): number {
  return value as number
}

export function nilName(this: void): string {
  return asString(undefined)
}

export interface SliderView extends Control {
  SetMinMax: (this: SliderView, min: number, max: number) => void
  SetOrientation: (this: SliderView, orientation: number) => void
  SetValue: (this: SliderView, value: number) => void
  SetValueStep: (this: SliderView, step: number) => void
  SetThumbTexture: (
    this: SliderView,
    filename: string,
    disabledFilename: string | undefined,
    highlightedFilename: string | undefined,
    thumbWidth: number,
    thumbHeight: number
  ) => void
}
export function asSliderView(value: unknown): SliderView {
  return value as SliderView
}

export interface ScrollView extends Control {
  SetScrollBounding: (this: ScrollView, bounding: number) => void
}
export function asScrollView(value: unknown): ScrollView {
  return value as ScrollView
}
