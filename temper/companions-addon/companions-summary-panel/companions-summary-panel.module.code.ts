import "@akasha/temper-eso-types/eso-api"
import "@akasha/temper-eso-types/eso-enums-01"
import "@akasha/temper-eso-types/eso-enums-12"
import "@akasha/temper-eso-types/eso-enums-13"
import "@akasha/temper-eso-types/eso-enums-17"
import "@akasha/temper-eso-types/eso-enums-19"
import "@akasha/temper-eso-types/eso-functions-02"
import "@akasha/temper-eso-types/eso-functions-03"
import "@akasha/temper-eso-types/eso-functions-04"
import "@akasha/temper-eso-types/eso-functions-07"
import "@akasha/temper-eso-types/eso-functions-08"
import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/lua-language-extensions"
import {
  TEXT_PRIMARY,
  TEXT_TERTIARY,
} from "akasha/design/tokens/text-color/text-color.module.code.ts"
import { ALL_COMPANION_IDS } from "../companions-id-map/companions-id-map.module.code.ts"
import { getCleanCompanionName } from "../companions-selector/companions-selector.module.code.ts"
export const SUMMARY_ROW_HEIGHT = 28
export const SUMMARY_ROW_SPACING = 4
export const SUMMARY_COL_NAME = 0
export const SUMMARY_COL_NAME_WIDTH = 140
export const SUMMARY_COL_EQUIP = 140
export const SUMMARY_COL_EQUIP_WIDTH = 80
export const SUMMARY_COL_UPGRADE = 220
export const SUMMARY_COL_UPGRADE_WIDTH = 50
export const SUMMARY_COL_SKILLS = 270
export const SUMMARY_COL_SKILLS_WIDTH = 80
export const SUMMARY_COL_BUILD = 350
export const SUMMARY_COL_BUILD_WIDTH = 60
export const SUMMARY_COL_APPLY = 410
export const SUMMARY_COL_APPLY_WIDTH = 60

export interface SummaryRow {
  nameLabel: LabelControl
  equipLabel: LabelControl
  upgradeLabel: LabelControl
  skillsLabel: LabelControl
  buildLabel: LabelControl
  applyLabel: LabelControl
}

export interface SummaryPanelState {
  panel: Control
  rows: SummaryRow[]
  companionIds: number[]
}

export let summaryState: SummaryPanelState | undefined

export function createCompanionSummaryPanel(parent: Control): Control {
  const panel = WINDOW_MANAGER.CreateControl(undefined, parent, CT_CONTROL)
  panel.SetAnchorFill()
  panel.SetHidden(true)

  let offsetY = 0

  const headers = [
    { text: "Companion", left: SUMMARY_COL_NAME, width: SUMMARY_COL_NAME_WIDTH },
    { text: "Equipment", left: SUMMARY_COL_EQUIP, width: SUMMARY_COL_EQUIP_WIDTH },
    { text: "Upgr", left: SUMMARY_COL_UPGRADE, width: SUMMARY_COL_UPGRADE_WIDTH },
    { text: "Skills", left: SUMMARY_COL_SKILLS, width: SUMMARY_COL_SKILLS_WIDTH },
    { text: "Build", left: SUMMARY_COL_BUILD, width: SUMMARY_COL_BUILD_WIDTH },
    { text: "Apply", left: SUMMARY_COL_APPLY, width: SUMMARY_COL_APPLY_WIDTH },
  ]

  for (const h of headers) {
    const label = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    label.SetAnchor(TOPLEFT, panel, TOPLEFT, h.left, offsetY)
    label.SetDimensions(h.width, SUMMARY_ROW_HEIGHT)
    label.SetFont("ZoFontGameBold")
    label.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    label.SetText(h.text)
    label.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    label.SetVerticalAlignment(TEXT_ALIGN_TOP)
  }

  offsetY = offsetY + SUMMARY_ROW_HEIGHT + SUMMARY_ROW_SPACING

  const rows: SummaryRow[] = []
  const companionIds = ALL_COMPANION_IDS

  for (const companionId of companionIds) {
    const nameLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    nameLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_NAME, offsetY)
    nameLabel.SetDimensions(SUMMARY_COL_NAME_WIDTH, SUMMARY_ROW_HEIGHT)
    nameLabel.SetFont("ZoFontGame")
    nameLabel.SetColor(TEXT_PRIMARY[0], TEXT_PRIMARY[1], TEXT_PRIMARY[2], 1)
    nameLabel.SetText(getCleanCompanionName(companionId))
    nameLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    nameLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const equipLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    equipLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_EQUIP, offsetY)
    equipLabel.SetDimensions(SUMMARY_COL_EQUIP_WIDTH, SUMMARY_ROW_HEIGHT)
    equipLabel.SetFont("ZoFontGame")
    equipLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    equipLabel.SetText("-")
    equipLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    equipLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    equipLabel.SetMouseEnabled(true)

    const upgradeLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    upgradeLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_UPGRADE, offsetY)
    upgradeLabel.SetDimensions(SUMMARY_COL_UPGRADE_WIDTH, SUMMARY_ROW_HEIGHT)
    upgradeLabel.SetFont("ZoFontGame")
    upgradeLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    upgradeLabel.SetText("-")
    upgradeLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    upgradeLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    upgradeLabel.SetMouseEnabled(true)

    const skillsLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    skillsLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_SKILLS, offsetY)
    skillsLabel.SetDimensions(SUMMARY_COL_SKILLS_WIDTH, SUMMARY_ROW_HEIGHT)
    skillsLabel.SetFont("ZoFontGame")
    skillsLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    skillsLabel.SetText("-")
    skillsLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    skillsLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const buildLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    buildLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_BUILD, offsetY)
    buildLabel.SetDimensions(SUMMARY_COL_BUILD_WIDTH, SUMMARY_ROW_HEIGHT)
    buildLabel.SetFont("ZoFontGame")
    buildLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    buildLabel.SetText("-")
    buildLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    buildLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)

    const applyLabel = WINDOW_MANAGER.CreateControl(undefined, panel, CT_LABEL)
    applyLabel.SetAnchor(TOPLEFT, panel, TOPLEFT, SUMMARY_COL_APPLY, offsetY)
    applyLabel.SetDimensions(SUMMARY_COL_APPLY_WIDTH, SUMMARY_ROW_HEIGHT)
    applyLabel.SetFont("ZoFontGame")
    applyLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 1)
    applyLabel.SetText("")
    applyLabel.SetHorizontalAlignment(TEXT_ALIGN_LEFT)
    applyLabel.SetVerticalAlignment(TEXT_ALIGN_TOP)
    applyLabel.SetMouseEnabled(true)

    rows.push({ nameLabel, equipLabel, upgradeLabel, skillsLabel, buildLabel, applyLabel })
    offsetY = offsetY + SUMMARY_ROW_HEIGHT + SUMMARY_ROW_SPACING
  }

  summaryState = { panel, rows, companionIds }
  return panel
}
