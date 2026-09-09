export const PLOT_DIMENSION_X = 1
export const PLOT_DIMENSION_Y = 2

export const YAXIS_LEFT = 1
export const YAXIS_RIGHT = 2

export const MAX_XY_PLOTS = 5
export const MAX_BAR_PLOTS = 8

export type XYPoint = [x: number, y: number]

export type BuffBarEntry = [start: number, end: number, unitId?: number]

export interface PlotData {
  xyData: XYPoint[]
  yAxisSide: number
  absoluteYRange: number
}

export type PlotDataFn = (this: void) => PlotData | undefined

export type PlotRange = [min: number, max: number, ticks: number[]]

export type PlotRectRange = [minX: number, maxX: number, minY: number, maxY: number]

export interface PlotControl extends Control {
  plotType: number
  id: number
  barId?: number
  lineControls?: (LineControl & Control)[]
  barControls?: (BackdropControl & Control)[]
  func?: PlotDataFn
  label?: string
  autoRange?: boolean
  XYData?: XYPoint[]
  coordinates?: [number, number, boolean][]
  YAxisSide?: number
  AbsoluteYRange?: number
  range?: PlotRectRange
  bardata?: BuffBarEntry[]
  xoffset?: number
  effectType?: number
}

export interface PlotWindowControl extends Control {
  RangesX: PlotRange
  RangesY: PlotRange
  plots: PlotControl[]
}

export function mapValue(
  plotWindow: PlotWindowControl,
  dimension: number,
  value: number,
  norm: boolean
): LuaMultiReturn<[offset: number, isInRange: boolean]> {
  let minRange: number
  let maxRange: number

  if (norm) {
    minRange = 0
    maxRange = 1
  } else {
    const range = dimension === PLOT_DIMENSION_X ? plotWindow.RangesX : plotWindow.RangesY
    minRange = range[0]
    maxRange = range[1]
  }

  const controlSize =
    dimension === PLOT_DIMENSION_X ? plotWindow.GetWidth() : plotWindow.GetHeight()

  const isInRange = value < maxRange && value > minRange
  const offset = controlSize * ((value - minRange) / (maxRange - minRange))

  return $multi(offset, isInRange)
}

export function mapValueXY(
  plotWindow: PlotWindowControl,
  x: number,
  y: number,
  normX: boolean,
  normY: boolean
): LuaMultiReturn<[xOffset: number, yOffset: number, isInRange: boolean]> {
  const [xOffset, isInRangeX] = mapValue(plotWindow, PLOT_DIMENSION_X, x, normX)
  const [yOffset, isInRangeY] = mapValue(plotWindow, PLOT_DIMENSION_Y, y, normY)

  const isInRange = isInRangeX && isInRangeY

  return $multi(xOffset, yOffset, isInRange)
}

export function mapUIPos(
  plotWindow: PlotWindowControl,
  dimension: number,
  value: number
): LuaMultiReturn<[dataValue: number, isInRange: boolean]> {
  const range = dimension === PLOT_DIMENSION_X ? plotWindow.RangesX : plotWindow.RangesY
  const [minRange, maxRange] = [range[0], range[1]]

  const minCoord = dimension === PLOT_DIMENSION_X ? plotWindow.GetLeft() : plotWindow.GetTop()
  const maxCoord = dimension === PLOT_DIMENSION_X ? plotWindow.GetRight() : plotWindow.GetBottom()

  const isInRange = value < maxCoord && value > minCoord

  let relpos = (value - minCoord) / (maxCoord - minCoord)

  if (dimension === PLOT_DIMENSION_Y) {
    relpos = 1 - relpos
  }

  const dataValue = relpos * (maxRange - minRange) + minRange

  return $multi(dataValue, isInRange)
}

export function mapUIPosXY(
  plotWindow: PlotWindowControl,
  x: number,
  y: number
): LuaMultiReturn<[t: number, v: number, isInRange: boolean]> {
  const [t, isInRangeX] = mapUIPos(plotWindow, PLOT_DIMENSION_X, x)
  const [v, isInRangeY] = mapUIPos(plotWindow, PLOT_DIMENSION_Y, y)

  const isInRange = isInRangeX && isInRangeY

  return $multi(t, v, isInRange)
}

