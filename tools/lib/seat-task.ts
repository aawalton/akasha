
import { pageTextOf } from "./seat-page-values.ts"

const PAGE_KEY = "task-slug"

export interface TaskRecord {
  readonly value: string
}

export function taskOf(agent: string): TaskRecord | null {
  const held = pageTextOf(agent, PAGE_KEY)
  return held === null ? null : { value: held }
}
