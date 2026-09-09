import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"
import { isCumulativeCard } from "akasha/temper/temper-player-completion/completion-card-reset-behavior/completion-card-reset-behavior.module.code.ts"

export function isFullyCompleteAtLoad(args: {
  hasTimestampToday: boolean
  progress: TaskProgress | undefined
}): boolean {
  if (args.progress === undefined) return args.hasTimestampToday
  return args.progress.current >= args.progress.total
}

export function isPermanentlyComplete(args: {
  cardId: string | undefined
  progress: TaskProgress | undefined
}): boolean {
  if (!isCumulativeCard(args.cardId)) return false
  if (args.progress === undefined) return false
  return args.progress.current >= args.progress.total
}
