interface LibDebugLoggerInstance {
  Verbose(this: LibDebugLoggerInstance, ...args: unknown[]): void
  Debug(this: LibDebugLoggerInstance, ...args: unknown[]): void
  Info(this: LibDebugLoggerInstance, ...args: unknown[]): void
  Warn(this: LibDebugLoggerInstance, ...args: unknown[]): void
  Error(this: LibDebugLoggerInstance, ...args: unknown[]): void
  SetEnabled(this: LibDebugLoggerInstance, enabled: boolean): void
}
declare function LibDebugLogger(this: void, name: string): LibDebugLoggerInstance

interface LibAsyncTask {
  Cancel(this: LibAsyncTask): LibAsyncTask
  Suspend(this: LibAsyncTask): LibAsyncTask
  Resume(this: LibAsyncTask): LibAsyncTask
  Call(this: LibAsyncTask, func: (this: void, task: LibAsyncTask) => unknown): LibAsyncTask
  Then(this: LibAsyncTask, func: (this: void, task: LibAsyncTask) => unknown): LibAsyncTask
  Finally(this: LibAsyncTask, func: (this: void, task: LibAsyncTask) => unknown): LibAsyncTask
  For(this: LibAsyncTask, ...args: unknown[]): LibAsyncTask
  Do(this: LibAsyncTask, func: (this: void, ...args: never[]) => unknown): LibAsyncTask
}
interface LibAsyncLib {
  Create(this: LibAsyncLib, name: string): LibAsyncTask
}
declare const LibAsync: LibAsyncLib
