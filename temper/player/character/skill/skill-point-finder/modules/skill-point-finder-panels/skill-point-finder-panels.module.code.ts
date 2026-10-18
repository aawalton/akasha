import { requireGui } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-state/skill-point-finder-state.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import { paintPanel } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/player/character/skill/skill-point-finder/skill-point-finder-controls/skill-point-finder-controls.type-declaration.d.ts"

const INSET = 10

const ROW_HEIGHT = 18

const LIST_EDGES = 4

const TITLE_HEIGHT = 24

const TOTAL_HEIGHT = 18

const STACK_GAP = 8

const HEADER_HEIGHT = 30

const BODY_GAP = 12

const FOOTER_GAP = 12

const FOOTER_HEIGHT = 48

const HEADER_ROWS = 1

type Section = "GSP" | "SQS" | "GDQ" | "PDGBE"

const PANELS = new LuaTable<Section, BackdropControl>()

function titleOf(this: void, section: Section): LabelControl {
  if (section === "GSP") return TemperCharactersSkillPointFinder_GUI_Body_GSP
  if (section === "SQS") return TemperCharactersSkillPointFinder_GUI_Body_SQS
  if (section === "GDQ") return TemperCharactersSkillPointFinder_GUI_Body_GDQ
  return TemperCharactersSkillPointFinder_GUI_Body_PDGBE
}

function panelOf(this: void, section: Section): BackdropControl {
  const held = PANELS.get(section)
  if (held !== undefined) return held
  const panel = paintPanel(
    WINDOW_MANAGER.CreateControl(
      `$(parent)_Panel${section}`,
      TemperCharactersSkillPointFinder_GUI_Body,
      CT_BACKDROP
    )
  )
  const title = titleOf(section)
  panel.SetAnchor(TOPLEFT, title, TOPLEFT, -INSET, -INSET)
  PANELS.set(section, panel)
  return panel
}

export function listHeight(this: void, rows: number): number {
  return ROW_HEIGHT * rows + LIST_EDGES
}

function panelHeight(this: void, rows: number): number {
  return INSET + TITLE_HEIGHT + listHeight(rows) + TOTAL_HEIGHT + INSET
}

function sized(this: void, section: Section, height: number): undefined {
  panelOf(section).SetDimensions(titleOf(section).GetWidth() + INSET * 2, height)
  return undefined
}

export function layoutPanels(this: void): undefined {
  const gui = requireGui()
  const general = panelHeight(gui.GSP.length + HEADER_ROWS)
  const story = panelHeight(gui.SQS.length + HEADER_ROWS)
  const group = panelHeight(Math.ceil(gui.GDQ.length / 2) + HEADER_ROWS)
  const publicDungeons = panelHeight(gui.PDGBE.length + HEADER_ROWS)
  const shared = Math.max(general + STACK_GAP + publicDungeons, story, group)
  sized("GSP", general)
  sized("PDGBE", shared - general - STACK_GAP)
  sized("SQS", shared)
  sized("GDQ", shared)
  TemperCharactersSkillPointFinder_GUI.SetHeight(
    FRAME_TOP + HEADER_HEIGHT + BODY_GAP + shared + FOOTER_GAP + FOOTER_HEIGHT + FRAME_PADDING
  )
  return undefined
}
