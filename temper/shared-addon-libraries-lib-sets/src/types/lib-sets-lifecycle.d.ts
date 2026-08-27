interface WindowManager {
  GetControlByName<T extends Control = Control>(name: string, suffix: string): T | undefined
}

declare function ZO_Inventory_GetBagAndIndex(
  this: void,
  inventorySlot: unknown
): LuaMultiReturn<[Bag | undefined, number | undefined]>

declare const SCENE_FRAGMENT_HIDING: number
declare const SCENE_FRAGMENT_SHOWN: number

declare const RETRAIT_STATION_RECONSTRUCT_FRAGMENT: SceneFragment
declare const ITEM_SETS_BOOK_FRAGMENT: SceneFragment

declare const ZO_ItemSetsBook_Keyboard_TopLevelFilters: Control

declare function AddCustomSubMenuItem(this: void, submenuName: string, entries: unknown[]): void

declare function LibSets_SearchUI_Shared_IsShown(this: void): boolean
declare function LibSets_SearchUI_Shared_UpdateSearch(this: void, searchParams: unknown[]): void
declare function LibSets_SearchUI_Shared_ToggleUI(this: void, searchParams?: unknown[]): void

interface LibSetsLib {
  itemSetCollectionBookMoreOptionsButton?: LibSetsMoreOptionsButton

  currentAPIVersion: number

  debugGetAllDataIsRunning: boolean

  OpenSetItemCollectionBrowserForCurrentZone: (
    this: void,
    useParentZoneId?: boolean
  ) => boolean | undefined
}

interface LibSetsMoreOptionsButton extends ButtonControl {
  upTexture?: string
  mouseOver?: string
  clickedTexture?: string
  tooltipText?: string
  tooltipAlign?: number
}
