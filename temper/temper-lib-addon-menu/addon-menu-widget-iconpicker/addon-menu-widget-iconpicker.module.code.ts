import {
  asHookTable,
  asIconControl,
  asLamComboBox,
  asLamFactory,
  asZoColorDef,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import {
  HALF_WIDTH_LINE_SPACING,
  MIN_HEIGHT,
  WIDGET_VERSION,
} from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, lam, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  IconPickerMenu,
  IconpickerData,
  LamControl,
  Valued,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createLabelAndContainerControl,
  getDefaultValue,
  getStringFromValue,
  registerForRefreshIfNeeded,
  registerForReloadIfNeeded,
  requestRefreshIfNeeded,
  updateWarning,
} from "../addon-menu-util/addon-menu-util.module.code.ts"
import { createIconPickerMenu } from "../addon-menu-widget-iconpicker-menu/addon-menu-widget-iconpicker-menu.module.code.ts"

const DEFAULT_SIZE = 28

let singleton: IconPickerMenu | undefined

lam.util.GetIconPickerMenu = (): IconPickerMenu => {
  if (singleton === undefined) {
    singleton = createIconPickerMenu()
    const sceneFragment = lam.GetAddonSettingsFragment()
    const picker = singleton
    ZO_PreHook(asHookTable(sceneFragment), "OnHidden", () => {
      if (!picker.control.IsHidden()) {
        picker.Clear()
      }
    })
  }
  return singleton
}

function isDisabled(this: void, control: LamControl): boolean {
  const disabled = control.data.disabled
  if (typeof disabled === "function") {
    return disabled()
  }
  return disabled === true
}

function updateDisabled(this: LamControl): undefined {
  const disable = isDisabled(this)

  this.dropdown?.SetMouseEnabled(!disable)
  this.dropdownButton?.SetEnabled(!disable)

  const iconPicker = lam.util.GetIconPickerMenu?.()
  if (
    iconPicker !== undefined &&
    iconPicker.parent === this.container &&
    !iconPicker.control.IsHidden()
  ) {
    iconPicker.Clear()
  }

  this.SetColor?.(this.icon?.color)
  if (disable) {
    const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
    this.label?.SetColor(r, g, b, a)
  } else {
    const [r, g, b, a] = ZO_DEFAULT_ENABLED_COLOR.UnpackRGBA()
    this.label?.SetColor(r, g, b, a)
  }
}

function updateValue(this: LamControl, forceDefault?: boolean, value?: unknown): undefined {
  const data = this.data
  if (forceDefault) {
    const defaultValue = getDefaultValue(data.default)
    data.setFunc?.(defaultValue)
    this.icon?.SetTexture(defaultValue)
  } else if (value !== undefined) {
    data.setFunc?.(value)
    requestRefreshIfNeeded(this)
  } else {
    const current = data.getFunc?.()
    this.icon?.SetTexture(current)
  }
}

function setIconSize(this: LamControl, size: number): undefined {
  const icon = this.icon
  if (icon === undefined) {
    return
  }
  icon.size = size
  icon.SetDimensions(size, size)

  let height = size + 4
  this.dropdown?.SetDimensions(size + 20, height)
  height = Math.max(height, MIN_HEIGHT)
  this.container?.SetHeight(height)
  if (this.lineControl) {
    this.lineControl.SetHeight(MIN_HEIGHT + size + HALF_WIDTH_LINE_SPACING)
  } else {
    this.SetHeight(height)
  }

  const iconPicker = lam.util.GetIconPickerMenu?.()
  if (
    iconPicker !== undefined &&
    iconPicker.parent === this.container &&
    !iconPicker.control.IsHidden()
  ) {
    iconPicker.SetIconSize(size)
    iconPicker.UpdateDimensions()
    iconPicker.UpdateAnchors()
  }
}

