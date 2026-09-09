import {
  asIconControl,
  asIconPickerMenu,
} from "../addon-menu-casts/addon-menu-casts.module.code.ts"
import { em, wm } from "../addon-menu-state/addon-menu-state.module.code.ts"
import type {
  IconControl,
  IconPickerMenu,
} from "../addon-menu-types/addon-menu-types.module.code.ts"
import { getStringFromValue } from "../addon-menu-util/addon-menu-util.module.code.ts"

const DEFAULT_SIZE = 28

export function createIconPickerMenu(this: void): IconPickerMenu {
  const name = "LAMIconPicker"

  const control = wm.CreateTopLevelWindow(name)
  control.SetDrawTier(DT_HIGH)
  control.SetHidden(true)

  const scrollContainer = wm.CreateControlFromVirtual(
    name + "ScrollContainer",
    control,
    "ZO_ScrollContainer"
  )
  scrollContainer.SetAnchorFill()
  ZO_Scroll_SetUseFadeGradient(scrollContainer, false)
  ZO_Scroll_SetHideScrollbarOnDisable(scrollContainer, false)
  ZO_VerticalScrollbarBase_OnMouseExit(scrollContainer.GetNamedChild("ScrollBar"))
  const scroll = GetControl(scrollContainer, "ScrollChild")

  const bg = wm.CreateControl(undefined, scrollContainer, CT_BACKDROP)
  bg.SetAnchor(TOPLEFT, scrollContainer, TOPLEFT, 0, -3)
  bg.SetAnchor(BOTTOMRIGHT, scrollContainer, BOTTOMRIGHT, 2, 5)
  bg.SetEdgeTexture("EsoUI\\Art\\Tooltips\\UI-Border.dds", 128, 16, 0)
  bg.SetCenterTexture("EsoUI\\Art\\Tooltips\\UI-TooltipCenter.dds")
  bg.SetInsets(16, 16, -16, -16)

  const mungeOverlay = wm.CreateControl(undefined, bg, CT_TEXTURE)
  mungeOverlay.SetTexture("EsoUI/Art/Tooltips/munge_overlay.dds")
  mungeOverlay.SetDrawLevel(1)
  mungeOverlay.SetAddressMode(TEX_MODE_WRAP)
  mungeOverlay.SetAnchorFill()

  const mouseOver = wm.CreateControl(undefined, scrollContainer, CT_TEXTURE)
  mouseOver.SetDrawLevel(2)
  mouseOver.SetTexture("EsoUI/Art/Buttons/minmax_mouseover.dds")
  mouseOver.SetHidden(true)

  let icons: IconControl[] = []
  let maxCols = 5
  let iconSize = DEFAULT_SIZE
  let visibleRows = 4.5

  function onMouseEnter(this: void, icon: IconControl): undefined {
    const tooltipText = icon.tooltip !== undefined ? getStringFromValue(icon.tooltip) : undefined
    if (tooltipText !== undefined && tooltipText !== "") {
      InitializeTooltip(InformationTooltip, icon, TOPLEFT, 0, 0, BOTTOMRIGHT)
      SetTooltipText(InformationTooltip, tooltipText.toString())
      InformationTooltipTopLevel.BringWindowToTop()
    }
  }

  function onMouseExit(this: void): undefined {
    ClearTooltip(InformationTooltip)
  }

  function iconFactory(this: void, pool: ObjectPool<IconControl>): IconControl {
    const icon = asIconControl(
      wm.CreateControl(name + "Entry" + pool.GetNextControlId(), scroll, CT_TEXTURE)
    )
    icon.SetMouseEnabled(true)
    icon.SetDrawLevel(3)
    icon.SetDrawLayer(DL_CONTROLS)
    icon.SetHandler("OnMouseEnter", () => {
      mouseOver.SetAnchor(TOPLEFT, icon, TOPLEFT, 0, 0)
      mouseOver.SetAnchor(BOTTOMRIGHT, icon, BOTTOMRIGHT, 0, 0)
      mouseOver.SetHidden(false)
      if (menu.customOnMouseEnter !== undefined) {
        menu.customOnMouseEnter(icon)
      } else {
        onMouseEnter(icon)
      }
    })
    icon.SetHandler("OnMouseExit", () => {
      mouseOver.ClearAnchors()
      mouseOver.SetHidden(true)
      if (menu.customOnMouseExit !== undefined) {
        menu.customOnMouseExit(icon)
      } else {
        onMouseExit()
      }
    })
    icon.SetHandler("OnMouseUp", () => {
      PlaySound("Click")
      icon.OnSelect?.(icon, icon.texture ?? "")
      menu.Clear()
    })
    return icon
  }

  function resetFunction(this: void, icon: IconControl): undefined {
    icon.ClearAnchors()
    icon.SetHidden(true)
  }

  const iconPool: ObjectPool<IconControl> = ZO_ObjectPool.New(iconFactory, resetFunction)

  function setMaxColumns(this: void, value?: number): undefined {
    maxCols = value !== undefined ? value : 5
  }

  function setIconSize(this: void, value?: number): undefined {
    let size = DEFAULT_SIZE
    if (value !== undefined) {
      size = Math.max(size, value)
    }
    iconSize = size
  }

  function setVisibleRows(this: void, value?: number): undefined {
    visibleRows = value !== undefined ? value : 4.5
  }

  function setMouseHandlers(
    this: void,
    onEnter?: (this: void, icon: Control) => void,
    onExit?: (this: void, icon: Control) => void
  ): undefined {
    menu.customOnMouseEnter = onEnter
    menu.customOnMouseExit = onExit
  }

  function updateDimensions(this: void): undefined {
    const width = iconSize * maxCols + 20
    const height = iconSize * visibleRows
    control.SetDimensions(width, height)
    for (const icon of icons) {
      icon.SetDimensions(iconSize, iconSize)
    }
  }

  function updateAnchors(this: void): undefined {
    let col = 1
    let previousCol: IconControl | undefined
    let previousRow: IconControl | undefined
    for (let i = 0; i < icons.length; i++) {
      const icon = icons[i]
      if (icon === undefined) {
        continue
      }
      icon.ClearAnchors()
      if (i === 0) {
        icon.SetAnchor(TOPLEFT, scroll, TOPLEFT, 0, 0)
        previousRow = icon
      } else if (col === 1) {
        icon.SetAnchor(TOPLEFT, previousRow, BOTTOMLEFT, 0, 0)
        previousRow = icon
      } else {
        icon.SetAnchor(TOPLEFT, previousCol, TOPRIGHT, 0, 0)
      }
      previousCol = icon
      col = col >= maxCols ? 1 : col + 1
    }
  }

  function clear(this: IconPickerMenu): undefined {
    icons = []
    iconPool.ReleaseAllObjects()
    control.SetHidden(true)
    menu.color = ZO_DEFAULT_ENABLED_COLOR
    menu.refCount = undefined
    menu.parent = undefined
    menu.customOnMouseEnter = undefined
    menu.customOnMouseExit = undefined
  }

  function addIcon(
    this: IconPickerMenu,
    texturePath: string,
    callback: (this: void, icon: Control, texture: string) => void,
    tooltip?: string
  ): undefined {
    const [icon] = iconPool.AcquireObject()
    icon.SetHidden(false)
    icon.SetTexture(texturePath)
    const [r, g, b, a] = menu.color.UnpackRGBA()
    icon.SetColor(r, g, b, a)
    icon.texture = texturePath
    icon.tooltip = tooltip
    icon.OnSelect = callback
    icons.push(icon)
  }

  function show(this: void, parent: Control): boolean {
    if (icons.length === 0) {
      return false
    }
    if (!control.IsHidden()) {
      menu.Clear()
      return false
    }
    updateDimensions()
    updateAnchors()

    control.ClearAnchors()
    control.SetAnchor(TOPLEFT, parent, BOTTOMLEFT, 0, 8)
    control.SetHidden(false)
    control.BringWindowToTop()
    menu.parent = parent
    menu.refCount = 2

    return true
  }

  function setColor(this: IconPickerMenu, color: ZoColorDef): undefined {
    menu.color = color
    const [r, g, b, a] = color.UnpackRGBA()
    for (const icon of icons) {
      icon.SetColor(r, g, b, a)
    }
  }

  const menu: IconPickerMenu = asIconPickerMenu({
    control,
    parent: undefined,
    color: ZO_DEFAULT_ENABLED_COLOR,
    refCount: undefined,
    customOnMouseEnter: undefined,
    customOnMouseExit: undefined,
    Clear: clear,
    AddIcon: addIcon,
    Show: show,
    SetColor: setColor,
    SetMaxColumns: setMaxColumns,
    SetIconSize: setIconSize,
    SetVisibleRows: setVisibleRows,
    SetMouseHandlers: setMouseHandlers,
    UpdateDimensions: updateDimensions,
    UpdateAnchors: updateAnchors,
  })

  setMaxColumns(1)

  em.RegisterForEvent(name + "_OnGlobalMouseUp", EVENT_GLOBAL_MOUSE_UP, () => {
    if (menu.refCount !== undefined) {
      const moc = wm.GetMouseOverControl()
      if (moc !== undefined && moc.GetOwningWindow() !== control) {
        menu.refCount = menu.refCount - 1
        if (menu.refCount <= 0) {
          menu.Clear()
        }
      }
    }
  })

  return menu
}
