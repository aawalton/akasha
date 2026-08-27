export type PoiNameDebugTable = Record<string, Record<number, number>>

export const internalState: {
  isAddonDevOfLibZone: boolean
  mapNamesWereBuild: boolean
  poiNameDebugTable: PoiNameDebugTable | undefined
  poiDataTable: unknown
} = {
  isAddonDevOfLibZone: GetDisplayName() === "@Baertram",
  mapNamesWereBuild: false,
  poiNameDebugTable: undefined,
  poiDataTable: undefined,
}
