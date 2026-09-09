type LamValued<T> = T | ((this: void) => T)

type StringValue = LamValued<string | number>

interface ListEntry {
  value: LamValued<string | number | boolean>
  uniqueKey: number
  text: StringValue
  tooltip?: StringValue
}

interface AddEntryDialogData {
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

interface OrderListBoxData {
  type: "orderlistbox"
  name: StringValue
  listEntries: ListEntry[]
  getFunc: (this: void) => ListEntry[]
  setFunc: (this: void, entries: ListEntry[]) => undefined
  tooltip?: StringValue
  width?: "full" | "half"
  isExtraWide?: LamValued<boolean>
  minHeight?: LamValued<number>
  maxHeight?: LamValued<number>
  rowHeight?: LamValued<number>
  rowTemplate?: LamValued<string>
  rowFont?: LamValued<string>
  rowMaxLineCount?: LamValued<number>
  rowSelectionTemplate?: LamValued<string>
  rowSelectedCallback?: RowSelectedCallback
  rowHideCallback?: (this: void, rowControl: Control, data?: unknown) => undefined
  dataTypeSelectSound?: LamValued<string>
  dataTypeResetControlCallback?: (this: void, control: Control) => undefined
  disableDrag?: LamValued<boolean>
  disableButtons?: LamValued<boolean>
  showPosition?: LamValued<boolean>
  showValue?: LamValued<boolean>
  showValueAtTooltip?: LamValued<boolean>
  addEntryDialog?: LamValued<AddEntryDialogData>
  addEntryCallbackFunction?: (
    this: void,
    orderListBox: OrderListBox,
    newEntry: ListEntry,
    data: OrderListBoxData
  ) => boolean
  showRemoveEntryButton?: LamValued<boolean>
  askBeforeRemoveEntry?: LamValued<boolean>
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
  disabled?: LamValued<boolean>
  warning?: StringValue
  requiresReload?: boolean
  default?: LamValued<ListEntry[]>
  helpUrl?: LamValued<string>
  reference?: LamValued<string>
  tooltipText?: string | number
}

type RowSelectedCallback = (
  this: void,
  orderListBox: OrderListBox,
  previouslySelectedData: unknown,
  selectedData: unknown,
  reselectingDuringRebuild?: boolean
) => undefined

interface LamControl extends Control {
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
  UpdateValue: (this: LamControl, forceDefault?: boolean, value?: ListEntry[]) => undefined
  UpdateDisabled: (this: LamControl) => undefined
  UpdateWarning?: (this: LamControl) => undefined
}

interface OrderScrollList extends Control {
  data: ZoScrollListDataEntry<ListEntry>[]
  scrollbar: ScrollbarControl
  contents: Control
  selectedDataIndex?: number
}

interface OrderRowControl extends LabelControl {
  index: number
  dataEntry: { data: ListEntry }
}

interface OrderButtonControl extends ButtonControl {
  data: { tooltipText: string | number | undefined }
}

interface LamCursorTLC extends Control {
  orderListBox?: OrderListBox
}

interface OrderListBox {
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
  rowHideCallback?: (this: void, rowControl: Control, data?: unknown) => undefined
  dataTypeSelectSound?: string
  dataTypeResetControlCallback?: (this: void, control: Control) => undefined
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
  ) => undefined
  RowSetupFunction: (
    this: OrderListBox,
    rowControl: OrderRowControl,
    data: ListEntry,
    scrollList: OrderScrollList
  ) => undefined
  OnRowSelected: (
    this: OrderListBox,
    previouslySelectedData: unknown,
    selectedData: unknown,
    reselectingDuringRebuild: boolean | undefined,
    buttonMoveUpControl: Control,
    buttonMoveDownControl: Control,
    buttonMoveTotalUpControl: Control,
    buttonMoveTotalDownControl: Control
  ) => undefined
  MoveItem: (
    this: OrderListBox,
    selectedIndex: number | undefined,
    moveUp: boolean | undefined,
    moveToIndex: number | undefined,
    moveToTopOrBottom: boolean | undefined
  ) => undefined
  UpdateMoveButtonsEnabledState: (this: OrderListBox, newIndex?: number) => undefined
  OnGlobalMouseDownDuringDrag: (this: OrderListBox, ...args: unknown[]) => undefined
  OnGlobalMouseUpDuringDrag: (this: OrderListBox, ...args: unknown[]) => undefined
  UpdateCursorTLC: (this: OrderListBox, isHidden: boolean, draggedControl?: Control) => undefined
  DragOnUpdateCallback: (this: OrderListBox, draggedControl: OrderRowControl) => undefined
  StartDragging: (
    this: OrderListBox,
    draggedControl: OrderRowControl,
    mouseButton: number
  ) => undefined
  StopDragging: (this: OrderListBox, draggedOnToControl: OrderRowControl) => undefined
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
  ShowAddNewEntryDialog: (this: OrderListBox, dialogName?: string) => undefined
  ShowAskBeforeRemoveEntryDialog: (this: OrderListBox, dialogName?: string) => undefined
}
