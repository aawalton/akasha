interface DropdownObject {
  control?: DropdownRowControl
  scrollControl?: DropdownScrollControl
  scroll?: unknown
  spacing?: number
  nextScrollTypeId?: number
  m_container?: unknown
  m_parentMenu?: DropdownObject
  m_submenu?: DropdownObject
  m_sortedItems?: unknown[]
  anchorRight?: boolean
  customEntryTemplateInfos?: Record<
    string,
    { typeId: number; entryHeight: number; widthPadding?: number }
  >
  wasTextSearchContextMenuEntryClicked?: unknown

  Initialize: (
    this: DropdownObject,
    comboBoxObject: DropdownComboBox,
    comboBoxContainer: Control,
    depth: number
  ) => undefined
  AddItems: (this: DropdownObject, items: unknown) => undefined
  AddItem: (this: DropdownObject, item: unknown) => undefined
  Narrate: (
    this: DropdownObject,
    eventName: string,
    ctrl: unknown,
    data?: unknown,
    hasSubmenu?: unknown,
    anchorPoint?: unknown
  ) => undefined
  GetFormattedNarrateEvent: (this: DropdownObject, suffix: string) => string
  SetupScrollList: (this: DropdownObject) => undefined
  AddCustomEntryTemplate: (
    this: DropdownObject,
    entryTemplate: string,
    entryHeight: number,
    setupFunction: unknown,
    widthPadding?: number
  ) => undefined
  GetSubMenuOpeningSide: (this: DropdownObject) => unknown
  AnchorToControl: (this: DropdownObject, parentControl: DropdownRowControl) => undefined
  AnchorToComboBox: (this: DropdownObject, comboBox: unknown) => undefined
  AnchorToMouse: (this: DropdownObject) => undefined
  GetSubmenu: (this: DropdownObject) => DropdownObject | undefined
  IsDropdownVisible: (this: DropdownObject) => boolean
  IsEnteringSubmenu: (this: DropdownObject) => boolean
  IsItemSelected: (this: DropdownObject, item: unknown) => boolean
  IsMouseOverOpeningControl: (this: DropdownObject) => boolean
  OnMouseEnterEntry: (this: DropdownObject, control: DropdownRowControl) => undefined
  OnMouseExitEntry: (this: DropdownObject, control: DropdownRowControl) => undefined
  OnMouseExitTimeout: (this: DropdownObject, control: unknown) => undefined
  OnEntrySelected: (this: DropdownObject, control: DropdownRowControl) => undefined
  OnEntryMouseUp: (
    this: DropdownObject,
    control: DropdownRowControl,
    button: number,
    upInside: boolean,
    ignoreHandler?: unknown,
    ctrl?: unknown,
    alt?: unknown,
    shift?: unknown,
    lsmEntryType?: number
  ) => undefined
  SelectItemByIndex: (this: DropdownObject, index: number, ignoreCallback?: unknown) => unknown
  RunItemCallback: (
    this: DropdownObject,
    item: { entryType?: number; [key: string]: unknown },
    ignoreCallback?: unknown
  ) => unknown
  UpdateHeight: (this: DropdownObject) => undefined
  UpdateWidth: (this: DropdownObject) => undefined
  OnShow: (this: DropdownObject, formattedEventName?: string) => undefined
  OnHide: (this: DropdownObject, formattedEventName?: string) => undefined
  Show: (
    this: DropdownObject,
    comboBox: DropdownComboBox,
    itemTable: unknown[],
    minWidth: number,
    maxWidth: number,
    maxHeight: number,
    spacing: number
  ) => undefined
  ShowSubmenu: (this: DropdownObject, control: unknown) => undefined
  ShowTooltip: (
    this: DropdownObject,
    control: unknown,
    data: { hasSubmenu?: unknown; [key: string]: unknown }
  ) => undefined
  HideDropdown: (this: DropdownObject) => undefined
  IsAutomaticRefreshEnabled: (this: DropdownObject) => LuaMultiReturn<[unknown, unknown]>
  SubmenuOrCurrentListRefresh: (
    this: DropdownObject,
    control: unknown,
    override?: unknown,
    refreshMainMenuOrSubmenu?: unknown
  ) => unknown
  Refresh: (
    this: DropdownObject,
    item?: { m_owner?: { m_scroll?: Control }; [key: string]: unknown }
  ) => undefined
  XMLHandler: (this: DropdownObject, selfVar: unknown, handlerName: string) => undefined
  WasTextSearchContextMenuEntryClicked: (
    this: DropdownObject,
    mocCtrl: DropdownRowControl | undefined
  ) => boolean
  SetFilterString: (this: DropdownObject, filterBox: DropdownRowControl) => undefined
  ShowFilterEditBoxHistory: (this: DropdownObject, filterBox: DropdownRowControl) => undefined
  OnFilterEditBoxMouseUp: (
    this: DropdownObject,
    filterBox: DropdownRowControl,
    button: number,
    upInside: boolean,
    ctrl?: unknown,
    alt?: unknown,
    shift?: unknown
  ) => undefined
  ResetFilters: (
    this: DropdownObject,
    owningWindow: { filterBox?: DropdownRowControl } | undefined
  ) => undefined
  IsFilterEnabled: (this: DropdownObject) => unknown
  Sort: (this: DropdownObject, owningWindow: unknown, sortUp?: boolean) => undefined
  IsSortEnabled: (this: DropdownObject) => unknown
  ApplyCustomSortButtonsData: (this: DropdownObject) => unknown
  ShowTextTooltip: (
    this: DropdownObject,
    control: DropdownRowControl,
    side: unknown,
    tooltipText: unknown,
    owningWindow?: { filterBox?: DropdownRowControl }
  ) => undefined
  OnEditBoxTextChanged: (this: DropdownObject, editBox: DropdownRowControl) => undefined
  OnSliderValueChanged: (this: DropdownObject, slider: DropdownRowControl) => undefined
  ToggleHeader: (this: DropdownObject, toggleButtonControl: Control) => undefined
}

interface DropdownScrollControl {
  contents?: unknown
  scrollbar: { owner?: unknown; IsHidden: (this: unknown) => boolean }
  upButton: { owner?: unknown }
  downButton: { owner?: unknown }
  highlightTemplateOrFunction?: (
    this: void,
    control: DropdownRowControl
  ) => LuaMultiReturn<[unknown, unknown]>
  highlightCallback?: (
    this: void,
    control: DropdownRowControl | undefined,
    isHighlighting: boolean
  ) => undefined
  [key: string]: unknown
}

interface AnchorObject {
  targetId?: number
  New: (
    this: AnchorObject,
    pointOnMe: number,
    targetId: number | undefined,
    pointOnTarget: number,
    offsetX: number,
    offsetY: number
  ) => AnchorObject
}
