interface LibSetsLib {
  GetWayshrineIds: (
    this: void,
    setId: number | undefined,
    withRelatedZoneIds?: boolean
  ) => LuaMultiReturn<[unknown, { [wayshrineNodeId: number]: number | undefined } | undefined]>
  GetWayshrinesZoneId: (this: void, wayshrineNodeId: number | undefined) => number | undefined
  GetZoneIds: (this: void, setId: number | undefined) => unknown

  GetDLCId: (this: void, setId: number | undefined) => unknown
  IsCurrentDLC: (this: void, setId: number | undefined) => boolean | undefined
  GetAllDLCIds: (this: void) => unknown
  GetDLCType: (this: void, setId: number | undefined) => number | undefined
  GetDLCTypeName: (this: void, dlcTypeId: number | undefined) => string | undefined
  GetAllDLCTypes: (this: void) => unknown

  GetTraitsNeeded: (this: void, setId: number | undefined) => unknown

  GetSetTypeName: (
    this: void,
    libSetsSetType: number | undefined,
    lang?: string
  ) => string | undefined
  GetAllSetTypes: (this: void) => unknown
}
