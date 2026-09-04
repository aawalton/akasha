import { TEXT_TERTIARY } from "@akasha/design-tokens/text-color"
import { createMovableWindow } from "@akasha/temper-hud-window/movable-window"
import { isResettingCard } from "@akasha/temper-player-completion/completion-card-reset-behavior"
import {
  getSavedVariables,
  type TaskData,
} from "@akasha/temper-player-completion-state/completion-saved-variables"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import { getActiveQuests } from "../characters-active-quests/characters-active-quests.module.code.ts"
import { getCharactersConfig } from "../characters-config/characters-config.module.code.ts"
import { ENRICHMENT_SELECTORS } from "../characters-task-hud-enrichment-registry/characters-task-hud-enrichment-registry.module.code.ts"
import { isFullyCompleteAtLoad } from "../characters-task-hud-full-completion/characters-task-hud-full-completion.module.code.ts"
import {
  appendQuestHintRow,
  createQuestRow,
  createSubRow,
  createTaskRow,
} from "../characters-task-hud-rows/characters-task-hud-rows.module.code.ts"
import {
  DRAG_HEIGHT,
  FALLBACK_BACKPACK_BUFFER_SLOTS,
  getContentContainer,
  getDragHandle,
  getEmptyLabel,
  getHudFragment,
  getHudWindow,
  getLabelPool,
  getRowPool,
  HUD_NAME,
  INDICATOR_WIDTH,
  initiallyCompletedTaskIds,
  isContainerCard,
  MIN_HUD_WIDTH,
  PLEDGE_SUB_ROW_HEIGHT,
  priorityRank,
  pushRow,
  QUEST_HINT_WIDTH,
  ROW_HEIGHT,
  ROW_PADDING,
  resetPools,
  setHudControls,
  syncAssistedQuest,
  toggleQuestExpanded,
  toggleTaskExpanded,
} from "../characters-task-hud-state/characters-task-hud-state.module.code.ts"
import {
  getDungeonSetsForCurrentZone,
  isQuestExpanded,
  isTaskComplete,
  isTaskExpanded,
  isTaskVisible,
} from "../characters-task-hud-visibility/characters-task-hud-visibility.module.code.ts"
import { resolveTaskProgress } from "../characters-task-progress-resolver/characters-task-progress-resolver.module.code.ts"

function backpackBufferSlots(): number {
  if (globalThis.TemperInventory?.isSavedVariablesReady() !== true) {
    return FALLBACK_BACKPACK_BUFFER_SLOTS
  }
  const saved: unknown = globalThis.TemperInventory?.getSavedVariables()
  if (!isObjectRecord(saved)) return FALLBACK_BACKPACK_BUFFER_SLOTS
  const backpack = saved["backpack"]
  if (!isObjectRecord(backpack)) return FALLBACK_BACKPACK_BUFFER_SLOTS
  const bufferSlots = backpack["bufferSlots"]
  return typeof bufferSlots === "number" ? bufferSlots : FALLBACK_BACKPACK_BUFFER_SLOTS
}

