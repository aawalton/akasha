import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import {
  SURFACE_0,
  SURFACE_1,
  SURFACE_2,
  SURFACE_3,
  SURFACE_4,
} from "akasha/design/interface/token/modules/surface-color/surface-color.module.code.ts"
import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4

const SURFACES: readonly [Rgb, Rgb, Rgb, Rgb, Rgb] = [
  SURFACE_0,
  SURFACE_1,
  SURFACE_2,
  SURFACE_3,
  SURFACE_4,
]

export function surfaceAt(level: SurfaceLevel): Rgb {
  return SURFACES[level]
}

const OPAQUE = 1

export function paintSurface(backdrop: BackdropControl, level: SurfaceLevel): undefined {
  const [red, green, blue] = surfaceAt(level)
  backdrop.SetCenterColor(red, green, blue, OPAQUE)
}

export function drawSurface(parent: Control, level: SurfaceLevel): BackdropControl {
  const backdrop = WINDOW_MANAGER.CreateControl("$(parent)BG", parent, CT_BACKDROP)
  backdrop.SetAnchorFill()
  paintSurface(backdrop, level)
  backdrop.SetEdgeColor(0, 0, 0, 0)
  backdrop.SetEdgeTexture(undefined, 1, 1, 1)
  return backdrop
}
