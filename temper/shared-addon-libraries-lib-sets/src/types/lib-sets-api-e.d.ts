interface LibSetsLib {
  GetDropMechanicName: (
    this: void,
    libSetsDropMechanicId: number | undefined,
    lang?: string
  ) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetDropMechanic: (
    this: void,
    setId: number | undefined,
    withNames?: boolean,
    lang?: string
  ) => LuaMultiReturn<[unknown, unknown, unknown, unknown, unknown]>
  GetAllDropMechanics: (this: void) => unknown

  GetAllDropZones: (this: void) => unknown
  GetDropZonesBySetId: (this: void, setId: number | undefined) => unknown
  GetSetIdsByDropZone: (this: void, zoneId: number | undefined) => unknown
  GetSetIdsOfCurrentZone: (
    this: void
  ) => LuaMultiReturn<[unknown, number | undefined, number | undefined]>

  GetAllDropLocationNames: (this: void, lang?: string) => unknown
  GetDropLocationNamesBySetId: (this: void, setId: number | undefined, lang?: string) => unknown
  GetSetIdsByDropLocationName: (
    this: void,
    dropLocationName: string | undefined,
    lang?: string
  ) => unknown

  GetAllSetIds: (this: void) => unknown
  GetAllSetItemIds: (this: void) => unknown
}
