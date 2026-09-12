import type { TaskData } from "akasha/temper/player-completion-state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"

export function taskHasCard(task: TaskData, cardId: string): boolean {
  return task.completionCardId === cardId
}

function taskPathEntry(task: TaskData, index: number): string | number | undefined {
  const path = task.completionItemPath
  if (path === undefined) return undefined
  return path[index]
}

export function taskHasCardAndPathEntry(
  task: TaskData,
  cardId: string,
  index: number,
  value: string | number
): boolean {
  return taskHasCard(task, cardId) && taskPathEntry(task, index) === value
}
