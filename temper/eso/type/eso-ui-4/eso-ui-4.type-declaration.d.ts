interface ZoColorDefClass {
  FloatsToHex: (this: void, r: number, g: number, b: number, a?: number) => string
  HexToFloats: (
    this: void,
    hex: string
  ) => LuaMultiReturn<[r: number, g: number, b: number, a: number] | []>
}

interface LabelControl {
  GetNumLines: () => number
}

interface TextureControl {
  GetTextureFileName: () => string
}

interface ZoGamepadEntryData {
  SetFontScaleOnSelection: (enabled: boolean) => undefined
}

interface Scene {
  hideSceneConfirmationPush?: boolean
  AcceptHideScene: (this: Scene) => void
  RemoveFragmentGroup: (this: Scene, fragmentGroup: object) => void
  SetHideSceneConfirmationCallback: (
    this: Scene,
    callback: (this: void, scene: Scene, nextSceneName: string, reason: unknown) => void
  ) => void
}

interface ZoInteractSceneClass {
  New: (
    this: ZoInteractSceneClass,
    name: string,
    sceneManager: SceneManager,
    interactionInfo: { type: string; interactTypes: readonly number[] }
  ) => Scene
}
declare const ZO_InteractScene: ZoInteractSceneClass

interface ZoDeferredInitializingObject {
  OnDeferredInitialize: (this: ZoDeferredInitializingObject) => void
}
interface ZoDeferredInitializingObjectClass {
  New: (this: ZoDeferredInitializingObjectClass, scene: Scene) => ZoDeferredInitializingObject
}
declare const ZO_DeferredInitializingObject: ZoDeferredInitializingObjectClass

interface ZoWorldMapTilesManager {
  parent: Control
  AcquireObject: (this: ZoWorldMapTilesManager, key: number) => TextureControl
  GetActiveObject: (this: ZoWorldMapTilesManager, key: number) => TextureControl
  ReleaseAllObjects: (this: ZoWorldMapTilesManager) => void
}
interface ZoWorldMapTilesManagerClass {
  New: (this: ZoWorldMapTilesManagerClass, parent: Control) => ZoWorldMapTilesManager
}
declare const ZO_WorldMapTiles_Manager: ZoWorldMapTilesManagerClass

declare function GetMapNumTilesForMapId(
  this: void,
  mapId: number
): LuaMultiReturn<[horizontal: number, vertical: number]>

interface ZoListDialogRow extends Control {
  dataEntry?: unknown
}
interface ZoListDialog<T> {
  list: Control
  GetControl: (this: ZoListDialog<T>) => Control
  GetButton: (this: ZoListDialog<T>, index: number) => Control
  GetSelectedItem: (this: ZoListDialog<T>) => T | undefined
  GetSelectedItems: (this: ZoListDialog<T>) => T[]
  SetFirstButtonEnabled: (this: ZoListDialog<T>, enabled: boolean) => void
  SetAboveText: (this: ZoListDialog<T>, text?: string) => void
  SetBelowText: (this: ZoListDialog<T>, text?: string) => void
  SetEmptyListText: (this: ZoListDialog<T>, text?: string) => void
  ClearList: (this: ZoListDialog<T>) => void
  AddListItem: (this: ZoListDialog<T>, item: T) => void
  CommitList: (this: ZoListDialog<T>) => void
}
interface ZoListDialogClass {
  New: <T>(
    this: ZoListDialogClass,
    templateName: string,
    rowHeight: number,
    setupFunction: (this: void, rowControl: ZoListDialogRow, item: T) => void
  ) => ZoListDialog<T>
}
declare const ZO_ListDialog: ZoListDialogClass
declare const ZO_MultiSelectListDialog: ZoListDialogClass

interface ZoReversibleAnimationProvider {
  PlayForward: (this: ZoReversibleAnimationProvider, control: Control, instant?: boolean) => void
  PlayBackward: (this: ZoReversibleAnimationProvider, control: Control, instant?: boolean) => void
}
interface ZoReversibleAnimationProviderClass {
  New: (this: ZoReversibleAnimationProviderClass, template: string) => ZoReversibleAnimationProvider
}
declare const ZO_ReversibleAnimationProvider: ZoReversibleAnimationProviderClass

declare function ZO_CombineNumericallyIndexedTables<T>(
  this: void,
  target: T[],
  ...sources: T[][]
): T[]

declare function GetGamepadLeftStickX(this: void): number
declare function GetGamepadLeftStickY(this: void): number
declare function GetGamepadRightStickX(this: void): number
declare function GetGamepadRightStickY(this: void): number
declare function GetGamepadLeftTriggerMagnitude(this: void): number
declare function GetGamepadRightTriggerMagnitude(this: void): number

interface WindowManager {
  CreateCursor: (this: WindowManager, x: number, y: number) => number
  DestroyCursor: (this: WindowManager, cursorId: number) => void
  UpdateCursorPosition: (this: WindowManager, cursorId: number, x: number, y: number) => void
  GetCursorPosition: (
    this: WindowManager,
    cursorId: number
  ) => LuaMultiReturn<[x: number, y: number]>
  GetControlAtCursor: (this: WindowManager, cursorId: number | undefined) => Control
}

interface KeybindButtonControl extends Control {
  SetCustomKeyIcon: (this: KeybindButtonControl, texture: string) => void
  SetText: (this: KeybindButtonControl, text: string) => void
}

declare function ZO_WorldMap_GetTooltipForMode(this: void, mode: number): unknown
declare function ZO_SharedGamepadEntry_OnSetup(
  this: void,
  control: Control,
  data: unknown,
  ...rest: unknown[]
): void
declare function ZO_GenericGamepadDialog_GetControl(this: void, dialogType: number): ZO_DialogData

declare const DEFAULT_SCENE_TRANSITION_TIME: number
declare const SI_GAMEPAD_SELECT_OPTION: number
declare const SI_GAMEPAD_CONTACTS_EDIT_NOTE_CONFIRM: number
