interface FcoisApi {
  IsDeconstructionLocked: (
    this: void,
    bagId: number,
    slotIndex: number,
    suppressWarning: boolean
  ) => boolean
  IsMarked: (
    this: void,
    bagId: number,
    slotIndex: number,
    filterIcons: number | readonly number[],
    addonName?: string | undefined
  ) => LuaMultiReturn<[isMarked: boolean, markedArray: Record<number, boolean> | undefined]>
  callDeconstructionSelectionHandler: (
    this: void,
    bagId: number,
    slotIndex: number,
    echo: boolean,
    isDragAndDrop: boolean,
    calledFromExternalAddon: boolean,
    calledFromInternalFCOIS: boolean,
    fromOutside: boolean,
    fromOutsideUsePanelId: boolean,
    panelId: number | undefined
  ) => boolean
}

declare const FCOIS: FcoisApi | undefined

declare const ItemSaver_IsItemSaved:
  | ((this: void, bagId: number, slotIndex: number) => boolean)
  | undefined
