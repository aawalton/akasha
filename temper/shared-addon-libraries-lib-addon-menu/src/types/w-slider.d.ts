interface Control {
  SetValue(value: number): void
  SetMinMax(min: number, max: number): void
  SetValueStep(step: number): void
  SetOrientation(orientation: number): void
  SetThumbTexture(
    texture: string,
    disabledTexture?: string,
    highlightedTexture?: string,
    width?: number,
    height?: number
  ): void
  SetEnabled(enabled: boolean): void
  GetEnabled(): boolean

  SetEditEnabled(enabled: boolean): void
  SetTextType(textType: number): void
  HasFocus(): boolean
  SelectAll(): void

  SetFont(font: string): void
  SetText(text: string | number): void
  GetText(): string
  LoseFocus(): void
}

interface WindowManager {
  CreateControl(name: string | undefined, parent: Control | undefined, controlType: number): Control
}
