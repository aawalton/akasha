interface ButtonControl {
  SetFont(font: string): void
  SetNormalFontColor(r: number, g: number, b: number, a?: number): void
  SetMouseOverFontColor(r: number, g: number, b: number, a?: number): void
  GetLabelControl(): LabelControl
}

interface LabelControl {
  GetTextDimensions(): LuaMultiReturn<[number, number]>
}

interface Control {
  SetResizeToFitPadding(x: number, y: number): void
}

interface WindowManager {
  CreateControlFromVirtual<T extends Control = Control>(
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ): T
}
