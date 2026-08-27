interface SceneManager {
  scenes: Record<string, Scene | undefined>
}

interface EndInWorldInteractionsFragment {
  OnShown: (this: EndInWorldInteractionsFragment) => void
}
declare const END_IN_WORLD_INTERACTIONS_FRAGMENT: EndInWorldInteractionsFragment
declare const TREASURE_MAP_INVENTORY_SCENE: Scene

interface Scene {
  HasFragment(fragment: SceneFragment): boolean
  IsShowing(): boolean
}
declare const FRAME_TARGET_CENTERED_FRAGMENT: SceneFragment
declare function EndPendingInteraction(this: void): void

declare const LOOT_WINDOW: {
  list: {
    contents: Control
    data?: ReadonlyArray<{ control?: Control } | undefined>
  }
}

interface WindowManager {
  SetMouseFocusByName(name: string): void
}

interface ButtonControl {
  SetFont(font: string): void
}

declare function ZO_SceneManager_ToggleGameMenuBinding(this: void): void
