interface LsmDebug {
  doDebug: boolean
  doVerboseDebug: boolean
  controlNameCache: Record<string, unknown>
  prefix: string
  loggerTypeToName: Record<number, string>
  LSM_LOGTYPE_DEBUG: number
  LSM_LOGTYPE_VERBOSE: number
  LSM_LOGTYPE_DEBUG_CALLBACK: number
  LSM_LOGTYPE_INFO: number
  LSM_LOGTYPE_ERROR: number
  DebugLog?: (this: void, ...args: unknown[]) => void
  LoadLogger?: (this: void, ...args: unknown[]) => void
  debugLoggingToggle?: (this: void, ...args: unknown[]) => void
  [key: string]: unknown
}

interface LsmSVConstants {
  name: string
  version: number
  profile: string
  defaults: Record<string, unknown>
}

interface LsmConstants {
  NIL_CHECK_TABLE: Record<string, unknown>
  throttledCallDelay: number
  handlerNames: Record<string, string>
  comboBox: Record<string, unknown>
  dropdown: Record<string, unknown>
  submenu: Record<string, unknown>
  entryTypes: Record<string, unknown>
  fonts: Record<string, string>
  colors: Record<string, unknown>
  textures: Record<string, unknown>
  narration: Record<string, unknown>
  data: Record<string, unknown>
  searchFilter: Record<string, unknown>
  sounds: Record<string, unknown>
  [key: string]: unknown
}

interface Lib extends ZoCallbackObjectInstance {
  name: string
  author: string
  version: string
  _objects: Record<string, unknown>
  preventerVars: Record<string, unknown>
  XML: Record<string, unknown>
  contextMenuCallbacksRegistered: Record<string, unknown>
  constants: LsmConstants
  Debug: LsmDebug
  SVConstans: LsmSVConstants
  SV: Record<string, unknown>
  classes: Record<string, unknown>
  Util: Record<string, unknown>
  DIVIDER: string
  AllowedEntryTypes: Record<number, boolean>
  AllowedEntryTypesForContextMenu: Record<number, boolean>
  scrollListRowTypes: Record<string, number>
  scrollListRowHighlights: Record<string, string>
  [key: string]: unknown
}

interface LsmEntry {
  [key: string]: unknown
}
interface LsmComboBoxOptions {
  [key: string]: unknown
}

interface ComboBoxBase extends ZoComboBoxInstance {
  owner?: unknown
  m_comboBox?: unknown
  options?: LsmComboBoxOptions
  updatedOptions?: Record<string, unknown>
  isContextMenu?: boolean
}

interface ComboBoxObject extends ComboBoxBase {}

interface SubmenuObject extends ComboBoxBase {
  m_comboBox?: ComboBoxObject
}

interface ContextMenuObject extends ComboBoxObject {}

interface DropdownObject extends ZoComboBoxDropdownKeyboardInstance {
  owner?: ComboBoxBase
  m_comboBox?: ComboBoxBase
}

interface ButtonGroupObject extends ZoRadioButtonGroupInstance {}

interface AnchorObject {
  anchor: ZoAnchor
  [key: string]: unknown
}
