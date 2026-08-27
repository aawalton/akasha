interface LibSetsLib {
  name: string
  prefix: string
  version: number
  author: string
  svName: string
  svDebugName: string
  svVersion: number
  setsLoaded: boolean
  setsScanning: boolean
  fullyLoaded: boolean
  startedLoading: boolean
  IsConsole: boolean
  checkIfPTSAPIVersionIsLive: (this: void) => boolean
  APIVersions: { [key: string]: number }
  setDataPreloaded: { [tableKey: string]: unknown }
  setIds: { [setId: number]: boolean }
  nonExistingSetIdsAtCurrentApiVersion: { [setId: number]: boolean }
}

declare let LibSets: LibSetsLib

declare function IsLibSetsAlreadyLoaded(this: void, outputMsg?: boolean): boolean
