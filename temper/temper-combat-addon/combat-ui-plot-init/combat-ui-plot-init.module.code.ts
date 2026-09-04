import type { DamageCategory } from "@akasha/temper-combat-addon/combat-core-types"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import type { LayoutControl, TooltipCarrier } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { namedChild } from "@akasha/temper-combat-addon/combat-ui-helpers"
import type { SelectorControl } from "@akasha/temper-combat-addon/combat-ui-plot"
import { updateGraphPanel } from "@akasha/temper-combat-addon/combat-ui-plot"
import {
  bossHPAbsolute,
  performancePlot,
  resourceAbsolute,
  smooth,
  statAbsolute,
  total,
} from "@akasha/temper-combat-addon/combat-ui-plot-data"
import {
  PLOT_TYPE_BAR,
  PLOT_TYPE_TEMPLATES,
  PLOT_TYPE_XY,
} from "@akasha/temper-combat-addon/combat-ui-plot-draw"
import type {
  PlotControl,
  PlotData,
  PlotWindowControl,
} from "@akasha/temper-combat-addon/combat-ui-plot-math"
import { MAX_BAR_PLOTS, MAX_XY_PLOTS } from "@akasha/temper-combat-addon/combat-ui-plot-math"
import {
  getCustomMenuFunction,
  getPlotMenuData,
  PLOT_FUNCTIONS,
} from "@akasha/temper-combat-addon/combat-ui-plot-menus"
import { editLabelStart } from "@akasha/temper-combat-addon/combat-ui-plot-mouse"

const PLOT_DEFAULT_FUNCTION: Record<
  number,
  (this: void, category?: DamageCategory) => PlotData | undefined
> = {
  [1]: smooth,
  [2]: total,
}

export function initBarPlot(plotWindow: PlotWindowControl, id: number): PlotControl {
  const plots = plotWindow.plots

  let newPlot = plots[id - 1]

  if (newPlot == null) {
    newPlot = CreateControlFromVirtual<PlotControl>(
      "TemperCombat_Report_MainPanelGraphPlot",
      plotWindow,
      PLOT_TYPE_TEMPLATES[PLOT_TYPE_BAR],
      id
    )

    newPlot.plotType = PLOT_TYPE_BAR

    newPlot.barControls = []

    newPlot.id = id
    newPlot.barId = id - MAX_XY_PLOTS

    plots[id - 1] = newPlot
  }

  return newPlot
}

export function initXYPlot(plotWindow: PlotWindowControl, id: number): PlotControl {
  const plots = plotWindow.plots

  let newPlot = plots[id - 1]

  if (newPlot == null) {
    newPlot = CreateControlFromVirtual<PlotControl>(
      "TemperCombat_Report_MainPanelGraphPlot",
      plotWindow,
      PLOT_TYPE_TEMPLATES[PLOT_TYPE_XY],
      id
    )

    newPlot.plotType = PLOT_TYPE_XY

    newPlot.lineControls = []

    newPlot.autoRange = true

    newPlot.id = id

    const category = getDb().FightReport.category

    const categoryStrings = getPlotMenuData().categoryStrings
    const mainCategoryFunctions = getPlotMenuData().mainCategoryFunctions

    let catId = 1
    let catEntry = assert(categoryStrings[catId - 1])

    while (catEntry.category !== category) {
      catId = catId + 1
      catEntry = assert(categoryStrings[catId - 1])
    }

    if (id <= 2) {
      const selectorLabel = namedChild<LabelControl>(
        namedChild(namedChild(assert(plotWindow.GetParent()), "Toolbar"), "DataSelector" + id),
        "Label"
      )

      const labelString = zo_strformat(
        "<<1>> - <<2>>",
        GetString(catEntry.label),
        GetString(assert(mainCategoryFunctions[id - 1]).label)
      )

      selectorLabel.SetText(labelString)

      newPlot.func = () => assert(PLOT_DEFAULT_FUNCTION[id])(category)
      newPlot.label = labelString
    }

    plots[id - 1] = newPlot
  }

  return newPlot
}