function createIconpicker(
  this: void,
  parent: LamControl,
  iconpickerData: IconpickerData,
  controlName?: string
): LamControl {
  const control = createLabelAndContainerControl(parent, iconpickerData, controlName)

  function updateChoices(this: LamControl, ...args: unknown[]): undefined {
    let choices: string[] = iconpickerData.choices
    let choicesTooltips: Valued<string | number>[] = iconpickerData.choicesTooltips ?? []
    if (Array.isArray(args[0])) {
      choices = args[0]
      choicesTooltips = Array.isArray(args[1]) ? args[1] : []
    }
    const addedChoices: Record<string, boolean> = {}

    const iconPicker = lam.util.GetIconPickerMenu?.()
    if (iconPicker === undefined) {
      return
    }
    iconPicker.Clear()
    for (let i = 0; i < choices.length; i++) {
      const texture = choices[i]
      if (texture === undefined) {
        continue
      }
      if (!addedChoices[texture]) {
        const tooltipValue = choicesTooltips[i]
        const tooltip =
          tooltipValue !== undefined ? getStringFromValue(tooltipValue).toString() : undefined
        iconPicker.AddIcon(
          texture,
          (_icon: Control, selectedTexture: string) => {
            control.icon?.SetTexture(selectedTexture)
            iconpickerData.setFunc(selectedTexture)
            requestRefreshIfNeeded(control)
          },
          tooltip
        )
        addedChoices[texture] = true
      }
    }
  }

  function setColor(this: Control, ...args: unknown[]): undefined {
    const color = args[0] !== undefined ? asZoColorDef(args[0]) : undefined
    const icon = control.icon
    if (icon === undefined) {
      return
    }
    if (isDisabled(control)) {
      const [r, g, b, a] = ZO_DEFAULT_DISABLED_COLOR.UnpackRGBA()
      icon.SetColor(r, g, b, a)
    } else {
      const resolvedColor = color ?? iconpickerData.defaultColor ?? ZO_DEFAULT_ENABLED_COLOR
      icon.color = resolvedColor
      const [r, g, b, a] = resolvedColor.UnpackRGBA()
      icon.SetColor(r, g, b, a)
    }

    const iconPicker = lam.util.GetIconPickerMenu?.()
    if (
      iconPicker !== undefined &&
      iconPicker.parent === control.container &&
      !iconPicker.control.IsHidden() &&
      icon.color !== undefined
    ) {
      iconPicker.SetColor(icon.color)
    }
  }

  function showIconPicker(this: void): undefined {
    const iconPicker = lam.util.GetIconPickerMenu?.()
    if (iconPicker === undefined) {
      return
    }
    if (iconPicker.parent === control.container) {
      iconPicker.Clear()
    } else {
      iconPicker.SetMaxColumns(iconpickerData.maxColumns)
      iconPicker.SetVisibleRows(iconpickerData.visibleRows)
      iconPicker.SetIconSize(control.icon?.size)
      updateChoices.call(control)
      if (control.icon?.color !== undefined) {
        iconPicker.SetColor(control.icon.color)
      }
      if (iconpickerData.beforeShow !== undefined) {
        if (iconpickerData.beforeShow(control, iconPicker)) {
          iconPicker.Clear()
          return
        }
      }
      if (control.container !== undefined) {
        iconPicker.Show(control.container)
      }
    }
  }

  const iconSize = iconpickerData.iconSize !== undefined ? iconpickerData.iconSize : DEFAULT_SIZE

  const dropdown = wm.CreateControl(undefined, control.container, CT_CONTROL)
  control.dropdown = asLamComboBox(dropdown)
  if (control.container !== undefined) {
    dropdown.SetAnchor(LEFT, control.container, LEFT, 0, 0)
  }
  dropdown.SetMouseEnabled(true)
  dropdown.SetHandler("OnMouseUp", showIconPicker)
  dropdown.SetHandler("OnMouseEnter", () => {
    ZO_Options_OnMouseEnter(control)
  })
  dropdown.SetHandler("OnMouseExit", () => {
    ZO_Options_OnMouseExit(control)
  })

  const icon = wm.CreateControl(undefined, dropdown, CT_TEXTURE)
  control.icon = asIconControl(icon)
  icon.SetAnchor(LEFT, dropdown, LEFT, 3, 0)
  icon.SetDrawLevel(2)

  const dropdownButton = wm.CreateControlFromVirtual<ButtonControl>(
    undefined,
    dropdown,
    "ZO_DropdownButton"
  )
  dropdownButton.SetDimensions(16, 16)
  dropdownButton.SetHandler("OnClicked", showIconPicker)
  dropdownButton.SetAnchor(RIGHT, dropdown, RIGHT, -3, 0)
  control.dropdownButton = dropdownButton

  const bg = wm.CreateControl(undefined, dropdown, CT_BACKDROP)
  control.bg = bg
  bg.SetAnchor(TOPLEFT, dropdown, TOPLEFT, 0, -3)
  bg.SetAnchor(BOTTOMRIGHT, dropdown, BOTTOMRIGHT, 2, 5)
  bg.SetEdgeTexture("EsoUI/Art/Tooltips/UI-Border.dds", 128, 16, 0)
  bg.SetCenterTexture("EsoUI/Art/Tooltips/UI-TooltipCenter.dds")
  bg.SetInsets(16, 16, -16, -16)
  const mungeOverlay = wm.CreateControl(undefined, bg, CT_TEXTURE)
  mungeOverlay.SetTexture("EsoUI/Art/Tooltips/munge_overlay.dds")
  mungeOverlay.SetDrawLevel(1)
  mungeOverlay.SetAddressMode(TEX_MODE_WRAP)
  mungeOverlay.SetAnchorFill()

  if (iconpickerData.warning !== undefined || iconpickerData.requiresReload === true) {
    const warning = wm.CreateControlFromVirtual<TextureControl>(
      undefined,
      control,
      "ZO_Options_WarningIcon"
    )
    control.warning = warning
    if (control.container !== undefined) {
      warning.SetAnchor(RIGHT, control.container, LEFT, -5, 0)
    }
    control.UpdateWarning = function (this: LamControl): undefined {
      updateWarning(this)
    }
    control.UpdateWarning()
  }

  control.UpdateChoices = updateChoices
  control.UpdateValue = updateValue
  control.UpdateValue()
  control.SetColor = setColor
  control.SetColor()
  control.SetIconSize = setIconSize
  control.SetIconSize(iconSize)

  if (iconpickerData.disabled !== undefined) {
    control.UpdateDisabled = updateDisabled
    control.UpdateDisabled()
  }

  registerForRefreshIfNeeded(control)
  registerForReloadIfNeeded(control)

  return control
}

if (registerWidget("iconpicker", WIDGET_VERSION.iconpicker)) {
  LAMCC.iconpicker = asLamFactory(createIconpicker)
}
