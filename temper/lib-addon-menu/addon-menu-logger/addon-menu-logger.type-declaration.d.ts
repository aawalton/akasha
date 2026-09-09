interface LamLogger {
  Warn: (this: LamLogger, ...args: unknown[]) => void
  Error: (this: LamLogger, ...args: unknown[]) => void
  Info: (this: LamLogger, ...args: unknown[]) => void
  Debug: (this: LamLogger, ...args: unknown[]) => void
  Verbose: (this: LamLogger, ...args: unknown[]) => void
}

type LibDebugLoggerCallable = (this: void, name: string) => LamLogger
