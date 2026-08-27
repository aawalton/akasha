interface WorldMapFiltersObject {
  battlegroundPanel?: WorldMapFilterPanel
}

declare const ZO_WorldMapFiltersBattleground: Control | undefined
declare const ZO_WorldMapFiltersBattlegroundContainer: Control | undefined
declare const ZO_WorldMapFiltersBattlegroundContainerScrollChild: Control | undefined
declare const ZO_WorldMapFiltersBattlegroundCheckBox1: Control | undefined
declare const ZO_WorldMapFiltersBattlegroundComboBox1: Control | undefined

interface ResolvedFilterPanel {
  checkBoxPool: WorldMapFilterControlPool
  AnchorControl: (this: ResolvedFilterPanel, control: Control) => void
}

interface GamepadFilterPanel {
  control?: Control
  list?: GamepadParametricScrollList
  gamepadMapFiltersInfo?: object[]
  pinFilterCheckBoxes: object[]
  SetPinFilter: (this: GamepadFilterPanel, pinTypeId: number, enabled: boolean) => void
  BuildControls: (this: GamepadFilterPanel) => void
  SetupDropDown: (this: GamepadFilterPanel, ...args: unknown[]) => void
  [key: string]: unknown
}

interface GamepadWorldMapFilters {
  currentPanel?: GamepadFilterPanel
  pvePanel: GamepadFilterPanel
  pvpPanel: GamepadFilterPanel
  imperialPvPPanel: GamepadFilterPanel
  battlegroundPanel: GamepadFilterPanel
  SelectKeybind?: (this: GamepadWorldMapFilters) => void
  [key: string]: unknown
}
declare const GAMEPAD_WORLD_MAP_FILTERS: GamepadWorldMapFilters | undefined

interface GamepadParametricScrollList {
  SetAlignToScreenCenter: (this: GamepadParametricScrollList, align: boolean) => void
  SetOnSelectedDataChangedCallback: (
    this: GamepadParametricScrollList,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  AddDataTemplate: (
    this: GamepadParametricScrollList,
    templateName: string,
    setupFunction: unknown,
    equalityFunction: unknown
  ) => void
  AddDataTemplateWithHeader: (
    this: GamepadParametricScrollList,
    templateName: string,
    setupFunction: unknown,
    equalityFunction: unknown,
    selectionTemplate: unknown,
    headerTemplate: string
  ) => void
  AddEntry: (this: GamepadParametricScrollList, templateName: string, entryData: object) => void
}

interface GamepadParametricScrollListClass {
  New: (this: GamepadParametricScrollListClass, listControl: Control) => GamepadParametricScrollList
}
declare const ZO_GamepadVerticalParametricScrollList: GamepadParametricScrollListClass

interface ZoGamepadEntryDataInstance {
  currentValue: boolean
  SetDataSource: (this: ZoGamepadEntryDataInstance, dataSource: object) => void
  [key: string]: unknown
}
interface ZoGamepadEntryDataClass {
  New: (this: ZoGamepadEntryDataClass, displayName: string) => ZoGamepadEntryDataInstance
}
declare const ZO_GamepadEntryData: ZoGamepadEntryDataClass

declare const SCREEN_NARRATION_MANAGER: {
  QueueParametricListEntry: (this: unknown, list: GamepadParametricScrollList) => void
}

declare function ZO_FormatToggleNarrationText(this: void, text: string, value: boolean): unknown

declare const ZO_GamepadCheckboxOptionTemplate_Setup: unknown
declare const ZO_GamepadMenuEntryTemplateParametricListFunction: unknown

interface Control {
  IsControlHidden: (this: Control) => boolean
  oldOffsetY?: number
}

interface LibDebugLoggerInstance {
  Info: (this: LibDebugLoggerInstance, message: string) => void
  Debug: (this: LibDebugLoggerInstance, message: string) => void
  Verbose: (this: LibDebugLoggerInstance, message: string) => void
  Warn: (this: LibDebugLoggerInstance, message: string) => void
}
declare const LibDebugLogger:
  | {
      Create: (this: void, loggerName: string) => LibDebugLoggerInstance
    }
  | undefined

declare const DebugLogViewer: unknown | undefined
