import { type Asking, rowFor } from "@akasha/readout-system/readout-asking"
import { statedAt } from "@akasha/readout-system/readout-tier"

const DAY = "daily-tracking"

const TEMPER_TASKS = "inbox-temper-tasks"

const DATE = "date"

const TASKS_UNKNOWN =
  "the tracking day could not be read, so the game tasks waiting are unknown rather than none"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [TEMPER_TASKS],
    limit: 1,
  }
}

export function tasksIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[TEMPER_TASKS])
}

export async function fetchTemperTasks(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), TASKS_UNKNOWN)
  return row === null ? null : tasksIn(row.values)
}
