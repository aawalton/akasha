import {
  compareBinding,
  keybindList,
} from "../keybinder-binding-utils/keybinder-binding-utils.module.code.ts"
import { asControl } from "../keybinder-casts/keybinder-casts.module.code.ts"
import { KEYBIND_DATA_TYPE } from "../keybinder-constants/keybinder-constants.module.code.ts"
import { KEYBINDER_STATE } from "../keybinder-state/keybinder-state.module.code.ts"
import { getUiString } from "../keybinder-ui-strings/keybinder-ui-strings.module.code.ts"

function changeKeybindGlobal(this: void, control: Control, checkState: number): undefined {
  const parent = control.GetParent()
  if (parent === undefined) {
    return
  }
  const data = ZO_ScrollList_GetData<KeybindRowData>(parent).GetDataSource()
  if (checkState === TRISTATE_CHECK_BUTTON_CHECKED) {
    KEYBINDER_STATE.account.Keybindings[data.actionName] =
      KEYBINDER_STATE.masterList[data.actionName]
  } else if (checkState === TRISTATE_CHECK_BUTTON_UNCHECKED) {
    KEYBINDER_STATE.account.Keybindings[data.actionName] = undefined
  }
}

function showTooltip(this: void, ...args: unknown[]): undefined {
  ZO_Tooltips_ShowTextTooltip(asControl(args[0]), RIGHT, getUiString("ACCOUNTWIDE"))
}

function createCheckBox(this: void, control: Control): Control {
  const checkBox = WINDOW_MANAGER.CreateControlFromVirtual(
    "$(parent)VotansKeybindGlobal",
    control,
    "ZO_TriStateCheckButton"
  )
  const primaryBind = control.GetNamedChild("PrimaryBind")
  if (primaryBind !== undefined) {
    checkBox.SetAnchor(RIGHT, primaryBind, LEFT, -5, 0)
    primaryBind.ClearAnchors()
    primaryBind.SetAnchor(LEFT, undefined, LEFT, 270, 0)
  }
  ZO_TriStateCheckButton_SetStateChangeFunction(checkBox, changeKeybindGlobal)
  checkBox.SetHandler("OnMouseEnter", showTooltip)
  checkBox.SetHandler("OnMouseExit", ZO_Tooltips_HideTextTooltip)
  const actionName = control.GetNamedChild("ActionName")
  if (actionName !== undefined) {
    actionName.ClearAnchors()
    actionName.SetAnchor(LEFT, undefined, LEFT, 5, 0)
    actionName.SetDimensions(255, 29)
    actionName.SetAnchor(RIGHT, checkBox, LEFT, -5, 0)
  }
  return checkBox
}

export function hookKeybindsScrollList(this: void): undefined {
  const dataType = keybindList.list.dataTypes[KEYBIND_DATA_TYPE]
  if (dataType === undefined) {
    return
  }

  const orgSetupCallback = dataType.setupCallback
  dataType.setupCallback = (control, data, ...args) => {
    orgSetupCallback(control, data, ...args)
    let checkBox = control.GetNamedChild("VotansKeybindGlobal")
    if (checkBox === undefined) {
      checkBox = createCheckBox(control)
    }
    const source = data.GetDataSource()
    const globalKeybindings = KEYBINDER_STATE.account.Keybindings[source.actionName]
    const isAccountWide =
      globalKeybindings !== undefined && compareBinding(globalKeybindings, source)
    const checkState = isAccountWide
      ? TRISTATE_CHECK_BUTTON_CHECKED
      : globalKeybindings === undefined
        ? TRISTATE_CHECK_BUTTON_UNCHECKED
        : TRISTATE_CHECK_BUTTON_INDETERMINATE
    ZO_TriStateCheckButton_SetState(checkBox, checkState)
  }

  const orgFactory = dataType.pool.m_Factory
  dataType.pool.m_Factory = (pool, ...args) => {
    const control = orgFactory(pool, ...args)
    createCheckBox(control)
    return control
  }

  keybindList.SetLockedForUpdates(true)
}