export function initializeTaskHud(): undefined {
  if (getHudWindow()) return

  const existing = WINDOW_MANAGER.GetControlByName(HUD_NAME)
  if (existing) {
    existing.SetHidden(true)
  }

  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(HUD_NAME + "_v2")
  tlw.SetDimensions(MIN_HUD_WIDTH, ROW_HEIGHT)
  tlw.SetResizeToFitDescendents(true)
  tlw.SetHidden(false)

  const contentContainer = WINDOW_MANAGER.CreateControl("$(parent)Content", tlw, CT_CONTROL)
  contentContainer.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, DRAG_HEIGHT)
  contentContainer.SetWidth(MIN_HUD_WIDTH)
  contentContainer.SetResizeToFitDescendents(true)

  const emptyLabel = WINDOW_MANAGER.CreateControl("$(parent)Empty", tlw, CT_LABEL)
  emptyLabel.SetAnchor(TOPLEFT, tlw, TOPLEFT, 8, DRAG_HEIGHT)
  emptyLabel.SetFont("$(BOLD_FONT)|14|shadow")
  emptyLabel.SetColor(TEXT_TERTIARY[0], TEXT_TERTIARY[1], TEXT_TERTIARY[2], 0.7)
  emptyLabel.SetText("No tasks")
  emptyLabel.SetHidden(true)

  const dragHandle = WINDOW_MANAGER.CreateControl("$(parent)DragHandle", tlw, CT_CONTROL)
  dragHandle.SetAnchor(TOPLEFT, tlw, TOPLEFT, 0, 0)
  dragHandle.SetDimensions(MIN_HUD_WIDTH, DRAG_HEIGHT)

  const hudFragment = ZO_HUDFadeSceneFragment.New(tlw)
  HUD_SCENE.AddFragment(hudFragment)
  HUD_UI_SCENE.AddFragment(hudFragment)

  createMovableWindow({
    window: tlw,
    dragHandle,
    loadPosition: () => {
      const pos = getSavedVariables().taskPanelPosition
      if (pos === undefined) return undefined
      return { left: pos.x, top: pos.y }
    },
    savePosition: (position) => {
      getSavedVariables().taskPanelPosition = { x: position.left, y: position.top }
    },
    applyDefaultAnchor: () => {
      tlw.SetAnchor(TOPRIGHT, GuiRoot, TOPRIGHT, -20, 200)
    },
  })

  setHudControls({ hudWindow: tlw, hudFragment, contentContainer, dragHandle, emptyLabel })

  for (const [taskId, task] of Object.entries(getCharactersConfig().tasks)) {
    if (!isTaskVisible(task)) continue
    if (!isResettingCard(task.completionCardId)) continue
    const completed = isFullyCompleteAtLoad({
      hasTimestampToday: isTaskComplete(taskId, task),
      progress: resolveTaskProgress(task),
    })
    if (completed) {
      initiallyCompletedTaskIds.add(taskId)
    }
  }

  CALLBACK_MANAGER.RegisterCallback(
    "Temper_InventoryActionsChanged",
    function (this: void): undefined {
      refreshTaskHud()
    }
  )

  for (const questEvent of [
    EVENT_QUEST_ADDED,
    EVENT_QUEST_REMOVED,
    EVENT_QUEST_ADVANCED,
    EVENT_QUEST_LIST_UPDATED,
    EVENT_QUEST_CONDITION_COUNTER_CHANGED,
    EVENT_TRACKING_UPDATE,
  ]) {
    EVENT_MANAGER.RegisterForEvent(
      `${HUD_NAME}_Quest_${questEvent}`,
      questEvent,
      function (this: void): undefined {
        refreshTaskHud()
      }
    )
  }

  CALLBACK_MANAGER.RegisterCallback(
    "QuestTrackerUpdatedOnScreen",
    function (this: void): undefined {
      refreshTaskHud()
    }
  )

  refreshTaskHud()
}

