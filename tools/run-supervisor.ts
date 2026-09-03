import { runSupervisor } from "@akasha/seat-system/supervisor"
import { liveRebindDepsWith } from "@akasha/seat-system/supervisor-rebind-deps"
import { resolveSeatSpawnDecisions } from "@akasha/seat-system/supervisor-seat-spawn-decisions"
import { refuseSeatName } from "./lib/seat-name-bind.ts"
import { watchSessionFile } from "./lib/session-watch.ts"

if (import.meta.main) {
  runSupervisor({
    startSessionWatch: watchSessionFile,
    rebindDeps: liveRebindDepsWith(async (agentId, name) => {
      await refuseSeatName(agentId, name)
    }),
    resolveSeatSpawnDecisions,
  })
}
