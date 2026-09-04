import {
  asControl,
  asIconControl,
  asLamControl,
  asLamFactory,
  asTimelineAnimation,
  asTooltipHostControl,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { WIDGET_VERSION } from "../addon-menu-constants/addon-menu-constants.module.code.ts"
import { LAMCC, registerWidget, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type { LamControl, SubmenuData } from "../addon-menu-types/addon-menu-types.module.code.ts"
import {
  createFAQTexture,
  getColorForState,
  getDefaultValue,
  getStringFromValue,
  registerForRefreshIfNeeded,
  setUpTooltip,
} from "../addon-menu-util/addon-menu-util.module.code.ts"

const am = ANIMATION_MANAGER
const ICON_SIZE = 32

function createSubmenu(
  this: void,
  parent: LamControl,
  submenuData: SubmenuData,
  controlName?: string
): LamControl {
  const width = parent.GetWidth() - 45
  const control = asLamControl(
    wm.CreateControl(
      controlName ?? submenuData.reference,
      parent.scroll ?? asControl(parent),
      CT_CONTROL
    )
  )
  control.panel = parent
  control.data = submenuData

  const label = wm.CreateControlFromVirtual<LabelControl>(
    undefined,
    asControl(control),
    "ZO_Options_SectionTitleLabel"
  )
  control.label = label
  label.SetWrapMode(TEXT_WRAP_MODE_ELLIPSIS)
  label.SetText(getStringFromValue(submenuData.name))
  label.SetMouseEnabled(true)
  setUpTooltip(label, submenuData)

  let icon: TextureControl | undefined
  if (submenuData.icon !== undefined) {
    icon = wm.CreateControl(undefined, asControl(control), CT_TEXTURE)
    control.icon = asIconControl(icon)
    icon.SetTexture(getDefaultValue(submenuData.icon))
    if (submenuData.iconTextureCoords !== undefined) {
      const coords = getDefaultValue(submenuData.iconTextureCoords)
      const [left, right, top, bottom] = unpack(coords)
      icon.SetTextureCoords(left, right, top, bottom)
    }
    icon.SetDimensions(ICON_SIZE, ICON_SIZE)
    icon.SetAnchor(TOPLEFT, asControl(control), TOPLEFT, 5, 5)
    icon.SetMouseEnabled(true)
    icon.SetDrawLayer(DL_CONTROLS)
    setUpTooltip(icon, submenuData, asTooltipHostControl(label).data)
    label.SetAnchor(TOP, asControl(control), TOP, 0, 5, ANCHOR_CONSTRAINS_Y)
    label.SetAnchor(LEFT, icon, RIGHT, 10, 0, ANCHOR_CONSTRAINS_X)
    label.SetDimensions(width - ICON_SIZE - 5, 30)
  } else {
    label.SetAnchor(TOPLEFT, asControl(control), TOPLEFT, 5, 5)
    label.SetDimensions(width, 30)
  }

  const iconOrLabel: Control = icon ?? label
  const scroll = wm.CreateControl(undefined, asControl(control), CT_SCROLL)
  control.scroll = scroll
  scroll.SetParent(asControl(control))
  scroll.SetAnchor(TOPLEFT, iconOrLabel, BOTTOMLEFT, 0, 10)
  scroll.SetDimensionConstraints(width + 5, 0, width + 5, 0)

  const bg = wm.CreateControl(undefined, iconOrLabel, CT_BACKDROP)
  control.bg = bg
  bg.SetAnchor(TOPLEFT, iconOrLabel, TOPLEFT, -5, -5)
  bg.SetAnchor(BOTTOMRIGHT, scroll, BOTTOMRIGHT, -7, 0)
  bg.SetEdgeTexture("EsoUI\\Art\\Tooltips\\UI-Border.dds", 128, 16)
  bg.SetCenterTexture("EsoUI\\Art\\Tooltips\\UI-TooltipCenter.dds")
  bg.SetInsets(16, 16, -16, -16)
  bg.SetDrawLayer(DL_BACKGROUND)

  const arrow = wm.CreateControl(undefined, bg, CT_TEXTURE)
  control.arrow = arrow
  arrow.SetDimensions(28, 28)
  arrow.SetTexture("EsoUI\\Art\\Miscellaneous\\list_sortdown.dds")
  arrow.SetAnchor(TOPRIGHT, bg, TOPRIGHT, -5, 5)

  const faqTexture = createFAQTexture(control)
  if (faqTexture !== undefined) {
    faqTexture.SetAnchor(RIGHT, arrow, LEFT, 0, 0)
  }

  const animation = asTimelineAnimation(am.CreateTimeline())
  control.animation = animation
  animation.SetPlaybackType(ANIMATION_SIZE, 0)

  control.SetResizeToFitDescendents(true)
  control.open = false

  const animateSubmenu = function (this: void, ...args: unknown[]): undefined {
    const clicked = asControl(args[0])
    const submenu = asLamControl(clicked.GetParent())
    if (submenu.disabled === true) {
      return
    }

    submenu.open = submenu.open !== true
    if (submenu.open) {
      animation.PlayFromStart()
    } else {
      animation.PlayFromEnd()
    }
  }

  label.SetHandler("OnMouseUp", animateSubmenu)
  if (icon !== undefined) {
    icon.SetHandler("OnMouseUp", animateSubmenu)
  }
  animation.SetHandler("OnStop", function (this: void, ..._args: unknown[]): undefined {
    scroll.SetResizeToFitDescendents(control.open === true)
    scroll.SetResizeToFitConstrains(ANCHOR_CONSTRAINS_XY)
    if (control.open === true) {
      arrow.SetTexture("EsoUI\\Art\\Miscellaneous\\list_sortup.dds")
      scroll.SetResizeToFitPadding(5, 20)
    } else {
      arrow.SetTexture("EsoUI\\Art\\Miscellaneous\\list_sortdown.dds")
      scroll.SetResizeToFitPadding(5, 0)
      scroll.SetHeight(0)
    }
  })

  const btmToggle = wm.CreateControl(undefined, asControl(control), CT_TEXTURE)
  control.btmToggle = btmToggle
  btmToggle.SetMouseEnabled(true)
  btmToggle.SetAnchor(BOTTOMLEFT, scroll, BOTTOMLEFT)
  btmToggle.SetAnchor(BOTTOMRIGHT, scroll, BOTTOMRIGHT)
  btmToggle.SetHeight(15)
  btmToggle.SetAlpha(0)
  btmToggle.SetHandler("OnMouseUp", animateSubmenu)

  control.UpdateValue = function (this: LamControl): undefined {
    label.SetText(getStringFromValue(submenuData.name))

    if (icon !== undefined) {
      if (submenuData.icon !== undefined) {
        icon.SetTexture(getDefaultValue(submenuData.icon))
      }
      if (submenuData.iconTextureCoords !== undefined) {
        const coords = getDefaultValue(submenuData.iconTextureCoords)
        const [left, right, top, bottom] = unpack(coords)
        icon.SetTextureCoords(left, right, top, bottom)
      }
    }

    if (submenuData.tooltip !== undefined) {
      const host = asTooltipHostControl(label)
      if (host.data !== undefined) {
        host.data.tooltipText = getStringFromValue(submenuData.tooltip)
      }
    }
  }

  if (submenuData.disabled !== undefined || submenuData.disabledLabel !== undefined) {
    control.UpdateDisabled = function (this: LamControl): undefined {
      const disable = getDefaultValue(submenuData.disabled ?? false)
      if (disable !== control.disabled) {
        const color = getColorForState(disable)
        if (disable && control.open === true) {
          control.open = false
          animation.PlayFromStart()
        }

        const [r, g, b, a] = color.UnpackRGBA()
        arrow.SetColor(r, g, b, a)
        control.disabled = disable
      }

      const disableLabel =
        control.disabled === true || getDefaultValue(submenuData.disabledLabel ?? false)
      if (disableLabel !== control.disabledLabel) {
        const color = getColorForState(disableLabel)
        const [r, g, b, a] = color.UnpackRGBA()
        label.SetColor(r, g, b, a)
        if (icon !== undefined) {
          icon.SetDesaturation(disableLabel ? 1 : 0)
        }
        control.disabledLabel = disableLabel
      }
    }
    control.UpdateDisabled()
  }

  registerForRefreshIfNeeded(control)

  return control
}

if (registerWidget("submenu", WIDGET_VERSION.submenu)) {
  LAMCC.submenu = asLamFactory(createSubmenu)
}
