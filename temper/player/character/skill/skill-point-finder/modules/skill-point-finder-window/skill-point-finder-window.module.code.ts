import {
  LIST_DATA_TYPE,
  LIST_SEPARATOR_TYPE,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-constants/skill-point-finder-constants.module.code.ts"
import {
  type ListLine,
  setupGdqItem,
  setupGeneralItem,
  setupSqsItem,
  type UspfRowControl,
  updateDataLines,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-data-lines/skill-point-finder-data-lines.module.code.ts"
import { refreshData } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-points/skill-point-finder-points.module.code.ts"
import {
  requireGui,
  requireOptions,
  STATE,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-state/skill-point-finder-state.module.code.ts"
import {
  FRAME_PADDING,
  FRAME_TOP,
  frameWindow,
} from "akasha/temper/window/modules/window-frame/window-frame.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-sort-filter-list/eso-sort-filter-list.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/player/character/skill/skill-point-finder/skill-point-finder-controls/skill-point-finder-controls.type-declaration.d.ts"
import "akasha/temper/player/character/skill/skill-point-finder/skill-point-finder-string-ids/skill-point-finder-string-ids.type-declaration.d.ts"

export function toggleWindow(this: void): undefined {
  STATE.active = !STATE.active
  if (STATE.active) {
    updateDataLines()
  }
  SCENE_MANAGER.ToggleTopLevel(TemperCharactersSkillPointFinder_GUI)
}

export function setupValues(this: void): undefined {
  refreshData()

  const window = TemperCharactersSkillPointFinder_GUI
  const { body } = frameWindow(
    window,
    GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_TITLE),
    toggleWindow
  )
  const header = TemperCharactersSkillPointFinder_GUI_Header
  header.ClearAnchors()
  header.SetAnchor(TOPLEFT, body, TOPLEFT, 0, 0)
  header.SetAnchor(TOPRIGHT, body, TOPRIGHT, 0, 0)

  window.ClearAnchors()
  window.SetAnchor(CENTER, GuiRoot, CENTER, 0, 0)
  window.SetWidth(window.GetWidth() + FRAME_PADDING * 2)
  window.SetHeight(
    FRAME_TOP +
      header.GetHeight() +
      requireGui().PDGBE.length * 18 +
      TemperCharactersSkillPointFinder_GUI_Footer.GetHeight() +
      304 +
      FRAME_PADDING
  )

  const titleFont = requireOptions().Font.Fonts[STATE.settings.title.font] ?? ""
  const smallFont = `${titleFont}|14`

  TemperCharactersSkillPointFinder_GUI_Body_GSP.SetFont(`${titleFont}|16`)
  TemperCharactersSkillPointFinder_GUI_Body_GSP_T.SetFont(smallFont)

  TemperCharactersSkillPointFinder_GUI_Body_SQS.SetFont(`${titleFont}|16`)
  TemperCharactersSkillPointFinder_GUI_Body_SQS_Z_T.SetFont(smallFont)
  TemperCharactersSkillPointFinder_GUI_Body_SQS_SL_T.SetFont(smallFont)
  TemperCharactersSkillPointFinder_GUI_Body_SQS_SS_T.SetFont(smallFont)

  TemperCharactersSkillPointFinder_GUI_Body_GDQ.SetFont(`${titleFont}|16`)
  TemperCharactersSkillPointFinder_GUI_Body_GDQ_T.SetFont(smallFont)

  TemperCharactersSkillPointFinder_GUI_Body_PDGBE.SetFont(`${titleFont}|16`)
  TemperCharactersSkillPointFinder_GUI_Body_PDGBE_T.SetFont(smallFont)

  TemperCharactersSkillPointFinder_GUI_Footer_CharacterTotal.SetFont(`${titleFont}|24`)

  ZO_ScrollList_AddDataType<ListLine, UspfRowControl>(
    TemperCharactersSkillPointFinder_GUI_Body_SQS_ListHolder,
    LIST_DATA_TYPE,
    "TemperCharactersSkillPointFinder_SQSSTemplate",
    18,
    (control, data) => {
      setupSqsItem(control, data)
    }
  )
  ZO_ScrollList_AddDataType<ListLine>(
    TemperCharactersSkillPointFinder_GUI_Body_SQS_ListHolder,
    LIST_SEPARATOR_TYPE,
    "TemperCharactersSkillPointFinder_ListSeparator",
    2,
    () => {}
  )
  ZO_ScrollList_AddDataType<ListLine, UspfRowControl>(
    TemperCharactersSkillPointFinder_GUI_Body_GDQ_ListHolder,
    LIST_DATA_TYPE,
    "TemperCharactersSkillPointFinder_GDQTemplate",
    18,
    (control, data) => {
      setupGdqItem(control, data, STATE.settings.GDQ.font)
    }
  )
  ZO_ScrollList_AddDataType<ListLine>(
    TemperCharactersSkillPointFinder_GUI_Body_GDQ_ListHolder,
    LIST_SEPARATOR_TYPE,
    "TemperCharactersSkillPointFinder_ListSeparator",
    2,
    () => {}
  )
  ZO_ScrollList_AddDataType<ListLine, UspfRowControl>(
    TemperCharactersSkillPointFinder_GUI_Body_GDQ2_ListHolder,
    LIST_DATA_TYPE,
    "TemperCharactersSkillPointFinder_GDQTemplate",
    18,
    (control, data) => {
      setupGdqItem(control, data, STATE.settings.GDQ.font)
    }
  )
  ZO_ScrollList_AddDataType<ListLine>(
    TemperCharactersSkillPointFinder_GUI_Body_GDQ2_ListHolder,
    LIST_SEPARATOR_TYPE,
    "TemperCharactersSkillPointFinder_ListSeparator",
    2,
    () => {}
  )
  ZO_ScrollList_AddDataType<ListLine, UspfRowControl>(
    TemperCharactersSkillPointFinder_GUI_Body_PDGBE_ListHolder,
    LIST_DATA_TYPE,
    "TemperCharactersSkillPointFinder_PDGBETemplate",
    18,
    (control, data) => {
      setupGdqItem(control, data, STATE.settings.PDB.font)
    }
  )
  ZO_ScrollList_AddDataType<ListLine>(
    TemperCharactersSkillPointFinder_GUI_Body_PDGBE_ListHolder,
    LIST_SEPARATOR_TYPE,
    "TemperCharactersSkillPointFinder_ListSeparator",
    2,
    () => {}
  )
  ZO_ScrollList_AddDataType<ListLine, UspfRowControl>(
    TemperCharactersSkillPointFinder_GUI_Body_GSP_ListHolder,
    LIST_DATA_TYPE,
    "TemperCharactersSkillPointFinder_GeneralTemplate",
    18,
    (control, data) => {
      setupGeneralItem(control, data)
    }
  )
  ZO_ScrollList_AddDataType<ListLine>(
    TemperCharactersSkillPointFinder_GUI_Body_GSP_ListHolder,
    LIST_SEPARATOR_TYPE,
    "TemperCharactersSkillPointFinder_ListSeparator",
    2,
    () => {}
  )
}

function commandStatusLine(this: void): string {
  const actionWord = STATE.active
    ? GetString(SI_TEMPER_SKILLPOINTFINDER_MSG_DEACTVATE)
    : GetString(SI_TEMPER_SKILLPOINTFINDER_MSG_ACTIVATE)
  return string.format(GetString(SI_TEMPER_SKILLPOINTFINDER_MSG_CMD_OPTION), actionWord)
}

export function helpSlash(this: void): undefined {
  d(GetString(SI_TEMPER_SKILLPOINTFINDER_MSG_CMD_TITLE))
  d(commandStatusLine())
}

export function badSlash(this: void): undefined {
  d(GetString(SI_TEMPER_SKILLPOINTFINDER_MSG_BAD_SLASH))
  d(GetString(SI_TEMPER_SKILLPOINTFINDER_MSG_CMD_TITLE))
  d(commandStatusLine())
}
