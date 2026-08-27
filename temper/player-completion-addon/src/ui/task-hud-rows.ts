import { TEXT_SECONDARY } from "../../../../design-tokens/design-tokens"
import type { TaskData } from "../saved-variables"
import { getSavedVariables } from "../saved-variables"
import type { ActiveQuest } from "../tracking/active-quests"
import { countSuffix, progressSuffix } from "../tracking/progress-format"
import { getAntiquityLeadSessionProgress, isAntiquitySessionTask } from "./task-hud-enrichment"
import {
  COMPLETED_COLOR,
  getContentContainer,
  INDICATOR_WIDTH,
  MIN_HUD_WIDTH,
  PLEDGE_SUB_ROW_HEIGHT,
  priorityColor,
  pushLabel,
  pushRow,
  QUEST_HINT_WIDTH,
  ROW_HEIGHT,
  ROW_PADDING,
  SEMANTIC_GREEN,
  SEMANTIC_PURPLE,
  SEMANTIC_YELLOW,
} from "./task-hud-state"
import { isTaskComplete } from "./task-hud-visibility"
import { resolveTaskProgress } from "./task-progress-resolver"

const SUFFIX_GAP = 4

function requireContentContainer(): Control {
  const cc = getContentContainer()
  if (cc === undefined) {
    throw new Error("task-hud-rows: contentContainer not initialized")
  }
  return cc
}

export function createTaskRow(
  taskId: string,
  task: TaskData,
  yOffset: number,
  containerCount?: number
): Control {
  const contentContainer = requireContentContainer()
  const row = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  row.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)
  row.SetDimensions(MIN_HUD_WIDTH, ROW_HEIGHT)

  if (containerCount !== undefined) {
    const titleLabel = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
    titleLabel.SetAnchor(LEFT, row, LEFT, INDICATOR_WIDTH + 4, 0)
    titleLabel.SetFont("$(BOLD_FONT)|16|shadow")
    titleLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
    titleLabel.SetText(task.title)

    const countLabel = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
    countLabel.SetAnchor(LEFT, titleLabel, RIGHT, SUFFIX_GAP, 0)
    countLabel.SetFont("$(BOLD_FONT)|14|shadow")
    countLabel.SetColor(TEXT_SECONDARY[0], TEXT_SECONDARY[1], TEXT_SECONDARY[2], 1)
    countLabel.SetText(countSuffix(containerCount))
    pushLabel(titleLabel, SUFFIX_GAP + countLabel.GetTextWidth())

    return row
  }

  const sv = getSavedVariables()
  const sessionCard = isAntiquitySessionTask(task)
  const progress = sessionCard
    ? getAntiquityLeadSessionProgress(task.completionCardId)
    : resolveTaskProgress(sv, task)
  const completed = sessionCard
    ? progress !== undefined && progress.current > 0
    : isTaskComplete(taskId, task) || (progress !== undefined && progress.current >= progress.total)

  const label = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
  label.SetAnchor(LEFT, row, LEFT, INDICATOR_WIDTH + 4, 0)
  label.SetFont("$(BOLD_FONT)|16|shadow")

  const titleColor = completed ? COMPLETED_COLOR : priorityColor(task.priority)
  label.SetColor(titleColor[0], titleColor[1], titleColor[2], 1)
  label.SetText(task.title)

  let trailingWidth = 0
  if (progress !== undefined) {
    const progressLabel = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
    progressLabel.SetAnchor(LEFT, label, RIGHT, SUFFIX_GAP, 0)
    progressLabel.SetFont("$(BOLD_FONT)|14|shadow")
    const progressColor = completed ? COMPLETED_COLOR : priorityColor(task.priority)
    progressLabel.SetColor(progressColor[0], progressColor[1], progressColor[2], 1)
    progressLabel.SetText(progressSuffix(progress.current, progress.total))
    trailingWidth = SUFFIX_GAP + progressLabel.GetTextWidth()
  }
  pushLabel(label, trailingWidth)

  return row
}

export type SubRowColor = "default" | "green" | "purple" | "yellow"

export interface SubRowSpec {
  readonly text: string
  readonly color: SubRowColor
  readonly indent?: number
}

const PRE_COMPLETION_RGB: Record<SubRowColor, readonly [number, number, number]> = {
  default: TEXT_SECONDARY,
  green: SEMANTIC_GREEN,
  purple: SEMANTIC_PURPLE,
  yellow: SEMANTIC_YELLOW,
}

const INDENT_UNIT = "    "
export function indentText(level: number): string {
  return INDENT_UNIT.repeat(level)
}

export function createSubRow(spec: SubRowSpec, yOffset: number, completed: boolean): Control {
  const contentContainer = requireContentContainer()
  const row = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  row.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)
  row.SetDimensions(MIN_HUD_WIDTH, PLEDGE_SUB_ROW_HEIGHT)

  const label = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
  label.SetAnchor(LEFT, row, LEFT, INDICATOR_WIDTH + 4, 0)
  label.SetFont("$(BOLD_FONT)|14|shadow")
  const rgb = completed ? COMPLETED_COLOR : PRE_COMPLETION_RGB[spec.color]
  label.SetColor(rgb[0], rgb[1], rgb[2], 1)
  label.SetText(indentText(spec.indent ?? 1) + spec.text)
  pushLabel(label)

  return row
}

export function createQuestRow(quest: ActiveQuest, yOffset: number): Control {
  const contentContainer = requireContentContainer()
  const questRow = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  questRow.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)
  questRow.SetDimensions(MIN_HUD_WIDTH, ROW_HEIGHT)

  const questLabel = WINDOW_MANAGER.CreateControl(undefined, questRow, CT_LABEL)
  questLabel.SetAnchor(LEFT, questRow, LEFT, INDICATOR_WIDTH + 4, 0)
  questLabel.SetFont("$(BOLD_FONT)|14|shadow")
  const questNameColor = quest.isAssisted ? SEMANTIC_YELLOW : TEXT_SECONDARY
  questLabel.SetColor(questNameColor[0], questNameColor[1], questNameColor[2], 1)
  questLabel.SetText(indentText(1) + quest.name.trim())
  pushLabel(questLabel)

  pushRow(questRow)
  return questRow
}

export function appendQuestHintRow(hint: string, yOffset: number): number {
  const contentContainer = requireContentContainer()
  const row = WINDOW_MANAGER.CreateControl(undefined, contentContainer, CT_CONTROL)
  row.SetAnchor(TOPLEFT, contentContainer, TOPLEFT, 0, yOffset)

  const label = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
  label.SetAnchor(TOPLEFT, row, TOPLEFT, INDICATOR_WIDTH + 4, 0)
  label.SetFont("$(BOLD_FONT)|14|shadow")
  label.SetColor(SEMANTIC_YELLOW[0], SEMANTIC_YELLOW[1], SEMANTIC_YELLOW[2], 1)
  label.SetWidth(QUEST_HINT_WIDTH)
  label.SetText(indentText(2) + hint.trim())
  const textHeight = label.GetTextHeight()
  label.SetHeight(textHeight)
  row.SetDimensions(MIN_HUD_WIDTH, textHeight)

  pushRow(row)
  return yOffset + textHeight + ROW_PADDING
}
