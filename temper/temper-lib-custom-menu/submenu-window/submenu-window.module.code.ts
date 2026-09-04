import { asLcmLabel } from "../custom-menu-casts/custom-menu-casts.module.code.ts"
import {
  DEFAULT_ITEM_FONT,
  DIVIDER,
  HEADER_FONT,
  MENU_ADD_OPTION_HEADER,
  SUBMENU_ITEM_MOUSE_ENTER,
  SUBMENU_ITEM_MOUSE_EXIT,
} from "../custom-menu-constants/custom-menu-constants.module.code.ts"
import type {
  LcmLabel,
  LcmRowControl,
  Submenu,
} from "../custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "../eso-menu/eso-menu.module.code.ts"
import {
  getValueOrCallback,
  runTooltip,
  setupDivider,
  setupHeader,
} from "../menu-row-setup/menu-row-setup.module.code.ts"
import {
  DEFAULT_TEXT_COLOR,
  DEFAULT_TEXT_HIGHLIGHT,
} from "../submenu-text-colors/submenu-text-colors.module.code.ts"
import { clearTimeout, setTimeout } from "../submenu-timeout/submenu-timeout.module.code.ts"

const wm = WINDOW_MANAGER

export function createSubmenu(this: void, name: string): Submenu {
  const window = ZO_Menus
  const submenuControl = window.CreateControl(name, CT_CONTROL)
  submenuControl.SetClampedToScreen(true)
  submenuControl.SetMouseEnabled(true)
  submenuControl.SetHidden(true)
  submenuControl.SetHandler("OnMouseEnter", clearTimeout)

  let self: Submenu

  function refreshSubMenu(this: void): undefined {
    if (self.parent !== undefined && self.parent.OnSelect !== undefined) {
      self.parent.OnSelect(SUBMENU_ITEM_MOUSE_ENTER)
    }
  }
  function exitSubMenu(this: void): undefined {
    if (self.parent !== undefined && self.parent.OnSelect !== undefined) {
      self.parent.OnSelect(SUBMENU_ITEM_MOUSE_EXIT)
    }
  }

  submenuControl.SetHandler("OnMouseExit", () => setTimeout(exitSubMenu))
  submenuControl.SetHandler("OnHide", () => {
    clearTimeout()
    self.Clear()
  })
  submenuControl.SetDrawLayer(menu.GetDrawLayer())
  submenuControl.SetDrawTier(menu.GetDrawTier())
  submenuControl.SetDrawLevel(menu.GetDrawLevel() + 1)

  const bg = submenuControl.CreateControl<BackdropControl>("$(parent)BG", CT_BACKDROP)
  bg.SetCenterTexture("EsoUI/Art/Tooltips/UI-TooltipCenter.dds")
  bg.SetEdgeTexture("EsoUI/Art/Tooltips/UI-Border.dds", 128, 16)
  bg.SetInsets(16, 16, -16, -16)
  bg.SetAnchorFill()

  const overlay = bg.CreateControl<TextureControl>("$(parent)MungeOverlay", CT_TEXTURE)
  overlay.SetTexture("EsoUI/Art/Tooltips/munge_overlay.dds")
  overlay.SetAddressMode(TEX_MODE_WRAP)
  overlay.SetAnchor(TOPLEFT)
  overlay.SetAnchor(BOTTOMRIGHT)

  const highlight = CreateControlFromVirtual(
    "$(parent)Highlight",
    submenuControl,
    "ZO_SelectionHighlight"
  )
  highlight.SetHidden(true)

  let upInside: LcmRowControl | undefined

  function itemMouseEnter(this: void, control: LcmRowControl): undefined {
    upInside = control
    clearTimeout()
    self.SetSelectedIndex(control.index)
    runTooltip(control, true)
  }
  function itemMouseExit(this: void, control: LcmRowControl): undefined {
    upInside = undefined
    if (self.selectedIndex === control.index) {
      self.SetSelectedIndex(undefined)
    }
    runTooltip(control, false)
  }

  function resetFunction(this: void, control: LcmRowControl): undefined {
    control.SetHidden(true)
    control.ClearAnchors()
    control.OnSelect = undefined
    control.menuIndex = undefined
  }

  function itemFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "ZO_SubMenuItem",
      submenuControl,
      "ZO_MenuItem",
      pool.GetNextControlId()
    )
    control.SetDrawLevel(3)
    const nl = GetControl<LcmLabel>(control, "Name")
    if (nl !== undefined) {
      control.nameLabel = nl
    }
    control.SetHandler("OnMouseEnter", () => itemMouseEnter(control))
    control.SetHandler("OnMouseExit", () => itemMouseExit(control))
    control.SetHandler("OnMouseDown", IgnoreMouseDownEditFocusLoss)
    control.SetHandler("OnMouseUp", (_self: unknown, button: unknown) => {
      if (upInside === control && button === MOUSE_BUTTON_INDEX_LEFT) {
        ZO_Menu_SetLastCommandWasFromMenu(true)
        if (control.checkbox !== undefined) {
          ZO_CheckButton_OnClicked(control.checkbox, MOUSE_BUTTON_INDEX_LEFT)
        } else if (control.OnSelect !== undefined) {
          const keep = control.OnSelect()
          if (keep === undefined || keep === false) {
            ClearMenu()
          }
        }
      }
    })
    return control
  }

  function dividerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "ZO_CustomSubMenuDivider",
      submenuControl,
      "ZO_NotificationsRowButton",
      pool.GetNextControlId()
    )
    setupDivider(control)
    return control
  }

  function headerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "ZO_CustomSubMenuHeader",
      submenuControl,
      "ZO_AddOnSectionHeaderRow",
      pool.GetNextControlId()
    )
    setupHeader(control)
    return control
  }

  function checkboxFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
    const control = CreateControlFromVirtual<LcmRowControl>(
      "ZO_CustomSubMenuItemCheckButton",
      submenuControl,
      "ZO_CheckButton",
      pool.GetNextControlId()
    )
    control.SetDrawLevel(3)
    control.nameLabel = asLcmLabel(control)
    control.SetHandler("OnMouseEnter", () => {
      const p = control.GetParent<LcmRowControl>()
      if (p !== undefined) {
        itemMouseEnter(p)
      }
    })
    control.SetHandler("OnMouseExit", () => {
      const p = control.GetParent<LcmRowControl>()
      if (p !== undefined) {
        itemMouseExit(p)
      }
    })
    ZO_CheckButton_SetToggleFunction(control, (cb: Control) => {
      self.refCount = (self.refCount ?? 0) + 1
      const parent = cb.GetParent<LcmRowControl>()
      if (parent !== undefined && parent.OnSelect !== undefined) {
        parent.OnSelect(ZO_CheckButton_IsChecked(cb))
      }
      refreshSubMenu()
      const enter = cb.GetHandler("OnMouseEnter")
      if (enter !== undefined) {
        enter(cb)
      }
    })
    return control
  }

  const itemPool = ZO_ObjectPool.New(itemFactory, resetFunction)
  const dividerPool = ZO_ObjectPool.New(dividerFactory, resetFunction)
  const checkBoxPool = ZO_ObjectPool.New(checkboxFactory, resetFunction)
  const headerPool = ZO_ObjectPool.New(headerFactory, resetFunction)

  self = {
    control: submenuControl,
    highlight,
    window,
    items: [],
    itemPool,
    dividerPool,
    checkBoxPool,
    headerPool,

    SetSelectedIndex(index) {
      let next = index
      if (next !== undefined) {
        next = zo_max(zo_min(next, this.items.length - 1), 0)
      }
      if (this.selectedIndex !== next) {
        this.UnselectItem(this.selectedIndex)
        this.SelectItem(next)
      }
    },

    UnselectItem(index) {
      if (index === undefined) {
        return
      }
      const item = this.items[index]
      if (item !== undefined) {
        this.highlight.SetHidden(true)
        const nameControl = item.nameLabel
        const [r, g, b, a] = nameControl.normalColor.UnpackRGBA()
        nameControl.SetColor(r, g, b, a)
        this.selectedIndex = undefined
      }
    },

    SelectItem(index) {
      if (index === undefined) {
        return
      }
      const item = this.items[index]
      if (item !== undefined) {
        const highlightControl = this.highlight
        highlightControl.ClearAnchors()
        highlightControl.SetAnchor(TOPLEFT, item, TOPLEFT, -2, -2)
        highlightControl.SetAnchor(BOTTOMRIGHT, item, BOTTOMRIGHT, 2, 2)
        highlightControl.SetHidden(false)
        const nameControl = item.nameLabel
        const [r, g, b, a] = nameControl.highlightColor.UnpackRGBA()
        nameControl.SetColor(r, g, b, a)
        this.selectedIndex = index
      }
    },

    UpdateAnchors() {
      let previousItem: Control = this.control
      const items = this.items
      let width = 0
      let height = 0
      const padding = menu.menuPad
      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item === undefined) {
          continue
        }
        const [textWidth, textHeight] = item.nameLabel.GetTextDimensions()
        width = zo_max(textWidth + padding * 2, width)
        height = height + textHeight
        item.ClearAnchors()
        if (i === 0) {
          item.SetAnchor(TOPLEFT, previousItem, TOPLEFT, padding, padding)
          item.SetAnchor(TOPRIGHT, previousItem, TOPRIGHT, -padding, padding)
        } else {
          item.SetAnchor(TOPLEFT, previousItem, BOTTOMLEFT, 0, item.itemYPad ?? 0)
          item.SetAnchor(TOPRIGHT, previousItem, BOTTOMRIGHT, 0, item.itemYPad ?? 0)
        }
        item.SetHidden(false)
        item.SetDimensions(textWidth, textHeight)
        previousItem = item
      }
      this.control.SetDimensions(width + padding * 2, height + padding * 2)
    },

    Clear() {
      this.UnselectItem(this.selectedIndex)
      this.items = []
      this.itemPool.ReleaseAllObjects()
      this.dividerPool.ReleaseAllObjects()
      this.checkBoxPool.ReleaseAllObjects()
      this.headerPool.ReleaseAllObjects()
      this.control.SetHidden(true)
      this.refCount = undefined
    },

    AddItem(entry, myfont, normalColor, highlightColor, itemYPad) {
      const visible: typeof entry.visible = entry.visible !== undefined ? entry.visible : true
      const isVisible = getValueOrCallback(visible, menu)
      if (isVisible === false || isVisible === undefined) {
        return
      }

      const itemType = entry.itemType ?? MENU_ADD_OPTION_LABEL
      let item: LcmRowControl
      if (itemType === MENU_ADD_OPTION_LABEL) {
        const pool = entry.label !== DIVIDER ? this.itemPool : this.dividerPool
        const [acquired] = pool.AcquireObject()
        item = acquired
      } else if (itemType === MENU_ADD_OPTION_CHECKBOX) {
        const [acquired] = this.itemPool.AcquireObject()
        item = acquired
      } else if (itemType === MENU_ADD_OPTION_HEADER) {
        const [acquired] = this.headerPool.AcquireObject()
        item = acquired
      } else {
        error(`Unknown menu entry itemType: ${itemType}`)
      }

      item.OnSelect = entry.callback
      item.tooltip = entry.tooltip
      item.itemYPad = itemYPad ?? 0
      item.index = this.items.length
      this.items[item.index] = item

      const nameControl = item.nameLabel
      const entryFont = getValueOrCallback(entry.myfont, menu, item) ?? myfont
      const normColor = getValueOrCallback(entry.normalColor, menu, item) ?? normalColor
      const highColor = getValueOrCallback(entry.highlightColor, menu, item) ?? highlightColor
      let resolvedFont: string
      if (itemType === MENU_ADD_OPTION_HEADER) {
        resolvedFont = entryFont ?? HEADER_FONT
        nameControl.normalColor = normColor ?? ZO_WHITE
      } else {
        resolvedFont = entryFont ?? DEFAULT_ITEM_FONT
        nameControl.normalColor = normColor ?? DEFAULT_TEXT_COLOR
      }
      nameControl.highlightColor = highColor ?? DEFAULT_TEXT_HIGHLIGHT
      nameControl.SetFont(resolvedFont)

      let text = getValueOrCallback(entry.label, menu, item) ?? ""

      let checkboxItemControl: LcmRowControl | undefined
      if (itemType === MENU_ADD_OPTION_CHECKBOX) {
        const [acquired] = this.checkBoxPool.AcquireObject()
        checkboxItemControl = acquired
        checkboxItemControl.SetParent(item)
        checkboxItemControl.menuIndex = item.index
        checkboxItemControl.ClearAnchors()
        checkboxItemControl.SetHidden(false)
        checkboxItemControl.SetAnchor(LEFT, undefined, LEFT, 2, -1)
        text = ` |u18:0::|u${text}`
        ZO_CheckButton_SetCheckState(
          checkboxItemControl,
          getValueOrCallback(entry.checked, menu, item) ?? false
        )
      }
      item.checkbox = checkboxItemControl

      nameControl.SetText(text)
      const [, textHeight] = nameControl.GetTextDimensions()
      item.storedHeight = textHeight

      const disabledValue = getValueOrCallback(entry.disabled ?? false, menu, item)
      const enabled = disabledValue !== true
      const colorToUse = enabled ? nameControl.normalColor : ZO_DEFAULT_DISABLED_COLOR
      const [er, eg, eb, ea] = colorToUse.UnpackRGBA()
      nameControl.SetColor(er, eg, eb, ea)
      item.SetMouseEnabled(enabled)
      if (checkboxItemControl !== undefined) {
        checkboxItemControl.SetMouseEnabled(enabled)
        checkboxItemControl.SetAlpha(enabled ? 1 : 0.6)
      }
    },

    Show(parent) {
      if (!this.control.IsHidden()) {
        this.Clear()
        return false
      }
      this.UpdateAnchors()

      const padding = menu.menuPad
      const control = this.control
      control.ClearAnchors()
      if (parent.GetRight() + control.GetWidth() < GuiRoot.GetRight()) {
        control.SetAnchor(TOPLEFT, parent, TOPRIGHT, -1, -padding)
      } else {
        control.SetAnchor(TOPRIGHT, parent, TOPLEFT, 1, -padding)
      }
      control.SetHidden(false)
      this.parent = parent
      this.refCount = 2
      return true
    },
  }

  EVENT_MANAGER.RegisterForEvent(`${name}_OnGlobalMouseUp`, EVENT_GLOBAL_MOUSE_UP, () => {
    if (self.refCount !== undefined) {
      const moc = wm.GetMouseOverControl()
      if (moc !== undefined && moc.GetOwningWindow() !== submenuControl) {
        self.refCount = self.refCount - 1
        if (self.refCount <= 0) {
          self.Clear()
        }
      }
    }
  })

  return self
}
