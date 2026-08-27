declare function ZO_PreHookHandler(
  control: Control,
  handlerName: string,
  hook: (this: void, ...args: never[]) => boolean | undefined
): boolean

interface EnchantSoundPlayer {
  PlaySound(): void
}

declare const ZO_StackSplit: Control

interface EditControl {
  SelectAll(): void
}

declare const ZO_StackSplitSpinnerDisplay: EditControl

declare const ZO_ProvisionerTopLevelTabsButton2: Control | undefined
declare const ZO_ProvisionerTopLevelTabsButton3: Control | undefined
declare const ZO_ProvisionerTopLevelTabsButton4: Control | undefined
declare const ZO_EnchantingTopLevelModeMenuBarButton1: Control
declare const ZO_EnchantingTopLevelModeMenuBarButton2: Control
declare const ZO_EnchantingTopLevelModeMenuBarButton3: Control

declare const CHAMPION_PERKS_SCENE: Scene

interface SceneManager {
  RegisterTopLevel(topLevelWindow: Control, locksUIMode: boolean): void
}

declare const DolgubonsWrits: object | undefined

declare const WritCreater: {
  savedVars: { tutorial: boolean | undefined }
}

declare const TemperCrafting_QuestText: LabelControl
declare const TemperCrafting_DolgubonsWritsEndpoint: LabelControl | undefined
declare const TemperCrafting_CookSpaceButtonName: LabelControl

declare var _CS: unknown
