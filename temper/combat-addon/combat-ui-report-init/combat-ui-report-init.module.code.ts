import { REPORT_SCENE_NAME } from "../combat-constants/combat-constants.module.code.ts"
import "../combat-ui-report-rows/combat-ui-report-rows.module.code.ts"
import { getDb } from "../combat-saved-variables/combat-saved-variables.module.code.ts"
import { updateAbilityPanel } from "../combat-ui-ability-panel/combat-ui-ability-panel.module.code.ts"
import { updateBuffPanel } from "../combat-ui-buff-panel-update/combat-ui-buff-panel-update.module.code.ts"
import {
  updateFightList,
  updateFightReport,
} from "../combat-ui-fight-list/combat-ui-fight-list.module.code.ts"
import {
  type LayoutAnchor,
  type LayoutControl,
  namedChild,
  storeOrigLayout,
} from "../combat-ui-helpers/combat-ui-helpers.module.code.ts"
import {
  updateInfoPanel,
  updateInfoRowPanel,
} from "../combat-ui-info-left/combat-ui-info-left.module.code.ts"
import {
  type CLPageButtonRowControl,
  updateCLPageButtons,
  updateCombatLog,
} from "../combat-ui-log-update/combat-ui-log-update.module.code.ts"
import { initCLButtonRow } from "../combat-ui-log-window/combat-ui-log-window.module.code.ts"
import {
  type ActivePanelControl,
  updateMainPanel,
  updateRightPanel,
} from "../combat-ui-main-panel/combat-ui-main-panel.module.code.ts"
import {
  initSelectorButtons,
  selectRightPanel,
  updateAttackStatsSelector,
} from "../combat-ui-nav-select/combat-ui-nav-select.module.code.ts"
import { updateGraphPanel } from "../combat-ui-plot/combat-ui-plot.module.code.ts"
import {
  initPlotToolbar,
  initPlotWindow,
} from "../combat-ui-plot-init/combat-ui-plot-init.module.code.ts"
import type { PlotWindowControl } from "../combat-ui-plot-math/combat-ui-plot-math.module.code.ts"
import { updateResourcePanel } from "../combat-ui-resource-panel/combat-ui-resource-panel.module.code.ts"
import type { UpdatableControl } from "../combat-ui-state/combat-ui-state.module.code.ts"
import {
  updateFightStatsPanel,
  updateFightStatsPanelLeft,
} from "../combat-ui-stats-panels/combat-ui-stats-panels.module.code.ts"
import { updateFightStatsPanelRight } from "../combat-ui-stats-right/combat-ui-stats-right.module.code.ts"
import { updateTitlePanel } from "../combat-ui-title-panel/combat-ui-title-panel.module.code.ts"
import { updateUnitPanel } from "../combat-ui-unit-panel/combat-ui-unit-panel.module.code.ts"

function maxStatName(this: void): string {
  const [, magicka] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_MAGICKA)
  const [, stamina] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_STAMINA)
  const [, health] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)

  let maxPower = "Magicka"

  if (stamina > magicka) {
    maxPower = "Stamina"
  }
  if (health > magicka && health > stamina) {
    maxPower = "Health"
  }

  return maxPower
}

function resize(this: void, control: LayoutControl, scale: number | undefined): undefined {
  const sizes = control.sizes
  if (sizes == null && control.anchors == null) {
    return undefined
  }
  if (sizes == null) {
    return undefined
  }

  const [width, height] = sizes

  const [maxwidth, maxheight] = GuiRoot.GetDimensions()

  const clamped = zo_min(zo_max(scale ?? 1, 0.5), 3, maxwidth / width, maxheight / height)

  getDb().FightReport.scale = clamped

  if (control.GetResizeToFitDescendents() === false) {
    control.SetWidth(width * clamped)
    control.SetHeight(height * clamped)
  }

  const anchors: (LayoutAnchor | undefined)[] = []
  const oldanchors = control.anchors

  if (oldanchors != null) {
    ZO_DeepTableCopy(oldanchors, anchors)
  }

  const anchor1 = anchors[0]
  const anchor2 = anchors[1]

  if (anchor1 != null || anchor2 != null) {
    control.ClearAnchors()
  }

  if (anchor1 != null) {
    anchor1[3] = anchor1[3] * clamped
    anchor1[4] = anchor1[4] * clamped

    control.SetAnchor(...anchor1)
  }

  if (anchor2 != null) {
    anchor2[3] = anchor2[3] * clamped
    anchor2[4] = anchor2[4] * clamped

    control.SetAnchor(...anchor2)
  }

  const fontcontrol = control.GetNamedChild<LayoutControl>("Font")
  const fontspec = fontcontrol?.font

  if (fontspec != null) {
    const [face, rawsize, style] = fontspec
    let size: string | number | undefined = rawsize

    if (size != null) {
      size = ((tonumber(size) ?? 0) * (clamped + 0.2)) / 1.2
    }

    control.SetFont?.(string.format("%s|%s|%s", face, size, style))
  }

  for (let i = 1; i <= control.GetNumChildren(); i++) {
    const child = control.GetChild<LayoutControl>(i)
    if (child != null) {
      resize(child, clamped)
    }
  }
  return undefined
}

