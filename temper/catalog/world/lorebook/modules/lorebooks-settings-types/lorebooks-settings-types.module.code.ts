import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export interface IconControl {
  SetAnchor: (
    this: IconControl,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetTexture: (this: IconControl, texture: string) => void
  SetDimensions: (this: IconControl, width: number, height: number) => void
  SetDesaturation: (this: IconControl, desaturation: number) => void
}

export interface RefreshableControl {
  combobox: unknown
}
export interface LamPanelInternal {
  controlsToRefresh: Record<number, RefreshableControl>
}

export type LamControlDataArray = LamControlData[]
export function asLamPanelInternal(value: unknown): LamPanelInternal {
  return value as LamPanelInternal
}
export function asRefreshableControl(value: unknown): RefreshableControl {
  return value as RefreshableControl
}
export function asControl(value: unknown): Control {
  return value as Control
}
export function asIconControl(value: unknown): IconControl {
  return value as IconControl
}
export function asLamControlDataArray(value: unknown): LamControlDataArray {
  return value as LamControlDataArray
}
