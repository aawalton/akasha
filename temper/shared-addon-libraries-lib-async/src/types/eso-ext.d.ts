interface ZoInitializingCallbackObjectClass {
  Subclass<T>(this: ZoInitializingCallbackObjectClass): T
  New<T>(this: void, self: object): T
}
declare const ZO_InitializingCallbackObject: ZoInitializingCallbackObjectClass

interface Scene {
  IsShowing(this: Scene): boolean
}

declare function ZO_IsConsoleOrGameCoreUI(this: void): boolean

declare function zo_strtrim(this: void, text: string): string

declare function zo_strgmatch(
  this: void,
  s: string,
  pattern: string
): LuaIterable<LuaMultiReturn<[string]>>

declare function zo_max(this: void, ...args: number[]): number
declare function zo_min(this: void, ...args: number[]): number

interface LibDebugLoggerInstance {
  Debug(this: LibDebugLoggerInstance, ...args: unknown[]): void
  Warn(this: LibDebugLoggerInstance, ...args: unknown[]): void
}

declare const LibDebugLogger: ((this: void, name: string) => LibDebugLoggerInstance) | undefined