let scene: Scene | undefined

export function initFightReport(
  this: void,
  toggleFightReport: (this: void) => undefined
): undefined {
  const db = getDb()
  const fightReport = TemperCombat_Report
  storeOrigLayout(fightReport)

  const pos = db.TemperCombat_Report

  fightReport.ClearAnchors()
  fightReport.SetAnchor(CENTER, undefined, TOPLEFT, pos.x, pos.y)

  if (scene === undefined) {
    scene = ZO_Scene.New(REPORT_SCENE_NAME, SCENE_MANAGER)
  }
  const fragment = ZO_HUDFadeSceneFragment.New(fightReport)

  scene.AddFragment(fragment)

  fightReport.Resize = (scale: number) => {
    resize(fightReport, scale)

    if (!fightReport.IsHidden()) {
      fightReport.Update?.(fightReport)
    }
    return undefined
  }

  fightReport.Update = updateFightReport
  fightReport.Toggle = toggleFightReport

  const titlePanel = namedChild<UpdatableControl>(fightReport, "_Title")
  titlePanel.Update = updateTitlePanel

  const mainPanel = namedChild<ActivePanelControl>(fightReport, "_MainPanel")
  mainPanel.Update = updateMainPanel

  const fightStatsPanel = namedChild<UpdatableControl>(mainPanel, "FightStats")
  fightStatsPanel.Update = updateFightStatsPanel
  mainPanel.active = fightStatsPanel

  const fightStatsPanelLeft = namedChild<UpdatableControl>(fightStatsPanel, "Left")
  fightStatsPanelLeft.Update = updateFightStatsPanelLeft

  const fightStatsPanelRight = namedChild<UpdatableControl>(fightStatsPanel, "Right")
  fightStatsPanelRight.Update = updateFightStatsPanelRight

  const fightStatsButton = namedChild(namedChild(fightStatsPanelRight, "SelectRow"), maxStatName())
  updateAttackStatsSelector(fightStatsButton)

  const combatLogPanel = namedChild<UpdatableControl>(mainPanel, "CombatLog")
  combatLogPanel.Update = updateCombatLog

  const combatLogPageButtonRow = namedChild<CLPageButtonRowControl>(
    combatLogPanel,
    "HeaderPageButtonRow"
  )
  combatLogPageButtonRow.Update = updateCLPageButtons

  const combatLogFilterButtonRow = namedChild(combatLogPanel, "HeaderFilterButtonRow")
  initCLButtonRow(combatLogFilterButtonRow)

  const graphPanel = namedChild<UpdatableControl>(mainPanel, "Graph")
  graphPanel.Update = updateGraphPanel

  const plotToolBar = namedChild(graphPanel, "Toolbar")
  initPlotToolbar(plotToolBar)

  const plotWindow = namedChild<PlotWindowControl>(graphPanel, "PlotWindow")
  initPlotWindow(plotWindow)

  const infoPanel = namedChild<UpdatableControl>(fightReport, "_InfoPanel")
  infoPanel.Update = updateInfoPanel

  const rightPanel = namedChild<ActivePanelControl>(fightReport, "_RightPanel")
  rightPanel.Update = updateRightPanel

  const buffPanel = namedChild<UpdatableControl>(rightPanel, "BuffList")
  buffPanel.Update = updateBuffPanel

  const buffbutton = namedChild(namedChild(rightPanel, "Selector"), "BuffsIn")
  selectRightPanel(buffbutton)

  const resourcePanel = namedChild<UpdatableControl>(rightPanel, "ResourceList")
  resourcePanel.Update = updateResourcePanel

  const unitPanel = namedChild<UpdatableControl>(fightReport, "_UnitPanel")
  unitPanel.Update = updateUnitPanel

  const abilityPanel = namedChild<UpdatableControl>(fightReport, "_AbilityPanel")
  abilityPanel.Update = updateAbilityPanel

  const infoRowPanel = namedChild<UpdatableControl>(fightReport, "_InfoRow")
  infoRowPanel.Update = updateInfoRowPanel

  const fightListPanel = namedChild<UpdatableControl>(fightReport, "_FightList")
  fightListPanel.Update = updateFightList

  const selectorButtons = namedChild<UpdatableControl>(fightReport, "_SelectorRow")
  initSelectorButtons(selectorButtons)

  fightReport.Resize(db.FightReport.scale)

  const left = selectorButtons.GetLeft()

  if (left < 0) {
    fightReport.ClearAnchors()
    fightReport.SetAnchor(CENTER, undefined, TOPLEFT, pos.x - left, pos.y)
  }
  return undefined
}
