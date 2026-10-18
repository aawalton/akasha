import "akasha/temper/addon/pages/items/crafting-station/potion-decl-controls/potion-decl-controls.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-02/eso-objects-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type SurfaceLevel = 0 | 1 | 2 | 3 | 4

interface SurfaceArt {
  readonly edge: string
  readonly edgeWidth: number
  readonly edgeHeight: number
  readonly center: string
  readonly inset: number
}

const WINDOW_ART: SurfaceArt = {
  edge: "EsoUI/Art/Tooltips/UI-Border.dds",
  edgeWidth: 128,
  edgeHeight: 16,
  center: "EsoUI/Art/Tooltips/UI-TooltipCenter.dds",
  inset: 16,
}

const INSET_ART: SurfaceArt = {
  edge: "EsoUI/Art/Miscellaneous/inset_edgeFile.dds",
  edgeWidth: 128,
  edgeHeight: 16,
  center: "EsoUI/Art/Miscellaneous/inset_center.dds",
  inset: 4,
}

const HIGHEST_WINDOW_LEVEL: SurfaceLevel = 1

const UNTINTED = 1

function artAt(level: SurfaceLevel): SurfaceArt {
  return level <= HIGHEST_WINDOW_LEVEL ? WINDOW_ART : INSET_ART
}

export function paintSurface(backdrop: BackdropControl, level: SurfaceLevel): undefined {
  const art = artAt(level)
  backdrop.SetCenterTexture(art.center)
  backdrop.SetCenterColor(UNTINTED, UNTINTED, UNTINTED, UNTINTED)
  backdrop.SetEdgeTexture(art.edge, art.edgeWidth, art.edgeHeight, art.edgeHeight)
  backdrop.SetEdgeColor(UNTINTED, UNTINTED, UNTINTED, UNTINTED)
  backdrop.SetInsets(art.inset, art.inset, -art.inset, -art.inset)
}

export function drawSurface(parent: Control, level: SurfaceLevel): BackdropControl {
  const backdrop = WINDOW_MANAGER.CreateControl("$(parent)BG", parent, CT_BACKDROP)
  backdrop.SetAnchorFill()
  paintSurface(backdrop, level)
  backdrop.SetDrawLayer(DL_BACKGROUND)
  backdrop.SetDrawLevel(0)
  return backdrop
}
