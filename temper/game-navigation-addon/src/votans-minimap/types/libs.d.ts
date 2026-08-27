type AsyncCallback = (this: void, ...args: unknown[]) => unknown

interface AsyncTask {
  Call(fn: AsyncCallback): AsyncTask
  Then(fn: AsyncCallback): AsyncTask
  Finally(fn: AsyncCallback): AsyncTask
  For(startIndex: number, endIndex: number): AsyncTask
  For(iterable: unknown, state?: unknown, control?: unknown): AsyncTask
  Do(fn: AsyncCallback): AsyncTask
  While(predicate: (this: void) => boolean): AsyncTask
  WaitUntil(predicate: (this: void) => boolean): AsyncTask
  Cancel(): AsyncTask
  StopTimer(): AsyncTask
}

interface AnyAsyncTask {
  Call(...args: unknown[]): AnyAsyncTask
  Then(...args: unknown[]): AnyAsyncTask
  Finally(...args: unknown[]): AnyAsyncTask
  For(...args: unknown[]): AnyAsyncTask
  Do(...args: unknown[]): AnyAsyncTask
  While(...args: unknown[]): AnyAsyncTask
  WaitUntil(...args: unknown[]): AnyAsyncTask
  Cancel(...args: unknown[]): AnyAsyncTask
  StopTimer(...args: unknown[]): AnyAsyncTask
  OnError(...args: unknown[]): AnyAsyncTask
  Delay(...args: unknown[]): AnyAsyncTask
  ThenDelay(...args: unknown[]): AnyAsyncTask
  Suspend(...args: unknown[]): AnyAsyncTask
  Resume(...args: unknown[]): AnyAsyncTask
  [key: string]: unknown
}

interface LibAsyncLib {
  Create(name: string): AsyncTask
  Call(fn: AsyncCallback): AsyncTask
  For(startIndex: number, endIndex: number): AsyncTask
  For(iterable: unknown, state?: unknown, control?: unknown): AsyncTask
  SetDebug(enabled: boolean): void
  GetDebug(): boolean
}

declare const LibAsync: LibAsyncLib
