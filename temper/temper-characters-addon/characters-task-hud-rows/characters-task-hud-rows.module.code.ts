import { GREEN, PURPLE, YELLOW } from "@akasha/design-tokens/semantic-color"
import { TEXT_SECONDARY } from "@akasha/design-tokens/text-color"
import type { TaskData } from "@akasha/temper-player-completion-state/completion-saved-variables"
import type { ActiveQuest } from "../characters-active-quests/characters-active-quests.module.code.ts"
import {
  countSuffix,
  progressSuffix,
} from "../characters-progress-format/characters-progress-format.module.code.ts"
import {
  getAntiquityLeadSessionProgress,
  isAntiquitySessionTask,
} from "../characters-task-hud-enrichment/characters-task-hud-enrichment.module.code.ts"
import {
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
} from "../characters-task-hud-state/characters-task-hud-state.module.code.ts"
import { isTaskComplete } from "../characters-task-hud-visibility/characters-task-hud-visibility.module.code.ts"
import { resolveTaskProgress } from "../characters-task-progress-resolver/characters-task-progress-resolver.module.code.ts"

const SUFFIX_GAP = 4

function requireContentContainer(): Control {
  const cc = getContentContainer()
  if (cc === undefined) {
    throw new Error("characters-task-hud-rows: contentContainer not initialized")
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

  const sessionCard = isAntiquitySessionTask(task)
  const progress = sessionCard
    ? getAntiquityLeadSessionProgress(task.completionCardId)
    : resolveTaskProgress(task)
  const completed = sessionCard
    ? progress !== undefined && progress.current > 0
    : isTaskComplete(taskId, task) || (progress !== undefined && progress.current >= progress.total)

  const label = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
  label.SetAnchor(LEFT, row, LEFT, INDICATOR_WIDTH + 4, 0)
  label.SetFont("$(BOLD_FONT)|16|shadow")

  const titleColor = completed ? GREEN : priorityColor(task.priority)
  label.SetColor(titleColor[0], titleColor[1], titleColor[2], 1)
  label.SetText(task.title)

  let trailingWidth = 0
  if (progress !== undefined) {
    const progressLabel = WINDOW_MANAGER.CreateControl(undefined, row, CT_LABEL)
    progressLabel.SetAnchor(LEFT, label, RIGHT, SUFFIX_GAP, 0)
    progressLabel.SetFont("$(BOLD_FONT)|14|shadow")
    progressLabel.SetColor(titleColor[0], titleColor[1], titleColor[2], 1)
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
  green: GREEN,
  purple: PURPLE,
  yellow: YELLOW,
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
  const rgb = completed ? GREEN : PRE_COMPLETION_RGB[spec.color]
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
  const questNameColor = quest.isAssisted ? YELLOW : TEXT_SECONDARY
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
  label.SetColor(YELLOW[0], YELLOW[1], YELLOW[2], 1)
  label.SetWidth(QUEST_HINT_WIDTH)
  label.SetText(indentText(2) + hint.trim())
  const textHeight = label.GetTextHeight()
  label.SetHeight(textHeight)
  row.SetDimensions(MIN_HUD_WIDTH, textHeight)

  pushRow(row)
  return yOffset + textHeight + ROW_PADDING
}
