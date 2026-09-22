import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"

const TEMPER_TASKS = "inbox-temper-tasks"

export function temperTasksIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[TEMPER_TASKS])
}
