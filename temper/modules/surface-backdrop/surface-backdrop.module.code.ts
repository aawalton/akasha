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

const OVER_PLAY_SHADE = 0

const OVER_PLAY_ALPHA = 0.5

const CLEAR = 0

export function paintOverPlay(backdrop: BackdropControl): undefined {
  backdrop.SetCenterTexture(undefined)
  backdrop.SetCenterColor(OVER_PLAY_SHADE, OVER_PLAY_SHADE, OVER_PLAY_SHADE, OVER_PLAY_ALPHA)
  backdrop.SetEdgeTexture(undefined, 1, 1, CLEAR)
  backdrop.SetEdgeColor(CLEAR, CLEAR, CLEAR, CLEAR)
  backdrop.SetInsets(CLEAR, CLEAR, CLEAR, CLEAR)
}

const PANEL_ART = "EsoUI/Art/Miscellaneous/centerscreen_left.dds"

const PANEL_ART_SIZE = 1024

const PANEL_ART_LEFT = 32

const PANEL_ART_RIGHT = 1000

const PANEL_FADE_ART = 80

const PANEL_BODY_END_ART = 820

const PANEL_FADE_END_ART = 900

const PANEL_FADE = 16

export const PANEL_GAP = 24

function panelSlice(parent: Control, name: string, top: number, bottom: number): TextureControl {
  const slice = WINDOW_MANAGER.CreateControl(name, parent, CT_TEXTURE)
  slice.SetTexture(PANEL_ART)
  slice.SetTextureCoords(
    PANEL_ART_LEFT / PANEL_ART_SIZE,
    PANEL_ART_RIGHT / PANEL_ART_SIZE,
    top / PANEL_ART_SIZE,
    bottom / PANEL_ART_SIZE
  )
  slice.SetDrawLayer(DL_BACKGROUND)
  slice.SetDrawLevel(0)
  return slice
}

export function drawPanelBackground(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl("$(parent)PanelBackground", parent, CT_CONTROL)
  panel.SetAnchorFill()
  const top = panelSlice(panel, "$(parent)Top", 0, PANEL_FADE_ART)
  top.SetAnchor(TOPLEFT, panel, TOPLEFT, 0, 0)
  top.SetAnchor(TOPRIGHT, panel, TOPRIGHT, 0, 0)
  top.SetHeight(PANEL_FADE)
  const bottom = panelSlice(panel, "$(parent)Bottom", PANEL_BODY_END_ART, PANEL_FADE_END_ART)
  bottom.SetAnchor(BOTTOMLEFT, panel, BOTTOMLEFT, 0, 0)
  bottom.SetAnchor(BOTTOMRIGHT, panel, BOTTOMRIGHT, 0, 0)
  bottom.SetHeight(PANEL_FADE)
  const body = panelSlice(panel, "$(parent)Body", PANEL_FADE_ART, PANEL_BODY_END_ART)
  body.SetAnchor(TOPLEFT, top, BOTTOMLEFT, 0, 0)
  body.SetAnchor(BOTTOMRIGHT, bottom, TOPRIGHT, 0, 0)
  return panel
}

export function drawSurface(parent: Control, level: SurfaceLevel): BackdropControl {
  const backdrop = WINDOW_MANAGER.CreateControl("$(parent)BG", parent, CT_BACKDROP)
  backdrop.SetAnchorFill()
  paintSurface(backdrop, level)
  backdrop.SetDrawLayer(DL_BACKGROUND)
  backdrop.SetDrawLevel(0)
  return backdrop
}
