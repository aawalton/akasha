declare function CreateControlFromVirtual<T extends Control = Control>(
  name: string,
  parent: Control | undefined,
  templateName: string,
  suffix?: string | number
): T

interface ZoColorDef {
  r: number
  g: number
  b: number
  a: number
}

type ZoColor = ZoColorDef

interface ZoSceneStatic {
  New: (name: string, sceneManager: SceneManager) => Scene
}

declare const ZO_Scene: ZoSceneStatic

declare const ZO_Options_OnMouseExit: (control: Control) => void

declare function zo_min(...values: number[]): number
declare function zo_max(...values: number[]): number

declare function zo_strgsub(s: string, pattern: string, replacement: string): string

declare const df: (formatString: string, ...args: unknown[]) => void

interface ZoColorDef {
  ToHex: () => string
  Colorize: (text: string) => string
  SetRGB: (r: number, g: number, b: number) => void
  SetRGBA: (r: number, g: number, b: number, a?: number) => void
  UnpackRGB: () => LuaMultiReturn<[red: number, green: number, blue: number]>
  UnpackRGBA: () => LuaMultiReturn<[red: number, green: number, blue: number, alpha: number]>
}

declare function zo_max(a: number, b: number): number

declare function zo_min(a: number, b: number): number

declare function zo_strgsub(
  s: string,
  pattern: string,
  replacement: (this: void, match: string) => string
): string
