interface ZoObjectClass {
  Subclass<T = object>(): T
  New: <T = object>(this: void, self: object, ...args: readonly unknown[]) => T
  readonly __call?: (this: void, ...args: readonly unknown[]) => unknown
}
declare const ZO_Object: ZoObjectClass

declare const ZO_InitializingObject: {
  readonly __call?: (this: void, ...args: readonly unknown[]) => unknown
}

declare function zo_strsplit(this: void, separator: string, input: string): LuaMultiReturn<string[]>

declare function zo_callLater(this: void, callback: (this: void) => void, delay: number): number

declare function ScriptBuildInfo(this: void): Record<string, string>

declare function GetUICustomScale(this: void): number

declare function GetUIGlobalScale(this: void): number

declare const GAMEPAD_TYPE_PS4_NO_TOUCHPAD: number

declare const GRAPHICS_SETTING_FULLSCREEN: number

declare const ZO_ERROR_FRAME: {
  suppressedErrors: Record<number, boolean>
}

interface LibChatMessageInstance {
  Print(this: LibChatMessageInstance, message: string): void
  Printf(this: LibChatMessageInstance, formatter: string, ...args: unknown[]): void
}

declare const LibChatMessage:
  | ((this: void, id: string, abbreviation: string) => LibChatMessageInstance)
  | undefined
