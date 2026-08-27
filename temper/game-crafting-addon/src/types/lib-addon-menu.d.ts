interface LamPanelData {
  type: "panel"
  name: string
  displayName?: string
  author?: string
  version?: string
  slashCommand?: string
  registerForRefresh?: boolean
  registerForDefaults?: boolean
}

interface LamHeaderControl {
  type: "header"
  name: string
  width?: "full"
}

interface LamCheckboxControl {
  type: "checkbox"
  name: string
  tooltip?: string
  getFunc: (this: void) => boolean
  setFunc: (this: void, value: boolean) => void
  default?: boolean
  disabled?: boolean | ((this: void) => boolean)
}

interface LamDropdownControl {
  type: "dropdown"
  name: string
  tooltip?: string
  choices: string[]
  getFunc: (this: void) => string
  setFunc: (this: void, value: string) => void
  default?: string
  warning?: string
}

interface LamEditboxControl {
  type: "editbox"
  name: string
  tooltip?: string
  isMultiline?: boolean
  getFunc: (this: void) => string | number
  setFunc: (this: void, value: string) => void
  default?: string | number
}

type LamOptionControl =
  | LamHeaderControl
  | LamCheckboxControl
  | LamDropdownControl
  | LamEditboxControl

interface LibAddonMenu2Api {
  RegisterAddonPanel(name: string, panelData: LamPanelData): Control
  RegisterOptionControls(name: string, optionsTable: (LamOptionControl | LamControlData)[]): void
  OpenToPanel(panel: Control | undefined): void
}

declare const LibAddonMenu2: LibAddonMenu2Api
