declare const ZO_GAMEPAD_CONTENT_TITLE_DIVIDER_PADDING_Y: number

declare var UpdateCustomScrollableMenuEntryPath: (this: void, ...args: unknown[]) => unknown
declare var UpdateCustomScrollableMenuEntryIconPath: (this: void, ...args: unknown[]) => unknown
declare const RunCustomScrollableMenuItemsCallback: (
  this: void,
  comboBox: unknown,
  item: unknown,
  callback: unknown,
  filterEntryTypes: unknown,
  fromParentMenu: unknown,
  ...args: unknown[]
) => LuaMultiReturn<[boolean, unknown]>
declare const PreventCustomScrollableContextMenuHide: (this: void) => undefined
declare const IsCustomScrollableContextMenuShown: (this: void) => boolean

interface DropdownRowControl {
  m_dropdownObject?: DropdownObject
  m_owner?: DropdownComboBox
  m_data?: { m_index?: number; [key: string]: unknown }
  m_icon?: DropdownMultiIconControl
  m_button?: DropdownEntryButton
  m_submenu?: DropdownObject
  typeId?: number
  isSubmenu?: boolean
  closeOnSelect?: unknown
  highlightAnimationFieldName?: string
  LSM_rowHighlightData?: DropdownRowHighlightData | undefined
  LSM_HighlightAnimation?: unknown
  customEntryTemplate?: string
  GetOwningWindow: (this: DropdownRowControl) => Control | undefined
  GetName: (this: DropdownRowControl) => string
  GetRight: (this: DropdownRowControl) => number
  IsHidden: (this: DropdownRowControl) => boolean
  HasFocus: (this: DropdownRowControl) => boolean
  GetText: (this: DropdownRowControl) => string
  GetValue: (this: DropdownRowControl) => number
  [key: string]: unknown
}

interface DropdownRowHighlightData {
  highlightControlName?: string
  animationFieldName?: string
  highlightXMLTemplate?: unknown
  highlightControlXMLTemplate?: unknown
}

interface DropdownMultiIconControl {
  iconData: readonly unknown[]
  HasIcon: (this: DropdownMultiIconControl) => boolean
  [key: string]: unknown
}

interface DropdownEntryButton {
  m_buttonGroup?: { Remove: (this: unknown, button: DropdownEntryButton) => undefined }
  m_buttonGroupIndex?: number
  [key: string]: unknown
}

interface DropdownHeaderControl {
  controls: Record<number, DropdownHeaderChildControl>
  filterBox?: DropdownRowControl
  IsHidden: (this: DropdownHeaderControl) => boolean
  SetHidden: (this: DropdownHeaderControl, hidden: boolean) => undefined
  SetHeight: (this: DropdownHeaderControl, height: number) => undefined
  GetWidth: (this: DropdownHeaderControl) => number
  SetWidth: (this: DropdownHeaderControl, width: number) => undefined
  SetDimensionConstraints: (this: DropdownHeaderControl, minW: number, minH: number) => undefined
  [key: string]: unknown
}

interface DropdownHeaderChildControl {
  controls?: Record<number, DropdownHeaderChildControl>
  ClearAnchors: (this: DropdownHeaderChildControl) => undefined
  SetHidden: (this: DropdownHeaderChildControl, hidden: boolean) => undefined
  IsHidden: (this: DropdownHeaderChildControl) => boolean
  SetHeight: (this: DropdownHeaderChildControl, height: number) => undefined
  GetHeight: (this: DropdownHeaderChildControl) => number
  SetWidth: (this: DropdownHeaderChildControl, width: number) => undefined
  SetDimensions: (
    this: DropdownHeaderChildControl,
    width: number | string,
    height: number | string
  ) => undefined
  GetDimensions: (this: DropdownHeaderChildControl) => LuaMultiReturn<[number, number]>
  SetHorizontalAlignment: (this: DropdownHeaderChildControl, alignment: number) => undefined
  SetFont: (this: DropdownHeaderChildControl, font: string) => undefined
  SetText: (this: DropdownHeaderChildControl, text: unknown) => undefined
  SetColor: (
    this: DropdownHeaderChildControl,
    r: number,
    g: number,
    b: number,
    a: number
  ) => undefined
  SetMouseEnabled: (this: DropdownHeaderChildControl, enabled: boolean) => undefined
  SetParent: (this: DropdownHeaderChildControl, parent: DropdownHeaderChildControl) => undefined
  ClearIcons: (this: DropdownHeaderChildControl) => undefined
  AddIcon: (
    this: DropdownHeaderChildControl,
    texture: unknown,
    tint: unknown,
    narration: unknown
  ) => undefined
  SetAnchor: (
    this: DropdownHeaderChildControl,
    point: number,
    relativeTo: unknown,
    relativePoint: number,
    x: number,
    y: number
  ) => undefined
  Show: (this: DropdownHeaderChildControl) => undefined
  [key: string]: unknown
}

