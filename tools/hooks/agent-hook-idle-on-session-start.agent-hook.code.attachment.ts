
import { fromHook } from "../lib/seat-turn-hook.ts"
import { setTurnState } from "../lib/seat-turn.ts"
import { setWorking } from "../lib/seat-turn-working.ts"

const NO_TURN_STANDING: readonly string[] = ["startup", "clear"]

await fromHook((agent, fields) => {
  setWorking(agent, { compacting: false })
  if (!NO_TURN_STANDING.includes(String(fields.source ?? ""))) return
  setWorking(agent, { "active-turn": false })
  setTurnState(agent, "idle")
})
