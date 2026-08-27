declare function PlaySound(sound: string): void

declare const EVENT_GLOBAL_MOUSE_UP: number

declare const DT_HIGH: number
declare const DL_CONTROLS: number
declare const TEX_MODE_WRAP: number

interface Control {
  GetOwningWindow(): Control | undefined
  SetEnabled(enabled: boolean): void
  SetTexture(texture: unknown): void
  SetColor(red: number, green: number, blue: number, alpha?: number): void
}

interface BackdropControl {
  SetCenterTexture(texture: string): void
  SetInsets(left: number, top: number, right: number, bottom: number): void
}

interface ZoComboBox {
  SetMouseEnabled(enabled: boolean): void
  SetDimensions(width: number, height: number): void
}

interface TextureControl {
  SetAddressMode(mode: number): void
}
