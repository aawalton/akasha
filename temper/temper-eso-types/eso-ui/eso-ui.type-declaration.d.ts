interface Control {
  GetName: () => string
  SetHidden: (hidden: boolean) => void
  IsHidden: () => boolean
  IsControlHidden: () => boolean
  SetExcludeFromResizeToFitExtents: (exclude: boolean) => void
  SetAlpha: (alpha: number) => void
  GetAlpha: () => number
  SetDimensions: (width: number, height: number) => void
  GetWidth: () => number
  GetHeight: () => number
  GetDimensions: () => LuaMultiReturn<[number, number]>
  SetAnchor: (
    point: number,
    relativeTo?: Control,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number,
    constrains?: number
  ) => void
  ClearAnchors: () => void
  SetParent: (parent: Control) => void
  GetParent: <T extends Control = Control>() => T | undefined
  GetChild: (<T extends Control = Control>(name: string) => T | undefined) &
    (<T extends Control = BuffDebuffIconControl>(index: number) => T | undefined)

  GetNumChildren: () => number
  GetNamedChild: <T extends Control = Control>(name: string) => T | undefined
  SetMouseEnabled: (enabled: boolean) => void
  SetHandler: (
    event: string,
    handler: ((this: void, ...args: never[]) => void) | undefined,
    name?: string
  ) => void
  GetHandler: (event: string) => ((...args: unknown[]) => void) | undefined
  GetLeft: () => number
  GetRight: () => number
  GetTop: () => number
  GetBottom: () => number
  GetAnchor: (
    index: number
  ) => LuaMultiReturn<[boolean, number, Control | undefined, number, number, number, number]>
  SetAnchorFill: (control?: Control) => void
  SetResizeToFitDescendents: (resize: boolean) => void
  SetWidth: (width: number) => void
  SetScale: (scale: number) => void
  SetDrawTier: (tier: number) => void
  SetDrawLayer: (layer: number) => void
  SetDrawLevel: (level: number) => void
  GetDimensionConstraints: () => LuaMultiReturn<[number, number, number, number]>
  SetDimensionConstraints: (
    minWidth?: number,
    minHeight?: number,
    maxWidth?: number,
    maxHeight?: number
  ) => void
  GetType: () => number
}

declare function GetControl<T extends Control = Control>(
  control: Control,
  suffix: string
): T | undefined

interface LabelControl extends Control {
  SetText: (text: string | number) => void
  GetText: () => string
  GetTextWidth: () => number
  GetStringWidth: (text?: string) => number
  GetTextHeight: () => number
  SetHeight: (height: number) => void
  SetFont: (font: string) => void
  SetColor: (r: number, g: number, b: number, a?: number) => void
  SetHorizontalAlignment: (alignment: number) => void
  SetVerticalAlignment: (alignment: number) => void
  SetWrapMode: (wrapMode: number) => void
  SetLinkEnabled: (enabled: boolean) => void
}

interface TextureControl extends Control {
  SetTexture: (texture: string | undefined) => void
  SetTextureCoords: (left: number, right: number, top: number, bottom: number) => void
  SetColor: (r: number, g: number, b: number, a?: number) => void
  SetHeight: (height: number) => void
  SetBlendMode: (blendMode: number) => void
}

interface ButtonControl extends Control {
  SetText: (text: string) => void
  SetEnabled: (enabled: boolean) => void
  SetNormalTexture: (texture: string) => void
  SetPressedTexture: (texture: string) => void
  SetMouseOverTexture: (texture: string) => void
  SetClickSound: (sound: string) => void
  SetState: (state: number, locked?: boolean) => void
  GetState: () => number
}

interface TopLevelWindow extends Control {
  SetClampedToScreen: (clamped: boolean) => void
  SetMovable: (movable: boolean) => void
  GetLeft: () => number
  GetTop: () => number
  StartMoving: () => void
  StopMovingOrResizing: () => void
}

type CtControl = number & { readonly __ct: "CT_CONTROL" }
type CtLabel = number & { readonly __ct: "CT_LABEL" }
type CtTexture = number & { readonly __ct: "CT_TEXTURE" }
type CtButton = number & { readonly __ct: "CT_BUTTON" }
type CtTopLevel = number & { readonly __ct: "CT_TOPLEVELCONTROL" }
type CtScroll = number & { readonly __ct: "CT_SCROLL" }
type CtEditBox = number & { readonly __ct: "CT_EDITBOX" }
type CtBackdrop = number & { readonly __ct: "CT_BACKDROP" }
type CtSlider = number & { readonly __ct: "CT_SLIDER" }