export function getScale(x1: number, x2: number): LuaMultiReturn<[low: number, high: number]> {
  const distance = zo_max(x2 - x1, 1)

  const power = 10 ** zo_floor(math.log10(distance / 2))

  const high = zo_ceil(x2 / power) * power
  const low = zo_floor(x1 / power) * power

  const size = (high - low) / power

  const cleansize = zo_floor(size)

  const delta = cleansize - size

  let cleanLow = low - zo_floor(delta / 2) * power
  let cleanHigh = high + zo_ceil(delta / 2) * power

  if (cleanLow < 0) {
    cleanHigh = cleanHigh - cleanLow
    cleanLow = 0
  }

  return $multi(cleanLow, cleanHigh)
}

export function getTickValues(low: number, high: number): number[] {
  const tickValues = [low, 0, 0, 0, high]

  for (let i = 2; i <= 4; i++) {
    tickValues[i - 1] = zo_floor(low + ((high - low) * (i - 1)) / 4)
  }

  return tickValues
}

export function updateScales(
  plotWindow: PlotWindowControl,
  ranges: PlotRectRange,
  exact?: boolean
): undefined {
  let [xMin, xMax, yMin, yMax] = ranges

  if (exact !== true) {
    ;[xMin, xMax] = getScale(xMin, xMax)
    ;[yMin, yMax] = getScale(yMin, yMax)
  }

  const ticksX = getTickValues(xMin, xMax)
  const ticksY = getTickValues(yMin, yMax)

  plotWindow.RangesX = [xMin, xMax, ticksX]
  plotWindow.RangesY = [yMin, yMax, ticksY]

  for (let i = 1; i <= 5; i++) {
    const ticklabelX = GetControl<LabelControl>(plotWindow.GetName() + "XTick" + i + "Label")
    const ticklabelY = GetControl<LabelControl>(plotWindow.GetName() + "YTick" + i + "Label")

    ticklabelX?.SetText(tostring(ticksX[i - 1]))
    ticklabelY?.SetText(tostring(ticksY[i - 1]))
  }
  return undefined
}

export function acquireRange(xyData: XYPoint[]): PlotRectRange {
  let minX = 0
  let maxX = 0
  let minY = 0
  let maxY = 0

  for (const coords of xyData) {
    const [x, y] = coords

    minX = zo_min(minX, x)
    maxX = zo_max(maxX, x)
    minY = zo_max(minY, y)
    maxY = zo_max(maxY, y)
  }

  return [minX, maxX, minY, maxY]
}

export function getRequiredRange(
  plotWindow: PlotWindowControl,
  newRange: PlotRectRange,
  startZero: boolean
): LuaMultiReturn<[range: PlotRectRange, isChanged: boolean]> {
  const oldRangeX = plotWindow.RangesX
  const oldRangeY = plotWindow.RangesY

  const minXOld = oldRangeX[0]
  const maxXOld = oldRangeX[1]
  const minYOld = oldRangeY[0]
  const maxYOld = oldRangeY[1]

  const [minX, maxX, minY, maxY] = newRange

  const minXNew = startZero ? 0 : zo_min(minXOld, minX)
  const maxXNew = zo_max(maxXOld, maxX)
  const minYNew = startZero ? 0 : zo_min(minYOld, minY)
  const maxYNew = zo_max(maxYOld, maxY)

  const isChanged =
    minXOld !== minXNew || maxXOld !== maxXNew || minYOld !== minYNew || maxYOld !== maxYNew

  return $multi([minXNew, maxXNew, minYNew, maxYNew] satisfies PlotRectRange, isChanged)
}

export function limit(value: number, minValue: number, maxValue: number): number {
  const coercedValue = zo_min(zo_max(value, minValue), maxValue)

  return coercedValue
}
