interface Control {
  SetColor(r: number, g: number, b: number, a?: number): void
  SetHeight(height: number): void
  SetText(text: unknown): void
  GetText(): string
  SetMaxInputChars(maxChars: number): void
  SetTextType(textType: number): void
  LoseFocus(): void
  HasFocus(): boolean
  GetCursorPosition(): number
  SetCursorPosition(position: number): void
}

declare const TEXT_TYPE_ITERATION_BEGIN: number
declare const TEXT_TYPE_ITERATION_END: number
