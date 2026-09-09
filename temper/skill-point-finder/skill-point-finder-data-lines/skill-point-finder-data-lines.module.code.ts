import { rgbToHex } from "../skill-point-finder-colors/skill-point-finder-colors.module.code.ts"
import {
  LIST_DATA_TYPE,
  LIST_SEPARATOR_TYPE,
} from "../skill-point-finder-constants/skill-point-finder-constants.module.code.ts"
import { setupData } from "../skill-point-finder-points/skill-point-finder-points.module.code.ts"
import {
  requireGui,
  requireOptions,
  STATE,
} from "../skill-point-finder-state/skill-point-finder-state.module.code.ts"
import {
  getTooltipCharacterTotal,
  getTooltipGDTotal,
  getTooltipPDTotal,
  getTooltipZoneTotal,
} from "../skill-point-finder-tooltips/skill-point-finder-tooltips.module.code.ts"

export interface ListLine {
  header?: boolean
  source?: string
  progress?: string
  tooltipText?: string
  zone?: string
  quests?: string
  skyshards?: string
  dungeon?: string
}

export interface UspfRowControl extends Control {
  data?: ListLine
}

interface ProgressColors {
  need: string
  progress?: string
  done: string
}

function formatProgress(
  this: void,
  current: number,
  total: number,
  colors: ProgressColors
): string {
  if (total === 0) {
    return "-"
  }
  let color: string
  if (current === 0) {
    color = colors.need
  } else if (current === total) {
    color = colors.done
  } else {
    color = colors.progress ?? colors.need
  }
  return `${color}${current}/${total}|r`
}

function updateListData(this: void, control: Control, data: ListLine[]): undefined {
  const dataList = ZO_ScrollList_GetDataList<ListLine>(control)
  ZO_ScrollList_Clear(control)
  if (dataList === undefined) {
    return
  }
  dataList.push(ZO_ScrollList_CreateDataEntry<ListLine>(LIST_DATA_TYPE, data[0] ?? {}))
  dataList.push(ZO_ScrollList_CreateDataEntry<ListLine>(LIST_SEPARATOR_TYPE, {}))
  for (let i = 1; i < data.length; i++) {
    dataList.push(ZO_ScrollList_CreateDataEntry<ListLine>(LIST_DATA_TYPE, data[i] ?? {}))
  }
  dataList.push(ZO_ScrollList_CreateDataEntry<ListLine>(LIST_SEPARATOR_TYPE, {}))
  ZO_ScrollList_Commit(control)
  control.SetHeight(18 * data.length + 4)
}

