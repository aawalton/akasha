import {
  type ParsedTaskCompletion,
  readTaskCompletions,
} from "akasha/temper/watcher/modules/watcher-task-capture/watcher-task-capture.module.code.ts"

export function parseTaskCompletions(content: string): readonly ParsedTaskCompletion[] {
  return readTaskCompletions(content).entries
}
