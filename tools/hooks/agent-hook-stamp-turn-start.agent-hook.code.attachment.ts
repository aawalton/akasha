
import { fromHook } from "../lib/seat-turn-hook.ts"
import { setTurnStart } from "../lib/seat-turn.ts"
import { setWorking } from "../lib/seat-turn-working.ts"

await fromHook((agent) => {
  setTurnStart(agent, "prompt")
  setWorking(agent, { "active-turn": true })
})
