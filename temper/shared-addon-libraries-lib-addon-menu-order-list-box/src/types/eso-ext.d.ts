declare const ZO_DEFAULT_ENABLED_COLOR: ZoColorDef
declare const ZO_DEFAULT_DISABLED_COLOR: ZoColorDef

declare function ZO_Options_OnMouseEnter(control: Control): void

declare function ZO_ScrollList_Commit(list: object): void
declare function ZO_ScrollList_EnableSelection(
  list: object,
  templateName: string,
  selectionCallback?: (
    this: void,
    previouslySelectedData: unknown,
    selectedData: unknown,
    reselectingDuringRebuild?: boolean
  ) => void
): void
declare function ZO_ScrollList_GetSelectedData(list: object): unknown
declare function ZO_ScrollList_GetSelectedDataIndex(list: object): number | undefined
declare function ZO_ScrollList_HasVisibleData(list: object): boolean
declare function ZO_ScrollList_SelectData(
  list: object,
  data: unknown,
  control?: unknown,
  animateInstantly?: unknown,
  reselectingDuringRebuild?: boolean
): void
declare function ZO_ScrollList_SelectDataAndScrollIntoView(
  list: object,
  data: unknown,
  control?: unknown,
  animateInstantly?: boolean
): void
declare function ZO_ScrollList_SelectPreviousData(
  list: object,
  control?: unknown,
  animateInstantly?: boolean
): void
declare function ZO_ScrollList_SelectNextData(
  list: object,
  control?: unknown,
  animateInstantly?: boolean
): void
declare function ZO_ScrollList_ScrollAbsolute(list: object, value: number): void
declare function ZO_ScrollList_ResetToTop(list: object): void
declare function ZO_ScrollList_ScrollRelative(
  list: object,
  value: number,
  onScrollCompleteCallback?: unknown,
  instant?: boolean
): void
declare function ZO_ScrollList_MouseClick(list: object, control: Control): void
declare function ZO_ScrollList_SetUseScrollbar(list: object, useScrollbar: boolean): void

declare function ZO_Dialogs_IsDialogRegistered(name: string): boolean
declare function ZO_Dialogs_ShowPlatformDialog(
  name: string,
  data?: unknown,
  textParams?: unknown
): void

declare const GAMEPAD_DIALOGS: Record<string, number>

interface LamDialogEditBoxControl extends Control {
  GetText(): string
}

interface LamDialogEditBoxInfo {
  textType?: number
  specialCharacters?: string[]
  maxInputCharacters?: number
  defaultText?: string
  instructions?: unknown
  selectAll?: boolean
  validatesText?: boolean
  validator?: ((this: void, text: string) => boolean) | undefined
}

interface LamDialogButtonInfo {
  text: string | number
  callback?: (this: void, dialog: Control) => void
}

interface LamOrderListBoxDialogInfo {
  gamepadInfo?: { dialogType?: number }
  title?: { text: string | number | undefined }
  mainText?: { text: string | number | undefined }
  editBox?: LamDialogEditBoxInfo
  buttons?: LamDialogButtonInfo[]
}

declare function ZO_Dialogs_RegisterCustomDialog(
  name: string,
  info: LamOrderListBoxDialogInfo
): void

declare function moc(): Control | undefined

declare const GuiMouse: Control

interface WindowManager {
  CreateControlFromVirtual<T extends Control = Control>(
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ): T
}

interface Control {
  SetPressedOffset(x: number, y: number): void
  SetMaxLineCount(count: number): void
  SetNormalTexture(texture: string): void
  SetMouseOverTexture(texture: string): void
  SetPressedMouseOverTexture(texture: string): void
  SetPressedTexture(texture: string): void
  SetDisabledTexture(texture: string): void
  SetTextureCoords(left: number, right: number, top: number, bottom: number): void
  SetClickSound(sound: string): void
}

declare const SI_HOUSINGEDITORCOMMANDTYPE1: number
declare const SI_DIALOG_ACCEPT: number
declare const SI_DIALOG_EXIT: number

interface ScrollbarControl extends Control {
  GetMinMax(): LuaMultiReturn<[number, number]>
}

declare function ZO_ScrollList_AddDataType(
  listControl: object,
  typeId: number,
  templateName: string,
  height: number,
  setupCallback: (this: void, ...args: never[]) => void,
  hideCallback?: ((this: void, ...args: never[]) => void) | undefined,
  dataTypeSelectSound?: string | undefined,
  resetControlCallback?: ((this: void, ...args: never[]) => void) | undefined
): void
