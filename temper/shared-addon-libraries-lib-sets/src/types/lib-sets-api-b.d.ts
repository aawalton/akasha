interface LibSetsLib {
  IsAPerfectedOrNonPerfectedSetId: (this: void, setId: number) => boolean
  IsPerfectedSet: (this: void, setId: number | undefined) => boolean | undefined
  IsNonPerfectedSet: (this: void, setId: number | undefined) => boolean | undefined
  GetPerfectedSetId: (
    this: void,
    perfectedSetId: number | undefined
  ) => LuaMultiReturn<[number | undefined, number | undefined]>
  GetPerfectedSetInfo: (
    this: void,
    setId: number | undefined
  ) => { [k: string]: unknown } | undefined
  GetAllPerfectedSetIds: (this: void) => unknown
  GetAllNonPerfectedSetIds: (this: void) => unknown
  IsSetByItemId: (
    this: void,
    itemId: number | undefined
  ) => LuaMultiReturn<
    [
      boolean | undefined,
      string | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ]
  >
  IsSetByItemLink: (
    this: void,
    itemLink: string | undefined
  ) => LuaMultiReturn<
    [
      boolean | undefined,
      string | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
      number | undefined,
    ]
  >
  IsVeteranSet: (
    this: void,
    setId: number | undefined,
    itemLink: string | undefined
  ) => boolean | undefined
}