export function updateDataLines(this: void): undefined {
  setupData(STATE.selectedChar)

  const gspColor: ProgressColors = {
    need: rgbToHex(STATE.settings.GSP.needColor),
    progress: rgbToHex(STATE.settings.GSP.progColor),
    done: rgbToHex(STATE.settings.GSP.doneColor),
  }
  const sqsColorZQ: ProgressColors = {
    need: rgbToHex(STATE.settings.SQS.needColorZQ),
    progress: rgbToHex(STATE.settings.SQS.progColorZQ),
    done: rgbToHex(STATE.settings.SQS.doneColorZQ),
  }
  const sqsColorSS: ProgressColors = {
    need: rgbToHex(STATE.settings.SQS.needColorSS),
    progress: rgbToHex(STATE.settings.SQS.progColorSS),
    done: rgbToHex(STATE.settings.SQS.doneColorSS),
  }
  const gdqColor: ProgressColors = {
    need: rgbToHex(STATE.settings.GDQ.needColor),
    done: rgbToHex(STATE.settings.GDQ.doneColor),
  }
  const pdbColor: ProgressColors = {
    need: rgbToHex(STATE.settings.PDB.needColor),
    done: rgbToHex(STATE.settings.PDB.doneColor),
  }

  const gui = requireGui()

  const dataLinesGSP: ListLine[] = [
    { header: true, source: GetString(USPF_GUI_SOURCE), progress: GetString(USPF_GUI_PROGRESS) },
  ]
  for (const row of gui.GSP) {
    dataLinesGSP.push({
      source: row[1],
      progress: formatProgress(row[2], row[3], gspColor),
      tooltipText: row[4],
    })
  }

  const dataLinesSQS: ListLine[] = [
    {
      header: true,
      zone: GetString(USPF_GUI_ZONE),
      quests: GetString(USPF_GUI_STORYLINE),
      skyshards: GetString(USPF_GUI_SKYSHARDS),
    },
  ]
  const sqsSorted = TemperTableFunctions.SortTable(gui.SQS, STATE.settings.SQS.sortCol)
  for (const row of sqsSorted) {
    dataLinesSQS.push({
      zone: row[1],
      quests: formatProgress(row[2], row[3], sqsColorZQ),
      skyshards: formatProgress(row[4], row[5], sqsColorSS),
      tooltipText: row[6],
    })
  }

  const gdqHeader: ListLine = {
    header: true,
    zone: GetString(USPF_GUI_ZONE),
    dungeon: GetString(USPF_GUI_GROUP_DUNGEON),
    progress: GetString(USPF_GUI_PROGRESS),
  }
  const gdqSorted = TemperTableFunctions.SortTable(gui.GDQ, STATE.settings.GDQ.sortCol)
  const splitIndex = gdqSorted.length / 2

  const dataLinesGDQ: ListLine[] = [gdqHeader]
  for (let i = 1; i <= splitIndex; i++) {
    const row = gdqSorted[i - 1]
    if (row !== undefined) {
      dataLinesGDQ.push({
        zone: row[1],
        dungeon: row[2],
        progress: formatProgress(row[3], 1, gdqColor),
        tooltipText: row[4],
      })
    }
  }

  const dataLinesGDQ2: ListLine[] = [gdqHeader]
  for (let i = splitIndex + 1; i <= gdqSorted.length; i++) {
    const row = gdqSorted[i - 1]
    if (row !== undefined) {
      dataLinesGDQ2.push({
        zone: row[1],
        dungeon: row[2],
        progress: formatProgress(row[3], 1, gdqColor),
        tooltipText: row[4],
      })
    }
  }

  const pdSorted = TemperTableFunctions.SortTable(gui.PDGBE, STATE.settings.PDB.sortCol)
  const dataLinesPDGBE: ListLine[] = [
    {
      header: true,
      zone: GetString(USPF_GUI_ZONE),
      dungeon: GetString(USPF_GUI_PUBLIC_DUNGEON),
      progress: GetString(USPF_GUI_PROGRESS),
    },
  ]
  for (const row of pdSorted) {
    dataLinesPDGBE.push({
      zone: row[1],
      dungeon: row[2],
      progress: formatProgress(row[3], 1, pdbColor),
      tooltipText: row[4],
    })
  }

  USPF_GUI_Body_SQS_Z_T.data = { tooltipText: getTooltipZoneTotal() }

  updateListData(USPF_GUI_Body_GSP_ListHolder, dataLinesGSP)
  updateListData(USPF_GUI_Body_SQS_ListHolder, dataLinesSQS)
  updateListData(USPF_GUI_Body_GDQ_ListHolder, dataLinesGDQ)
  updateListData(USPF_GUI_Body_GDQ2_ListHolder, dataLinesGDQ2)
  updateListData(USPF_GUI_Body_PDGBE_ListHolder, dataLinesPDGBE)

  USPF_GUI_Body_GSP_T.SetText(gui.GSP_T)
  USPF_GUI_Body_SQS_SL_T.SetText(gui.SQS_SL_T)
  USPF_GUI_Body_SQS_SL_T.data = { tooltipText: getTooltipZoneTotal() }
  USPF_GUI_Body_SQS_SS_T.SetText(gui.SQS_SS_T)
  USPF_GUI_Body_SQS_SS_T.data = { tooltipText: getTooltipZoneTotal() }
  USPF_GUI_Body_GDQ_T.SetText(gui.GDQ_T)
  USPF_GUI_Body_GDQ_T.data = { tooltipText: getTooltipGDTotal() }
  USPF_GUI_Body_PDGBE_T.SetText(gui.PDGBE_T)
  USPF_GUI_Body_PDGBE_T.data = { tooltipText: getTooltipPDTotal() }
  USPF_GUI_Footer_CharacterTotal.SetText(gui.CharacterTot)
  USPF_GUI_Footer_CharacterTotal.data = { tooltipText: getTooltipCharacterTotal() }
}

function rowFont(this: void, fontName: string): string {
  return `${requireOptions().Font.Fonts[fontName] ?? ""}|14`
}

export function setupSqsItem(this: void, control: UspfRowControl, data: ListLine): undefined {
  control.data = data
  const zone = control.GetNamedChild<LabelControl>("_Zone")
  const ss = control.GetNamedChild<LabelControl>("_Skyshards")
  const quests = control.GetNamedChild<LabelControl>("_Quests")
  const font = rowFont(data.header === true ? STATE.settings.title.font : STATE.settings.SQS.font)
  if (zone !== undefined) {
    zone.SetFont(font)
    zone.SetText(data.zone ?? "")
  }
  if (quests !== undefined) {
    quests.SetFont(font)
    quests.SetText(data.quests ?? "")
  }
  if (ss !== undefined) {
    ss.SetFont(font)
    ss.SetText(data.skyshards ?? "")
  }
}

export function setupGdqItem(
  this: void,
  control: UspfRowControl,
  data: ListLine,
  entryFontName: string
): undefined {
  control.data = data
  const zone = control.GetNamedChild<LabelControl>("_Zone")
  const progress = control.GetNamedChild<LabelControl>("_Progress")
  const dungeon = control.GetNamedChild<LabelControl>("_Dungeon")
  const font = rowFont(data.header === true ? STATE.settings.title.font : entryFontName)
  if (zone !== undefined) {
    zone.SetFont(font)
    zone.SetText(data.zone ?? "")
  }
  if (dungeon !== undefined) {
    dungeon.SetFont(font)
    dungeon.SetText(data.dungeon ?? "")
  }
  if (progress !== undefined) {
    progress.SetFont(font)
    progress.SetText(data.progress ?? "")
  }
}

export function setupGeneralItem(this: void, control: UspfRowControl, data: ListLine): undefined {
  control.data = data
  const source = control.GetNamedChild<LabelControl>("_Source")
  const progress = control.GetNamedChild<LabelControl>("_Progress")
  const font = rowFont(data.header === true ? STATE.settings.title.font : STATE.settings.GSP.font)
  if (source !== undefined) {
    source.SetFont(font)
    source.SetText(data.source ?? "")
  }
  if (progress !== undefined) {
    progress.SetFont(font)
    progress.SetText(data.progress ?? "")
  }
}