export function initPlotWindow(plotWindow: PlotWindowControl): undefined {
  plotWindow.plots = []

  for (let i = 1; i <= 5; i++) {
    const labelR = namedChild<LabelControl>(namedChild(plotWindow, "YTick" + i), "LabelR")

    labelR.SetText(string.format("%d%%", (i - 1) * 25))
  }

  const editableControls = ["XTick1", "XTick5", "YTick1", "YTick5"]

  for (const name of editableControls) {
    const control = namedChild(plotWindow, name)
    const label = namedChild<LabelControl>(control, "Label")

    const editControlName = control.GetName() + "Edit"

    const editControl = CreateControlFromVirtual<EditControl & Control>(
      editControlName,
      control,
      "TemperCombat_GraphTickLabel_Edit"
    )
    editControl.SetAnchorFill(label)

    const fontDef = assert(namedChild<LayoutControl>(editControl, "Font").font)
    const [font, rawSize, style] = fontDef

    let size: string | number | undefined = rawSize

    if (size != null) {
      size = (assert(tonumber(size)) * (getDb().FightReport.scale + 0.2)) / 1.2
    }

    editControl.SetFont(string.format("%s|%s|%s", font, size, style))

    label.SetHandler("OnMouseDoubleClick", () => {
      editLabelStart(label)
    })
  }

  const menuData = getPlotMenuData()

  let funcId = 1

  for (const data of menuData.categoryStrings) {
    for (const data2 of menuData.mainCategoryFunctions) {
      const labelString = zo_strformat(
        "<<1>> - <<2>>",
        GetString(data.label),
        GetString(data2.label)
      )

      PLOT_FUNCTIONS[funcId - 1] = getCustomMenuFunction(data2.func, data.category, labelString)

      funcId = funcId + 1
    }
  }

  PLOT_FUNCTIONS[funcId - 1] = getCustomMenuFunction(
    bossHPAbsolute,
    undefined,
    GetString(SI_TEMPER_COMBAT_BOSS_HP)
  )

  funcId = funcId + 1

  for (const data of menuData.resourceStrings) {
    PLOT_FUNCTIONS[funcId - 1] = getCustomMenuFunction(
      resourceAbsolute,
      data.powerType,
      GetString(data.label) + " %"
    )

    funcId = funcId + 1
  }

  for (const data of menuData.statStrings) {
    PLOT_FUNCTIONS[funcId - 1] = getCustomMenuFunction(
      statAbsolute,
      data.statId,
      GetString(data.label) + " %"
    )

    funcId = funcId + 1
  }

  for (const data of menuData.performanceStrings) {
    PLOT_FUNCTIONS[funcId - 1] = getCustomMenuFunction(
      performancePlot,
      data.statId,
      GetString(data.label)
    )

    funcId = funcId + 1
  }

  for (let id = 1; id <= MAX_XY_PLOTS; id++) {
    initXYPlot(plotWindow, id)
  }

  for (let id = MAX_XY_PLOTS + 1; id <= MAX_XY_PLOTS + MAX_BAR_PLOTS; id++) {
    initBarPlot(plotWindow, id)
  }
  return undefined
}

function initColorBox(toolbar: Control, selector: SelectorControl, colorKey: number): undefined {
  const plotColors = getDb().FightReport.PlotColors

  const colorbox = namedChild<BackdropControl>(selector, "ColorBox")

  const color = assert(plotColors[colorKey])

  colorbox.SetCenterColor(color[0], color[1], color[2], color[3])
  selector.color = color

  const updateColor = (r: number, g: number, b: number, a: number): undefined => {
    colorbox.SetCenterColor(r, g, b, a)

    selector.color = [r, g, b, a]

    plotColors[colorKey] = [r, g, b, a]

    updateGraphPanel(assert(toolbar.GetParent()))
    return undefined
  }

  colorbox.SetHandler("OnMouseUp", (_self, _button, upInside) => {
    if (upInside === true) {
      const [r, g, b, a] = assert(selector.color)
      COLOR_PICKER.Show(updateColor, r, g, b, a)
    }
  })
  return undefined
}

export function initPlotToolbar(toolbar: Control): undefined {
  const db = getDb()

  const cursorToggle = namedChild(toolbar, "ToggleCursor")

  cursorToggle.SetAlpha(db.FightReport.Cursor ? 1 : 0.3)

  for (let i = 1; i <= 5; i++) {
    const selector = namedChild<SelectorControl>(toolbar, "DataSelector" + i)

    selector.id = i

    initColorBox(toolbar, selector, i)
  }

  const labeltexts = [GetString(SI_TEMPER_COMBAT_BUFFS), GetString(SI_TEMPER_COMBAT_DEBUFFS)]
  let showGroupBuffs = db.FightReport.ShowGroupBuffsInPlots

  for (let i = 1; i <= 2; i++) {
    const selector = namedChild<SelectorControl>(toolbar, "BuffSelector" + i)

    selector.id = i

    const label = namedChild<LabelControl>(selector, "Label")

    label.SetText(assert(labeltexts[i - 1]))

    initColorBox(toolbar, selector, i + 5)

    const groupSelector = namedChild<TooltipCarrier>(selector, "GroupSelector")

    groupSelector.SetAlpha(showGroupBuffs ? 1 : 0.2)

    if (i === 1) {
      groupSelector.SetHidden(db.FightReport.rightpanel !== "buffsout")

      groupSelector.tooltip = [SI_TEMPER_COMBAT_GRAPH_BUFF_GROUP_SELECTOR]

      groupSelector.SetHandler("OnMouseUp", (_self, _button, upInside) => {
        if (upInside === true) {
          showGroupBuffs = !showGroupBuffs
          db.FightReport.ShowGroupBuffsInPlots = showGroupBuffs

          groupSelector.SetAlpha(showGroupBuffs ? 1 : 0.2)

          updateGraphPanel(assert(toolbar.GetParent()))
        }
      })
    } else {
      groupSelector.SetHidden(true)
    }
  }
  return undefined
}
