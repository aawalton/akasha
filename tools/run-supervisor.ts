import { seatNameAdmission } from "./lib/seat-name-admission.ts"
import { refuseSeatName } from "./lib/seat-name-bind.ts"
import { watchSessionFile } from "./lib/session-watch.ts"
import { runSupervisor } from "./lib/supervisor.ts"
import { resolveSeatSpawnDecisions } from "./lib/supervisor-seat-spawn-decisions.ts"
import { liveRebindDepsWith } from "./lib/supervisor-rebind-deps.ts"

if (import.meta.main) {
  runSupervisor({
    startSessionWatch: watchSessionFile,
    rebindDeps: liveRebindDepsWith(async (agentId, name) => {
      await refuseSeatName(agentId, name, seatNameAdmission(name))
    }),
    resolveSeatSpawnDecisions,
  })
}
