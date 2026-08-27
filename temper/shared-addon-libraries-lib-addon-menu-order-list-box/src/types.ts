export type Valued<T> = T | ((this: void) => T)

export type StringValue = Valued<string | number>

export interface ListEntry {
  value: Valued<string | number | boolean>
  uniqueKey: number
  text: StringValue
  tooltip?: StringValue
}

export interface AddEntryDialogData {
  title?: StringValue
  text?: StringValue
  textType?: number
  buttonTexture?: string
  maxInputCharacters?: number
  specialCharacters?: string[]
  selectAll?: boolean
  defaultText?: string
  validatesText?: boolean
  validator?: (this: void, text: string) => boolean
  instructions?: unknown
}

export interface OrderListBoxData {
  type: "orderlistbox"
  name: StringValue
  listEntries: ListEntry[]
  getFunc: (this: void) => ListEntry[]
  setFunc: (this: void, entries: ListEntry[]) => void
  tooltip?: StringValue
  width?: "full" | "half"
  isExtraWide?: Valued<boolean>
  minHeight?: Valued<number>
  maxHeight?: Valued<number>
  rowHeight?: Valued<number>
  rowTemplate?: Valued<string>
  rowFont?: Valued<string>
  rowMaxLineCount?: Valued<number>
  rowSelectionTemplate?: Valued<string>
  rowSelectedCallback?: RowSelectedCallback
  rowHideCallback?: (this: void, rowControl: Control, data?: unknown) => void
  dataTypeSelectSound?: Valued<string>
  dataTypeResetControlCallback?: (this: void, control: Control) => void
  disableDrag?: Valued<boolean>
  disableButtons?: Valued<boolean>
  showPosition?: Valued<boolean>
  showValue?: Valued<boolean>
  showValueAtTooltip?: Valued<boolean>
  addEntryDialog?: Valued<AddEntryDialogData>
  addEntryCallbackFunction?: (
    this: void,
    orderListBox: OrderListBox,
    newEntry: ListEntry,
    data: OrderListBoxData
  ) => boolean
  showRemoveEntryButton?: Valued<boolean>
  askBeforeRemoveEntry?: Valued<boolean>
  removeEntryCheckFunction?: (
    this: void,
    orderListBox: OrderListBox,
    selectedIndex: number,
    data: OrderListBoxData
  ) => boolean
  removeEntryCallbackFunction?: (
    this: void,
    orderListBox: OrderListBox,
    selectedEntry: ListEntry,
    data: OrderListBoxData
  ) => boolean
  disabled?: Valued<boolean>
  warning?: StringValue
  requiresReload?: boolean
  default?: Valued<ListEntry[]>
  helpUrl?: Valued<string>
  reference?: Valued<string>
  tooltipText?: string | number
}

export type RowSelectedCallback = (
  this: void,
  orderListBox: OrderListBox,
  previouslySelectedData: unknown,
  selectedData: unknown,
  reselectingDuringRebuild?: boolean
) => void

export interface LamControl extends Control {
  data: OrderListBoxData
  container: Control
  label: LabelControl
  panel?: LamControl
  isHalfWidth?: boolean
  orderListBox: OrderListBox
  orderListBoxName: string
  isBuilding: boolean
  warning?: Control
  addNewEntryDialogName?: string
  askBeforeRemoveEntryDialogName?: string
  AddNewEntryButton?: Control
  AddNewValueButton?: Control
  RemoveEntryButton?: Control
  UpdateValue: (this: LamControl, forceDefault?: boolean, value?: ListEntry[]) => void
  UpdateDisabled: (this: LamControl) => void
  UpdateWarning?: (this: LamControl) => void
}

export interface OrderScrollList extends Control {
  data: ZoScrollListDataEntry<ListEntry>[]
  scrollbar: ScrollbarControl
  contents: Control
  selectedDataIndex?: number
}

export interface OrderRowControl extends LabelControl {
  index: number
  dataEntry: { data: ListEntry }
}

