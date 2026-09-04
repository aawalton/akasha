interface LibDebugLoggerInstance {
  SetEnabled: (this: LibDebugLoggerInstance, enabled: boolean) => undefined
  Create: (this: LibDebugLoggerInstance, name: string) => LibDebugLoggerInstance
  Debug: (this: LibDebugLoggerInstance, text: string) => undefined
  Verbose: (this: LibDebugLoggerInstance, text: string) => undefined
  Info: (this: LibDebugLoggerInstance, text: string) => undefined
  Error: (this: LibDebugLoggerInstance, text: string) => undefined
  verbose: LibDebugLoggerInstance
  callbacksFired: LibDebugLoggerInstance
  isEnabled: boolean
  [key: string]: unknown
}

type LibDebugLoggerGlobal = ((this: void, name: string) => LibDebugLoggerInstance) | undefined
