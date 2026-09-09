interface ButtonGroupButtonLabel {
  SetColor: (this: ButtonGroupButtonLabel, ...rgb: number[]) => undefined
  [key: string]: unknown
}
interface ButtonGroupButton extends ButtonControl {
  label?: ButtonGroupButtonLabel
  toggleFunction?: (this: ButtonGroupButton, checked: boolean) => undefined
  enabled?: unknown
  checked?: unknown
  [key: string]: unknown
}

interface ButtonGroupClass {
  [key: string]: unknown
  New: (this: ButtonGroupClass, ...args: unknown[]) => ButtonGroupObject
  Add: ButtonGroupObject["Add"]
  Remove: ButtonGroupObject["Remove"]
  SetButtonState: ButtonGroupObject["SetButtonState"]
  HandleClick: ButtonGroupObject["HandleClick"]
  SetChecked: ButtonGroupObject["SetChecked"]
  SetInverse: ButtonGroupObject["SetInverse"]
  SetStateChangedCallback: ButtonGroupObject["SetStateChangedCallback"]
}

interface ButtonGroupObject {
  m_clickedButton?: ButtonGroupButton
  m_enabled?: unknown
  labelColorEnabled: ZoColorDef
  labelColorDisabled: ZoColorDef
  customClickHandler?: (
    this: void,
    control: ButtonGroupButton,
    buttonId: unknown,
    ignoreCallback: unknown
  ) => unknown
  onSelectionChangedCallback?: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    previousControl: ButtonGroupButton | undefined
  ) => undefined
  onStateChangedCallback?: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    updatedButtons: ButtonGroupButton[]
  ) => undefined

  Add: (
    this: ButtonGroupObject,
    button: ButtonGroupButton | undefined,
    entryType: unknown
  ) => boolean | undefined
  Remove: (this: ButtonGroupObject, button: ButtonGroupButton) => undefined
  SetButtonState: (
    this: ButtonGroupObject,
    button: ButtonGroupButton,
    clickedButton: ButtonGroupButton | undefined,
    enabled: unknown,
    ignoreCallback?: unknown
  ) => undefined
  HandleClick: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    buttonId: unknown,
    ignoreCallback: unknown
  ) => undefined
  SetChecked: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    checked: boolean | undefined,
    ignoreCallback: unknown
  ) => boolean
  SetInverse: (
    this: ButtonGroupObject,
    control: ButtonGroupButton,
    ignoreCallback: unknown
  ) => boolean
  SetStateChangedCallback: (this: ButtonGroupObject, callback: unknown) => undefined
}

interface ButtonGroupButtonData {
  originalHandler: ((...args: unknown[]) => unknown) | undefined
  isValidOption: boolean
  entryType: unknown
}
