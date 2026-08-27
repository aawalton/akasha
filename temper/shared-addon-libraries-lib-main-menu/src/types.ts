export interface TabControl {
  sceneGroupName?: string
}

export interface Lib {
  name: string
  version: number
  initialized?: boolean

  CATEGORY_LAYOUT_INFO: LmmCategoryLayoutInfo[]
  control: Control
  categoryBar: Control
  categoryBarFragment: SceneFragment
  sceneGroupBar: Control
  sceneGroupBarLabel: LabelControl
  tabPressedCallback: (this: void, ctrl: TabControl) => void
  sceneShowCallback: (this: void, oldState: number, newState: number) => void
  sceneShowGroupName?: string
  categoryInfo: Record<Descriptor, LmmCategoryInfo>
  sceneInfo: Record<string, LmmSceneInfo>
  sceneGroupInfo: Record<string, LmmSceneGroupInfo>
  categoryAreaFragments: SceneFragment[]
  ignoreCallbacks?: boolean

  Init: (this: Lib) => void
  AddMenuItem: (
    this: Lib,
    a: Descriptor,
    b: string | LmmCategoryLayoutInfo,
    c?: LmmCategoryLayoutInfo,
    d?: string
  ) => void
  SelectMenuItem: (this: Lib, descriptor: Descriptor) => void
  Refresh: (this: Lib) => void
  SetupSceneGroupBar: (this: Lib, category: number, sceneGroupName: string) => void
  AddCategory: (this: Lib, data: LmmCategoryLayoutInfo) => number
  RefreshCategoryIndicators: (this: Lib) => void
  AddCategoryAreaFragment: (this: Lib, fragment: SceneFragment) => void
  OnCategoryClicked: (this: Lib, category: number) => void
  ShowCategory: (this: Lib, category: number) => void
  ShowScene: (this: Lib, sceneName: string) => void
  ShowSceneGroup: (this: Lib, sceneGroupName: string, specificScene?: string) => void
  Update: (this: Lib, category: number, sceneName: string) => void
  SetLastSceneName: (this: Lib, categoryInfo: LmmCategoryInfo, sceneName: string) => void
  SetLastSceneGroupName: (this: Lib, categoryInfo: LmmCategoryInfo, sceneGroupName: string) => void
  IsShowing: (this: Lib) => boolean
  AddSceneGroup: (
    this: Lib,
    category: number,
    sceneGroupName: string,
    menuBarIconData: LmmMenuBarIconData[]
  ) => void
  HasLast: (this: Lib, categoryInfo: LmmCategoryInfo) => boolean
  AddRawScene: (
    this: Lib,
    sceneName: string,
    category: number,
    categoryInfo: LmmCategoryInfo,
    sceneGroupName?: string
  ) => Scene
  ToggleCategory: (this: Lib, category: number) => void
  ToggleSceneGroup: (this: Lib, sceneGroupName: string, specificScene?: string) => void
  ToggleScene: (this: Lib, sceneName: string) => void
  GetControl: (this: Lib) => Control
}
