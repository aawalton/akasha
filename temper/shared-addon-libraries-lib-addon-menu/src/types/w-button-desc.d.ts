interface ButtonControl {
  SetPressedOffset(x: number, y: number): void
  SetNormalFontColor(r: number, g: number, b: number, a?: number): void
  SetText(text: string | number): void
}

interface Control {
  SetResizeToFitConstrains(constrains: number): void
}

interface WindowManager {
  CreateControlFromVirtual<T extends Control = Control>(
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ): T
}
