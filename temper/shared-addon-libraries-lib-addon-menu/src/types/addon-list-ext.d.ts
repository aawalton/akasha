interface SelectableLabelControl extends LabelControl {
  SetSelected(selected: boolean): void
}

interface BackdropControl {
  SetEdgeTexture(
    texture: string | undefined,
    width: number,
    height: number,
    insetX: number,
    insetY: number
  ): void
}

interface ZoScrollbarControl extends Control {
  GetMinMax(this: ZoScrollbarControl): LuaMultiReturn<[min: number, max: number]>
  GetValue(this: ZoScrollbarControl): number
}

interface Control {
  scrollbar?: ZoScrollbarControl
  uniformControlHeight?: number
  controlHeight?: number
  GetText(): string
}
