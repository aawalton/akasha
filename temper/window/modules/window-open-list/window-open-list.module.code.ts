import { SURFACE_4 } from "akasha/design/interface/token/modules/surface-color/surface-color.module.code.ts"
import {
  paintSurface,
  type SurfaceLevel,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-journal-window/eso-journal-window.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

const LIST_LEVEL: SurfaceLevel = 3

const OPAQUE = 1

const CLEAR = 0

const EDGE = 1

const TEMPER_PREFIX = "Temper"

const MENU_PREFIX = "TemperScrollableMenu"

const GAME_CENTER = "EsoUI/Art/Tooltips/UI-TooltipCenter.dds"

const GAME_EDGE = "EsoUI/Art/Tooltips/UI-Border.dds"

const GAME_EDGE_WIDTH = 128

const GAME_EDGE_HEIGHT = 16

const GAME_INSET = 16

const PAINTED = new LuaTable<Control, boolean>()

export function backdropBehind(control: Control): BackdropControl | undefined {
  const behind = control.GetNamedChild("BG")
  if (behind === undefined || behind.GetType() !== CT_BACKDROP) return undefined
  return behind as BackdropControl
}

export function paintOpenList(list: Control): undefined {
  const backdrop = backdropBehind(list)
  if (backdrop === undefined) return undefined
  backdrop.SetCenterTexture(undefined)
  backdrop.SetEdgeTexture(undefined, 1, 1, EDGE)
  backdrop.SetInsets(CLEAR, CLEAR, CLEAR, CLEAR)
  paintSurface(backdrop, LIST_LEVEL)
  const [red, green, blue] = SURFACE_4
  backdrop.SetEdgeColor(red, green, blue, OPAQUE)
  backdrop.GetNamedChild("MungeOverlay")?.SetHidden(true)
  PAINTED.set(list, true)
  return undefined
}

export function restoreOpenList(list: Control): undefined {
  if (PAINTED.get(list) !== true) return undefined
  PAINTED.delete(list)
  const backdrop = backdropBehind(list)
  if (backdrop === undefined) return undefined
  backdrop.SetCenterTexture(GAME_CENTER)
  backdrop.SetEdgeTexture(GAME_EDGE, GAME_EDGE_WIDTH, GAME_EDGE_HEIGHT)
  backdrop.SetInsets(GAME_INSET, GAME_INSET, -GAME_INSET, -GAME_INSET)
  backdrop.SetCenterColor(OPAQUE, OPAQUE, OPAQUE, OPAQUE)
  backdrop.SetEdgeColor(OPAQUE, OPAQUE, OPAQUE, OPAQUE)
  backdrop.GetNamedChild("MungeOverlay")?.SetHidden(false)
  return undefined
}

const FOLLOWING = "TemperOpenList"

let followed = false

export function followGameList(): undefined {
  if (followed) return undefined
  const shared = ZO_COMBO_BOX_DROPDOWN_KEYBOARD
  if (shared === undefined) return undefined
  followed = true
  SecurePostHook(
    shared,
    "Show",
    function (this: void, _self: unknown, combo?: ComboBox): undefined {
      if (openedInTemperWindow(combo?.m_container)) paintOpenList(shared.control)
      return undefined
    }
  )
  shared.control.SetHandler(
    "OnEffectivelyHidden",
    function (this: void): undefined {
      restoreOpenList(shared.control)
      return undefined
    },
    FOLLOWING
  )
  return undefined
}

export function openedInTemperWindow(opener: Control | undefined): boolean {
  if (opener === undefined) return false
  const window = opener.GetOwningWindow()
  if (window === undefined) return false
  const name = window.GetName()
  if (name.startsWith(MENU_PREFIX)) return PAINTED.get(window) === true
  return name.startsWith(TEMPER_PREFIX)
}
