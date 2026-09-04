import { internal } from "../histoire-state/histoire-state.module.code.ts"
import { requireChild } from "../histoire-status-window-shared/histoire-status-window-shared.module.code.ts"

const DEFAULT_COLOR = ZO_DISABLED_TEXT
const DEFAULT_LINE_THICKNESS = 3
const SELECTED_COLOR = ZO_SELECTED_TEXT
const SELECTED_LINE_THICKNESS = 6
const HORIZONTAL_LINE_LENGTH = 15

export interface GuildHistoryStatusSelectionWidgetInstance {
  container: Control
  rowHeight: number
  nextLineId: number
  verticalLine: TextureControl
  verticalSelectionLine: TextureControl
  guildCount: number
  guildIndex: number
  guildSelectionLine: TextureControl
  categoryCount: number
  categoryIndex: number
  categorySelectionLine: TextureControl
  categoryLines: TextureControl[]
  Initialize: (
    this: GuildHistoryStatusSelectionWidgetInstance,
    parent: Control,
    rowHeight: number
  ) => void
  CreateLine: (this: GuildHistoryStatusSelectionWidgetInstance, color: ZoColorDef) => TextureControl
  CreateVerticalLine: (
    this: GuildHistoryStatusSelectionWidgetInstance,
    color: ZoColorDef,
    thickness: number
  ) => TextureControl
  CreateHorizontalLine: (
    this: GuildHistoryStatusSelectionWidgetInstance,
    color: ZoColorDef,
    thickness: number
  ) => TextureControl
  SetGuildCount: (this: GuildHistoryStatusSelectionWidgetInstance, count: number) => void
  SelectGuild: (this: GuildHistoryStatusSelectionWidgetInstance, index: number) => void
  SetCategoryCount: (this: GuildHistoryStatusSelectionWidgetInstance, count: number) => void
  SelectCategory: (this: GuildHistoryStatusSelectionWidgetInstance, index: number) => void
  Update: (this: GuildHistoryStatusSelectionWidgetInstance) => void
}

export interface GuildHistoryStatusSelectionWidgetClass
  extends GuildHistoryStatusSelectionWidgetInstance {
  New: (
    this: GuildHistoryStatusSelectionWidgetClass,
    parent: Control,
    rowHeight: number
  ) => GuildHistoryStatusSelectionWidgetInstance
}

const GuildHistoryStatusSelectionWidget =
  ZO_Object.Subclass<GuildHistoryStatusSelectionWidgetClass>()
internal.class.GuildHistoryStatusSelectionWidget = GuildHistoryStatusSelectionWidget

export { GuildHistoryStatusSelectionWidget }

GuildHistoryStatusSelectionWidget.New = function (this, parent, rowHeight) {
  const object = ZO_Object.New<GuildHistoryStatusSelectionWidgetInstance>(this)
  object.Initialize(parent, rowHeight)
  return object
}

GuildHistoryStatusSelectionWidget.Initialize = function (this, parent, rowHeight) {
  this.container = requireChild<Control>(parent, "SelectionWidget")
  this.rowHeight = rowHeight
  this.nextLineId = 1
  this.verticalLine = this.CreateVerticalLine(DEFAULT_COLOR, DEFAULT_LINE_THICKNESS)
  this.verticalLine.SetAnchor(TOP, this.container, TOP, 0, 0)
  this.verticalSelectionLine = this.CreateVerticalLine(SELECTED_COLOR, SELECTED_LINE_THICKNESS)
  this.verticalSelectionLine.SetDrawLevel(1)
  this.guildCount = 0
  this.guildIndex = 0
  this.guildSelectionLine = this.CreateHorizontalLine(SELECTED_COLOR, SELECTED_LINE_THICKNESS)
  this.guildSelectionLine.SetDrawLevel(1)
  this.categoryCount = 0
  this.categoryIndex = 0
  this.categorySelectionLine = this.CreateHorizontalLine(SELECTED_COLOR, SELECTED_LINE_THICKNESS)
  this.categorySelectionLine.SetDrawLevel(1)
  this.categoryLines = []
}

GuildHistoryStatusSelectionWidget.CreateLine = function (this, color) {
  const line = WINDOW_MANAGER.CreateControl(
    "$(parent)Line" + tostring(this.nextLineId),
    this.container,
    CT_TEXTURE
  )
  this.nextLineId = this.nextLineId + 1
  const [r, g, b, a] = color.UnpackRGBA()
  line.SetColor(r, g, b, a)
  line.SetDrawLevel(0)
  return line
}

GuildHistoryStatusSelectionWidget.CreateVerticalLine = function (this, color, thickness) {
  const line = this.CreateLine(color)
  line.SetWidth(thickness)
  return line
}

GuildHistoryStatusSelectionWidget.CreateHorizontalLine = function (this, color, thickness) {
  const line = this.CreateLine(color)
  line.SetWidth(HORIZONTAL_LINE_LENGTH)
  line.SetHeight(thickness)
  return line
}

GuildHistoryStatusSelectionWidget.SetGuildCount = function (this, count) {
  this.guildCount = count
}

GuildHistoryStatusSelectionWidget.SelectGuild = function (this, index) {
  this.guildIndex = index
}

GuildHistoryStatusSelectionWidget.SetCategoryCount = function (this, count) {
  for (let i = 1; i <= zo_max(this.categoryCount, count); i = i + 1) {
    let line = this.categoryLines[i]
    if (line == null) {
      line = this.CreateHorizontalLine(DEFAULT_COLOR, DEFAULT_LINE_THICKNESS)
      line.SetAnchor(TOPLEFT, this.container, TOP, 0, (i - 1) * this.rowHeight)
      this.categoryLines[i] = line
    }
    line.SetHidden(i > count)
  }
  this.categoryCount = count
}

GuildHistoryStatusSelectionWidget.SelectCategory = function (this, index) {
  this.categoryIndex = index
}

GuildHistoryStatusSelectionWidget.Update = function (this) {
  const rowCount = zo_max(this.guildCount, this.categoryCount)
  this.verticalLine.SetHeight((rowCount - 1) * this.rowHeight + DEFAULT_LINE_THICKNESS)

  const guildRowOffset = (this.guildIndex - 1) * this.rowHeight
  const categoryRowOffset = (this.categoryIndex - 1) * this.rowHeight
  this.verticalSelectionLine.SetAnchor(
    TOP,
    this.container,
    TOP,
    0,
    zo_min(guildRowOffset, categoryRowOffset)
  )
  this.verticalSelectionLine.SetHeight(
    zo_abs(guildRowOffset - categoryRowOffset) + SELECTED_LINE_THICKNESS
  )
  this.guildSelectionLine.SetAnchor(TOPRIGHT, this.container, TOP, 0, guildRowOffset)
  this.categorySelectionLine.SetAnchor(TOPLEFT, this.container, TOP, 0, categoryRowOffset)
}