interface WindowManager {
  CreateTopLevelWindow: (name: string) => TopLevelWindow
  CreateControl: ((
    name: string | undefined,
    parent: Control | undefined,
    controlType: CtLabel
  ) => LabelControl) &
    ((
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtTexture
    ) => TextureControl) &
    ((
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtButton
    ) => ButtonControl) &
    ((
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtEditBox
    ) => EditControl) &
    ((
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtBackdrop
    ) => BackdropControl) &
    ((
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtTopLevel
    ) => TopLevelWindow) &
    ((
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtSlider
    ) => SliderControl) &
    ((
      name: string | undefined,
      parent: Control | undefined,
      controlType: CtControl | CtScroll
    ) => Control)

  CreateControlFromVirtual: <T extends Control = Control>(
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ) => T
  GetControlByName: <T extends Control = Control>(
    name: string,
    namePrefix?: string
  ) => T | undefined
  GetMouseOverControl: () => Control | undefined
  SetMouseCursor: (cursor: number) => void
}

declare const WINDOW_MANAGER: WindowManager
declare const GuiRoot: Control

declare const BOSS_BAR: {
  control: Control
  bossHealthValues: Record<string, { health: number; maxHealth: number }>
}

declare const ZO_PlayerAttributeHealth: Control
declare const ZO_PlayerAttributeMagicka: Control
declare const ZO_PlayerAttributeStamina: Control
declare const ZO_BuffDebuffTopLevelSelfContainer: Control

interface BuffDebuffIconControl extends Control {
  readonly data?: { readonly abilityId?: number }
}

declare const CT_CONTROL: CtControl
declare const CT_LABEL: CtLabel
declare const CT_TEXTURE: CtTexture
declare const CT_BUTTON: CtButton
declare const CT_TOPLEVELCONTROL: CtTopLevel
declare const CT_SCROLL: CtScroll
declare const CT_EDITBOX: CtEditBox
declare const CT_BACKDROP: CtBackdrop

interface SceneFragment {
  readonly __brand: "SceneFragment"
  RegisterCallback: (event: string, callback: (oldState: number, newState: number) => void) => void
}

interface Scene {
  readonly name: string
  IsShowing: () => boolean
  HasFragment: (this: unknown, fragment: SceneFragment) => boolean
  AddFragment: (fragment: SceneFragment) => void
  RemoveFragment: (fragment: SceneFragment) => void
  RegisterCallback: (event: string, callback: (oldState: number, newState: number) => void) => void
}

interface SceneManager {
  readonly currentScene: Scene
  scenes: Record<string, Scene | undefined>
  GetCurrentScene: (this: SceneManager) => Scene
  SetInUIMode: (inUIMode: boolean) => void
  GetScene: (sceneName: string) => Scene
  RegisterTopLevel: (control: Control, locksUIMode: boolean) => void
  ToggleTopLevel: (window: TopLevelWindow) => void
  Show: (sceneName: string) => void
  ShowBaseScene: () => void
}
declare const SCENE_MANAGER: SceneManager

interface ChatWindow {
  key?: number
  tab: { index: number }
}

interface ChatContainer {
  windows: ChatWindow[]
  windowPool: {
    AcquireObject: () => LuaMultiReturn<[window: ChatWindow, key: number]>
  }
  GetTabName: (index: number) => string
  AddRawWindow: (window: ChatWindow, name: string) => void
  SetTabName: (index: number, name: string) => void
  RemoveWindow: (index: number) => void
  SetInteractivity: (tabIndex: number, interactive: boolean) => void
  SetLocked: (tabIndex: number, locked: boolean) => void
  SetWindowFilterEnabled: (tabIndex: number, category: number, enabled: boolean) => void
  AddMessageToWindow: (window: ChatWindow, text: string, r: number, g: number, b: number) => void
}

interface SharedChatSystem {
  containers: ChatContainer[]
  primaryContainer: ChatContainer
}

interface ZO_SimpleSceneFragment {
  New: (control: Control) => SceneFragment
}
declare const ZO_SimpleSceneFragment: ZO_SimpleSceneFragment

interface HUDFadeSceneFragment extends SceneFragment {
  IsHidden: () => boolean
  SetHiddenForReason: (
    reason: string,
    hidden: boolean,
    customShowDuration?: number,
    customHideDuration?: number
  ) => void
}

interface ActionBarButton {
  slot: Control
  usable: boolean
}

declare function ZO_ActionBar_GetButton(
  slotNum: number,
  hotbarCategory?: number
): ActionBarButton | undefined

interface ZO_HUDFadeSceneFragment {
  New: (control: Control, showDuration?: number, hideDuration?: number) => HUDFadeSceneFragment
}
declare const ZO_HUDFadeSceneFragment: ZO_HUDFadeSceneFragment

declare const PERFORMANCE_METER_FRAGMENT: HUDFadeSceneFragment | undefined

declare const HUD_SCENE: Scene
declare const HUD_UI_SCENE: Scene
declare const GAME_MENU_SCENE: Scene

declare const SCENE_HIDING: number
declare const SCENE_HIDDEN: number
declare const SCENE_SHOWING: number
declare const SCENE_SHOWN: number

declare const INVENTORY_FRAGMENT: SceneFragment
