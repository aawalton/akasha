interface LibAlchemyStationTabData {
  name: number | string
  descriptor: string
  normal: string
  pressed: string
  highlight: string
  disabled: string
  callback: (this: void) => void
}
interface LibAlchemyStationLib {
  Init(): void
  AddTab(tabData: LibAlchemyStationTabData): Control
  GetSelectedTab(): string
  SelectTab(descriptor: string): void
}
declare const LibAlchemyStation: LibAlchemyStationLib

type AsyncCallback = (this: void, ...args: unknown[]) => unknown
interface AsyncTask {
  Call(fn: AsyncCallback): AsyncTask
  Then(fn: AsyncCallback): AsyncTask
  Finally(fn: AsyncCallback): AsyncTask
  Do(fn: AsyncCallback): AsyncTask
  Cancel(): AsyncTask
  StopTimer(): AsyncTask
}
interface LibAsyncLib {
  Create(name: string): AsyncTask
  For(startIndex: number, endIndex: number): AsyncTask
}
declare const LibAsync: LibAsyncLib

interface LibMainMenu2Lib {
  Init(): void
  AddMenuItem(
    descriptor: string,
    sceneName: string,
    categoryLayoutInfo: object,
    unused: undefined
  ): void
  SelectMenuItem(descriptor: string): void
}
declare const LibMainMenu2: LibMainMenu2Lib
