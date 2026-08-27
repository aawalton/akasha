declare const SI_LORE_READER_NEXT_PAGE: number
declare const SI_LORE_READER_PREVIOUS_PAGE: number
declare const SI_LORE_READER_PREV_PAGE: number
declare const SI_DIALOG_EXIT: number

interface LibSetsCopyDialogControl {
  _object?: unknown
  GetNamedChild: (this: LibSetsCopyDialogControl, name: string) => LibSetsCopyDialogChild
  GetWidth: (this: LibSetsCopyDialogControl) => number
  IsHidden: (this: LibSetsCopyDialogControl) => boolean
  SetHidden: (this: LibSetsCopyDialogControl, hidden: boolean) => void
}

interface LibSetsCopyDialogChild {
  SetText: (this: LibSetsCopyDialogChild, text: string) => void
  SetHidden: (this: LibSetsCopyDialogChild, hidden: boolean) => void
  SetEditEnabled: (this: LibSetsCopyDialogChild, enabled: boolean) => void
  SelectAll: (this: LibSetsCopyDialogChild) => void
  TakeFocus: (this: LibSetsCopyDialogChild) => void
  SetDimensionConstraints: (
    this: LibSetsCopyDialogChild,
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
  ) => void
  SetDimensions: (this: LibSetsCopyDialogChild, width: number, height: number) => void
}

declare function GetControl(
  this: void,
  control: LibSetsCopyDialogControl,
  suffix: string
): LibSetsCopyDialogChild

interface LibSetsCopyDialogInfo {
  customControl: LibSetsCopyDialogControl
  title: { text: string }
  setup: (this: void, dialog: unknown, data: LibSetsCopyDialogData | undefined) => void
  buttons: ReadonlyArray<{
    control: LibSetsCopyDialogChild
    text: number
    keybind: string
  }>
}

interface LibSetsCopyDialogData {
  text?: string
  setData?: {
    nameClean?: string
    name?: string
    setId?: number
  }
}

declare function ZO_Dialogs_RegisterCustomDialog(
  this: void,
  name: string,
  info: LibSetsCopyDialogInfo
): void
declare function ZO_Dialogs_ShowDialog(
  this: void,
  name: string,
  data?: LibSetsCopyDialogData,
  textParams?: { [param: string]: string }
): void
declare function ZO_Dialogs_ReleaseDialog(this: void, name: string): void

interface LibSetsCopyDialog {
  control: LibSetsCopyDialogControl
  dialogName: string
  title: LibSetsCopyDialogChild
  text: LibSetsCopyDialogChild
  prevButton: LibSetsCopyDialogChild
  nextButton: LibSetsCopyDialogChild
  textContent?: string
  messageTable?: string[]
  messageTableId?: number

  IsShown: (this: LibSetsCopyDialog) => boolean
  OnShow: (this: LibSetsCopyDialog) => void
  Show: (
    this: LibSetsCopyDialog,
    dialogData?: LibSetsCopyDialogData,
    textParams?: { [param: string]: string }
  ) => void
  OnHide: (this: LibSetsCopyDialog) => void
  Hide: (this: LibSetsCopyDialog) => void
  PreviousPage: (this: LibSetsCopyDialog) => void
  NextPage: (this: LibSetsCopyDialog) => void
  UpdateEditAndButtons: (this: LibSetsCopyDialog) => void
  SetupDialog: (
    this: LibSetsCopyDialog,
    control: LibSetsCopyDialogControl,
    dialog: unknown,
    data: LibSetsCopyDialogData | undefined
  ) => void
}

interface LibSetsLib {
  CopyDialog: LibSetsCopyDialog
}
