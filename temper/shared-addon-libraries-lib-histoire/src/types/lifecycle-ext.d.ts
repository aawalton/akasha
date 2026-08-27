interface LibAddonMenu2Lib {
  RegisterAddonPanel(this: LibAddonMenu2Lib, name: string, panelData: object): unknown
  RegisterOptionControls(this: LibAddonMenu2Lib, name: string, optionsData: object): void
  OpenToPanel(this: LibAddonMenu2Lib, panel: unknown): void
}
declare const LibAddonMenu2: LibAddonMenu2Lib

interface LibHistoireEditBoxControl {
  SetEditEnabled(this: LibHistoireEditBoxControl, enabled: boolean): void
  SetSelectAllOnFocus(this: LibHistoireEditBoxControl, enabled: boolean): void
  SetCursorPosition(this: LibHistoireEditBoxControl, position: number): void
}
interface LibHistoireCachePathEditboxControl {
  editbox: LibHistoireEditBoxControl
}
declare const LibHistoireCachePathEditbox: LibHistoireCachePathEditboxControl

declare const GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN: number
declare const GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END: number

declare function ZO_Dialogs_ShowGamepadDialog(name: string, data?: object): void
declare function ZO_Dialogs_ReleaseDialogOnButtonPress(keybind: string): void

interface MainMenuKeyboard {
  ShowScene(this: MainMenuKeyboard, sceneName: string): void
}

interface LibHistoireWarningDialogButton {
  text: string | number
  callback?: (this: void, ...args: unknown[]) => unknown
}
interface LibHistoireWarningDialog {
  canQueue?: boolean
  gamepadInfo?: { dialogType: number }
  setup?: (this: void, dialog: LibHistoireWarningDialog) => void
  setupFunc?(this: LibHistoireWarningDialog): void
  title: { text: string | number }
  mainText: { text: string | number }
  buttons: {
    1: LibHistoireWarningDialogButton
    2: LibHistoireWarningDialogButton
    [index: number]: LibHistoireWarningDialogButton
  }
}

declare const SI_SLASH_LOGOUT: number
declare const SI_SLASH_CAMP: number
declare const SI_SLASH_QUIT: number
declare const SI_LOG_OUT_GAME_CONFIRM_KEYBIND: number
declare const SI_QUIT_GAME_CONFIRM_KEYBIND: number

declare function ClearGuildHistoryCache(guildId: number): boolean
