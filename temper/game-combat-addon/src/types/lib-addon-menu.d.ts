interface LamPanelData {
  type: "panel"
  name: string
  displayName?: string
  author?: string
  version?: string
  website?: string
  feedback?: string | ((this: void) => void)
  donation?: string | ((this: void) => void)
  slashCommand?: string
  registerForRefresh?: boolean
  registerForDefaults?: boolean
}

interface LamOptionBase {
  width?: "full" | "half"
}

interface LamHeaderOption extends LamOptionBase {
  type: "header"
  name: string
}

interface LamCustomOption extends LamOptionBase {
  type: "custom"
}

interface LamValueOptionBase extends LamOptionBase {
  name: string
  tooltip?: string
  disabled?: boolean | ((this: void) => boolean)
  warning?: string
  requiresReload?: boolean
}

interface LamCheckboxOption extends LamValueOptionBase {
  type: "checkbox"
  default?: boolean
  getFunc: (this: void) => boolean
  setFunc: (this: void, value: boolean) => void
}

interface LamSliderOption extends LamValueOptionBase {
  type: "slider"
  min: number
  max: number
  step?: number
  default?: number
  getFunc: (this: void) => number
  setFunc: (this: void, value: number) => void
}

interface LamEditboxOption extends LamValueOptionBase {
  type: "editbox"
  default?: string | number
  getFunc: (this: void) => string | number
  setFunc: (this: void, value: string) => void
}

interface LamDropdownOption extends LamValueOptionBase {
  type: "dropdown"
  choices: readonly string[]
  default?: string
  getFunc: (this: void) => string
  setFunc: (this: void, value: string) => void
}

type LamOptionControl =
  | LamHeaderOption
  | LamCustomOption
  | LamCheckboxOption
  | LamSliderOption
  | LamEditboxOption
  | LamDropdownOption

interface LibAddonMenu2Api {
  RegisterAddonPanel(addonId: string, panelData: LamPanelData): Control
  RegisterOptionControls(addonId: string, optionsTable: readonly LamOptionControl[]): void
  OpenToPanel(panel: Control): void
}

declare const LibAddonMenu2: LibAddonMenu2Api | undefined