export interface OrderButtonControl extends Control {
  data: { tooltipText: string | number | undefined }
}

export interface CursorTLC extends Control {
  orderListBox?: OrderListBox
}

export interface OrderListBox {
  panel: LamControl
  control: LamControl
  name: string
  orderListBoxData: OrderListBoxData
  disabled: boolean
  areButtonsDisabled: boolean
  isDragDisabled: boolean
  showPosition: boolean
  showValue: boolean
  showValueAtTooltip: boolean
  rowHeight: number
  rowTemplate: string
  rowFont: string
  rowMaxLineCount: number
  rowSelectionTemplate: string
  rowSelectedCallback?: RowSelectedCallback
  rowHideCallback?: (this: void, rowControl: Control, data?: unknown) => void
  dataTypeSelectSound?: string
  dataTypeResetControlCallback?: (this: void, control: Control) => void
  scrollListControl: OrderScrollList
  moveUpButton: Control
  moveDownButton: Control
  moveTotalUpButton: Control
  moveTotalDownButton: Control
  masterList?: ListEntry[]
  draggingEntryId?: number
  draggingSortListContents?: Control
  draggingText?: string | number
  draggingUpdateTime?: number
  mouseButtonPressed?: number
  mouseDown?: boolean
  Populate: (this: OrderListBox, orderListBoxData: OrderListBoxData) => ListEntry[]
  UpdateScrollList: (
    this: OrderListBox,
    control: OrderScrollList,
    data: ListEntry[],
    rowDataType: number,
    lamControl: LamControl
  ) => void
  RowSetupFunction: (
    this: OrderListBox,
    rowControl: OrderRowControl,
    data: ListEntry,
    scrollList: OrderScrollList
  ) => void
  OnRowSelected: (
    this: OrderListBox,
    previouslySelectedData: unknown,
    selectedData: unknown,
    reselectingDuringRebuild: boolean | undefined,
    buttonMoveUpControl: Control,
    buttonMoveDownControl: Control,
    buttonMoveTotalUpControl: Control,
    buttonMoveTotalDownControl: Control
  ) => void
  MoveItem: (
    this: OrderListBox,
    selectedIndex: number | undefined,
    moveUp: boolean | undefined,
    moveToIndex: number | undefined,
    moveToTopOrBottom: boolean | undefined
  ) => void
  UpdateMoveButtonsEnabledState: (this: OrderListBox, newIndex?: number) => void
  OnGlobalMouseDownDuringDrag: (this: OrderListBox, ...args: unknown[]) => void
  OnGlobalMouseUpDuringDrag: (this: OrderListBox, ...args: unknown[]) => void
  UpdateCursorTLC: (this: OrderListBox, isHidden: boolean, draggedControl?: Control) => void
  DragOnUpdateCallback: (this: OrderListBox, draggedControl: OrderRowControl) => void
  StartDragging: (this: OrderListBox, draggedControl: OrderRowControl, mouseButton: number) => void
  StopDragging: (this: OrderListBox, draggedOnToControl: OrderRowControl) => void
  GetCurrentEntries: (this: OrderListBox) => ListEntry[] | undefined
  RemoveValue: (this: OrderListBox, index?: number, uniqueKey?: number) => boolean
  RemoveSelectedEntry: (this: OrderListBox) => boolean | undefined
  AddNewEntry: (
    this: OrderListBox,
    newText?: string,
    newValue?: string | number,
    validateFunction?: (this: void, text: string) => boolean
  ) => boolean | undefined
  AddNewEntryFromDialog: (
    this: OrderListBox,
    newText?: string,
    validateFunction?: (this: void, text: string) => boolean
  ) => boolean | undefined
  ShowAddNewEntryDialog: (this: OrderListBox, dialogName?: string) => void
  ShowAskBeforeRemoveEntryDialog: (this: OrderListBox, dialogName?: string) => void
}