export function refreshTaskHud(): undefined {
  const contentContainer = getContentContainer()
  const hudWindow = getHudWindow()
  const hudFragment = getHudFragment()
  if (!contentContainer || !hudWindow || !hudFragment) return

  resetPools()

  const visibleTasks: Array<[string, TaskData]> = []
  for (const [id, task] of Object.entries(getCharactersConfig().tasks)) {
    if (initiallyCompletedTaskIds.has(id)) continue
    if (isTaskVisible(task)) {
      visibleTasks.push([id, task])
    }
  }

  visibleTasks.sort(([, a], [, b]) => {
    const contA = isContainerCard(a.completionCardId) ? 1 : 0
    const contB = isContainerCard(b.completionCardId) ? 1 : 0
    if (contA !== contB) return contA - contB
    const rankA = priorityRank(a.priority)
    const rankB = priorityRank(b.priority)
    if (rankA !== rankB) return rankA - rankB
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })

  const inventorySummary = globalThis.TemperInventory?.getInventoryActionSummary()
  const backpackFreeSlots = globalThis.TemperInventory?.getBackpackFreeSlots()
  const showInventoryRow =
    backpackFreeSlots !== undefined && backpackFreeSlots <= backpackBufferSlots()

  const dungeonSets = getDungeonSetsForCurrentZone()

  const activeQuests = getActiveQuests()
  syncAssistedQuest(activeQuests.find((q) => q.isAssisted)?.name)

  const containerCountFor = (task: TaskData): number | undefined => {
    const card = task.completionCardId
    if (card === "active-quests") {
      return activeQuests.length > 0 ? activeQuests.length : undefined
    }
    if (card === "inventory-management") {
      return showInventoryRow ? (inventorySummary?.totalSlots ?? 0) : undefined
    }
    if (card === "dungeon-sets") {
      return dungeonSets !== undefined ? dungeonSets.incompleteSets.length : undefined
    }
    return undefined
  }

  const anyRenders = visibleTasks.some(
    ([, task]) => !isContainerCard(task.completionCardId) || containerCountFor(task) !== undefined
  )
  const emptyLabel = getEmptyLabel()
  if (!anyRenders) {
    if (emptyLabel) emptyLabel.SetHidden(false)
    contentContainer.SetHidden(true)
    return
  }
  if (emptyLabel) emptyLabel.SetHidden(true)
  contentContainer.SetHidden(false)

  let yOffset = 0
  let questHintShown = false
  for (const [taskId, task] of visibleTasks) {
    const isContainer = isContainerCard(task.completionCardId)

    let containerCount: number | undefined
    if (isContainer) {
      containerCount = containerCountFor(task)
      if (containerCount === undefined) continue
    }

    const row = createTaskRow(taskId, task, yOffset, containerCount)
    pushRow(row)
    yOffset += ROW_HEIGHT + ROW_PADDING

    let completed = false
    if (!isContainer) {
      const progress = resolveTaskProgress(task)
      completed =
        isTaskComplete(taskId, task) ||
        (progress !== undefined && progress.current >= progress.total)
    }
    const expanded = isTaskExpanded(taskId, completed)

    row.SetMouseEnabled(true)
    row.SetHandler("OnMouseUp", function (this: void): undefined {
      toggleTaskExpanded(taskId, expanded)
      refreshTaskHud()
    })

    if (!expanded) continue

    if (task.completionCardId === "active-quests") {
      for (const quest of activeQuests) {
        const questExpanded = isQuestExpanded(quest.name, quest.isAssisted)
        const questRow = createQuestRow(quest, yOffset)
        yOffset += ROW_HEIGHT + ROW_PADDING

        questRow.SetMouseEnabled(true)
        questRow.SetHandler("OnMouseUp", function (this: void): undefined {
          toggleQuestExpanded(quest.name, questExpanded)
          refreshTaskHud()
        })

        if (questExpanded && quest.hint !== undefined) {
          yOffset = appendQuestHintRow(quest.hint, yOffset)
          questHintShown = true
        }
      }
    } else {
      yOffset = appendTaskSubRows(task, completed, yOffset)
    }
  }

  const extraMinWidth = questHintShown ? INDICATOR_WIDTH + 4 + QUEST_HINT_WIDTH + 8 : 0
  applyAutoWidth(contentContainer, hudWindow, extraMinWidth)
}

function appendTaskSubRows(task: TaskData, completed: boolean, yOffset: number): number {
  for (const selector of ENRICHMENT_SELECTORS) {
    if (!selector.matches(task)) continue
    for (const spec of selector.select(task)) {
      pushRow(createSubRow(spec, yOffset, completed))
      yOffset += PLEDGE_SUB_ROW_HEIGHT + ROW_PADDING
    }
  }
  return yOffset
}

function applyAutoWidth(
  contentContainer: Control,
  hudWindow: TopLevelWindow,
  extraMinWidth: number
): undefined {
  let maxLabelWidth = 0
  for (const { label, trailingWidth } of getLabelPool()) {
    const w = label.GetTextWidth() + trailingWidth
    if (w > maxLabelWidth) maxLabelWidth = w
  }
  const computedWidth = math.max(MIN_HUD_WIDTH, INDICATOR_WIDTH + maxLabelWidth + 12, extraMinWidth)
  contentContainer.SetWidth(computedWidth)
  const dragHandle = getDragHandle()
  if (dragHandle) dragHandle.SetWidth(computedWidth)
  hudWindow.SetWidth(computedWidth)
  for (const row of getRowPool()) {
    row.SetWidth(computedWidth)
  }
}
