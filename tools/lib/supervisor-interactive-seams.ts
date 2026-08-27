
import type { SeatSpawnDecider } from "./supervisor-interactive-spawn.ts"
import type { ClearRebindHooks } from "./supervisor-rebind.ts"
import type { ClearRebindDeps } from "./supervisor-rebind-deps.ts"

export interface RunInteractiveSeams {
  startSessionWatch: ClearRebindHooks["startSessionWatch"]
  rebindDeps: ClearRebindDeps
  resolveSeatSpawnDecisions: SeatSpawnDecider
}
