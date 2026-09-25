import { GAME_DATA } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-game-data/skill-point-finder-game-data.module.code.ts"
import { getSV } from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-helpers/skill-point-finder-helpers.module.code.ts"
import {
  requirePtsTots,
  STATE,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-state/skill-point-finder-state.module.code.ts"
import {
  getGDQuestTooltipText,
  getMainQuestTooltip,
  getPDTooltipText,
  getTooltipEndlessArchive,
  getTooltipMaelstrom,
  getTooltipPvPRank,
  getZoneName,
  getZoneTooltipText,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-tooltips/skill-point-finder-tooltips.module.code.ts"
import type {
  DungeonRow,
  GeneralRow,
  PointsData,
  QuestSkyshardRow,
} from "akasha/temper/player/character/skill/skill-point-finder/modules/skill-point-finder-types/skill-point-finder-types.module.code.ts"
import { formatCount } from "akasha/temper/window/modules/window-numbers/window-numbers.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/player/character/skill/skill-point-finder/skill-point-finder-string-ids/skill-point-finder-string-ids.type-declaration.d.ts"

export function updateGuiTable(this: void, sVarPtsData: PointsData): undefined {
  const tots = requirePtsTots()
  const total = GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_TOTAL)

  const unassigned =
    sVarPtsData.Unassigned !== undefined ? formatCount(sVarPtsData.Unassigned) : "?"
  const outOf = (got: number, of: number): string => `${formatCount(got)}/${formatCount(of)}`

  const gsp: GeneralRow[] = [
    [
      1,
      GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_CHAR_LEVEL),
      getSV(sVarPtsData.Level),
      tots.Level,
      GetString(SI_TEMPER_SKILLPOINTFINDER_QUEST_NA),
    ],
    [
      2,
      GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_MAIN_QUEST),
      getSV(sVarPtsData.MainQ),
      tots.MainQ,
      getMainQuestTooltip(),
    ],
    [
      3,
      GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_FOLIUM),
      getSV(sVarPtsData.FolDis),
      tots.FolDis,
      GetString(SI_TEMPER_SKILLPOINTFINDER_QUEST_NA),
    ],
    [4, GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_TUTORIAL), getSV(sVarPtsData.tutorial), 1, ""],
    [
      5,
      GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_AVA_RANK),
      getSV(sVarPtsData.PvPRank),
      tots.PvPRank,
      getTooltipPvPRank(),
    ],
    [
      6,
      GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_MAEL_ARENA),
      getSV(sVarPtsData.MaelAr),
      tots.MaelAr,
      getTooltipMaelstrom(),
    ],
    [
      7,
      zo_strformat("<<t:1>>", GetZoneNameById(GAME_DATA.ZId.ZN["EA"] ?? 0)),
      getSV(sVarPtsData.EndlArch),
      tots.EndlArch,
      getTooltipEndlessArchive(),
    ],
  ]

  const sqs: QuestSkyshardRow[] = []
  let zoneIndex = 0
  for (const z of GAME_DATA.zones) {
    zoneIndex = zoneIndex + 1
    sqs.push([
      zoneIndex,
      getZoneName(z.key),
      getSV(sVarPtsData.ZQ[z.key]),
      z.quests.length,
      getSV(sVarPtsData.SS[z.key]),
      z.skyshards,
      getZoneTooltipText(z),
    ])
  }

  const gdq: DungeonRow[] = []
  let gdIndex = 0
  for (const d of GAME_DATA.GD) {
    gdIndex = gdIndex + 1
    gdq.push([
      gdIndex,
      zo_strformat("<<C:1>>", GetZoneNameById(GAME_DATA.ZId.ZN[d.zone] ?? 0)),
      zo_strformat("<<C:1>>", GetZoneNameById(d.id)),
      getSV(sVarPtsData.GD[d.key]),
      getGDQuestTooltipText(d),
    ])
  }

  const pdgbe: DungeonRow[] = []
  let pdIndex = 0
  for (const d of GAME_DATA.PD) {
    pdIndex = pdIndex + 1
    pdgbe.push([
      pdIndex,
      zo_strformat("<<C:1>>", GetZoneNameById(GAME_DATA.ZId.ZN[d.zone] ?? 0)),
      zo_strformat("<<C:1>>", GetZoneNameById(d.id)),
      getSV(sVarPtsData.PD[d.key]),
      getPDTooltipText(d),
    ])
  }

  STATE.GUI = {
    GSP: gsp,
    GSP_T: `${total}: ${outOf(sVarPtsData.GenTot, tots.GenTot)}`,
    SQS: sqs,
    SQS_SL_T: outOf(sVarPtsData.ZQTot, tots.ZQTot),
    SQS_SS_T: outOf(sVarPtsData.SSTot, tots.SSTot),
    GDQ: gdq,
    GDQ_T: `${total}: ${outOf(sVarPtsData.GDTot, tots.GDTot)}`,
    PDGBE: pdgbe,
    PDGBE_T: `${total}: ${outOf(sVarPtsData.PDTot, tots.PDTot)}`,
    CharacterTot: `${GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_CHAR_TOTAL)}: ${outOf(sVarPtsData.Tot, tots.Tot)} (${unassigned} ${GetString(SI_TEMPER_SKILLPOINTFINDER_GUI_UNASSIGNED)})`,
  }
}
