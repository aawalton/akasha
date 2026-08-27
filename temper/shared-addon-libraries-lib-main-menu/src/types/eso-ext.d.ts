declare type Descriptor = number | string

interface LmmCategoryLayoutInfo {
  descriptor?: Descriptor
  indicators?: unknown
  [key: string]: unknown
}

interface LmmCategoryInfo {
  barControls: unknown[]
  subcategoryBar: Control
  subcategoryBarFragment: SceneFragment
  sceneName?: string
  lastSceneName?: string
  lastSceneGroupName?: string
  hideCategoryBar?: boolean
}

interface LmmSceneInfo {
  category: number
  sceneName: string
  sceneGroupName?: string
}

interface LmmMenuBarIconData {
  descriptor: string
  categoryName: number
  callback?: (this: void) => void
  enabled?: boolean
  [key: string]: unknown
}

interface LmmSceneGroupInfo {
  menuBarIconData: LmmMenuBarIconData[]
  category: number
  sceneGroupBarFragment: SceneFragment
}

interface LmmButtonData {
  visible?: (this: void, buttonData: LmmButtonData) => boolean
  callback?: (this: void, buttonData: LmmButtonData) => void
  [key: string]: unknown
}

interface MainMenuKeyboard {
  RefreshCategoryIndicators(): void
  IsShowing(): boolean
  SetLastSceneName(categoryInfo: LmmCategoryInfo, sceneName: string): void
  lastCategory: number
  ignoreCallbacks: boolean
  control: Control
  categoryBar: Control
  categoryInfo: Record<Descriptor, LmmCategoryInfo>
  sceneInfo: Record<string, LmmSceneInfo>
  sceneGroupInfo: Record<string, LmmSceneGroupInfo>
  categoryAreaFragments: SceneFragment[]
}

interface SceneManager {
  GetCurrentScene(): Scene
  GetSceneGroup(sceneGroupName: string): SceneGroup
  ShowBaseScene(): void
}
interface Scene {
  UnregisterCallback(event: string, callback: (oldState: number, newState: number) => void): void
}
interface SceneGroup {
  SetActiveScene(sceneName: string): void
  GetActiveScene(): string
  GetNumScenes(): number
  GetSceneName(index: number): string
}
interface SceneFragment {
  IsShowing(): boolean
}

interface WindowManager {
  IsSecureRenderModeEnabled(): boolean
}

interface Control {
  GetNamedChild(name: string): Control
  SetHandler(event: string, handler: (this: void, ...args: never[]) => void): void
}

declare const MENU_CATEGORY_MARKET: number
declare const MENU_CATEGORY_INVENTORY: number

declare function CreateControl<T extends Control = Control>(
  name: string,
  parent: Control,
  controlType: number
): T
declare function CreateTopLevelWindow<T extends TopLevelWindow = TopLevelWindow>(name: string): T

declare const ZO_CONTRAST_TEXT: ZoColorDef

interface ZoFadeSceneFragmentClass {
  New(control: Control): SceneFragment
}
declare const ZO_FadeSceneFragment: ZoFadeSceneFragmentClass

declare function ZO_MenuBar_AddButton(menuBar: Control, buttonData: object): void
declare function ZO_MenuBar_SelectDescriptor(
  menuBar: Control,
  descriptor: Descriptor,
  skipAnimation?: boolean
): boolean
declare function ZO_MenuBar_GetSelectedDescriptor(menuBar: Control): Descriptor
declare function ZO_MenuBar_ClearSelection(menuBar: Control): void
declare function ZO_MenuBar_UpdateButtons(menuBar: Control): void
declare function ZO_MenuBar_ClearButtons(menuBar: Control): void
declare function ZO_MenuBar_SetDescriptorEnabled(
  menuBar: Control,
  descriptor: Descriptor,
  enabled: boolean
): void
declare function ZO_MenuBar_SelectFirstVisibleButton(
  menuBar: Control,
  skipAnimation?: boolean
): void
declare function ZO_MenuBar_GetButtonControl(
  menuBar: Control,
  descriptor: Descriptor | undefined
): Control | undefined
