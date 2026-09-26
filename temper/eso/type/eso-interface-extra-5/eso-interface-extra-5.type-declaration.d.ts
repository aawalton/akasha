declare function ZO_GroupFinder_CanDoCreateEdit(
  this: void,
  userTypeData?: object,
  groupTitleEditControl?: Control,
  isEditing?: boolean
): LuaMultiReturn<[canCreate: boolean, errorMessage: string | undefined]>

interface ZoGroupListingSearchDataClass {
  New: (this: ZoGroupListingSearchDataClass, listingIndex: number) => object
}
declare const ZO_GroupListingSearchData: ZoGroupListingSearchDataClass

declare const ZO_GROUP_FINDER_MODES: {
  readonly OVERVIEW: number
  readonly SEARCH: number
  readonly CREATE_EDIT: number
  readonly MANAGE: number
}

interface GroupFinderKeyboard {
  mode: number
  createGroupListingContent?: { Refresh: (this: unknown) => void }
  ExitCreateEditState: (this: GroupFinderKeyboard) => void
  SetMode: (this: GroupFinderKeyboard, mode: number) => void
}
declare const GROUP_FINDER_KEYBOARD: GroupFinderKeyboard | undefined

declare const GROUP_FINDER_GAMEPAD:
  | { createEditDialogObject?: { ShowDialog: (this: unknown) => void } }
  | undefined

interface GroupMenuTree {
  ExecuteOnSubTree: (
    this: GroupMenuTree,
    node: undefined,
    fn: (this: void, node: never) => boolean
  ) => void
  SelectNode: (this: GroupMenuTree, node: unknown) => void
}

interface GroupMenuKeyboard {
  GetTree: (this: GroupMenuKeyboard) => GroupMenuTree
  ShowCategoryByData: (this: GroupMenuKeyboard, data: object) => void
}

declare function ZO_LocalizeDecimalNumber(this: void, value: number): string

declare function ZO_ScrollList_GetScrollValue(this: void, list: Control): number

interface ButtonControl {
  SetMouseOverBlendMode: (mode: number) => void
}

interface EsoAchievementsManager {
  contentSearchEditBox: { SetText: (text: string) => void; GetText: () => string }
  OpenCategory: (categoryIndex: number | undefined, subCategoryIndex: number | undefined) => void
  achievementsById: Record<number, { Expand: (this: unknown) => void } | undefined>
}

interface ZoSceneFragmentObject extends SceneFragment {
  OnShown: () => void
  OnHidden: () => void
}

interface ZoSceneFragmentSubclass {
  New: () => ZoSceneFragmentObject
  Show?: (this: never) => void
  Hide?: (this: never) => void
}

declare const ZO_SceneFragment: { Subclass: () => ZoSceneFragmentSubclass }
