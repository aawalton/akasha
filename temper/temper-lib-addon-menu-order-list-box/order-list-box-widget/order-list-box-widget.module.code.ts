import { createOrderListBox } from "../order-list-box-build/order-list-box-build.module.code.ts"
import { asLamControl } from "../order-list-box-casts/order-list-box-casts.module.code.ts"
import {
  MIN_HEIGHT,
  ORDER_LIST_BOX_NAME_TEMPLATE,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import {
  setupAddEntryDialog,
  setupRemoveEntryButton,
} from "../order-list-box-dialogs/order-list-box-dialogs.module.code.ts"
import {
  updateDisabled,
  updateValue,
} from "../order-list-box-row-setup/order-list-box-row-setup.module.code.ts"
import {
  getDefaultValue,
  getStringFromValue,
  LAM,
  STATE,
  util,
  wm,
} from "../order-list-box-state/order-list-box-state.module.code.ts"

function createOrderListBoxControl(
  this: void,
  parent: LamControl,
  orderListBoxData: OrderListBoxData,
  controlName?: string
): LamControl {
  STATE.orderListBoxCounter += 1
  const resolvedControlName =
    controlName ??
    (orderListBoxData.reference !== undefined
      ? getDefaultValue(orderListBoxData.reference)
      : undefined) ??
    string.format(ORDER_LIST_BOX_NAME_TEMPLATE, tostring(STATE.orderListBoxCounter))

  const control = util.CreateLabelAndContainerControl(parent, orderListBoxData, resolvedControlName)
  control.isBuilding = true
  control.orderListBoxName = resolvedControlName

  const container = control.container
  const width = control.GetWidth()
  const minHeight =
    (control.data.minHeight !== undefined ? getDefaultValue(control.data.minHeight) : undefined) ??
    MIN_HEIGHT
  const maxHeight =
    (control.data.maxHeight !== undefined ? getDefaultValue(control.data.maxHeight) : undefined) ??
    minHeight * 4

  const isExtraWide =
    (orderListBoxData.isExtraWide !== undefined
      ? getDefaultValue(orderListBoxData.isExtraWide)
      : undefined) ?? false
  if (isExtraWide === true) {
    container.SetDimensionConstraints(width, minHeight, width, maxHeight)

    control.label.ClearAnchors()
    control.label.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)

    container.ClearAnchors()
    container.SetAnchor(BOTTOMLEFT, control, BOTTOMLEFT, 0, 0)
    container.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, 0, 0)

    if (control.isHalfWidth === true) {
      container.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, 0, 0)
    }

    control.SetHeight(container.GetHeight() + control.label.GetHeight())
  } else {
    control.SetDimensionConstraints(width, minHeight, width, maxHeight)
  }

  control.SetHandler("OnMouseEnter", (): undefined => {
    ZO_Options_OnMouseEnter(control)
  })
  control.SetHandler("OnMouseExit", (): undefined => {
    ZO_Options_OnMouseExit(control)
  })

  const orderListBox = createOrderListBox(util.GetTopPanel(parent), control, orderListBoxData)
  control.orderListBox = orderListBox

  if (orderListBoxData.warning !== undefined || orderListBoxData.requiresReload === true) {
    const warning = wm.CreateControlFromVirtual(undefined, control, "ZO_Options_WarningIcon")
    control.warning = warning
    warning.SetAnchor(RIGHT, container, LEFT, -5, 0)
    control.UpdateWarning = function (this: LamControl): undefined {
      util.UpdateWarning(this)
    }
    control.UpdateWarning()
  }

  setupAddEntryDialog(orderListBox, control, resolvedControlName, orderListBoxData)
  setupRemoveEntryButton(orderListBox, control, resolvedControlName, orderListBoxData)

  control.data.tooltipText =
    orderListBoxData.tooltip !== undefined
      ? getStringFromValue(orderListBoxData.tooltip)
      : undefined

  control.UpdateValue = updateValue
  control.UpdateValue()

  control.UpdateDisabled = updateDisabled
  control.UpdateDisabled()

  control.isBuilding = false

  const faqTexture = LAM.util.CreateFAQTexture(control)
  if (faqTexture !== undefined) {
    faqTexture.ClearAnchors()
    faqTexture.SetAnchor(LEFT, control, RIGHT, 0, 0)
  }

  util.RegisterForRefreshIfNeeded(control)
  util.RegisterForReloadIfNeeded(control)

  return control
}

LAMCreateControl.orderlistbox = createOrderListBoxControl

LAM2_orderlistbox_widget_OnDragStart = (
  draggedControl: OrderRowControl,
  mouseButton: number
): undefined => {
  const grandParent = draggedControl.GetParent()?.GetParent()?.GetParent()
  if (grandParent === undefined) {
    return
  }
  const orderListBox = asLamControl(grandParent).orderListBox
  orderListBox.StartDragging(draggedControl, mouseButton)
}

LAM2_orderlistbox_widget_OnReceiveDrag = (
  draggedOnToControl: OrderRowControl,
  _mouseButton: number
): undefined => {
  const grandParent = draggedOnToControl.GetParent()?.GetParent()?.GetParent()
  if (grandParent === undefined) {
    return
  }
  const orderListBox = asLamControl(grandParent).orderListBox
  orderListBox.StopDragging(draggedOnToControl)
}
