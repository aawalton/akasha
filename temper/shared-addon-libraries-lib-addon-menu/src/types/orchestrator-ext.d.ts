declare const SCENE_FRAGMENT_SHOWN: number
declare const SCENE_FRAGMENT_HIDDEN: number

interface SceneManager {
  CallWhen(
    this: SceneManager,
    sceneName: string,
    state: number,
    callback: (this: void) => void
  ): void
  AddFragment(this: SceneManager, fragment: ZoFadeSceneFragment): void
  RemoveFragment(this: SceneManager, fragment: ZoFadeSceneFragment): void
}

declare function SetCameraOptionsPreviewModeEnabled(this: void, enabled: boolean): void

interface Scene {
  GetState(this: Scene): number
}

declare const LAMAddonSettingsWindow: Control

declare let LAMAddonSettingsFragment: ZoFadeSceneFragment | undefined

declare const LAMSettingsPanelCreated: unknown
declare let LAMCompatibilityWarning: boolean | undefined
