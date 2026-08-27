interface Control {
  SetColor(red: number, green: number, blue: number, alpha?: number): void
}

interface WindowManager {
  CreateControlFromVirtual<T extends Control = Control>(
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ): T
}

declare const COLOR_PICKER_GAMEPAD: {
  Show(
    callback: (this: void, r: number, g: number, b: number, a: number) => void,
    r: number,
    g: number,
    b: number,
    a?: number
  ): void
}
