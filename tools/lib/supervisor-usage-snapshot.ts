import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { accountStateIn } from "@akasha/agents/claude-account-reading"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { LOG } from "@akasha/seat-system/supervisor-config"
import { computePacingDerivations, formatPaceHours } from "./usage-derivations.ts"

export function writePacingSnapshot(account: string, configDir: string): void {
  try {
    const state = accountStateIn(rootFor(resolveRoots(), AKASHA), account)
    const sevenDayUtilization = state === null ? null : state.sevenDayPercentUsed
    const sevenDayResetsAt = state?.sevenDayResetsAt ?? null
    const fiveHourResetsAt = state?.fiveHourResetsAt ?? null
    const derived = computePacingDerivations({
      now: Date.now(),
      sevenDayUtil: sevenDayUtilization ?? 0,
      sevenDayResetsAt,
      fiveHourResetsAt,
    })
    const paceHoursDiff = sevenDayUtilization == null ? null : derived.paceHoursDiff
    const paceHoursFormatted = paceHoursDiff == null ? null : formatPaceHours(paceHoursDiff)
    const path = join(configDir, ".pacing.json")
    const snapshot = {
      account,
      fiveHourUtilization: state === null ? null : state.fiveHourPercentUsed,
      fiveHourResetsAt,
      sevenDayUtilization,
      sevenDayResetsAt,
      paceHoursDiff,
      paceHoursFormatted,
      updatedAt: new Date().toISOString(),
    }
    writeFileSync(path, JSON.stringify(snapshot), { mode: 0o600 })
  } catch (err) {
    console.error(`${LOG} writePacingSnapshot(${account}) failed:`, err)
  }
}
