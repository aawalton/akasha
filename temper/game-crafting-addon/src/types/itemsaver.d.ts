interface ItemSaverSetData {
  filterDeconstruction?: boolean
  filterResearch?: boolean
}

declare const ItemSaver_IsItemSaved:
  | ((
      this: void,
      bagId: number,
      slotIndex: number
    ) => LuaMultiReturn<[markerId: unknown, setName: string | undefined]>)
  | undefined

declare const ItemSaver_GetSetData: ((this: void, setName: string) => ItemSaverSetData) | undefined
