import { BLUE, GREEN, PURPLE, RED, YELLOW } from "../../../../design-tokens/design-tokens"
import { TEXT_SECONDARY } from "../../../../design-tokens/design-tokens"

export const HUD_NAME = "TemperTaskHUD"
export const MIN_HUD_WIDTH = 120
export const ROW_HEIGHT = 24
export const ROW_PADDING = 4
export const DRAG_HEIGHT = 8
export const PLEDGE_SUB_ROW_HEIGHT = 20
export const UNDAUNTED_SKILL_LINE_ID = 55
export const INDICATOR_WIDTH = 36
export const QUEST_HINT_WIDTH = 320
export const FALLBACK_BACKPACK_BUFFER_SLOTS = 15

export const SEMANTIC_GREEN = GREEN
export const SEMANTIC_RED = RED
export const SEMANTIC_YELLOW = YELLOW
export const SEMANTIC_BLUE = BLUE
export const SEMANTIC_PURPLE = PURPLE
export const DEFAULT_TEXT_COLOR = TEXT_SECONDARY

export const COMPLETED_COLOR = GREEN

export function priorityColor(priority: string | undefined): readonly [number, number, number] {
  if (priority === "p1") return SEMANTIC_RED
  if (priority === "p2") return SEMANTIC_YELLOW
  if (priority === "p3") return SEMANTIC_BLUE
  return DEFAULT_TEXT_COLOR
}

export function priorityRank(priority: string | undefined): number {
  if (priority === "p1") return 1
  if (priority === "p2") return 2
  if (priority === "p3") return 3
  if (priority === "p4") return 4
  return 5
}

export function isContainerCard(cardId: string | undefined): boolean {
  return (
    cardId === "active-quests" || cardId === "inventory-management" || cardId === "dungeon-sets"
  )
}

export function isSkillEquipped(skillName: string): boolean {
  for (const hotbar of [HOTBAR_CATEGORY_PRIMARY, HOTBAR_CATEGORY_BACKUP]) {
    for (let slot = 3; slot <= 9; slot++) {
      if (GetSlotName(slot, hotbar) === skillName) return true
    }
  }
  return false
}

let hudWindow: TopLevelWindow | undefined
let hudFragment: HUDFadeSceneFragment | undefined
let contentContainer: Control | undefined
let dragHandle: Control | undefined
let emptyLabel: LabelControl | undefined
let rowPool: Control[] = []
let labelPool: { label: LabelControl; trailingWidth: number }[] = []
export const initiallyCompletedTaskIds = new LuaSet<string>()
export const userExpandedTaskIds = new LuaSet<string>()
export const userCollapsedTaskIds = new LuaSet<string>()
export const userExpandedQuestIds = new LuaSet<string>()
export const userCollapsedQuestIds = new LuaSet<string>()

export function getHudWindow(): TopLevelWindow | undefined {
  return hudWindow
}

export function getHudFragment(): HUDFadeSceneFragment | undefined {
  return hudFragment
}

export function getContentContainer(): Control | undefined {
  return contentContainer
}

export function getDragHandle(): Control | undefined {
  return dragHandle
}

export function getEmptyLabel(): LabelControl | undefined {
  return emptyLabel
}

export function getRowPool(): Control[] {
  return rowPool
}

export function getLabelPool(): { label: LabelControl; trailingWidth: number }[] {
  return labelPool
}

export function setHudControls(controls: {
  hudWindow: TopLevelWindow
  hudFragment: HUDFadeSceneFragment
  contentContainer: Control
  dragHandle: Control
  emptyLabel: LabelControl
}): undefined {
  hudWindow = controls.hudWindow
  hudFragment = controls.hudFragment
  contentContainer = controls.contentContainer
  dragHandle = controls.dragHandle
  emptyLabel = controls.emptyLabel
}

export function resetPools(): undefined {
  for (const row of rowPool) {
    row.SetHidden(true)
  }
  rowPool = []
  labelPool = []
}

export function pushRow(row: Control): undefined {
  rowPool.push(row)
}

export function pushLabel(label: LabelControl, trailingWidth = 0): undefined {
  labelPool.push({ label, trailingWidth })
}

export function clearInitialCompletion(taskId: string): undefined {
  initiallyCompletedTaskIds.delete(taskId)
}

export function toggleTaskExpanded(taskId: string, currentlyExpanded: boolean): undefined {
  if (currentlyExpanded) {
    userExpandedTaskIds.delete(taskId)
    userCollapsedTaskIds.add(taskId)
  } else {
    userCollapsedTaskIds.delete(taskId)
    userExpandedTaskIds.add(taskId)
  }
}

export function toggleQuestExpanded(questKey: string, currentlyExpanded: boolean): undefined {
  if (currentlyExpanded) {
    userExpandedQuestIds.delete(questKey)
    userCollapsedQuestIds.add(questKey)
  } else {
    userCollapsedQuestIds.delete(questKey)
    userExpandedQuestIds.add(questKey)
  }
}

let lastAssistedQuestName: string | undefined

export function syncAssistedQuest(currentAssistedName: string | undefined): undefined {
  if (currentAssistedName === lastAssistedQuestName) return
  lastAssistedQuestName = currentAssistedName
  for (const key of Object.keys(userExpandedQuestIds)) userExpandedQuestIds.delete(key)
  for (const key of Object.keys(userCollapsedQuestIds)) userCollapsedQuestIds.delete(key)
}