interface DropdownComboBox {
  openingControl?: DropdownRowControl
  isSubmenu?: boolean
  isContextMenu?: boolean
  m_enableMultiSelect?: unknown
  m_parentMenu?: DropdownComboBox
  m_scroll?: Control
  m_sortOrder?: number
  m_owner?: DropdownComboBox
  filterString?: string
  [key: string]: unknown
}

interface DropdownClassPrivate {
  checkIfContextMenuVisibleAndBringToTopAgain: (
    this: void,
    dropdown: unknown,
    comboBox: unknown,
    delay?: number
  ) => undefined
  LSM_CheckIfAnimationControlNeedsXMLTemplateChange: (
    this: void,
    control: unknown,
    controlTemplate: unknown
  ) => boolean
  checkIfEntryRaisesAutomaticUpdate: (
    this: void,
    comboBox: unknown,
    control: unknown,
    data: unknown,
    checkFuncForRefresh: unknown,
    ...args: unknown[]
  ) => unknown
  checkFuncOnMouseUpRunHandler_NoCurrentMenuUpdate: (
    this: void,
    comboBox: unknown,
    control: unknown,
    data: unknown,
    isRecursiveCall: unknown,
    ...args: unknown[]
  ) => boolean
  clearTimeout: (this: void) => undefined
  setTimeout: (this: void, callback?: (this: void) => undefined) => undefined
  checkWhereToShowSubmenu: (
    this: void,
    selfVar: DropdownObject
  ) => LuaMultiReturn<[boolean, boolean]>
  itemPassesFilter: (
    this: void,
    item: unknown,
    comboBox: unknown,
    doFilter: unknown,
    dropdownObject: unknown
  ) => unknown
  poolControlReset: (this: void, selfVar: unknown, ...args: unknown[]) => undefined
  getScrollContentsTemplate: (this: void, barHidden: unknown) => string
  runHandler: (
    this: void,
    selfVar: DropdownObject,
    handlerTable: Record<number, unknown>,
    control: unknown,
    ...args: unknown[]
  ) => unknown
  handlerFunctions: Record<
    string,
    Record<
      number,
      (this: void, selfVar: DropdownObject, control: unknown, ...args: unknown[]) => unknown
    >
  >
  createScrollableComboBoxEntry: (
    this: void,
    self: DropdownObject,
    item: unknown,
    index: number,
    entryType: number
  ) => ZoEntryDataInstance
  addEntryToScrollList: (
    this: void,
    self: DropdownObject,
    item: unknown,
    dataList: unknown[],
    index: number,
    allItemsHeight: number,
    largestEntryWidth: number,
    spacing: number,
    isLastEntry: boolean,
    isNoItemsMatchFilter: boolean,
    comboBoxObject: unknown
  ) => LuaMultiReturn<[number, number]>
  onEntryMouseUpExcludeEntryTypes: Record<number, boolean>
  doSubmenuOnMouseEnterNestedSubmenuChecks: (
    this: void,
    selfVar: unknown,
    control: unknown,
    data: unknown
  ) => undefined
  doOnMouseEnterNestedSubmenuChecks: (
    this: void,
    selfVar: unknown,
    control: unknown,
    data: unknown
  ) => undefined
  debugPrefix: string
  [key: string]: unknown
}

interface DropdownHeaderPrivate {
  header_updateAnchors: (
    this: void,
    comboBox: unknown,
    headerControl: DropdownHeaderControl,
    refreshResults: Record<number, unknown>,
    collapsed: boolean | undefined,
    isFilterEnabled: unknown,
    showToggleHeaderControls: boolean,
    toggleHeaderControlData: Record<number, Record<string, unknown>> | undefined,
    isSortEnabled: boolean | undefined
  ) => undefined
  [key: string]: unknown
}

interface DropdownClass {
  New: (this: DropdownClass, ...args: unknown[]) => DropdownObject
  Initialize: DropdownObject["Initialize"]
  SetupScrollList: DropdownObject["SetupScrollList"]
  [key: string]: unknown
}

interface AnchorClass {
  Subclass: (this: AnchorClass) => AnchorClass
  New: (
    this: AnchorClass,
    pointOnMe: number,
    targetId: number | undefined,
    pointOnTarget: number,
    offsetX: number,
    offsetY: number
  ) => AnchorObject
  [key: string]: unknown
}
