import {
  asEsoDialogDescriptor,
  asEsoHandler,
  asFaqTextureControl,
  asLamControl,
  asThunk,
  asTooltipHostControl,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import {
  FAQ_ICON_MOUSE_EXIT_ALPHA,
  FAQ_ICON_MOUSE_OVER_ALPHA,
  FAQ_ICON_SIZE,
  FAQ_ICON_TOOLTIP_TEMPLATE,
  HALF_WIDTH_LINE_SPACING,
  LAM_CONFIRM_DIALOG,
  MIN_HEIGHT,
} from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { cm, controlsForReload, lam, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  LamControl,
  LamWidgetData,
  TooltipData,
  Valued,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import { L } from "../addon-menu-ui-strings/addon-menu-ui-strings.module.code.ts"

const FAQ_ICON_COLOR = ZO_ColorDef.New("FFFFFF")
const FAQ_ICON_MOUSE_OVER_COLOR = ZO_ColorDef.New("B8B8D3")

export function getDefaultValue<T>(this: void, value: Valued<T>): T {
  if (typeof value === "function") {
    return asThunk<T>(value)()
  }
  return value
}

export function getStringFromValue(this: void, value: Valued<string | number>): string | number {
  if (typeof value === "function") {
    return value()
  }
  if (typeof value === "number") {
    return GetString(value)
  }
  return value
}

export function getColorForState(this: void, disabled: boolean): ZoColorDef {
  return disabled ? ZO_DEFAULT_DISABLED_COLOR : ZO_DEFAULT_ENABLED_COLOR
}

export function createFAQTexture(this: void, control: LamControl): Control | undefined {
  const controlData = control.data
  const helpUrl = getStringFromValue(controlData.helpUrl ?? "")
  if (helpUrl === "" || typeof helpUrl !== "string") {
    return undefined
  }

  const faqControl = asFaqTextureControl(wm.CreateControl(undefined, control, CT_TEXTURE))
  control.faqControl = faqControl

  faqControl.SetDrawLayer(DL_OVERLAY)
  faqControl.SetTexture("EsoUI\\Art\\miscellaneous\\help_icon.dds")
  faqControl.SetDimensions(FAQ_ICON_SIZE, FAQ_ICON_SIZE)
  const [baseR, baseG, baseB, baseA] = FAQ_ICON_COLOR.UnpackRGBA()
  faqControl.SetColor(baseR, baseG, baseB, baseA)
  faqControl.SetAlpha(FAQ_ICON_MOUSE_EXIT_ALPHA)
  faqControl.SetHidden(false)

  faqControl.data = {
    helpUrl,
    tooltipText: string.format(FAQ_ICON_TOOLTIP_TEMPLATE, L.WEBSITE, helpUrl),
  }

  faqControl.SetMouseEnabled(true)
  const onMouseExitFAQ = (): undefined => {
    ZO_Options_OnMouseExit(faqControl)
    const [exitR, exitG, exitB, exitA] = FAQ_ICON_COLOR.UnpackRGBA()
    faqControl.SetColor(exitR, exitG, exitB, exitA)
    faqControl.SetAlpha(FAQ_ICON_MOUSE_EXIT_ALPHA)
  }
  faqControl.SetHandler(
    "OnMouseUp",
    (_self: unknown, button: unknown, upInside: unknown): undefined => {
      if (button === MOUSE_BUTTON_INDEX_LEFT && upInside === true) {
        onMouseExitFAQ()
        RequestOpenUnsafeURL(helpUrl)
      }
    }
  )
  faqControl.SetHandler(
    "OnMouseEnter",
    (): undefined => {
      ZO_Options_OnMouseEnter(faqControl)
      const [overR, overG, overB, overA] = FAQ_ICON_MOUSE_OVER_COLOR.UnpackRGBA()
      faqControl.SetColor(overR, overG, overB, overA)
      faqControl.SetAlpha(FAQ_ICON_MOUSE_OVER_ALPHA)
    },
    "LAM2_FAQTexture_OnMouseEnter"
  )
  faqControl.SetHandler("OnMouseExit", onMouseExitFAQ, "LAM2_FAQTexture_OnMouseExit")

  return faqControl
}

export function createBaseControl(
  this: void,
  parent: LamControl,
  controlData: LamWidgetData,
  controlName?: string
): LamControl {
  const control = asLamControl(
    wm.CreateControl(controlName ?? controlData.reference, parent.scroll ?? parent, CT_CONTROL)
  )
  control.panel = parent.panel ?? parent
  control.data = controlData

  control.isHalfWidth = controlData.width === "half"
  let width = 510
  if (control.panel.GetWidth !== undefined) {
    width = control.panel.GetWidth() - 60
  }
  control.SetWidth(width)
  return control
}

export function createLabelAndContainerControl(
  this: void,
  parent: LamControl,
  controlData: LamWidgetData,
  controlName?: string
): LamControl {
  const control = createBaseControl(parent, controlData, controlName)
  const width = control.GetWidth()

  const container = wm.CreateControl(undefined, control, CT_CONTROL)
  container.SetDimensions(width / 3, MIN_HEIGHT)
  control.container = container

  let labelContainer: Control | undefined
  const faqTexture = createFAQTexture(control)
  if (faqTexture) {
    labelContainer = wm.CreateControl(undefined, control, CT_CONTROL)
    labelContainer.SetHeight(MIN_HEIGHT)
    control.labelContainer = container
  }

  const label = wm.CreateControl(undefined, labelContainer ?? control, CT_LABEL)
  label.SetFont("ZoFontWinH4")
  label.SetHeight(MIN_HEIGHT)
  label.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
  label.SetText(getStringFromValue(controlData.name ?? ""))
  control.label = label

  const labelAnchorTarget = labelContainer ?? label
  if (control.isHalfWidth) {
    control.SetDimensions(width / 2, MIN_HEIGHT * 2 + HALF_WIDTH_LINE_SPACING)
    labelAnchorTarget.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
    labelAnchorTarget.SetAnchor(TOPRIGHT, control, TOPRIGHT, 0, 0)
    container.SetAnchor(TOPRIGHT, labelAnchorTarget, BOTTOMRIGHT, 0, HALF_WIDTH_LINE_SPACING)
  } else {
    control.SetDimensions(width, MIN_HEIGHT)
    container.SetAnchor(TOPRIGHT, control, TOPRIGHT, 0, 0)
    labelAnchorTarget.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 0)
    labelAnchorTarget.SetAnchor(TOPRIGHT, container, TOPLEFT, 5, 0)
  }

  if (faqTexture && labelContainer) {
    faqTexture.ClearAnchors()
    faqTexture.SetAnchor(LEFT, label, RIGHT, 5, -1)
    faqTexture.SetParent(labelContainer)
    label.SetAnchor(LEFT, labelContainer, LEFT)
    label.SetDimensionConstraints(0, 0, labelContainer.GetWidth() - faqTexture.GetWidth(), 0)
  }

  control.data.tooltipText = getStringFromValue(control.data.tooltip ?? "")
  control.SetMouseEnabled(true)
  control.SetHandler("OnMouseEnter", asEsoHandler(ZO_Options_OnMouseEnter))
  control.SetHandler("OnMouseExit", asEsoHandler(ZO_Options_OnMouseExit))
  return control
}

export function setUpTooltip(
  this: void,
  control: Control,
  data: LamWidgetData,
  tooltipData?: TooltipData
): undefined {
  if (data.tooltip === undefined) {
    return
  }
  control.SetMouseEnabled(true)
  asTooltipHostControl(control).data = tooltipData ?? {
    tooltipText: getStringFromValue(data.tooltip),
  }
  control.SetHandler("OnMouseEnter", asEsoHandler(ZO_Options_OnMouseEnter))
  control.SetHandler("OnMouseExit", asEsoHandler(ZO_Options_OnMouseExit))
}

export function getTopPanel(this: void, panel: LamControl): LamControl {
  let current = panel
  while (current.panel && current.panel !== current) {
    current = current.panel
  }
  return current
}

export function isSame(this: void, objA: readonly unknown[], objB: readonly unknown[]): boolean {
  if (objA.length !== objB.length) {
    return false
  }
  for (let i = 0; i < objA.length; i++) {
    if (objA[i] !== objB[i]) {
      return false
    }
  }
  return true
}

export function refreshReloadUIButton(this: void): undefined {
  lam.requiresReload = false

  for (const reloadControl of controlsForReload) {
    const data = reloadControl.data
    const getFunc = data.getFunc
    if (getFunc !== undefined && !isSame(reloadControl.startValue ?? [], [getFunc()])) {
      lam.requiresReload = true
      break
    }
  }

  if (lam.applyButton) {
    lam.applyButton.SetHidden(!lam.requiresReload)
  }
}

export function requestRefreshIfNeeded(this: void, control: LamControl): undefined {
  const panel = getTopPanel(control)
  const panelData = panel.data
  if (panelData.registerForRefresh) {
    cm.FireCallbacks("LAM-RefreshPanel", control)
  }
  refreshReloadUIButton()
}

export function registerForRefreshIfNeeded(this: void, control: LamControl): undefined {
  const panel = getTopPanel(control.panel ?? control)
  const panelData = panel.data
  if (panelData.registerForRefresh || panelData.registerForDefaults) {
    const list = panel.controlsToRefresh ?? []
    list.push(control)
    panel.controlsToRefresh = list
  }
}

export function registerForReloadIfNeeded(this: void, control: LamControl): undefined {
  const data = control.data
  if (data.requiresReload && data.getFunc !== undefined) {
    controlsForReload.push(control)
    control.startValue = [data.getFunc()]
  }
}

function getConfirmDialog(this: void): EsoDialogDescriptor {
  let dialog = ESO_Dialogs[LAM_CONFIRM_DIALOG]
  if (!dialog) {
    dialog = {
      canQueue: true,
      title: { text: "" },
      mainText: { text: "" },
      buttons: [
        { text: SI_DIALOG_CONFIRM, callback: (): undefined => undefined },
        { text: SI_DIALOG_CANCEL },
      ],
    }
    ESO_Dialogs[LAM_CONFIRM_DIALOG] = dialog
  }
  return asEsoDialogDescriptor(dialog)
}

export function showConfirmationDialog(
  this: void,
  title: string,
  body: string,
  callback: (this: void, ...args: unknown[]) => void
): undefined {
  const dialog = getConfirmDialog()
  dialog.title.text = title
  dialog.mainText.text = body
  const firstButton = dialog.buttons[0]
  if (firstButton !== undefined) {
    firstButton.callback = callback
  }
  ZO_Dialogs_ShowDialog(LAM_CONFIRM_DIALOG)
}

export function updateWarning(this: void, control: LamControl): undefined {
  let warning: string | number | undefined
  const data = control.data
  if (data.warning !== undefined) {
    warning = getStringFromValue(data.warning)
  }

  if (data.requiresReload) {
    if (warning === undefined) {
      warning = string.format("%s", L.RELOAD_UI_WARNING)
    } else {
      warning = string.format("%s\n\n%s", warning, L.RELOAD_UI_WARNING)
    }
  }

  const warningControl = control.warning
  if (!warningControl) {
    return
  }
  if (warning === undefined) {
    warningControl.SetHidden(true)
  } else {
    asTooltipHostControl(warningControl).data = { tooltipText: warning }
    warningControl.SetHidden(false)
  }
}

lam.util.L = L
lam.util.GetTooltipText = getStringFromValue
lam.util.GetStringFromValue = getStringFromValue
lam.util.GetDefaultValue = getDefaultValue
lam.util.GetColorForState = getColorForState
lam.util.CreateBaseControl = createBaseControl
lam.util.CreateLabelAndContainerControl = createLabelAndContainerControl
lam.util.SetUpTooltip = setUpTooltip
lam.util.RequestRefreshIfNeeded = requestRefreshIfNeeded
lam.util.RegisterForRefreshIfNeeded = registerForRefreshIfNeeded
lam.util.RegisterForReloadIfNeeded = registerForReloadIfNeeded
lam.util.GetTopPanel = getTopPanel
lam.util.ShowConfirmationDialog = showConfirmationDialog
lam.util.UpdateWarning = updateWarning
lam.util.CreateFAQTexture = createFAQTexture
